import { Hono } from "hono";
import { storeEncryptedSecret, getEncryptedSecret } from "./crypto";

type Env = {
  DB: D1Database;
  IMAGES?: R2Bucket;
  NVIDIA_API_KEY: string;
  ENCRYPTION_KEY: string;
  ALLOWED_ORIGIN?: string;
};

const INVOKE_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

// 3-model fallback in exact order you provided — keep parity with Python backup
type ModelCfg = {
  model: string;
  stream: boolean;
  build: (imageUrl: string, prompt: string) => Record<string, unknown>;
};

const MODELS: ModelCfg[] = [
  {
    model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    stream: false,
    build: (imageUrl, prompt) => ({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
      model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
      max_tokens: 65536,
      reasoning_budget: 16384,
      stream: false,
      temperature: 0.6,
      top_p: 0.95,
    }),
  },
  {
    model: "moonshotai/kimi-k3",
    stream: true,
    build: (imageUrl, prompt) => ({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
      model: "moonshotai/kimi-k3",
      max_tokens: 16384,
      seed: 0,
      stream: true,
      temperature: 1,
      reasoning_effort: "max",
    }),
  },
  {
    model: "meta/llama-3.2-90b-vision-instruct",
    stream: false,
    build: (imageUrl, prompt) => ({
      messages: [
        {
          content: [
            { image_url: { url: imageUrl }, type: "image_url" },
            { type: "text", text: prompt },
          ],
          role: "user",
        },
      ],
      model: "meta/llama-3.2-90b-vision-instruct",
      frequency_penalty: 0,
      max_tokens: 512,
      presence_penalty: 0,
      stream: false,
      temperature: 1,
      top_p: 1,
    }),
  },
];

async function callOne(model: ModelCfg, imageUrl: string, prompt: string, apiKey: string): Promise<{ ok: boolean; model: string; data?: unknown; error?: string; status?: number }> {
  const payload = model.build(imageUrl, prompt);
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    Accept: model.stream ? "text/event-stream" : "application/json",
    "Content-Type": "application/json",
  };
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 85_000);
  try {
    const res = await fetch(INVOKE_URL, { method: "POST", headers, body: JSON.stringify(payload), signal: ac.signal });
    if (model.stream) {
      // Collect stream just like Python iter_lines
      const text = await res.text();
      if (!res.ok) return { ok: false, model: model.model, error: `HTTP ${res.status}: ${text.slice(0, 800)}`, status: res.status };
      // Consider success if we got any event data
      return { ok: true, model: model.model, data: { raw: text.slice(0, 8000) }, status: res.status };
    } else {
      const data = (await res.json().catch(() => null)) as unknown;
      if (!res.ok) return { ok: false, model: model.model, error: `HTTP ${res.status}: ${JSON.stringify(data).slice(0, 800)}`, status: res.status };
      return { ok: true, model: model.model, data, status: res.status };
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, model: model.model, error: msg };
  } finally {
    clearTimeout(t);
  }
}

export function mountNim(app: Hono<{ Bindings: Env }>) {
  // Health
  app.get("/api/nim/health", (c) => c.json({ ok: true, models: MODELS.map((m) => m.model) }));

  // Encrypt + save creds (mirrors Python encrypt_and_save_all_creds) — POST /api/secrets { key_name, value }
  app.post("/api/secrets", async (c) => {
    const { key_name, value } = await c.req.json<{ key_name: string; value: string }>();
    if (!key_name || !value) return c.json({ error: "key_name and value required" }, 400);
    if (!c.env.ENCRYPTION_KEY) return c.json({ error: "ENCRYPTION_KEY not configured (wrangler secret put ENCRYPTION_KEY)" }, 500);
    const id = await storeEncryptedSecret(c.env.DB, key_name, value, c.env.ENCRYPTION_KEY);
    return c.json({ ok: true, id, key_name }, 201);
  });

  app.get("/api/secrets/:name", async (c) => {
    if (!c.env.ENCRYPTION_KEY) return c.json({ error: "ENCRYPTION_KEY not configured" }, 500);
    const name = c.req.param("name");
    const plain = await getEncryptedSecret(c.env.DB, name, c.env.ENCRYPTION_KEY);
    if (plain === null) return c.json({ error: "Not found" }, 404);
    // Never return plain in prod — this is for verification, mask
    return c.json({ key_name: name, exists: true, preview: plain.slice(0, 6) + "***" });
  });

  // Main inference — fallback across 3 models, keep import requests parity (fetch mirrors requests.post)
  app.post("/api/nim/infer", async (c) => {
    const body = await c.req.json<{
      image_url?: string;
      imageUrl?: string;
      prompt?: string;
      patientId?: string;
      patient_id?: string;
      visitId?: string;
      visit_id?: string;
      model?: string; // optional override single model
    }>();
    const imageUrl = body.image_url || body.imageUrl;
    if (!imageUrl) return c.json({ error: "image_url required (https URL or data:image/...;base64)" }, 400);
    const prompt =
      body.prompt ||
      "You are GlucoVision — diabetic retinopathy screening AI. Describe what is in this fundus image. List: stage (0 No DR / 1 Mild NPDR / 2 Moderate NPDR / 3 Severe NPDR / 4 PDR), key lesions (haemorrhage, exudates, microaneurysm, neovascularization), confidence 0-100, and plain-language next step for ASHA. Return JSON with keys stage, confidence, lesions, summary.";
    const patientId = body.patientId || body.patient_id || null;
    const visitId = body.visitId || body.visit_id || null;

    // Resolve API key: Worker secret NVIDIA_API_KEY > fallback to D1 encrypted secret
    let apiKey = c.env.NVIDIA_API_KEY || "";
    if (!apiKey && c.env.ENCRYPTION_KEY) {
      const fromDb = await getEncryptedSecret(c.env.DB, "NVIDIA_API_KEY", c.env.ENCRYPTION_KEY).catch(() => null);
      if (fromDb) apiKey = fromDb;
    }
    if (!apiKey) return c.json({ error: "NVIDIA_API_KEY not configured. Set via wrangler secret put NVIDIA_API_KEY and ENCRYPTION_KEY" }, 500);

    // If model override, try only that
    const toTry = body.model ? MODELS.filter((m) => m.model === body.model) : MODELS;
    if (body.model && toTry.length === 0) return c.json({ error: `Unknown model ${body.model}` }, 400);

    let lastErr: string | null = null;
    let usedModel = "";
    let resultData: unknown = null;
    const started = Date.now();

    for (const m of toTry) {
      const r = await callOne(m, imageUrl, prompt, apiKey);
      if (r.ok) {
        usedModel = r.model;
        resultData = r.data;
        // Audit log
        const id = `nim_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        await c.env.DB.prepare(
          `INSERT INTO nim_requests (id, patient_id, visit_id, model, prompt, image_url, status, latency_ms) VALUES (?, ?, ?, ?, ?, ?, 'success', ?)`
        )
          .bind(id, patientId, visitId, r.model, prompt.slice(0, 500), imageUrl.slice(0, 500), Date.now() - started)
          .run()
          .catch(() => {});
        return c.json({ ok: true, model: r.model, data: r.data, fallback: usedModel !== MODELS[0].model });
      } else {
        lastErr = r.error || "unknown";
        const id = `nim_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        await c.env.DB.prepare(
          `INSERT INTO nim_requests (id, patient_id, visit_id, model, prompt, image_url, status, latency_ms, error) VALUES (?, ?, ?, ?, ?, ?, 'failed', ?, ?)`
        )
          .bind(id, patientId, visitId, m.model, prompt.slice(0, 500), imageUrl.slice(0, 500), Date.now() - started, lastErr.slice(0, 1000))
          .run()
          .catch(() => {});
        // continue to next model — if one fails other must work
      }
    }

    return c.json({ ok: false, error: `All ${toTry.length} NIM models failed`, last_error: lastErr, models: toTry.map((m) => m.model) }, 502);
  });

  // Stream variant — mirrors Python stream=True path — returns text/event-stream
  app.post("/api/nim/infer-stream", async (c) => {
    const body = await c.req.json<{ image_url?: string; imageUrl?: string; prompt?: string }>();
    const imageUrl = body.image_url || body.imageUrl;
    if (!imageUrl) return c.json({ error: "image_url required" }, 400);
    const prompt = body.prompt || "What is in this image?";
    let apiKey = c.env.NVIDIA_API_KEY || "";
    if (!apiKey && c.env.ENCRYPTION_KEY) {
      const fromDb = await getEncryptedSecret(c.env.DB, "NVIDIA_API_KEY", c.env.ENCRYPTION_KEY).catch(() => null);
      if (fromDb) apiKey = fromDb;
    }
    if (!apiKey) return c.json({ error: "NVIDIA_API_KEY not configured" }, 500);
    // Force kimi-k3 stream model for this endpoint (as in your stream=True example)
    const m = MODELS.find((x) => x.stream) || MODELS[1];
    const payload = m.build(imageUrl, prompt);
    const res = await fetch(INVOKE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "text/event-stream",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    // Proxy stream directly (like Python for line in response.iter_lines(): print(line.decode("utf-8")))
    const headers = new Headers(res.headers);
    headers.set("Content-Type", "text/event-stream");
    headers.set("Cache-Control", "no-cache");
    return new Response(res.body, { status: res.status, headers });
  });
}
