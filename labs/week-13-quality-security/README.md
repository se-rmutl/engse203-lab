# LAB 13 — พัฒนาอย่างปลอดภัยและพร้อมส่งมอบ

**สัปดาห์ที่ 13** · หน่วยที่ 5 คุณภาพซอฟต์แวร์ การทดสอบ และความพร้อมก่อนใช้งาน · **ช่วงบ่าย · ปิดหน่วย** · CLO6 · งาน A5 คุณภาพและความปลอดภัย

> สอนต่อจาก [LAB 12](../week-12-testing-debugging/) ในวันเดียวกัน — บ่าย 13:00–16:00
> Sec 1 วันจันทร์ที่ 5 ต.ค. · Sec 2 วันพฤหัสบดีที่ 8 ต.ค.

---

## เริ่มตรงไหน

| ลำดับ | ทำเมื่อไร | เปิดไฟล์ |
|---|---|---|
| 1 | พักกลางวัน | [เอกสารประกอบการสอน](https://se-rmutl.github.io/engse203/week13/week13-teaching-doc.html) **บทที่ 1 และ 3** |
| 2 | ในคาบ | [`lab13/LAB13_INCLASS_GUIDE_TH.md`](lab13/LAB13_INCLASS_GUIDE_TH.md) |
| 3 | หลังคาบ | **ไม่มีงาน take-home แยก** — งานต่อจากคาบเป็นข้อกำหนดของ [Final Term Project](../final-term-project/) |

## สื่อการสอนออนไลน์

| สื่อ | เปิด |
|---|---|
| สไลด์ Week 13 (42 หน้า · 9 บท · interactive JWT decoder และด่านตรวจ 401/403) | [เปิดสไลด์](https://se-rmutl.github.io/engse203/week13) |
| **สไลด์ปิดภาค** — สรุปสัปดาห์ 1–17 · งานที่ต้องส่ง · Final Term Project · สอบปลายภาค · ปฏิทิน + ตัวนับถอยหลัง (42 หน้า) | [เปิดสไลด์ปิดภาค](https://se-rmutl.github.io/engse203/wrapup/) |
| เอกสารประกอบการสอน (9 บท · 10 ภาพ) | [เปิดเอกสาร](https://se-rmutl.github.io/engse203/week13/week13-teaching-doc.html) |

### หน้าจอ Live-Coding (ใช้ในคาบ)

| CP | ทำอะไร | เปิด |
|---|---|---|
| CP48 | validation เข้มขึ้น + จำกัดขนาด body | [เปิด](https://se-rmutl.github.io/engse203/week13/guides/ENGSE203_Week13_CP48_LiveCoding.html) |
| CP49 | เก็บรหัสผ่านด้วย scrypt | [เปิด](https://se-rmutl.github.io/engse203/week13/guides/ENGSE203_Week13_CP49_LiveCoding.html) |
| CP50 | `POST /api/auth/login` ออก JWT | [เปิด](https://se-rmutl.github.io/engse203/week13/guides/ENGSE203_Week13_CP50_LiveCoding.html) |
| CP51 | `authenticate` + `requireRole` · 401 vs 403 | [เปิด](https://se-rmutl.github.io/engse203/week13/guides/ENGSE203_Week13_CP51_LiveCoding.html) |
| CP52 | secret · fail fast · production ไม่ส่ง stack | [เปิด](https://se-rmutl.github.io/engse203/week13/guides/ENGSE203_Week13_CP52_LiveCoding.html) |

---

## ภาพรวม

ระบบที่แก้ bug เมื่อเช้า **ใครก็ลบคำร้องของคนอื่นได้** แค่รู้ URL — บ่ายนี้ทำให้ระบบตอบได้ว่า "คุณคือใคร" และ "คุณทำสิ่งนี้ได้ไหม"

```
คำขอ ─▶ ตรวจข้อมูล ─▶ คุณคือใคร? ─▶ ทำสิ่งนี้ได้ไหม? ─▶ controller
         400 / 413       401             403
```

| ทำอะไร | ใครทำได้ |
|---|---|
| `GET` ดูคำร้อง · `POST` ส่งคำร้อง | ทุกคน |
| `PUT` เปลี่ยนสถานะ · `DELETE` ลบ | **เจ้าหน้าที่เท่านั้น** (ต้องแนบ `Authorization: Bearer <token>`) |

| ทักษะ | ทำอย่างไร |
|---|---|
| input validation | ชนิดข้อมูล · ความยาวสูงสุด · จำกัด body 10kb (413) |
| password hashing | `scrypt` + salt สุ่ม จาก `node:crypto` · เทียบด้วย `timingSafeEqual` |
| JWT | `jsonwebtoken` · payload `{ sub, name, role }` · หมดอายุ 2 ชั่วโมง |
| authorization | middleware `authenticate` (401) + `requireRole('staff')` (403) |
| secrets | `JWT_SECRET` จาก env · production ไม่มี → ไม่ยอม start · `.env.example` ค่าว่าง |

> **ประโยคแกนกลาง** — *"ทุกอย่างที่มาจากนอกระบบ คือข้อมูลที่ยังไม่ได้ตรวจ"*

---

## Checkpoint ทั้งหมด

| CP | ทำอะไร | ✓ ผ่านเมื่อ | ที่ไหน |
|---|---|---|---|
| **CP48** | validation เข้มขึ้น | 100 ผ่าน · 101 ไม่ผ่าน · body > 10kb → 413 | 🏫 |
| **CP49** | scrypt (test-first) | `password.test.js` ผ่าน 10/10 · ตรวจ hash ใน `schema.sql` ได้ | 🏫 |
| **CP50** | login ออก JWT | 200 + token · รหัสผิดกับอีเมลไม่มี → 401 ข้อความเดียวกัน | 🏫 |
| **CP51** | 401 vs 403 | ไม่มี token/ปลอม → 401 · ไม่ใช่เจ้าหน้าที่ → 403 · test เดิมแก้ให้ login แล้ว | 🏫 |
| **CP52** | secret + fail fast | production ไม่มี `JWT_SECRET` → ไม่ start · ไม่ส่ง stack | 🏫 |
| ⭐ | security headers | `nosniff` · `X-Frame-Options: DENY` · `Referrer-Policy` | ไม่บังคับ |
| ⭐ | จำกัดการเดารหัสผ่าน | ผิด 5 ครั้งใน 15 นาที → 429 | ไม่บังคับ |
| ⭐ | frontend แนบ token | `apiClient.js` ส่ง `Authorization: Bearer` | ไม่บังคับ (บังคับใน Term Project) |
| ⭐ | Render สุ่ม secret | `render.yaml` ใช้ `generateValue: true` | ไม่บังคับ (บังคับใน Term Project) |

---

## เริ่มทำ LAB

> starter ของบ่าย = **เฉลยของเมื่อเช้า** + โครงระบบเข้าสู่ระบบ — ไม่ต้องทำเช้าเสร็จก่อน

```bash
cp -r ../engse203-lab/labs/week-13-quality-security/lab13/starter labs/week-13/source
cd labs/week-13/source
npm install --prefix api              # มี jsonwebtoken เพิ่ม
npm install --prefix frontend
npm run db:setup --prefix api         # users มีคอลัมน์ role + password_hash
npm test --prefix api                 # ผ่าน 43 · ไม่ผ่าน 13 ← เป้าหมายของบ่ายนี้
```

```bash
# ตรวจงาน — รันจาก labs/week-13/source/
node --disable-warning=ExperimentalWarning check-week13.mjs --inclass   # 23/23
node --disable-warning=ExperimentalWarning check-week13.mjs            # 27/27 (รวม Challenge)
node --disable-warning=ExperimentalWarning check-week12.mjs --inclass   # ยัง 20/20 (ขอ token เอง)
```

> บัญชีเจ้าหน้าที่สำหรับพัฒนา: `staff@rmutl.ac.th` / `staff1234` (อยู่ใน `schema.sql` เป็น hash) — **ห้ามใช้บน production**

---

## สิ่งที่ต้องส่ง

| ไฟล์ | จาก CP |
|---|---|
| `api/src/validators/requestValidator.js` + test ค่าขอบสูงสุด | CP48 |
| `api/src/utils/password.js` | CP49 |
| `api/src/services/authService.js` · `api/src/app.js` | CP50 |
| `api/src/middleware/auth.js` · `api/src/routes/requestRoutes.js` · `api/tests/integration/*.test.js` | CP51 |
| `api/src/config.js` · `api/.env.example` | CP52 |

```bash
git switch -c unit5/week-13
git status                        # ต้องไม่มี .env
git add -A && git commit -m "LAB13: validation, scrypt, JWT login, 401/403, fail-fast secret"
git push -u origin unit5/week-13
git tag lab-13-submission-v1 && git push origin lab-13-submission-v1
```

### การประเมิน A5 (10%)

| ส่วน | คะแนน | มาจาก |
|---|---:|---|
| LAB 13 ในห้อง | 4 | tag `lab-13-submission-v1` · `check-week13 --inclass` 23 ข้อ |
| คุณภาพและความปลอดภัยใน Final Term Project | 6 | test · `DEBUG_LOG.md` · auth 401/403 · secret · `RELEASE_CHECKLIST.md` (ดู rubric ของโปรเจกต์) |

---

## Release Checklist (ทำจริงใน Term Project)

- [ ] `npm test` ผ่านทั้งหมด (api + frontend)
- [ ] `npm run build` ได้ไม่มี error
- [ ] ไม่มี secret ใน git
- [ ] `.env.example` มีตัวแปรครบ ค่าว่าง
- [ ] README บอกวิธีติดตั้ง · รัน · deploy · บัญชีทดสอบ
- [ ] `/api/health` ผ่านบน URL จริง
- [ ] `npm audit` ไม่มีระดับ high / critical (หรืออธิบายได้)
- [ ] tag เวอร์ชัน `v1.0.0`

---

## โครงสร้างโฟลเดอร์

```
week-13-quality-security/
├── lab13/
│   ├── LAB13_INCLASS_GUIDE_TH.md
│   └── starter/          (= เฉลย W12 + TODO W13-VALID · HASH · LOGIN · AUTH · SECRET)
├── guides/               (เอกสาร · สไลด์ · live-coding CP48–52)
└── _instructor-private/  ⚠ สำหรับผู้สอน
```

> checker สัปดาห์ 7 และ 10 ไม่อยู่ในโฟลเดอร์นี้แล้ว — requirement เปลี่ยน (PUT/DELETE ต้องเข้าสู่ระบบ) checker เก่าจึงใช้ไม่ได้ เหมือน test เก่าที่ต้องแก้ตาม

---

## ต่อจากนี้ — Final Term Project

สัปดาห์ 14–16 **ไม่มีคาบเรียน** — ทำ [Final Term Project](../final-term-project/) เป็นคู่ ส่งวันสอบปลายภาค (Sec 1 วันที่ 19 ต.ค. · Sec 2 วันที่ 22 ต.ค.)

| ฝั่ง | ต่อจากบ่ายนี้ |
|---|---|
| Front-end | หน้า login · เก็บ token · `apiClient` แนบ `Authorization` · ซ่อนปุ่มที่ไม่มีสิทธิ์ · test ฝั่ง frontend |
| Back-end | validation · auth 401/403 · unit + integration test · `DEBUG_LOG.md` |
| DevOps | `.env.example` · secret บน cloud · CI · `RELEASE_CHECKLIST.md` · tag `v1.0.0` · deploy |

---

## สำหรับผู้สอน

| ไฟล์ | ใช้ทำอะไร |
|---|---|
| [Step Script ทั้งวัน](../week-12-testing-debugging/_instructor-private/ENGSE203_Unit5_Instructor_Step_Script_TH.md) | ช่วงบ่ายอยู่ข้อ 10–16 |
| [Blueprint หน่วยที่ 5](../week-12-testing-debugging/guides/ENGSE203_Unit5_Week12_Week13_Blueprint_TH.md) | เหตุผลการออกแบบ · CP · checker |
| `_instructor-private/reference-solution/` | เฉลย api + React (หน้า login · `authStore` · `useAuth`) · check-week13 27/27 |
