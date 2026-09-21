# LAB 10 — เชื่อม Node เข้ากับฐานข้อมูล

**สัปดาห์ที่ 10** · หน่วยที่ 4 ฐานข้อมูลและการบูรณาการระบบ Full-Stack
**รูปแบบงาน:** รายบุคคล · **CLO:** CLO5 (หลัก) · CLO6 (รอง) · **การประเมิน:** A2 Weekly LAB

> ⚠ **ชื่อโฟลเดอร์ยังเป็น `week-10-node-database` ตามแผนเดิม** — เนื้อหาจริงคือการเชื่อม Node เข้ากับ SQLite
> MongoDB ย้ายไปสัปดาห์ที่ 11 · ชื่อโฟลเดอร์จะเปลี่ยนเมื่อหน่วยที่ 4 เสร็จทั้งหมด

---

## เริ่มตรงไหน

| ลำดับ | ทำเมื่อไร | เปิดไฟล์ |
|---|---|---|
| 1 | ก่อนเข้าคาบ | [เอกสารประกอบการสอน](https://se-rmutl.github.io/engse203/week10/week10-teaching-doc.html) **บทที่ 1–2** |
| 2 | ในคาบ | [`lab10/LAB10_INCLASS_GUIDE_TH.md`](lab10/LAB10_INCLASS_GUIDE_TH.md) |
| 3 | ที่บ้าน | [`lab10/LAB10_TAKEHOME_GUIDE_TH.md`](lab10/LAB10_TAKEHOME_GUIDE_TH.md) |

---

## สื่อการสอนออนไลน์

> ไฟล์ `.html` เปิดจาก GitHub โดยตรงไม่ได้ (จะเห็นเป็นโค้ด) — **ใช้ลิงก์ด้านล่างนี้แทน**

| สื่อ | เปิด |
|---|---|
| สไลด์ Week 10 (49 หน้า · 9 บท) | [เปิดสไลด์](https://se-rmutl.github.io/engse203/week10) |
| เอกสารประกอบการสอน (9 บท) | [เปิดเอกสาร](https://se-rmutl.github.io/engse203/week10/week10-teaching-doc.html) |

### หน้าจอ Live-Coding (ใช้ในคาบ)

| Checkpoint | ทำอะไร | เปิด |
|---|---|---|
| CP26 | เปิดฐานข้อมูลจาก Node ด้วย `node:sqlite` | [เปิด](https://se-rmutl.github.io/engse203/week10/guides/ENGSE203_Week10_CP26_LiveCoding.html) |
| CP27 | กับดัก path สัมพัทธ์ | [เปิด](https://se-rmutl.github.io/engse203/week10/guides/ENGSE203_Week10_CP27_LiveCoding.html) |
| CP28 | `findAll` + `findById` ด้วย JOIN | [เปิด](https://se-rmutl.github.io/engse203/week10/guides/ENGSE203_Week10_CP28_LiveCoding.html) |
| CP29 | `create` แปลงชื่อเป็น id | [เปิด](https://se-rmutl.github.io/engse203/week10/guides/ENGSE203_Week10_CP29_LiveCoding.html) |
| CP30 | `updateStatus` + `remove` · ตรวจครบ | [เปิด](https://se-rmutl.github.io/engse203/week10/guides/ENGSE203_Week10_CP30_LiveCoding.html) |

> ไฟล์ต้นฉบับอยู่ใน `guides/` ของโฟลเดอร์นี้ — clone ไปเปิดออฟไลน์ได้

---

## ภาพรวม

เปลี่ยน API ของ Week 07 จากอ่านไฟล์ JSON มาเป็น **ดึงข้อมูลจากฐานข้อมูล SQLite ที่สร้างไว้สัปดาห์ที่แล้ว**

```
Week 09                          Week 10
────────────                     ────────────
เรียน SQL · ออกแบบตาราง      →   เอา SQL ไปใส่ในโปรแกรม
สร้าง campus.db              →   Node เปิดไฟล์นั้น
เขียน queries.sql            →   query กลายเป็นโค้ด

ไม่แตะโค้ดเลย                    แก้โค้ดไฟล์เดียว
```

**ประโยคแกนกลาง** — *query ที่เขียนสัปดาห์ที่แล้ว กลายเป็นโค้ดวันนี้ และแก้แค่ `requestService.js` ไฟล์เดียว*

### สิ่งที่ต้องมีติดตัวมาจากสัปดาห์ที่ 9

| ไฟล์ | วางไว้ที่ | ถ้าไม่มี |
|---|---|---|
| `campus.db` | `api/data/campus.db` | สร้างใหม่ด้วย `npm run db:setup` |
| `schema.sql` | `api/data/schema.sql` | **ขอไฟล์สำรองจากผู้สอน** |
| `queries.sql` | เปิดไว้ข้าง ๆ | ใช้ของสำรองได้ |

---

## งาน 3 ระดับ

| | ทำที่ไหน | Checkpoint | สัดส่วนคะแนน |
|---|---|---|---|
| 🏫 **In-Class** | ในห้อง ทำให้เสร็จในคาบ | CP26–CP30 | 45% |
| 🏠 **Take-Home** | ที่บ้าน ภายใน 5 วัน | CP31–CP34 | 55% |
| ⭐ **Challenge** | ไม่บังคับ | users endpoint · transaction · index | +15% bonus |

---

## Checkpoint ทั้งหมด

| CP | ทำอะไร | อ่านบท | ที่ไหน |
|---|---|---|---|
| **CP26** | เปิดฐานข้อมูลจาก Node ด้วย `node:sqlite` | 2 | 🏫 |
| **CP27** | แก้ path ให้อ้างจากตำแหน่งไฟล์ | 3 | 🏫 |
| **CP28** | `findAll` + `findById` ด้วย JOIN | 4 | 🏫 |
| **CP29** | `create` แปลงชื่อเป็น id | 5 | 🏫 |
| **CP30** | `updateStatus` + `remove` · checker 36/36 | 6 | 🏫 |
| **CP31** | ทดสอบ SQL injection · พิสูจน์ว่ากันได้ | 7 | 🏠 |
| **CP32** | แปลง error จากฐานข้อมูลเป็น status ที่เหมาะสม | 8 | 🏠 |
| **CP33** | เขียน test ที่ยิงเข้าฐานข้อมูลจริง | 9 | 🏠 |
| **CP34** | อัปเดต `API_CONTRACT.md` | 9 | 🏠 |

---

## สิ่งที่คาดว่าจะได้เรียนรู้

- เปิดและสั่งงานฐานข้อมูล SQLite จาก Node ด้วย `node:sqlite` ที่มากับ Node 22
- อธิบายได้ว่าทำไมต้องอ้าง path จากตำแหน่งไฟล์ ไม่ใช่จากที่รันคำสั่ง
- ใช้ `JOIN` และ `AS` ในชั้น service เพื่อแปลงรูปแบบข้อมูลให้ตรงกับที่ frontend ต้องการ
- **อธิบายได้ว่าทำไม service ต้องแปลงชื่อผู้แจ้งเป็น id** และทำไมไม่แก้ frontend แทน
- ใช้ parameterized query และ**พิสูจน์ได้ว่าป้องกัน SQL injection จริง**
- แปลง error จากฐานข้อมูลเป็น HTTP status code ที่เหมาะสม
- **ยืนยันได้ว่าการเปลี่ยนแหล่งข้อมูลกระทบแค่ชั้นเดียว** โดย checker ของ Week 07 ยังผ่านครบ

---

## เริ่มทำ LAB

```bash
cd lab10/starter/api
npm install
cp .env.example .env

# สร้างฐานข้อมูลจาก schema.sql (ถ้ายังไม่มี campus.db)
npm run db:setup

npm run dev
```

```bash
# ตรวจงาน — รันจาก lab10/starter/
node --disable-warning=ExperimentalWarning check-week10.mjs --inclass   # เป้าหมาย 20/20
node --disable-warning=ExperimentalWarning check-week10.mjs            # เป้าหมาย 28/31
node --disable-warning=ExperimentalWarning check-week07.mjs            # ต้องยัง 36/36
```

> **`node:sqlite` มากับ Node 22 อยู่แล้ว** — ไม่ต้องติดตั้งไลบรารีฐานข้อมูลเพิ่ม
> flag `--disable-warning=ExperimentalWarning` ใช้ซ่อนคำเตือนของ Node ไม่ใช่ข้อผิดพลาด

### สคริปต์จัดการฐานข้อมูล

```bash
npm run db:setup       # สร้างฐานข้อมูล (มีอยู่แล้วจะไม่ทำอะไร)
npm run db:reset       # ลบของเดิมแล้วสร้างใหม่
DB_FILE=./data/test.db npm run db:setup    # สร้างฐานข้อมูลทดสอบแยก
```

---

## สิ่งที่ต้องส่ง

| ไฟล์ | จาก CP |
|---|---|
| `api/src/services/requestService.js` | CP26–CP30 |
| `api/data/campus.db` | CP26 |
| `api/tests/api.test.js` | CP33 |
| `API_CONTRACT.md` | CP34 |
| บันทึกผลทดสอบ SQL injection | CP31 |

```bash
git switch -c unit4/week-10
git add -A
git commit -m "LAB10: เชื่อม Node เข้ากับฐานข้อมูล"
git push -u origin unit4/week-10
git tag lab-10-submission-v1 && git push origin lab-10-submission-v1
```

---

## การเตรียมตัวล่วงหน้า

- อ่านเอกสารประกอบการสอน **บทที่ 1–2** มาก่อน
- ตรวจว่ามี `campus.db` และ `schema.sql` จากสัปดาห์ที่ 9
- **ตรวจว่าโปรเจกต์ Week 07 ของคุณยังเปิดได้**
- Node.js ≥ 22.12.0 (`node -v`)

---

## โครงสร้างโฟลเดอร์

```
week-10-node-database/
├── lab10/
│   ├── LAB10_INCLASS_GUIDE_TH.md      ← คู่มือทำในห้อง
│   ├── LAB10_TAKEHOME_GUIDE_TH.md     ← คู่มือทำที่บ้าน + Challenge
│   └── starter/
│       ├── api/   (service เป็น TODO · มี schema.sql + สคริปต์ db:setup)
│       ├── frontend/  (แอป Week 05 สมบูรณ์ — ไม่ต้องแก้)
│       └── check-week10.mjs
├── guides/
│   ├── ENGSE203_Week10_Teaching_Document_TH.html   ← 9 บท
│   ├── ENGSE203_Week10_Slides.html                 ← 49 สไลด์
│   ├── ENGSE203_Week10_CP26–CP30_LiveCoding.html   ← 5 ไฟล์
│   └── ENGSE203_Week09_Week10_Blueprint_TH.md
└── _instructor-private/                ⚠ สำหรับผู้สอนเท่านั้น
```

---

## สำหรับผู้สอน

| ไฟล์ | ใช้ทำอะไร |
|---|---|
| [Instructor Step Script](_instructor-private/ENGSE203_Week10_Instructor_Step_Script_TH.md) | สคริปต์ 300 นาที + Hint Ladder + แผนสำรอง |
| `_instructor-private/reference-solution/` | เฉลยครบ (checker 31/31) |

**ตรวจก่อนสอน**

```bash
cd _instructor-private/reference-solution
node --disable-warning=ExperimentalWarning check-week10.mjs | tail -6   # 31/31
node --disable-warning=ExperimentalWarning check-week07.mjs | tail -2   # 36/36

cd ../../lab10/starter
node --disable-warning=ExperimentalWarning check-week10.mjs | tail -6   # 12/31
```

⚠ **`_instructor-private/` ต้องไม่เผยแพร่ให้นักศึกษา**
