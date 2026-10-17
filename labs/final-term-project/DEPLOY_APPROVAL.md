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

รันที่ root ของ repo ทีม — ทุกข้อต้องเป็นอย่างที่เขียนไว้

```bash
git pull
git ls-files | grep -E '(^|/)\.env$|\.env\.(local|production)$'   # ต้องไม่มีผลลัพธ์ (ยกเว้น frontend/.env.production ที่มีแค่ VITE_…)
git check-ignore -v api/.env                                      # ต้องเห็นบรรทัดจาก .gitignore
git log --all --oneline -- '*.env' 'api/.env'                     # เคย commit .env ไหม — ถ้ามี ดูข้อ "เคยเผลอ commit" ด้านล่าง
grep -n "JWT_SECRET" api/.env.example                             # ต้องเป็น JWT_SECRET= (ค่าว่าง)
node --disable-warning=ExperimentalWarning check-project.mjs --skip-build   # ส่วน DEVOPS ข้อ D3 และ secret ต้อง ✅
```

| ต้องมี | ตรวจที่ |
|---|---|
| `.gitignore` มี `.env` · `node_modules/` · `api/data/*.db` | `git check-ignore -v api/.env` |
| `api/.env.example` มีตัวแปรครบ **ค่าว่าง** | เปิดไฟล์ดู |
| `render.yaml` — `JWT_SECRET` ใช้ `generateValue: true` · `STAFF_EMAIL` `STAFF_PASSWORD` ใช้ `sync: false` (**ห้ามเขียนค่าจริง**) | [kit/render.yaml](kit/render.yaml) |
| ระบบ start ไม่ได้ถ้าไม่มี `JWT_SECRET` · รหัสเจ้าหน้าที่ production มาจาก `STAFF_EMAIL`/`STAFF_PASSWORD` | checker ส่วน DEVOPS |
| `npm test` ผ่าน · `npm run build` ผ่าน (Render สั่งคำสั่งเดียวกัน) | `npm test` · `npm run build` |
| tag `v0.5.0` อยู่บน GitHub | `git push origin v0.5.0` |

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
