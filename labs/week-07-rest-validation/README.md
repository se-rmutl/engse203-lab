# LAB 07 — RESTful API, Validation & Error Handling

**สัปดาห์ที่ 7** · หน่วยที่ 3 การพัฒนาส่วนหลังและบริการ RESTful API ด้วย Node.js
**รูปแบบงาน:** รายบุคคล · **CLO:** CLO4 (หลัก) · CLO6 (รอง) · **การประเมิน:** A2 Weekly LAB

> **สัปดาห์นี้คือการปิดหน่วยที่ 3** — เอา React (Week 05) กับ API (Week 06) มาต่อกันให้ทำงานจริง

---

## เริ่มตรงไหน

| ลำดับ | ทำเมื่อไร | เปิดไฟล์ |
|---|---|---|
| 1 | ก่อนเข้าคาบ | [เอกสารประกอบการสอน](https://se-rmutl.github.io/engse203/week07/week07-teaching-doc.html) **บทที่ 1–3** (สถานะปัจจุบัน · Origin · CORS) |
| 2 | ในคาบ | [`lab07/LAB07_INCLASS_GUIDE_TH.md`](lab07/LAB07_INCLASS_GUIDE_TH.md) |
| 3 | ที่บ้าน | [`lab07/LAB07_TAKEHOME_GUIDE_TH.md`](lab07/LAB07_TAKEHOME_GUIDE_TH.md) |

อ่านประกอบได้ตลอด — [เอกสารประกอบการสอน Week 07](https://se-rmutl.github.io/engse203/week07/week07-teaching-doc.html) (10 บท · 7 ภาพประกอบ)

---

## สื่อการสอนออนไลน์

> ไฟล์ `.html` เปิดจาก GitHub โดยตรงไม่ได้ (จะเห็นเป็นโค้ด) — **ใช้ลิงก์ด้านล่างนี้แทน**

| สื่อ | เปิด |
|---|---|
| สไลด์ Week 07 (มี CORS simulator) | [เปิดสไลด์](https://se-rmutl.github.io/engse203/week07) |
| เอกสารประกอบการสอน (10 บท) | [เปิดเอกสาร](https://se-rmutl.github.io/engse203/week07/week07-teaching-doc.html) |

### หน้าจอ Live-Coding (ใช้ในคาบ)

| Checkpoint | ทำอะไร | เปิด |
|---|---|---|
| CP09 | เจอ CORS error ด้วยตาตัวเอง | [เปิด](https://se-rmutl.github.io/engse203/week07/guides/ENGSE203_Week07_CP09_LiveCoding.html) |
| CP10 | เปิด CORS + environment config | [เปิด](https://se-rmutl.github.io/engse203/week07/guides/ENGSE203_Week07_CP10_LiveCoding.html) |
| CP11 | apiClient + เปลี่ยน requestService | [เปิด](https://se-rmutl.github.io/engse203/week07/guides/ENGSE203_Week07_CP11_LiveCoding.html) |
| CP12 | loading และ error state | [เปิด](https://se-rmutl.github.io/engse203/week07/guides/ENGSE203_Week07_CP12_LiveCoding.html) |

> ไฟล์ต้นฉบับทั้งหมดอยู่ใน `guides/` ของโฟลเดอร์นี้ — clone ไปเปิดออฟไลน์ได้

---

## ภาพรวม

เชื่อม **front-end กับ back-end** ให้ทำงานด้วยกันจริง — เปิด CORS, จัดการ environment config, สร้าง API client, เปลี่ยน Service Layer ให้เรียก API, และจัดการสถานะ loading/error

```
Week 05                Week 06                  Week 07
React + Service   →    Express API         →    เชื่อมสองฝั่ง
(localStorage)         (memory/JSON)             (CORS + fetch จริง)
```

**แนวคิดแกนกลาง** — เปลี่ยนแค่ Service Layer แล้วทั้งแอปทำงานกับ backend จริง **โดย component ไม่ต้องแก้เลยแม้แต่บรรทัดเดียว**

> ⚠ **สัปดาห์นี้ต้องรัน 2 โปรแกรมพร้อมกัน** — API ที่พอร์ต 3001 และ React ที่พอร์ต 5173

---

## งาน 3 ระดับ

| | ทำที่ไหน | Checkpoint | สัดส่วนคะแนน |
|---|---|---|---|
| 🏫 **In-Class** | ในห้อง ทำให้เสร็จในคาบ | CP09–CP12 · เชื่อม React กับ API | 30% |
| 🏠 **Take-Home** | ที่บ้าน ภายใน 5 วัน | CP13–CP16 · PUT, morgan, contract, test | 70% |
| ⭐ **Challenge** | ที่บ้าน ไม่บังคับ | AppError · asyncHandler · retry | +15% bonus |

---

## Checkpoint ทั้งหมด

| CP | ทำอะไร | ที่ไหน |
|---|---|---|
| **CP09** | เจอ CORS error ด้วยตาตัวเอง — เห็นปัญหาก่อนแก้ | 🏫 |
| **CP10** | เปิด CORS + environment config (`.env`, `config.js`) | 🏫 |
| **CP11** | สร้าง `apiClient.js` + เปลี่ยน `requestService.js` ให้เรียก API | 🏫 |
| **CP12** | loading และ error state ฝั่ง React | 🏫 |
| **CP13** | `PUT /api/requests/:id` เปลี่ยนสถานะ — ทั้ง API และ React | 🏠 |
| **CP14** | morgan + error handling ระดับ production | 🏠 |
| **CP15** | เขียน **API Contract** | 🏠 |
| **CP16** | **automated test** ด้วย supertest อย่างน้อย 6 เคส | 🏠 |

---

## สิ่งที่คาดว่าจะได้เรียนรู้

- อธิบายได้ว่า origin คืออะไร และทำไมเบราว์เซอร์บังคับใช้ Same-Origin Policy
- อธิบายกลไก CORS และ preflight request ได้ · แก้ปัญหา CORS ได้ถูกที่
- แยกค่าตั้งค่าออกจากโค้ดด้วย environment variables ได้
- ออกแบบชั้น API client ที่จัดการ error รวมศูนย์ได้
- เปลี่ยนแหล่งข้อมูลของ Service Layer โดยไม่กระทบ component ได้
- จัดการสถานะ loading / error / empty ของการเรียก API ได้
- เขียน API contract และ automated test ได้

---

## เริ่มทำ LAB

ต้องเปิด **2 terminal** พร้อมกัน

```bash
# ── Terminal 1 · API ──
cd lab07/starter/api
npm install && cp .env.example .env
npm run dev                    # http://localhost:3001

# ── Terminal 2 · Frontend ──
cd lab07/starter/frontend
npm install && cp .env.example .env.local
npm run dev                    # http://localhost:5173
```

**ตรวจงานด้วย checker** (รันจาก `lab07/starter/`)

```bash
node check-week07.mjs --inclass          # งานในห้อง — เป้าหมาย 25/25
node check-week07.mjs                    # ทั้งหมด — เป้าหมาย 33/36 (36/36 ถ้าทำ Challenge)
node check-week07.mjs --inclass | grep TODO
```

**รัน automated test** (CP16)

```bash
cd api && npm test
```

---

## สิ่งที่ต้องส่ง

- Source code ทั้ง `api/` และ `frontend/` ที่รันได้ตาม README
- `API_CONTRACT.md` ครบทั้ง 5 endpoint พร้อมตัวอย่าง request/response
- `api/tests/api.test.js` อย่างน้อย 6 เคส
- Screenshot — แอปทำงานกับ API · Network tab ที่เห็นคำขอ · terminal ของ API
- `AI_USAGE.md` กรอกครบถ้ามีการใช้ AI
- Git history ที่แสดงการทำงานอย่างต่อเนื่อง

**ส่งผ่าน**

```bash
git switch -c unit3/week-07
git add -A
git commit -m "LAB07: เชื่อม front-end กับ back-end"
git push -u origin unit3/week-07
git tag lab-07-submission-v1 && git push origin lab-07-submission-v1
```

> **ใช้ AI ได้ แต่ต้องเป็นเจ้าของโค้ด** — ผู้สอนจะสุ่มถามจากโค้ดที่ส่ง

---

## การเตรียมตัวล่วงหน้า

- **ตรวจว่าโปรเจกต์ Week 05 และ Week 06 ของคุณยังเปิดได้** — สัปดาห์นี้ใช้ทั้งคู่
- ทบทวน `fetch()` และ `async/await`
- ทบทวนโครงสร้าง `requestService.js` ที่ทำไว้ใน Week 05
- ดู **API Contract template** ที่ให้มาใน starter — [`.md`](lab07/starter/templates/API_CONTRACT_TEMPLATE.md) สำหรับทำงานส่ง · [`.docx`](lab07/starter/templates/API_CONTRACT_TEMPLATE.docx) ฉบับทางการสำหรับส่งลูกค้า

---

## โครงสร้างโฟลเดอร์

```
week-07-rest-validation/
├── lab07/
│   ├── LAB07_INCLASS_GUIDE_TH.md      ← คู่มือทำในห้อง
│   ├── LAB07_TAKEHOME_GUIDE_TH.md     ← คู่มือทำที่บ้าน + Challenge
│   └── starter/
│       ├── api/                        ← Express (ต่อจาก Week 06)
│       ├── frontend/                   ← React (ต่อจาก Week 05)
│       └── check-week07.mjs
├── guides/
│   ├── ENGSE203_Week07_Teaching_Document_TH.html   ← 10 บท · 7 ภาพ
│   ├── ENGSE203_Week07_Slides.html                 ← 23 สไลด์ · 7 SVG
│   └── ENGSE203_Week07_Blueprint_TH.md
├── live-coding/                        ← 4 หน้าจอ CP09–CP12
└── _instructor-private/                ⚠ สำหรับผู้สอนเท่านั้น
```

---

## สำหรับผู้สอน

| ไฟล์ | ใช้ทำอะไร |
|---|---|
| [Instructor Step Script](_instructor-private/ENGSE203_Week07_Instructor_Step_Script_TH.md) | สคริปต์ 300 นาที + Hint Ladder + แผนสำรอง |
| `_instructor-private/reference-solution/` | เฉลยครบ (checker 36/36 · test 7/7) |
| `live-coding/*.html` | หน้าจอฉายทีละ checkpoint |
| `guides/ENGSE203_Week07_Slides.html` | สไลด์ 23 หน้า มี CORS simulator |

**ตรวจก่อนสอน**

```bash
cd _instructor-private/reference-solution
cd api && npm ci && cp .env.example .env && cd ..
cd frontend && npm ci && cp .env.example .env.local && cd ..
node check-week07.mjs | tail -6          # ต้องได้ 36/36
cd api && npm test                       # ต้องผ่าน 7/7

cd ../../../lab07/starter
node check-week07.mjs --inclass | tail -3    # ต้องได้ 10/25
```

⚠ **`_instructor-private/` ต้องไม่เผยแพร่ให้นักศึกษา**
