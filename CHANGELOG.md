# Changelog

## v7.13.1 — take-home ใช้ทีมเดียวกับ Term Project ผ่าน `TEAM.md`

- `labs/week-17-final/README.md` — ขั้นตอนเริ่ม take-home ทีมละครั้ง 6 ขั้น (Use this template · collaborator · `team.json` คัดลอกจาก `TEAM.md` · ใส่ลิงก์ take-home ใน `TEAM.md` แทนการส่งใน LMS · tag ก่อนวันสอบ)
- `kit/TEAM.md` — บรรทัด `repo take-home` ในตาราง "ทีม" และข้อยืนยัน

## v7.13.0 — รวมชุดสำหรับปลายภาค · lockfile ข้ามระบบ · กันเฉลยหลุด

- `labs/week-12-…/lab12/starter/api/package-lock.json` มี binding ของ rolldown ครบทุกระบบ — เดิมมีแค่ Linux ทำให้ `npm test` บน Mac/Windows ขึ้น "Cannot find native binding"
- `.gitignore` กัน `labs/week-XX/` (workspace ทดสอบ) · `*.rej` · `*.orig` — ไม่ให้ workspace ที่มีเฉลยถูก commit ขึ้น Course Repository อีก
- ฝั่งผู้สอน (`resources/` · ไม่ขึ้น GitHub): `RUNBOOK_FINAL_TH.md` ลำดับงาน Term Project + สอบปลายภาคทั้ง 2 Section ตามวันที่ · `tools/teams.sh` (clone · ผล M0 · ตรวจโปรเจกต์ · บันทึก tag) · เฉลย LAB 12/13 แบบ patch · lockfile ของ reference และ template ข้อสอบ

## v7.12.1 — M0 ใช้ `TEAM.md` ใน repo ทีมแทนฟอร์ม

- `kit/TEAM.md` ใหม่ — ทีม · สมาชิก (ชื่อ · รหัส · GitHub · อีเมลที่ใช้ commit · บทบาท) · หัวข้อ 3 อันดับ · หัวข้อที่เสนอเอง · ผลการจัดหัวข้อ · **ทุกคน commit แถวของตัวเอง** (ตรวจสิทธิ์เข้า repo และอีเมล commit ไปในตัว)
- README ข้อ 3 แยกเป็น M0 (สร้าง repo ทีม + `TEAM.md` + ส่งลิงก์ใน LMS) และ M1 (ใส่โค้ดจาก LAB 13 ลง repo เดิม · `cp -rn` ไม่ทับ `TEAM.md`) · ข้อ 6 กำหนดการ M0/M1 · TOPICS: จัดหัวข้อตามเวลาส่งลิงก์ใน LMS
- `TEAM_CONTRACT.md` ไม่ซ้ำข้อมูลส่วนตัวกับ `TEAM.md` (เหลือชื่อ · บทบาท · งานหลัก)
- สไลด์ปิดภาค: กำหนดส่ง M0/M1 และหน้าหัวข้อ

## v7.12.0 — ตรวจหน่วยที่ 5 ซ้ำทั้งเส้นทาง · ย้ายของผู้สอนไป `resources/` · ทดสอบ checker โปรเจกต์กับหัวข้อ T07 · สอบปลายภาคเป็นทีม

### ของผู้สอนย้ายไป `resources/` (อยู่ใน `.gitignore` — ไม่ขึ้น GitHub)

- `labs/<สัปดาห์>/_instructor-private/` ทุกสัปดาห์ (06 · 07 · 09 · 10 · 11 · 12 · 13 · final-term-project) → `resources/<สัปดาห์>/` · README ของแต่ละสัปดาห์ไม่มีส่วน "สำหรับผู้สอน" แล้ว · ดัชนีและคำสั่งตรวจก่อนสอนอยู่ที่ `resources/README.md`
- path ใน Step Script · คู่มือ Deploy W11 · Blueprint หน่วยที่ 5 · คู่มือผู้สอน Term Project ปรับตาม
- `.gitignore` (root) เพิ่ม `!.env.production` — เดิม `.env.*` ตัด `frontend/.env.production` ของ starter W12/W13 ทิ้ง ทำให้ `npm run build` ฝัง `localhost:3001` (ไฟล์นี้ไม่มีค่าลับ)

### สัปดาห์ 12 (เดินตามคู่มือแบบนักศึกษาทุกคำสั่ง · ผลทุกจุดตรงกับที่คู่มือบอก)

- คู่มือ · README · CP44: เพิ่ม `mkdir -p labs/week-12` ก่อน `cp` (template สร้างถึง week-04 เท่านั้น) และ `cp api/.env.example api/.env` (ไม่มี = `npm run dev` ขึ้น `.env: not found`)
- BUG #1 · BUG #2: หยุด `npm run dev` เดิมก่อน (พอร์ตชน · `db:reset` ขณะ server เปิดไม่มีผล) · เมนู JavaScript Debug Terminal ที่ถูกต้อง · `before` → `beforeAll`
- CP45/CP46: ระบุจำนวน test ตามโค้ดบนจอ (20 ข้อ + You do 4) · Step Script ซ้อมด้วย `grep` แทน `tail -3`
- checker: "regression test BUG #1" ไม่ผ่านก่อนเวลาอีก (regex ข้ามไปจับ test ถัดไป) · CI นับ workflow ที่ root ของ Student Repository ด้วย · `.gitignore` มี `coverage/` · `server.js` throw เมื่อพอร์ตชน (Express 5) · engines `>=22.13.0` · `render.yaml` rootDir เป็นสัปดาห์ของตัวเอง

### สัปดาห์ 13

- คู่มือ · README · CP48 · สไลด์ 3: `mkdir -p labs/week-13` · `cp api/.env.example api/.env`
- แก้ข้อความที่ไม่ตรงโค้ด: starter ใช้ `||` (ไม่ใช่ `??`) · body เกิน 100kb ถูกปฏิเสธอยู่แล้ว · สไลด์ 21 มีแต่ปุ่มตัวอย่าง (decode token ของตัวเองด้วย `node -pe`) · ข้อความ error ของ Vitest · สาเหตุของ "ตรวจ hash ใน schema.sql ไม่ผ่านข้อเดียว"
- Challenge 429: ต้อง export `resetLoginLimiter()` และเรียกใน `beforeEach` (ไม่เช่นนั้น 23/23 ตกเป็น 22/23)
- Step Script: เดโม `DELETE REQ-001` ตอน 13:00 แล้วต้อง `db:reset` (หยุด server ก่อน) · CP52 หยุด dev server ก่อนรัน production · ลิงก์สไลด์ quiz
- `server.js` throw เมื่อพอร์ตชน · README ของ starter/reference มี `JWT_SECRET` ในคำสั่ง production · ชื่อข้อ checker ".gitignore มี .env"

### Final Term Project

- `check-project.mjs` ทดสอบกับโปรเจกต์ตัวอย่างหัวข้อ T07 (ยืม-คืนอุปกรณ์) ทั้งทีมคู่และทีม 3 คน + กรณีบกพร่อง 18 แบบ: เดิม T07 ที่ถูกต้องได้ 31/35 → 34/34 · Campus Service ผลเหมือนเดิมทุกข้อ
  - แก้ false fail: `render.yaml` ของ kit เอง · ข้อความแม่แบบใน TEAM_CONTRACT · `nextId` ใน DEBUG_LOG
  - แก้ false pass: DELETE ไม่มี auth / ไม่มี `requireRole` · frontend สร้าง header แต่ไม่ส่ง · คำสั่งในคอมเมนต์ของ CI · แม่แบบที่ยังไม่กรอก · `test.todo` · PUT ที่ตอบ 200 แต่ไม่บันทึก
  - ใช้ `DB_FILE` ชั่วคราวเสมอ (ถ้า API ไม่สนใจ `DB_FILE` จะแจ้งแทนการเขียนทับฐานข้อมูลจริง) · config รองรับ `{{today+N}}` · `ruleSamples` · `idField` · `staffRole`
- TOPICS: ตาราง "จุดที่ผูกกับชื่อ `requests`" (`loadSeed()` · `nextId()` · `setup-db.mjs` · `campus.db`) และตัวอย่างการตีความกฎ T07
- README ข้อ 3: ลบไฟล์ของ LAB ที่ไม่ใช้ · `cp api/.env.example api/.env` · ไม่ต้อง commit `.db` · ทางเลือกเมื่อไม่มี `rsync` · ข้อ 5: รหัสของ checker ≠ เลขข้อใน ROLES
- ROLES B5 ไม่ขัดกับ D3 อีก (บัญชี production ตั้งจาก env)

### สอบปลายภาคเป็นทีม (ทีมเดียวกับ Final Term Project)

- take-home (Part 1) และทำในห้อง (Part 2) ทำเป็นทีม · 1 repo ต่อทีม · pair programming ได้ แต่**ทุกงานมีเจ้าของตามบทบาท** — Front-end: bug ฝั่งหน้าเว็บ · ฟีเจอร์ส่วนหน้าเว็บ · code review (Part 2) · test ใต้ `frontend/` · Back-end (+DevOps ในทีมคู่): bug ฝั่ง API · ฟีเจอร์ส่วน API · ปัญหาตรรกะ · test ใต้ `api/` · DevOps (ทีม 3 คน): secret · ปัญหาความปลอดภัยใน PR · CI + วิธีรัน production
- คะแนนรายบุคคลแต่ละ Part = 100 × (0.6 × งานของตัวเอง + 0.4 × ผลรวมทีม) × 0.05 · สัมภาษณ์ถามรายคนตามบทบาท · เจ้าของอธิบายงานไม่ได้ = งานนั้นของคนนั้นเหลือครึ่ง
- หลักฐาน: `team.json` · commit โดยเจ้าของ + `Co-authored-by:` · "ผู้รับผิดชอบ" ใน `DEBUG_LOG.md` · "ผู้เขียน" ใน `REVIEW.md`
- เอกสารที่ปรับ: สัปดาห์ 17 (ตารางเจ้าของงาน + สูตร) · Final Term Project ข้อ 7–8 · README หลัก · `docs/course-assessment.md` · สไลด์ปิดภาค (เพิ่มหน้า "สอบเป็นทีม · ใครทำอะไร" → 43 หน้า · ตาราง Part 1/2 มีคอลัมน์เจ้าของ) · สไลด์ W13 หน้า 41 · เอกสาร W13 ข้อ 9.4
- ชุดข้อสอบ grader และคู่มือผู้สอนอยู่ใน `resources/final-exam/` (ไม่ขึ้น GitHub)

### คู่มือ Deploy (W11) — ส่วนที่ 12 ใหม่

- `JWT_SECRET` (`generateValue` หรือสุ่มเอง) · `STAFF_EMAIL` / `STAFF_PASSWORD` (`sync: false` + upsert ตอน start) · ตรวจหลัง deploy ว่ารหัส seed ใช้ไม่ได้ · ตารางแก้ปัญหา

## v7.11.0 — หน่วยที่ 5 (สัปดาห์ 12–13 สอนวันเดียว) · Final Term Project · ปรับผังปลายภาค

**สอนวันเดียว** — เช้า W12 (09:00–12:00) · บ่าย W13 (13:00–16:00) · Sec 1 วันที่ 5 ต.ค. · Sec 2 วันที่ 8 ต.ค. · สัปดาห์ 14–16 ยกเลิกคาบเรียน → Final Term Project · สอบปลายภาค Sec 1 วันที่ 19 · Sec 2 วันที่ 22 ต.ค.

### สัปดาห์ 12 — การทดสอบและการแก้ไขข้อผิดพลาด (`week-12-testing-debugging`)

- starter: ระบบที่มี bug 4 ตัว (แต่ละตัวต้องใช้เครื่องมือต่างกัน: unit test ค่าขอบ · breakpoint · DevTools Network · stack trace) · `npm test` ผ่าน 11/11 ทั้งที่มี bug · `check-week12` 6/20
- Vitest 5 ทั้ง api และ frontend (Vitest รุ่นเก่าตัด `node:` ออกจาก `node:sqlite`) · `DB_FILE=':memory:'` + `beforeEach(loadSeed)` · coverage
- reference: validator เป็น pure function · regression test ครบ 4 bug · coverage 87% · CI · `check-week12` 22/22 · W07 36/36 · W10 31/31
- คู่มือในห้อง CP44–CP47 · เอกสาร 9 บท 12 ภาพ · สไลด์ 42 หน้า (Boundary tester · แยกชั้นหา bug) · live-coding 4 หน้า

### สัปดาห์ 13 — พัฒนาอย่างปลอดภัยและพร้อมส่งมอบ (`week-13-quality-security`)

- กติกาสิทธิ์: GET/POST ทุกคน · PUT/DELETE เฉพาะเจ้าหน้าที่ (JWT)
- starter = เฉลย W12 + TODO 5 จุด (W13-VALID · HASH · LOGIN · AUTH · SECRET) · test-first `password.test.js` · `check-week13` 5/23
- reference: max length + 413 · scrypt + `timingSafeEqual` · JWT 2 ชม. · `authenticate` 401 / `requireRole` 403 · fail fast เมื่อไม่มี `JWT_SECRET` · security headers · จำกัดการเดารหัสผ่าน (429) · `create-staff` · React: หน้า login · `authStore` · `useAuth` · `check-week13` 27/27 · api 77 test · frontend 8 test
- คู่มือในห้อง CP48–CP52 · เอกสาร 9 บท 10 ภาพ · สไลด์ 42 หน้า (JWT decoder · ด่านตรวจ 401/403) · live-coding 5 หน้า

### แก้จากสัปดาห์ 11

- `errorHandler` ใช้ `config.isProduction` (ไม่มีอยู่จริง) → production ส่ง stack trace ออกไป · แก้เป็น `config.isProd` ทั้งใน W11 reference และทุกสัปดาห์ถัดไป · checker W07 ปรับตาม

### Final Term Project (`labs/final-term-project` · ใหม่)

- คู่ (Front-end / Back-end + DevOps) · กลุ่ม 3 คน 1 กลุ่มต่อ Section (Front-end / Back-end / DevOps ขึ้น cloud + Turso)
- 18 หัวข้อ · ข้อกำหนด R1–R8 · `ROLES.md` · `RUBRIC.md` (A6 15 + A5 6) · `PEER_REVIEW.md` · กำหนดการ M0–M3
- `kit/`: `check-project.mjs` (เปิด API ของทีมจริงด้วยฐานข้อมูลชั่วคราว · ยิงทุก endpoint · รัน test · ตรวจเอกสาร/git/secret/production · `--online` · `--role`) · แม่แบบ README · TEAM_CONTRACT · RELEASE_CHECKLIST · DEBUG_LOG · DEPLOY · CI · `render.yaml` (`STAFF_EMAIL`/`STAFF_PASSWORD` ตั้งรหัสเจ้าหน้าที่ production)
- สัปดาห์ 14–16 README เปลี่ยนเป็นประกาศยกเลิก + ชี้ไปโปรเจกต์ · สัปดาห์ 17 อธิบายรูปแบบสอบใหม่

### สไลด์ปิดภาค (ใหม่)

- `week-13-quality-security/guides/ENGSE203_Course_Wrapup_Slides.html` · เว็บ `wrapup/` — 42 หน้า: เส้นทาง 17 สัปดาห์ · ระบบที่โตทุกสัปดาห์ · สรุปทีละหน่วย · สถาปัตยกรรมเต็ม · วิธีส่งงาน · คะแนน A1–A7 · Final Term Project (บทบาท · หัวข้อ · R1–R8 · checker · milestone · คะแนน) · สอบปลายภาค (3 ส่วน · take-home · Part 2 · สัมภาษณ์ · ตารางวันสอบ) · กำหนดส่งของฉัน (เลือก Section + นับถอยหลัง) · ปฏิทินตุลาคม · เช็กลิสต์ · กติกา · FAQ · 12 ภาพ SVG · quiz 4 ข้อ

### เอกสารรายวิชา

- `README.md` (ตาราง LAB · สื่อออนไลน์ W12–13 · แผนผังหน่วยตาม มคอ. v2 · การประเมิน) · `docs/course-assessment.md` ตามผังใหม่

## v7.10.1 — ข้อควรระวัง Challenge Turso จาก feedback ผู้ช่วยสอน

ผู้ช่วยสอนทดลองทำ Week 11 แล้วเสนอ 4 ข้อ — ตรวจแล้วถูกต้องทุกข้อ (ข้อ ② ยืนยันด้วยการลบ libsql ออก: checker และ `npm test` ยังผ่าน · error เฉพาะตอนตั้งค่า Turso)

1. script `build` ต้องมี `npm install --prefix api` · `libsql` ต้องอยู่ใน dependencies
2. dynamic import `await import('libsql')` — เครื่องที่ไม่มี libsql ยังใช้ node:sqlite ได้
3. **`libsql` (sync) ไม่ใช่ `@libsql/client` (async)** — เดิมยังไม่มีในเอกสาร · ตัวหลังทำให้กระทบ controller ทั้งชุด
4. URL/token ห้ามอยู่ใน `.env.example` หรือ git

### ปรับ

- Take-Home: กล่อง "ข้อควรระวัง 4 ข้อ" ก่อนขั้นที่ 1 · เตือน libsql ≠ @libsql/client ในขั้นที่ 2 · คอมเมนต์เหตุผล dynamic import · คำสั่งตรวจ token ก่อน push · ตารางแก้ปัญหา +2 แถว
- คู่มือ Deploy: 11.2 ข้อควรระวัง + ภาพที่ 7 (libsql กับ @libsql/client) · ตารางแก้ปัญหา · ตารางความปลอดภัย
- เอกสาร 7.3 กล่องข้อควรระวัง · บท 8 เพิ่มแถว "Turso ผ่าน @libsql/client → 2 ชั้น"
- สไลด์ Turso: กล่องเตือน libsql ≠ @libsql/client
- โค้ดเฉลย: คอมเมนต์ข้อควรระวังใน service · Step Script 13.2

## v7.10.0 — Challenge ⭐⭐ ข้อมูลถาวรด้วย Turso (Week 11)

**เหตุผล** — Render free tier ใช้ ephemeral filesystem · `campus.db` กลับเป็นเวอร์ชันใน git ทุก restart · Turso เป็น SQLite บนอินเทอร์เน็ต free tier ไม่ต้องใช้บัตร

### โค้ด (reference)

- service เพิ่ม `openDatabase()` — เลือกฐานข้อมูลจาก env: ไม่มี `TURSO_DATABASE_URL` → `node:sqlite` ไฟล์เดิม · มี → `libsql` (โหลดแบบ dynamic เฉพาะตอนใช้)
- health check บอก `driver: sqlite | turso`
- `api/package.json` เพิ่ม `libsql` · `.env.example` (starter + reference) เพิ่ม `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` ค่าว่าง · `render.yaml` มีตัวอย่าง `sync: false`

### checker (W11 · starter + reference)

- ลบตัวแปร Turso ก่อนรัน — ใช้ฐานข้อมูลชั่วคราวในเครื่องเสมอ ไม่เขียนข้อมูลทดสอบขึ้น Turso
- CP26 รับ `libsql` / `new Database` ได้ด้วย · ตัวเลขเดิม (41 ข้อ · Challenge ⭐⭐ ตรวจจาก health + หลักฐาน Manual Deploy)

### ทดสอบ (ด้วย sqld — server open source ตัวเดียวกับที่ Turso ใช้)

- ต่อผ่าน HTTP: สร้างตารางจาก schema.sql อัตโนมัติ · check-week07 36/36 · check-week10 31/31 · check-week11 41/41 บนฐานข้อมูลระยะไกล
- auth token แบบ JWT (EdDSA): token ถูก → ใช้งานได้ · ผิด/ไม่ใส่ → 401 พร้อมข้อความใน log
- จำลอง Render (clone สะอาด · build แบบ production) → เพิ่มข้อมูล → redeploy บนเครื่องใหม่ → **ข้อมูลยังอยู่**
- checker ที่รันขณะตั้งค่า Turso ไว้ ไม่สร้างตารางใดใน server
- ยังไม่ได้ทดสอบกับบริการ Turso จริงบนอินเทอร์เน็ต — แนะนำผู้สอนลองกับบัญชีจริงก่อนประกาศ

### เอกสาร

- Take-Home: Challenge ⭐⭐ 6 ขั้น · ความปลอดภัยของ token · ตารางแก้ปัญหา · เกณฑ์คะแนนโบนัส
- คู่มือ Deploy: ส่วนที่ 11 (ภาพสถาปัตยกรรม Render + Turso · ขั้นตอน · ผู้สอน · ขอบเขตการทดสอบ) · 6 ภาพ
- เอกสารประกอบการสอน: 7.3 (ภาพ + ทายก่อนอ่าน "แก้กี่ชั้น") · บท 8 ตาราง "sync/async ไม่ใช่ SQL/NoSQL" · บท 9 แถว Week 11 ⭐⭐ · 10 ภาพ
- สไลด์ 41 หน้า: สไลด์ Turso (ภาพ + quiz) · ตารางสรุปหน่วย · recap บท 7
- Step Script 13.2 · README W11

## v7.9.0 — ทบทวน Week 11 ทั้งหมด · แก้บั๊ก deploy จริง 3 จุด · คู่มือ Deploy มีภาพประกอบ

**วิธีตรวจ** — จำลองสิ่งที่ Render ทำครบทุกขั้นบนสำเนาสะอาด (clone ใหม่ · `NODE_ENV=production` ตั้งแต่ build · `PORT=10000`) และอ้างอิงสเปก Render ปัจจุบัน

### บั๊กที่ทำให้ deploy ไม่ได้จริง (แก้แล้ว)

1. **bundle ฝัง `localhost:3001`** — `apiClient` ใช้ค่าเริ่มต้น localhost · ทดสอบในเครื่องดูเหมือนผ่านเพราะบังเอิญเป็น server ตัวเดียวกัน แต่บน cloud เบราว์เซอร์ผู้ใช้ยิงไปหาเครื่องตัวเอง → เพิ่ม `frontend/.env.production` (`VITE_API_BASE_URL=` ว่าง)
2. **หน้าแรก `/` ตอบ JSON** — route ต้อนรับจาก Week 06 อยู่ก่อน static · ผู้ใช้เปิด URL เห็น JSON → ย้ายไป `/api` · `/` ตอบ JSON เฉพาะ dev
3. **`vite: not found` ตอน build บน cloud** — Render ตั้ง `NODE_ENV=production` ตั้งแต่ build ทำให้ข้าม devDependencies → root `package.json` script `build` ใช้ `--include=dev`

### ไฟล์ deploy ให้ตรงสเปกปัจจุบัน

- `render.yaml`: `runtime: node` (แทน `env:` เดิม) · `plan: free` · `region: singapore` · `rootDir` · `healthCheckPath: /api/health` · `NODE_VERSION=22` · ตัด `PORT` ที่ hardcode ออก
- เพิ่ม root `package.json` (build/start/check) · `.node-version` · `.gitignore` ระดับโปรเจกต์
- ลบ import ซ้ำ (`express0`) ใน app.js
- CI workflow build แบบเดียวกับ cloud

### checker Week 11 (36 → 41 ข้อ)

- แก้ตัวหารไม่คงที่ (เปิด API ไม่ได้แล้วเหลือ 34) — บันทึกครบทุกข้อทั้งสองกรณี
- เพิ่ม: production `/` ได้หน้าเว็บ · bundle ไม่มี localhost · มี `.env.production` · root build/start + `--include=dev` · render.yaml ตามสเปก
- ทดสอบว่าจับบั๊กทั้ง 3 ได้จริง · reference 41/41 · starter 18/41 · W10 31/31 · W07 36/36

### เอกสาร · สไลด์ · คู่มือ

- **ใหม่: คู่มือ Deploy ขึ้น Render** (`week11/deploy-guide.html`) — 10 ส่วน · 5 ภาพ · มีส่วนสำหรับผู้สอน (deploy เดโม · ก่อนเข้าคาบ · ตรวจงาน)
- เอกสารบท 6 เพิ่ม 6.3 กับดัก production (SVG + ทายก่อนอ่าน) · บท 7 เขียนใหม่ (SVG ขั้นตอน Render · render.yaml ถูกสเปก) · 9 ภาพ
- สไลด์ 40 หน้า: เพิ่มสไลด์กับดัก 2 ข้อ (SVG + quiz) · แก้ CP39/เตรียม deploy/จำลอง production/A4
- Take-Home เขียนใหม่ทั้งไฟล์ · In-Class CP39 เขียนใหม่ · Live-coding CP39 ใหม่ · Step Script เพิ่มช่วงสาธิตกับดัก

### checker ทุกสัปดาห์ที่ใช้ supertest (W07 · W10 · W11)

- **หา supertest จาก `api/` ได้** — เดิม `import('supertest')` หาได้เฉพาะ node_modules ระดับบนสุด แต่คู่มือให้ติดตั้งใน `api/` · เครื่องนักศึกษาจึงขึ้น "เปิด API ไม่ได้" ทั้งที่งานถูก · ทดสอบแล้วว่าผ่านเมื่อมีแค่ `api/node_modules`
- **ไม่เขียนข้อมูลทดสอบลง `campus.db` ตัวจริง** (W10 · W11) — ใช้ฐานข้อมูลชั่วคราวใน tmp แล้วลบทิ้ง · เดิมทุกครั้งที่รัน checker มีรายการทดสอบค้างใน campus.db ที่นักศึกษาต้อง commit และไปโชว์บนเว็บที่ deploy
- สร้าง `campus.db` ของเฉลย W10 · W11 ใหม่จาก schema (5 คำร้อง · 4 ผู้ใช้ — เดิม W11 มีข้อมูลทดสอบค้าง)

### ความสอดคล้องทั้งหน่วย (W09–W11 ตามมาตรฐาน W07)

- เพิ่ม "โครงสร้างที่ต้องมีใน Student Repository" `labs/week-NN/source/` + `evidence/` + `AI_USAGE.md` ในทั้ง 3 สัปดาห์
- W10 รับของจาก W09 ด้วย path จริง (`labs/week-09/source/schema.sql`) · W11 ตั้งต้นจาก `labs/week-10/source`
- Root Directory บน Render = `labs/week-11/source`

## v7.8.0 — ตรวจ Week 11 ครั้งสุดท้าย · แก้จุดที่ตกหล่น

**จากการตรวจครบก่อนปิด Week 11 พบและแก้**

- **ส่วน "ส่งอย่างไร (frontend+backend)" หายไป** — ตอนแก้ CP43 (v7.7) replace บล็อกทับส่วนนี้โดยไม่ตั้งใจ → กู้กลับ: push ทั้ง repo · ตาราง commit/ไม่ commit · วิดีโอ 2 ช่วง · เกณฑ์คะแนน A4
- **starter checker เป็นเวอร์ชันเก่า (/34)** — reference เป็น /36 หลังปรับ CP43 · denominator ไม่ตรง → ก็อป checker ใหม่ · starter 18/36 → reference 36/36
- **เลข checker เป้าหมายเก่าตกค้าง** — README (30/34, 34/34) · step script (34/34, 18/34) · README_LAB_CODE (18/34, 34/34) → แก้เป็น 32/36 · 36/36 · 18/36 ทุกที่

### ตรวจครบทุกมิติ (ผ่านหมด)

- โครง 11 ชิ้นครบเท่า W09/W10
- checker: reference W11 36/36 · W10 31/31 · W07 36/36 · starter 18/36
- สไลด์ 39 หน้า · เอกสาร 9 บท · marker ชี้ทิศถูก · JS valid
- ลิงก์ live-coding ครบทั้ง README + In-class guide
- ชื่อโฟลเดอร์ week-11-fullstack-integration · guide LAB11 · ไม่มี mongodb นำหน้า
- เนื้อหาทาง C ครบ: CP43 จำลอง production บังคับ · Render จับมือทำเป็น Challenge · ephemeral เป็นบทเรียน
- starter เปิด server ได้ก่อนทำ TODO

## v7.7.0 — ปรับ deploy เป็นทาง C (จำลองในเครื่องบังคับ + Render จับมือทำเป็น Challenge)

**เหตุผล** — นักศึกษายังไม่เคยใช้ cloud/ไม่เคย set server · deploy เดิมกระโดดไป cloud เร็วเกินไป (แค่ "push แล้วเชื่อม Render" 4 บรรทัด)

### CP43 เปลี่ยนจาก "deploy" เป็น "จำลอง production ในเครื่อง" (ทุกคนทำ)

- `npm run build` + `NODE_ENV=production npm start` → เปิดพอร์ตเดียวได้ทั้งเว็บและ API
- อุปมา "ซ้อมใหญ่ก่อนแสดงจริง" — เข้าใจ production เต็มโดยไม่ต้องใช้ cloud
- ไม่มีใครตกขบวนเพราะปัญหาเน็ต/บัญชี

### Challenge — Render จับมือทำละเอียด 5 ขั้น (สำหรับคนพร้อม)

- สมัคร (Sign in with GitHub ไม่ต้องบัตรเครดิต) → New Web Service → กรอกค่าตามตาราง → รอ build → ได้ URL
- บอกชัดว่าเห็นหน้าจออะไร กดปุ่มไหน region ไหน (Singapore)
- **ระบุ 2 ข้อจำกัด free tier ตรง ๆ** เป็นบทเรียน: cold start 30–60 วิ (ไม่ใช่พัง) · ephemeral filesystem ทำให้ SQLite หายทุก restart → โยงบท 7 ว่าทำไมระบบใหญ่ใช้ DB แยกเครื่อง
- (ข้อมูล Render ปัจจุบัน 2026: free spin down 15 นาที · ไม่ต้องบัตรเครดิต · region Singapore)

### ปรับให้สอดคล้อง

- เอกสารบท 7: เพิ่มหัวข้อ 7.1 "จำลอง production ในเครื่อง" ก่อน · cloud เป็นก้าวถัดไป (อ่านเข้าใจภาพ)
- สไลด์: เพิ่มสไลด์ "จำลอง production ในเครื่อง" (39 หน้า) · deploy cloud = Challenge
- checker CP43: ตรวจ production build (dist/) + static serving แทนบังคับ deploy config · reference 34 → 36/36
- step script + blueprint: CP43 = จำลอง production · deploy Render สาธิตได้ ไม่บังคับ

## v7.6.0 — เปลี่ยนชื่อโฟลเดอร์ Week 11 · เพิ่มลิงก์ live-coding · ปรับวิธีส่งงาน A4

### ① เปลี่ยนชื่อโฟลเดอร์ (MongoDB เป็นภาคผนวกแล้ว)

- `week-11-mongodb-fullstack` → **`week-11-fullstack-integration`** (ชื่อตรงเนื้อหาจริง)
- แก้ทุกลิงก์ใน README หลัก · README W11 · เว็บ
- README W11: แก้หมายเหตุให้ชัดว่า MongoDB เป็นภาคผนวก (บท 8 อ่านเพิ่มเติม)

### ② เพิ่มลิงก์ Live-Coding ใน In-Class Guide ทั้ง 3 สัปดาห์

- เดิม In-Class guide (W09/W10/W11) ไม่มีลิงก์ไป live-coding เลย (มีแต่ใน README)
- เพิ่มตาราง "หน้าจอ Live-Coding" — W09 3 ลิงก์ · W10 5 · W11 5

### ③ ปรับวิธีส่งงาน A4 (Week 11) — frontend + backend

- อธิบายว่าโปรเจกต์มีทั้ง `frontend/` + `api/` ใน repo เดียว → push ทั้ง repo ครั้งเดียว
- ตารางบอกชัดว่า commit อะไร / ไม่ commit อะไร (node_modules, .env, dist)
- **CP42 วิดีโอ 2 ช่วง** — ช่วง A สาธิตระบบ · **ช่วง B อธิบาย source code** (พิสูจน์ว่าเข้าใจ ไม่ใช่แค่ทำตาม)
- เพิ่มเกณฑ์คะแนน A4 — อธิบาย source 30%

### ④ อื่น ๆ ที่เจอและแก้

- ปุ่ม GitHub ในเว็บ (roadmap) ยังใช้เลข LAB เก่า (เลื่อน 1) — แก้ให้เลข LAB = สัปดาห์ทุกปุ่ม

### ตรวจแล้ว

- checker W11 34/34 หลังเปลี่ยนชื่อ · ไม่ regression
- ลิงก์ live-coding ใน guide ทั้ง 3 สัปดาห์ชี้ไฟล์จริง
- ไม่มีชื่อโฟลเดอร์เก่าตกค้าง (นอก CHANGELOG)

## v7.5.0 — เพิ่ม SVG และ interactive ใน Week 11 ให้เข้มข้นเท่า Week 09/10

**เหตุผล** — Week 11 สไลด์น้อยไป (33 หน้า) SVG/interactive บางกว่าสัปดาห์อื่น

### สไลด์ 33 → 38 หน้า

- **Config Tracer** (interactive) — กดสลับ dev/production เห็นว่า config อ่านค่าต่างกันแต่โค้ดไม่เปลี่ยน
- **Request Router** (interactive) — กดดูว่าแต่ละ path (/ vs /api) ไปไหนตอน production
- **SVG การเดินทางของ config** — .env → process.env → config → โค้ด
- **SVG deploy pipeline** — push → build → start → health → ออนไลน์
- **quiz health check** — DB พังควรตอบ 200 หรือ 503
- SVG ในสไลด์ 2 → 4 · interactive 5 → 12 · whybox 3 → 4

### เอกสาร 5 → 7 SVG

- **SVG config flow** (บท 3) — ค่าไหลทางเดียว ตั้งต้นทาง อ่านปลายทาง
- **SVG health check flow** (บท 4) — cloud เรียก → เช็ค DB → 200/503
- **predict box บท 2** — สลับลำดับเปิด frontend ก่อน API จะเกิดอะไร
- predict 7 → 8

### ตรวจแล้ว

- marker ทุก SVG ชี้ทิศถูก (render ยืนยันด้วยตา)
- JS สไลด์ valid · interactive ใหม่ทั้ง 2 ตัว element + handler ครบ
- checker ไม่กระทบ (แก้แค่สไลด์/เอกสาร)

## v7.4.0 — สร้างสัปดาห์ที่ 11 ครบชุด · ปิดหน่วยที่ 4

**บูรณาการเป็นระบบจริงที่ deploy ได้** — ตัด MongoDB/async ออกจากการลงมือ (เหลือบทอ่านเพิ่มเติม) ตามที่ตกลง

### ชิ้นงานครบชุด (เท่า Week 09/10)

- **starter + reference + checker** — check-week11.mjs (starter 18/34 → reference 34/34) · W10 31/31 · W07 36/36 ไม่ regression
- **เอกสารประกอบการสอน** 9 บท · 5 SVG (ระบบ 3 ชั้น · dev vs prod · SQL/NoSQL · sync/async · เส้นทาง Unit 4)
- **สไลด์** 33 หน้า · 9 บท · interactive health check (กดดู 200/503) · quiz 3 ข้อ
- **LAB Guide** In-Class (CP35–39) + Take-Home (งาน A4 · CP40–43)
- **Step Script** 300 นาที
- **Live-Coding** 5 ไฟล์ CP35–39 · footer/nav/hud/copy ครบ

### เนื้อหา

- CP35 รันระบบ 3 ชั้น · CP36 env config · CP37 health check · CP38 error+logging · CP39 production build
- บท 8 อ่านเพิ่มเติม — SQL/NoSQL/async (รู้จัก ไม่ลงมือ) · ตอบ CLO5
- reference: config.js · healthRoutes.js · getDbStatus() · production static serving · render.yaml · README · DATABASE_CHOICES.md · DEMO.md · CI

### ปิดหน่วยที่ 4

- roadmap เว็บ: สัปดาห์ 11 จาก "เร็ว ๆ นี้" → ลิงก์จริง
- README หลัก: แถว 11 + ชื่อ LAB
- สรุป Unit 4 — เปลี่ยนแหล่งข้อมูล 4 ครั้ง แก้ชั้นเดียวทุกครั้ง

## v7.3.0 — เติม Live-Coding Week 09 + จัดไฟล์ starter Week 10 ให้ตรงเรื่องราว

### ① เพิ่ม Live-Coding Week 09 (ให้สมมาตรกับ Week 07/10)

- สร้าง 3 ไฟล์ตามที่ลงมือจริงในคาบ — CP17 (SELECT/WHERE/ORDER BY) · CP19–20 (สร้างตาราง + CRUD) · CP21 (JOIN)
- CP18 (ออกแบบตาราง) ทำบนกระดาษ ไม่มีหน้า live-coding
- footer/nav/hud ครบเหมือน Week 07/10 · CP17 มีขั้น ⓪ วาง playground-seed ก่อน
- เพิ่มตาราง live-coding ใน README สัปดาห์ 9 และแถวสัปดาห์ 9 ในตารางสื่อหลัก

### ② จัดไฟล์ starter Week 10 ให้ตรงเรื่องราว "รับของจากสัปดาห์ที่ 9"

- **ย้าย schema.sql ออกจาก starter** — นักศึกษาต้องเอามาจากงาน W09 ของตัวเอง (starter เดิมแจกให้เลย ขัดกับบทเรียน)
- ย้ายไป `_instructor-private/backup/` พร้อม campus.db สำรอง + README อธิบายว่าแจกเมื่อไร (เฉพาะคนที่จำเป็น)
- เพิ่มขั้น ⓪ "รับของจากสัปดาห์ที่ 9" ใน LAB10 In-Class Guide
- `npm run db:setup` แจ้ง error ชัดเมื่อไม่มี schema ("ขอไฟล์สำรองจากผู้สอน")

### ③ ลบไฟล์ JSON เก่าที่ค้างใน starter Week 10

- ลบ `requests.json` + `initialRequests.json` (W10 ใช้ฐานข้อมูลแล้ว ไฟล์เก่าทำให้สับสน)
- แก้ `.gitignore`: เอา requests.json ออก · เพิ่ม test.db · campus.db commit ได้ (ตามคู่มือ)
- เพิ่มโน้ต commit campus.db ใน LAB10 Take-Home (ให้ตรงกับ W09)

### ตรวจแล้ว

- checker: W09 30/30 · W10 31/31 · W07 36/36 (ไม่ regression)
- live-coding W09 ทั้ง 3 ไฟล์: footer/nav/hud/copy ครบ · nav ชี้ไฟล์จริง · JS valid
- เส้นทางกู้คืน (backup → db:setup) ทำงานจริง

## v7.2.0 — เพิ่ม playground-seed.sql สำหรับ CP17

**เหตุผล** — CP17 ให้นักศึกษารัน `SELECT * FROM requests` บน SQL playground (sqlime.org) แต่ playground เริ่มเป็นฐานข้อมูลเปล่า · ถ้ายังไม่สร้างตารางจะได้ `no such table: requests` · และ `schema.sql` ใน starter เป็น TODO (ยังเขียนไม่เสร็จ) จึงใช้ตอน CP17 ไม่ได้

- เพิ่ม **`lab09/starter/playground-seed.sql`** — ไฟล์สำเร็จรูป คัดลอกวางใน playground แล้วกด Run ได้ทันที
  - มี CREATE TABLE 2 ตาราง + INSERT ข้อมูลตัวอย่าง (users 4 · requests 5) + SELECT ทดสอบ
  - ทดสอบแล้วว่าทั้ง 3 คำสั่งใน CP17 (SELECT *, เลือกคอลัมน์, AS) รันได้จริง
- เพิ่ม **ขั้น ⓪ เตรียม playground** ใน LAB09 In-Class Guide ก่อนหัวข้อ ① SELECT
  - อธิบายว่าต้องวาง seed ก่อน และทำไมต้องวางใหม่ทุกครั้งที่เปิด playground
- เพิ่มกล่องเตือนในสไลด์ CP17 + ปรับกล่องข้อควรระวังในเอกสาร (หัวข้อ 0.4)
- เพิ่ม checklist ผ่าน CP17: ต้องวาง seed เห็น 5 แถวก่อน
- ก็อป playground-seed.sql ไว้ใน reference ด้วย (ผู้สอนใช้ฉาย/แจก)
- หมายเหตุ: ทางสำรองออฟไลน์ (try.mjs ในเอกสาร 0.4) มีเนื้อหา CREATE+INSERT เดียวกันอยู่แล้ว

## v7.1.0 — เพิ่ม footer/nav/hud ที่ขาดใน Live-Coding Week 10

**เหตุผล** — Live-Coding Week 10 ทั้ง 5 ไฟล์ขาดส่วนท้ายที่ Week 07 มี · เกิดตอนดึง template โดยตัดที่ตำแหน่ง `<script>` จึงทิ้ง footer + nav + hud ที่อยู่ก่อนหน้าไปโดยไม่ตั้งใจ

- เพิ่ม **footer** — ชื่อ CP + ลิงก์ไปบทในเอกสารประกอบการสอน
- เพิ่ม **nav** — ปุ่มข้ามระหว่าง CP26–CP30 ไฮไลต์ตำแหน่งปัจจุบัน
- เพิ่ม **hud** — ปุ่ม A− / A+ / เต็มจอ (JS มีอยู่แล้ว แค่ขาดปุ่ม)
- ตรวจแล้ว: ทั้ง 5 ไฟล์ footer/nav/hud ครบ · ปุ่มข้าม CP ชี้ไฟล์จริง · div ปิดสมดุล · โครงตรงกับ Week 07
- ก็อปตรงกันทั้ง repo และเว็บ

## v7.0.0 — จัดเลข LAB ให้ตรงเลขสัปดาห์ และเปลี่ยนชื่อโฟลเดอร์ให้ตรงเนื้อหา (breaking)

**เหตุผล** — เลข LAB เดิมเลื่อนจากเลขสัปดาห์เพราะมีสอบกลางภาคคั่น (สัปดาห์ 9 = LAB08) ทำให้สับสน · และชื่อโฟลเดอร์สัปดาห์ 10–11 ยังเป็นแผนเก่า (MongoDB) ทั้งที่เนื้อหาเปลี่ยนแล้ว

### เปลี่ยนชื่อโฟลเดอร์ให้ตรงเนื้อหาจริง

| เดิม | ใหม่ |
|---|---|
| `week-09-sqlite-crud` | `week-09-sql-fundamentals` |
| `week-10-mongodb-mongoose` | `week-10-node-database` |
| `week-11-fullstack-integration` | `week-11-fullstack-integration` |

### เลข LAB = เลขสัปดาห์ (ทุกที่)

- สัปดาห์ 9: `lab08/` → `lab09/` · `LAB08_*_GUIDE` → `LAB09` · tag `lab-08` → `lab-09`
- สัปดาห์ 10: `lab09/` → `lab10/` · `LAB09_*_GUIDE` → `LAB10` · tag `lab-09` → `lab-10`
- สัปดาห์ 11–15: แก้เลข LAB ใน README ให้ = เลขสัปดาห์ (เดิมเลื่อน 1)
- CP ไม่เปลี่ยน (ยังนับต่อเนื่อง CP17–CP34)

### เพิ่ม Live-Coding ครบ (ข้อที่เคยขาด)

- Week 10 มี Live-Coding 5 ไฟล์ครบเหมือน Week 07 — CP26–CP30
- รูปแบบเดียวกับ Week 06/07 (step · say · warn · check · copy)

### ตรวจแล้วทั้งหมด

- checker: W09 ref 30/30 · W10 ref 31/31 · W10→W07 36/36 · หลังเปลี่ยนชื่อทุกอย่างยังผ่าน
- README ทุกสัปดาห์: สัปดาห์ = LAB = ชื่อโฟลเดอร์ ตรงกันหมด
- ตารางสื่อการสอน + ปุ่มลิงก์ทุกแถวตรงสัปดาห์
- tag submission · branch · path ในคู่มือและ step script ตรงกันหมด
- ไม่มีเลข LAB เก่าหรือชื่อโฟลเดอร์เก่าตกค้าง (ยกเว้นใน CHANGELOG ที่เป็นประวัติ)

## v6.8.0 — แก้ SVG · เพิ่ม SQL playground · เติม Week 10 ให้ครบ

### ① แก้ภาพ SVG ทุกไฟล์

- **หัวลูกศรวาดผิดทิศ 5 จุด** — `orient="auto"` หมุน marker ให้ +X ตรงกับทิศเส้น แต่เดิมวาดชี้ลง/ขึ้น จึงเรนเดอร์เป็น `<` แทนลูกศร
  - แก้ทุก marker ให้วาดชี้ +X แล้วปรับ `refX`/`refY` ตาม
- **เส้นทับข้อความ 5 จุด** — ที่ชัดที่สุดคือเส้นจาก Service ไป `campus.db` พาดผ่าน `api/src/services/`
  - เปลี่ยนเป็นเส้นหักมุม และขยับกล่อง `campus.db` ลงให้พ้นป้ายชื่อโฟลเดอร์
  - ขยับป้าย `FK` ใน W09 ให้พ้นเส้นประ
- ตรวจด้วยสคริปต์ทั้ง 4 ไฟล์ แล้ว render เป็นภาพยืนยันด้วยตา

### ② Week 09 — เพิ่มข้อมูล SQL playground

- หัวข้อ 0.4 ในเอกสาร + สไลด์ 2 หน้า — **ระบุเว็บที่ใช้ฟรีได้จริง**
  - **⭐ sqlime.org** (แนะนำ) — SQLite แท้ ทำงานในเบราว์เซอร์ ข้อมูลไม่ออกจากเครื่อง โหลดไฟล์ `.db` ได้
  - sqliteonline.com · db-fiddle.com (สำรอง)
  - ระบุว่า **W3Schools ไม่เหมาะ** เพราะไม่ใช่ SQLite
- เพิ่ม **ทางสำรองแบบออฟไลน์** — `try.mjs` ใช้ `node:sqlite` กับ `:memory:` ลอง SQL ได้โดยไม่ต้องใช้เน็ต
- อัปเดต LAB08 In-Class Guide ให้ตรงกัน
- สไลด์ 57 → **59 หน้า**

### ③ Week 10 — เติมของที่ขาด

- **เขียน README ใหม่ทั้งไฟล์** — เดิมยังเป็นโครงเก่าเรื่อง MongoDB จึงไม่มีลิงก์ไปหา LAB Guide ที่มีอยู่แล้ว
- **เพิ่ม Live-Coding 5 ไฟล์** — CP26 เปิด DB · CP27 กับดัก path · CP28 JOIN · CP29 แปลงชื่อเป็น id · CP30 CRUD + พิสูจน์ว่าไม่พัง
- เพิ่ม `_instructor-private/README.md` พร้อมรายการไฟล์สำรองที่ต้องเตรียม
- อัปเดตตารางสื่อและชื่อ LAB ใน README หลัก

## v6.7.0 — เพิ่มภาพประกอบ Week 09 และสคริปต์สร้างฐานข้อมูล Week 10

**เหตุผล** — Week 09 มีแต่ตัวหนังสือ จินตนาการยาก · และพบช่องว่างว่า `schema.sql` ที่ Week 09 สร้าง ไม่ถูกพูดถึงใน Week 10 เลย

### Week 09 — เพิ่มภาพและขอบเขต

- **SVG ใหม่ 2 ภาพ**
  - *ฐานข้อมูลประกอบด้วยอะไร* — Database → Table → Column/Row → Value เป็นลำดับชั้น พร้อม Primary/Foreign Key
  - *แผนผัง `campus.db` ฉบับเต็ม* — 2 ตาราง 12 คอลัมน์ พร้อมชนิดและ constraint ครบ **เป็นข้อกำหนดของงานที่ต้องส่ง**
- **หัวข้อใหม่ "ขอบเขตของสัปดาห์นี้"** — ตารางเทียบว่าเรียนอะไร ข้ามอะไร (Normalization, transaction, trigger, view ไว้เทอมหน้า)
  - ย้ำว่า SQL ที่ต้องเขียนได้จริงมีแค่ **6 คำสั่ง**
- เพิ่มสไลด์ 5 หน้า — ขอบเขต · โครงสร้างฐานข้อมูล · เทียบกับ Excel · แผนผังที่ต้องส่ง · การส่งมอบให้ W10
- สไลด์ 52 → **57 หน้า** · เอกสารมี **6 ภาพ**

### Week 10 — เพิ่มสคริปต์สร้างฐานข้อมูล

- **`api/scripts/setup-db.mjs`** ใหม่ พร้อม `npm run db:setup` และ `npm run db:reset`
  - รองรับ `--force` ล้างข้อมูลเริ่มใหม่ · `DB_FILE=` สร้างฐานข้อมูลทดสอบแยก
  - **รายงาน Foreign Key ให้ด้วย** — ถ้า schema จาก W09 ไม่ครบจะรู้ทันที ไม่ต้องรอไปพังตอน CP29
  - ใช้ `fileURLToPath(import.meta.url)` ตามบทเรียนเรื่อง path
- เพิ่มหัวข้อ 3.5 ในเอกสาร — ทำไมต้องมีสคริปต์ทั้งที่ `loadSeed()` สร้างให้อยู่แล้ว · ควร commit `campus.db` ไหม
- เพิ่มสไลด์ 2 หน้า — รับของจาก W09 (พร้อมทางแก้ถ้าไม่มี) · `npm run db:setup`
- สไลด์ 47 → **49 หน้า**

### บทบาทของสองสัปดาห์ (ชัดเจนขึ้น)

| | Week 09 | Week 10 |
|---|---|---|
| ทำอะไร | **ออกแบบและสร้าง** ฐานข้อมูล | **ใช้** ฐานข้อมูลจากโค้ด |
| แตะโค้ด | ไม่เลย | `requestService.js` ไฟล์เดียว |
| ส่งมอบ | `campus.db` · `schema.sql` · `queries.sql` | API ที่ใช้ฐานข้อมูลจริง |

### ทดสอบแล้ว

- `npm run db:setup` ทั้ง 3 โหมด (ปกติ · `--force` · `DB_FILE=`) ทำงานถูกต้อง
- checker Week 10 ยัง **31/31** · Week 07 ยัง **36/36**
- JS ของสไลด์ทั้งสองไฟล์ syntax ถูกต้อง

## v6.6.0 — เพิ่มสื่อ interactive และ SVG อธิบายลำดับชั้น

**เหตุผล** — เราเผยแพร่เป็นเว็บ จึงควรใช้ประโยชน์จากภาพและสื่อโต้ตอบที่หนังสือทำไม่ได้

### Interactive ใหม่ 4 ตัว

| สื่อ | อยู่ที่ | ทำอะไร |
|---|---|---|
| **Layer Tracer** | W10 | กดทีละขั้นดูคำขอเดินผ่าน 7 ชั้น พร้อม**ชื่อไฟล์จริง**และโค้ดที่ทำงานในชั้นนั้น |
| **Query Stepper** | W09 | กดดู `SELECT` ทำงานทีละขั้น FROM → WHERE → ORDER BY → SELECT พร้อมตารางที่แถวหายไปจริง |
| **JOIN visual** | W09 | กดจับคู่ทีละแถว เห็นว่า `ON` ทำงานอย่างไร และทำไมชื่อซ้ำในผลลัพธ์แต่ไม่ซ้ำในฐานข้อมูล |
| **Injection compare** | W10 | ส่งค่าอันตรายเข้าไป เห็น SQL ที่ได้จริงทั้งแบบต่อ string และ parameterized เทียบกัน |

### SVG ใหม่ 4 ภาพ

- **W10 ภาพที่ 2** — ลำดับชั้นหลังบ้านเทียบกับโฟลเดอร์/ไฟล์จริง พร้อมตาราง "แต่ละชั้นรู้อะไร ไม่รู้อะไร"
- **W09 ภาพที่ 2** — ลำดับที่เขียนกับลำดับที่ฐานข้อมูลทำงานจริง (และเหตุผลที่ใช้ alias ใน WHERE ไม่ได้)
- **W09 ภาพที่ 4** — กลไกการจับคู่ของ JOIN
- **W09** — ภาพ update anomaly ในสไลด์ (แก้ชื่อไม่ครบแล้วเป็นอย่างไร)

### อื่น ๆ

- สไลด์ W09 49 → **52 หน้า** · W10 44 → **47 หน้า**
- เพิ่มหัวข้อ 1.3–1.4 ในเอกสาร W10 — ลำดับชั้นและตารางว่าแต่ละชั้นรู้/ไม่รู้อะไร
- **ติดตั้ง Week 10 ลง repo ครบชุด** (`week-10-mongodb-mongoose/` — ชื่อโฟลเดอร์จะเปลี่ยนตอนจบสัปดาห์ 11)
- ทดสอบแล้ว: JS syntax ถูกต้องทั้งสองไฟล์ · ตรรกะ Query Stepper ตรงกับผล SQL จริง

## v6.4.0 — Week 09 ฐานข้อมูลเชิงสัมพันธ์และภาษา SQL (เริ่มหน่วยที่ 4)

- เพิ่มชุดสอน Week 09 ครบ: เอกสารประกอบการสอน 10 บท, สไลด์ 49 หน้า (10 บท), LAB Guide 2 ฉบับ, Step Script 300 นาที
- starter และ reference ใช้ `node:sqlite` ที่มากับ Node 22 — **ไม่ต้อง `npm install` อะไรเลย**
- เพิ่ม `check-week09.mjs` ตรวจโครงสร้างตาราง ข้อมูล และ constraint — 30 รายการ
- **data model 2 ตาราง** — `users` และ `requests` เชื่อมด้วย Foreign Key เพื่อสอนความสัมพันธ์ตาม มคอ. 4.1.1
- ⚠ **สัปดาห์นี้ไม่แตะโค้ด Node เลย** — เป็น SQL ล้วน เพื่อให้คล่องก่อนไปต่อ Node ในสัปดาห์ที่ 10
  - เหตุผล: นักศึกษายังไม่เคยเรียน SQL มาก่อน (จะได้เรียนวิชาฐานข้อมูลเทอมหน้า)
  - ถ้าสอน SQL + แนวคิดเชิงสัมพันธ์ + การต่อ Node พร้อมกัน จะเป็น 3 เรื่องใหม่ซ้อนกันในคาบเดียว
- เขียน README ของ `week-09-sqlite-crud` ใหม่ให้ตรงแผน (เดิมระบุว่า "SQL CRUD ร่วมกับ Node.js")
- สัปดาห์นี้ส่งมอบ `campus.db` · `schema.sql` · `queries.sql` เป็นอินพุตของสัปดาห์ที่ 10

## v6.3.0 — ปรับสไลด์และเอกสาร Week 06 ให้มีโครงบท

**ปัญหาที่แก้** — สไลด์ Week 06 เป็นหัวข้อเรียงกันโดยไม่มีเลขบท นักศึกษาไม่รู้ว่าอยู่ตรงไหนและจบหรือยัง
และเนื้อหางานที่บ้าน (CP07, CP08) ซึ่งคิดเป็น 70% ของคะแนน **ถูกระบุแค่ในรายการ ไม่ได้สอนเลย**

### เอกสาร `week06-teaching-doc.html` — เพิ่ม 2 บท

- **บทที่ 11 · Error Handling** — ปัญหาของ try/catch กระจาย · errorHandler 4 พารามิเตอร์ · notFound · ลำดับ · `next(err)`
- **บทที่ 12 · เก็บข้อมูลถาวร** — ระดับของการเก็บข้อมูล · รูปแบบอ่าน/เขียนไฟล์ · กับดัก 3 อัน · จุดที่ต้องเรียก persist
- บทที่ 11 เดิม (จากทฤษฎีสู่ Checkpoint) เลื่อนเป็นบทที่ 13 · เพิ่มกลุ่ม 4 ในสารบัญ

### สไลด์ — รวมเป็นไฟล์เดียว 66 หน้า มีโครง 12 บท

- เพิ่มสไลด์คั่นบท 12 · ป้ายบททุกสไลด์ 48 · สรุปท้ายบท 12 · กล่องเหตุผล 5 · แถบความคืบหน้า 24
- **เพิ่มเนื้อหาที่เคยขาด** — npm/package.json (บท 2.2) · หนึ่งคำขอตอบได้ครั้งเดียว (บท 6.3)
- **เพิ่มกลุ่ม 4** สอน CP07 และ CP08 ในห้องก่อนไปทำที่บ้าน
- เลิกใช้ `ENGSE203_Week06_Slides_Deluxe.html` — รวมเป็น `ENGSE203_Week06_Slides.html` ไฟล์เดียว

## v6.2.0 — API Contract template (Markdown + Word)

- เขียน `templates/api-contract-template.md` ใหม่ทั้งไฟล์ (เดิม 19 บรรทัด → ฉบับเต็มพร้อมคำอธิบาย)
  - มีตัวอย่างที่เขียนเสร็จแล้วจาก Campus Service API (GET, POST) เป็นแบบอย่าง
  - เว้นส่วน PUT และ DELETE ให้นักศึกษาเขียนเองตามรูปแบบเดียวกัน
  - มีคำอธิบายกำกับทุกหัวข้อว่า "มีไว้ทำไม" และเช็คลิสต์ก่อนส่ง 12 ข้อ
- เพิ่ม `templates/api-contract-template.docx` — ฉบับทางการสำหรับส่งลูกค้า/หน่วยงาน
  - ปก · สารบัญอัตโนมัติ · หัวท้ายกระดาษ · เลขหน้า · หน้าลงนามรับทราบ · 11 หน้า
- คัดลอกทั้งสองไฟล์ลง `week-07/lab07/starter/templates/` ให้นักศึกษาหยิบใช้ได้ทันที
- อัปเดต LAB07 Take-Home Guide หัวข้อ CP15 — อธิบายสัญลักษณ์ ✅/✍️ และเมื่อไรควรใช้ `.docx`

## v6.1.0 — เชื่อมสื่อการสอนบนเว็บเข้ากับ LAB repository

**ปัญหาที่แก้** — README ของ LAB ลิงก์ไฟล์ `.html` ใน `guides/` แบบ relative
ซึ่ง **GitHub ไม่ render HTML** นักศึกษาที่กดจะเห็นเป็นโค้ดดิบ เปิดใช้งานจริงไม่ได้

- เปลี่ยนลิงก์สื่อทั้งหมดใน README ให้ชี้ **GitHub Pages** (`se-rmutl.github.io/engse203`) ซึ่งเปิดได้ทันที
- เพิ่มหัวข้อ **"สื่อการสอนออนไลน์"** ใน README ของ LAB 05, 06, 07 พร้อมตารางหน้าจอ Live-Coding ครบทุก checkpoint
- เพิ่มตารางรวมสื่อทั้งรายวิชาใน README หลัก (สไลด์ · เอกสารประกอบ · live-coding แยกรายสัปดาห์)
- เติมไฟล์ live-coding ลง `guides/` ของแต่ละ LAB เพื่อให้ clone ไปเปิดออฟไลน์ได้
  - LAB 05 เพิ่ม 9 ไฟล์ (5A 4 · 5B 5) · LAB 06 เพิ่ม 6 ไฟล์ · LAB 07 เพิ่ม 4 ไฟล์
- ทุกลิงก์ตรวจแล้วว่าชี้ไฟล์ที่มีอยู่จริงบนเว็บไซต์รายวิชา

## v6.0.0 — ปรับผังสัปดาห์ให้ตรง มคอ. ฉบับ v2 (breaking)

**เหตุผล** — โครงสร้างหน่วยเรียนฉบับ v2 กำหนดหน่วยที่ 3 เป็น **สัปดาห์ที่ 6–7** (เดิมวางไว้ 6–8)
และสอบกลางภาค **สัปดาห์ที่ 8** (เดิม 9) ทำให้สัปดาห์ที่ 8 เป็นต้นไปเลื่อนลง 1 สัปดาห์ทั้งหมด

- **ลบ** `labs/week-08-api-integration/` — เนื้อหา (API contract, CORS, front-end integration) รวมเข้า `week-07-rest-validation` แล้ว
- **เปลี่ยนชื่อโฟลเดอร์** ให้ตรงสัปดาห์จริง (เลื่อนลง 1 ตั้งแต่สัปดาห์ 8)
  - `week-09-midterm` → `week-08-midterm`
  - `week-10-sqlite-crud` → `week-09-sqlite-crud`
  - `week-11-mongodb-mongoose` → `week-10-mongodb-mongoose`
  - `week-12-fullstack-integration` → `week-11-fullstack-integration`
  - `week-13-testing-debugging` → `week-12-testing-debugging`
  - `week-14-quality-security` → `week-13-quality-security`
  - `week-15-team-sprint-1` → `week-14-team-sprint-1`
  - `week-16-team-sprint-2-demo` → `week-15-team-sprint-2-demo`
  - `week-17-review` → `week-16-review` · `week-18-final` → `week-17-final`
- เลข LAB เลื่อนตาม — LAB 08 SQLite (สัปดาห์ 9) ถึง LAB 14 Team Sprint 2 (สัปดาห์ 15)
- อัปเดตตารางและแผนผังโฟลเดอร์ใน README หลัก
- ⚠ โฟลเดอร์ที่เปลี่ยนชื่อทั้งหมดยังเป็นโครง README เท่านั้น ยังไม่มีนักศึกษาใช้งาน จึงปรับได้โดยไม่กระทบใคร

## v5.3.0 — เพิ่มสไลด์บทนำ API Foundations

- เพิ่ม `ENGSE203_API_Foundations_Slides.html` (20 สไลด์ · 5 SVG) เป็นบทนำก่อนเข้า Week 06
- เติมช่องว่างที่ขาดไป: ทำไมต้องมี API · ทำไมเลือก API เป็นหลังบ้าน · REST มาจากไหน · RESTful แปลว่าอะไร
- ครอบคลุม 6 หลักการของ REST, Richardson Maturity Model, และเทียบ SOAP/REST/GraphQL/gRPC
- มี simulator ให้ลองแปลงความต้องการเป็น endpoint (รวมกรณียาก "ยืมหนังสือ" → `POST /loans`)
- อัปเดต Instructor Step Script Week 06 ให้มีช่วงบทนำ 30 นาที พร้อมจังหวะการเล่าและแผนตัดเวลา

## v5.2.0 — Week 07 เชื่อม Front-end กับ Back-end (ปิดหน่วยที่ 3)

- เพิ่มชุดสอน Week 07 ครบ: เอกสารประกอบการสอน 10 บท (7 ภาพ SVG), สไลด์ 23 หน้า, หน้าจอ live-coding 4 หน้า
- starter และ reference มีทั้ง `api/` (Express) และ `frontend/` (React) ในโฟลเดอร์เดียว
- เพิ่ม `check-week07.mjs` ตรวจทั้งสองฝั่ง — 36 รายการ แยก 🏫 ในห้อง / 🏠 ที่บ้าน / ⭐ challenge
- เนื้อหา: CORS, preflight, environment config, API client layer, loading/error state
- เพิ่ม `API_CONTRACT.md` ฉบับสมบูรณ์เป็นทั้งสื่อสอนและเฉลย
- เพิ่ม automated test ด้วย `node:test` + supertest (CP16) — นักศึกษาเขียนเอง 6 เคส
- `requestService.js` เปลี่ยนเป็นเรียก API โดยคง signature เดิมครบ — component ไม่ต้องแก้เลย
- ปิดหน่วยที่ 3: Week 06 สร้าง API ให้ทำงานได้ · Week 07 ทำให้ทั้งระบบใช้งานได้จริง

## v5.1.0 — Week 06 Node.js/Express RESTful API Foundation

- เพิ่มชุดสอน Week 06 ครบ: เอกสารประกอบการสอน 12 บท (9 ภาพ SVG), สไลด์ 2 เวอร์ชัน, หน้าจอ live-coding 6 หน้า
- เพิ่ม starter (TODO 19 จุด) และ reference solution ของ Campus Service API ด้วย Express 5
- เพิ่ม `check-project.mjs` ที่ยิง endpoint จริงด้วย supertest — 28 รายการ แยก 🏫 ในห้อง / 🏠 ที่บ้าน / ⭐ challenge
- แบ่งงานเป็น 3 ระดับ: In-Class (CP00–CP05 ทำเสร็จในคาบ), Take-Home (CP06–CP08), Challenge (คะแนนเพิ่ม)
- เพิ่ม Postman collection, API_TEST template และ AI_USAGE template
- endpoint ออกแบบให้ตรงกับ `requestService.js` ของ Week 05 เพื่อเชื่อมกับ React ใน Week 07
- เพิ่ม Instructor Step Script 300 นาที พร้อม Hint Ladder และแผนสำรอง

## v5.0.0 — Week 05 React Routing, Data Fetching & Browser Storage

- แยก Week 05 เป็น 2 คาบ: 5A Read Path (routing + data fetching) และ 5B Write Path (storage + recovery)
- เพิ่มเอกสารประกอบการสอน 5A/5B, สไลด์, Pre-LAB, LAB Guide, checkpoint cards และหน้าจอ live-coding
- เพิ่ม checker v2 (133 รายการ) ที่ตรวจพฤติกรรมจริงด้วย vitest + Testing Library
- ออกแบบ Service Layer ให้เปลี่ยนแหล่งข้อมูลได้โดยไม่แก้ UI — ปูทางไป REST API ใน Week 06–08
- LAB 05 เป็นงานชิ้นเดียว ส่งครั้งเดียวหลังจบคาบ 5B

## v4.0.0 — Unified Student Repository LAB01–04

- เปลี่ยน LAB รายบุคคลเป็นหนึ่ง Student Repository ตลอดรายวิชา
- กำหนด branch `lab/week-NN`, source/evidence/publish และ Pages Hub contract เดียวกัน
- เพิ่มคู่มือสร้าง Student Repository จาก Template ก่อน LAB01 สำหรับรุ่นถัดไป
- เพิ่ม migration workflow สำหรับรุ่นปัจจุบันที่มี repo LAB01–03 แยกแล้ว
- ปรับ LAB01–04, Vite build, PR, tag และ submission ให้สอดคล้องกัน
- Student solution ยังคงแยกจาก Course Repository สาธารณะ

## v3.1.0 — Week 04 React Guided Practice & LAB 4

- เพิ่ม Pre-LAB 04 แบบ CP00–CP07 รวม 240 นาที สำหรับผู้เริ่ม React
- เพิ่ม Study Task Board starter, checkpoint snapshots, instructor script และ verified solution
- เพิ่ม LAB 4 Campus Service Request starter, requirements, grading checklist, verifier และ instructor solution
- เชื่อม JSX, components, props, state, events, controlled form, list/filter/delete, responsive UI และ GitHub Pages โดยไม่ล้ำ Week 05
- ปรับ README หลักและ Week 04 hub ให้แยก guided practice ออกจาก independent homework ชัดเจน

## v3.0.0 — Unified Setup Guide: Node.js 22+, GitHub SSH & VS Code

- เพิ่ม `docs/setup/` เป็น Setup Hub แยกเส้นทางชัดเจนสำหรับ macOS และ Windows 11 + WSL2
- กำหนด baseline ของรายวิชาเป็น Node.js `>=22.12.0`; เพิ่ม `.nvmrc` และ `engines.node` ใน starter ของ LAB 02
- เพิ่มคู่มือ Git commit identity, SSH key แบบตั้งชื่อไฟล์, GitHub account, multiple accounts และการวิเคราะห์ permission error
- เพิ่มคู่มือ VS Code: GitHub sign-in, Source Control, Remote - WSL และ extension IDs ที่ใช้ในรายวิชา
- เพิ่ม `scripts/verify-setup.mjs` และ Verification Checklist สำหรับตรวจ environment และทดสอบ clone/commit/push จริง
- ปรับ README และ LAB 01–02 ให้ชี้ไปยัง Setup Guide v3

## v2.0.0 — WSL 2, Development Environment & GitHub SSH Setup

- เพิ่ม **Part 1**: คู่มือติดตั้งและตั้งค่า Windows 11 + WSL 2 + Ubuntu 24.04 LTS
- เพิ่ม **Part 2**: รายการโปรแกรม checklist ขั้นตอนติดตั้ง macOS/WSL, Node.js LTS, VS Code extensions, Git และ GitHub SSH key
- ปรับมาตรฐาน Windows ของรายวิชาให้ใช้ VS Code Remote - WSL และ Ubuntu WSL สำหรับ Node.js, npm, Git และ SQLite
- ปรับคู่มือ Cross-platform Setup เป็น quick reference ที่เชื่อมไปยังเอกสาร Setup v2
- ปรับ LAB 01 ให้ใช้ workspace ที่เหมาะสมกับ macOS และ Ubuntu WSL และใช้ GitHub remote แบบ SSH
- เพิ่มแนวทางความปลอดภัยของ SSH key, line ending และการเก็บ source code ใน Linux filesystem

## v0.1.0 — Initial course repository

- สร้างโครงสร้าง Repository สำหรับ ENGSE203
- เพิ่ม README ภาพรวมรายวิชาและแผน LAB สัปดาห์ที่ 1–18
- เพิ่มใบงาน LAB 01 แบบละเอียด พร้อม starter files และ checklist
- เพิ่มเอกสารมาตรฐานการส่งงาน, Cross-platform setup และแนวปฏิบัติด้าน AI
- เพิ่ม placeholder README สำหรับ LAB/กิจกรรมที่เหลือ เพื่อทยอยเผยแพร่รายละเอียดรายสัปดาห์
