-- 0002_secrets — encrypted creds + NIM audit log
-- NVIDIA_API_KEY is stored as Cloudflare Worker secret (wrangler secret put NVIDIA_API_KEY)
-- This table holds encrypted copies for rotation / per-user keys and audit

CREATE TABLE IF NOT EXISTS secrets (
  id TEXT PRIMARY KEY,
  key_name TEXT NOT NULL UNIQUE,
  encrypted_value TEXT NOT NULL,
  iv TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE TABLE IF NOT EXISTS nim_requests (
  id TEXT PRIMARY KEY,
  patient_id TEXT,
  visit_id TEXT,
  model TEXT NOT NULL,
  prompt TEXT,
  image_url TEXT,
  status TEXT NOT NULL CHECK (status IN ('success','fallback','failed')),
  latency_ms INTEGER,
  error TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE INDEX IF NOT EXISTS idx_nim_patient ON nim_requests(patient_id);
CREATE INDEX IF NOT EXISTS idx_nim_created ON nim_requests(created_at);
