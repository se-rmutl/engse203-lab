# ENGSE203 Week 04 Classroom Website

Single-page 16:9 classroom slide website สำหรับสอน React.js Fundamentals ฉบับ Phase B1 ซึ่งเชื่อม React Beginner Bridge, CP00–CP07 และ Unified Student Repository contract

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
- ปุ่ม `Guides` และหน้า `docs/guides/index.html` สำหรับเปิดบท 00–12
- แต่ละ CP ใน checkpoint console มีลิงก์ไปยัง Beginner Guide ที่ตรงกับกิจกรรม
- Submission checklist progress

Interactive demos ใช้ JavaScript ภายในหน้าเพื่อสาธิต mental model และผลลัพธ์ ส่วน code block แสดง React/JSX ที่นำไปใช้ใน Vite project จริง สัญญาส่งงานใช้ branch `lab/week-04`, result `/labs/week-04/` และ tag `lab-04-submission-v1`

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
| Pre-LAB CP00–CP07 | React Beginner Guides 00–12 + `pre-lab04/README.md` |
| LAB 4 H0–H6 / R01–R14 | `lab04/README.md` |
| Instructor Recovery | Phase B1 Instructor Private Kit |
| Git/Pages/Submission | Unified Student Repository contract |
| Week 05 Connection | Week 04 scope boundary |
