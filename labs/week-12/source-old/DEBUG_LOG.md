# บันทึกการไล่ปัญหา (Debug Log)

🏫 **TODO W12-LOG (CP45 · CP47)** — แต่ละ bug ตอบ 6 ข้อ · เขียนสั้น ๆ แต่ต้องชัด

> BUG #0 ไม่มีผู้ใช้แจ้ง — คุณจะเจอเองตอนเขียน unit test ค่าขอบใน CP45
> BUG #1–#3 มาจาก `BUG_REPORTS.md`

---

## BUG #0 · ค่าขอบรายละเอียด 10 ตัวอักษร (test เจอ — ไม่มีผู้ใช้แจ้ง)
- **อาการ:** ส่งรายละเอียด 10 ตัวอักษรพอดี ถูกปฏิเสธ ทั้งที่ข้อความบอกว่า "อย่างน้อย 10"
- **วิธีทำซ้ำ:** unit test `validateRequestInput({ ...valid, details: '1234567890' })`
- **เครื่องมือ:** unit test ค่าขอบ (TC-03) — fail ทันทีที่เขียน
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/validators/requestValidator.js` เงื่อนไข `length <= MIN_DETAILS`
- **วิธีแก้:** เปลี่ยนเป็น `length < MIN_DETAILS`
- **test ที่กัน:** `tests/unit/requestValidator.test.js` → "10 ตัวอักษร → ผ่าน (ตรงขอบพอดี)"

## BUG #1 · ลบคำร้องแล้วเพิ่มใหม่ ได้ 500
- **อาการ:** ลบ REQ-002 แล้ว POST คำร้องใหม่ ได้ 500
- **วิธีทำซ้ำ:** `curl -X DELETE localhost:3001/api/requests/REQ-002` แล้ว POST
- **เครื่องมือ:** log (UNIQUE constraint failed) + breakpoint ใน nextId()
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/services/requestService.js:101` นับจำนวนแถว +1 ได้ REQ-005 ซ้ำ
- **วิธีแก้:** หารหัสล่าสุดแล้ว +1
- **test ที่กัน:** `tests/integration/requests.api.test.js` → "ลบรายการกลาง แล้วเพิ่มใหม่ → 201 และรหัสไม่ซ้ำของเดิม"

## BUG #2 · Dashboard แสดง "กำลังดำเนินการ 0"
- **อาการ:** การ์ดกำลังดำเนินการแสดง 0
- **วิธีทำซ้ำ:** เปิด Dashboard
- **เครื่องมือ:** DevTools Network → API ส่ง "in-progress" ถูก
- **สาเหตุ (ไฟล์:บรรทัด):** `frontend/src/utils/requestSummary.js:12` นับ 'in progress' (ช่องว่าง)
- **วิธีแก้:** เปลี่ยนเป็น 'in-progress'
- **test ที่กัน:** `frontend/src/utils/requestSummary.test.js` → "นับครบทุกสถานะ"

## BUG #3 · เปลี่ยนสถานะคำร้องที่ไม่มีอยู่ ได้ 500
- **อาการ:** `PUT /api/requests/REQ-999` ได้ 500 แทน 404
- **วิธีทำซ้ำ:** `curl -X PUT localhost:3001/api/requests/REQ-999 -H "Content-Type: application/json" -d '{"status":"completed"}'`
- **เครื่องมือ:** อ่าน stack trace ใน terminal — `TypeError: Cannot read properties of null (reading 'id')`
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/controllers/requestController.js:30` log `updated.id` อยู่ก่อน `if (!updated)`
- **วิธีแก้:** ย้าย log ไปไว้หลังการตรวจ null
- **test ที่กัน:** `tests/integration/requests.api.test.js` → "คำร้องที่ไม่มีอยู่ → 404 (ไม่ใช่ 500)"
