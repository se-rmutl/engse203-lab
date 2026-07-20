# คู่มือการส่งงาน ENGSE203

## 1. Repository สำหรับ LAB รายบุคคล

ใช้ repository เดียวตลอดรายวิชา:

```text
engse203-student-labs-<student-id>
```

ก่อน LAB01 ให้ทำตาม [Student Repository Hub](./student-repository/) ห้ามสร้าง repository ใหม่แยกทุก LAB

งานกลุ่มหรือ Full-Stack Project อาจใช้ Team Repository แยกเมื่อใบงานระบุชัดเจน

## 2. โครงสร้างมาตรฐาน

```text
labs/week-NN/
├── README.md
├── lab-metadata.json
├── source/
├── evidence/
└── publish/

docs/labs/week-NN/     # generated Pages output
```

- Branch: `lab/week-NN`
- PR: `lab/week-NN → main`
- Tag: `lab-NN-submission-v1`
- Pages source: `main /docs`

## 3. สิ่งที่ต้องมีในทุกงาน

1. Source code ใน `labs/week-NN/source/` ที่รันตาม README ได้
2. Evidence/test/reflection ใน `labs/week-NN/evidence/`
3. `lab-metadata.json` ที่มี status, PR URL, tag และ test status
4. Git history ที่แสดงการพัฒนาอย่างต่อเนื่อง
5. `References & AI Assistance` เมื่อใช้แหล่งอ้างอิงหรือ AI
6. ไม่มี password, token, API key, `.env` หรือข้อมูลส่วนตัวที่ไม่จำเป็น

## 4. ขั้นตอนส่ง

```bash
npm run build:pages
npm run verify:lab -- week-NN
git add .
git commit -m "feat(week-NN): complete LAB work"
git push -u origin lab/week-NN
```

เปิด PR, บันทึก PR URL ใน metadata, merge แล้วสร้าง tag จาก `main`:

```bash
git switch main
git pull origin main
git tag lab-NN-submission-v1
git push origin lab-NN-submission-v1
```

## 5. ข้อมูลที่ส่งให้ผู้สอน

- Pages Hub URL ซึ่งใช้ URL เดิมตลอดรายวิชา
- Weekly Result URL ที่ `.../labs/week-NN/`
- Pull Request URL ของ `lab/week-NN → main` ที่ merge แล้ว
- Submission tag `lab-NN-submission-v1`

Repository URL ส่งครั้งแรกหรือเมื่อข้อมูลเปลี่ยน ไม่ส่ง ZIP และไม่สร้าง repository ใหม่รายสัปดาห์

ไม่ส่ง ZIP เว้นแต่ผู้สอนประกาศเป็นกรณีพิเศษ

อ่านขั้นตอนเต็มที่ [Weekly Workflow และวิธีส่งงาน](./student-repository/WEEKLY_WORKFLOW_AND_SUBMISSION_TH.md)

## 6. การแก้งาน

ห้ามแก้ tag เดิมหรือ force-push ประวัติที่ตรวจแล้ว ใช้:

```text
Branch: fix/week-NN-v2
Tag: lab-NN-submission-v2
```
