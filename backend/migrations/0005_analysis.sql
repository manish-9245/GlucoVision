-- 0005_analysis — systematic analysis + prescriptions per visit/patient
-- Visits: explainable AI analysis (why stage/confidence/quality/risk)
ALTER TABLE visits ADD COLUMN analysis TEXT DEFAULT NULL;
-- Patients: detailed prescriptions as JSON array (per-patient medication plan)
ALTER TABLE patients ADD COLUMN prescriptions TEXT DEFAULT NULL;
-- Ensure image_url can store data URLs (already TEXT, no change needed)
