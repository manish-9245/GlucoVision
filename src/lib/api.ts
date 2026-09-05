// GlucoVision API client — talks to Cloudflare D1 Worker (Hono) when configured, falls back to local mock + localStorage
const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

export async function apiFetch<T>(path: string, opts: RequestInit = {}): Promise<T> {
  if (!API_BASE) throw new Error("NEXT_PUBLIC_API_URL not set — using local mock");
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} — ${txt}`);
  }
  return res.json() as Promise<T>;
}

// Types re-export
export type { Patient, Referral, PharmacyOrder } from "./types";
