-- 0003_chat — case discussion chat with image, prompt-engineered context
CREATE TABLE IF NOT EXISTS case_chats (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  visit_id TEXT REFERENCES visits(id) ON DELETE SET NULL,
  role TEXT NOT NULL CHECK (role IN ('user','assistant','system')),
  content TEXT NOT NULL,
  image_url TEXT,
  model TEXT,
  tokens_in INTEGER DEFAULT 0,
  tokens_out INTEGER DEFAULT 0,
  latency_ms INTEGER,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE INDEX IF NOT EXISTS idx_case_patient ON case_chats(patient_id, created_at);
CREATE INDEX IF NOT EXISTS idx_case_visit ON case_chats(visit_id);

-- Extend visits to guarantee image_url is always persisted (R2 key or data URL fallback)
-- visits.image_url already exists from 0001, ensure index
CREATE INDEX IF NOT EXISTS idx_visits_image ON visits(image_url);
