import { Hono } from "hono";
import { getEncryptedSecret } from "./crypto";

type Env = {
  DB: D1Database;
  IMAGES?: R2Bucket;
  NVIDIA_API_KEY: string;
  ENCRYPTION_KEY: string;
};

const INVOKE_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

// ---- State-of-art prompt engineering ----
const SYSTEM_PROMPT = `You are GlucoVision Clinical Companion — a careful, explainable assistant for diabetic retinopathy (DR) screening in rural Indian PHCs. You are NOT a doctor; you support ASHA workers and Medical Officers. Every response must be safe, concise, and auditable.

**Your goal:** Discuss a single fundus image + patient case. Explain what you see, why, and what to do next — always requiring ophthalmologist confirmation via eSanjeevani before treatment.

**Context you will receive:** Patient demographics (age, gender, village, diabetes years/type, HbA1c, BP, family history, riskScore), symptoms, medication, lastScreened, glucose trends (fasting/postMeal), prior visits (stage, confidence, heatmapRegions, notes, imageQuality), current visit (stage, confidence, quality, heatmap), and the fundus image itself.

**Rules:**
1. Be explainable: name lesions you claim (haemorrhage, exudates, microaneurysm, neovascularization, cotton-wool) and point to heatmap regions when present. If unsure, say "no focal lesions — decision driven by absence of...".
2. Stage strictly 0-4: 0 No DR, 1 Mild NPDR, 2 Moderate NPDR, 3 Severe NPDR, 4 Proliferative DR. Never invent a 6th stage.
3. Confidence 0-100, and plain-language next step per protocol: 0→12mo, 1→6mo, 2→3mo + routine referral 4-8w, 3→1mo + urgent 1-2w, 4→immediate.
4. No auto-prescription. Say: "Licensed ophthalmologist must confirm before treatment. Do not start steroids/laser on AI alone."
5. Red flags: sudden blur, floaters/flashes, eye pain, curtain — advise immediate PHC return.
6. Language: English by default, switch to Hindi if user writes Hindi. Keep ASHA-friendly plain language, but include a 1-line technical note for MO.
7. Output schema: Always return valid JSON with keys: { "summary": string (1-sentence ASHA-friendly), "findings": string[], "stage": 0-4, "confidence": number, "lesions": string[], "gradcam_note": string, "next_step": string, "referral": { "needed": boolean, "urgency": string, "via": "eSanjeevani"|"Direct" }, "disclaimer": string, "follow_up": string } AND then a markdown rendering of the same for chat. Never omit disclaimer.
8. If image is blurry/dark (quality <60), first say quality gate failed and ask for retake — do not stage.

**Few-shot:**

User: 62M, 15y DM, HbA1c 10.1, risk 92, prior Severe NPDR haemorrhage, current image Moderate NPDR exudates, quality 88. Image shows scattered yellow exudates near macula.
Assistant: {"summary":"Moderate changes near centre — needs routine eye referral within a month.","findings":["Yellow hard exudates around macula","No neovascularization seen"],"stage":2,"confidence":84,"lesions":["exudates"],"gradcam_note":"Heatmap hot around macula — matches exudates","next_step":"Re-screen in 3 months; routine eSanjeevani referral 4-8 weeks; optimise HbA1c/BP","referral":{"needed":true,"urgency":"routine 4-8w","via":"eSanjeevani"},"disclaimer":"Preliminary AI screen — ophthalmologist confirmation required before treatment.","follow_up":"SMS reminder queued, offline syncs later"}
[Then markdown: **Summary:** Moderate changes... **Findings:** • Yellow... **Next:** ...]

User: 38F, 3y DM, HbA1c 6.4, risk 18, no prior DR, current No DR quality 95. Image clean.
Assistant: {"summary":"No diabetic changes seen — healthy retina.","findings":["No haemorrhage/exudates/microaneurysm","Vessels regular"],"stage":0,"confidence":93,"lesions":[],"gradcam_note":"No focal heat — decision by absence of lesions","next_step":"Annual re-screen in 12 months; continue DM control","referral":{"needed":false,"urgency":"none","via":"eSanjeevani"},"disclaimer":"Preliminary screen — continue routine PHC follow-up.","follow_up":"Add to annual camp list"}
`;

function patientContextBlock(p: Record<string, unknown>): string {
  const g = (p.glucose as { date: string; fasting: number; postMeal?: number }[]) || [];
  const v = (p.visits as { date: string; drStage: number; confidence: number; notes: string; imageQuality: number }[]) || [];
  const trend = g.slice(-4).map((x) => `${x.date}:${x.fasting}/${x.postMeal ?? "-"}`).join(", ") || "no trend";
  const prior = v.slice(-2).map((x) => `${x.date} stage ${x.drStage} conf ${(x.confidence * 100) | 0}% q${x.imageQuality} ${x.notes}`).join(" | ") || "no prior";
  return `Patient ${p.id} ${p.name} ${p.age}y ${p.gender} ${p.village} — ${p.diabetesType} ${p.diabetes_years}y, HbA1c ${p.hba1c}%, BP ${p.bp}, risk ${p.risk_score}/100, FH ${p.family_history ? "yes" : "no"}, symptoms [${JSON.parse((p.symptoms as string) || "[]").join(", ") || "none"}], meds ${p.medication} | Glucose ${trend} | Prior ${prior} | lastScreened ${p.last_screened || "never"} | foot ${p.foot_last_check || "never"}`;
}

// Context window management — token-aware, not just count
const MAX_HISTORY_TURNS = 8; // keep last 8 user+assistant pairs
const MAX_PROMPT_CHARS = 9000; // keep system + history under ~2k tokens for NIM

function buildMessages(
  patient: Record<string, unknown> | null,
  visit: Record<string, unknown> | null,
  history: { role: "user" | "assistant"; content: string; image_url?: string | null }[],
  userPrompt: string,
  imageUrl: string | null
): { role: string; content: unknown }[] {
  const msgs: { role: string; content: unknown }[] = [{ role: "system", content: SYSTEM_PROMPT }];

  // Patient + visit context as system-adjacent user message (so model always sees it, even if history trimmed)
  if (patient) {
    const ctx = patientContextBlock(patient);
    const visitCtx = visit ? `Current visit ${visit.date} stage ${visit.dr_stage} conf ${(Number(visit.confidence) * 100) | 0}% q${visit.image_quality} regions ${visit.heatmap_regions} notes ${visit.notes} image ${visit.image_url || "attached"}` : "No current visit yet — discuss image as hypothetical.";
    msgs.push({ role: "user", content: [{ type: "text", text: `CONTEXT — DO NOT REPEAT AS DIAGNOSIS, USE FOR REASONING:\n${ctx}\n${visitCtx}` }] });
    // NIM requires assistant ack to lock context (prevents prompt injection shift)
    msgs.push({ role: "assistant", content: [{ type: "text", text: "Context received. Awaiting fundus image and question. Will return JSON + markdown with disclaimer." }] });
  }

  // History — sliding window, keep last N turns, truncate oldest if too long
  let hist = history.slice(-MAX_HISTORY_TURNS * 2);
  // Rough char budget — if too long, drop oldest user message
  let chars = JSON.stringify(msgs).length + JSON.stringify(hist).length + userPrompt.length + (imageUrl?.length || 0);
  while (chars > MAX_PROMPT_CHARS && hist.length > 2) {
    hist = hist.slice(2); // drop oldest pair
    chars = JSON.stringify(msgs).length + JSON.stringify(hist).length + userPrompt.length + (imageUrl?.length || 0);
  }
  for (const h of hist) {
    if (h.image_url) {
      msgs.push({ role: h.role, content: [{ type: "text", text: h.content }, { type: "image_url", image_url: { url: h.image_url } }] });
    } else {
      msgs.push({ role: h.role, content: [{ type: "text", text: h.content }] });
    }
  }

  // Current turn — image + prompt together (vision models need image in same turn)
  if (imageUrl) {
    msgs.push({ role: "user", content: [{ type: "text", text: userPrompt }, { type: "image_url", image_url: { url: imageUrl } }] });
  } else {
    msgs.push({ role: "user", content: [{ type: "text", text: userPrompt }] });
  }
  return msgs;
}

async function callNimWithFallback(messages: unknown[], apiKey: string): Promise<{ model: string; data: unknown }> {
  const models = [
    { model: "meta/llama-3.2-90b-vision-instruct", payload: { messages, model: "meta/llama-3.2-90b-vision-instruct", max_tokens: 1200, temperature: 0.35, top_p: 0.9 } },
    { model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning", payload: { messages, model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning", max_tokens: 1800, temperature: 0.4, top_p: 0.9 } },
    { model: "moonshotai/kimi-k3", payload: { messages, model: "moonshotai/kimi-k3", max_tokens: 1200, temperature: 0.7, seed: 0 } },
  ];
  let lastErr = "";
  for (const m of models) {
    try {
      const res = await fetch(INVOKE_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(m.payload),
      });
      const data = (await res.json().catch(() => null)) as unknown;
      if (res.ok && data) return { model: m.model, data };
      lastErr = `HTTP ${res.status}: ${JSON.stringify(data).slice(0, 800)}`;
    } catch (e) {
      lastErr = e instanceof Error ? e.message : String(e);
    }
  }
  throw new Error(`All NIM models failed: ${lastErr}`);
}

export function mountChat(app: Hono<{ Bindings: Env }>) {
  // List chat history for a patient (optionally visit-scoped)
  app.get("/api/cases/:patientId/chat", async (c) => {
    const patientId = c.req.param("patientId");
    const visitId = c.req.query("visitId");
    const sql = visitId
      ? "SELECT id, role, content, image_url, model, created_at FROM case_chats WHERE patient_id = ? AND (visit_id = ? OR visit_id IS NULL) ORDER BY created_at ASC LIMIT 100"
      : "SELECT id, role, content, image_url, model, created_at FROM case_chats WHERE patient_id = ? ORDER BY created_at ASC LIMIT 100";
    const binds = visitId ? [patientId, visitId] : [patientId];
    const { results } = await c.env.DB.prepare(sql).bind(...binds).all();
    return c.json({ chats: results || [] });
  });

  // Post a new chat turn — state-of-art context management + NIM fallback
  app.post("/api/cases/:patientId/chat", async (c) => {
    const patientId = c.req.param("patientId");
    const body = await c.req.json<{ message: string; image_url?: string; imageUrl?: string; visitId?: string; visit_id?: string }>();
    const userMessage = (body.message || "").trim();
    if (!userMessage) return c.json({ error: "message required" }, 400);
    const imageUrl = body.image_url || body.imageUrl || null;
    const visitId = body.visitId || body.visit_id || null;

    // Load patient + visit for context (real mocks from D1)
    const patient = await c.env.DB.prepare("SELECT * FROM patients WHERE id = ?").bind(patientId).first<Record<string, unknown>>();
    if (!patient) return c.json({ error: "Patient not found" }, 404);
    const visit = visitId ? await c.env.DB.prepare("SELECT * FROM visits WHERE id = ?").bind(visitId).first<Record<string, unknown>>() : null;

    // Load history for context window
    const histRows = await c.env.DB.prepare(
      visitId
        ? "SELECT role, content, image_url FROM case_chats WHERE patient_id = ? AND (visit_id = ? OR visit_id IS NULL) ORDER BY created_at DESC LIMIT 16"
        : "SELECT role, content, image_url FROM case_chats WHERE patient_id = ? ORDER BY created_at DESC LIMIT 16"
    )
      .bind(...(visitId ? [patientId, visitId] : [patientId]))
      .all<{ role: string; content: string; image_url: string | null }>();
    const history = (histRows.results || []).reverse().map((r) => ({ role: r.role as "user" | "assistant", content: r.content, image_url: r.image_url }));

    // Resolve API key (Worker secret > D1 encrypted)
    let apiKey = c.env.NVIDIA_API_KEY || "";
    if (!apiKey && c.env.ENCRYPTION_KEY) {
      const fromDb = await getEncryptedSecret(c.env.DB, "NVIDIA_API_KEY", c.env.ENCRYPTION_KEY).catch(() => null);
      if (fromDb) apiKey = fromDb;
    }
    if (!apiKey) return c.json({ error: "NVIDIA_API_KEY not configured. wrangler secret put NVIDIA_API_KEY" }, 500);

    // Build messages with engineered system prompt + patient context + sliding window
    const messages = buildMessages(patient, visit, history, userMessage, imageUrl);

    // Persist user turn first (so history is durable even if NIM fails)
    const userId = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    await c.env.DB.prepare(`INSERT INTO case_chats (id, patient_id, visit_id, role, content, image_url, model) VALUES (?, ?, ?, 'user', ?, ?, ?)`)
      .bind(userId, patientId, visitId, userMessage, imageUrl, "user")
      .run();

    // Call NIM with fallback
    const started = Date.now();
    let modelUsed = "";
    let assistantText = "";
    try {
      const r = await callNimWithFallback(messages, apiKey);
      modelUsed = r.model;
      const d = r.data as Record<string, unknown>;
      // Try extract assistant content from various NIM response shapes
      const choice = (d as { choices?: { message?: { content?: string } }[] })?.choices?.[0]?.message?.content;
      const content = (d as { content?: string })?.content;
      assistantText = (choice as string) || (content as string) || JSON.stringify(d).slice(0, 4000);
      // If model returned JSON string, keep it; else wrap
      if (!assistantText.includes("disclaimer")) {
        assistantText += "\n\n*Disclaimer: Preliminary AI — ophthalmologist confirmation required.*";
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      assistantText = `I couldn't reach the vision models just now (all 3 failed: ${msg.slice(0, 300)}). Based on local rule: risk ${patient.risk_score}, last stage ${visit ? (visit.dr_stage as number) : "unknown"} — please retake if quality <60, otherwise routine eSanjeevani referral if stage ≥2. Avoid diagnosis without image review.`;
      modelUsed = "fallback-local";
    }

    const latency = Date.now() - started;
    const asstId = `chat_${Date.now() + 1}_${Math.random().toString(36).slice(2, 6)}`;
    await c.env.DB.prepare(
      `INSERT INTO case_chats (id, patient_id, visit_id, role, content, image_url, model, latency_ms) VALUES (?, ?, ?, 'assistant', ?, ?, ?, ?)`
    )
      .bind(asstId, patientId, visitId, assistantText, imageUrl, modelUsed, latency)
      .run();

    return c.json({ ok: true, id: asstId, model: modelUsed, content: assistantText, latency_ms: latency });
  });

  // Clear chat for a case (for testing)
  app.delete("/api/cases/:patientId/chat", async (c) => {
    const patientId = c.req.param("patientId");
    const visitId = c.req.query("visitId");
    if (visitId) await c.env.DB.prepare("DELETE FROM case_chats WHERE patient_id = ? AND visit_id = ?").bind(patientId, visitId).run();
    else await c.env.DB.prepare("DELETE FROM case_chats WHERE patient_id = ?").bind(patientId).run();
    return c.json({ ok: true });
  });
}
