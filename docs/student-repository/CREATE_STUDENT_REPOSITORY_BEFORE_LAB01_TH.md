# สร้าง ENGSE203 Student Repository ก่อนทำ LAB01

เอกสารนี้ใช้กับนักศึกษารุ่นถัดไปและผู้ที่ยังไม่ได้เริ่ม LAB01 ให้ทำเพียงครั้งเดียวก่อนเริ่มรายวิชา

## ผลลัพธ์ที่ต้องได้

- Repository ชื่อ `engse203-student-labs-<student-id>`
- มี `student-config.json` และ Student Profile ที่เป็นข้อมูลของตนเอง
- มีพื้นที่ `labs/week-01/`–`labs/week-04/`
- มี Pages Hub ที่ `https://<username>.github.io/engse203-student-labs-<student-id>/`
- พร้อมใช้ branch `lab/week-NN`, Pull Request และ tag รายสัปดาห์

## Mental Model: หนึ่ง Repository หลายสัปดาห์

```text
main
├── lab/week-01 → PR → merge → tag lab-01-submission-v1
├── lab/week-02 → PR → merge → tag lab-02-submission-v1
├── lab/week-03 → PR → merge → tag lab-03-submission-v1
└── lab/week-04 → PR → merge → tag lab-04-submission-v1
```

ทุก LAB ใช้ Pages Hub URL เดิม แต่มี Weekly Result URL แยกที่ `/labs/week-NN/`

## 1. ตรวจเครื่องมือ

```bash
node --version
npm --version
git --version
ssh -T git@github.com
```

ใช้ Node.js `>=22.12.0` บน iMac/macOS หรือ VS Code Remote — WSL2 Ubuntu 24.04 บน Windows 11

## 2. สร้าง Repository จาก Template

1. เปิด Student Repository Template URL ที่ผู้สอนประกาศ
2. กด **Use this template → Create a new repository**
3. ตั้งชื่อ `engse203-student-labs-<student-id>`
4. ใช้ visibility ตามที่ผู้สอนกำหนด ห้ามเลือก Include all branches
5. Clone ผ่าน SSH

```bash
git clone git@github.com:<github-username>/engse203-student-labs-<student-id>.git
cd engse203-student-labs-<student-id>
nvm use
npm install
```

## 3. ตั้งค่าข้อมูลนักศึกษา

```bash
npm run setup -- \
  --student-id <student-id> \
  --name "ชื่อ นามสกุล" \
  --section SEC1 \
  --github <github-username> \
  --mode new-course
```

ตรวจผล:

```bash
cat student-config.json
cat STUDENT_PROFILE.md
npm run build:pages
npm run verify:setup
```

ผลที่คาดหวังคือไม่พบ placeholder และ `verify:setup` ไม่มี `FAIL`

## 4. Commit Baseline

```bash
git add .
git commit -m "chore: configure ENGSE203 student repository"
git push origin main
```

## 5. เปิด GitHub Pages

```text
Repository → Settings → Pages
Source: Deploy from a branch
Branch: main
Folder: /docs
```

เปิด Pages Hub ใน Incognito และตรวจว่าเห็นการ์ด LAB01–04 จากนั้นจึงเริ่ม [LAB01](../../labs/week-01-developer-environment-git-github/README.md)

## 6. โครงสร้างที่นักศึกษาจะใช้ทุกสัปดาห์

```text
labs/week-NN/
├── README.md
├── lab-metadata.json
├── source/      # code ที่อาจารย์ตรวจ
├── evidence/    # screenshot, test, reflection
└── publish/     # static build ที่มี index.html

docs/labs/week-NN/  # สร้างด้วย npm run build:pages; ห้ามแก้ด้วยมือ
```

เมื่อเริ่ม LAB01 ให้สร้าง branch จาก `main` ล่าสุด:

```bash
git switch main
git pull origin main
git switch -c lab/week-01
git branch --show-current
```

ผลต้องเป็น `lab/week-01` และนำ starter ไปวางใน `labs/week-01/source/`

## Acceptance Checklist

- [ ] ชื่อ repository ถูกต้อง
- [ ] `npm run setup` ผ่านและไม่มี placeholder
- [ ] `npm run build:pages` ผ่าน
- [ ] `npm run verify:setup` ผ่าน
- [ ] baseline อยู่บน `main`
- [ ] Pages ตั้งเป็น `main /docs`
- [ ] เปิด Pages Hub ใน Incognito ได้
- [ ] ไม่พบ `.env`, token, password หรือข้อมูลลับ
