# Release Checklist — v1.0.0

> ติ๊ก `[x]` เมื่อทำแล้ว **พร้อมใส่หลักฐาน** (คำสั่งที่รัน · ลิงก์ · ภาพ) · ข้อที่ทำไม่ได้ ให้ติ๊กแล้วเขียน `ยกเว้น: <เหตุผล>`
> ผู้ตรวจ: <ชื่อคนที่ตรวจรอบสุดท้าย> · วันที่ <วันที่>

## โค้ดและการทดสอบ

- [ ] `npm test` ผ่านทั้งหมด (api + frontend) — หลักฐาน: จำนวน test ที่ผ่าน ______ · ลิงก์ CI run ล่าสุด ______
- [ ] `npm run build` ได้ไม่มี error
- [ ] `node --disable-warning=ExperimentalWarning check-project.mjs --online` ผ่านทุกข้อ (หรือระบุข้อที่ยกเว้น)

## ความปลอดภัย

- [ ] ไม่มี secret ใน git — `git ls-files | grep .env` เจอแค่ `.env.example` (และ `frontend/.env.production`)
- [ ] `api/.env.example` มีตัวแปรครบ ค่าว่าง
- [ ] `JWT_SECRET` ตั้งบน Render แล้ว · ลองลบแล้ว deploy → ระบบไม่ยอม start (fail fast)
- [ ] บน production ตั้ง `STAFF_EMAIL` + `STAFF_PASSWORD` แล้ว · ลอง login ด้วยรหัสใน seed → ไม่ผ่าน
- [ ] `npm audit --prefix api` และ `--prefix frontend` ไม่มีระดับ high / critical (หรืออธิบายได้)

## เอกสาร

- [ ] README บอกวิธีติดตั้ง · รัน · test · deploy · URL · บัญชีทดสอบ · การใช้ AI
- [ ] `API_CONTRACT.md` ตรงกับโค้ดจริงทุก endpoint
- [ ] `DEBUG_LOG.md` มี bug จริงของโปรเจกต์อย่างน้อย 2 ตัว

## Deploy

- [ ] `/api/health` บน URL จริงตอบ 200 — URL: ______
- [ ] ลองใช้งานจริงบน URL: ส่งคำขอ → login เจ้าหน้าที่ → เปลี่ยนสถานะ → ลบ · และคนทั่วไปทำ PUT/DELETE ไม่ได้
- [ ] เปิดบนมือถือแล้วใช้งานได้

## ปล่อยเวอร์ชัน

- [ ] tag `v1.0.0` ชี้ commit เดียวกับที่ deploy อยู่ — `git tag v1.0.0 && git push origin v1.0.0`
