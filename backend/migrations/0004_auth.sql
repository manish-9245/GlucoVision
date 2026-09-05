-- 0004_auth — users + sessions for login/signup, end-to-end coherence
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('asha','mo','ophthalmologist','pharmacist','admin')) DEFAULT 'asha',
  phc TEXT,
  village TEXT,
  phone TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Demo seed users (password: demo123 — hashed at seed time via Worker PBKDF2, here precomputed with salt demo)
-- Salt and hash will be overwritten by seed script with proper PBKDF2; these are placeholders for local dev
INSERT OR IGNORE INTO users (id, name, email, password_hash, salt, role, phc, village, phone) VALUES
  ('u_asha', 'Asha Kokate', 'asha@glucovision.in', 'BkfREwepS8sdKfG+jjbcyo5D/Y8A+YTYAXmeMxzTHoE=', 'YXNoYV9zYWx0XzE2Ynl0ZXMh', 'asha', 'Shirpur Rural', 'Shirpur, Dhule', '98XXXXX101'),
  ('u_mo', 'Dr. Mehta', 'mo@glucovision.in', 't0e1PteVuvXZHHBt3E9ldpqrenKJbFNJU9GIGIaF8rM=', 'bW9fc2FsdF8xNmJ5dGVzISEh', 'mo', 'Shirpur Rural', 'Shirpur, Dhule', '98XXXXX102'),
  ('u_eye', 'Dr. Kulkarni', 'eye@glucovision.in', 'VZIc5wKaYQpjuzDYnBo00RvnpBvCO6aVQzy5K6uauKY=', 'ZXllX3NhbHRfMTZieXRlcyEh', 'ophthalmologist', 'GMC Dhule', 'Dhule', '98XXXXX103'),
  ('u_pharma', 'Sunil Joshi', 'pharma@glucovision.in', 'AxLAdG/aQSBAdwO+XGDOerm/xeILZxmkkMorjupFgVw=', 'cGhhcm1hX3NhbHRfMTZiISE=', 'pharmacist', 'Shirpur Rural', 'Shirpur, Dhule', '98XXXXX104'),
  ('u_admin', 'Admin', 'admin@glucovision.in', '7XPiysdhdgVmXLuqEDi0RUMBJfd98hcn0faBZ6orqP8=', 'YWRtaW5fc2FsdF8xNmJ5dGVz', 'admin', 'HQ', 'Pune', '98XXXXX105');
