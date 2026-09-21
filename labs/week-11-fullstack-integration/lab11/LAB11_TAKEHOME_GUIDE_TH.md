# ENGSE203 LAB 11 — คู่มือ Take-Home (งาน A4)

**🏠 ทำที่บ้าน · CP40 → CP43 · งาน A4 Full-Stack Integration**
**หน่วยที่ 4 · สัปดาห์ที่ 11 · ปิดหน่วย**

---

## ตรวจก่อนเริ่ม

```bash
node --disable-warning=ExperimentalWarning check-week11.mjs --inclass   # ต้องได้ 15/15
```

ถ้ายังไม่ครบ ให้ทำงานในห้องให้จบก่อน — งาน A4 ต่อยอดจากระบบที่ประกอบเสร็จแล้ว

---

## งาน A4 คืออะไร

งานบูรณาการปิดหน่วยที่ 4 — **ส่งมอบระบบ full-stack ที่ทำงานได้จริง พร้อมหลักฐาน**

| CP | ทำอะไร | เวลาโดยประมาณ |
|---|---|---|
| **CP40** | เขียน README ระบบ full-stack | 40 นาที |
| **CP41** | ตอบคำถามจากบทอ่านเพิ่มเติม | 40 นาที |
| **CP42** | บันทึกวิดีโอ/ภาพสาธิต | 50 นาที |
| **CP43** | จำลอง production ในเครื่อง | 45 นาที |

---

# CP40 · README ระบบ full-stack

**🏠 40 นาที**

README ที่ดีทำให้คนอื่น (รวมถึงตัวเราในอนาคต) เข้าใจและรันระบบได้

## ต้องมีหัวข้อ

| หัวข้อ | เขียนอะไร |
|---|---|
| ภาพรวม | ระบบทำอะไร · ใช้เทคโนโลยีอะไร |
| **สถาปัตยกรรม 3 ชั้น** | React ↔ API ↔ DB · แต่ละชั้นทำอะไร |
| วิธีรัน (dev) | ขั้นตอนเปิดทั้ง 3 ส่วน |
| วิธีรัน (production) | build + start |
| Environment Variables | ตารางตัวแปรที่ต้องตั้ง |
| การตัดสินใจออกแบบ | ทำไมแยก 3 ชั้น · ทำไมเลือก SQLite |

## ตัวอย่างส่วนสถาปัตยกรรม

```markdown
## สถาปัตยกรรม 3 ชั้น

┌─────────┐  HTTP   ┌──────────┐  SQL   ┌─────────┐
│ React   │ ──────► │ Express  │ ─────► │ SQLite  │
└─────────┘  JSON   └──────────┘  rows  └─────────┘

| ชั้น | หน้าที่ | โฟลเดอร์ |
|---|---|---|
| Frontend | หน้าจอผู้ใช้ | frontend/ |
| API | route·controller·service | api/src/ |
| Database | เก็บข้อมูล | api/data/ |
```

### ✓ ผ่าน CP40 เมื่อ

- [ ] มีหัวข้อสถาปัตยกรรม 3 ชั้น
- [ ] มีวิธีรันทั้ง dev และ production
- [ ] มีตาราง environment variables
- [ ] อธิบายการตัดสินใจออกแบบ

---

# CP41 · ตอบคำถามจากบทอ่านเพิ่มเติม

**🏠 40 นาที**

อ่านบทที่ 8 "ทางเลือกฐานข้อมูล" ในเอกสารประกอบการสอน แล้วเขียนตอบใน `DATABASE_CHOICES.md`

## 3 คำถามที่ต้องตอบ

### 1. ทำไมโปรเจกต์นี้เลือก SQLite แทน MongoDB

คำใบ้ — ข้อมูลเรามีโครงชัดไหม · มีความสัมพันธ์ระหว่างตารางไหม

### 2. ถ้าวันหนึ่งต้องเปลี่ยนไป MongoDB จะกระทบชั้นไหนบ้าง

คำใบ้ — นึกถึง 4 ครั้งที่ผ่านมาที่แก้ชั้นเดียว · ครั้งนี้ต่างออกไปเพราะอะไร (async)

### 3. async จำเป็นเมื่อไร ไม่จำเป็นเมื่อไร

คำใบ้ — ต่างกันตรงที่ฐานข้อมูลอยู่ที่ไหน (ในเครื่อง vs คนละเครื่อง)

## รูปแบบคำตอบ

เขียนเป็นความเข้าใจของตัวเอง ไม่ใช่ลอกจากเอกสาร · แต่ละข้อ 3–5 ประโยค

### ✓ ผ่าน CP41 เมื่อ

- [ ] ตอบครบ 3 ข้อใน `DATABASE_CHOICES.md`
- [ ] คำตอบข้อ 2 ระบุว่ากระทบ **service + controller** (เพราะ async)
- [ ] เขียนเป็นภาษาตัวเอง เข้าใจจริง

### 💬 ผู้สอนจะสุ่มถาม

> อธิบายด้วยปากเปล่าว่าทำไมเปลี่ยนไป MongoDB ถึงกระทบ controller ด้วย

---

# CP42 · วิดีโอนำเสนอ — สาธิต + อธิบาย source

**🏠 60 นาที · หลักฐานหลักของงาน A4**

เพราะเป็นงานปิดหน่วย — วิดีโอต้องพิสูจน์ 2 อย่าง: **ระบบทำงานจริง** และ **เราเข้าใจ source เอง**

## วิดีโอมี 2 ช่วง

### ช่วง A · สาธิตระบบทำงานครบวงจร (≈ 3–4 นาที)

| ต้องเห็น | พิสูจน์ว่า |
|---|---|
| เปิดระบบครบ 3 ชั้น (React + API + DB) | ประกอบได้จริง |
| ดู · เพิ่ม · เปลี่ยนสถานะ · ลบคำร้อง | CRUD ครบวงจร |
| `GET /api/health` แสดงสถานะ | ระบบบอกสถานะตัวเอง |
| ปิด-เปิดเซิร์ฟเวอร์ใหม่ ข้อมูลยังอยู่ | ข้อมูลถาวรจริง |
| production build เปิดพอร์ตเดียว | พร้อมใช้จริง |

### ช่วง B · อธิบาย source code (≈ 4–5 นาที)

**เปิดโค้ดจริงแล้วอธิบาย** ว่าแต่ละชั้นทำงานอย่างไร — นี่คือส่วนที่พิสูจน์ว่าเข้าใจ ไม่ใช่แค่ทำตาม

| ต้องอธิบายได้ | ชี้ไฟล์ |
|---|---|
| **frontend เรียก API อย่างไร** | `frontend/src/services/` |
| **request เดินผ่านชั้นไหนบ้าง** | route → controller → service |
| **service คุยกับฐานข้อมูลอย่างไร** | `api/src/services/requestService.js` |
| **config อ่านจาก env อย่างไร** | `api/src/config.js` |
| **health check เช็คอะไร** | `api/src/routes/healthRoutes.js` |
| **production ต่างจาก dev อย่างไร** | `api/src/app.js` (static serving) |

> **คำแนะนำ** — ไม่ต้องอ่านโค้ดทีละบรรทัด · เล่าเป็น "เมื่อผู้ใช้กดเพิ่มคำร้อง เกิดอะไรขึ้นตั้งแต่ frontend จนถึงฐานข้อมูล แล้วย้อนกลับ"

## รูปแบบที่รับ

| รูปแบบ | หมายเหตุ |
|---|---|
| วิดีโอเดียว 2 ช่วง (YouTube unlisted / Drive / Loom) | **แนะนำ** — ต่อเนื่องดูง่าย |
| 2 วิดีโอแยก (สาธิต + อธิบาย) | ได้ · ใส่ทั้ง 2 ลิงก์ |

## บันทึกใน DEMO.md

```markdown
# หลักฐานการสาธิต (A4)

## ช่วง A — สาธิตระบบ
🔗 (ลิงก์ · หรือ timestamp ถ้าวิดีโอเดียว)
- [x] เปิด 3 ชั้น · CRUD · health · production build

## ช่วง B — อธิบาย source
🔗 (ลิงก์ · หรือ timestamp)
- [x] frontend → API → service → DB
- [x] config · health check · production vs dev
```

### ✓ ผ่าน CP42 เมื่อ

- [ ] มีวิดีโอครบทั้งช่วง A (สาธิต) และช่วง B (อธิบาย source)
- [ ] ช่วง B เปิดโค้ดจริงและอธิบายการไหลของข้อมูล
- [ ] มี `DEMO.md` พร้อมลิงก์

# CP43 · จำลอง production ในเครื่อง

**🏠 45 นาที · ทุกคนต้องทำ**

> **สัปดาห์นี้เราไม่ deploy ขึ้น cloud จริง** (นักศึกษาส่วนใหญ่ยังไม่เคยใช้ cloud) — แต่เราจะ **จำลองสิ่งที่ cloud จะทำ ในเครื่องเราเอง** · เข้าใจ production เต็มที่ก่อน แล้วค่อยลอง cloud จริงเป็น Challenge

## จำลอง production คืออะไร

ตอน dev เรารัน 2 server แยก (frontend 5173 + API 3001) · **ตอน production ทั้งระบบรวมเป็นเซิร์ฟเวอร์เดียว** — นี่คือสิ่งที่ cloud จะทำให้ · เราทำเองในเครื่องได้เลย

```bash
# ① build frontend เป็นไฟล์ static
cd frontend && npm run build          # → สร้าง dist/

# ② รัน API แบบ production — เสิร์ฟ frontend ที่ build แล้วด้วย
cd ../api && NODE_ENV=production npm start
```

## ตรวจว่าจำลอง production สำเร็จ

เปิดเบราว์เซอร์ไป **`http://localhost:3001`** (พอร์ตเดียว) แล้วตรวจ

| เปิด | ต้องได้ |
|---|---|
| `http://localhost:3001/` | **หน้าเว็บ React** (ไม่ใช่แค่ API) |
| `http://localhost:3001/api/requests` | JSON ข้อมูลคำร้อง |
| `http://localhost:3001/api/health` | `{ "env": "production", ... }` |

> **ต่างจาก dev อย่างไร** — dev ต้องเปิด 2 พอร์ต (5173 + 3001) · production เปิดพอร์ตเดียว (3001) ได้ทั้งเว็บและ API เพราะ frontend ถูก build แล้ว API เสิร์ฟให้

## บันทึกความเข้าใจใน README

เพิ่มหัวข้อ "วิธีรัน production" ใน README (ต่อจาก CP40) — อธิบายว่า

- ต้อง `npm run build` frontend ก่อน
- `NODE_ENV=production` ทำให้ API เสิร์ฟ static + log แบบ combined
- เปิดพอร์ตเดียวได้ทั้งเว็บและ API

## ⚠ เตรียมพร้อมสำหรับ deploy จริง (ไม่ต้องทำตอนนี้)

โปรเจกต์เรามี `render.yaml` และ `.env.example` ให้แล้ว — พร้อม deploy เมื่อไรก็ได้ · **Challenge ด้านล่างมีคู่มือจับมือทำ** สำหรับคนที่อยากลองขึ้น cloud จริง

### ✓ ผ่าน CP43 เมื่อ

- [ ] `npm run build` สร้าง `frontend/dist/` สำเร็จ
- [ ] `NODE_ENV=production npm start` เปิด **พอร์ตเดียว** ได้ทั้งเว็บและ API
- [ ] `/api/health` บอก `env: production`
- [ ] README มีหัวข้อวิธีรัน production

### 💬 คำถามที่ต้องตอบได้

> ทำไม production รวมเป็นพอร์ตเดียว แทนที่จะรัน 2 server เหมือน dev · และ cloud ทำอะไรที่เราจำลองในเครื่องนี้

---

# ⭐ Challenge

## ① ⭐⭐ deploy จริงขึ้น Render (จับมือทำ)

**สำหรับคนที่อยากเห็นระบบตัวเองออนไลน์จริง** — เพื่อนเปิดจากมือถือได้ · ไม่ต้อง set server เอง Render จัดการ Linux ให้หมด

> **ต้องมี** — บัญชี GitHub (มีแล้วจากวิชานี้) · อีเมลสำหรับสมัคร Render · อินเทอร์เน็ต

### ขั้นที่ 1 — push โปรเจกต์ขึ้น GitHub

```bash
git push origin unit4/week-11
```
ต้องมี repo บน GitHub ที่มีทั้ง `frontend/` และ `api/`

### ขั้นที่ 2 — สมัคร Render

1. เปิด **https://render.com** → กด **Get Started** (มุมขวาบน)
2. เลือก **Sign in with GitHub** (ใช้บัญชีเดิม ไม่ต้องสร้างใหม่)
3. อนุญาต (Authorize) ให้ Render เข้าถึง GitHub
4. **ไม่ต้องใส่บัตรเครดิต** — free tier ไม่ต้องใช้

### ขั้นที่ 3 — สร้าง Web Service

1. บนหน้า Dashboard กด **New +** → เลือก **Web Service**
2. เลือก repo `engse203-lab` ของคุณ → กด **Connect**
3. Render จะอ่าน `render.yaml` ให้อัตโนมัติ · ถ้าถามให้ตั้งค่าเอง กรอกตามนี้

| ช่อง | ใส่อะไร |
|---|---|
| Name | `campus-service` (หรือชื่อที่ชอบ) |
| Region | Singapore (ใกล้ไทยสุด) |
| Branch | `unit4/week-11` |
| Build Command | `cd frontend && npm install && npm run build && cd ../api && npm install` |
| Start Command | `cd api && npm start` |
| Instance Type | **Free** |

4. Environment → เพิ่ม `NODE_ENV` = `production`
5. กด **Create Web Service**

### ขั้นที่ 4 — รอ build (ประมาณ 2–5 นาที)

- Render จะแสดง log สด — เห็น `npm install`, `npm run build` ทำงาน
- เมื่อขึ้น **"Your service is live 🎉"** = สำเร็จ
- ได้ URL แบบ `https://campus-service-xxxx.onrender.com`

### ขั้นที่ 5 — ตรวจว่าใช้ได้จริง

- เปิด URL นั้น → เห็นหน้าเว็บ React
- เปิด `URL/api/health` → เห็น `env: production`
- **ส่ง URL ให้เพื่อนเปิดจากมือถือ** — ได้เห็นระบบตัวเองออนไลน์จริง!

### ⚠ 2 เรื่องที่ต้องรู้ (ไม่ใช่บั๊ก)

**① เปิดครั้งแรกช้า 30–60 วินาที** — free tier ของ Render จะ "หลับ" หลังไม่มีคนเข้า 15 นาที · พอมีคนเปิดจะ "ตื่น" ใช้เวลาสักครู่ · Render แสดงหน้า loading ระหว่างรอ · **นี่คือปกติของ free tier ไม่ใช่ระบบพัง**

**② ข้อมูลที่เพิ่มบนเว็บจะหายเมื่อ Render restart** — เพราะ free tier ใช้ ephemeral filesystem (ไฟล์หายทุก restart) · `campus.db` ที่เพิ่มข้อมูลใหม่จะกลับไปเป็นข้อมูลตั้งต้น

> **ข้อ ② คือบทเรียนสำคัญ** — โยงกับบทที่ 7 เรื่อง "SQLite บน cloud ephemeral อาจหาย" · **นี่คือเหตุผลจริงที่ระบบใหญ่ใช้ฐานข้อมูลแยกเครื่อง** (PostgreSQL/MongoDB cloud) ไม่ใช่ไฟล์ในเครื่องเดียวกับ API · ถ้าอยากแก้จริงต้องใช้ฐานข้อมูลแยก ซึ่งอยู่นอกขอบเขตหน่วยนี้

### บันทึกใน README

```markdown
## Live Demo
🔗 https://campus-service-xxxx.onrender.com

หมายเหตุ: free tier — เปิดครั้งแรกช้า 30–60 วิ (service ตื่นจาก sleep)
ข้อมูลที่เพิ่มจะรีเซ็ตเมื่อ restart (ephemeral filesystem)
```

## ② CI — รัน checker อัตโนมัติ

```yaml
# .github/workflows/check.yml
name: LAB Check
on: [push]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: cd api && npm install && npm run db:setup
      - run: node --disable-warning=ExperimentalWarning check-week11.mjs
```

## ③ ลองต่อ MongoDB Atlas

ตามบทอ่านเพิ่มเติม — สำหรับคนที่อยากลองของจริง (ไม่บังคับ)

---

# การส่งงาน A4

## ตรวจให้ครบก่อนส่ง

```bash
node --disable-warning=ExperimentalWarning check-week11.mjs   # เป้าหมาย 32/36
node --disable-warning=ExperimentalWarning check-week10.mjs   # ต้องยัง 31/31
node --disable-warning=ExperimentalWarning check-week07.mjs   # ต้องยัง 36/36
```

**เป้าหมาย 32/36** (36/36 ถ้าทำ Challenge ครบ)

## ส่งอย่างไร — โปรเจกต์มีทั้ง frontend และ backend

ระบบเรามี 2 ส่วน (`frontend/` + `api/`) อยู่ใน **repo เดียวกัน** — ส่งทั้ง repo ครั้งเดียว

### ① ส่ง source code — push ทั้ง repo

```bash
git switch -c unit4/week-11
git add -A                    # เก็บทั้ง frontend/ และ api/
git commit -m "LAB11 (A4): ระบบ full-stack พร้อมใช้จริง"
git push -u origin unit4/week-11
git tag lab-11-submission-v1 && git push origin lab-11-submission-v1
```

**ต้อง commit อะไรบ้าง**

| commit | ไม่ commit (อยู่ใน .gitignore) |
|---|---|
| `frontend/src/` · `api/src/` · `api/data/campus.db` | `node_modules/` |
| `README.md` · `DATABASE_CHOICES.md` · `DEMO.md` | `.env` (ค่าลับ) |
| `render.yaml` | `frontend/dist/` (build ใหม่ได้) |

> **ตรวจก่อน push** — `git status` ควรเห็นทั้งไฟล์ใน `frontend/` และ `api/` · ไม่มี `node_modules` หรือ `.env`

### ② ส่งวิดีโอนำเสนอ

ใส่ลิงก์วิดีโอ (ช่วง A สาธิต + ช่วง B อธิบาย source) ไว้ใน `DEMO.md` ที่ push ขึ้นไป

### ③ สรุปไฟล์ที่ต้องมีใน repo

| ไฟล์ | จาก CP |
|---|---|
| `README.md` (สถาปัตยกรรม + วิธีรัน + production) | CP40, CP43 |
| `DATABASE_CHOICES.md` (ตอบ 3 คำถาม) | CP41 |
| `DEMO.md` (ลิงก์วิดีโอ 2 ช่วง) | CP42 |
| ระบบ full-stack ที่ทำงาน (frontend + api) | CP35–39 |

### เกณฑ์การให้คะแนน A4

| ส่วน | สัดส่วน |
|---|---|
| ระบบทำงานครบวงจร (checker + สาธิต ช่วง A) | 40% |
| **อธิบาย source ได้ (วิดีโอ ช่วง B)** | 30% |
| README + คำตอบบทอ่าน | 20% |
| production-ready (จำลอง production ในเครื่อง) | 10% |

> **ช่วง B สำคัญ** — ผู้สอนดูว่าอธิบายการไหลของข้อมูลได้ไหม · ทำระบบได้แต่อธิบายไม่ได้ = ยังไม่เข้าใจจริง

---

## ปิดหน่วยที่ 4 แล้ว 🎉

สามสัปดาห์ที่ผ่านมา —

| สัปดาห์ | ทำอะไร |
|---|---|
| 9 | เรียน SQL · ออกแบบและสร้างฐานข้อมูล |
| 10 | เชื่อม Node เข้ากับฐานข้อมูล |
| **11** | **ประกอบเป็นระบบจริงที่ deploy ได้** |

**บทเรียนใหญ่** — แยกชั้นดี เปลี่ยนแหล่งข้อมูลได้โดยกระทบชั้นเดียว (4 ครั้ง) · และ "ทำงานได้" ต่างจาก "พร้อมใช้จริง"

**ต่อไป** — หน่วยที่ 5 · คุณภาพและความปลอดภัยของซอฟต์แวร์ · ระบบที่ประกอบเสร็จนี้จะเป็นฐานเรียนต่อ
