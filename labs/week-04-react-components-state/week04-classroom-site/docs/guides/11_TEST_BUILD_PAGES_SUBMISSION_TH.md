# 11 — Test, Build, Pages และ Submission

## เป้าหมาย

ผู้เรียนสามารถตรวจ LAB04 จากมุมมองผู้ใช้ สร้าง production build รวมผลใน Pages Hub และส่งหลักฐานครบภายใต้ Student Repository เดียว

## Repository Contract

```text
engse203-student-labs-<student-id>/
├── labs/
│   └── week-04/
│       ├── source/      # React/Vite source
│       ├── evidence/    # screenshots/test notes
│       └── publish/     # production build ของ Week 04
└── docs/
    └── labs/
        └── week-04/     # Pages output ที่ script สร้าง
```

Branch:

```text
lab/week-04
```

Tag หลัง merge:

```text
lab-04-submission-v1
```

## Step 1 — เริ่ม Branch

```bash
git switch main
git pull --ff-only
git switch -c lab/week-04
```

ตรวจ:

```bash
git branch --show-current
```

ต้องได้ `lab/week-04`

หาก Template รุ่นที่ใช้อยู่ยังไม่มีโฟลเดอร์ Week 04 ให้รันจาก root ก่อน:

```bash
npm run add:lab -- week-04 "React Campus Service Request"
```

หากมี `labs/week-04/` แล้ว ห้ามรันซ้ำ

## Step 2 — ทำงานใน Source

วาง starter และพัฒนาใน:

```text
labs/week-04/source/
```

```bash
cd labs/week-04/source
npm install
npm run dev
```

ก่อน build ให้ตรวจ `vite.config.js` ใช้ relative base เพื่อให้ asset ทำงานใต้ Pages Hub:

```js
export default defineConfig({
  plugins: [react()],
  base: './',
});
```

## Step 3 — Functional Test

| Test | สิ่งที่ตรวจ |
|---|---|
| Initial render | initial requests, summary, no console error |
| Controlled input | field สะท้อน state |
| Invalid submit | ไม่เพิ่ม, มี error ใกล้ field |
| Valid submit | เพิ่ม pending, summary เพิ่ม, form reset |
| Filter | แต่ละ status ถูกต้อง |
| Delete | ลบถูก id, card อื่นไม่สลับ |
| Empty state | มีข้อความและ next action |
| Mobile | 375px ไม่มี horizontal scroll |
| Keyboard | Tab/focus/submit ใช้ได้ |

บันทึก Expected/Actual/Result ใน README หรือ `labs/week-04/evidence/TEST_RESULTS.md`

## Step 4 — Code Check และ Production Build

จาก `labs/week-04/source/`:

```bash
npm run check
npm run build
npm run preview
```

เปิด preview และทำ smoke test:

- initial render
- add
- filter
- delete
- refresh
- Console/Network ไม่มี asset 404

## Step 5 — นำ Build เข้า Publish

กลับไป root ของ Student Repository:

```bash
cd ../../..
npm run import:publish -- week-04 labs/week-04/source/dist
```

หาก script แจ้งว่า publish มีข้อมูลเดิม ให้ใช้ตัวเลือก replace ตามคู่มือ Template รุ่นล่าสุด ไม่ลบโฟลเดอร์กว้างด้วยคำสั่งที่เสี่ยง

## Step 6 — สร้าง Pages Hub และ Verify

```bash
npm run build:pages
npm run verify:lab -- week-04
npm run verify
```

ผล Week 04 ต้องอยู่ที่:

```text
docs/labs/week-04/
```

อย่าแก้ `docs/` ด้วยมือ เพราะเป็น generated output

## Step 7 — Evidence

ใน `labs/week-04/evidence/` ควรมี:

```text
README.md
TEST_RESULTS.md
desktop.png
mobile-375.png
validation-error.png
success-result.png
```

README ควรมี:

- ชื่อ/รหัส/section
- component tree
- วิธีติดตั้ง/รัน
- state/data flow explanation
- test results
- screenshots
- Pages/PR/tag
- AI disclosure

## Step 8 — Commit เป็นช่วง

ตัวอย่าง:

```text
feat: add week04 React project structure
feat: render requests with reusable components
feat: manage request state and events
feat: add controlled request form and validation
style: add responsive request interface
test: add week04 test evidence
build: publish week04 to Pages Hub
```

ไม่ควรรวมทุกอย่างเป็น commit เดียวหลังทำเสร็จ

## Step 9 — Push, PR และ Merge

```bash
git status
git push -u origin lab/week-04
```

สร้าง Pull Request:

```text
lab/week-04 → main
```

ก่อน merge ตรวจ:

- files อยู่ใน week-04 เท่านั้น
- ไม่มี `node_modules`
- ไม่มี secret/token
- verify ผ่าน
- reviewer เปิด Pages preview/build ได้

## Step 10 — Tag

หลัง merge:

```bash
git switch main
git pull --ff-only
git tag -a lab-04-submission-v1 -m "ENGSE203 LAB04 submission"
git push origin lab-04-submission-v1
```

## Step 11 — ตรวจ Pages

Pages Hub:

```text
https://<github-username>.github.io/engse203-student-labs-<student-id>/
```

Weekly Result:

```text
https://<github-username>.github.io/engse203-student-labs-<student-id>/labs/week-04/
```

เปิด Incognito และตรวจ:

- หน้าโหลด
- CSS/JS โหลด
- ไม่พบ 404
- add/filter/delete ทำงาน
- mobile layout ใช้งานได้

## สิ่งที่ส่ง: 3 Links + 1 Tag

1. Pages Hub URL
2. Weekly Result URL
3. Merged Pull Request URL
4. Tag `lab-04-submission-v1`

## Submission Checklist

- [ ] branch `lab/week-04`
- [ ] source/evidence/publish ถูก path
- [ ] `npm run check` และ build ผ่าน
- [ ] `npm run verify:lab -- week-04` ผ่าน
- [ ] merged PR
- [ ] tag ถูกต้อง
- [ ] Pages Hub และ Weekly Result เปิดใน Incognito
- [ ] README/test evidence/AI disclosure ครบ

ต่อไป: [12 — React Beginner Troubleshooting](./12_REACT_BEGINNER_TROUBLESHOOTING_TH.md)
