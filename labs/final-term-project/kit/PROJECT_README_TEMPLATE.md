# <ชื่อระบบ> — <ชื่อหน่วยงานที่ใช้>

<!-- คัดลอกไฟล์นี้ไปแทน README.md ของ repo แล้วลบคอมเมนต์ออก · กลุ่ม 3 คนใส่ป้าย CI ตรงนี้: -->
<!-- ![CI](https://github.com/<owner>/<repo>/actions/workflows/check.yml/badge.svg) -->

**ENGSE203 Final Term Project · Section <1/2> · หัวข้อ <T__>**

🌐 **URL:** <https://….onrender.com> · 🏷️ เวอร์ชัน `v1.0.0`

<หนึ่งย่อหน้า: ระบบนี้แก้ปัญหาอะไร ใครใช้ ใช้ทำอะไร>

## สมาชิก

| ชื่อ | รหัสนักศึกษา | บทบาท | รับผิดชอบ |
|---|---|---|---|
| | | Front-end | |
| | | Back-end + DevOps | |

## ความสามารถของระบบ

| ใคร | ทำอะไรได้ |
|---|---|
| คนทั่วไป | ดูรายการ · กรองสถานะ · ดูรายละเอียด · ส่งคำขอ |
| เจ้าหน้าที่ (login) | ทุกอย่างข้างบน + เปลี่ยนสถานะ · ลบ |

ภาพหน้าจอ (desktop + มือถือ): <ใส่ภาพ>

## ข้อมูล

<ภาพหรือตาราง: ตารางทั้งหมด · ความสัมพันธ์ · กฎเฉพาะของหัวข้อ>

## ติดตั้ง

```bash
git clone <repo>
cd <repo>
npm install --prefix api
npm install --prefix frontend
cp api/.env.example api/.env        # แล้วใส่ JWT_SECRET ของเครื่องตัวเอง
npm run db:setup --prefix api
```

## วิธีรัน (development)

```bash
npm run dev --prefix api            # http://localhost:3001
npm run dev --prefix frontend       # http://localhost:5173
```

## การทดสอบ

```bash
npm test                            # api + frontend
npm run coverage                    # coverage ของ api
node --disable-warning=ExperimentalWarning check-project.mjs
```

| ชุด test | จำนวน |
|---|---:|
| api unit | |
| api integration | |
| frontend | |

## Deploy

<ขั้นตอนสั้น ๆ หรือลิงก์ไป DEPLOY.md · ตัวแปรที่ต้องตั้งบน Render · ข้อจำกัด (เช่น ข้อมูล SQLite รีเซ็ตเมื่อ redeploy)>

## บัญชีทดสอบ

| ที่ไหน | อีเมล | รหัสผ่าน |
|---|---|---|
| development (จาก seed) | `staff@rmutl.ac.th` | `staff1234` |
| production | <อีเมล> | **แจ้งผู้สอนแยก — ห้ามเขียนในไฟล์นี้** |

## เอกสารอื่น

- [API_CONTRACT.md](API_CONTRACT.md) · [DEBUG_LOG.md](DEBUG_LOG.md) · [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md) · [TEAM_CONTRACT.md](TEAM_CONTRACT.md)

## การใช้ AI

| ใคร | ใช้เครื่องมืออะไร | ใช้ทำอะไร | ตรวจ/แก้อย่างไร |
|---|---|---|---|
| | | | |

> ทุกคนอธิบายโค้ดที่ส่งได้ทุกบรรทัด
