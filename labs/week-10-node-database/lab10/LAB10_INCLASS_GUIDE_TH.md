# ENGSE203 LAB 10 — คู่มือ In-Class

**🏫 ทำในห้อง · CP26 → CP30 · เชื่อม Node เข้ากับฐานข้อมูล**
**หน่วยที่ 4 · สัปดาห์ที่ 10 · ปฏิบัติ 3 ชั่วโมง**

---

## 🖥️ หน้าจอ Live-Coding (ฉายประกอบการสอน)

ระหว่างสอนแต่ละ CP เปิดหน้าจอ live-coding คู่กันได้ — มีโค้ดทีละขั้น กล่องเตือนกับดัก และเช็คลิสต์

| Checkpoint | เนื้อหา | เปิด |
|---|---|---|
| CP26 | เปิดฐานข้อมูลจาก Node | [เปิด](https://se-rmutl.github.io/engse203/week10/guides/ENGSE203_Week10_CP26_LiveCoding.html) |
| CP27 | กับดัก path สัมพัทธ์ | [เปิด](https://se-rmutl.github.io/engse203/week10/guides/ENGSE203_Week10_CP27_LiveCoding.html) |
| CP28 | findAll + findById ด้วย JOIN | [เปิด](https://se-rmutl.github.io/engse203/week10/guides/ENGSE203_Week10_CP28_LiveCoding.html) |
| CP29 | create แปลงชื่อเป็น id | [เปิด](https://se-rmutl.github.io/engse203/week10/guides/ENGSE203_Week10_CP29_LiveCoding.html) |
| CP30 | CRUD ครบ + พิสูจน์ว่าไม่พัง | [เปิด](https://se-rmutl.github.io/engse203/week10/guides/ENGSE203_Week10_CP30_LiveCoding.html) |

> ไฟล์ต้นฉบับอยู่ใน  ของ LAB นี้ · เปิดออฟไลน์ได้

---

## อ่านก่อนเริ่ม

สัปดาห์นี้คือ**ครึ่งหลังของหน่วยที่ 4** — สัปดาห์ที่แล้วเรียน SQL โดยไม่แตะโค้ด วันนี้เอา SQL นั้นมาใส่ในโปรแกรมจริง

> **ประโยคแกนกลางของวันนี้**
> **query ที่เขียนสัปดาห์ที่แล้ว กลายเป็นโค้ดวันนี้ — และแก้แค่ไฟล์เดียว**

### สิ่งที่ต้องมีติดตัวมา

| ไฟล์ | จากไหน | ถ้าไม่มี |
|---|---|---|
| `campus.db` | สัปดาห์ที่ 9 | ผู้สอนมีสำรองให้ |
| `queries.sql` | สัปดาห์ที่ 9 | ใช้ของสำรองได้ แต่จะเสียโอกาสเห็น query ตัวเองกลายเป็นโค้ด |
| โปรเจกต์ Week 07 | สัปดาห์ที่ 7 | ผู้สอนมี snapshot ให้ |

### เป้าหมายตอนจบคาบ

**แอปทำงานเหมือนเดิมทุกอย่าง แต่ข้อมูลอยู่ในฐานข้อมูลแล้ว**

| ตรวจ | ต้องได้ |
|---|---|
| `node check-week10.mjs --inclass` | **20/20** |
| `node check-week07.mjs` | **36/36 — ของเดิมไม่พัง** |
| ไฟล์ที่แก้ | **`requestService.js` ไฟล์เดียว** |

---

## แผนที่ของวันนี้

| CP | ทำอะไร | เวลา |
|---|---|---|
| **CP26** | เปิดฐานข้อมูลจาก Node ด้วย `node:sqlite` | 30 นาที |
| **CP27** | แก้ path ให้อ้างจากตำแหน่งไฟล์ | 25 นาที |
| **CP28** | `findAll` + `findById` ด้วย JOIN | 50 นาที |
| **CP29** | `create` แปลงชื่อเป็น id | 35 นาที |
| **CP30** | `updateStatus` + `remove` · ตรวจครบ | 40 นาที |

---

# เตรียมก่อนเริ่ม

## ① วาง `campus.db` และ `schema.sql` ให้ถูกที่

```
api/
├── data/
│   ├── campus.db      ← จากสัปดาห์ที่ 9
│   └── schema.sql     ← จากสัปดาห์ที่ 9
└── src/
    └── services/requestService.js   ← ไฟล์เดียวที่จะแก้วันนี้
```

## ② ตรวจว่า Node รุ่นถูกต้อง

```bash
node -v          # ต้อง >= 22.12.0
```

`node:sqlite` มากับ Node 22 อยู่แล้ว — **ไม่ต้อง `npm install` อะไรเพิ่ม**

## ③ รู้จัก ExperimentalWarning ก่อนเจอ

`node:sqlite` ยังเป็นฟีเจอร์ทดลอง จะขึ้นคำเตือนทุกครั้งที่รัน

**ไม่ใช่ error** — `package.json` ใส่ `--disable-warning=ExperimentalWarning` ให้แล้ว

---

## ⓪ รับของจากสัปดาห์ที่ 9 ก่อน

สัปดาห์นี้ต่อยอดจากฐานข้อมูลที่สร้างไว้สัปดาห์ที่แล้ว · **ต้องเอาไฟล์มาวางก่อน**

| ไฟล์ | เอามาจาก | วางไว้ที่ |
|---|---|---|
| `schema.sql` | งาน W09 ของตัวเอง | `lab10/starter/api/data/schema.sql` |
| `campus.db` | งาน W09 ของตัวเอง (ถ้ามี) | `lab10/starter/api/data/campus.db` |

```bash
# ถ้ามีแค่ schema.sql — สร้าง campus.db จากมัน
cd lab10/starter/api
cp /path/to/week09/schema.sql data/schema.sql
npm run db:setup
```

> **starter ไม่มี schema.sql ให้** — เพราะเป็นของที่คุณสร้างเองสัปดาห์ที่แล้ว
> **ถ้าทำ W09 ไม่เสร็จ** — ขอไฟล์สำรองจากผู้สอน แล้ววางที่ `data/schema.sql`

---

# CP26 · เปิดฐานข้อมูลจาก Node

**🏫 30 นาที · I do → We do**

## เป้าหมาย

เปิด `campus.db` จากโค้ดได้ และดึงข้อมูลออกมาดูได้

## ① เครื่องมือที่ต้องรู้ 4 อย่าง

```js
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('./data/campus.db');
db.exec('PRAGMA foreign_keys = ON');       // ⚠ ต้องสั่งทุกครั้ง
```

| คำสั่ง | ใช้เมื่อ | คืนอะไร |
|---|---|---|
| `db.exec(sql)` | ไม่ต้องการผลลัพธ์ · หลายคำสั่งพร้อมกัน | — |
| `db.prepare(sql).all(...)` | ต้องการ**หลายแถว** | array |
| `db.prepare(sql).get(...)` | ต้องการ**แถวเดียว** | object หรือ `undefined` |
| `db.prepare(sql).run(...)` | INSERT · UPDATE · DELETE | `{ changes, lastInsertRowid }` |

## ② เขียนใน `loadSeed()`

```js
let db;

export async function loadSeed() {
  db = new DatabaseSync(DB_FILE);
  db.exec('PRAGMA foreign_keys = ON');

  // ถ้ายังไม่มีตาราง (ไฟล์ฐานข้อมูลใหม่) ให้สร้างจาก schema.sql
  const ready = db.prepare(
    "SELECT COUNT(*) c FROM sqlite_master WHERE type='table' AND name='requests'"
  ).get().c;
  if (!ready) db.exec(readFileSync(SCHEMA_FILE, 'utf8'));
}
```

### ⚠ `PRAGMA foreign_keys = ON` สำคัญมาก

ย้ำมาตั้งแต่สัปดาห์ที่แล้ว — **ต้องสั่งทุกครั้งที่เปิดฐานข้อมูล** ไม่ใช่สั่งครั้งเดียวแล้วจำไปตลอด

ถ้าลืม จะใส่ `requester_id` มั่วเข้าไปได้โดยไม่มี error บอก

## ③ ลองดึงข้อมูลออกมาดู

```js
export function findAll({ status } = {}) {
  return db.prepare('SELECT * FROM requests').all();   // ยังไม่มี JOIN ก็ได้
}
```

### ✓ ผ่าน CP26 เมื่อ

- [ ] เปิด server ได้โดยไม่มี error
- [ ] ยิง `GET /api/requests` แล้วเห็นข้อมูลจากฐานข้อมูล
- [ ] เข้าใจว่า `all` `get` `run` ต่างกันอย่างไร

### ⚠ ถ้าได้ `no such table: requests`

**อย่าเพิ่งไปสร้างตารางใหม่** — อาจเปิดไฟล์ผิดตัว · CP27 จะอธิบาย

### 💬 คำถามที่ต้องตอบได้

> ทำไม `node:sqlite` ไม่ต้องใช้ `await` ทั้งที่ Week 07 เรียก API ต้องใช้ทุกครั้ง

---

# CP27 · แก้ path ให้อ้างจากตำแหน่งไฟล์

**🏫 25 นาที · We do · กับดักที่หาสาเหตุยากที่สุดของสัปดาห์นี้**

## ปัญหา

```js
const DB_FILE = './data/campus.db';   // ❌
```

`./` ไม่ได้หมายถึง "โฟลเดอร์ที่ไฟล์นี้อยู่" แต่หมายถึง **"โฟลเดอร์ที่รันคำสั่ง"**

| รันจากไหน | `./data/campus.db` ชี้ไปที่ |
|---|---|
| `npm run dev` (ใน `api/`) | `api/data/campus.db` ✅ |
| checker (ใน root) | `data/campus.db` ❌ **ไม่มีไฟล์นี้** |

### ทำไมหายาก

**SQLite ไม่บ่นเมื่อไฟล์ไม่มี** — มันสร้างฐานข้อมูลเปล่าให้เลย

error ที่ได้จึงเป็น `no such table: requests` ซึ่งทำให้คิดว่า *"ลืมสร้างตาราง"* ทั้งที่จริง ๆ คือ **เปิดไฟล์ผิดตัว**

## วิธีแก้

```js
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ตำแหน่งของ "ไฟล์นี้" ไม่ใช่ตำแหน่งที่รันคำสั่ง
const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, '../..');
const DB_FILE = process.env.DB_FILE ?? path.join(API_ROOT, 'data', 'campus.db');
const SCHEMA_FILE = path.join(API_ROOT, 'data', 'schema.sql');
```

| ส่วน | ทำอะไร |
|---|---|
| `import.meta.url` | URL ของไฟล์นี้ |
| `fileURLToPath()` | แปลง URL เป็น path ปกติ |
| `path.dirname()` | ตัดชื่อไฟล์ออก เหลือแต่โฟลเดอร์ |
| `path.resolve(HERE,'../..')` | ถอยขึ้น 2 ชั้น (`services/` → `src/` → `api/`) |
| `process.env.DB_FILE ??` | ให้ตั้งค่าจากภายนอกได้ — **บทเรียนจาก Week 07** |

## ขั้นตอนทดสอบ

| ขั้น | ทำอะไร | ต้องเห็นอะไร |
|---|---|---|
| 1 | `console.log(DB_FILE)` ชั่วคราว | path เต็มที่ชี้ไป `api/data/` |
| 2 | รัน `npm run dev` จาก `api/` | เปิดได้ เห็นข้อมูล |
| 3 | **รัน checker จาก root** | **ต้องเห็นข้อมูลเดียวกัน** |
| 4 | ลบ `console.log` ออก | — |

### ✓ ผ่าน CP27 เมื่อ

- [ ] รันจากสองโฟลเดอร์ที่ต่างกัน แล้วเปิดฐานข้อมูล**ตัวเดียวกัน**ได้ทั้งคู่
- [ ] เข้าใจว่าทำไม `./` ถึงไม่น่าเชื่อถือ

### 💬 คำถามที่ต้องตอบได้

> ทำไมต้องรองรับ `process.env.DB_FILE` ด้วย ทั้งที่คำนวณ path เองได้แล้ว

---

# CP28 · อ่านข้อมูลด้วย JOIN

**🏫 50 นาที · We do · ช่วงยาวที่สุดของคาบ**

## ปัญหาที่ต้องแก้

| | ฐานข้อมูลเก็บ | frontend ต้องการ |
|---|---|---|
| ผู้แจ้ง | `requester_id: 1` | `requesterName: "สมชาย ใจดี"` |
| ประเภท | `request_type` | `requestType` |

**และเราจะไม่แก้ frontend เพราะสัญญาไว้แล้ว**

## ① เก็บ JOIN ไว้เป็นค่าคงที่

```js
const SELECT_SHAPE = `
  SELECT r.id,
         u.name          AS requesterName,
         r.request_type  AS requestType,
         r.location,
         r.details,
         r.priority,
         r.status
  FROM requests r
  JOIN users u ON u.id = r.requester_id`;
```

> **คำใบ้** — เปิด `queries.sql` ที่ทำสัปดาห์ที่แล้ว คัดลอก query ข้อ ⑤ มาปรับได้เลย

**เก็บไว้ตัวเดียวแล้วเอาไปต่อ `WHERE`** — ไม่ต้องเขียน JOIN ซ้ำในทุกฟังก์ชัน

## ② `findAll()`

```js
export function findAll({ status } = {}) {
  return status
    ? db.prepare(`${SELECT_SHAPE} WHERE r.status = ? ORDER BY r.id`).all(status)
    : db.prepare(`${SELECT_SHAPE} ORDER BY r.id`).all();
}
```

### ⚠ สังเกตให้ดี — `${SELECT_SHAPE}` ต่อได้ แต่ `status` ต่อไม่ได้

`SELECT_SHAPE` เป็น**โค้ดของเราเอง**ที่เขียนไว้ตายตัว · แต่ `status` มาจากผู้ใช้ จึงต้องส่งผ่าน `?`

> บทที่ 7 จะอธิบายว่าทำไม — ตอนนี้จำไว้ว่า **ค่าจากผู้ใช้ส่งผ่าน `?` เสมอ**

## ③ `findById()`

```js
export function findById(id) {
  return db.prepare(`${SELECT_SHAPE} WHERE r.id = ?`).get(id) ?? null;
}
```

### ⚠ ต้องมี `?? null`

`.get()` คืน `undefined` เมื่อไม่พบ · แต่ **Week 07 สัญญาไว้ว่าจะคืน `null`**

ถ้าลืม controller ยังตอบ 404 ได้ (เพราะ `undefined` เป็น falsy) แต่**ผิดสัญญาที่เขียนไว้ใน API contract**

### ✓ ผ่าน CP28 เมื่อ

- [ ] `GET /api/requests` คืน array ที่มี `requesterName`
- [ ] `?status=pending` กรองได้
- [ ] `GET /api/requests/REQ-001` ได้ 200 · id ที่ไม่มีได้ 404
- [ ] **เปิดแอป React แล้ว Dashboard แสดงข้อมูลจากฐานข้อมูล**

### 💬 คำถามที่ต้องตอบได้

> ถ้าใช้ `LEFT JOIN` แทน `JOIN` จะต่างกันอย่างไร และแบบไหนดีกว่าในกรณีนี้

---

# CP29 · create แปลงชื่อเป็น id

**🏫 35 นาที · We do → You do · บทที่สำคัญที่สุด**

## ปัญหา

frontend ส่งมาแบบนี้ (ไม่เปลี่ยนตั้งแต่ Week 05)

```json
{ "requesterName": "สมชาย ใจดี", "requestType": "แจ้งซ่อม", ... }
```

แต่ตาราง `requests` เก็บ `requester_id` เป็นตัวเลข

## ทางเลือก 3 ทาง

| ทางเลือก | ปัญหา |
|---|---|
| ① frontend ส่ง id มา | **ต้องแก้ frontend** — เสียคำสัญญา · ผู้ใช้ไม่รู้จัก id อยู่แล้ว |
| ② เก็บ `requesterName` เป็นคอลัมน์ด้วย | **กลับไปมีข้อมูลซ้ำ** — เสียบทเรียนทั้งหมดของสัปดาห์ที่แล้ว |
| **③ service แปลงให้** ⭐ | **ไม่มีใครเสียอะไร** |

> สัปดาห์ที่แล้วเราสรุปว่า *"นี่คือหน้าที่ของชั้น service"*
> **ตรงนี้คือตอนที่ประโยคนั้นกลายเป็นโค้ดจริง**

## ① `resolveUserId()`

```js
/** แปลงชื่อผู้แจ้งเป็น id — ถ้ายังไม่มีในระบบก็สร้างให้ */
function resolveUserId(name) {
  const found = db.prepare('SELECT id FROM users WHERE name = ?').get(name);
  if (found) return found.id;                  // มีแล้ว — ใช้ id เดิม

  const slug = Date.now().toString(36);
  return db.prepare('INSERT INTO users (name, department, email) VALUES (?, ?, ?)')
           .run(name, 'ไม่ระบุ', `user-${slug}@rmutl.ac.th`).lastInsertRowid;
}
```

| บรรทัด | ทำอะไร |
|---|---|
| `SELECT id ... WHERE name = ?` | หาว่ามีคนชื่อนี้อยู่แล้วไหม |
| `if (found) return found.id` | มีแล้ว — ไม่สร้างซ้ำ |
| `INSERT INTO users ...` | ยังไม่มี — สร้างให้ |
| `lastInsertRowid` | id ที่ฐานข้อมูลเพิ่งสร้างจาก `AUTOINCREMENT` |

### ทำไม email ต้องมี `slug`

เพราะ `users.email` มี `UNIQUE` — ถ้าใส่ค่าเดิมทุกครั้งจะชนกันตั้งแต่คนที่สอง

## ② `nextId()`

```js
function nextId() {
  const row = db.prepare(
    "SELECT id FROM requests WHERE id LIKE 'REQ-%' ORDER BY id DESC LIMIT 1"
  ).get();
  const n = row ? Number(String(row.id).replace('REQ-', '')) + 1 : 1;
  return `REQ-${String(n).padStart(3, '0')}`;
}
```

## ③ `create()`

```js
export function create(input) {
  const id = nextId();
  db.prepare(
    `INSERT INTO requests (id, requester_id, request_type, location, details, priority)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    resolveUserId(input.requesterName.trim()),   // ← แปลงตรงนี้
    input.requestType,
    input.location.trim(),
    input.details.trim(),
    input.priority ?? 'normal'
  );
  return findById(id);   // คืนรูปแบบที่ frontend ต้องการ
}
```

### สังเกตความสมมาตร

| | ทำอะไร |
|---|---|
| **ขาเข้า** | `resolveUserId()` แปลง *ชื่อ → id* ก่อนเก็บ |
| **ขาออก** | `JOIN` แปลง *id → ชื่อ* ก่อนส่งกลับ |

**service ทำหน้าที่เป็นล่ามระหว่างสองภาษา** — ภาษาของฐานข้อมูล (ไม่ซ้ำ ประหยัด) กับภาษาของผู้ใช้ (อ่านเข้าใจ)

### ✓ ผ่าน CP29 เมื่อ — ทดสอบ 2 กรณี

| กรณี | ต้องได้ |
|---|---|
| POST ด้วยชื่อที่**มีอยู่แล้ว** | 201 และ **ตาราง `users` ไม่เพิ่ม** |
| POST ด้วยชื่อ**ใหม่** | 201 และ **ตาราง `users` เพิ่มคนใหม่** |

```sql
-- ตรวจด้วย SQL
SELECT COUNT(*) FROM users;
```

### 💬 คำถามที่ต้องตอบได้

> ทำไม `create()` ต้องจบด้วย `findById(id)` แทนที่จะคืน `input` กลับไปเลย

---

# CP30 · CRUD ครบ

**🏫 40 นาที · You do**

## ① `updateStatus()`

```js
export function updateStatus(id, status) {
  const result = db.prepare('UPDATE requests SET status = ? WHERE id = ?')
                   .run(status, id);
  return result.changes ? findById(id) : null;
}
```

**`result.changes` บอกว่าพบหรือไม่** — ถ้าเป็น `0` แปลว่าไม่มีแถวไหนตรง → คืน `null` → controller ตอบ 404

ไม่ต้อง `SELECT` เช็คก่อน — สั่งครั้งเดียวแล้วดูผลพอ

### ⚠ ลำดับของ `?` ต้องตรงกับใน SQL

```js
// SQL: SET status = ?  WHERE id = ?
.run(status, id)   // ✅ ถูก
.run(id, status)   // ❌ ผิด — สลับกัน
```

ถ้าสลับ จะ**ไม่มี error** แต่ไม่มีแถวไหนตรงเงื่อนไข → **ได้ 404 ทั้งที่คำร้องมีอยู่จริง**

> **บั๊กที่หาสาเหตุยาก** เพราะดูเหมือนแค่ "ไม่พบข้อมูล"
> **วิธีตรวจ** — นับ `?` ใน SQL จากซ้ายไปขวา แล้วเทียบกับลำดับใน `.run()` ทีละตัว

## ② `remove()`

```js
export function remove(id) {
  const target = findById(id);      // ① หาก่อน
  if (!target) return null;         // ② ไม่พบ → null
  db.prepare('DELETE FROM requests WHERE id = ?').run(id);
  return target;                    // ③ คืนของที่ลบ
}
```

### ทำไมเขียนคนละแบบกับ `updateStatus`

เพราะ **Week 07 กำหนดว่า `remove()` ต้องคืนรายการที่ลบ** — ต้องอ่านมาก่อนลบ ไม่งั้นข้อมูลหายไปแล้ว

ส่วน `updateStatus()` คืนรายการ**หลัง**แก้ จึงอ่านทีหลังได้

> **signature กำหนดวิธีเขียน ไม่ใช่เราเลือกตามใจ**

## ③ ตรวจให้ครบ

| ทดสอบ | ต้องได้ |
|---|---|
| ยิงทุก endpoint ด้วย Postman | 200 · 201 · 204 · 400 · 404 ตามเดิม |
| เปิดแอป React ใช้งานจริง | ดู เพิ่ม ลบ เปลี่ยนสถานะได้หมด |
| **ปิดเซิร์ฟเวอร์แล้วเปิดใหม่** | **ข้อมูลยังอยู่** |
| `node check-week10.mjs --inclass` | **20/20** |
| **`node check-week07.mjs`** | **36/36** |

### ✓ ผ่าน CP30 เมื่อ

- [ ] CRUD ครบทั้ง 5 endpoint
- [ ] checker Week 10 `--inclass` ผ่าน 20/20
- [ ] **checker Week 07 ยังผ่าน 36/36**
- [ ] **ยืนยันว่าไม่ได้แก้ไฟล์อื่นนอกจาก `requestService.js`**

### 💬 คำถามที่ต้องตอบได้

> ทำไม `remove()` ต้อง `findById` ก่อนลบ แต่ `updateStatus()` ไม่ต้อง

---

# ตรวจงานตอนจบคาบ

```bash
node --disable-warning=ExperimentalWarning check-week10.mjs --inclass   # 20/20
node --disable-warning=ExperimentalWarning check-week07.mjs             # 36/36
```

## ยืนยันว่าแก้ไฟล์เดียวจริง

```bash
git status
# ควรเห็นแค่ api/src/services/requestService.js (และ data/campus.db)
```

---

## ตารางไล่ปัญหาที่พบบ่อย

| อาการ | สาเหตุที่พบบ่อย |
|---|---|
| `no such table: requests` | **เปิดไฟล์ผิดตัว** — ตรวจ path (CP27) ก่อนคิดว่าลืมสร้างตาราง |
| `ExperimentalWarning` ขึ้นเต็มจอ | ไม่ใช่ error — เพิ่ม `--disable-warning=ExperimentalWarning` |
| `GET` คืน `requester_id` แทน `requesterName` | ลืม `JOIN` หรือลืม `AS` |
| ได้ 404 ทั้งที่คำร้องมีอยู่ | **ลำดับ `?` สลับกัน** ใน `.run()` |
| POST ได้ `FOREIGN KEY constraint failed` | `resolveUserId()` ยังไม่ทำงาน — ตรวจว่าคืน id จริง |
| POST แล้ว `users` เพิ่มทุกครั้งแม้ชื่อซ้ำ | ลืมเช็ค `if (found) return found.id` |
| ใส่ `requester_id` มั่วแล้วผ่าน | **ลืม `PRAGMA foreign_keys = ON`** |
| checker Week 07 พัง | signature เปลี่ยน — ตรวจว่าคืนค่าเหมือนเดิมทุกฟังก์ชัน |
| `undefined` แทน `null` | ลืม `?? null` ใน `findById` |

---

## เช็คลิสต์ก่อนออกจากห้อง

- [ ] `check-week10.mjs --inclass` ผ่าน **20/20**
- [ ] `check-week07.mjs` ผ่าน **36/36**
- [ ] แก้แค่ `requestService.js` ไฟล์เดียว
- [ ] ปิดเซิร์ฟเวอร์แล้วเปิดใหม่ ข้อมูลยังอยู่
- [ ] commit: `git add -A && git commit -m "LAB10 in-class: เชื่อม Node เข้ากับฐานข้อมูล"`
- [ ] รู้ว่าต้องทำอะไรต่อที่บ้าน (เปิดคู่มือ Take-Home)

---

## 5 คำถามที่ต้องตอบได้ทั้งหมด

1. ทำไม `node:sqlite` ไม่ต้องใช้ `await` ทั้งที่ Week 07 เรียก API ต้องใช้
2. ทำไมต้องรองรับ `process.env.DB_FILE` ทั้งที่คำนวณ path เองได้แล้ว
3. ถ้าใช้ `LEFT JOIN` แทน `JOIN` จะต่างกันอย่างไร
4. ทำไม `create()` ต้องจบด้วย `findById(id)`
5. ทำไม `remove()` ต้อง `findById` ก่อนลบ แต่ `updateStatus()` ไม่ต้อง

---

## ภาคผนวก · คำสั่งที่ใช้บ่อย

```bash
# รัน API
cd api && npm run dev

# ตรวจงาน
node --disable-warning=ExperimentalWarning check-week10.mjs --inclass
node --disable-warning=ExperimentalWarning check-week07.mjs

# ดูข้อมูลในฐานข้อมูลตรง ๆ
node --disable-warning=ExperimentalWarning -e "
  const {DatabaseSync}=require('node:sqlite');
  const db=new DatabaseSync('./api/data/campus.db');
  console.table(db.prepare('SELECT * FROM users').all());
"
```

## ภาคผนวก · ศัพท์ของสัปดาห์นี้

| คำ | หมายถึง |
|---|---|
| `DatabaseSync` | คลาสสำหรับเปิดฐานข้อมูล SQLite แบบ sync |
| `prepare()` | เตรียมคำสั่ง SQL ที่มี `?` ไว้ใส่ค่าทีหลัง |
| `changes` | จำนวนแถวที่ถูกกระทบจาก UPDATE/DELETE |
| `lastInsertRowid` | id ที่ฐานข้อมูลเพิ่งสร้างจาก AUTOINCREMENT |
| Parameterized query | การส่งค่าผ่าน `?` แทนการต่อ string |
| `import.meta.url` | URL ของไฟล์ที่โค้ดนี้อยู่ |
