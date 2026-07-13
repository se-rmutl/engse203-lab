# Instructor Script — Pre-LAB 3

## เป้าหมาย

ให้นักศึกษาทำตามทีละ checkpoint โดยยังไม่เปิด solution ทั้งไฟล์ ผู้สอนควรเปิดหน้าต่าง 3 ส่วนพร้อมกัน:

1. VS Code — Starter code
2. Browser — ผลลัพธ์
3. DevTools — Console และ Responsive viewport

## Step 0 — เปิดโจทย์และตั้งคำถาม (5 นาที)

ถามก่อนพิมพ์โค้ด:

- Form ส่วนใดคือ input และส่วนใดคือ output?
- เมื่อพิมพ์ชื่อ เราควรใช้ event อะไร?
- เมื่อกด Submit ทำไมต้อง `preventDefault()`?
- Error ควรแสดงใกล้ช่องหรือเฉพาะด้านบน?

## Step 1 — Semantic Form (10 นาที)

พิมพ์ field 3 ชุดตาม solution:

- `displayName`
- `learningRole`
- `learningGoal`

เน้นความสัมพันธ์ `label for` ↔ `input id` และ `name` ที่ FormData ใช้อ่านค่า

**Checkpoint:** ปิด CSS ชั่วคราวแล้วยังอ่านและกรอกตามลำดับได้

## Step 2 — Mobile-first CSS (10 นาที)

เริ่มจาก `.page-grid { grid-template-columns: 1fr; }` ก่อน จากนั้นเพิ่ม media query ที่ `48rem`

**Checkpoint:** 375px เป็นหนึ่งคอลัมน์ และ Desktop เป็นสองคอลัมน์โดยไม่มี horizontal scroll

## Step 3 — Read → Render (10 นาที)

พิมพ์ `readForm()` และ `renderPreview()` แล้วผูกกับ `input` event

```js
function readForm() {
  return Object.fromEntries(new FormData(form).entries());
}

form.addEventListener('input', () => {
  renderPreview(readForm());
});
```

**Checkpoint:** พิมพ์ทุกช่องแล้ว Live Preview เปลี่ยนทันที โดย Console ไม่มี error

## Step 4 — Validate → Feedback (15 นาที)

พิมพ์ `validate()`, `renderErrors()` และ submit handler

ลำดับที่ต้องย้ำ:

1. `event.preventDefault()`
2. อ่านข้อมูล
3. ตรวจสอบ
4. แสดง error
5. หยุดเมื่อ invalid
6. แสดง success เมื่อ valid

**Checkpoint:** Submit ว่างแล้ว focus ไป field แรกที่ผิด กรอกครบแล้วขึ้น success

## Step 5 — Reset และสรุป (10 นาที)

ใช้ `queueMicrotask()` เพื่อรอให้ browser reset controls ก่อนอ่านค่าใหม่

สรุปจากตัวอย่างไป LAB 3:

- Profile Card Builder มี 3 fields → LAB 3 เปลี่ยนเป็น service request
- Live Preview เหมือนเดิม
- Validation pattern เหมือนเดิม
- LAB 3 เพิ่ม submitted list, Git branch, PR, build และ Pages
