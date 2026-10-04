# Deploy — <ชื่อระบบ>

> **กลุ่ม 3 คน: บังคับ** (ข้อ D7–D11) · ทีมคู่: แนะนำ (ใช้แทนหัวข้อ Deploy ใน README ได้)
> อ้างอิง: [คู่มือ Deploy ขึ้น Render (Week 11)](https://se-rmutl.github.io/engse203/week11/deploy-guide.html) ส่วนที่ 1–9 และส่วนที่ 11 (Turso)

## 1. ภาพรวม

```
GitHub (main) ──push──▶ GitHub Actions (test + build) ──ผ่าน──▶ Render (build + start) ──▶ Turso (ข้อมูล)
```

| ส่วน | ค่า |
|---|---|
| URL | <https://….onrender.com> |
| Render service | <ชื่อ service> · region <singapore> · plan free |
| ฐานข้อมูล | <Turso: ชื่อฐานข้อมูล · region> หรือ <SQLite ในไฟล์ (รีเซ็ตเมื่อ redeploy)> |

## 2. ตัวแปรบน Render

| ชื่อ | ค่ามาจากไหน | อยู่ใน git ไหม |
|---|---|---|
| `NODE_ENV` | `production` (render.yaml) | ✅ |
| `JWT_SECRET` | Render สุ่มให้ (`generateValue: true`) | ❌ |
| `STAFF_EMAIL` · `STAFF_PASSWORD` | ทีมกำหนด · server.js ตั้งรหัสเจ้าหน้าที่ตอน start | ❌ |
| `TURSO_DATABASE_URL` | Turso → Database → URL | ❌ |
| `TURSO_AUTH_TOKEN` | `turso db tokens create <db>` | ❌ |

## 3. Deploy ตั้งแต่ศูนย์

1. <ขั้นที่ 1>
2. <ขั้นที่ 2>
3. บัญชีเจ้าหน้าที่บน production: ตั้ง `STAFF_EMAIL` + `STAFF_PASSWORD` → redeploy → ลอง login ด้วยรหัสใน seed ต้องไม่ผ่าน

## 4. CI → Deploy อัตโนมัติ

- Render → Settings → **Auto-Deploy: After CI Checks Pass** — ภาพ: <ใส่ภาพ>
- GitHub → Settings → Branches → **branch protection** ของ `main` (ต้องผ่าน PR + CI) — ภาพ: <ใส่ภาพ>

## 5. ข้อมูลไม่หายเมื่อ redeploy (Turso)

| | จำนวนรายการ | ภาพ |
|---|---:|---|
| ก่อน redeploy | | |
| หลัง redeploy | | |

`/api/health` แสดง `"driver": "turso"` — ภาพ: <ใส่ภาพ>

## 6. Rollback

ถ้า deploy เวอร์ชันใหม่แล้วพัง ย้อนกลับไป tag ก่อนหน้าแบบนี้

1. <ขั้นที่ 1 — เช่น Render → Events → เลือก deploy ของ commit ที่ tag v0.5.0 → Rollback>
2. <ขั้นที่ 2>

ทดลองจริงเมื่อ <วันที่> · ใช้เวลา <__> นาที · ข้อมูลใน Turso <ย้อนตาม / ไม่ย้อนตาม> เพราะ <เหตุผล>

## 7. ดู log และแก้ปัญหา

| อาการ | ดูที่ไหน | วิธีแก้ |
|---|---|---|
| | | |
