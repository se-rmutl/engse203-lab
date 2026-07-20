# LAB 03 — Responsive Web UI & Form Interaction

**สัปดาห์ที่ 3** · งานรายบุคคล · **A2 Weekly LAB: 3 คะแนนย่อย**  
**CLO:** CLO3

## ภาพรวม

พัฒนา Campus Service Request ด้วย Semantic HTML, responsive CSS, DOM events และ form validation เพื่อเป็น baseline ที่จะ refactor เป็น React ใน LAB04

## Repository Contract

```text
Repository: engse203-student-labs-<student-id>
Branch: lab/week-03
Source: labs/week-03/source/
Evidence: labs/week-03/evidence/
Publish: labs/week-03/publish/
Pages result: docs/labs/week-03/
Tag: lab-03-submission-v1
```

## 1. เริ่มงาน

```bash
git switch main
git pull origin main
git switch -c lab/week-03
```

คัดลอกเนื้อหา `lab3/starter/` ไปยัง source:

```bash
cp -R ../engse203-lab/labs/week-03-responsive-ui/lab3/starter/. labs/week-03/source/
npm --prefix labs/week-03/source install
npm --prefix labs/week-03/source run dev
```

## 2. Requirements

- ใช้ `header`, `main`, `section`, `aside`, `form` อย่างเหมาะสม
- mobile-first 375px ไม่มี horizontal scroll และ desktop เป็นสองคอลัมน์
- `label`, `name`, focus และ `aria-describedby` ครบ
- live preview ใช้ `input` event
- submit ใช้ `preventDefault()` และ validation ขั้นพื้นฐาน
- invalid ไม่เพิ่มรายการและไม่ reset form
- valid เพิ่มรายการ แสดง success และ reset ได้
- ใช้ `textContent` กับข้อมูลผู้ใช้และ Console ไม่มี error

## 3. Test และ Build

```bash
npm --prefix labs/week-03/source run build
npm run import:publish -- week-03 labs/week-03/source/dist
```

ถ้าเป็น static site ที่ไม่มี build ให้ใช้:

```bash
npm run import:publish -- week-03 labs/week-03/source
```

บันทึก test cases, ภาพ desktop/mobile, invalid/valid state และ reflection ใน `labs/week-03/evidence/`

## 4. Build Pages และส่ง

แก้ metadata ให้ `sourceOrigin: "course-starter"`, `status: "ready"`, `testStatus: "pass"` และ planned tag แล้วรัน:

```bash
npm run build:pages
npm run verify:lab -- week-03
git add .
git commit -m "feat(week-03): complete responsive service request UI"
git push -u origin lab/week-03
```

เปิด PR `lab/week-03 → main`, ใส่ PR URL ใน metadata, เปลี่ยน status เป็น `submitted`, build/verify/push แล้ว merge

```bash
git switch main
git pull origin main
git tag lab-03-submission-v1
git push origin lab-03-submission-v1
```

## สิ่งที่ต้องส่ง

1. Pages Hub URL
2. LAB03 Result URL ที่ `.../labs/week-03/`
3. Pull Request URL ของ `lab/week-03 → main` ที่ merge แล้ว
4. Tag `lab-03-submission-v1`
4. README/evidence ตามโจทย์

## Checklist

- [ ] branch/path ตรง contract
- [ ] Semantic HTML และ accessibility ขั้นพื้นฐานครบ
- [ ] responsive 375px/desktop ผ่าน
- [ ] events/form/validation ทำงาน
- [ ] build/static output อยู่ใน publish
- [ ] `npm run verify:lab -- week-03` ผ่าน
- [ ] PR merge, tag และ Pages result มีจริง
- [ ] ไม่มี secret, `.env` หรือ `node_modules`

ใช้ [Instructor Grading Checklist](./lab3/INSTRUCTOR_GRADING_CHECKLIST.md) ตรวจความครบถ้วน และอ่าน [Weekly Workflow](../../docs/student-repository/WEEKLY_WORKFLOW_AND_SUBMISSION_TH.md)
