# ย้ายผลงาน LAB01–03 จาก Repository เดิม

เอกสารนี้ใช้กับรุ่นปัจจุบันที่ทำ LAB01, LAB02 และ LAB03 แยก repository ไปแล้ว

## หลักการ

- เก็บ repository เดิมไว้เป็น read-only evidence
- สร้าง Student Repository จาก Template เพียงหนึ่ง repository
- ย้าย source โดยไม่คัดลอก `.git`, `node_modules`, `.env`, `dist` หรือ build เก่า
- ทำ branch และ PR แยกเป็น `lab/week-01`, `lab/week-02`, `lab/week-03`
- บันทึก Original Repository URL และ Commit SHA ใน metadata

## 1. สร้าง Student Repository

ทำตาม [สร้าง Student Repository ก่อน LAB01](./CREATE_STUDENT_REPOSITORY_BEFORE_LAB01_TH.md) แต่ตั้งค่า mode เป็น:

```bash
npm run setup -- \
  --student-id <student-id> \
  --name "ชื่อ นามสกุล" \
  --section SEC1 \
  --github <github-username> \
  --mode migration
```

## 2. ย้ายทีละ LAB

ตัวอย่าง LAB01:

```bash
git switch main
git pull origin main
git switch -c lab/week-01
npm run import:source -- week-01 /absolute/path/to/old-lab01
```

ใส่หลักฐานใน `labs/week-01/evidence/` แล้วแก้ `labs/week-01/lab-metadata.json`:

```json
{
  "sourceOrigin": "migrated-repository",
  "originalRepoUrl": "https://github.com/<username>/<old-repository>",
  "originalCommit": "<commit-sha>"
}
```

สำหรับ LAB02/03 ให้นำ build/static output ที่มี `index.html` เข้า `publish/`:

```bash
npm run import:publish -- week-02 /path/to/build-output
npm run import:publish -- week-03 /path/to/build-output
```

จากนั้นทำตาม [Weekly Workflow](./WEEKLY_WORKFLOW_AND_SUBMISSION_TH.md) เพื่อ build Pages Hub, verify, เปิด PR, merge และ tag แล้วทำซ้ำกับ week-02 และ week-03

## Definition of Done

- [ ] source LAB01–03 อยู่ใน folder ที่กำหนด
- [ ] metadata มี Original URL และ Commit SHA
- [ ] branch/PR/tag ของแต่ละสัปดาห์มีจริง
- [ ] Pages Hub เปิดผล LAB01–03 ได้
- [ ] repository เดิมไม่ถูกลบหรือแก้ประวัติ

