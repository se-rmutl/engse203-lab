# บทบาทในทีม — รายการงานและสิ่งที่ต้องอธิบายได้

ทุกบทบาทมี 3 ส่วน: **ต้องทำ** (ตรวจจาก repo) · **หลักฐาน** (ที่ผู้สอนจะเปิดดู) · **ต้องอธิบายได้** (ถามในการสัมภาษณ์)

---

## จุดเชื่อมระหว่างบทบาท — `API_CONTRACT.md`

Front-end กับ Back-end ทำงานพร้อมกันได้เพราะ**ตกลงหน้าตา API กันก่อน** (เหมือน Week 07)

- [ ] ภายใน **M1** — ทั้งคู่เขียน `API_CONTRACT.md` ร่วมกัน: ทุก endpoint · ตัวอย่าง request / response · ข้อความ error · status code
- [ ] Front-end เริ่มทำหน้าจอด้วยข้อมูลตัวอย่างตาม contract ได้เลย ไม่ต้องรอ API เสร็จ
- [ ] จะเปลี่ยน contract → เปิด PR แก้ `API_CONTRACT.md` ให้อีกฝ่าย review ก่อน

---

## 🎨 Front-end

### ต้องทำ

| # | งาน | ไฟล์ที่เกี่ยวข้อง (ตัวอย่าง) |
|---|---|---|
| F1 | หน้ารายการ + ตัวกรองสถานะ · การ์ดแสดงข้อมูลที่ JOIN แล้ว | `pages/…ListPage.jsx` · `components/…Card.jsx` |
| F2 | หน้ารายละเอียด · 404 เมื่อไม่พบ | `pages/…DetailPage.jsx` |
| F3 | หน้าส่งคำขอ — ตรวจฝั่ง client ตามกฎเดียวกับ API · แสดง error ที่ API ส่งกลับ · ตัวเลือกจากตารางที่เกี่ยวข้องดึงจาก API | `pages/New…Page.jsx` · `utils/validate….js` |
| F4 | หน้าสรุป (dashboard) — จำนวนแยกตามสถานะ | `utils/…Summary.js` |
| F5 | **หน้า login** · เก็บ token · ปุ่ม logout · แสดงชื่อเจ้าหน้าที่ที่ login อยู่ | `pages/LoginPage.jsx` · `services/authStore.js` |
| F6 | `apiClient` แนบ `Authorization: Bearer <token>` **ที่เดียว** · ได้ 401 → ล้าง token → ไปหน้า login | `services/apiClient.js` |
| F7 | ปุ่มเปลี่ยนสถานะและปุ่มลบ **แสดงเฉพาะเจ้าหน้าที่** | `hooks/useAuth.js` |
| F8 | loading · error · ข้อมูลว่าง · ใช้บนมือถือได้ | `components/…State.jsx` · CSS |
| F9 | test ฝั่ง frontend ≥ 3 ข้อ (pure function) | `utils/*.test.js` |

### หลักฐาน

- PR ของตัวเอง ≥ 2 · commit ใน `frontend/` ≥ 10 · review PR ของเพื่อน ≥ 1
- ภาพหน้าจอ desktop + มือถือใน README

### ต้องอธิบายได้

- token เก็บไว้ที่ไหน · ทำไมเลือกที่นั้น · ข้อเสียคืออะไร (เทียบ memory / localStorage / httpOnly cookie)
- ซ่อนปุ่มลบในหน้าเว็บแล้ว ทำไมยังปลอดภัยไม่พอ
- ถ้า token หมดอายุระหว่างใช้งาน ผู้ใช้จะเห็นอะไร และโค้ดตรงไหนจัดการ
- ทำไมตรวจฟอร์มฝั่ง client แล้ว API ยังต้องตรวจซ้ำ
- เปิด Network ใน DevTools แล้วชี้ header `Authorization` ของคำขอ PUT ได้

---

## ⚙️ Back-end

(แบบคู่ — คนนี้ทำส่วน DevOps ด้านล่างด้วย)

### ต้องทำ

| # | งาน | ไฟล์ที่เกี่ยวข้อง (ตัวอย่าง) |
|---|---|---|
| B1 | ออกแบบตาราง 2 ตารางขึ้นไป + FOREIGN KEY + seed ≥ 5 รายการทุกสถานะ · ลบตาราง `requests` เดิม | `api/data/schema.sql` |
| B2 | service ของหัวข้อ — SELECT แบบ JOIN · parameterized query ทุกคำสั่ง | `api/src/services/….js` |
| B3 | route + controller ครบตาราง R2 ใน README · `?status=` | `api/src/routes/` · `controllers/` |
| B4 | validator pure function — บังคับ · enum · min/max · **กฎเฉพาะของหัวข้อ** | `api/src/validators/….js` |
| B5 | auth จาก LAB 13 ใช้กับ resource ใหม่ · มี `upsertStaff` ให้ D3 เรียกตอน start (บัญชี production ตั้งจาก env ไม่ใช้ `create-staff` เพราะ Render free tier ไม่มี Shell) | `middleware/auth.js` · `services/…` |
| B6 | unit test ≥ 10 · integration test ≥ 12 (รวม 401 · 403 · เจ้าหน้าที่) | `api/tests/` |
| B7 | `DEBUG_LOG.md` ≥ 2 bug จริงที่เจอระหว่างทำ + regression test | `DEBUG_LOG.md` |
| B8 | `API_CONTRACT.md` ตรงกับโค้ดจริง | `API_CONTRACT.md` |

### หลักฐาน

- PR ≥ 2 · commit ใน `api/` ≥ 10 · review ≥ 1
- `npm run coverage --prefix api` ใน README

### ต้องอธิบายได้

- ทำไมแยก validator เป็น pure function · test ค่าขอบของกฎเฉพาะทดสอบค่าอะไรบ้าง
- query ไหนใช้ JOIN · ถ้าไม่ใช้ parameterized query จะเกิดอะไร
- 401 กับ 403 ต่างกันอย่างไร · ชี้บรรทัดที่ตัดสินแต่ละกรณี
- payload ของ token มีอะไร · ทำไมไม่ใส่รหัสผ่าน · แก้ payload แล้ว server รู้ได้อย่างไร
- เล่า bug ใน `DEBUG_LOG.md` 1 ตัว: เจออย่างไร · ใช้เครื่องมืออะไร · test ไหนกันไม่ให้กลับมา

---

## 🚀 DevOps

(แบบคู่ — คน Back-end ทำส่วนนี้ · แบบ 3 คน — มีคนรับผิดชอบเต็มตัว และต้องทำส่วน "เพิ่มสำหรับกลุ่ม 3 คน" ด้วย)

### ต้องทำ (ทุกทีม)

| # | งาน | ไฟล์ที่เกี่ยวข้อง |
|---|---|---|
| D1 | CI รัน `npm test` ทุก push และ PR · ใช้ `kit/.github/workflows/check.yml` เป็นจุดเริ่ม | `.github/workflows/check.yml` |
| D2 | `render.yaml` ของ repo ทีม — **ลบบรรทัด `rootDir`** (โปรเจกต์อยู่ที่ root แล้ว) · `JWT_SECRET` แบบ `generateValue: true` | `render.yaml` |
| D3 | deploy ขึ้น Render · `/api/health` ผ่านบน URL จริง · ตั้งรหัสเจ้าหน้าที่ production จาก `STAFF_EMAIL` + `STAFF_PASSWORD` (โค้ดด้านล่าง) | `api/src/server.js` · `render.yaml` |
| D4 | `.env.example` ครบ ค่าว่าง · `.gitignore` มี `.env` · ตรวจด้วย `git ls-files \| grep .env` | `api/.env.example` |
| D5 | `README.md` ตามแม่แบบ — วิธีติดตั้ง · รัน · test · deploy · URL · บัญชีทดสอบ | `README.md` |
| D6 | `RELEASE_CHECKLIST.md` ติ๊กครบ · tag `v0.1.0` · `v0.5.0` · **`v1.0.0`** | `RELEASE_CHECKLIST.md` |

**D3 · ตั้งรหัสเจ้าหน้าที่ production จาก env** — Render free tier ไม่มี Shell ให้รัน `create-staff` และไฟล์ SQLite รีเซ็ตทุก redeploy จึงตั้งรหัสตอน start แทน

```js
// api/src/server.js — ต่อจาก await loadSeed();
import { upsertStaff } from './services/requestService.js';   // ย้าย import ไปไว้บนสุดของไฟล์ · ถ้าแยก/เปลี่ยนชื่อ service แล้ว (เช่น userService.js) ให้ import จากไฟล์ที่มี upsertStaff
import { hashPassword } from './utils/password.js';

if (process.env.STAFF_EMAIL && process.env.STAFF_PASSWORD) {
  // อีเมลเดียวกับใน seed → รหัส staff1234 ใช้ไม่ได้อีกบน production
  upsertStaff({ email: process.env.STAFF_EMAIL, name: 'เจ้าหน้าที่', passwordHash: hashPassword(process.env.STAFF_PASSWORD) });
}
```

ตั้ง `STAFF_EMAIL` (อีเมลเดียวกับใน seed) และ `STAFF_PASSWORD` (≥ 12 ตัว) ใน Environment ของ Render · `render.yaml` ใน kit มีให้แล้วแบบ `sync: false` · **รหัสจริงห้ามอยู่ใน git** — แจ้งผู้สอนทางช่องทางที่ประกาศ

> ⚠ Render free tier: ไฟล์ SQLite **กลับเป็นค่าใน git ทุกครั้งที่ restart/redeploy** · ทีมคู่ยอมรับได้ (เขียนไว้ใน README) · ทีม 3 คนต้องใช้ Turso

### เพิ่มสำหรับกลุ่ม 3 คน

| # | งาน | หลักฐาน |
|---|---|---|
| D7 | **Turso** — ข้อมูลไม่หายเมื่อ redeploy (ตามคู่มือ Week 11 ส่วนที่ 11 · ใช้แพ็กเกจ `libsql` ไม่ใช่ `@libsql/client`) | `/api/health` บน URL จริงแสดง `driver: turso` · ภาพก่อน/หลัง redeploy ใน `DEPLOY.md` |
| D8 | CI รันทั้ง test **และ** `npm run build` | `check.yml` |
| D9 | Render **Auto-Deploy: After CI Checks Pass** | ภาพหน้าตั้งค่าใน `DEPLOY.md` |
| D10 | branch protection บน `main` — ต้องผ่าน PR และ CI ก่อน merge | ภาพหน้าตั้งค่าใน `DEPLOY.md` |
| D11 | `DEPLOY.md` — ขั้นตอน deploy ตั้งแต่ศูนย์ · ตัวแปรทั้งหมด · **วิธี rollback ไป tag ก่อนหน้า** (ลองทำจริง 1 ครั้ง) | `DEPLOY.md` |
| D12 | ป้าย CI (badge) ใน README | `README.md` |

### หลักฐาน

- PR ≥ 2 · commit ใน `.github/` · `render.yaml` · เอกสาร ≥ 10 (แบบ 3 คน) · review ≥ 1
- Actions ของ repo มีประวัติการรันทั้งผ่านและไม่ผ่าน (แสดงว่า CI จับปัญหาได้จริง)

### ต้องอธิบายได้

- ถ้าลืมตั้ง `JWT_SECRET` บน Render จะเกิดอะไร · ทำไมแบบนั้นดีกว่า start ด้วยค่า default
- CI ช่วยอะไรที่ `npm test` บนเครื่องตัวเองช่วยไม่ได้
- ทำไมข้อมูล SQLite บน Render free tier หาย · Turso แก้อย่างไร · ทำไมแก้แค่ชั้น service
- เปิด log ของ Render แล้วหา error ล่าสุดได้
- (3 คน) rollback ทำอย่างไร · ใช้เวลากี่นาที · ข้อมูลใน Turso ย้อนตามไหม

---

## ทำงานร่วมกัน (ทุกคน)

```
main ← PR ← feature/<บทบาท>-<เรื่อง>    เช่น feature/fe-login-page · feature/be-loans-api · feature/devops-ci
```

- เปิด Issue ก่อนเริ่มงาน · ผูก PR กับ Issue (`Closes #12`)
- PR ต้องมีคนอื่นในทีม review ก่อน merge (คู่ = อีกคน · 3 คน = อย่างน้อย 1 คน)
- commit message บอกว่าเปลี่ยนอะไร เช่น `feat(api): validate return date ≤ 14 days`
- อัปเดต `TEAM_CONTRACT.md` เมื่อแบ่งงานใหม่
