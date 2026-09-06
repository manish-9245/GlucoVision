-- 0006_eye — per-eye image support (left/right) for bilateral screening
ALTER TABLE visits ADD COLUMN eye TEXT CHECK (eye IN ('left','right')) DEFAULT 'left';
