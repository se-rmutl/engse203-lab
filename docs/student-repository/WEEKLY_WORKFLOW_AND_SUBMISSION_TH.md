# Weekly Workflow และวิธีส่งงาน ENGSE203

ใช้ขั้นตอนนี้กับ LAB รายบุคคลทุกสัปดาห์ โดยเปลี่ยน `NN` ให้ตรงสัปดาห์ เช่น `01`, `02`, `03`, `04`

## 1. เริ่ม Branch จาก Main ล่าสุด

```bash
git switch main
git pull origin main
git switch -c lab/week-NN
git branch --show-current
```

## 2. นำ Starter เข้า Source

อ่านโจทย์จาก Course Repository แล้วคัดลอก **เนื้อหาภายใน starter** ไปที่:

```text
labs/week-NN/source/
```

ห้ามคัดลอก `.git`, `node_modules`, `.env`, token หรือ solution

## 3. พัฒนาและทดสอบ

ตัวอย่างโครงงาน npm/Vite:

```bash
npm --prefix labs/week-NN/source install
npm --prefix labs/week-NN/source run check
npm --prefix labs/week-NN/source run build
```

ถ้า build ออก `dist/` ให้นำผลเข้า publish:

```bash
npm run import:publish -- week-NN labs/week-NN/source/dist
```

สำหรับ static HTML ที่ `index.html` อยู่ใน source root:

```bash
npm run import:publish -- week-NN labs/week-NN/source
```

## 4. เตรียมหลักฐานและ Metadata

- ใส่ screenshot/test/reflection ใน `labs/week-NN/evidence/`
- แก้ `lab-metadata.json` ให้ `status` เป็น `ready`
- ตั้ง `testStatus` เป็น `pass` เมื่อทดสอบจริงผ่าน
- ใช้ tag รูปแบบ `lab-NN-submission-v1`

```bash
npm run build:pages
npm run verify:lab -- week-NN
git add .
git commit -m "feat(week-NN): complete LAB work"
git push -u origin lab/week-NN
```

## 5. Pull Request, Merge และ Tag

1. เปิด PR `lab/week-NN → main`
2. ใส่ PR URL ใน metadata และเปลี่ยน status เป็น `submitted`
3. รัน `npm run build:pages` และ `npm run verify:lab -- week-NN` อีกครั้ง
4. Commit/push metadata แล้ว merge PR
5. สร้าง tag จาก `main` หลัง merge

```bash
git switch main
git pull origin main
git tag lab-NN-submission-v1
git push origin lab-NN-submission-v1
```

## 6. URL ที่ส่ง

- Pages Hub URL — URL เดิมตลอดรายวิชา
- Weekly Result URL — `.../labs/week-NN/`
- Pull Request URL ของ `lab/week-NN → main` ที่ merge แล้ว
- Submission tag — `lab-NN-submission-v1`

Repository URL ส่งครั้งแรกหรือเมื่อผู้สอนกำหนด ไม่ต้องสร้าง repository ใหม่ในแต่ละสัปดาห์

Pages ของแต่ละ LAB อยู่ที่:

```text
https://<username>.github.io/engse203-student-labs-<student-id>/labs/week-NN/
```

## Revision

หากผู้สอนให้แก้ ใช้ branch และ tag รุ่นใหม่โดยไม่แก้ tag เดิม:

```text
Branch: fix/week-NN-v2
Tag: lab-NN-submission-v2
```
