# LAB 05 — React Routing, Data Fetching และ Front-end Mini App

**สัปดาห์ที่ 5** · หน่วยที่ 2 การพัฒนาส่วนติดต่อผู้ใช้ด้วย React.js
**รูปแบบงาน:** รายบุคคล · **CLO:** CLO3 · **การประเมิน:** A2 Weekly LAB · **คะแนน:** 3.00

> **สัปดาห์นี้แบ่งเป็น 2 คาบ** เพราะเนื้อหาหนักเกินกว่าจะอัดคาบเดียว
> **แต่ LAB 05 ยังเป็นงานชิ้นเดียว ส่งครั้งเดียวหลังจบคาบ 5B** ไม่มีการแบ่งส่งเป็นสองรอบและไม่มีการแบ่งคะแนนรายคาบ

---

## เริ่มตรงไหน

| ลำดับ | ทำเมื่อไร | เปิดไฟล์ |
|---|---|---|
| 1 | ก่อนคาบ 5A · 30 นาที | [`pre-lab05/README.md`](pre-lab05/README.md) |
| 2 | ในคาบ 5A | [`lab05/LAB05A_STUDENT_GUIDE_TH.md`](lab05/LAB05A_STUDENT_GUIDE_TH.md) |
| 3 | ก่อนคาบ 5B · 20 นาที | [`pre-lab05/PRE_LAB05B_GUIDE_TH.md`](pre-lab05/PRE_LAB05B_GUIDE_TH.md) |
| 4 | ในคาบ 5B | [`lab05/LAB05B_STUDENT_GUIDE_TH.md`](lab05/LAB05B_STUDENT_GUIDE_TH.md) |

อ่านประกอบได้ตลอด — [เอกสารประกอบการสอน 5A](guides/ENGSE203_Week05A_Teaching_Document_TH.html) · [เอกสารประกอบการสอน 5B](guides/ENGSE203_Week05B_Teaching_Document_TH.html) · [ภาพรวมรูปแบบการเรียน](guides/ENGSE203_Week05_Learning_Model_Infographic.html)

---

## สองคาบทำอะไรบ้าง

| | คาบ 5A — Read Path | คาบ 5B — Write Path |
|---|---|---|
| หัวข้อ | URL เลือกหน้า และข้อมูลไหลเข้ามาได้ | ข้อมูลอยู่ได้จริง และของเดิมต้องไม่พัง |
| Checkpoints | CP00 · CP01 · CP02 · CP03 · CP05a | CP04a · CP04b · CP05b · CP06 |
| ตอนจบ | route ครบ 5 เส้น · โหลดข้อมูลผ่าน Service · 5 สถานะ | ระบบสมบูรณ์ ส่งงานได้ |
| checker | `npm run check -- --session=1` → 104/104 | `npm run check` → 133/133 |

---

## ผลลัพธ์ที่ต้องสร้าง

เปลี่ยน Campus Service Request จาก Week 04 ให้เป็น mini application ที่

- มี Dashboard, New Request, Request Detail, About และหน้าไม่พบเส้นทาง
- ใช้ `HashRouter` ทำงานได้บน GitHub Pages
- โหลดข้อมูลผ่าน Service Layer และ Effect
- แสดง loading, success, empty, error และ retry ครบ
- บันทึกข้อมูลสาธิตด้วย browser storage พร้อม reset และ recovery
- **รักษาความสามารถทั้งหมดจาก Week 04 ไว้ครบ**

Week 05 ยังไม่ใช้ Express, REST API จริง, ฐานข้อมูล, ระบบล็อกอิน หรือไลบรารีจัดการ state ส่วนกลาง

---

## โครงสร้างโฟลเดอร์นี้

```text
week-05-react-mini-app/
├── README.md                  ← ไฟล์นี้
├── pre-lab05/
│   ├── README.md              ← ประตูทางเข้าของ Pre-LAB
│   ├── PRE_LAB05A_GUIDE_TH.md
│   ├── PRE_LAB05B_GUIDE_TH.md
│   ├── PRELAB_NOTES_05A.md
│   ├── PRELAB_NOTES_05B.md
│   └── starter/               ← Study Task Board (เขียนเสร็จแล้ว ใช้สังเกตอย่างเดียว)
├── lab05/
│   ├── LAB05A_STUDENT_GUIDE_TH.md
│   ├── LAB05B_STUDENT_GUIDE_TH.md
│   ├── CHECKPOINT_CARDS_5A_TH.md
│   ├── CHECKPOINT_CARDS_5B_TH.md
│   ├── starter/               ← Campus Service Request (มี TODO ให้ทำ)
│   ├── REGRESSION_CHECKLIST.md
│   └── evidence-templates/  (TEST_REPORT · AI_USAGE)
└── guides/
    ├── ENGSE203_Week05A_Teaching_Document_TH.html
    ├── ENGSE203_Week05B_Teaching_Document_TH.html
    └── ENGSE203_Week05_Learning_Model_Infographic.html
```

---

## วิธีนำ starter ไปใช้ใน Student Repository

Repository นี้เป็น **แหล่งอ่านและคัดลอกเท่านั้น** งานจริงทำใน repository ของตัวเอง

```bash
# ใน repository ของนักศึกษา
npm run add:lab -- week-05 "React Routing Data Fetching Mini App"
git switch -c lab/week-05

# คัดลอก starter เข้ามา (ระบุ path ไปยัง course repo ที่ clone ไว้)
npm run import:source -- week-05 ../engse203-lab/labs/week-05-react-mini-app/lab05/starter

# คัดลอกเทมเพลตหลักฐาน
cp ../engse203-lab/labs/week-05-react-mini-app/lab05/evidence-templates/*.md labs/week-05/evidence/
mkdir -p labs/week-05/evidence/images

cd labs/week-05/source
npm ci
npm run dev
```

**ห้ามแก้งานใน course repository นี้** และห้ามคัดลอก course repository ทั้งชุดเข้าไปใน repository ของตัวเอง

---

## การส่งงาน

| รายการ | ค่าที่ต้องใช้ |
|---|---|
| Branch | `lab/week-05` |
| Tag | `lab-05-submission-v1` |
| ต้องมีใน `labs/week-05/` | `source/` · `publish/` · `evidence/` |
| `lab-metadata.json` | `status: submitted` · `testStatus: pass` · กรอก `pullRequestUrl` และ `submissionTag` |

```bash
npm run import:publish -- week-05 labs/week-05/source/dist
npm run build:pages
npm run verify:lab -- week-05
```

> **หมายเหตุ** — ถ้า `npm run verify` แจ้งว่าพบ `labs/week-05/source/node_modules` ให้ลบโฟลเดอร์นั้นก่อนตรวจครั้งสุดท้าย (`rm -rf labs/week-05/source/node_modules`) ตัว `.gitignore` กันไม่ให้ commit อยู่แล้ว แต่ตัวตรวจอ่านจากดิสก์โดยตรง

รายละเอียดการส่งงานฉบับเต็มอยู่ใน [คู่มือการส่งงาน](../../docs/submission-guide.md)

---

## การเตรียมตัวล่วงหน้า

- ทบทวน Week 04 — props, state, callback, `.filter()`, spread operator
- ตรวจว่า `node -v` ได้ v22.12.0 ขึ้นไป
- **ทำ Pre-LAB 05A มาก่อนเข้าคาบ** — ใช้เวลา 30 นาที ไม่ต้องเขียนโค้ด ไม่มีคะแนน แต่ต้นคาบจะมีแบบทดสอบสั้นที่ถามเรื่องที่เจอใน Pre-LAB
