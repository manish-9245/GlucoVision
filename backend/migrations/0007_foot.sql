-- 0007_foot — foot screening analysis per patient (for all mock patients and dynamic AI)
ALTER TABLE patients ADD COLUMN foot_analysis TEXT DEFAULT NULL;
ALTER TABLE patients ADD COLUMN foot_checks TEXT DEFAULT NULL;
