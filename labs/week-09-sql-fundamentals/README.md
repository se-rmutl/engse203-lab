# LAB 09 — ฐานข้อมูลเชิงสัมพันธ์และภาษา SQL

**สัปดาห์ที่ 9** · หน่วยที่ 4 ฐานข้อมูลและการบูรณาการระบบ Full-Stack
**รูปแบบงาน:** รายบุคคล · **CLO:** CLO5 · **การประเมิน:** A2 Weekly LAB

> ⚠ **สัปดาห์นี้ไม่แตะโค้ด Node เลยแม้แต่บรรทัดเดียว** — อยู่กับ SQL อย่างเดียวทั้งคาบ
> การต่อ Node เข้ากับฐานข้อมูลอยู่ใน **สัปดาห์ที่ 10**

---

## เริ่มตรงไหน

| ลำดับ | ทำเมื่อไร | เปิดไฟล์ |
|---|---|---|
| 1 | ก่อนเข้าคาบ | [เอกสารประกอบการสอน](https://se-rmutl.github.io/engse203/week09/week09-teaching-doc.html) **บทที่ 1–3** |
| 2 | ในคาบ | [`lab09/LAB09_INCLASS_GUIDE_TH.md`](lab09/LAB09_INCLASS_GUIDE_TH.md) |
| 3 | ที่บ้าน | [`lab09/LAB09_TAKEHOME_GUIDE_TH.md`](lab09/LAB09_TAKEHOME_GUIDE_TH.md) |

---

## สื่อการสอนออนไลน์

> ไฟล์ `.html` เปิดจาก GitHub โดยตรงไม่ได้ (จะเห็นเป็นโค้ด) — **ใช้ลิงก์ด้านล่างนี้แทน**

| สื่อ | เปิด |
|---|---|
| สไลด์ Week 09 (49 หน้า · 10 บท) | [เปิดสไลด์](https://se-rmutl.github.io/engse203/week09) |
| เอกสารประกอบการสอน (10 บท) | [เปิดเอกสาร](https://se-rmutl.github.io/engse203/week09/week09-teaching-doc.html) |

### หน้าจอ Live-Coding (ใช้ในคาบ)

| Checkpoint | ทำอะไร | เปิด |
|---|---|---|
| CP17 | เขียน SQL ครั้งแรก — SELECT · WHERE · ORDER BY | [เปิด](https://se-rmutl.github.io/engse203/week09/guides/ENGSE203_Week09_CP17_LiveCoding.html) |
| CP19–20 | สร้างฐานข้อมูลจริง + CRUD | [เปิด](https://se-rmutl.github.io/engse203/week09/guides/ENGSE203_Week09_CP19-20_LiveCoding.html) |
| CP21 | JOIN สองตารางเข้าด้วยกัน | [เปิด](https://se-rmutl.github.io/engse203/week09/guides/ENGSE203_Week09_CP21_LiveCoding.html) |

> CP18 (ออกแบบตาราง) ทำบนกระดาษ ไม่มีหน้า live-coding

> ไฟล์ต้นฉบับอยู่ใน `guides/` ของโฟลเดอร์นี้ — clone ไปเปิดออฟไลน์ได้

---

## ภาพรวม

ออกแบบ **data model 2 ตาราง** ที่มีความสัมพันธ์ระหว่างกัน แล้วใช้ **SQL** จัดการข้อมูลจริง — สร้างตาราง กำหนด constraint เพิ่ม/แก้/ลบข้อมูล และดึงข้อมูลข้ามตารางด้วย `JOIN`

```
users (1 คน)  ──────►  requests (หลายคำร้อง)
  id (PK)                requester_id (FK)
```

**แนวคิดแกนกลาง** — เก็บข้อมูลแต่ละอย่างไว้ที่เดียว แล้วเชื่อมถึงกันด้วยความสัมพันธ์ · **แก้ที่เดียว ถูกต้องทั้งระบบ**

### สิ่งที่สัปดาห์นี้ส่งมอบให้สัปดาห์ที่ 10

| ไฟล์ | สัปดาห์ 10 ใช้ทำอะไร |
|---|---|
| `campus.db` | Node เปิดไฟล์นี้โดยตรง |
| `schema.sql` | สร้างฐานข้อมูลใหม่ได้ถ้าไฟล์เสีย |
| `queries.sql` | **คัดลอก query ไปใส่ใน service ได้เลย** |

---

## งาน 3 ระดับ

| | ทำที่ไหน | Checkpoint | สัดส่วนคะแนน |
|---|---|---|---|
| 🏫 **In-Class** | ในห้อง ทำให้เสร็จในคาบ | CP17–CP21 | 30% |
| 🏠 **Take-Home** | ที่บ้าน ภายใน 5 วัน | CP22–CP25 | 70% |
| ⭐ **Challenge** | ไม่บังคับ | GROUP BY · LEFT JOIN · INDEX | +15% bonus |

---

## Checkpoint ทั้งหมด

| CP | ทำอะไร | เครื่องมือ | ที่ไหน |
|---|---|---|---|
| **CP17** | เขียน SQL ครั้งแรก — SELECT · WHERE · ORDER BY | ออนไลน์ | 🏫 |
| **CP18** | ออกแบบตาราง — ทำไมต้องแยก `users` ออกจาก `requests` | กระดาษ | 🏫 |
| **CP19** | สร้างฐานข้อมูลจริง — CREATE TABLE + INSERT | VS Code | 🏫 |
| **CP20** | CRUD ครบ — INSERT · UPDATE · DELETE | VS Code | 🏫 |
| **CP21** | JOIN — ดึงข้อมูล 2 ตารางมารวมกัน | VS Code | 🏫 |
| **CP22** | เขียน `queries.sql` ตอบโจทย์ 8 ข้อ | | 🏠 |
| **CP23** | ทำ `schema.sql` ให้รันใหม่ได้ทั้งหมด | | 🏠 |
| **CP24** | เขียน `DATA_MODEL.md` อธิบายเหตุผลการออกแบบ | | 🏠 |
| **CP25** | ทดสอบ constraint ทั้ง 5 แบบ | | 🏠 |

---

## สิ่งที่คาดว่าจะได้เรียนรู้

- อธิบายได้ว่าทำไมต้องใช้ฐานข้อมูลแทนไฟล์ JSON เมื่อระบบโตขึ้น
- ออกแบบตารางพร้อม Primary Key และเลือกชนิดข้อมูลได้เหมาะสม
- กำหนด constraint (NOT NULL · UNIQUE · CHECK · DEFAULT · FOREIGN KEY) ได้
- **อธิบายได้ว่าทำไมต้องแยกตารางเพื่อไม่ให้เกิด update anomaly**
- เขียน SQL ครบทั้ง SELECT · WHERE · ORDER BY · INSERT · UPDATE · DELETE
- ใช้ `JOIN` ดึงข้อมูลจากสองตารางมารวมกันได้
- ทดสอบและพิสูจน์ได้ว่า constraint ปฏิเสธข้อมูลที่ผิดจริง

---

## เริ่มทำ LAB

```bash
cd lab09/starter

# ตรวจงาน
node --disable-warning=ExperimentalWarning check-week09.mjs --inclass   # เป้าหมาย 11/11
node --disable-warning=ExperimentalWarning check-week09.mjs            # เป้าหมาย 27/30
```

> `node:sqlite` มากับ Node 22 อยู่แล้ว **ไม่ต้อง `npm install` อะไรเลย**
> flag `--disable-warning=ExperimentalWarning` ใช้ซ่อนคำเตือนของ Node ไม่ใช่ข้อผิดพลาด

---

## สิ่งที่ต้องส่ง

| ไฟล์ | จาก CP |
|---|---|
| `campus.db` | CP19–CP22 |
| `schema.sql` | CP23 |
| `queries.sql` | CP22 + ⭐ |
| `DATA_MODEL.md` | CP24 + CP25 |

> **ต้อง commit ไฟล์ `campus.db` ด้วย** — ต่างจากปกติที่ไม่ commit ไฟล์ที่สร้างขึ้น
> เพราะสัปดาห์หน้าต้องใช้ และ SQLite เป็นไฟล์เดียวขนาดเล็ก

```bash
git switch -c unit4/week-09
git add -A
git commit -m "LAB09: SQL และฐานข้อมูลเชิงสัมพันธ์"
git push -u origin unit4/week-09
git tag lab-09-submission-v1 && git push origin lab-09-submission-v1
```

---

## การเตรียมตัวล่วงหน้า

- อ่านเอกสารประกอบการสอน **บทที่ 1–3** มาก่อน
- ตรวจว่า **Node.js ≥ 22.12.0** (`node -v`) — ใช้ `node:sqlite` ที่มากับ Node
- ติดตั้ง extension สำหรับ SQLite ใน VS Code (ผู้สอนจะบอกชื่อในคาบ)
- **ตรวจว่าโปรเจกต์ Week 07 ของคุณยังเปิดได้** — สัปดาห์ที่ 10 ต้องใช้

---

## โครงสร้างโฟลเดอร์

```
week-09-sql-fundamentals/
├── lab09/
│   ├── LAB09_INCLASS_GUIDE_TH.md      ← คู่มือทำในห้อง
│   ├── LAB09_TAKEHOME_GUIDE_TH.md     ← คู่มือทำที่บ้าน + Challenge
│   └── starter/
│       ├── schema.sql                  (TODO 4 จุด)
│       ├── queries.sql                 (TODO 8+3 ข้อ)
│       ├── DATA_MODEL.md               (โครงให้เติม)
│       └── check-week09.mjs
├── guides/
│   ├── ENGSE203_Week09_Teaching_Document_TH.html   ← 10 บท
│   ├── ENGSE203_Week09_Slides.html                 ← 49 สไลด์ · 10 บท
│   └── ENGSE203_Week09_Blueprint_TH.md
└── _instructor-private/                ⚠ สำหรับผู้สอนเท่านั้น
```

---

## สำหรับผู้สอน

| ไฟล์ | ใช้ทำอะไร |
|---|---|
| [Instructor Step Script](_instructor-private/ENGSE203_Week09_Instructor_Step_Script_TH.md) | สคริปต์ 300 นาที + Hint Ladder + แผนสำรอง |
| `_instructor-private/reference-solution/` | เฉลยครบ (checker 30/30) |

**ตรวจก่อนสอน**

```bash
cd _instructor-private/reference-solution
node --disable-warning=ExperimentalWarning check-week09.mjs | tail -6   # ต้องได้ 30/30

cd ../../lab09/starter
node --disable-warning=ExperimentalWarning check-week09.mjs | tail -6   # ต้องได้ 4/30
```

⚠ **`_instructor-private/` ต้องไม่เผยแพร่ให้นักศึกษา**
