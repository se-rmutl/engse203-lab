# บันทึกการไล่ปัญหา (Debug Log)

แต่ละ bug ตอบ 6 ข้อ: อาการ → ทำซ้ำ → เครื่องมือ → สาเหตุ → วิธีแก้ → test ที่กันไม่ให้กลับมา

---

## BUG #0 · ค่าขอบรายละเอียด 10 ตัวอักษร (test เจอ — ไม่มีผู้ใช้แจ้ง)

- **อาการ:** ส่งรายละเอียด 10 ตัวอักษรพอดี ถูกปฏิเสธ ทั้งที่ข้อความบอกว่า "อย่างน้อย 10"
- **วิธีทำซ้ำ:** unit test `validateRequestInput({ ...valid, details: '1234567890' })`
- **เครื่องมือ:** unit test ค่าขอบ (TC-03) — fail ทันทีที่เขียน
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/validators/requestValidator.js` เงื่อนไข `length <= MIN_DETAILS` ทำให้ 10 ตัวถูกนับว่าไม่ผ่าน
- **วิธีแก้:** เปลี่ยนเป็น `length < MIN_DETAILS`
- **test ที่กัน:** `tests/unit/requestValidator.test.js` → "10 ตัวอักษร → ผ่าน (ตรงขอบพอดี)"

## BUG #1 · ลบคำร้องแล้วเพิ่มใหม่ ได้ 500

- **อาการ:** หลังลบคำร้องรายการกลาง การสร้างคำร้องใหม่ได้ 500
- **วิธีทำซ้ำ:** `DELETE /api/requests/REQ-002` แล้ว `POST /api/requests` → 500
- **เครื่องมือ:** อ่าน log ใน terminal (`UNIQUE constraint failed: requests.id`) → วาง breakpoint ใน `nextId()` ด้วย JavaScript Debug Terminal เห็นว่าได้ `REQ-005` ซึ่งมีอยู่แล้ว
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/services/requestService.js` ฟังก์ชัน `nextId()` คำนวณรหัสจาก `COUNT(*) + 1` — เมื่อลบรายการกลาง จำนวนลดลง รหัสที่ได้จึงชนกับรหัสที่ยังอยู่
- **วิธีแก้:** หารหัสล่าสุด (`ORDER BY id DESC LIMIT 1`) แล้วบวก 1
- **test ที่กัน:** `tests/integration/requests.api.test.js` → "ลบรายการกลาง แล้วเพิ่มใหม่ → 201 และรหัสไม่ซ้ำของเดิม"

## BUG #2 · Dashboard แสดง "กำลังดำเนินการ 0"

- **อาการ:** การ์ดสรุปบอกว่ากำลังดำเนินการ 0 แต่ในรายการมีคำร้อง in-progress
- **วิธีทำซ้ำ:** เปิด Dashboard ด้วยข้อมูลตั้งต้น (REQ-002 เป็น in-progress)
- **เครื่องมือ:** DevTools → Network → `GET /api/requests` ส่ง `"status": "in-progress"` ถูกต้อง → ปัญหาอยู่ฝั่ง frontend → วาง breakpoint ใน `summarizeRequests` (DevTools → Sources)
- **สาเหตุ (ไฟล์:บรรทัด):** `frontend/src/utils/requestSummary.js` นับด้วย `'in progress'` (ช่องว่าง) แทน `'in-progress'` (ขีด) จึงไม่ตรงกับค่าที่ API ส่งมา
- **วิธีแก้:** ใช้ `'in-progress'` ให้ตรงกับ API
- **test ที่กัน:** `frontend/src/utils/requestSummary.test.js` → "นับครบทุกสถานะ"

## BUG #3 · เปลี่ยนสถานะคำร้องที่ไม่มีอยู่ ได้ 500

- **อาการ:** `PUT /api/requests/REQ-999` ได้ 500 แทน 404
- **วิธีทำซ้ำ:** `curl -X PUT localhost:3001/api/requests/REQ-999 -H "Content-Type: application/json" -d '{"status":"completed"}'`
- **เครื่องมือ:** อ่าน stack trace ใน terminal — บรรทัดแรกบอก `TypeError: Cannot read properties of null (reading 'id')` บรรทัดถัดไปบอกไฟล์และบรรทัดใน controller
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/controllers/requestController.js` ใน `updateRequestStatus` มีบรรทัด log `updated.id` อยู่**ก่อน**การตรวจ `if (!updated)` — เมื่อไม่พบคำร้อง `updated` เป็น null จึงพัง
- **วิธีแก้:** ย้าย log ไปไว้หลังการตรวจ null
- **test ที่กัน:** `tests/integration/requests.api.test.js` → "คำร้องที่ไม่มีอยู่ → 404 (ไม่ใช่ 500)"
