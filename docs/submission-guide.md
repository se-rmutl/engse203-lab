# คู่มือการส่งงาน ENGSE203

## 1. ชื่อ Repository ส่งงาน

ให้ตั้งชื่อ repository ตามที่ใบงานกำหนด ตัวอย่างมาตรฐาน

```text
engse203-lab01-<student-id>
engse203-lab05-<student-id>
engse203-fullstack-<student-id>
engse203-team-<project-name>
```

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
4. commit ด้วยข้อความสื่อความหมาย แล้ว push ไปยัง `main`
5. เปิดหน้า repository ใน browser และตรวจสอบว่าไฟล์/commit ปรากฏครบ
6. ส่ง URL repository ผ่าน LMS/Google Classroom ภายในเวลาที่ผู้สอนประกาศ

## 5. งานกลุ่ม

งานกลุ่มต้องมีหลักฐานที่ตรวจสอบได้ว่าแต่ละคนมีส่วนร่วม เช่น issue ที่รับผิดชอบ, branch ของตนเอง, pull request, commit, review comment และ peer evaluation ตามแบบฟอร์มที่กำหนด

> ไม่รับไฟล์ ZIP เว้นแต่ผู้สอนประกาศเป็นกรณีพิเศษ
