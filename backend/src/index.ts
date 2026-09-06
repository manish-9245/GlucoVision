import { Hono } from "hono";
import { cors } from "hono/cors";
import { mountNim } from "./nim";
import { mountChat } from "./chat";
import { mountAuth } from "./auth";

type Env = {
  DB: D1Database;
  IMAGES?: R2Bucket;
  NVIDIA_API_KEY: string;
  ENCRYPTION_KEY: string;
  JWT_SECRET: string;
  ALLOWED_ORIGIN?: string;
};

type PatientRow = {
  id: string;
  name: string;
  age: number;
  gender: string;
  village: string;
  phone: string;
  diabetes_years: number;
  diabetes_type: string;
  bp: string;
  hba1c: number;
  family_history: number;
  symptoms: string;
  risk_score: number;
  last_screened: string | null;
  medication: string;
  prescriptions: string | null;
  foot_last_check: string | null;
  foot_analysis: string | null;
  foot_checks: string | null;
};

const app = new Hono<{ Bindings: Env }>();

app.use(
  "/*",
  cors({
    origin: (origin, c) => {
      const allowed = c.env.ALLOWED_ORIGIN?.split(",").map((s: string) => s.trim()).filter(Boolean) ?? [];
      if (allowed.length === 0) return origin ?? "*";
      if (!origin) return allowed[0];
      return allowed.includes(origin) ? origin : allowed[0];
    },
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Health
app.get("/api/health", (c) => c.json({ ok: true, service: "glucovision-api", time: new Date().toISOString() }));

// Auth — login/signup make app coherent end-to-end (PHC → MO → ophthalmologist → pharmacy)
mountAuth(app);

// NVIDIA NIM — keep parity with Python backup (import requests) — fallback across 3 models, encrypted creds
mountNim(app);
mountChat(app);

// Helpers
function toPatient(row: PatientRow, glucose: { date: string; fasting: number; post_meal: number | null }[], visits: unknown[]) {
  let prescriptions: unknown[] | undefined;
  try {
    prescriptions = row.prescriptions ? JSON.parse(row.prescriptions) : undefined;
  } catch {
    prescriptions = undefined;
  }
  let footAnalysis: unknown | undefined;
  try {
    footAnalysis = (row as unknown as { foot_analysis?: string }).foot_analysis ? JSON.parse((row as unknown as { foot_analysis: string }).foot_analysis) : undefined;
  } catch {
    footAnalysis = undefined;
  }
  let footChecks: unknown[] | undefined;
  try {
    footChecks = (row as unknown as { foot_checks?: string }).foot_checks ? JSON.parse((row as unknown as { foot_checks: string }).foot_checks) : undefined;
  } catch {
    footChecks = undefined;
  }
  return {
    id: row.id,
    name: row.name,
    age: row.age,
    gender: row.gender,
    village: row.village,
    phone: row.phone,
    diabetesYears: row.diabetes_years,
    diabetesType: row.diabetes_type as "Type 1" | "Type 2",
    bp: row.bp,
    hbA1c: row.hba1c,
    familyHistory: !!row.family_history,
    symptoms: JSON.parse(row.symptoms || "[]"),
    riskScore: row.risk_score,
    glucose: glucose.map((g) => ({ date: g.date, fasting: g.fasting, postMeal: g.post_meal ?? undefined })),
    visits,
    lastScreened: row.last_screened || undefined,
    medication: JSON.parse(row.medication || "[]"),
    prescriptions,
    footLastCheck: row.foot_last_check || undefined,
    footAnalysis,
    footChecks,
  };
}

// GET /api/patients?search=&village=&riskMin=&limit=&offset=
app.get("/api/patients", async (c) => {
  const q = c.req.query("search")?.toLowerCase();
  const village = c.req.query("village");
  const riskMin = c.req.query("riskMin");
  const limit = Math.min(parseInt(c.req.query("limit") || "50"), 100);
  const offset = parseInt(c.req.query("offset") || "0");

  let sql = "SELECT * FROM patients WHERE 1=1";
  const binds: unknown[] = [];
  if (q) {
    sql += " AND (lower(name) LIKE ? OR lower(village) LIKE ? OR lower(id) LIKE ?)";
    binds.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  if (village) {
    sql += " AND village = ?";
    binds.push(village);
  }
  if (riskMin) {
    sql += " AND risk_score >= ?";
    binds.push(parseInt(riskMin));
  }
  sql += " ORDER BY risk_score DESC, last_screened DESC LIMIT ? OFFSET ?";
  binds.push(limit, offset);

  const { results } = await c.env.DB.prepare(sql).bind(...binds).all<PatientRow>();
  const patients = await Promise.all(
    (results || []).map(async (row) => {
      const glucose = await c.env.DB.prepare("SELECT date, fasting, post_meal FROM glucose_readings WHERE patient_id = ? ORDER BY date")
        .bind(row.id)
        .all<{ date: string; fasting: number; post_meal: number | null }>();
      const visits = await c.env.DB.prepare("SELECT id, date, dr_stage, confidence, heatmap_regions, notes, image_quality, image_url, eye, analysis FROM visits WHERE patient_id = ? ORDER BY date DESC")
        .bind(row.id)
        .all();
      const mappedVisits = (visits.results || []).map((v: Record<string, unknown>) => {
        let analysis: unknown = undefined;
        try {
          analysis = v.analysis ? JSON.parse(v.analysis as string) : undefined;
        } catch {}
        let dietPlan: unknown = undefined;
        if (analysis && typeof analysis === "object" && "dietPlan" in (analysis as Record<string, unknown>)) {
          dietPlan = (analysis as Record<string, unknown>).dietPlan;
        }
        return {
          id: v.id,
          date: v.date,
          drStage: v.dr_stage,
          confidence: v.confidence,
          heatmapRegions: JSON.parse((v.heatmap_regions as string) || "[]"),
          notes: v.notes,
          imageQuality: v.image_quality,
          imageUrl: v.image_url,
          eye: (v.eye as string) || "left",
          analysis,
          dietPlan,
        };
      });
      return toPatient(row, (glucose.results || []) as never, mappedVisits);
    })
  );
  return c.json({ patients, count: patients.length, limit, offset });
});

app.get("/api/patients/:id", async (c) => {
  const id = c.req.param("id");
  const row = await c.env.DB.prepare("SELECT * FROM patients WHERE id = ?").bind(id).first<PatientRow>();
  if (!row) return c.json({ error: "Not found" }, 404);
  const glucose = await c.env.DB.prepare("SELECT date, fasting, post_meal FROM glucose_readings WHERE patient_id = ? ORDER BY date").bind(id).all();
  const visits = await c.env.DB.prepare("SELECT id, date, dr_stage, confidence, heatmap_regions, notes, image_quality, image_url, eye, analysis FROM visits WHERE patient_id = ? ORDER BY date DESC").bind(id).all();
  const mappedVisits = (visits.results || []).map((v: Record<string, unknown>) => {
    let analysis: unknown = undefined;
    try {
      analysis = v.analysis ? JSON.parse(v.analysis as string) : undefined;
    } catch {}
    let dietPlan: unknown = undefined;
    if (analysis && typeof analysis === "object" && "dietPlan" in (analysis as Record<string, unknown>)) {
      dietPlan = (analysis as Record<string, unknown>).dietPlan;
    }
    return {
      id: v.id,
      date: v.date,
      drStage: v.dr_stage,
      confidence: v.confidence,
      heatmapRegions: JSON.parse((v.heatmap_regions as string) || "[]"),
      notes: v.notes,
      imageQuality: v.image_quality,
      imageUrl: v.image_url,
      eye: (v.eye as string) || "left",
      analysis,
      dietPlan,
    };
  });
  const patient = toPatient(row, (glucose.results || []) as never, mappedVisits);
  return c.json({ patient });
});

app.patch("/api/patients/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<Record<string, unknown>>();
  const updates: string[] = [];
  const binds: unknown[] = [];
  const now = new Date().toISOString();
  if (body.footLastCheck || body.foot_last_check) {
    const date = (body.footLastCheck || body.foot_last_check) as string;
    updates.push("foot_last_check = ?");
    binds.push(date);
  }
  if (body.medication) {
    updates.push("medication = ?");
    binds.push(JSON.stringify(body.medication));
  }
  if (body.prescriptions) {
    updates.push("prescriptions = ?");
    binds.push(JSON.stringify(body.prescriptions));
  }
  if (body.riskScore !== undefined || body.risk_score !== undefined) {
    const v = (body.riskScore ?? body.risk_score) as number;
    updates.push("risk_score = ?");
    binds.push(v);
  }
  if (updates.length) {
    updates.push("updated_at = ?");
    binds.push(now);
    binds.push(id);
    await c.env.DB.prepare(`UPDATE patients SET ${updates.join(", ")} WHERE id = ?`).bind(...binds).run();
  }
  const row = await c.env.DB.prepare("SELECT * FROM patients WHERE id = ?").bind(id).first<PatientRow>();
  if (!row) return c.json({ error: "Not found" }, 404);
  return c.json({ patient: toPatient(row, [], []) });
});

app.post("/api/patients", async (c) => {
  const body = await c.req.json<{
    id?: string;
    name: string;
    age: number;
    gender: "M" | "F";
    village: string;
    phone?: string;
    diabetesYears: number;
    diabetesType?: string;
    bp: string;
    hbA1c: number;
    familyHistory?: boolean;
    symptoms?: string[];
    riskScore: number;
    medication?: string[];
    prescriptions?: unknown[];
  }>();
  if (!body.name || !body.village) return c.json({ error: "name and village required" }, 400);
  const id = body.id || `GV-${Date.now().toString().slice(-6)}`;
  const now = new Date().toISOString().slice(0, 10);
  await c.env.DB.prepare(
    `INSERT INTO patients (id, name, age, gender, village, phone, diabetes_years, diabetes_type, bp, hba1c, family_history, symptoms, risk_score, medication, prescriptions, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      id,
      body.name,
      body.age ?? 40,
      body.gender ?? "M",
      body.village,
      body.phone ?? "98XXXXX000",
      body.diabetesYears ?? 5,
      body.diabetesType ?? "Type 2",
      body.bp ?? "120/80",
      body.hbA1c ?? 7,
      body.familyHistory ? 1 : 0,
      JSON.stringify(body.symptoms ?? []),
      body.riskScore ?? 50,
      JSON.stringify(body.medication ?? []),
      JSON.stringify(body.prescriptions ?? []),
      now,
      now
    )
    .run();
  // seed one glucose
  await c.env.DB.prepare("INSERT INTO glucose_readings (patient_id, date, fasting, post_meal) VALUES (?, ?, ?, ?)")
    .bind(id, now, 130 + Math.floor(Math.random() * 40), 190 + Math.floor(Math.random() * 40))
    .run();
  const row = await c.env.DB.prepare("SELECT * FROM patients WHERE id = ?").bind(id).first<PatientRow>();
  return c.json({ patient: row ? toPatient(row, [], []) : { id } }, 201);
});

// POST /api/patients/:id/visits  { drStage, confidence, heatmapRegions, notes, imageQuality, imageUrl, eye, analysis, dietPlan }
app.post("/api/patients/:id/visits", async (c) => {
  const patientId = c.req.param("id");
  const exists = await c.env.DB.prepare("SELECT id FROM patients WHERE id = ?").bind(patientId).first();
  if (!exists) return c.json({ error: "Patient not found" }, 404);
  const body = await c.req.json<{
    drStage: number;
    confidence: number;
    heatmapRegions?: unknown[];
    notes?: string;
    imageQuality: number;
    imageUrl?: string;
    eye?: string;
    analysis?: unknown;
    dietPlan?: unknown;
    date?: string;
  }>();
  const id = `v${Date.now()}`;
  const date = body.date || new Date().toISOString().slice(0, 10);
  const analysisToStore = body.analysis || (body.dietPlan ? { dietPlan: body.dietPlan } : null);
  await c.env.DB.prepare(
    `INSERT INTO visits (id, patient_id, date, dr_stage, confidence, heatmap_regions, notes, image_quality, image_url, eye, analysis)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(id, patientId, date, body.drStage, body.confidence, JSON.stringify(body.heatmapRegions || []), body.notes || "", body.imageQuality, body.imageUrl || null, body.eye || "left", analysisToStore ? JSON.stringify(analysisToStore) : null)
    .run();
  await c.env.DB.prepare("UPDATE patients SET last_screened = ?, updated_at = ? WHERE id = ?").bind(date, new Date().toISOString(), patientId).run();
  // auto-referral if stage >=2
  if (body.drStage >= 2) {
    const refId = `REF-${Date.now().toString().slice(-6)}`;
    await c.env.DB.prepare(`INSERT INTO referrals (id, patient_id, date, stage, status, via) VALUES (?, ?, ?, ?, 'pending', 'eSanjeevani')`)
      .bind(refId, patientId, date, body.drStage)
      .run();
  }
  return c.json({ ok: true, id, date }, 201);
});

// Referrals
app.get("/api/referrals", async (c) => {
  const status = c.req.query("status");
  const sql = status ? "SELECT * FROM referrals WHERE status = ? ORDER BY date DESC" : "SELECT * FROM referrals ORDER BY date DESC";
  const binds = status ? [status] : [];
  const { results } = await (status ? c.env.DB.prepare(sql).bind(...binds).all() : c.env.DB.prepare(sql).all());
  return c.json({ referrals: results || [] });
});

app.post("/api/referrals", async (c) => {
  const body = await c.req.json<{ id?: string; patientId: string; patient_id?: string; date?: string; stage: number; status?: string; doctor?: string; via?: string }>();
  const id = body.id || `REF-${Date.now().toString().slice(-6)}`;
  const pid = body.patientId || body.patient_id;
  if (!pid) return c.json({ error: "patientId required" }, 400);
  const date = body.date || new Date().toISOString().slice(0, 10);
  await c.env.DB.prepare(`INSERT INTO referrals (id, patient_id, date, stage, status, doctor, via) VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, pid, date, body.stage, body.status || "pending", body.doctor || null, body.via || "eSanjeevani")
    .run();
  const row = await c.env.DB.prepare("SELECT * FROM referrals WHERE id = ?").bind(id).first();
  return c.json({ referral: row }, 201);
});

app.patch("/api/referrals/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<{ status?: string; doctor?: string }>();
  if (body.status) {
    await c.env.DB.prepare("UPDATE referrals SET status = ?, doctor = COALESCE(?, doctor) WHERE id = ?").bind(body.status, body.doctor || null, id).run();
  }
  const row = await c.env.DB.prepare("SELECT * FROM referrals WHERE id = ?").bind(id).first();
  return c.json({ referral: row });
});

// Pharmacy
app.get("/api/pharmacy", async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM pharmacy_orders ORDER BY date DESC").all();
  return c.json({ orders: results || [] });
});

app.post("/api/pharmacy", async (c) => {
  const body = await c.req.json<{ patientId: string; patientName: string; prescription: string; status?: string; pharmacist?: string }>();
  const id = `RX-${Date.now().toString().slice(-6)}`;
  const date = new Date().toISOString().slice(0, 10);
  await c.env.DB.prepare(`INSERT INTO pharmacy_orders (id, patient_id, patient_name, prescription, status, pharmacist, date) VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, body.patientId, body.patientName, body.prescription, body.status || "pending", body.pharmacist || null, date)
    .run();
  return c.json({ ok: true, id }, 201);
});

app.patch("/api/pharmacy/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<{ status?: string }>();
  if (body.status) await c.env.DB.prepare("UPDATE pharmacy_orders SET status = ? WHERE id = ?").bind(body.status, id).run();
  const row = await c.env.DB.prepare("SELECT * FROM pharmacy_orders WHERE id = ?").bind(id).first();
  return c.json({ order: row });
});

// Images — R2 (optional) — POST /api/upload  multipart
app.post("/api/upload", async (c) => {
  const form = await c.req.formData();
  const file = form.get("file") as File | null;
  if (!file) return c.json({ error: "file required" }, 400);
  const buf = await file.arrayBuffer();
  if (buf.byteLength > 8 * 1024 * 1024) return c.json({ error: "max 8MB" }, 413);
  const key = `fundus/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  if (c.env.IMAGES) {
    await c.env.IMAGES.put(key, buf, { httpMetadata: { contentType: file.type || "image/jpeg" } });
    return c.json({ key, url: `/api/images/${key}` }, 201);
  }
  // R2 not configured — return data URL fallback (still saves visit image_url in D1 as data URL, <1MB limit applies)
  const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
  const dataUrl = `data:${file.type || "image/jpeg"};base64,${b64}`;
  return c.json({ key, url: dataUrl, r2: false }, 201);
});

app.get("/api/images/:key{.*}", async (c) => {
  const key = c.req.param("key");
  if (!c.env.IMAGES) return c.json({ error: "R2 not enabled — enable via dashboard or use data URL" }, 501);
  const obj = await c.env.IMAGES.get(key);
  if (!obj) return c.json({ error: "Not found" }, 404);
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set("etag", obj.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return new Response(obj.body, { headers });
});

// Stats for dashboard
app.get("/api/stats", async (c) => {
  const total = await c.env.DB.prepare("SELECT COUNT(*) as c FROM patients").first<{ c: number }>();
  const highRisk = await c.env.DB.prepare("SELECT COUNT(*) as c FROM patients WHERE risk_score >= 70").first<{ c: number }>();
  const screened = await c.env.DB.prepare("SELECT COUNT(DISTINCT patient_id) as c FROM visits").first<{ c: number }>();
  const severe = await c.env.DB.prepare("SELECT COUNT(DISTINCT patient_id) as c FROM visits WHERE dr_stage >= 3").first<{ c: number }>();
  const pendingRef = await c.env.DB.prepare("SELECT COUNT(*) as c FROM referrals WHERE status='pending'").first<{ c: number }>();
  const dist = await c.env.DB.prepare(
    `SELECT
      SUM(CASE WHEN v.dr_stage = 0 THEN 1 ELSE 0 END) as noDR,
      SUM(CASE WHEN v.dr_stage IN (1,2) THEN 1 ELSE 0 END) as mildMod,
      SUM(CASE WHEN v.dr_stage IN (3,4) THEN 1 ELSE 0 END) as severePDR
     FROM (SELECT patient_id, dr_stage FROM visits WHERE (patient_id, date) IN (SELECT patient_id, MAX(date) FROM visits GROUP BY patient_id)) v`
  ).first<Record<string, number>>();
  const unscreened = (total?.c || 0) - (screened?.c || 0);
  return c.json({
    total: total?.c || 0,
    highRisk: highRisk?.c || 0,
    screened: screened?.c || 0,
    severe: severe?.c || 0,
    pendingReferrals: pendingRef?.c || 0,
    dist: {
      noDR: dist?.noDR || 0,
      mildMod: dist?.mildMod || 0,
      severePDR: dist?.severePDR || 0,
      unscreened: Math.max(0, unscreened),
    },
  });
});

// Fallback
app.get("/api/*", (c) => c.json({ error: "Not found" }, 404));

export default app;
