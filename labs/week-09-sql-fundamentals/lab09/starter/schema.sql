-- ═══════════════════════════════════════════════════════════
-- Campus Service Request — โครงสร้างฐานข้อมูล
-- ENGSE203 สัปดาห์ที่ 9 · หน่วยที่ 4
--
-- 🏠 TODO W09-SCHEMA (CP23)
-- ไฟล์นี้ต้องรันแล้วสร้างฐานข้อมูลได้ครบทั้งหมดในครั้งเดียว
-- และต้อง "รันซ้ำได้" โดยไม่ error
-- ═══════════════════════════════════════════════════════════

PRAGMA foreign_keys = ON;

-- TODO ①  ลบตารางเดิมก่อน เพื่อให้รันไฟล์นี้ซ้ำได้
--         ⚠ ลำดับสำคัญ — ต้องลบตารางที่มี foreign key ก่อน
--         คำใบ้: DROP TABLE IF EXISTS ...


-- TODO ②  สร้างตาราง users
--         ต้องมี: id (PK, INTEGER, AUTOINCREMENT)
--                name (TEXT, ห้ามว่าง)
--                department (TEXT, ห้ามว่าง)
--                email (TEXT, ห้ามว่าง, ห้ามซ้ำ)


-- TODO ③  สร้างตาราง requests
--         ต้องมี: id (PK, TEXT — ใช้รหัสแบบ REQ-001)
--                requester_id (INTEGER, ห้ามว่าง, ชี้ไป users(id))
--                request_type (TEXT, ห้ามว่าง, จำกัดค่าด้วย CHECK)
--                location, details (TEXT, ห้ามว่าง)
--                priority (ค่าเริ่มต้น 'normal', จำกัดด้วย CHECK)
--                status (ค่าเริ่มต้น 'pending', จำกัดด้วย CHECK)
--                created_at (ค่าเริ่มต้นเป็นเวลาปัจจุบัน)
--
--         ⚠ อย่าลืม FOREIGN KEY — เป็นหัวใจของสัปดาห์นี้


-- TODO ④  ใส่ข้อมูลตั้งต้น
--         users อย่างน้อย 4 คน · requests อย่างน้อย 5 รายการ
