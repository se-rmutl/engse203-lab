# Final Term Project — ระบบ Full-Stack ที่พร้อมใช้งานจริง

**ENGSE203 · ปลายภาค 1/2569** · แทนโครงงานกลุ่มสัปดาห์ที่ 14–16 · CLO3–CLO7 · งาน **A6** (15%) และส่วนคุณภาพของ **A5** (6 จาก 10%)

> สัปดาห์ 14–16 **ไม่มีคาบเรียน** — ใช้เวลานั้นทำโปรเจกต์นี้เป็นคู่ · ส่งและสัมภาษณ์ใน**วันสอบปลายภาค**
> ภาพรวมพร้อมปฏิทินและตัวนับถอยหลัง: [สไลด์ปิดภาค](https://se-rmutl.github.io/engse203/wrapup/)

| | Section 1 | Section 2 |
|---|---|---|
| ประกาศโจทย์ | จันทร์ 5 ต.ค. (ท้ายคาบ) | พฤหัส 8 ต.ค. (ท้ายคาบ) |
| **ส่งงาน + สัมภาษณ์** | **จันทร์ 19 ต.ค.** | **พฤหัส 22 ต.ค.** |
| จำนวนนักศึกษา | 27 คน → 12 คู่ + 1 กลุ่ม 3 คน | 25 คน → 11 คู่ + 1 กลุ่ม 3 คน |

---

## 1. โจทย์ในหนึ่งย่อหน้า

นำระบบที่สร้างมาตลอดภาค (React + Express + SQLite + JWT จาก LAB 13) ไป**สร้างระบบใหม่สำหรับหน่วยงานจริงในมหาวิทยาลัย** ตาม[หัวข้อที่เลือก](TOPICS.md) — ใครก็ส่งคำขอได้ แต่เปลี่ยนสถานะและลบได้เฉพาะเจ้าหน้าที่ · มี test · มีเอกสาร · **deploy ขึ้น cloud ให้คนอื่นเปิดใช้ได้จริง** · และอธิบายได้ว่าทุกส่วนทำงานอย่างไร

```
หัวข้อของทีม ──▶ ออกแบบตาราง 2 ตาราง ──▶ API + validation + auth ──▶ React + login ──▶ test ──▶ deploy ──▶ v1.0.0
                 (W09)                     (W06–07 · W10 · W13)        (W04–05 · W13)    (W12)    (W11)    (W13)
```

> **ไม่มีงาน take-home แยกของหน่วยที่ 5** — งานต่อจาก LAB 13 (หน้า login ฝั่ง React · test เพิ่ม · Release Checklist · deploy) อยู่ในข้อกำหนดของโปรเจกต์นี้ทั้งหมด

---

## 2. ทีมและบทบาท

### คู่ (2 คน) — แบบปกติ

| บทบาท | รับผิดชอบ | อยู่ในโฟลเดอร์ |
|---|---|---|
| **Front-end** | ทุกหน้าของ React · login · เก็บ token · ซ่อนปุ่มตามสิทธิ์ · test ฝั่ง frontend | `frontend/` |
| **Back-end + DevOps** | ตาราง · API · validation · auth · test ฝั่ง API · CI · deploy · Release Checklist | `api/` · `.github/` · `render.yaml` |

### กลุ่ม 3 คน — มีได้ **1 กลุ่มต่อ Section** เท่านั้น

| บทบาท | รับผิดชอบ |
|---|---|
| **Front-end** | เหมือนแบบคู่ |
| **Back-end** | ตาราง · API · validation · auth · test ฝั่ง API · `DEBUG_LOG.md` |
| **DevOps** | CI (test + build) · deploy อัตโนมัติหลัง CI ผ่าน · **ข้อมูลถาวรด้วย Turso** · branch protection · `DEPLOY.md` + วิธี rollback · Release Checklist |

รายการงานของแต่ละบทบาทแบบละเอียด → [ROLES.md](ROLES.md)

> ทุกคนต้อง**อธิบายส่วนของเพื่อนได้ในระดับภาพรวม** — การสัมภาษณ์ถามข้ามบทบาท (เช่นถามคน Front-end ว่า "API รู้ได้อย่างไรว่าใครเป็นเจ้าหน้าที่")

---

## 3. จุดเริ่มต้น

### M0 — สร้าง repo ทีม + `TEAM.md` (คืนวันเรียน)

ไม่มีฟอร์มแยก — **ข้อมูลทีมอยู่ใน repo ทีมตั้งแต่วันแรก** ด้วยไฟล์ [`TEAM.md`](kit/TEAM.md): สมาชิก · บทบาท · อีเมลที่ใช้ commit · หัวข้อที่อยากได้ 3 อันดับ

```bash
# ① ตัวแทนทีม (คน Back-end) สร้าง repository ใหม่บน GitHub
#    ชื่อ engse203-final-<sec>-<รหัสหัวข้ออันดับ 1> เช่น engse203-final-1-T04 · ติ๊ก "Add a README file"
#    → Settings → Collaborators เพิ่มเพื่อนในทีมทุกคน + บัญชีผู้สอนตามที่ประกาศใน LMS

# ② ตัวแทนทีมวางแม่แบบ TEAM.md แล้วกรอกส่วน "ทีม" · "หัวข้อ" · แถวของตัวเอง
git clone git@github.com:<owner>/engse203-final-1-T04.git
cd engse203-final-1-T04
cp ../engse203-lab/labs/final-term-project/kit/TEAM.md .
git add TEAM.md && git commit -m "M0: TEAM.md" && git push

# ③ เพื่อนทุกคน clone จากเครื่องของตัวเอง → กรอกแถวของตัวเอง → commit + push เอง
git config user.email                       # ต้องตรงกับอีเมลที่เขียนใน TEAM.md
git pull && git add TEAM.md && git commit -m "M0: <ชื่อ> เข้าทีม" && git push

# ④ ส่งลิงก์ repo ใน LMS — ทีมละ 1 ครั้ง · เวลาที่ส่งใช้จัดหัวข้อ (ส่งก่อนได้ก่อน)
```

> ผู้สอนประกาศหัวข้อที่แต่ละทีมได้ภายใน 09:00 วันถัดไป → กรอก "ผลการจัดหัวข้อ" ใน `TEAM.md` · ได้หัวข้ออื่นให้เปลี่ยนชื่อ repo ที่ Settings → General (ลิงก์เดิมยังใช้ได้)

### M1 — ใส่โค้ดตั้งต้นจาก LAB 13

ทุกทีม**เริ่มจาก LAB 13 ที่ทำเสร็จแล้วของคน Back-end** (ไม่เริ่มจากศูนย์ และไม่ใช้ starter ใหม่) — ใส่ลงใน repo ทีมเดิมจาก M0

```bash
# ① คน Back-end ตรวจ LAB 13 ของตัวเองก่อน — ต้องผ่านครบ
cd <Student Repository>/labs/week-13/source
node --disable-warning=ExperimentalWarning check-week13.mjs --inclass     # 23/23

# ② คัดลอกโค้ดเข้า repo ทีม (ไม่คัดลอก node_modules · campus.db · .env)
cd <โฟลเดอร์ repo ทีม> && git pull
rsync -a --exclude node_modules --exclude '*.db' --exclude .env <Student Repository>/labs/week-13/source/ ./
cp -rn ../engse203-lab/labs/final-term-project/kit/. ./        # check-project.mjs · แม่แบบเอกสาร · CI · render.yaml (-n = ไม่ทับ TEAM.md ที่กรอกแล้ว)
rm -f BUG_REPORTS.md DEMO.md DATABASE_CHOICES.md TEST_CASES.md check-week1*.mjs   # ไฟล์ของ LAB ที่ไม่ใช้แล้ว
rm -rf api/scripts/check-project.mjs api/data/initialRequests.json frontend/public/data frontend/src/services/requestStorage.js   # ของ LAB 6–10 ที่ไม่มีใครเรียกแล้ว
cp api/.env.example api/.env                                     # ไฟล์ค่าลับของเครื่องตัวเอง (ไม่ commit) — ไม่มีไฟล์นี้ npm run dev จะขึ้น ".env: not found"
cp PROJECT_README_TEMPLATE.md README.md                          # แทน README ที่ GitHub สร้างให้ แล้วค่อยกรอกทีหลัง
# แก้ package.json (root) บรรทัด "check" เป็น  "node --disable-warning=ExperimentalWarning check-project.mjs"
# project.config.json · TEAM_CONTRACT.md — คัดลอกชื่อ · GitHub · บทบาท จาก TEAM.md
git add -A && git commit -m "start: LAB 13 ของ <ชื่อ> + project kit"
git push
git tag v0.0.0 && git push origin v0.0.0                         # จุดเริ่มต้น — ใช้เทียบว่าทีมเปลี่ยนอะไรไปบ้าง
```

> 🪟 ไม่มี `rsync` — ใช้ `cp -r <Student Repository>/labs/week-13/source/. ./ && rm -rf node_modules api/node_modules frontend/node_modules api/data/*.db api/.env` แทน หรือคัดลอกด้วย File Explorer แล้วลบสิ่งเหล่านั้นก่อน `git add`

> 🗄 **ไม่ต้อง commit ไฟล์ `.db`** — API สร้างฐานข้อมูลจาก `schema.sql` เองเมื่อยังไม่มีตาราง (`loadSeed()` — อย่าลืมเปลี่ยนชื่อตารางที่ตรวจ ดู [TOPICS.md](TOPICS.md)) · ใส่ `api/data/*.db` ใน `.gitignore` · บน Render ข้อมูลจึงกลับเป็น seed ทุกครั้งที่ restart (ทีม 3 คนใช้ Turso)

> ⚠ LAB 13 ของคน Back-end ยังไม่ครบ 23/23 → ทำให้ครบก่อน (เป็นคะแนน A5 อยู่แล้ว) · ถ้าใช้ของเพื่อนในทีมแทน ให้เขียนไว้ใน `TEAM_CONTRACT.md`

---

## 4. ข้อกำหนดขั้นต่ำ (MVP)

ทำครบทุกข้อ = ได้คะแนนเต็มส่วนผลงาน · ข้อที่มี ⭐ เป็นคะแนนเพิ่ม

### R1 · ข้อมูลของหัวข้อ (Back-end)

- [ ] ตารางหลักของหัวข้อ **อย่างน้อย 6 ฟิลด์** (รวม `status`) + ตารางที่เกี่ยวข้องของหัวข้อ**อย่างน้อย 1 ตาราง** (ไม่นับ `users`) เชื่อมด้วย `FOREIGN KEY`
- [ ] ข้อมูลตั้งต้น (seed) อย่างน้อย 5 รายการ ครอบคลุมทุกสถานะ · บัญชีเจ้าหน้าที่ 1 บัญชี (เก็บเป็น hash)
- [ ] API ส่งข้อมูลที่ **JOIN แล้ว** (frontend ไม่ต้องรู้ว่าแยกตาราง)
- [ ] **ลบตาราง `requests` ของ Campus Service ออก** — ระบบต้องเป็นของหัวข้อทีมจริง ไม่ใช่เปลี่ยนแค่ชื่อหน้า

### R2 · API (Back-end)

| method | path | ใครเรียกได้ | ผลที่ต้องได้ |
|---|---|---|---|
| GET | `/api/health` | ทุกคน | 200 + สถานะฐานข้อมูล |
| GET | `/api/<resource>` | ทุกคน | 200 · รองรับ `?status=` |
| GET | `/api/<resource>/:id` | ทุกคน | 200 · ไม่มี → 404 |
| POST | `/api/<resource>` | ทุกคน | 201 · ข้อมูลผิด → 400 พร้อมรายการ error |
| PUT | `/api/<resource>/:id` | **เจ้าหน้าที่** | 200 · ไม่มี token → 401 · ไม่ใช่เจ้าหน้าที่ → 403 |
| DELETE | `/api/<resource>/:id` | **เจ้าหน้าที่** | 204 · ไม่มี token → 401 · ไม่ใช่เจ้าหน้าที่ → 403 |
| POST | `/api/auth/login` | ทุกคน | 200 + token · ผิด → 401 (ข้อความเดียวกันทั้งอีเมลผิดและรหัสผิด) |

### R3 · Validation (Back-end)

- [ ] ฟิลด์บังคับ · ค่าที่ต้องอยู่ในรายการ (enum) · ความยาวต่ำสุดและสูงสุดทุกช่องข้อความ · body ไม่เกิน 10kb (413)
- [ ] **กฎเฉพาะของหัวข้ออย่างน้อย 1 ข้อ** (ดูคอลัมน์ "กฎเฉพาะ" ใน [TOPICS.md](TOPICS.md)) เช่น วันที่ต้องไม่ใช่อดีต · จำนวน 1–10
- [ ] validator เป็น pure function (แบบ LAB 12) จึงเขียน unit test ได้

### R4 · ความปลอดภัย (Back-end)

- [ ] รหัสผ่านเก็บด้วย scrypt + salt · JWT หมดอายุ · `authenticate` (401) + `requireRole` (403)
- [ ] `JWT_SECRET` มาจาก env · production ไม่มีค่า → ไม่ยอม start · production ไม่ส่ง stack trace
- [ ] **บัญชีเจ้าหน้าที่บน production ไม่ใช้รหัสผ่านเดียวกับในไฟล์ seed** — ตั้ง `STAFF_EMAIL` + `STAFF_PASSWORD` บน Render แล้วให้ `server.js` ตั้งรหัสใหม่ทุกครั้งที่ start (โค้ดตัวอย่างใน [ROLES.md](ROLES.md) ข้อ D3)

### R5 · หน้าเว็บ (Front-end)

- [ ] หน้ารายการ + กรองตามสถานะ · หน้ารายละเอียด · หน้าส่งคำขอ (ตรวจข้อมูลฝั่ง client และแสดง error จาก API) · หน้าสรุป (dashboard)
- [ ] **หน้า login** · เก็บ token · `apiClient` แนบ `Authorization: Bearer` **ที่เดียว** · ได้ 401 → ล้าง token แล้วพาไปหน้า login · ปุ่ม logout
- [ ] คนทั่วไป**ไม่เห็น**ปุ่มเปลี่ยนสถานะและปุ่มลบ · เจ้าหน้าที่เห็นและใช้ได้
- [ ] ใช้งานบนมือถือได้ (responsive) · มี loading และ error state
- [ ] ไม่ใช้ `dangerouslySetInnerHTML` กับข้อมูลจากผู้ใช้

### R6 · การทดสอบ (ทุกบทบาท)

| ที่ไหน | อย่างน้อย | ต้องมี |
|---|---:|---|
| `api/tests/unit/` | 10 ข้อ | ค่าขอบของ validator รวมกฎเฉพาะของหัวข้อ |
| `api/tests/integration/` | 12 ข้อ | ทุก endpoint ใน R2 · 401 · 403 · เจ้าหน้าที่ทำได้ |
| `frontend/src/**/*.test.js` | 3 ข้อ | pure function ฝั่ง frontend เช่น สรุปตัวเลข · ตรวจฟอร์ม · อ่าน token |
| `DEBUG_LOG.md` | 2 bug | **bug จริงที่เจอระหว่างทำโปรเจกต์** · 6 ช่องแบบ LAB 12 · มี regression test |

### R7 · DevOps

- [ ] CI รัน `npm test` ทุกครั้งที่ push และเปิด PR
- [ ] deploy ขึ้น **Render** · URL เปิดได้จริง · `/api/health` ตอบ 200 · `JWT_SECRET` ตั้งบน Render (`generateValue: true`)
- [ ] `.env.example` มีตัวแปรครบ ค่าว่าง · ไม่มี `.env` หรือ secret ใน git
- [ ] `README.md` ตาม[แม่แบบ](kit/PROJECT_README_TEMPLATE.md) — วิธีติดตั้ง · รัน · test · deploy · URL · บัญชีทดสอบ
- [ ] `RELEASE_CHECKLIST.md` ติ๊กครบทุกข้อ (ข้อที่ทำไม่ได้ต้องเขียนเหตุผล) · tag **`v1.0.0`**

**กลุ่ม 3 คนเพิ่ม (DevOps)** — Turso ข้อมูลไม่หายเมื่อ redeploy · CI รันทั้ง test และ build · Render deploy เฉพาะเมื่อ CI ผ่าน · branch protection บน `main` · `DEPLOY.md` มีขั้นตอน rollback ไป tag ก่อนหน้า

### R8 · การทำงานเป็นทีม

- [ ] `TEAM_CONTRACT.md` กรอกครบ · ใช้ GitHub Issues แจกงาน
- [ ] ทำงานใน branch แล้วเปิด PR · **ทุกคนเปิด PR ที่ merge แล้วอย่างน้อย 2 PR และ review ของเพื่อนอย่างน้อย 1 PR**
- [ ] ทุกคนมี commit ในส่วนของตัวเอง**อย่างน้อย 10 commit** กระจายตลอดช่วงเวลา (ไม่ใช่ commit ทั้งหมดในคืนสุดท้าย)
- [ ] ทุกคนส่งแบบประเมินเพื่อนร่วมทีม (ส่งเป็นรายบุคคล ไม่อยู่ใน repo)

### ⭐ คะแนนเพิ่ม (เลือกทำได้ สูงสุด 2 ข้อ)

| ⭐ | ทำอะไร |
|---|---|
| ค้นหา | ค้นหาด้วยคำ (`?q=`) ฝั่ง API + ช่องค้นหาฝั่ง React |
| ประวัติสถานะ | ตารางที่ 3 เก็บว่าใครเปลี่ยนสถานะเมื่อไร · แสดงในหน้ารายละเอียด |
| จำกัดการเดารหัสผ่าน | ผิด 5 ครั้งใน 15 นาที → 429 |
| coverage | api ≥ 85% และแสดงหลักฐานใน README |
| แบ่งหน้า | `?page=&limit=` ฝั่ง API + ปุ่มหน้าถัดไปฝั่ง React |
| ข้ามแพลตฟอร์ม | ทำเป็น PWA (manifest + service worker · ติดตั้งบนมือถือได้) หรือห่อเป็นแอป desktop ด้วย Electron (หัวข้อ 6.1 ของหน่วยที่ 6) |

---

## 5. ตรวจงานด้วยตัวเอง — `check-project.mjs`

ไฟล์อยู่ใน `kit/` (คัดลอกไปไว้ที่ root ของ repo ทีมแล้วตอน M1 ข้อ 3) · ต้องกรอก `project.config.json` ก่อน

```bash
cp project.config.example.json project.config.json   # แล้วกรอกค่าของทีม
npm install --prefix api && npm install --prefix frontend

node --disable-warning=ExperimentalWarning check-project.mjs                   # ตรวจทั้งหมด
node --disable-warning=ExperimentalWarning check-project.mjs --role fe         # ตรวจเฉพาะส่วนของ Front-end
node --disable-warning=ExperimentalWarning check-project.mjs --role be+devops  # คน Back-end + DevOps ของทีมคู่ (กลุ่ม 3 คนใช้ --role be / --role devops)
node --disable-warning=ExperimentalWarning check-project.mjs --skip-build      # ไม่ build frontend (เร็วขึ้น)
node --disable-warning=ExperimentalWarning check-project.mjs --online          # ตรวจ URL ที่ deploy แล้วด้วย
```

checker เปิด API ของทีมจริงด้วยฐานข้อมูลชั่วคราว (`DB_FILE`) แล้วยิงทุก endpoint ใน R2 ตาม `project.config.json` · รัน test ของทีม · ลองเรียกชั้น service ของ frontend ว่าแนบ token จริง · ตรวจเอกสาร · ตรวจ git · ข้อที่ข้าม (`–` เช่น `--skip-build` หรือยังไม่ใช้ `--online`) ไม่นับในคะแนนรวมของ checker

| ช่องใน `project.config.json` | ใช้ทำอะไร |
|---|---|
| `api.resource` · `api.existingId` | path ของ resource และรหัสของรายการหนึ่งใน seed (เช่น `/api/loans` · `LN-001`) |
| `api.validSample` · `api.invalidSample` | body ที่ต้องได้ 201 และ 400 · วันที่เขียนแบบ `"{{today+7}}"` ได้ (checker แทนเป็นวันที่จริงตามเวลาไทย ข้อมูลตัวอย่างจึงไม่หมดอายุ) |
| `api.ruleSamples` | (แนะนำ) body ที่ผิด**กฎเฉพาะของหัวข้อ** ทีละข้อ — ทุกข้อต้องได้ 400 |
| `api.statusField` · `api.statusFilter` · `api.statusUpdate` | ชื่อฟิลด์สถานะ · สถานะที่ใช้ลองกรอง · body ของ PUT (ต้องเป็นการเปลี่ยนสถานะที่ระบบยอมให้จาก `existingId`) |
| `api.idField` · `api.staffRole` | (ไม่บังคับ) ถ้าไม่ได้ใช้ `id` และ role `staff` ตามแบบ LAB 13 |

> รหัสในผล checker (`T2` · `B1` · `F2` · `D8` · `X1` …) เป็นรหัส**ของ checker** ไม่ใช่เลขข้อใน [ROLES.md](ROLES.md) — ดูจากชื่อข้อที่พิมพ์ต่อท้าย เช่น checker `D8` = ROLES D3 (รหัสเจ้าหน้าที่ production)

> ผ่าน checker ครบ ≠ ได้คะแนนเต็ม — checker ตรวจว่า "มีและทำงาน" แต่ไม่ได้ตรวจว่า "ออกแบบดีและอธิบายได้" ซึ่งดูจากการสัมภาษณ์และ rubric

---

## 6. กำหนดการ

| ขั้น | ส่งอะไร | Section 1 | Section 2 |
|---|---|---|---|
| **M0** จับคู่ | repo ทีม + [`TEAM.md`](kit/TEAM.md) (สมาชิก · บทบาท · อีเมลที่ใช้ commit · หัวข้อ 3 อันดับ) · **ทุกคน commit แถวของตัวเอง** · ส่งลิงก์ repo ใน LMS (ส่งก่อนได้หัวข้อก่อน) | 5 ต.ค. 23:59 | 8 ต.ค. 23:59 |
| **M1** ตั้งต้น | โค้ดจาก LAB 13 + kit (`v0.0.0`) · `TEAM_CONTRACT.md` · `project.config.json` · ตาราง 2 ตารางใน `schema.sql` · Issues · tag `v0.1.0` | 8 ต.ค. 23:59 | 11 ต.ค. 23:59 |
| **M2** กลางทาง | API ของหัวข้อทำงาน + test ผ่าน · หน้า login ใช้ได้ใน local · deploy ครั้งแรก · tag `v0.5.0` | 13 ต.ค. 23:59 | 16 ต.ค. 23:59 |
| แนะนำ | **หยุดเพิ่มฟีเจอร์** — แก้ bug · เอกสาร · Release Checklist | 17 ต.ค. | 20 ต.ค. |
| **M3** ส่ง | tag **`v1.0.0`** · URL ที่ deploy · ลิงก์ repo ผ่าน LMS | **19 ต.ค. ก่อนเวลาสอบ** | **22 ต.ค. ก่อนเวลาสอบ** |

> ผู้สอนตรวจ M1 และ M2 จาก GitHub (ไม่มีคาบเรียน) · ทีมที่ไม่มี tag ตามกำหนดจะถูกเรียกคุยก่อนวันสอบ
> commit หลัง tag `v1.0.0` **ไม่นำมาคิดคะแนน**

---

## 7. วันสอบปลายภาค

| ส่วน | ทำอะไร | รูปแบบ |
|---|---|---|
| ข้อสอบ Part 1 | take-home (ประกาศแยก · ชุด A = Sec 1 · ชุด B = Sec 2) · ส่งวันสอบ | **ทีมเดียวกับโปรเจกต์นี้** · 1 repo/ทีม · ทุกงานมีเจ้าของตามบทบาท · คะแนนรายบุคคล |
| ข้อสอบ Part 2 | ทำในห้อง 90 นาที — review + แก้ PR และทำ change request บน repo take-home ของทีม | ทีม · เจ้าของงานตามบทบาท · คะแนนรายบุคคล |
| **สัมภาษณ์** | ทีมละประมาณ 15 นาที · **demo โปรเจกต์ 3 นาที** แล้วถามทั้งโปรเจกต์และงานข้อสอบที่แต่ละคนเป็นเจ้าของ · แทนข้อสอบทฤษฎี | ถามรายคนตามบทบาท · ให้คะแนนรายบุคคล |

> สอบเป็นทีมเพื่อฝึก **pair programming** ต่อจากโปรเจกต์ — ใครเป็นเจ้าของงานไหนและวิธีคิดคะแนนรายบุคคลอยู่ใน [สัปดาห์ที่ 17](../week-17-final/)

เตรียม demo: เปิด URL ที่ deploy → ส่งคำขอแบบคนทั่วไป → login เจ้าหน้าที่ → เปลี่ยนสถานะ → แสดงว่าคนทั่วไปทำไม่ได้ (401/403) → เปิด CI ที่ผ่าน

---

## 8. คะแนน

| งาน | สัดส่วน | มาจาก |
|---|---:|---|
| **A6** Final Term Project | 15% | ผลงานทีม 10 + ผลงานรายบุคคลตามบทบาท 5 |
| **A5** คุณภาพและความปลอดภัย | 6 จาก 10% | test · DEBUG_LOG · auth · secret · Release Checklist ในโปรเจกต์ (อีก 4 มาจาก LAB 13 ในห้อง) |
| A7 สอบปลายภาค | 15% | take-home + ทำในห้อง + สัมภาษณ์ · **ทีมเดียวกับโปรเจกต์นี้** · คะแนนรายบุคคล (ดู [สัปดาห์ที่ 17](../week-17-final/)) |

เกณฑ์ละเอียด → [RUBRIC.md](RUBRIC.md)

---

## 9. กติกา

- **ใช้ AI ได้** แต่ต้องเปิดเผยใน README หัวข้อ "การใช้ AI" ว่าใช้ทำอะไร และ**ต้องอธิบายโค้ดทุกบรรทัดที่ส่งได้** — อธิบายไม่ได้ในการสัมภาษณ์ = ไม่ได้คะแนนส่วนนั้น
- ห้ามคัดลอกโค้ดของทีมอื่น · หัวข้อเดียวกันข้าม Section ได้ แต่โค้ดต้องไม่เหมือนกัน
- ห้าม commit `.env` · token · รหัสผ่านจริง · ถ้าเผลอ commit ให้เปลี่ยน secret ทันทีแล้วบันทึกใน `DEBUG_LOG.md`
- สมาชิกที่ไม่มีหลักฐานการทำงานใน git จะได้คะแนนรายบุคคล 0 ในส่วน A6 แม้ทีมจะได้คะแนนผลงานเต็ม
- มีปัญหาในทีม (เพื่อนหาย · ไม่ทำงาน) แจ้งผู้สอน**ก่อน M2** — แจ้งในวันสอบช่วยไม่ได้

---

## ไฟล์ในโฟลเดอร์นี้

| ไฟล์ | ใช้ทำอะไร |
|---|---|
| [TOPICS.md](TOPICS.md) | หัวข้อให้เลือก 18 หัวข้อ พร้อมตาราง สถานะ และกฎเฉพาะ |
| [ROLES.md](ROLES.md) | รายการงานของ Front-end · Back-end · DevOps |
| [RUBRIC.md](RUBRIC.md) | เกณฑ์คะแนนทีมและรายบุคคล |
| [PEER_REVIEW.md](PEER_REVIEW.md) | คำถามประเมินเพื่อนร่วมทีม (ส่งผ่านแบบฟอร์ม) |
| [kit/TEAM.md](kit/TEAM.md) | **M0** — แม่แบบข้อมูลทีม: สมาชิก · บทบาท · หัวข้อ 3 อันดับ |
| `kit/` | คัดลอกไปไว้ที่ root ของ repo ทีม — `check-project.mjs` · `project.config.example.json` · แม่แบบเอกสาร · CI |
