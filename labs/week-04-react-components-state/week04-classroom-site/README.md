# ENGSE203 Week 04 Classroom Website

Single-page 16:9 classroom slide website สำหรับสอน React.js Fundamentals โดยอ้างอิง `ENGSE203_Week04_เอกสารประกอบการสอน.docx`, Phase A Blueprint และ Phase D1 code contracts

## เปิดใช้งานในห้องเรียน

เปิดผ่าน VS Code Live Server ที่ไฟล์:

```text
docs/index.html
```

หรือใช้ local static server:

```bash
npx serve docs
```

เว็บไซต์ไม่ใช้ CDN, iframe หรือ remote asset จึงใช้งานแบบ offline หลังดาวน์โหลดได้ และฝังฟอนต์ Thai Sarabun New ไว้ใน `docs/fonts/` เพื่อให้ภาษาไทยแสดงสม่ำเสมอ

## Controls

- `←` / `→`, `PageUp` / `PageDown` — เปลี่ยนสไลด์
- `Home` / `End` — ไปสไลด์แรก/สุดท้าย
- `F` — Fullscreen
- `+` / `-` — ปรับขนาดตัวอักษร
- `N` — เปิด/ปิด Instructor Notes
- Navigation ด้านซ้าย — ไปยัง section
- ปุ่ม Copy — คัดลอก code block

## Interactive Demos

- JSX expression → output preview
- Component responsibility explorer
- Props flow simulator
- Mutable vs immutable array update
- State/filter/add/delete/empty-state simulator
- Controlled Form validation และ valid/invalid submit
- CP00–CP07 checkpoint console
- Submission checklist progress

Interactive demos ใช้ JavaScript ภายในหน้าเพื่อสาธิต mental model และผลลัพธ์ ส่วน code block แสดง React/JSX ที่นำไปใช้ใน Vite project จริง

## Deploy ด้วย GitHub Pages

ให้ใช้ `week04-classroom-site/` เป็น repository root แล้วตั้งค่า:

```text
Settings → Pages → Deploy from a branch → main → /docs
```

ไฟล์ `docs/.nojekyll` รวมอยู่แล้ว หลัง deploy ให้เปิด Pages URL ใน Incognito และตรวจ Console/Network ว่าไม่มี 404

## Source Map

| Website section | Canonical source |
|---|---|
| Overview / Bridge / JSX / Components / Props / State / Form | Week 04 เอกสารประกอบการสอน |
| Pre-LAB CP00–CP07 | `pre-lab04/README.md` และ Instructor Live-Coding Runbook |
| LAB 4 H0–H6 / R01–R14 | `lab04/README.md` |
| Instructor Solution | Phase D1 manifest และ grading checklist |
| Git/Pages/Submission | LAB 4 repository contract |
| Week 05 Connection | Week 04 scope boundary |
