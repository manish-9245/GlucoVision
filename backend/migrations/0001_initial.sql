-- GlucoVision D1 schema — Cloudflare D1 (SQLite)
-- Deploy: wrangler d1 migrations apply glucovision --remote

CREATE TABLE IF NOT EXISTS patients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('M','F','Other')),
  village TEXT NOT NULL,
  phone TEXT,
  diabetes_years INTEGER NOT NULL DEFAULT 0,
  diabetes_type TEXT NOT NULL DEFAULT 'Type 2',
  bp TEXT,
  hba1c REAL,
  family_history INTEGER NOT NULL DEFAULT 0,
  symptoms TEXT NOT NULL DEFAULT '[]',
  risk_score INTEGER NOT NULL DEFAULT 0,
  last_screened TEXT,
  medication TEXT NOT NULL DEFAULT '[]',
  foot_last_check TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE TABLE IF NOT EXISTS glucose_readings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  fasting INTEGER NOT NULL,
  post_meal INTEGER,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE TABLE IF NOT EXISTS visits (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  dr_stage INTEGER NOT NULL CHECK (dr_stage BETWEEN 0 AND 4),
  confidence REAL NOT NULL,
  heatmap_regions TEXT NOT NULL DEFAULT '[]',
  notes TEXT,
  image_quality INTEGER,
  image_url TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE TABLE IF NOT EXISTS referrals (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  stage INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending','confirmed','completed')),
  doctor TEXT,
  via TEXT NOT NULL DEFAULT 'eSanjeevani' CHECK (via IN ('eSanjeevani','Direct')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE TABLE IF NOT EXISTS pharmacy_orders (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  patient_name TEXT NOT NULL,
  prescription TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending','verified','dispatched','delivered')),
  pharmacist TEXT,
  date TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE TABLE IF NOT EXISTS foot_checks (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  risk TEXT NOT NULL CHECK (risk IN ('low','moderate','high')),
  flags TEXT NOT NULL DEFAULT '[]',
  image_quality INTEGER,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_patients_village ON patients(village);
CREATE INDEX IF NOT EXISTS idx_patients_risk ON patients(risk_score);
CREATE INDEX IF NOT EXISTS idx_glucose_patient_date ON glucose_readings(patient_id, date);
CREATE INDEX IF NOT EXISTS idx_visits_patient_date ON visits(patient_id, date);
CREATE INDEX IF NOT EXISTS idx_visits_stage ON visits(dr_stage);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_pharmacy_status ON pharmacy_orders(status);
