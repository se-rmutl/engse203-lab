# ENGSE203 LAB 09 — คู่มือ In-Class

**🏫 ทำในห้อง · CP17 → CP21 · SQL และฐานข้อมูลเชิงสัมพันธ์**
**หน่วยที่ 4 · สัปดาห์ที่ 9 · ปฏิบัติ 3 ชั่วโมง**

---

## 🖥️ หน้าจอ Live-Coding (ฉายประกอบการสอน)

ระหว่างสอนแต่ละ CP เปิดหน้าจอ live-coding คู่กันได้ — มีโค้ดทีละขั้น กล่องเตือนกับดัก และเช็คลิสต์

| Checkpoint | เนื้อหา | เปิด |
|---|---|---|
| CP17 | เขียน SQL ครั้งแรก — SELECT · WHERE · ORDER BY | [เปิด](https://se-rmutl.github.io/engse203/week09/guides/ENGSE203_Week09_CP17_LiveCoding.html) |
| CP19-20 | สร้างฐานข้อมูลจริง + CRUD | [เปิด](https://se-rmutl.github.io/engse203/week09/guides/ENGSE203_Week09_CP19-20_LiveCoding.html) |
| CP21 | JOIN สองตารางเข้าด้วยกัน | [เปิด](https://se-rmutl.github.io/engse203/week09/guides/ENGSE203_Week09_CP21_LiveCoding.html) |

> ไฟล์ต้นฉบับอยู่ใน  ของ LAB นี้ · เปิดออฟไลน์ได้

---

## อ่านก่อนเริ่ม

สัปดาห์นี้เป็น **เรื่องใหม่ทั้งหมด** — คุณยังไม่เคยเจอ SQL มาก่อน และจะได้เรียนวิชาฐานข้อมูลเต็ม ๆ ในเทอมหน้า

> **สัปดาห์นี้จะไม่แตะโค้ด Node เลยแม้แต่บรรทัดเดียว**
>
> เราจะอยู่กับ SQL อย่างเดียวทั้งคาบ เพื่อให้คล่องก่อน · สัปดาห์หน้าค่อยเอา SQL ที่เขียนเป็นแล้วไปใส่ในโปรแกรม
>
> เหมือนตอน Week 06 ที่เราไปเล่น API ของคนอื่นก่อน แล้วค่อยสร้างเอง — **เห็นของจริงก่อน เข้าใจง่ายกว่า**

| | ทำอะไร |
|---|---|
| **🏫 ในห้อง (คู่มือนี้)** | CP17–CP21 · เขียน SQL เป็น · สร้างฐานข้อมูลของตัวเองได้ |
| 🏠 ที่บ้าน | CP22–CP25 · queries · schema.sql · เอกสาร · ทดสอบ constraint |
| ⭐ Challenge | GROUP BY · LEFT JOIN · INDEX |

---

## เครื่องมือ — บันได 3 ขั้น

| ขั้น | เครื่องมือ | ใช้ตอน | ทำไมตรงนี้ |
|---|---|---|---|
| **①** | **SQL playground ออนไลน์** | CP17 | เปิดปุ๊บพิมพ์ได้เลย **ไม่ต้องติดตั้งอะไร** |
| **②** | **VS Code + SQLite extension** | CP19–CP21 | เครื่องมือจริงที่จะใช้สัปดาห์หน้า |
| **③** | `campus.db` ของตัวเอง | ปิดคาบ | **เป็นอินพุตของสัปดาห์ที่ 10** |

### ขั้นที่ ① ใช้ฟรีที่ไหน

**เกณฑ์ที่ใช้เลือก** — ต้องเป็น **SQLite แท้** (เพราะสัปดาห์หน้าใช้ `node:sqlite`) และ **ไม่ต้องสมัครสมาชิก**

| เว็บ | เครื่องยนต์ | เหมาะกับเราไหม |
|---|---|---|
| **[sqlime.org](https://sqlime.org/)** | **SQLite แท้** ทำงานในเบราว์เซอร์ | **⭐ แนะนำ** — ข้อมูลไม่ออกจากเครื่อง · โหลดไฟล์ `.db` เข้ามาดูได้ |
| [sqliteonline.com](https://sqliteonline.com/) | SQLite แท้ | ใช้ได้ — หน้าตาใกล้โปรแกรมจริง |
| [db-fiddle.com](https://www.db-fiddle.com/) | เลือกได้ มี SQLite | สำรอง — **ต้องเลือกเครื่องยนต์เป็น SQLite ก่อน** |
| W3Schools Try SQL | เครื่องยนต์ของตัวเอง | **ไม่เหมาะ** — ไม่ใช่ SQLite และแก้ข้อมูลตั้งต้นไม่ได้ |

### ⚠ ข้อควรระวังของ playground ทุกเจ้า

| ข้อ | รายละเอียด |
|---|---|
| ปิดหน้าเว็บแล้วข้อมูลหาย | เหมาะกับการลองพิมพ์เท่านั้น ไม่ใช่ที่เก็บงาน |
| ต้องสร้างตารางเองทุกครั้ง | วาง `CREATE TABLE` + `INSERT` ใหม่ทุกรอบที่เปิด |
| บางเจ้า syntax ต่างเล็กน้อย | จึงต้องย้ายมาขั้น ② ก่อนจบครึ่งคาบแรก |

> **งานที่ส่งต้องทำจากขั้นที่ ② และ ③ เท่านั้น**

### ถ้าเน็ตล่มหรือเว็บเข้าไม่ได้ — ทางสำรองที่ไม่ต้องใช้เน็ต

Node 22 มี SQLite มาให้แล้ว ลอง SQL ได้ทันทีโดยไม่ต้องติดตั้งอะไรเพิ่ม

```js
// try.mjs — สนามซ้อม SQL แบบออฟไลน์
import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync(':memory:');   // เก็บใน RAM ไม่สร้างไฟล์

db.exec(`
  CREATE TABLE requests (id TEXT, status TEXT, priority TEXT);
  INSERT INTO requests VALUES ('REQ-001','pending','urgent');
  INSERT INTO requests VALUES ('REQ-002','completed','normal');
`);

// เปลี่ยน SQL บรรทัดนี้แล้วรันใหม่ได้เรื่อย ๆ
console.table(db.prepare("SELECT * FROM requests WHERE status = 'pending'").all());
```

```bash
node --disable-warning=ExperimentalWarning try.mjs
```

> `console.table()` แสดงผลเป็นตารางใน terminal · `':memory:'` เก็บใน RAM ปิดแล้วหาย
> **ข้อดี — เป็น SQLite ตัวเดียวกับที่ใช้จริงสัปดาห์หน้าแน่นอน**

> **ทำไมไม่เริ่มที่ VS Code เลย** — เพราะการติดตั้งเครื่องมือกินเวลาคาบมากที่สุด และมักมีคนติดปัญหาจนตกขบวน
> เริ่มออนไลน์ทำให้ **ทุกคนได้เขียน SQL ตัวแรกภายใน 2 นาที**

---

## แผนที่ของวันนี้

| CP | ทำอะไร | เครื่องมือ | เวลา |
|---|---|---|---|
| **CP17** | เขียน SQL ครั้งแรก — SELECT · WHERE · ORDER BY | ① ออนไลน์ | 60 นาที |
| **CP18** | ออกแบบตาราง — ทำไมต้องแยก | กระดาษ | 35 นาที |
| **CP19** | สร้างฐานข้อมูลจริง — CREATE TABLE + INSERT | ② VS Code | 45 นาที |
| **CP20** | CRUD ครบ — INSERT · UPDATE · DELETE | ② VS Code | 30 นาที |
| **CP21** | JOIN — ดึงข้อมูล 2 ตารางมารวมกัน | ② VS Code | 35 นาที |

**เป้าหมายตอนจบ** — `node check-week09.mjs --inclass` ผ่าน **11/11**

---

# CP17 · เขียน SQL ครั้งแรก

**🏫 60 นาที · I do → We do · ใช้ SQL playground ออนไลน์**

## ทำไมเริ่มตรงนี้

SQL ต่างจาก JavaScript ตรงที่ **บอกว่าอยากได้อะไร ไม่ใช่บอกวิธีหา**

| JavaScript — บอกวิธีทำ | SQL — บอกผลที่อยากได้ |
|---|---|
| `requests.filter(r => r.status === 'pending')` | `SELECT * FROM requests WHERE status = 'pending';` |
| เราบอกขั้นตอน วนลูป เช็คทีละตัว | **ฐานข้อมูลคิดวิธีที่เร็วที่สุดให้เอง** |

## ⓪ เตรียม playground ก่อน — วาง seed ให้มีตารางก่อน

**playground เริ่มต้นเป็นฐานข้อมูลเปล่า** — ถ้ารัน `SELECT * FROM requests` เลยจะได้ error ว่า `no such table: requests`

จึงต้อง **สร้างตารางและใส่ข้อมูลตัวอย่างก่อน** ด้วยการวางไฟล์ `playground-seed.sql` (อยู่ใน `lab09/starter/`)

### ขั้นตอน

1. เปิด [sqlime.org](https://sqlime.org/)
2. เปิดไฟล์ `lab09/starter/playground-seed.sql` แล้ว **คัดลอกทั้งไฟล์**
3. วางในช่องพิมพ์ของ playground แล้วกด **Run**
4. ถ้าเห็นตาราง 5 แถวโผล่ขึ้นมา = พร้อมแล้ว

```sql
-- playground-seed.sql มีให้ 3 ส่วน:
-- ① CREATE TABLE users + requests   (สร้างตาราง)
-- ② INSERT ข้อมูลตัวอย่าง            (users 4 คน · requests 5 รายการ)
-- ③ SELECT * FROM requests;          (ทดสอบว่าได้ 5 แถว)
```

> **⚠ ทำไมต้องวาง seed ทุกครั้งที่เปิด playground ใหม่**
> playground เก็บข้อมูลไว้ชั่วคราว — ปิดหน้าเว็บหรือรีเฟรชแล้ว **ตารางหาย** ต้องวาง seed ใหม่
> นี่คือเหตุผลที่ playground เหมาะกับการ "ลองพิมพ์" เท่านั้น · ของจริงทำใน VS Code (CP19)

> **ถ้าใช้ทางสำรองแบบออฟไลน์** (`try.mjs` ที่เอกสารบทที่ 0.4) — เนื้อหา CREATE + INSERT เดียวกันนี้อยู่ในไฟล์นั้นแล้ว รันได้เลย

---

## ① SELECT — อ่านข้อมูล

> ต้องวาง seed จากขั้น ⓪ ก่อน ไม่งั้นจะได้ `no such table`

```sql
-- ดูทั้งหมด
SELECT * FROM requests;

-- เอาเฉพาะบางคอลัมน์
SELECT id, location, status FROM requests;

-- ตั้งชื่อใหม่ให้คอลัมน์
SELECT id, request_type AS requestType FROM requests;
```

### ⚠ `SELECT *` ใช้ตอนสำรวจ ไม่ใช่ตอนเขียนโค้ดจริง

ถ้ามีคนเพิ่มคอลัมน์ใหม่ในตาราง โค้ดของคุณจะได้ข้อมูลเกินมาโดยไม่รู้ตัว · และถ้าคอลัมน์นั้นมีข้อมูลอ่อนไหวก็หลุดออกไปด้วย

## ② WHERE — กรองเฉพาะที่ต้องการ

```sql
SELECT * FROM requests WHERE status = 'pending';

-- เงื่อนไข 2 ข้อพร้อมกัน
SELECT * FROM requests WHERE priority = 'urgent' AND status <> 'completed';

-- อยู่ในรายการ
SELECT * FROM requests WHERE status IN ('pending','in-progress');

-- ค้นจากคำบางส่วน
SELECT * FROM requests WHERE details LIKE '%ไม่ทำงาน%';
```

### ⚠ กับดัก 3 อันที่คนเขียน JavaScript มาก่อนมักพลาด

| ผิด | ถูก | ทำไม |
|---|---|---|
| `status == 'pending'` | `status = 'pending'` | SQL ใช้ `=` **ตัวเดียว** |
| `email = NULL` | `email IS NULL` | `NULL` แปลว่า "ไม่รู้ค่า" เทียบเท่ากับอะไรไม่ได้ |
| `status = "pending"` | `status = 'pending'` | SQL ใช้คำพูด**เดี่ยว**สำหรับข้อความ |

> ข้อกลางอันตรายที่สุด — `= NULL` จะ **ไม่เจออะไรเลยและไม่มี error บอก**

## ③ ORDER BY — เรียงลำดับ

```sql
SELECT * FROM requests ORDER BY created_at;        -- น้อยไปมาก
SELECT * FROM requests ORDER BY created_at DESC;   -- มากไปน้อย
SELECT * FROM requests ORDER BY priority DESC, id; -- เรียงหลายชั้น
```

## ④ ลำดับคำสั่ง — บังคับตายตัว

```sql
SELECT   คอลัมน์      -- เอาอะไร
FROM     ตาราง        -- จากไหน
WHERE    เงื่อนไข      -- กรองยังไง
ORDER BY คอลัมน์      -- เรียงยังไง
LIMIT    จำนวน;       -- เอากี่อัน
```

**สลับลำดับไม่ได้** — เขียน `ORDER BY` ก่อน `WHERE` จะ error ทันที

### ✓ ผ่าน CP17 เมื่อ

- [ ] วาง `playground-seed.sql` แล้วเห็นตาราง 5 แถว
- [ ] เขียน `SELECT` เลือกคอลัมน์ที่ต้องการได้
- [ ] กรองด้วย `WHERE` ได้ทั้งเงื่อนไขเดียวและหลายเงื่อนไข
- [ ] ใช้ `LIKE` ค้นจากคำบางส่วนได้
- [ ] เรียงด้วย `ORDER BY` ได้ทั้ง `ASC` และ `DESC`

### 💬 คำถามที่ต้องตอบได้

> ทำไม `email = NULL` ถึงไม่เจออะไรเลย ทั้งที่มีแถวที่ email ว่าง

---

# CP18 · ออกแบบตาราง

**🏫 35 นาที · อภิปรายร่วมกัน · ยังไม่ต้องเปิดคอมพิวเตอร์**

## คำถามที่ตอบทั้ง checkpoint นี้

ตอน Week 06–07 เราเก็บข้อมูลแบบนี้

```json
{ "id": "REQ-001", "requesterName": "สมชาย ใจดี", "location": "...", ... }
{ "id": "REQ-004", "requesterName": "สมชาย ใจดี", "location": "...", ... }
```

> **ถ้าสมชายแจ้งไว้ 20 รายการ แล้ววันหนึ่งเขาเปลี่ยนชื่อ — ต้องแก้กี่ที่**

**คำตอบคือ 20 ที่** — และถ้าแก้ไม่ครบ ฐานข้อมูลจะมีทั้งชื่อเก่าและชื่อใหม่ปนกัน

## ปัญหา 4 อย่างของการเก็บซ้ำ

| ปัญหา | เกิดอะไรขึ้น |
|---|---|
| **ข้อมูลซ้ำโดยไม่จำเป็น** | แจ้ง 20 ครั้ง = เก็บชื่อ 20 ครั้ง |
| **แก้ไขแล้วไม่ครบ** | เรียกว่า *update anomaly* — แก้ที่เดียวไม่พอ |
| **เก็บข้อมูลเพิ่มไม่ได้** | อยากเก็บอีเมลด้วย ต้องเพิ่มในทุกแถวและซ้ำอีก |
| **พิมพ์ผิดแล้วไม่มีใครรู้** | `'สมชย ใจดี'` ระบบยอมรับปกติ เพราะเป็นแค่ข้อความ |

## แยกเป็น 2 ตาราง

```
┌─────────────────┐          ┌──────────────────────┐
│ users           │          │ requests             │
├─────────────────┤          ├──────────────────────┤
│ id      (PK)    │◄────────┐│ id            (PK)   │
│ name            │         └│ requester_id  (FK)   │
│ department      │          │ request_type         │
│ email   (UNIQUE)│          │ location · details   │
└─────────────────┘          │ priority · status    │
                             │ created_at           │
      1 คน แจ้งได้หลายคำร้อง   └──────────────────────┘
```

## งานของ CP18 — ออกแบบบนกระดาษก่อน

1. วาดตารางทั้งสองพร้อมคอลัมน์
2. **วงกลม Primary Key ของแต่ละตาราง**
3. **ลากเส้นแสดง Foreign Key**
4. เขียนข้าง ๆ ว่าแต่ละคอลัมน์ควรมี constraint อะไร (`NOT NULL` / `UNIQUE` / `CHECK` / `DEFAULT`)

### ⚠ อย่าเพิ่งเขียน SQL

ออกแบบให้เสร็จก่อนแล้วค่อยลงมือ · **ถ้าออกแบบผิดแล้วสร้างไปแล้ว จะแก้ยากกว่า**

### ✓ ผ่าน CP18 เมื่อ

- [ ] วาดตารางทั้งสองพร้อม PK และ FK ได้
- [ ] อธิบายได้ว่าทำไมต้องแยก `users` ออกมา
- [ ] ระบุได้ว่าคอลัมน์ไหนควรมี constraint อะไร

### 💬 คำถามที่ต้องตอบได้

> ทำไม `requests` ต้องเก็บ `requester_id` (ตัวเลข) แทนที่จะเก็บ `requester_name` (ชื่อ)

---

# CP19 · สร้างฐานข้อมูลจริง

**🏫 45 นาที · We do · ย้ายมา VS Code**

## เตรียมเครื่องมือ

1. เปิด VS Code
2. ติดตั้ง extension สำหรับ SQLite (ผู้สอนจะบอกชื่อที่ใช้ในคาบ)
3. สร้างโฟลเดอร์งานของสัปดาห์นี้

> **ทำไมต้องย้ายจากออนไลน์** — online playground บางเจ้ามี syntax ต่างจาก SQLite แท้เล็กน้อย **ไม่ควรให้ติดนิสัย**
> และ VS Code คือเครื่องมือที่จะใช้จริงสัปดาห์หน้าตอนต่อ Node

## ① เปิดการตรวจ Foreign Key ก่อนเสมอ

```sql
PRAGMA foreign_keys = ON;
```

### ⚠ ข้อนี้สำคัญมาก

SQLite **ปิดการตรวจ Foreign Key ไว้เป็นค่าเริ่มต้น** · ถ้าไม่เปิด คำสั่งที่ควรถูกปฏิเสธจะผ่านหมด และคุณจะไม่รู้เลยว่าข้อมูลเสียแล้ว

**ต้องสั่งทุกครั้งที่เปิดฐานข้อมูล** ไม่ใช่สั่งครั้งเดียวแล้วจำไปตลอด

## ② สร้างตาราง users

```sql
CREATE TABLE users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  department  TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE
);
```

## ③ สร้างตาราง requests

```sql
CREATE TABLE requests (
  id            TEXT PRIMARY KEY,
  requester_id  INTEGER NOT NULL,
  request_type  TEXT NOT NULL
                CHECK (request_type IN ('แจ้งซ่อม','บริการบัญชีผู้ใช้','ขอใช้อุปกรณ์','อื่น ๆ')),
  location      TEXT NOT NULL,
  details       TEXT NOT NULL,
  priority      TEXT NOT NULL DEFAULT 'normal'
                CHECK (priority IN ('normal','urgent')),
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','in-progress','completed')),
  created_at    TEXT NOT NULL DEFAULT (datetime('now','localtime')),

  FOREIGN KEY (requester_id) REFERENCES users(id)
);
```

### สังเกต 3 อย่างในโค้ดนี้

| สิ่งที่เห็น | ทำอะไร |
|---|---|
| `CHECK (... IN (...))` | จำกัดให้ใส่ได้เฉพาะค่าที่กำหนด |
| `DEFAULT 'pending'` | ถ้าไม่ใส่ ฐานข้อมูลเติมให้เอง |
| `FOREIGN KEY ... REFERENCES` | บังคับว่า `requester_id` ต้องมีอยู่จริงใน `users` |

## ④ ใส่ข้อมูลตั้งต้น

```sql
INSERT INTO users (name, department, email) VALUES
  ('สมชาย ใจดี',      'วิศวกรรมซอฟต์แวร์', 'somchai@rmutl.ac.th'),
  ('สุภาวดี รักเรียน', 'วิศวกรรมซอฟต์แวร์', 'supawadee@rmutl.ac.th'),
  ('ธนกฤต ตั้งใจ',     'วิศวกรรมไฟฟ้า',     'thanakrit@rmutl.ac.th'),
  ('ปรียา ขยันยิ่ง',   'สำนักวิทยบริการ',   'preeya@rmutl.ac.th');
```

**ต้องใส่ `users` ก่อน `requests` เสมอ** — เพราะคำร้องต้องชี้ไปหาผู้ใช้ที่มีอยู่จริงแล้ว

```sql
INSERT INTO requests (id, requester_id, request_type, location, details, priority, status) VALUES
  ('REQ-001', 1, 'แจ้งซ่อม',          'ห้องปฏิบัติการ 301', 'เครื่องปรับอากาศไม่ทำงานตั้งแต่เช้า', 'urgent', 'pending'),
  ('REQ-002', 2, 'บริการบัญชีผู้ใช้', 'อาคารวิศวกรรม',      'เข้าสู่ระบบห้องปฏิบัติการไม่ได้',     'normal', 'in-progress'),
  ('REQ-003', 3, 'ขอใช้อุปกรณ์',      'ห้องประชุม 2',        'ขอยืมโปรเจกเตอร์',                 'normal', 'completed'),
  ('REQ-004', 1, 'แจ้งซ่อม',          'ห้องปฏิบัติการ 302', 'คอมพิวเตอร์เครื่องที่ 5 เปิดไม่ติด', 'urgent', 'pending'),
  ('REQ-005', 4, 'อื่น ๆ',             'ห้องสมุด ชั้น 2',     'ขอเพิ่มปลั๊กไฟบริเวณโต๊ะอ่านหนังสือ', 'normal', 'pending');
```

## ⑤ ตรวจว่าสร้างสำเร็จ

```sql
SELECT COUNT(*) FROM users;     -- ต้องได้ 4
SELECT COUNT(*) FROM requests;  -- ต้องได้ 5
```

### ✓ ผ่าน CP19 เมื่อ

- [ ] มีไฟล์ `campus.db` ที่มีทั้ง 2 ตาราง
- [ ] `users` มี 4 คน · `requests` มี 5 รายการ
- [ ] เปิดการตรวจ Foreign Key แล้ว

### 💬 คำถามที่ต้องตอบได้

> ทำไมต้อง `INSERT` ลง `users` ก่อน `requests`

---

# CP20 · CRUD ครบ

**🏫 30 นาที · You do**

## ① INSERT — เพิ่มคำร้องของตัวเอง

```sql
INSERT INTO requests (id, requester_id, request_type, location, details)
VALUES ('REQ-006', 2, 'แจ้งซ่อม', 'ห้อง 401', 'ไฟกะพริบตลอดเวลา');
```

**สังเกตว่าไม่ได้ใส่ `priority`, `status`, `created_at`** — เพราะทั้งสามมี `DEFAULT`

ตรวจดูว่าฐานข้อมูลเติมอะไรให้

```sql
SELECT id, priority, status, created_at FROM requests WHERE id = 'REQ-006';
```

## ② UPDATE — เปลี่ยนสถานะ

```sql
UPDATE requests SET status = 'in-progress' WHERE id = 'REQ-006';
```

### ⚠ กับดักที่อันตรายที่สุดของคาบนี้ — ลืม WHERE

```sql
UPDATE requests SET status = 'completed';   -- ไม่มี WHERE
```

คำสั่งนี้จะ **เปลี่ยนสถานะของคำร้องทุกรายการในระบบ** · ไม่มี error ไม่มีคำเตือน และ **ย้อนกลับไม่ได้**

### นิสัยที่ต้องสร้างตั้งแต่วันนี้

```sql
-- ① ดูก่อนว่าจะกระทบกี่แถว
SELECT * FROM requests WHERE id = 'REQ-006';

-- ② ถ้าถูกต้องแล้วค่อยเปลี่ยนเป็น UPDATE
UPDATE requests SET status = 'in-progress' WHERE id = 'REQ-006';
```

## ③ DELETE — ลบคำร้อง

```sql
DELETE FROM requests WHERE id = 'REQ-006';
```

`DELETE FROM requests;` อันตรายกว่า `UPDATE` อีก เพราะข้อมูลหายไปเลย · **ใช้วิธีเดียวกัน — SELECT ดูก่อนเสมอ**

## ④ ลองทำผิดดู — ให้เห็นว่า constraint ทำงาน

```sql
-- ควรถูกปฏิเสธ: ไม่มีผู้ใช้ id = 999
INSERT INTO requests (id, requester_id, request_type, location, details)
VALUES ('REQ-X', 999, 'แจ้งซ่อม', 'ที่ไหนสักแห่ง', 'ทดสอบระบบ');

-- ควรถูกปฏิเสธ: status ไม่อยู่ในรายการ
UPDATE requests SET status = 'ยกเลิก' WHERE id = 'REQ-001';

-- ควรถูกปฏิเสธ: สมชายยังมีคำร้องค้างอยู่
DELETE FROM users WHERE id = 1;
```

**ทั้งสามคำสั่งต้องได้ error** — ถ้าผ่านได้แปลว่าลืม `PRAGMA foreign_keys = ON` หรือ constraint เขียนไม่ครบ

### ✓ ผ่าน CP20 เมื่อ

- [ ] เพิ่ม แก้ไข และลบคำร้องได้
- [ ] เห็นว่า `DEFAULT` เติมค่าให้เองเมื่อไม่ได้ระบุ
- [ ] **ลองทำผิดทั้ง 3 แบบแล้วเห็น error จริง**

### 💬 คำถามที่ต้องตอบได้

> ทำไมลบผู้ใช้ที่ยังมีคำร้องค้างอยู่ไม่ได้ และถ้าอยากลบจริง ๆ ต้องทำอย่างไร

---

# CP21 · JOIN

**🏫 35 นาที · We do → You do**

เราแยกข้อมูลเป็น 2 ตารางเพื่อไม่ให้ซ้ำ — แต่เวลาใช้งานจริง **ต้องการเห็นพร้อมกัน**

## ① รูปแบบพื้นฐาน

```sql
SELECT r.id,
       u.name AS requesterName,
       r.status
FROM requests r
JOIN users u ON u.id = r.requester_id;
```

| บรรทัด | หมายความว่า |
|---|---|
| `FROM requests r` | เริ่มจากตาราง `requests` · ตั้งชื่อย่อว่า `r` |
| `JOIN users u` | เอาตาราง `users` มาต่อ · ตั้งชื่อย่อว่า `u` |
| `ON u.id = r.requester_id` | **เชื่อมตรงไหน** — แถวที่ค่าตรงกัน |

### ทำไมต้องใช้ชื่อย่อ

ทั้งสองตารางมีคอลัมน์ชื่อ `id` — ถ้าไม่ระบุว่า `r.id` หรือ `u.id` ฐานข้อมูลจะไม่รู้ว่าหมายถึงอันไหน

## ② JOIN ร่วมกับ WHERE

```sql
SELECT r.id, u.name, r.details
FROM requests r
JOIN users u ON u.id = r.requester_id
WHERE u.department = 'วิศวกรรมซอฟต์แวร์'
ORDER BY r.id;
```

**สังเกตว่ากรองด้วยคอลัมน์จากตาราง `users` ได้** ทั้งที่เริ่มจาก `requests` — เพราะ `JOIN` ทำให้ทั้งสองตารางกลายเป็นตารางเดียวชั่วคราว

## ③ งานของคุณ — เขียน 4 query

| ข้อ | เขียน query ที่ |
|---|---|
| ① | แสดงคำร้องพร้อม**ชื่อผู้แจ้ง** |
| ② | แสดงคำร้องพร้อม**ชื่อและภาควิชา** |
| ③ | กรองเฉพาะคำร้องของ**ภาควิชาหนึ่ง** |
| ④ | ตั้งชื่อคอลัมน์ด้วย `AS` ให้ออกมาเป็น `requesterName` |

## ④ สังเกตผลลัพธ์ของข้อ ④ ให้ดี

```
id       | requesterName    | status
---------|------------------|-------------
REQ-001  | สมชาย ใจดี        | pending
REQ-002  | สุภาวดี รักเรียน   | in-progress
```

**เปรียบเทียบกับข้อมูลที่ API ส่งให้ React ตอน Week 07**

```json
{ "id": "REQ-001", "requesterName": "สมชาย ใจดี", "status": "pending" }
```

> **เหมือนกันทุกประการ**
>
> แปลว่า **โครงสร้างในฐานข้อมูลไม่จำเป็นต้องเหมือนรูปแบบที่ API ส่งออก**
> ในฐานข้อมูลแยก 2 ตารางเพื่อไม่ให้ซ้ำ · ตอนส่งออกรวมกลับเป็นก้อนเดียว
> **นี่คือหน้าที่ของชั้น service — สัปดาห์หน้าเราจะทำตรงนี้**

### ⚠ กับดักของ JOIN — ลืม ON

เขียน `FROM requests, users` เฉย ๆ จะได้ **ทุกแถวจับคู่กับทุกแถว** = 5 × 4 = 20 แถวที่ไม่มีความหมาย และ**ไม่มี error บอก**

> ถ้าผลลัพธ์ออกมาเยอะผิดปกติ ให้ตรวจ `ON` เป็นอันดับแรก

### ✓ ผ่าน CP21 เมื่อ

- [ ] เขียน `JOIN` ได้ครบทั้ง 4 ข้อ
- [ ] อธิบายได้ว่า `ON` ทำหน้าที่อะไร
- [ ] **เห็นว่าผลลัพธ์ข้อ ④ เหมือนข้อมูลที่ API ส่งให้ React**

### 💬 คำถามที่ต้องตอบได้

> ถ้าลืมเขียน `ON` จะเกิดอะไรขึ้น และจะสังเกตได้อย่างไร

---

# ตรวจงานตอนจบคาบ

```bash
node --disable-warning=ExperimentalWarning check-week09.mjs --inclass
```

**ต้องได้ `🏫 ในห้อง (CP17–CP21) ผ่าน 11/11 รายการ`**

## ถ้ายังไม่ครบ

```bash
node --disable-warning=ExperimentalWarning check-week09.mjs --inclass | grep TODO
```

## ตารางไล่ปัญหาที่พบบ่อย

| อาการ | สาเหตุที่พบบ่อย |
|---|---|
| `no such table: users` | ยังไม่ได้รัน `CREATE TABLE` หรือเปิดคนละไฟล์ฐานข้อมูล |
| `FOREIGN KEY constraint failed` ตอน INSERT | `requester_id` ชี้ไปหาผู้ใช้ที่ยังไม่มี — ใส่ `users` ก่อน |
| ใส่ `requester_id` มั่วแล้วผ่าน | **ลืม `PRAGMA foreign_keys = ON`** |
| `CHECK constraint failed` | ค่าที่ใส่ไม่อยู่ในรายการที่ CHECK กำหนด — ตรวจการสะกด |
| `UNIQUE constraint failed` | `id` หรือ `email` ซ้ำกับที่มีอยู่แล้ว |
| JOIN ได้ผลลัพธ์เยอะผิดปกติ | ลืม `ON` — ทุกแถวจับคู่กับทุกแถว |
| JOIN ไม่ได้ผลลัพธ์เลย | `ON` เชื่อมคอลัมน์ผิด — ตรวจว่าเป็น `u.id = r.requester_id` |
| `UPDATE` เปลี่ยนหมดทุกแถว | **ลืม `WHERE`** — ไม่มีทางกู้คืน ต้องรัน `schema.sql` ใหม่ |

---

## เช็คลิสต์ก่อนออกจากห้อง

- [ ] `check-week09.mjs --inclass` ผ่าน **11/11**
- [ ] มีไฟล์ `campus.db` ที่ query ได้จริง
- [ ] เขียน SELECT · WHERE · ORDER BY · INSERT · UPDATE · DELETE · JOIN เป็น
- [ ] **ลองทำผิดแล้วเห็น constraint ปฏิเสธจริง**
- [ ] commit แล้ว: `git add -A && git commit -m "LAB09 in-class: SQL และฐานข้อมูลเชิงสัมพันธ์"`
- [ ] รู้ว่าต้องทำอะไรต่อที่บ้าน (เปิดคู่มือ Take-Home)

---

## 5 คำถามที่ต้องตอบได้ทั้งหมด

1. ทำไม `email = NULL` ถึงไม่เจออะไรเลย ทั้งที่มีแถวที่ email ว่าง
2. ทำไม `requests` ต้องเก็บ `requester_id` แทนที่จะเก็บ `requester_name`
3. ทำไมต้อง `INSERT` ลง `users` ก่อน `requests`
4. ทำไมลบผู้ใช้ที่ยังมีคำร้องค้างอยู่ไม่ได้
5. ถ้าลืมเขียน `ON` ใน JOIN จะเกิดอะไรขึ้น

---

## ภาคผนวก · คำสั่ง SQL ที่ใช้บ่อย

```sql
-- เปิดการตรวจ Foreign Key (ต้องสั่งทุกครั้งที่เปิดฐานข้อมูล)
PRAGMA foreign_keys = ON;

-- ดูว่ามีตารางอะไรบ้าง
SELECT name FROM sqlite_master WHERE type='table';

-- ดูโครงสร้างของตาราง
PRAGMA table_info(requests);

-- ดู Foreign Key ของตาราง
PRAGMA foreign_key_list(requests);

-- นับจำนวนแถว
SELECT COUNT(*) FROM requests;
```

## ภาคผนวก · ศัพท์ของสัปดาห์นี้

| คำ | หมายถึง |
|---|---|
| ตาราง (table) | โครงสร้างเก็บข้อมูล เทียบเท่า array ของ object |
| แถว (row) | ข้อมูล 1 รายการ เทียบเท่า object 1 ตัว |
| คอลัมน์ (column) | ช่องข้อมูล เทียบเท่า property |
| Primary Key | คอลัมน์ที่ระบุแถวได้ไม่ซ้ำกัน |
| Foreign Key | คอลัมน์ที่ชี้ไปยัง PK ของอีกตาราง |
| Constraint | กฎที่ฐานข้อมูลบังคับเอง |
| Update anomaly | ปัญหาที่แก้ข้อมูลที่เดียวไม่พอ ต้องแก้หลายที่ |
| JOIN | การรวมสองตารางเป็นตารางเดียวชั่วคราว |
