# LAB 01 — Developer Environment & GitHub Repository Setup

**สัปดาห์ที่ 1** · งานรายบุคคล · **A2 Weekly LAB: 3 คะแนนย่อย**  
**CLO:** CLO1, CLO2, CLO7

## ก่อนเริ่ม

นักศึกษาต้องสร้าง Student Repository จาก Template ให้เสร็จก่อน โดยทำตาม [สร้าง Student Repository ก่อน LAB01](../../docs/student-repository/CREATE_STUDENT_REPOSITORY_BEFORE_LAB01_TH.md)

```text
Repository: engse203-student-labs-<student-id>
Branch: lab/week-01
Source: labs/week-01/source/
Evidence: labs/week-01/evidence/
Pages result: docs/labs/week-01/
Tag: lab-01-submission-v1
```

## เป้าหมาย

เมื่อทำ LAB นี้เสร็จ นักศึกษาจะสามารถ:

1. ตรวจ Node.js, npm, Git และ VS Code Terminal ได้
2. รัน JavaScript ด้วย Node.js และ npm script ได้
3. ใช้ branch, commit, push และ Pull Request ได้
4. สร้างหลักฐาน environment และผลการรันบน Pages Hub ได้

## 1. ตรวจเครื่องมือ

```bash
node --version
npm --version
git --version
ssh -T git@github.com
```

ใช้ Node.js `>=22.12.0` บน VS Code Integrated Terminal สำหรับ macOS หรือ VS Code Remote — WSL2 Ubuntu 24.04 สำหรับ Windows 11

## 2. เปิด Branch LAB01

เปิด Terminal ที่ root ของ Student Repository:

```bash
git switch main
git pull origin main
git switch -c lab/week-01
git branch --show-current
```

ผลต้องเป็น `lab/week-01`

## 3. นำ Starter เข้า Source

คัดลอก **เนื้อหาภายใน** [`starter/`](./starter/) ไปยัง:

```text
labs/week-01/source/
```

ตัวอย่างเมื่อ Course Repository และ Student Repository อยู่ข้างกัน:

```bash
cp -R ../engse203-lab/labs/week-01-developer-environment-git-github/starter/. labs/week-01/source/
```

ห้ามคัดลอก `.git`, `node_modules`, `.env` หรือ secret

## 4. แก้และรันโปรแกรม

แก้ข้อมูลนักศึกษาใน `labs/week-01/source/src/hello.js` แล้วรัน:

```bash
npm --prefix labs/week-01/source install
npm --prefix labs/week-01/source run start
npm --prefix labs/week-01/source run check
```

ผลต้องแสดงชื่อ รหัสนักศึกษา ระบบปฏิบัติการ และ Node.js version ของเครื่องจริง

## 5. จัดทำ Evidence และ Metadata

ใส่หลักฐานใน `labs/week-01/evidence/`:

- ผล `node --version`, `npm --version`, `git --version`
- screenshot ผล `npm run start`
- reflection สั้น ๆ เรื่อง branch/commit/PR
- ปัญหาและวิธีแก้ หากมี

แก้ `labs/week-01/lab-metadata.json`:

```json
{
  "status": "ready",
  "sourceOrigin": "course-starter",
  "submissionTag": "lab-01-submission-v1",
  "testStatus": "pass"
}
```

LAB01 ไม่มี web application ได้ ระบบจะสร้าง Evidence Report ใน Pages Hub อัตโนมัติ

## 6. Build, Verify และ Pull Request

```bash
npm run build:pages
npm run verify:lab -- week-01
git add .
git commit -m "feat(week-01): complete environment and GitHub lab"
git push -u origin lab/week-01
```

เปิด PR `lab/week-01 → main` แล้วนำ PR URL ใส่ metadata เปลี่ยน status เป็น `submitted` จากนั้น build/verify/commit/push อีกครั้งและ merge PR

สร้าง tag หลัง merge:

```bash
git switch main
git pull origin main
git tag lab-01-submission-v1
git push origin lab-01-submission-v1
```

## สิ่งที่ต้องส่ง

1. Pages Hub URL
2. LAB01 Result URL ที่ `.../labs/week-01/` ซึ่งเป็น Evidence Report ของ LAB01
3. Pull Request URL ของ `lab/week-01 → main` ที่ merge แล้ว
4. Tag `lab-01-submission-v1`

Repository URL ส่งครั้งแรกหรือเมื่อผู้สอนร้องขอ โดย Pages Hub URL จะเป็น URL หลักเดิมตลอดรายวิชา

ไม่ส่ง ZIP เว้นแต่ผู้สอนกำหนด

## เกณฑ์ประเมิน 3 คะแนน

| รายการ | คะแนน |
|---|---:|
| Environment และคำสั่งตรวจเครื่องมือ | 0.50 |
| Source, npm script และผลการรัน | 1.00 |
| README/Evidence | 0.50 |
| Branch, commits, PR และ tag | 0.50 |
| ความครบถ้วน ความปลอดภัย และการอ้างอิง/AI disclosure | 0.50 |
| **รวม** | **3.00** |

## Checklist

- [ ] ใช้ Student Repository ที่สร้างจาก Template
- [ ] branch `lab/week-01`
- [ ] source อยู่ใน `labs/week-01/source/`
- [ ] `npm run start` และ `npm run check` ผ่าน
- [ ] evidence และ metadata ครบ
- [ ] `npm run verify:lab -- week-01` ผ่าน
- [ ] PR merge แล้วและ tag มีจริง
- [ ] Pages Hub และ LAB01 Evidence Report URL เปิดได้
- [ ] ไม่มี password, token, `.env` หรือ `node_modules`

อ่าน workflow มาตรฐานได้ที่ [Weekly Workflow](../../docs/student-repository/WEEKLY_WORKFLOW_AND_SUBMISSION_TH.md)
