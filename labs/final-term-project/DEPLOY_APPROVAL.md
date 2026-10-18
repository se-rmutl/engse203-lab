# Deploy ขึ้น Render — ขอ Approved ก่อน แล้วค่อย deploy

**ทุกทีมต้องได้ ✅ Approved จากผู้สอนก่อน deploy ครั้งแรก** — เพราะ deploy แล้วระบบเปิดให้ทุกคนบนอินเทอร์เน็ตใช้ได้ ผู้สอนจึงตรวจก่อนว่าไม่มีรหัสผ่าน · token · `.env` หลุดอยู่ใน git (รวมประวัติทุก commit)

```
① เตรียม repo ──▶ ② ติ๊ก Ready to Deploy ──▶ ③ ผู้สอนตรวจ ──▶ ✅ Approved ──▶ ④ deploy บน Render ──▶ ⑤ ใส่ URL ──▶ ⑥ พัฒนาต่อ (deploy อัตโนมัติ)
                                              └──▶ ⛔ แก้ตามหมายเหตุ ──▶ กลับไป ②
```

| | Section 1 | Section 2 |
|---|---|---|
| ติ๊ก Ready to Deploy | ตั้งแต่วันนี้ · **ไม่เกิน อา. 18 ต.ค. 12:00** | ตั้งแต่วันนี้ · **ไม่เกิน จ. 19 ต.ค. 12:00** |
| รอบตรวจของผู้สอน | ส. 17 · 20:00 → อา. 18 · 12:00 → อา. 18 · 18:00 (รอบสุดท้าย) | อา. 18 · 12:00 · 18:00 → จ. 19 · 12:00 · 20:00 → อ. 20 · 12:00 (รอบสุดท้าย) |
| deploy ให้เสร็จ | **อา. 18 ต.ค. 22:00** | **อ. 20 ต.ค. 22:00** |
| **หยุดเพิ่มฟีเจอร์** | **ส. 17 ต.ค.** (หลังจากนี้แก้เรื่อง deploy ได้ด้วย `fix:` / `chore(deploy):`) | **อ. 20 ต.ค.** |
| **M3 ส่ง** — tag `v1.0.0` · URL · ลิงก์ repo ผ่าน LMS | **จ. 19 ต.ค. ก่อนเวลาสอบ** | **พฤ. 22 ต.ค. ก่อนเวลาสอบ** |

> deploy ไม่ได้นับใน M2 แล้ว (นับใน M3 แทน) · ทีมที่ติ๊ก Ready to Deploy ช้ากว่ากำหนดอาจไม่ได้ตรวจทันก่อนสอบ

---

## ① เตรียม repo (Back-end + DevOps นำ · ทุกคนช่วยตรวจ)

ผู้สอนตรวจ **6 ชั้น** — ข้อใดข้อหนึ่งไม่ผ่าน = ⛔ ยังไม่อนุมัติ · **ตรวจเองให้ผ่านก่อนติ๊ก Ready to Deploy**

```bash
git switch main && git pull                          # ตรวจ branch main — Render deploy จาก branch นี้ (งานใน branch อื่นต้อง merge ก่อน)
cp ../engse203-lab/labs/final-term-project/kit/check-project.mjs .   # checker ตัวล่าสุดของวิชา (git pull ใน Course Repository ก่อน)
npm install --prefix api && npm install --prefix frontend
node --disable-warning=ExperimentalWarning check-project.mjs        # ไม่ใส่ --skip-build — Render build จริง
```

| ชั้น | ต้องเป็นแบบนี้ |
|---|---|
| **1 · repo** | `main` มีระบบของหัวข้อครบ (`package.json` ที่ root มี script `build` + `start` · `api/` · `frontend/`) · `project.config.json` มี `topic` = รหัสหัวข้อของทีม · **README เป็นของระบบทีม** ตาม [แม่แบบ](kit/PROJECT_README_TEMPLATE.md) (ไม่ใช่ README ของ LAB / Campus Service · ยังไม่มี URL ได้) |
| **2 · `render.yaml`** | ใช้ [kit/render.yaml](kit/render.yaml) — `buildCommand: npm install && npm run build` (**build frontend ด้วย**) · `startCommand: npm start` · `healthCheckPath: /api/health` · `NODE_ENV: production` · `JWT_SECRET` `generateValue: true` · `STAFF_EMAIL` `STAFF_PASSWORD` `sync: false` · **ห้ามเขียนค่าลับในไฟล์** |
| **3 · ความปลอดภัย** | ไม่มี `.env` / token / รหัสผ่านจริงใน git **ทุก commit ทุก branch** · `api/.env.example` ค่าว่าง · secret ในโค้ดได้เฉพาะค่า dev แบบ LAB 13 (production ไม่มี `JWT_SECRET` → throw) |
| **4 · checker** | ข้อต่อไปนี้ต้อง ✅ — **T1** project.config · **T3** README (ยกเว้น URL) · **T4** API_CONTRACT · **B1** ตาราง · **B2** health · list · one · post · noauth · forbidden · login · staff · **B3** test api · **F1** หน้า login · **F2** แนบ token · **F5** เรียก resource ของหัวข้อ · **F7** build · **D2** render.yaml · **D3** .env · **D4** fail fast · **D5** ไม่ส่ง stack · **D8** รหัสเจ้าหน้าที่จาก env |
| **5 · จำลอง Render** | `NODE_ENV=production JWT_SECRET=x STAFF_EMAIL=a@b.c STAFF_PASSWORD=x npm start` (หลัง `npm run build`) → `http://localhost:3001/api/health` ได้ 200 **และ** `http://localhost:3001/` เปิดหน้าเว็บได้ |
| **6 · CI** | commit ล่าสุดบน `main` มี ✓ สีเขียว (ไม่ใช่ ✗ สีแดง) |

> ข้ออื่นของ checker (T2 · T5 · T6 · B4 · B5 · F3 · F4 · F6 · D1 · D6 · D7) ไม่ขวาง deploy แต่**ต้องครบก่อนติด tag `v1.0.0`**

### เคยเผลอ commit `.env` หรือรหัสผ่านจริง

การลบไฟล์ใน commit ใหม่**ไม่ได้ลบออกจากประวัติ** — ใครเปิด repo ก็ย้อนดูได้ · ให้ทำแบบนี้แทน

1. `git rm --cached api/.env` แล้วเพิ่ม `.env` ใน `.gitignore` → commit
2. **เปลี่ยนค่าที่หลุดทุกตัว** — ค่านั้นห้ามใช้บน production อีก (`JWT_SECRET` ให้ Render สุ่มใหม่ · `STAFF_PASSWORD` ตั้งใหม่ · token ของ Turso ให้ยกเลิกแล้วสร้างใหม่)
3. บันทึกใน `DEBUG_LOG.md` — หลุดอะไร เมื่อไร เปลี่ยนแล้วอย่างไร

---

## ② ขอ Approved

1. เปิด **Google Sheet ของ Section** → แถวหัวข้อของทีม → ติ๊ก **Ready to Deploy**
2. ตรวจว่าช่อง **Git Repo** ถูกต้อง และผู้สอนเป็น collaborator อยู่แล้ว

## ③ ผลการตรวจ (ตามรอบในตารางด้านบน)

| ใน Sheet | แปลว่า | ทำอะไรต่อ |
|---|---|---|
| ✅ **Approved** ติ๊กแล้ว | ผ่าน | ทำข้อ ④ |
| ช่อง**หมายเหตุ**มี ⛔ และ Ready to Deploy ถูกเอาติ๊กออก | ยังไม่ผ่าน | แก้ตามหมายเหตุ → push → ติ๊ก Ready to Deploy ใหม่ |

> ห้ามเปิด repo เป็น public หรือ deploy ก่อนได้ Approved

---

## ④ Deploy บน Render (หลังได้ Approved)

**ใช้ทาง A** เว้นแต่ผู้สอนประกาศเป็นอย่างอื่น

### ทาง A — repo ยัง private (แนะนำ · ข้อมูลส่วนตัวใน `TEAM.md` ไม่ถูกเปิดเผย)

**คนที่เป็นเจ้าของ repo** (คนที่สร้าง repo) เป็นคนสร้าง service บน Render — Render เห็นเฉพาะ repo ที่บัญชี GitHub ที่เชื่อมไว้เข้าถึงได้

1. https://dashboard.render.com → สมัครด้วย **GitHub** ของเจ้าของ repo
2. **New → Blueprint** → **Connect GitHub** → อนุญาตให้ Render เข้าถึง repo ของทีม (เลือก Only select repositories → repo ทีม)
3. เลือก repo ทีม → Render อ่าน `render.yaml` → กรอก `STAFF_EMAIL` · `STAFF_PASSWORD` (รหัสใหม่ ไม่ซ้ำกับใน seed) → **Apply**

### ทาง B — เปิด repo เป็น public แล้ว deploy

1. **ก่อนเปิด** — ใน `TEAM.md` และ `project.config.json` ปิดรหัสนักศึกษาเหลือ 4 ตัวท้าย (เช่น `xxxxxxx0101-1`) แล้ว commit · ⚠ ประวัติ git ยังเห็นค่าเดิม — ถ้าไม่ต้องการให้เห็น ให้ใช้ทาง A
2. GitHub → repo → **Settings → General → Danger Zone → Change visibility → Make public**
3. ทำข้อ 1–3 ของทาง A (เชื่อม GitHub แล้วใช้ Blueprint — ได้ auto-deploy ทุกครั้งที่ push)

### ตรวจหลัง deploy

```bash
curl https://<ชื่อ service>.onrender.com/api/health            # ต้องได้ 200
```

- เปิด URL → ส่งคำขอแบบคนทั่วไปได้ · login ด้วย `STAFF_EMAIL`/`STAFF_PASSWORD` ได้ · **login ด้วยรหัสใน seed ต้องไม่ผ่าน**
- Render ฟรีจะ**หลับเมื่อไม่มีคนใช้ 15 นาที** — เรียกครั้งแรกรอประมาณ 1 นาที · ก่อน demo / สอบ ให้เปิด URL ทิ้งไว้ก่อน
- ข้อมูลกลับเป็น seed ทุกครั้งที่ redeploy หรือ restart (ทีม 3 คนใช้ Turso)

## ⑤ ใส่ URL

1. `README.md` หัวข้อ Deploy และ `project.config.json` ช่อง `deployUrl`
2. ช่อง **Deploy URL** ใน Google Sheet
3. รัน `node --disable-warning=ExperimentalWarning check-project.mjs --online` → ส่วน D7 ต้อง ✅ → commit + push

## ⑥ พัฒนาต่อจนถึงวันหยุดฟีเจอร์

- ทุกครั้งที่ push เข้า `main` Render จะ deploy ใหม่เอง — **push เฉพาะโค้ดที่ `npm test` ผ่านแล้ว** (ทีม 3 คน: Auto-Deploy After CI Checks Pass)
- deploy พัง → Render → **Events** ดู log · ย้อนกลับด้วย **Rollback** ไป deploy ก่อนหน้า แล้วแก้ใน branch
- **หลังวันหยุดฟีเจอร์ (Sec 1: 17 ต.ค. · Sec 2: 20 ต.ค.)** commit ได้เฉพาะ `fix:` · `docs:` · `test:` — ไม่เพิ่มฟีเจอร์ใหม่
- **M3** — ทำ `RELEASE_CHECKLIST.md` ครบ → `git tag v1.0.0 && git push origin v1.0.0` → ตรวจว่า URL เป็นเวอร์ชันล่าสุด → ส่ง URL + ลิงก์ repo ใน LMS **ก่อนเวลาสอบ**

> commit หลัง tag `v1.0.0` ไม่นำมาคิดคะแนน · ผู้สอนตรวจที่ tag และ URL ที่ deploy
