# คู่มือตรวจและให้คะแนน LAB 02 — สำหรับผู้สอน/ผู้ช่วยสอน

> **LAB 02: Modern JavaScript, Modules & Async Data**  
> คะแนนย่อยในกิจกรรม A2 Weekly LAB: **3.00 คะแนน**  
> รูปแบบงาน: รายบุคคล  
> CLO ที่ประเมิน: **CLO1, CLO2**

เอกสารนี้ใช้ตรวจ GitHub repository, Pull Request, GitHub Pages และการทำงานจริงของผู้เรียน โดยให้ตรวจจากหลักฐานที่เปิดดูได้ ไม่ให้คะแนนจากชื่อไฟล์หรือข้อความใน README เพียงอย่างเดียว

---

## 1. หลักฐานที่ผู้เรียนต้องส่ง

| หลักฐาน | ใช้ตรวจอะไร |
|---|---|
| Repository URL | source code, package scripts, `docs/`, README, commit history |
| GitHub Pages URL | behavior ของเว็บไซต์ normal state และ error state |
| Pull Request URL ที่ merge แล้ว | feature branch, discussion/description, merge workflow |
| README | วิธีรัน, URL, screenshots, problem/fix, references/AI disclosure |

หากหลักฐานใดขาด ให้บันทึกไว้ในช่อง feedback และใช้เกณฑ์ partial score ตาม rubric

---

## 2. ลำดับตรวจที่แนะนำ

### ขั้นที่ A — ตรวจข้อมูลเบื้องต้น (ประมาณ 1 นาที)

1. ชื่อ repository มีรูปแบบ `engse203-lab02-<student-id>`
2. `main` มี source code, `docs/` และ README
3. PR จาก `feature/lab02-dashboard` ไป `main` อยู่ในสถานะ merged
4. เปิด GitHub Pages URL ได้

### ขั้นที่ B — รันและตรวจโครงงาน (ประมาณ 3–5 นาที)

Clone repository ของผู้เรียน แล้วรัน:

```bash
git clone <student-repository-ssh-or-https-url>
cd engse203-lab02-<student-id>
npm ci
npm run check
npm run build
```

> ใช้ `npm install` แทน `npm ci` ได้กรณีไม่มี `package-lock.json` แต่ให้บันทึกข้อสังเกตไว้ เพราะงานที่สมบูรณ์ควรมี lock file ที่สอดคล้องกับ dependency

จากนั้นตรวจไฟล์ขั้นต่ำ:

```text
src/api.js
src/utils.js
src/ui.js
src/main.js
public/data/learning-tasks.json
vite.config.js
docs/
README.md
```

### ขั้นที่ C — ตรวจ behavior ใน browser (ประมาณ 2–3 นาที)

รัน:

```bash
npm run dev
```

ตรวจ normal state:

- โหลด task list และ summary 4 ค่าได้
- ค้นหาคำว่า `React` หรือ `API` แล้วรายการเปลี่ยน
- เลือกสถานะ `Done` แล้วรายการถูกกรอง
- แสดง loading และ success message

ตรวจ error state:

```text
<pages-url>?simulateError=1
```

ต้องมีข้อความ error ที่เข้าใจได้ และหน้าเว็บต้องไม่ blank / ไม่แสดง task เดิมค้างอยู่

### ขั้นที่ D — ตรวจ Git workflow และการส่งมอบ (ประมาณ 1–2 นาที)

```bash
git log --oneline --all --decorate
git branch -a
git log main -- docs
```

ตรวจว่ามี feature branch, meaningful commits, PR/merge และ `docs/` ถูกสร้างจาก build แล้วอยู่ใน `main`

---

## 3. Rubric ให้คะแนน (รวม 3.00 คะแนน)

### 3.1 Modern JavaScript & ES Modules — 0.80 คะแนน

| คะแนน | เกณฑ์พิจารณา |
|---:|---|
| 0.80 | แยก `api.js`, `utils.js`, `ui.js`, `main.js` ชัดเจน ใช้ import/export ถูกต้อง ใช้ Modern JS อย่างน้อย 2 แนวคิดได้เหมาะสม และแต่ละ module รับผิดชอบงานของตน |
| 0.60 | แยก module ครบและทำงานได้ แต่ Modern JS ใช้จำกัด หรือ separation of concerns ยังมีบางส่วนปะปน |
| 0.40 | มี module บางส่วน/import-export แต่ยังมีโค้ดหลักรวมอยู่ใน `main.js` มาก หรือ logic/function ขาด |
| 0.20 | มีไฟล์ module ตามชื่อ แต่ import/export ไม่ทำงานหรือไม่ใช้จริง |
| 0.00 | ไม่พบการใช้ ES Modules ที่ตรวจสอบได้ |

หลักฐานสำคัญ: `export` ใน `api/utils/ui`, `import` ใน `main`, `filter/map/reduce`, destructuring/spread/arrow function

### 3.2 Async/Await & Error Handling — 0.80 คะแนน

| คะแนน | เกณฑ์พิจารณา |
|---:|---|
| 0.80 | โหลด JSON ด้วย `fetch` + `async/await`, ตรวจ `response.ok`, ใช้ `try/catch/finally`, แสดง loading/success/error และ error URL ทำงานถูกต้อง |
| 0.60 | โหลด async ได้และมี try/catch แต่ขาดหนึ่งรายการ เช่น `finally`, `response.ok` หรือ UI state บางส่วน |
| 0.40 | มี fetch/async หรือ try/catch แต่ error state ไม่ชัดเจน/ทดสอบไม่ได้ |
| 0.20 | มีโค้ด async แต่ใช้ข้อมูล hard-code เป็นหลัก หรือ error ทำให้หน้าว่าง |
| 0.00 | ไม่พบ async data loading และ error handling ตามโจทย์ |

> หาก error state ทำให้เว็บไซต์ blank หรือ JavaScript crash ให้คะแนนข้อนี้ไม่เกิน **0.40**

### 3.3 npm Scripts & Build — 0.40 คะแนน

| คะแนน | เกณฑ์พิจารณา |
|---:|---|
| 0.40 | มี `dev`, `build`, `preview`, `check`; `npm run check` และ `npm run build` สำเร็จ; `vite.config.js` build ไป `docs/`; มี `docs/` ล่าสุดบน `main` |
| 0.30 | scripts ครบและ build สำเร็จ แต่ `docs/` ไม่อยู่ใน main หรือ config base มีข้อบกพร่องเล็กน้อย |
| 0.20 | scripts ขาด 1 รายการ หรือ build ต้องแก้เล็กน้อยจึงสำเร็จ |
| 0.10 | มี package.json แต่ scripts/build ใช้งานไม่ได้ |
| 0.00 | ไม่มีหลักฐาน npm scripts และ build |

### 3.4 Git Workflow — 0.50 คะแนน

| คะแนน | เกณฑ์พิจารณา |
|---:|---|
| 0.50 | มี `feature/lab02-dashboard`, meaningful commits อย่างน้อย 3 commits, PR ไป main และ merge ตรวจสอบได้ |
| 0.35 | มี branch + PR/merge แต่ commit น้อยหรือข้อความ commit ไม่สื่อความหมายบางส่วน |
| 0.20 | มี Git history มากกว่า 1 commit แต่ไม่มี PR หรือใช้ main เป็นหลัก |
| 0.10 | มี commit เดียวหลังทำเสร็จทั้งหมด |
| 0.00 | ไม่มี Git history/ไม่สามารถตรวจได้ |

> Commit ที่แก้เพียงชื่อหรือเพิ่มไฟล์แบบไม่มีเนื้อหา ไม่ควรถูกนับเป็น meaningful commit

### 3.5 GitHub Pages & Documentation — 0.50 คะแนน

| คะแนน | เกณฑ์พิจารณา |
|---:|---|
| 0.50 | Pages normal/error URL เปิดได้, assets/data โหลดครบ, README มี install/run/build, Pages URL, normal/error screenshots, problem/fix และ references/AI disclosure |
| 0.35 | Pages เปิดได้และ README ส่วนใหญ่ครบ แต่ขาด screenshot/AI disclosure/problem-fix บางข้อ |
| 0.20 | Source ทำงานใน local แต่ Pages 404/asset หาย หรือ README มีข้อมูลเพียงพื้นฐาน |
| 0.10 | มี URL แต่หน้าเว็บไม่ทำงาน หรือ README ไม่บอกวิธีรัน |
| 0.00 | ไม่มี Pages และไม่มี README ที่ตรวจสอบได้ |

> หาก Pages เปิดได้แต่ asset/JSON 404 เพราะ `base` ผิด ให้ข้อนี้ไม่เกิน **0.20**

---

## 4. การให้คะแนนกรณีส่งช้า / แก้งาน

- ใช้นโยบายหักคะแนนส่งช้าตามที่รายวิชาประกาศแยกต่างหาก
- หากให้แก้งาน ให้ผู้เรียนแก้ใน branch ใหม่หรือ commit ใหม่ที่สื่อความหมาย เช่น `fix: handle dashboard error state`
- ตรวจเฉพาะ commit ใหม่และสิ่งที่แก้เพิ่ม แล้วบันทึกคะแนนสุดท้าย/ข้อเสนอแนะใน LMS
- หลีกเลี่ยงการลดคะแนนซ้ำซ้อนจากสาเหตุเดียวกัน เช่น Pages ใช้ไม่ได้เพราะ build ไม่ผ่าน ให้สะท้อนหลักที่ npm/build และ Pages ตามข้อเท็จจริง แต่เขียน feedback เพียงประเด็นเดียวที่แก้ได้

---

## 5. จุดตรวจความซื่อสัตย์ทางวิชาการ

ตรวจสัญญาณต่อไปนี้ก่อนสรุปคะแนน

- Git history เป็น commit เดียวทั้งหมดหลังเสร็จงาน
- source เหมือนกับงานของผู้อื่นในชั้นโดยไม่มีคำอธิบาย/หลักฐาน
- นักศึกษาอธิบายโค้ด `async/await`, `response.ok`, error state หรือ module ของตนเองไม่ได้
- README ไม่มี `References & AI Assistance` แม้โค้ดมีรูปแบบจาก external source อย่างชัดเจน
- มี token, secret, private key หรือข้อมูลส่วนบุคคลเกินความจำเป็นอยู่ใน repository

เมื่อพบข้อสงสัย ให้ขอให้นักศึกษาสาธิต/อธิบายโค้ดสั้น ๆ ก่อนตัดสินคะแนน ไม่ควรสรุปจากความเหมือนของโค้ดเพียงอย่างเดียว

---

## 6. Feedback Template

```text
LAB 02 Score: <x.xx>/3.00

Strengths
- <สิ่งที่ทำได้ดี>

Needs improvement
- <สิ่งที่ต้องแก้ พร้อมชื่อไฟล์หรือ URL ที่เกี่ยวข้อง>

Verification result
- npm run check: <pass/fail>
- npm run build: <pass/fail>
- GitHub Pages normal state: <pass/fail>
- GitHub Pages error state: <pass/fail>
- PR/merge: <pass/fail>

Resubmission instruction (if applicable)
- <สิ่งที่ต้องแก้และวันเวลาที่ต้องส่งใหม่>
```
