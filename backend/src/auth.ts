import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

type Env = {
  DB: D1Database;
  JWT_SECRET: string;
  ENCRYPTION_KEY: string;
};

const ITER = 100000;

function b64urlEncode(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(s: string): Uint8Array {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
}
function b64ToBytes(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}
function bytesToB64(bytes: Uint8Array): string {
  let s = "";
  for (const byte of bytes) s += String.fromCharCode(byte);
  return btoa(s);
}

async function pbkdf2Hash(password: string, saltB64: string): Promise<string> {
  const salt = b64ToBytes(saltB64);
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: ITER, hash: "SHA-256" }, key, 256);
  return bytesToB64(new Uint8Array(bits));
}

async function signJWT(payload: Record<string, unknown>, secret: string): Promise<string> {
  const header = b64urlEncode(new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const body = b64urlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const data = `${header}.${body}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return `${data}.${b64urlEncode(new Uint8Array(sig))}`;
}

async function verifyJWT(token: string, secret: string): Promise<Record<string, unknown> | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [h, p, s] = parts;
  const data = `${h}.${p}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const sig = b64urlDecode(s);
  const ok = await crypto.subtle.verify("HMAC", key, sig, new TextEncoder().encode(data));
  if (!ok) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(p)));
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function mountAuth(app: Hono<{ Bindings: Env }>) {
  // POST /api/auth/signup
  app.post("/api/auth/signup", async (c) => {
    const body = await c.req.json<{ name: string; email: string; password: string; role?: string; phc?: string; village?: string; phone?: string }>();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";
    const role = (body.role || "asha") as string;
    if (!name || !email || !password) return c.json({ error: "name, email, password required" }, 400);
    if (password.length < 6) return c.json({ error: "password must be >=6 chars" }, 400);
    if (!["asha", "mo", "ophthalmologist", "pharmacist", "admin"].includes(role)) return c.json({ error: "invalid role" }, 400);
    const exists = await c.env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    if (exists) return c.json({ error: "email already registered" }, 409);

    const saltBytes = crypto.getRandomValues(new Uint8Array(16));
    const saltB64 = bytesToB64(saltBytes);
    const hash = await pbkdf2Hash(password, saltB64);
    const id = `u_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const now = new Date().toISOString();
    await c.env.DB.prepare(
      `INSERT INTO users (id, name, email, password_hash, salt, role, phc, village, phone, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(id, name, email, hash, saltB64, role, body.phc || null, body.village || null, body.phone || null, now, now)
      .run();

    const secret = c.env.JWT_SECRET || c.env.ENCRYPTION_KEY || "dev-secret-change-me";
    const token = await signJWT({ sub: id, email, role, name, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 }, secret);
    const user = { id, name, email, role, phc: body.phc || null, village: body.village || null, phone: body.phone || null };
    // Set httpOnly cookie for SSR + return token for localStorage (offline)
    setCookie(c, "gv_token", token, { httpOnly: true, secure: true, sameSite: "Lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
    return c.json({ ok: true, token, user }, 201);
  });

  // POST /api/auth/login
  app.post("/api/auth/login", async (c) => {
    const body = await c.req.json<{ email: string; password: string }>();
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";
    if (!email || !password) return c.json({ error: "email and password required" }, 400);
    const row = await c.env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first<{
      id: string;
      name: string;
      email: string;
      password_hash: string;
      salt: string;
      role: string;
      phc: string | null;
      village: string | null;
      phone: string | null;
    }>();
    if (!row) return c.json({ error: "invalid email or password" }, 401);
    const hash = await pbkdf2Hash(password, row.salt);
    if (hash !== row.password_hash) return c.json({ error: "invalid email or password" }, 401);

    const secret = c.env.JWT_SECRET || c.env.ENCRYPTION_KEY || "dev-secret-change-me";
    const token = await signJWT({ sub: row.id, email: row.email, role: row.role, name: row.name, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 }, secret);
    const user = { id: row.id, name: row.name, email: row.email, role: row.role, phc: row.phc, village: row.village, phone: row.phone };
    setCookie(c, "gv_token", token, { httpOnly: true, secure: true, sameSite: "Lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
    return c.json({ ok: true, token, user });
  });

  // GET /api/auth/me
  app.get("/api/auth/me", async (c) => {
    const auth = c.req.header("Authorization") || "";
    const cookieToken = getCookie(c, "gv_token");
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : cookieToken;
    if (!token) return c.json({ error: "not authenticated" }, 401);
    const secret = c.env.JWT_SECRET || c.env.ENCRYPTION_KEY || "dev-secret-change-me";
    const payload = await verifyJWT(token, secret);
    if (!payload) return c.json({ error: "invalid or expired token" }, 401);
    const row = await c.env.DB.prepare("SELECT id, name, email, role, phc, village, phone, created_at FROM users WHERE id = ?")
      .bind(payload.sub as string)
      .first();
    if (!row) return c.json({ error: "user not found" }, 404);
    return c.json({ user: row, payload });
  });

  // POST /api/auth/logout
  app.post("/api/auth/logout", (c) => {
    deleteCookie(c, "gv_token", { path: "/" });
    return c.json({ ok: true });
  });

  // GET /api/auth/users (admin only — list demo accounts)
  app.get("/api/auth/users", async (c) => {
    const auth = c.req.header("Authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : getCookie(c, "gv_token");
    if (token) {
      const secret = c.env.JWT_SECRET || c.env.ENCRYPTION_KEY || "dev-secret-change-me";
      const p = await verifyJWT(token, secret);
      if (p && (p.role === "admin" || p.role === "mo")) {
        const { results } = await c.env.DB.prepare("SELECT id, name, email, role, phc, village FROM users ORDER BY role, name").all();
        return c.json({ users: results });
      }
    }
    // For demo, allow listing without auth but hide hashes
    const { results } = await c.env.DB.prepare("SELECT id, name, email, role, phc, village FROM users ORDER BY role, name").all();
    return c.json({ users: results });
  });
}
