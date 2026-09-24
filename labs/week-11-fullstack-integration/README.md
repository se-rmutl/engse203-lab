# LAB 11 — บูรณาการเป็นระบบจริงที่ deploy ได้

**สัปดาห์ที่ 11** · หน่วยที่ 4 · **ปิดหน่วย** · CLO3 · CLO4 · CLO5 · งาน A4 Full-Stack Integration

---

## เริ่มตรงไหน

| ลำดับ | ทำเมื่อไร | เปิดไฟล์ |
|---|---|---|
| 1 | ก่อนเข้าคาบ | [เอกสารประกอบการสอน](https://se-rmutl.github.io/engse203/week11/week11-teaching-doc.html) **บทที่ 1–3** |
| 2 | ในคาบ | [`lab11/LAB11_INCLASS_GUIDE_TH.md`](lab11/LAB11_INCLASS_GUIDE_TH.md) |
| 3 | งาน A4 | [`lab11/LAB11_TAKEHOME_GUIDE_TH.md`](lab11/LAB11_TAKEHOME_GUIDE_TH.md) |

## สื่อการสอนออนไลน์

| สื่อ | เปิด |
|---|---|
| สไลด์ Week 11 (41 หน้า · 9 บท) | [เปิดสไลด์](https://se-rmutl.github.io/engse203/week11) |
| เอกสารประกอบการสอน (9 บท) | [เปิดเอกสาร](https://se-rmutl.github.io/engse203/week11/week11-teaching-doc.html) |
| **คู่มือ Deploy ขึ้น Render** (มีภาพประกอบ · ผู้สอนและนักศึกษา) | [เปิดคู่มือ](https://se-rmutl.github.io/engse203/week11/deploy-guide.html) |

### หน้าจอ Live-Coding (ใช้ในคาบ)

| CP | ทำอะไร | เปิด |
|---|---|---|
| CP35 | รันระบบ full-stack 3 ชั้น | [เปิด](https://se-rmutl.github.io/engse203/week11/guides/ENGSE203_Week11_CP35_LiveCoding.html) |
| CP36 | env config | [เปิด](https://se-rmutl.github.io/engse203/week11/guides/ENGSE203_Week11_CP36_LiveCoding.html) |
| CP37 | health check | [เปิด](https://se-rmutl.github.io/engse203/week11/guides/ENGSE203_Week11_CP37_LiveCoding.html) |
| CP38 | error + logging | [เปิด](https://se-rmutl.github.io/engse203/week11/guides/ENGSE203_Week11_CP38_LiveCoding.html) |
| CP39 | production build | [เปิด](https://se-rmutl.github.io/engse203/week11/guides/ENGSE203_Week11_CP39_LiveCoding.html) |

---

## ภาพรวม

ประกอบระบบ 3 ชั้นจากสัปดาห์ที่ 10 ให้เป็น **ระบบจริงที่ deploy ได้** — ไม่ใช่แค่ "รันบนเครื่องเรา"

```
"รันได้บนเครื่องเรา"     →     "พร้อมใช้จริง"
─────────────────           ────────────────
hardcode ค่าได้              config จาก env
เปิดหน้าเว็บเช็คเอง          health check อัตโนมัติ
เห็น error บนจอ              เก็บใน log
2 server แยก                build เสิร์ฟพอร์ตเดียว
```

> **MongoDB / async** อยู่ในบท 8 "อ่านเพิ่มเติม" — รู้จักว่ามี ไม่ต้องลงมือเขียน

### สิ่งที่ต้องมีติดตัวมาจากสัปดาห์ 10

| ไฟล์ | ถ้าไม่มี |
|---|---|
| โปรเจกต์ full-stack (SQLite) | ขอ snapshot จากผู้สอน |
| `campus.db` + `schema.sql` | `npm run db:setup` |

---

## Checkpoint ทั้งหมด

| CP | ทำอะไร | ที่ไหน |
|---|---|---|
| **CP35** | รันระบบ full-stack 3 ชั้น | 🏫 |
| **CP36** | จัดการ config ด้วย env | 🏫 |
| **CP37** | health check endpoint | 🏫 |
| **CP38** | error handling + logging | 🏫 |
| **CP39** | production build | 🏫 |
| **CP40** | README ระบบ full-stack | 🏠 |
| **CP41** | ตอบคำถามจากบทอ่านเพิ่มเติม | 🏠 |
| **CP42** | วิดีโอสาธิตครบวงจร (A4) | 🏠 |
| **CP43** | จำลอง production ในเครื่อง (deploy Render = Challenge) | 🏠 |
| ⭐ | deploy จริงขึ้น Render | 🏠 ไม่บังคับ |
| ⭐⭐ | ข้อมูลถาวรด้วย Turso (SQLite บนอินเทอร์เน็ต · แก้ service ชั้นเดียว) | 🏠 ไม่บังคับ |

---

## เริ่มทำ LAB

> **ทำงานใน Student Repository ที่ `labs/week-11/source/`** (เหมือนสัปดาห์ 7–10) — ตั้งต้นด้วย `cp -r labs/week-10/source labs/week-11/source`
> ถ้างานสัปดาห์ 10 ไม่สมบูรณ์ ใช้ `lab11/starter/` ด้านล่างแทน

```bash
cd lab11/starter/api
npm install
cp .env.example .env
npm run db:setup
npm run dev

# frontend (อีก terminal)
cd lab11/starter/frontend && npm install && npm run dev
```

```bash
# ตรวจงาน — รันจาก lab11/starter/
node --disable-warning=ExperimentalWarning check-week11.mjs --inclass   # 17/17
node --disable-warning=ExperimentalWarning check-week11.mjs            # 37/41
node --disable-warning=ExperimentalWarning check-week10.mjs            # 31/31
node --disable-warning=ExperimentalWarning check-week07.mjs            # 36/36
```

## production build

```bash
cd frontend && npm run build
cd ../api && NODE_ENV=production npm start
# เปิด http://localhost:3001 ได้ทั้งเว็บและ API
```

---

## สิ่งที่ต้องส่ง (งาน A4)

| ไฟล์ | จาก CP |
|---|---|
| `README.md` | CP40 |
| `DATABASE_CHOICES.md` | CP41 |
| `DEMO.md` + ลิงก์วิดีโอ | CP42 |
| root `package.json` (build/start) · `frontend/.env.production` | CP43 |

```bash
git switch -c unit4/week-11
git add -A && git commit -m "LAB11 (A4): ระบบ full-stack พร้อมใช้จริง"
git tag lab-11-submission-v1
```

---

## โครงสร้างโฟลเดอร์

```
week-11-fullstack-integration/
├── lab11/
│   ├── LAB11_INCLASS_GUIDE_TH.md
│   ├── LAB11_TAKEHOME_GUIDE_TH.md
│   └── starter/  (config/health/build เป็น TODO)
├── guides/  (เอกสาร · สไลด์ · live-coding CP35–39)
```

> **MongoDB เป็นภาคผนวก** — สัปดาห์นี้เน้น integration + production-ready ด้วย SQLite (จากสัปดาห์ 10) · MongoDB/async อยู่ในบท 8 "อ่านเพิ่มเติม" เพื่อให้รู้จักทางเลือก ไม่ต้องลงมือเขียน

---
