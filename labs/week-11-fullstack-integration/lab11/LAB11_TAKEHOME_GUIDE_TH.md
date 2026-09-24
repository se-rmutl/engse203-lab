# ENGSE203 LAB 11 — คู่มือ Take-Home (งาน A4)

**🏠 ทำที่บ้าน · CP40 → CP43 · งาน A4 Full-Stack Integration**
**หน่วยที่ 4 · สัปดาห์ที่ 11 · ปิดหน่วย**

---

## ตรวจก่อนเริ่ม

```bash
node --disable-warning=ExperimentalWarning check-week11.mjs --inclass   # ต้องได้ 17/17
```

ถ้ายังไม่ครบ ให้ทำงานในห้องให้จบก่อน — งาน A4 ต่อยอดจากระบบที่ประกอบเสร็จแล้ว

---

## งาน A4 คืออะไร

งานบูรณาการปิดหน่วยที่ 4 — **ส่งมอบระบบ full-stack ที่ทำงานได้จริง พร้อมหลักฐาน และอธิบาย source ของตัวเองได้**

| CP | ทำอะไร | เวลาโดยประมาณ | บังคับ |
|---|---|---|---|
| **CP40** | เขียน README ระบบ full-stack | 40 นาที | ✅ |
| **CP41** | ตอบคำถามจากบทอ่านเพิ่มเติม | 40 นาที | ✅ |
| **CP42** | วิดีโอนำเสนอ — สาธิต + อธิบาย source | 60 นาที | ✅ |
| **CP43** | จำลอง production ในเครื่อง | 45 นาที | ✅ |
| ⭐ | deploy จริงขึ้น Render | 60 นาที | ไม่บังคับ |
| ⭐⭐ | ข้อมูลถาวรด้วย Turso (ต่อจาก ⭐) | 45 นาที | ไม่บังคับ |

> 📘 **คู่มือ Deploy แบบมีภาพประกอบ** — https://se-rmutl.github.io/engse203/week11/deploy-guide.html
> อธิบายทีละขั้นว่าระบบทำงานอย่างไรตอน production และขึ้น Render อย่างไร

---

## โครงสร้างที่ต้องมีใน Student Repository

เหมือนสัปดาห์ก่อน ๆ — งานสัปดาห์นี้อยู่ที่ **`labs/week-11/source/`** · ตั้งต้นโดยคัดลอก `labs/week-10/source/` มา

```bash
# รันที่ root ของ Student Repository
cp -r labs/week-10/source labs/week-11/source
```

```
labs/week-11/source/                 ← ถ้า deploy ขึ้น Render นี่คือ "Root Directory"
├── api/
│   ├── data/schema.sql · campus.db
│   ├── src/
│   │   ├── config.js                ← CP36
│   │   ├── routes/healthRoutes.js   ← CP37
│   │   └── app.js                   ← CP38 · CP39
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   ├── .env.example
│   ├── .env.production              ← CP39 (commit ไฟล์นี้ — ไม่มีค่าลับ)
│   └── package.json
├── package.json                     ← CP43 script build + start
├── README.md                        ← CP40
├── DATABASE_CHOICES.md              ← CP41
├── DEMO.md                          ← CP42
├── check-week07.mjs · check-week10.mjs · check-week11.mjs
├── evidence/
│   └── images/
│       ├── production-one-port.png  ← เปิด :3001 เห็นหน้าเว็บ
│       └── health-production.png    ← /api/health แสดง env: production
├── AI_USAGE.md
└── .gitignore                       ← node_modules/, .env, .env.local, frontend/dist/
```

---

# CP40 · README ระบบ full-stack

**🏠 40 นาที**

README ที่ดีทำให้คนอื่น (รวมถึงตัวเราในอนาคต) เข้าใจและรันระบบได้โดยไม่ต้องถาม

## ต้องมีหัวข้อ

| หัวข้อ | เขียนอะไร |
|---|---|
| ภาพรวม | ระบบทำอะไร · ใช้เทคโนโลยีอะไร |
| **สถาปัตยกรรม 3 ชั้น** | React ↔ API ↔ DB · แต่ละชั้นทำอะไร อยู่โฟลเดอร์ไหน |
| วิธีรัน (dev) | ขั้นตอนเปิดทั้ง 3 ส่วน (2 terminal) |
| **วิธีรัน (production)** | `npm run build` แล้ว `NODE_ENV=production npm start` |
| Environment Variables | ตารางตัวแปรที่ต้องตั้ง และค่าเริ่มต้น |
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
| API | route · controller · service | api/src/ |
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
| production mode เปิดพอร์ตเดียว (3001) | พร้อมใช้จริง |

### ช่วง B · อธิบาย source code (≈ 4–5 นาที)

**เปิดโค้ดจริงแล้วอธิบาย** ว่าแต่ละชั้นทำงานอย่างไร — นี่คือส่วนที่พิสูจน์ว่าเข้าใจ ไม่ใช่แค่ทำตาม

| ต้องอธิบายได้ | ชี้ไฟล์ |
|---|---|
| **frontend เรียก API อย่างไร** | `frontend/src/services/` |
| **request เดินผ่านชั้นไหนบ้าง** | route → controller → service |
| **service คุยกับฐานข้อมูลอย่างไร** | `api/src/services/requestService.js` |
| **config อ่านจาก env อย่างไร** | `api/src/config.js` |
| **health check เช็คอะไร** | `api/src/routes/healthRoutes.js` |
| **production ต่างจาก dev อย่างไร** | `api/src/app.js` · `frontend/.env.production` |

> **คำแนะนำ** — ไม่ต้องอ่านโค้ดทีละบรรทัด · เล่าเป็น "เมื่อผู้ใช้กดเพิ่มคำร้อง เกิดอะไรขึ้นตั้งแต่ frontend จนถึงฐานข้อมูล แล้วย้อนกลับ"

## รูปแบบที่รับ

| รูปแบบ | หมายเหตุ |
|---|---|
| วิดีโอเดียว 2 ช่วง (YouTube unlisted / Google Drive / Loom) | **แนะนำ** — ใส่ timestamp ของแต่ละช่วง |
| 2 วิดีโอแยก (สาธิต + อธิบาย) | ได้ · ใส่ทั้ง 2 ลิงก์ |

> ⚠ ถ้าใช้ Google Drive ต้องตั้งสิทธิ์ **"ทุกคนที่มีลิงก์ดูได้"** — ไม่งั้นผู้สอนเปิดไม่ได้

## บันทึกใน DEMO.md

```markdown
# หลักฐานการสาธิต (A4)

## ช่วง A — สาธิตระบบ
🔗 (ลิงก์ · หรือ timestamp ถ้าวิดีโอเดียว)
- [x] เปิด 3 ชั้น · CRUD · health · production mode

## ช่วง B — อธิบาย source
🔗 (ลิงก์ · หรือ timestamp)
- [x] frontend → API → service → DB
- [x] config · health check · production vs dev

## Live Demo (ถ้าทำ Challenge)
🔗 https://xxxx.onrender.com
ฐานข้อมูล: SQLite ไฟล์ (รีเซ็ตเมื่อ restart) / Turso (ข้อมูลถาวร)
```

### ✓ ผ่าน CP42 เมื่อ

- [ ] มีวิดีโอครบทั้งช่วง A (สาธิต) และช่วง B (อธิบาย source)
- [ ] ช่วง B เปิดโค้ดจริงและอธิบายการไหลของข้อมูล
- [ ] มี `DEMO.md` พร้อมลิงก์ที่เปิดได้

---

# CP43 · จำลอง production ในเครื่อง

**🏠 45 นาที · ทุกคนต้องทำ**

> **สัปดาห์นี้ไม่บังคับ deploy ขึ้น cloud** — แต่จะ **จำลองสิ่งที่ cloud จะทำ ในเครื่องเราเอง ให้เหมือนที่สุด**
> ถ้าผ่านขั้นนี้ครบ การขึ้น Render จริง (Challenge) แทบไม่มีอะไรต้องแก้เพิ่ม

## ① เพิ่ม script ที่ root ของโปรเจกต์

cloud ต้องการ **คำสั่ง build 1 คำสั่ง และคำสั่ง start 1 คำสั่ง** — เราจึงรวมไว้ที่ `package.json` ระดับบนสุด

```json
{
  "name": "campus-service",
  "private": true,
  "engines": { "node": ">=22.13.0" },
  "scripts": {
    "build": "npm install --include=dev --prefix frontend && npm run build --prefix frontend && npm install --prefix api",
    "start": "npm start --prefix api",
    "check": "node --disable-warning=ExperimentalWarning check-week11.mjs"
  },
  "devDependencies": { "supertest": "^7.2.2" }
}
```

### ⚠ ทำไมต้องมี `--include=dev`

cloud ตั้ง `NODE_ENV=production` ไว้**ตั้งแต่ขั้น build** · เมื่อเป็นแบบนั้น `npm install` จะ**ข้าม devDependencies** — แต่ Vite (ตัว build React) เป็น devDependency!

| ไม่ใส่ `--include=dev` | ใส่ `--include=dev` |
|---|---|
| `vite: not found` → build ล้ม | Vite ถูกติดตั้ง → build ผ่าน |

## ② ทดสอบให้เหมือน cloud ที่สุด

```bash
cd labs/week-11/source

# build แบบที่ cloud ทำ (NODE_ENV=production ตั้งแต่ build)
NODE_ENV=production npm run build

# start แบบที่ cloud ทำ (cloud กำหนดพอร์ตเอง — จำลองด้วยพอร์ตอื่นที่ไม่ใช่ 3001)
NODE_ENV=production PORT=10000 npm start
```

> ⚠ **ซ้อมเสร็จแล้วคืนสภาพ dev** — build ในโหมด production จะ**ลบเครื่องมือทดสอบ** (vitest) ออกจาก `api/node_modules`
> ```bash
> npm install --prefix api     # คืน devDependencies ก่อนรัน npm test หรือกลับไปพัฒนาต่อ
> ```

> 💡 **ใช้พอร์ต 10000 แทน 3001 เพราะอะไร** — ถ้าโค้ดยัง hardcode 3001 อยู่ที่ไหนสักแห่ง จะเจอปัญหาทันทีในเครื่อง ไม่ต้องรอไปเจอบน cloud

> 🪟 **Windows (PowerShell)** — ตั้งตัวแปรทีละบรรทัดแทน:
> ```powershell
> $env:NODE_ENV="production"; npm run build; $env:PORT="10000"; npm start
> ```

## ③ ตรวจ 4 จุด

| เปิด | ต้องได้ | ถ้าไม่ได้ |
|---|---|---|
| `http://localhost:10000/` | **หน้าเว็บ React** | ได้ JSON → route `/` ชิงหน้าแรก (CP39 ③) |
| `http://localhost:10000/about` | หน้าเว็บ React | ได้ 404 → ยังไม่มี catch-all ที่คืน index.html |
| `http://localhost:10000/api/health` | `"env": "production"` | ไม่ได้ตั้ง NODE_ENV |
| เพิ่มคำร้องจากหน้าเว็บ | บันทึกได้ | ดู DevTools → Network ว่ายิงไป `localhost:3001` ไหม |

## ④ ตรวจ bundle ด้วยตาตัวเอง

```bash
grep -l "localhost:3001" frontend/dist/assets/*.js
```

**ต้องไม่มีผลลัพธ์** · ถ้ามีไฟล์โผล่มา แปลว่ายังไม่มี `frontend/.env.production` (CP39)

### ✓ ผ่าน CP43 เมื่อ

- [ ] root `package.json` มี script `build` (ใช้ `--include=dev`) และ `start`
- [ ] ทดสอบด้วย `NODE_ENV=production` + `PORT=10000` ผ่านครบ 4 จุด
- [ ] bundle ไม่มี `localhost:3001`
- [ ] README มีหัวข้อ "วิธีรัน production"
- [ ] screenshot 2 ภาพใน `evidence/images/`

### 💬 คำถามที่ต้องตอบได้

> ทำไมตอนทดสอบในเครื่องด้วยพอร์ต 3001 แอปดูเหมือนทำงานได้ แต่ถ้าขึ้น cloud โดยไม่มี `.env.production` ข้อมูลจะไม่ขึ้น

---

# ⭐ Challenge — deploy จริงขึ้น Render

**ไม่บังคับ · สำหรับคนที่อยากเห็นระบบตัวเองออนไลน์จริง**

> 📘 คู่มือฉบับเต็มพร้อมภาพประกอบ — https://se-rmutl.github.io/engse203/week11/deploy-guide.html

## ต้องมีก่อนเริ่ม

- [ ] CP43 ผ่านครบ (ทดสอบ `NODE_ENV=production PORT=10000` แล้ว)
- [ ] push ขึ้น GitHub แล้ว (branch `unit4/week-11`)
- [ ] ไม่ต้องใช้บัตรเครดิต · ไม่ต้อง set server เอง — Render จัดการ Linux ให้

## ขั้นที่ 1 — สมัคร Render

1. เปิด **https://render.com** → **Get Started**
2. เลือก **GitHub** เพื่อเข้าสู่ระบบด้วยบัญชี GitHub เดิม
3. อนุญาตให้ Render อ่าน repository ของคุณ (เลือกเฉพาะ Student Repository ได้)

## ขั้นที่ 2 — สร้าง Web Service

1. บน Dashboard กด **New** → **Web Service**
2. เลือก Student Repository ของคุณ → **Connect**
3. กรอกตามตารางนี้ **ให้ตรงทุกช่อง**

| ช่อง | ค่า | ทำไม |
|---|---|---|
| Name | `campus-service-<รหัสนักศึกษา>` | ใช้เป็นส่วนหนึ่งของ URL |
| Region | **Singapore** | ใกล้ไทยที่สุด |
| Branch | `unit4/week-11` | branch ที่มีงานสัปดาห์นี้ |
| **Root Directory** | `labs/week-11/source` | ⚠ โปรเจกต์ไม่ได้อยู่ที่ root ของ repo |
| Runtime / Language | **Node** | |
| Build Command | `npm install && npm run build` | ใช้ script จาก CP43 |
| Start Command | `npm start` | ใช้ script จาก CP43 |
| Instance Type | **Free** | |

4. ส่วน **Environment Variables** เพิ่ม 2 ตัว

| Key | Value | ทำไม |
|---|---|---|
| `NODE_ENV` | `production` | เปิดโหมด production (เสิร์ฟหน้าเว็บ · log combined) |
| `NODE_VERSION` | `22` | `node:sqlite` ต้องใช้ Node 22.13 ขึ้นไป |

> ⚠ **ไม่ต้องเพิ่ม `PORT`** — Render กำหนดให้เอง และ `config.js` อ่านจาก `process.env.PORT` อยู่แล้ว

5. เปิด **Advanced** → **Health Check Path** ใส่ `/api/health`
6. กด **Deploy Web Service**

## ขั้นที่ 3 — ดู log ระหว่าง deploy (2–5 นาที)

| สิ่งที่เห็นใน log | แปลว่า |
|---|---|
| `Using Node.js version 22.x` | NODE_VERSION ทำงาน |
| `npm run build` → `✓ built in ...` | build frontend ผ่าน |
| `Campus Service API พร้อมที่ ...:10000` | server start แล้ว |
| **Your service is live 🎉** | health check ผ่าน · เปิดให้ใช้งาน |

## ขั้นที่ 4 — ตรวจว่าใช้ได้จริง

| เปิด | ต้องได้ |
|---|---|
| `https://<name>.onrender.com/` | หน้าเว็บ React |
| `https://<name>.onrender.com/api/health` | `"env": "production"` |
| เพิ่มคำร้องจากหน้าเว็บ | บันทึกได้ |
| **ส่ง URL ให้เพื่อนเปิดจากมือถือ** | เปิดได้ 🎉 |

## ⚠ 2 เรื่องที่ไม่ใช่บั๊ก

**① เปิดครั้งแรกช้า 30–60 วินาที** — free tier "หลับ" หลังไม่มีคนเข้า 15 นาที · พอมีคนเปิดจะ "ตื่น" ใช้เวลาสักครู่

**② ข้อมูลที่เพิ่มจะกลับเป็นค่าตั้งต้นเมื่อ restart/redeploy** — free tier ใช้ ephemeral filesystem · `campus.db` จะกลับเป็นไฟล์ที่ commit ไว้

> **ข้อ ② คือบทเรียนจริง** — เพราะแบบนี้ระบบใหญ่จึงใช้ฐานข้อมูลแยกเครื่อง (PostgreSQL/MongoDB cloud) ไม่เก็บข้อมูลเป็นไฟล์ข้าง API · โยงกับบทที่ 7–8

## ตารางแก้ปัญหา

| อาการใน log / หน้าเว็บ | สาเหตุ | แก้ |
|---|---|---|
| `Could not read package.json` / `ENOENT` | Root Directory ผิด | ตั้งเป็น `labs/week-11/source` |
| `vite: not found` | ไม่มี `--include=dev` | แก้ script build (CP43 ①) |
| `No such built-in module: node:sqlite` | Node เก่ากว่า 22.13 | เพิ่ม `NODE_VERSION=22` |
| deploy ค้าง แล้วขึ้น health check failed | `/api/health` ตอบ 503 หรือ path ผิด | ดู log ว่า DB เปิดได้ไหม · ตรวจ Health Check Path |
| เปิด URL แล้วเห็น JSON | route `/` ชิงหน้าแรก | CP39 ③ |
| หน้าเว็บขึ้นแต่ไม่มีข้อมูล · Network ยิงไป `localhost:3001` | ไม่มี `frontend/.env.production` | CP39 ② |
| แก้โค้ดแล้วเว็บไม่เปลี่ยน | ยังไม่ได้ push | push แล้วรอ auto-deploy |

## บันทึกใน README และ DEMO.md

```markdown
## Live Demo
🔗 https://campus-service-xxxx.onrender.com

หมายเหตุ: Render free tier — เปิดครั้งแรกช้า 30–60 วินาที
ข้อมูลที่เพิ่มจะกลับเป็นค่าตั้งต้นเมื่อ restart (ephemeral filesystem)
```

---

# ⭐⭐ Challenge — ข้อมูลถาวรด้วย Turso

**ไม่บังคับ · ทำต่อจาก Challenge Render · สำหรับคนที่อยากให้ข้อมูลไม่หายเมื่อ Render restart**

> 📘 ภาพประกอบและคำอธิบายเต็ม — คู่มือ Deploy ส่วนที่ 11

## ทำไมต้องทำ

บน Render free tier ไฟล์ `campus.db` จะกลับเป็นเวอร์ชันใน git ทุกครั้งที่ restart · ทางแก้ของระบบจริงคือ**ย้ายฐานข้อมูลไปไว้คนละเครื่องกับ API**

**Turso** คือบริการฐานข้อมูลที่ใช้ SQLite (ภาษา SQL เดียวกับที่เรียนสัปดาห์ 9) · มี free tier ถาวร ไม่ต้องใช้บัตรเครดิต

| | ก่อน (SQLite ไฟล์) | หลัง (Turso) |
|---|---|---|
| ฐานข้อมูลอยู่ที่ | ไฟล์ในเครื่องเดียวกับ API | server ของ Turso บนอินเทอร์เน็ต |
| Render restart | ข้อมูลที่เพิ่ม**หาย** | ข้อมูล**อยู่ครบ** |
| SQL · schema.sql · query | — | **ใช้ของเดิมได้ทั้งหมด** |
| ต้องแก้โค้ด | — | service ไฟล์เดียว (ชั้นเดียว) |

## ขั้นที่ 1 — สร้างฐานข้อมูลบน Turso

1. เปิด **https://turso.tech** → **Sign Up** → เลือกเข้าสู่ระบบด้วย **GitHub**
2. ในหน้า Dashboard สร้างฐานข้อมูลใหม่ (Create Database)
   - Name: `campus-<รหัสนักศึกษา>`
   - Location: เลือกที่**ใกล้ Singapore ที่สุด**ที่มีให้เลือก (Render ของเราอยู่ Singapore)
3. เข้าไปที่ฐานข้อมูลนั้น แล้วคัดลอก 2 ค่า

| ค่า | หน้าตา | เก็บไว้ใน |
|---|---|---|
| **Database URL** | `libsql://campus-xxxx.turso.io` | `TURSO_DATABASE_URL` |
| **Auth Token** (สร้างใหม่ · สิทธิ์ read & write) | ข้อความยาว ๆ ขึ้นต้น `eyJ...` | `TURSO_AUTH_TOKEN` |

> ⚠ **token = รหัสผ่านของฐานข้อมูล** — ห้ามใส่ในโค้ด ห้าม commit ห้ามแปะในแชท · ถ้าเผลอหลุด ให้ลบ token เดิมใน Dashboard แล้วสร้างใหม่
> ชื่อเมนูบนหน้าเว็บ Turso อาจเปลี่ยนได้ — หา "Create Token" หรือ "Generate Token" ในหน้าฐานข้อมูล

**ไม่ต้องสร้างตารางเอง** — ตอนเปิดแอปครั้งแรก `loadSeed()` จะเห็นว่ายังไม่มีตาราง แล้วรัน `schema.sql` ให้ (ได้ข้อมูลตั้งต้น 5 รายการ)

## ขั้นที่ 2 — ติดตั้ง libsql

```bash
cd labs/week-11/source
npm install libsql --prefix api
```

`libsql` คือไลบรารีของ Turso ที่มี `prepare().all()` · `.get()` · `.run()` หน้าตา**เหมือน `node:sqlite`** — query ทุกตัวใน service ใช้ต่อได้ทันที

> ⚠ ต้องเป็น `dependencies` (ไม่ใช่ devDependencies) — ไม่งั้นบน Render จะหาไม่เจอ · คำสั่งข้างบนใส่ให้ถูกที่แล้ว

## ขั้นที่ 3 — ให้ service เลือกฐานข้อมูลตาม env

แก้ `api/src/services/requestService.js` **ไฟล์เดียว** — แนวคิดเดียวกับ config ในบทที่ 3: *ค่าจาก env เป็นตัวตัดสิน*

```js
let db;
let driver = 'sqlite';

// ไม่มี TURSO_DATABASE_URL → ไฟล์ campus.db ในเครื่อง (เหมือนเดิม)
// มี TURSO_DATABASE_URL    → ต่อ Turso ผ่านเน็ต
async function openDatabase() {
  const url = process.env.TURSO_DATABASE_URL;
  if (url) {
    const { default: Database } = await import('libsql');   // โหลดเฉพาะตอนใช้ Turso
    driver = 'turso';
    return new Database(url, { authToken: process.env.TURSO_AUTH_TOKEN });
  }
  driver = 'sqlite';
  return new DatabaseSync(DB_FILE);
}

export async function loadSeed() {
  db = await openDatabase();          // ← เดิม: db = new DatabaseSync(DB_FILE);
  // ... ส่วนที่เหลือเหมือนเดิมทุกบรรทัด
}
```

และใน `getDbStatus()` เปลี่ยน `driver: 'sqlite'` เป็น `driver` — health check จะบอกได้ว่าตอนนี้ใช้ฐานข้อมูลไหน

### 💬 สังเกต

- controller · route · frontend **ไม่แตะเลย** — เปลี่ยนแหล่งข้อมูลครั้งที่ 5 ก็ยังแก้ชั้นเดียว
- ทำได้เพราะ `libsql` เป็นแบบ **sync** เหมือน `node:sqlite` · ต่างจาก MongoDB (บทที่ 8) ที่เป็น async จึงกระทบ controller ด้วย

## ขั้นที่ 4 — ทดสอบในเครื่อง

ใส่ค่าจริงใน `api/.env` (ไฟล์นี้อยู่ใน .gitignore อยู่แล้ว)

```bash
TURSO_DATABASE_URL=libsql://campus-xxxx.turso.io
TURSO_AUTH_TOKEN=eyJ...
```

```bash
cd api && npm run dev
curl http://localhost:3001/api/health     # "driver":"turso" · "connected":true
```

เพิ่มคำร้อง 1 รายการจากหน้าเว็บ → หยุดแล้วเปิด `npm run dev` ใหม่ ข้อมูลต้องยังอยู่ · ถ้าหน้า Dashboard ของ Turso มีเมนูดูข้อมูลหรือ SQL shell ลองเปิดดูตาราง `requests` จะเห็นข้อมูลอยู่บน server

> 💡 **checker ใช้ฐานข้อมูลในเครื่องเสมอ** (ไม่อ่านค่า Turso) — รัน checker ได้ตามปกติ ไม่มีข้อมูลทดสอบไปปนใน Turso

## ขั้นที่ 5 — ตั้งค่าบน Render

1. เข้า service บน Render → **Environment**
2. เพิ่ม 2 ตัวแปร `TURSO_DATABASE_URL` และ `TURSO_AUTH_TOKEN` (ค่าเดียวกับขั้นที่ 4)
3. **Save Changes** → Render จะ deploy ใหม่ให้
4. `git push` โค้ดที่แก้ในขั้นที่ 2–3 (ถ้ายังไม่ได้ push)

## ขั้นที่ 6 — พิสูจน์ว่าข้อมูลถาวร

| ทำ | ต้องเห็น |
|---|---|
| เปิด `URL/api/health` | `"driver":"turso"` |
| เพิ่มคำร้องจากมือถือ | บันทึกได้ |
| Render → **Manual Deploy** → Deploy latest commit | รอ live อีกครั้ง |
| เปิดหน้าเว็บอีกครั้ง | **คำร้องที่เพิ่มยังอยู่** ✅ (ก่อนทำ Challenge นี้ จะหาย) |

บันทึกการพิสูจน์นี้ในวิดีโอช่วง A หรือ screenshot `evidence/images/turso-persist.png`

## ตารางแก้ปัญหา

| อาการ (ดูใน log) | สาเหตุ | แก้ |
|---|---|---|
| `401 Unauthorized` · `The JWT is invalid` | token ผิด หรือถูกลบไปแล้ว | สร้าง token ใหม่ แล้วแก้ค่าใน .env / Render |
| `401` · `Auth string does not conform` | ไม่ได้ตั้ง `TURSO_AUTH_TOKEN` | เพิ่มตัวแปรให้ครบ 2 ตัว |
| `Cannot find package 'libsql'` | ไม่ได้ติดตั้ง หรืออยู่ใน devDependencies | `npm install libsql --prefix api` แล้ว push `api/package.json` |
| server ไม่ขึ้น · deploy ค้างที่ health check | URL พิมพ์ผิด · ต่อ Turso ไม่ได้ | คัดลอก URL จาก Dashboard ใหม่ · ดู log ขั้น Start |
| `"driver":"sqlite"` ทั้งที่ตั้งค่าแล้ว | ตัวแปรยังว่าง หรือ Render ยังไม่ deploy ใหม่ | ตรวจค่าใน Environment · Manual Deploy |
| หน้าเว็บช้ากว่าเดิม | ทุก query วิ่งผ่านเน็ต | เลือก Location ของ Turso ให้ใกล้ Singapore · เป็นเรื่องปกติของฐานข้อมูลแยกเครื่อง |
| ข้อมูลในเครื่องกับบน Render ไม่ตรงกัน | เครื่องเราใช้ campus.db · Render ใช้ Turso | ปกติ — เป็นคนละฐานข้อมูล (ถ้าใส่ค่า Turso ใน .env ด้วย ก็จะเห็นชุดเดียวกัน) |

> **อยากกลับไปใช้ไฟล์ในเครื่อง** — ลบ 2 ตัวแปรออก (หรือเว้นว่าง) แอปจะกลับไปใช้ `campus.db` ทันที ไม่ต้องแก้โค้ด

---

# ⭐ Challenge อื่น ๆ

## CI — รัน checker อัตโนมัติ

```yaml
# .github/workflows/week11-check.yml  (วางที่ root ของ Student Repository)
name: Week 11 Check
on: [push]
jobs:
  check:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: labs/week-11/source
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm install && npm run build
      - run: npm run check
```

## ลองต่อ MongoDB Atlas

ตามบทอ่านเพิ่มเติม (บทที่ 8) — สำหรับคนที่อยากลองของจริง ไม่บังคับ

---

# การส่งงาน A4

## ตรวจให้ครบก่อนส่ง

```bash
cd labs/week-11/source
node --disable-warning=ExperimentalWarning check-week11.mjs   # เป้าหมาย 37/41
node --disable-warning=ExperimentalWarning check-week10.mjs   # ต้องยัง 31/31
node --disable-warning=ExperimentalWarning check-week07.mjs   # ต้องยัง 36/36
```

**เป้าหมาย 37/41** — ผ่านทุกข้อในห้องและที่บ้าน (41/41 ถ้าทำ Challenge ครบ)

> ⚠ ข้อ CP39 ที่ตรวจ bundle ต้อง `npm run build` ก่อนรัน checker

## ส่งอย่างไร — โปรเจกต์มีทั้ง frontend และ backend

ระบบเรามี 2 ส่วน (`frontend/` + `api/`) อยู่ใน **โฟลเดอร์เดียวกัน** `labs/week-11/source/` — ส่งทั้งหมดครั้งเดียว

### ① ส่ง source code

```bash
git switch -c unit4/week-11
git add -A                    # เก็บทั้ง frontend/ และ api/
git status                    # ตรวจ: ต้องไม่เห็น node_modules, .env, .env.local, dist
git commit -m "LAB11 (A4): ระบบ full-stack พร้อมใช้จริง"
git push -u origin unit4/week-11
git tag lab-11-submission-v1 && git push origin lab-11-submission-v1
```

**ต้อง commit อะไรบ้าง**

| commit | ไม่ commit (อยู่ใน .gitignore) |
|---|---|
| `frontend/src/` · `api/src/` · `api/data/campus.db` | `node_modules/` |
| `frontend/.env.production` · `.env.example` ทั้งสองฝั่ง | `.env` · `.env.local` (ค่าลับ) |
| root `package.json` · `README.md` · `DATABASE_CHOICES.md` · `DEMO.md` | `frontend/dist/` (build ใหม่ได้) |

### ② ส่งวิดีโอนำเสนอ

ใส่ลิงก์วิดีโอ (ช่วง A + ช่วง B) ไว้ใน `DEMO.md` ที่ push ขึ้นไป

### ③ เกณฑ์การให้คะแนน A4

| ส่วน | สัดส่วน |
|---|---|
| ระบบทำงานครบวงจร (checker + สาธิต ช่วง A) | 40% |
| **อธิบาย source ได้ (วิดีโอ ช่วง B)** | 30% |
| README + คำตอบบทอ่าน | 20% |
| production-ready (CP43 จำลอง production ผ่านครบ) | 10% |
| ⭐ deploy จริงบน Render | +โบนัส |
| ⭐⭐ ข้อมูลถาวรด้วย Turso (พิสูจน์ด้วย Manual Deploy) | +โบนัสเพิ่ม |

> **ช่วง B สำคัญ** — ผู้สอนดูว่าอธิบายการไหลของข้อมูลได้ไหม · ทำระบบได้แต่อธิบายไม่ได้ = ยังไม่เข้าใจจริง

## ใช้ AI ได้ แต่ต้องเป็นเจ้าของงาน

กรอก `AI_USAGE.md` ว่าถามอะไร ใช้คำตอบส่วนไหน แก้เองตรงไหน (รูปแบบเดียวกับสัปดาห์ 7)

---

## ปิดหน่วยที่ 4 แล้ว 🎉

| สัปดาห์ | ทำอะไร | โฟลเดอร์ใน Student Repository |
|---|---|---|
| 9 | เรียน SQL · ออกแบบและสร้างฐานข้อมูล | `labs/week-09/source/` |
| 10 | เชื่อม Node เข้ากับฐานข้อมูล | `labs/week-10/source/` |
| **11** | **ประกอบเป็นระบบจริงที่พร้อม deploy** | `labs/week-11/source/` |

**บทเรียนใหญ่** — แยกชั้นดี เปลี่ยนแหล่งข้อมูลได้โดยกระทบชั้นเดียว (4 ครั้ง) · และ "ทำงานได้บนเครื่องเรา" ต่างจาก "พร้อมใช้จริง"

**ต่อไป** — หน่วยที่ 5 · คุณภาพและความปลอดภัยของซอฟต์แวร์ · ระบบที่ประกอบเสร็จนี้จะเป็นฐานเรียนต่อ
