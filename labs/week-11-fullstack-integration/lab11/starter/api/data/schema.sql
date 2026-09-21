-- ═══════════════════════════════════════════════════════════
-- Campus Service Request — โครงสร้างฐานข้อมูล
-- ENGSE203 สัปดาห์ที่ 9 · หน่วยที่ 4
-- รันไฟล์นี้แล้วได้ฐานข้อมูลพร้อมใช้ทันที
-- ═══════════════════════════════════════════════════════════

-- เปิดการตรวจ foreign key (SQLite ปิดไว้เป็นค่าเริ่มต้น)
PRAGMA foreign_keys = ON;

-- ลบของเดิมก่อน เพื่อให้รันซ้ำได้โดยไม่ error
-- ⚠ ลบ requests ก่อน เพราะมันอ้างถึง users
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS users;

-- ───────────────────────────────────────────
-- ตาราง users — ผู้แจ้งคำร้อง
-- ───────────────────────────────────────────
CREATE TABLE users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  department  TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE
);

-- ───────────────────────────────────────────
-- ตาราง requests — คำร้องขอใช้บริการ
-- ───────────────────────────────────────────
CREATE TABLE requests (
  id            TEXT PRIMARY KEY,
  requester_id  INTEGER NOT NULL,
  request_type  TEXT NOT NULL
                CHECK (request_type IN ('แจ้งซ่อม','บริการบัญชีผู้ใช้','ขอใช้อุปกรณ์','อื่น ๆ')),
  location      TEXT NOT NULL,
  details       TEXT NOT NULL,
  priority      TEXT NOT NULL DEFAULT 'normal'
                CHECK (priority IN ('normal','urgent')),
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','in-progress','completed')),
  created_at    TEXT NOT NULL DEFAULT (datetime('now','localtime')),

  FOREIGN KEY (requester_id) REFERENCES users(id)
);

-- ───────────────────────────────────────────
-- ข้อมูลตั้งต้น
-- ───────────────────────────────────────────
INSERT INTO users (name, department, email) VALUES
  ('สมชาย ใจดี',      'วิศวกรรมซอฟต์แวร์', 'somchai@rmutl.ac.th'),
  ('สุภาวดี รักเรียน', 'วิศวกรรมซอฟต์แวร์', 'supawadee@rmutl.ac.th'),
  ('ธนกฤต ตั้งใจ',     'วิศวกรรมไฟฟ้า',     'thanakrit@rmutl.ac.th'),
  ('ปรียา ขยันยิ่ง',   'สำนักวิทยบริการ',   'preeya@rmutl.ac.th');

INSERT INTO requests (id, requester_id, request_type, location, details, priority, status) VALUES
  ('REQ-001', 1, 'แจ้งซ่อม',          'ห้องปฏิบัติการ 301',      'เครื่องปรับอากาศไม่ทำงานตั้งแต่เช้า',  'urgent', 'pending'),
  ('REQ-002', 2, 'บริการบัญชีผู้ใช้', 'อาคารวิศวกรรมซอฟต์แวร์', 'เข้าสู่ระบบห้องปฏิบัติการไม่ได้',       'normal', 'in-progress'),
  ('REQ-003', 3, 'ขอใช้อุปกรณ์',      'ห้องประชุม 2',            'ขอยืมโปรเจกเตอร์สำหรับนำเสนอโครงงาน',  'normal', 'completed'),
  ('REQ-004', 1, 'แจ้งซ่อม',          'ห้องปฏิบัติการ 302',      'คอมพิวเตอร์เครื่องที่ 5 เปิดไม่ติด',    'urgent', 'pending'),
  ('REQ-005', 4, 'อื่น ๆ',             'ห้องสมุด ชั้น 2',         'ขอเพิ่มปลั๊กไฟบริเวณโต๊ะอ่านหนังสือ',  'normal', 'pending');

-- ⭐ Challenge: index ให้การค้นด้วย status และ requester เร็วขึ้น
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_requester ON requests(requester_id);
