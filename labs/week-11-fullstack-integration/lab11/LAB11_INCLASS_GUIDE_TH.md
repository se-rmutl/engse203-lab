# ENGSE203 LAB 11 — คู่มือ In-Class

**🏫 ทำในห้อง · CP35 → CP39 · บูรณาการเป็นระบบจริงที่ deploy ได้**
**หน่วยที่ 4 · สัปดาห์ที่ 11 · ปิดหน่วย · ปฏิบัติ 3 ชั่วโมง**

---

## 🖥️ หน้าจอ Live-Coding (ฉายประกอบการสอน)

ระหว่างสอนแต่ละ CP เปิดหน้าจอ live-coding คู่กันได้ — มีโค้ดทีละขั้น กล่องเตือนกับดัก และเช็คลิสต์

| Checkpoint | เนื้อหา | เปิด |
|---|---|---|
| CP35 | รันระบบ full-stack 3 ชั้น | [เปิด](https://se-rmutl.github.io/engse203/week11/guides/ENGSE203_Week11_CP35_LiveCoding.html) |
| CP36 | env config | [เปิด](https://se-rmutl.github.io/engse203/week11/guides/ENGSE203_Week11_CP36_LiveCoding.html) |
| CP37 | health check | [เปิด](https://se-rmutl.github.io/engse203/week11/guides/ENGSE203_Week11_CP37_LiveCoding.html) |
| CP38 | error + logging | [เปิด](https://se-rmutl.github.io/engse203/week11/guides/ENGSE203_Week11_CP38_LiveCoding.html) |
| CP39 | production build | [เปิด](https://se-rmutl.github.io/engse203/week11/guides/ENGSE203_Week11_CP39_LiveCoding.html) |

> ไฟล์ต้นฉบับอยู่ใน  ของ LAB นี้ · เปิดออฟไลน์ได้

---

## อ่านก่อนเริ่ม

สัปดาห์นี้คือ**คาบปิดหน่วยที่ 4** — ไม่มีเรื่องใหม่ใหญ่ ๆ แต่เอาระบบ 3 ชั้นจากสัปดาห์ที่ 10 มา**ขัดให้สมบูรณ์จนพร้อมส่งมอบจริง**

> **ประโยคแกนกลางของวันนี้**
> **"รันได้บนเครื่องเรา" กับ "พร้อมใช้จริง" ต่างกันตรงไหน**

### สิ่งที่ต้องมีติดตัวมา

| ไฟล์ | จากไหน | ถ้าไม่มี |
|---|---|---|
| โปรเจกต์ full-stack (SQLite) | สัปดาห์ที่ 10 | ขอ snapshot จากผู้สอน |
| `campus.db` + `schema.sql` | สัปดาห์ที่ 9–10 | `npm run db:setup` |

### เป้าหมายตอนจบคาบ

**ระบบ full-stack ที่ config ถูกต้อง มี health check มี error ครบ และ build ได้ — พร้อม deploy**

| ตรวจ | ต้องได้ |
|---|---|
| `node check-week11.mjs --inclass` | **15/15** |
| `node check-week10.mjs` | **31/31 — ไม่ regression** |
| `node check-week07.mjs` | **36/36** |

---

## แผนที่ของวันนี้

| CP | ทำอะไร | เวลา |
|---|---|---|
| **CP35** | รันระบบ full-stack ครบ 3 ชั้น | 40 นาที |
| **CP36** | จัดการ config ด้วย environment variable | 45 นาที |
| **CP37** | เพิ่ม health check endpoint | 40 นาที |
| **CP38** | ขัด error handling + logging | 35 นาที |
| **CP39** | production build | 45 นาที |

---

# CP35 · รันระบบ full-stack ครบ 3 ชั้น

**🏫 40 นาที · We do**

## เป้าหมาย

เปิดทั้ง 3 ส่วนให้ทำงานพร้อมกัน ก่อนขัดให้สมบูรณ์

## ① เตรียมฐานข้อมูล

```bash
cd api
npm install
cp .env.example .env
npm run db:setup      # สร้าง campus.db จาก schema.sql
```

## ② เปิดจากล่างขึ้นบน — 2 terminal

```bash
# terminal 1 — API
cd api && npm run dev          # http://localhost:3001

# terminal 2 — frontend
cd frontend && npm install && npm run dev   # http://localhost:5173
```

### ทำไมเปิดล่างขึ้นบน

**ฐานข้อมูล = คลังวัตถุดิบ · API = ครัว · frontend = หน้าร้าน** — ต้องมีวัตถุดิบก่อน ครัวถึงทำได้ หน้าร้านถึงเปิดได้

### ทำไม dev ต้อง 2 terminal

API กับ frontend เป็นคนละ process · Vite มี hot reload (แก้โค้ดเห็นผลทันที) จึงแยกจาก API

## ③ ตรวจครบวงจร

| ตรวจ | ทำอย่างไร | ต้องเห็น |
|---|---|---|
| ฐานข้อมูล | มี `campus.db` | ไฟล์อยู่จริง |
| API | `curl localhost:3001/api/requests` | JSON 5 รายการ |
| frontend | เปิด `localhost:5173` | Dashboard แสดงข้อมูล |
| ครบวงจร | เพิ่มคำร้องจากหน้าเว็บ | บันทึกและแสดงจริง |

### ✓ ผ่าน CP35 เมื่อ

- [ ] เปิดทั้ง 3 ส่วนพร้อมกัน
- [ ] เพิ่ม/ดู/ลบ/เปลี่ยนสถานะได้ครบวงจร
- [ ] ปิดเซิร์ฟเวอร์แล้วเปิดใหม่ ข้อมูลยังอยู่

### 💬 คำถามที่ต้องตอบได้

> ระบบนี้รันดีบนเครื่องเรา — ถ้าเอาไปรันบนเครื่องคนอื่นจะเจอปัญหาอะไรบ้าง

---

# CP36 · จัดการ config ด้วย environment variable

**🏫 45 นาที · We do**

## ปัญหา

ค่า config (port, cors, db path) กระจายอยู่ทั่วโค้ด — หายาก แก้ยาก · และถ้า hardcode พอร์ตจะ deploy ไม่ได้

> **ทำไม hardcode ไม่ได้** — cloud ส่วนใหญ่กำหนดพอร์ตให้ผ่าน `process.env.PORT` · ถ้า hardcode `3001` ระบบจะฟังผิดพอร์ต → deploy ไม่สำเร็จ

## แก้ — รวม config ไว้ไฟล์เดียว

```js
// src/config.js — อ่าน env ที่เดียว ที่อื่น import จากนี่
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, '..');

export const config = {
  env:        process.env.NODE_ENV ?? 'development',
  isProd:     process.env.NODE_ENV === 'production',
  port:       Number(process.env.PORT ?? 3001),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  dbFile:     process.env.DB_FILE ?? path.join(API_ROOT, 'data', 'campus.db'),
  schemaFile: path.join(API_ROOT, 'data', 'schema.sql'),
  staticDir:  process.env.STATIC_DIR ?? path.join(API_ROOT, '..', 'frontend', 'dist'),
};
```

### แล้วให้ที่อื่น import จาก config

```js
// app.js — ไม่อ่าน process.env ตรง ๆ แล้ว
import { config } from './config.js';
app.use(cors({ origin: config.corsOrigin }));

// server.js
app.listen(config.port, () => { ... });
```

### ✓ ผ่าน CP36 เมื่อ

- [ ] มี `config.js` รวม env ทั้งหมด
- [ ] `app.js` และ `server.js` ใช้ `config.` ไม่มี hardcode
- [ ] มี `isProd` แยก dev/production
- [ ] `.env` อยู่ใน `.gitignore` · มี `.env.example`

### ⚠ ห้าม commit .env

`.env` มักมีค่าลับ — ต้องอยู่ใน `.gitignore` · ใช้ `.env.example` ที่มีแต่ชื่อตัวแปร

### 💬 คำถามที่ต้องตอบได้

> ทำไมต้องมี `??` ค่า default ทุกตัวใน config

---

# CP37 · health check endpoint

**🏫 40 นาที · We do → You do**

## เป้าหมาย

`GET /api/health` ที่บอกว่าระบบพร้อมไหม — โดยเช็คถึงฐานข้อมูล

> **ทำไมต้องมี** — cloud เรียก health check อัตโนมัติเพื่อเช็คว่า deploy สำเร็จ · ถ้าตอบ 200 = พร้อม ถ้าไม่ = ยังไม่ส่งผู้ใช้เข้ามา

## ① เพิ่ม getDbStatus() ใน service

```js
/** สถานะฐานข้อมูล — ใช้โดย health check */
export function getDbStatus() {
  try {
    if (!db) return { connected: false, reason: 'ยังไม่ได้เปิดฐานข้อมูล' };
    const n = db.prepare("SELECT COUNT(*) c FROM sqlite_master WHERE type='table'").get().c;
    return { connected: true, driver: 'sqlite', tables: n };
  } catch (e) {
    return { connected: false, reason: e.message };
  }
}
```

## ② เขียน healthRoutes.js

```js
import { Router } from 'express';
import { getDbStatus } from '../services/requestService.js';
import { config } from '../config.js';

const router = Router();

router.get('/', (req, res) => {
  const db = getDbStatus();
  const ok = db.connected;
  res.status(ok ? 200 : 503).json({
    status: ok ? 'ok' : 'degraded',
    env: config.env,
    uptime: Math.round(process.uptime()),
    database: db,
    time: new Date().toISOString(),
  });
});

export default router;
```

## ③ ผูกใน app.js

```js
import healthRoutes from './routes/healthRoutes.js';
app.use('/api/health', healthRoutes);
```

### ⚠ ตอบ status code ให้สื่อความหมาย

| สถานการณ์ | HTTP code |
|---|---|
| ทุกอย่างปกติ | **200** |
| ต่อ DB ไม่ได้ | **503** Service Unavailable |

**อย่าตอบ 200 เสมอ** — ถ้าต่อ DB ไม่ได้แต่ตอบ 200 cloud จะส่งผู้ใช้เข้ามาเจอ error

### ✓ ผ่าน CP37 เมื่อ

- [ ] `curl localhost:3001/api/health` ตอบ status ok
- [ ] มี `database.connected: true`
- [ ] ลองเปลี่ยนชื่อ campus.db แล้ว health ตอบ 503

### 💬 คำถามที่ต้องตอบได้

> ทำไม health check ต้องเช็คถึงฐานข้อมูล ไม่ใช่แค่ตอบว่า "API เปิดอยู่"

---

# CP38 · error handling + logging ครบวงจร

**🏫 35 นาที · You do**

## ตรวจว่า error handling ครบ (มีตั้งแต่ Week 06/10)

| มีไหม | ทำอะไร | จาก |
|---|---|---|
| `errorHandler` | จับ error รวมศูนย์ | Week 06 |
| `notFound` | route ไม่มี → 404 | Week 06 |
| validation | ข้อมูลไม่ครบ → 400 | Week 06 |
| constraint → status | DB ปฏิเสธ → 400 | Week 10 |

## logging แยก dev/production

```js
// app.js
app.use(morgan(config.isProd ? 'combined' : 'dev'));
```

| รูปแบบ | ใช้ตอน |
|---|---|
| `dev` | debug เร็ว (มีสี สั้น) |
| `combined` | production (IP เวลา user-agent ครบ) |

### ⚠ production ไม่ส่งรายละเอียด error ให้ผู้ใช้

รายละเอียด error บอกโครงสร้างภายในระบบ — คนไม่หวังดีเอาไปหาช่องโหว่ · **dev แสดงเต็ม · production เก็บใน log**

### ✓ ผ่าน CP38 เมื่อ

- [ ] `curl localhost:3001/api/nope` → 404
- [ ] POST ข้อมูลไม่ครบ → 400
- [ ] logging เปลี่ยนตาม NODE_ENV
- [ ] checker W07 ยัง 36/36 (error handling เดิมไม่พัง)

### 💬 คำถามที่ต้องตอบได้

> ทำไม production ไม่ควรส่ง stack trace กลับไปให้ผู้ใช้

---

# CP39 · production build

**🏫 45 นาที · We do · หัวใจของสัปดาห์นี้**

## ความต่างที่ใหญ่ที่สุด

| development | production |
|---|---|
| 2 server แยก (5173 + 3001) | build static แล้ว API เสิร์ฟพอร์ตเดียว |
| hot reload | ต้อง build ใหม่เมื่อแก้ |

## ① build frontend

```bash
cd frontend && npm run build
# → สร้าง dist/ ที่มี HTML/JS/CSS พร้อมใช้
```

## ② ให้ API เสิร์ฟ static ตอน production

```js
// app.js — เฉพาะ production
import express from 'express';
import path from 'node:path';
import { existsSync } from 'node:fs';

if (config.isProd && existsSync(config.staticDir)) {
  app.use(express.static(config.staticDir));
  // ทุก path ที่ไม่ใช่ /api → คืน index.html (React Router จัดการต่อ)
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(config.staticDir, 'index.html'));
  });
}
```

### ⚠ ทำไมต้อง `/^\/(?!api).*/`

React Router จัดการ path ฝั่ง frontend เอง · ต้องคืน `index.html` ทุก path **ยกเว้น `/api`** ที่เป็นของ API จริง

## ③ รัน production mode

```bash
cd api && NODE_ENV=production npm start
# เปิด http://localhost:3001 ได้ทั้งเว็บและ API
```

### ✓ ผ่าน CP39 เมื่อ

- [ ] `npm run build` สร้าง `frontend/dist/`
- [ ] เปิดพอร์ตเดียว (3001) ได้ทั้งหน้าเว็บและ API
- [ ] `/api/health` บอก `env: production`
- [ ] `node check-week11.mjs --inclass` ผ่าน **15/15**

### ⚠ แก้ frontend ต้อง build ใหม่

production เสิร์ฟจาก `dist/` ที่ build ไว้ — แก้โค้ดแล้วไม่ build ใหม่ ผู้ใช้เห็นของเก่า

### 💬 คำถามที่ต้องตอบได้

> ทำไม production ต้องรวมเป็นพอร์ตเดียว แทนที่จะรัน 2 server เหมือน dev

---

# ตรวจงานตอนจบคาบ

```bash
node --disable-warning=ExperimentalWarning check-week11.mjs --inclass   # 15/15
node --disable-warning=ExperimentalWarning check-week10.mjs             # 31/31
node --disable-warning=ExperimentalWarning check-week07.mjs             # 36/36
```

---

## ตารางไล่ปัญหาที่พบบ่อย

| อาการ | สาเหตุที่พบบ่อย |
|---|---|
| `port: undefined` | config.js ยังไม่มี `port` — ทำ CP36 |
| deploy แล้ว cloud เข้าไม่ถึง | hardcode พอร์ต — ต้องอ่าน `process.env.PORT` |
| health ตอบ 200 ทั้งที่ DB พัง | ลืมเช็ค `db.connected` แล้วตั้ง 503 |
| production เปิด / ได้แต่ API พัง | ลืม `(?!api)` — static route กิน /api ไปด้วย |
| แก้ frontend แล้วไม่เปลี่ยน | ลืม build ใหม่ (production ไม่ hot reload) |
| checker W10 พัง | แก้อะไรกระทบ service core — ตรวจว่าเพิ่มแค่ getDbStatus |

---

## เช็คลิสต์ก่อนออกจากห้อง

- [ ] `check-week11.mjs --inclass` ผ่าน **15/15**
- [ ] `check-week10.mjs` และ `check-week07.mjs` ยังผ่าน
- [ ] health check ตอบ status ok + database connected
- [ ] production build เปิดพอร์ตเดียวได้ทั้งเว็บและ API
- [ ] commit: `git add -A && git commit -m "LAB11 in-class: ระบบพร้อมใช้จริง"`
- [ ] รู้ว่าต้องทำอะไรต่อ (งาน A4 · เปิดคู่มือ Take-Home)

---

## 5 คำถามที่ต้องตอบได้ทั้งหมด

1. ถ้าเอาระบบไปรันบนเครื่องคนอื่นจะเจอปัญหาอะไร
2. ทำไมต้องมี `??` ค่า default ทุกตัวใน config
3. ทำไม health check ต้องเช็คถึงฐานข้อมูล
4. ทำไม production ไม่ควรส่ง stack trace ให้ผู้ใช้
5. ทำไม production ต้องรวมเป็นพอร์ตเดียว

---

## ภาคผนวก · ศัพท์ของสัปดาห์นี้

| คำ | หมายถึง |
|---|---|
| Environment Variable | ค่าที่กำหนดจากภายนอกโค้ด เก็บใน `process.env` |
| Health Check | endpoint บอกสถานะระบบ |
| Build | แปลงโค้ดเป็นไฟล์ static พร้อมใช้ |
| Deploy | เอาระบบขึ้นเครื่องที่เข้าถึงจากเน็ตได้ |
| `NODE_ENV` | ตัวแยก development/production |
