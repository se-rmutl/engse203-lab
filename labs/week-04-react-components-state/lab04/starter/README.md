# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: TODO
- รหัสนักศึกษา: TODO
- Section: TODO

## URLs

- Repository: `engse203-student-labs-<student-id>`
- Pull Request: TODO
- GitHub Pages: TODO — `/labs/week-04/`

## Component Tree

```text
TODO: วาด App → child components และระบุ state owner
```

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

เมื่อทำงานจาก Student Repository root ใช้ `npm --prefix labs/week-04/source run <script>` และนำ build เข้า Pages Hub ด้วย:

```bash
npm run import:publish -- week-04 labs/week-04/source/dist
npm run build:pages
```

## State / Props / Callback Explanation

TODO: อธิบายว่าใคร owns requests/filter/form state, props ไหลลงตรงไหน และ callback ไหลกลับตรงไหน

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | TODO | TODO | TODO |
| TC-02 Controlled input | TODO | TODO | TODO |
| TC-03 Invalid | TODO | TODO | TODO |
| TC-04 Valid add | TODO | TODO | TODO |
| TC-05 Filter | TODO | TODO | TODO |
| TC-06 All | TODO | TODO | TODO |
| TC-07 Empty | TODO | TODO | TODO |
| TC-08 Delete | TODO | TODO | TODO |
| TC-09 Mobile | TODO | TODO | TODO |
| TC-10 Keyboard | TODO | TODO | TODO |
| TC-11 Build | TODO | TODO | TODO |
| TC-12 Pages | TODO | TODO | TODO |

## Screenshots

- Desktop: `evidence/desktop.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation/empty state: TODO

## Week 03 → Week 04 Reflection

TODO: เปรียบเทียบ DOM mutation กับ State-driven UI 3–5 ประโยค

## AI / External Resource Disclosure

ระบุเครื่องมือหรือแหล่งที่ใช้, prompt/คำถามสำคัญ, ส่วนที่นำมาปรับ และวิธีที่ตรวจสอบความถูกต้อง หากไม่ได้ใช้ให้เขียนว่า “ไม่ได้ใช้”
