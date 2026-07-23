# คู่มือการส่งงาน ENGSE203

## 1. Student Repository เดียว

LAB01–LAB04 ใช้ repository เดียว:

```text
engse203-student-labs-<student-id>
```

อ่าน branch/path/tag ของแต่ละสัปดาห์ที่ [Student Repository Hub](./student-repository/) และ [Weekly Workflow](./student-repository/WEEKLY_WORKFLOW_AND_SUBMISSION_TH.md)

## 2. สิ่งที่ต้องมีในทุกงาน

1. Source code ที่รันตามคำสั่งใน README ได้
2. `README.md` ที่ระบุชื่อ-รหัสนักศึกษา/สมาชิก, วิธีติดตั้ง, วิธีรัน, และหลักฐานผลลัพธ์ตามใบงาน
3. Git history ที่แสดงการพัฒนางาน ไม่ใช่ commit เดียวหลังทำเสร็จทั้งหมด
4. แหล่งอ้างอิงและการใช้ AI ในหัวข้อ `References & AI Assistance` เมื่อมีการใช้
5. ไม่มี password, token, API key, `.env` หรือไฟล์ข้อมูลส่วนตัวที่ไม่จำเป็น

## 3. รูปแบบ README ขั้นต่ำ

ใช้ [README template](../templates/student-lab-readme-template.md) เป็นแนวทาง โดยแต่ละงานอาจเพิ่มหัวข้อเฉพาะ เช่น API Contract, Test Evidence หรือ Demo Video

## 4. ขั้นตอนส่งงาน

1. ตรวจ `npm run ...` หรือคำสั่งรันที่ใบงานกำหนดให้สำเร็จ
2. ตรวจ README และภาพหลักฐาน
3. ตรวจ `git status` ว่าไม่มีไฟล์ secret หรือไฟล์ขนาดใหญ่โดยไม่จำเป็น
4. commit ด้วยข้อความสื่อความหมาย แล้ว push branch `lab/week-NN`
5. เปิด Pull Request ไป `main`, ตรวจ checklist และ merge
6. สร้าง/อัปเดต Pages Hub แล้ว tag ตามสัปดาห์
7. ส่ง Pages Hub URL, Weekly Result URL, merged PR URL และ tag

## 5. งานกลุ่ม

งานกลุ่มต้องมีหลักฐานที่ตรวจสอบได้ว่าแต่ละคนมีส่วนร่วม เช่น issue ที่รับผิดชอบ, branch ของตนเอง, pull request, commit, review comment และ peer evaluation ตามแบบฟอร์มที่กำหนด

> ไม่รับไฟล์ ZIP เว้นแต่ผู้สอนประกาศเป็นกรณีพิเศษ
