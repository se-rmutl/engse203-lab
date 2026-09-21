# ENGSE203 LAB 10 — คู่มือ Take-Home

**🏠 ทำที่บ้าน · CP31 → CP34 · ส่งภายใน 5 วันหลังคาบ**
**หน่วยที่ 4 · สัปดาห์ที่ 10**

---

## ตรวจก่อนเริ่ม

```bash
node --disable-warning=ExperimentalWarning check-week10.mjs --inclass   # ต้องได้ 20/20
node --disable-warning=ExperimentalWarning check-week07.mjs             # ต้องได้ 36/36
```

**ถ้ายังไม่ครบ ให้ทำงานในห้องให้จบก่อน** — งานที่บ้านทั้งหมดต่อยอดจาก service ที่เปลี่ยนมาใช้ฐานข้อมูลแล้ว

---

## ภาพรวมงานที่บ้าน

| CP | ทำอะไร | เวลาโดยประมาณ |
|---|---|---|
| **CP31** | ทดสอบ SQL injection · พิสูจน์ว่ากันได้ | 40 นาที |
| **CP32** | แปลง error จากฐานข้อมูลเป็น status ที่เหมาะสม | 50 นาที |
| **CP33** | เขียน test ที่ยิงเข้าฐานข้อมูลจริง | 50 นาที |
| **CP34** | อัปเดต `API_CONTRACT.md` | 30 นาที |
| ⭐ | users endpoint · transaction · index | 60 นาที |

---

# CP31 · ทดสอบ SQL Injection

**🏠 40 นาที**

## ทำไมต้องทดสอบเอง

**โค้ดที่ปลอดภัยกับโค้ดที่ไม่ปลอดภัย หน้าตาต่างกันแค่นิดเดียว** — ใช้ `?` กับใช้ `${}`

การได้เห็นด้วยตาว่าอันหนึ่งกันได้ อีกอันหลุด จะจำได้นานกว่าการอ่าน

## ① ตรวจโค้ดของตัวเองก่อน

ไล่ดูทุก query ใน `requestService.js`

```js
// ❌ อันตราย — ค่าจากผู้ใช้ต่อเข้า SQL
db.prepare(`SELECT * FROM requests WHERE status = '${status}'`).all();

// ✅ ปลอดภัย
db.prepare('SELECT * FROM requests WHERE status = ?').all(status);
```

### กฎที่ต้องจำ

| ต่อ string ได้ | ต่อ string ไม่ได้ |
|---|---|
| `${SELECT_SHAPE}` — โค้ดของเราเอง เขียนไว้ตายตัว | `${status}` — **มาจากผู้ใช้** |
| ค่าจาก allowlist ที่เราตรวจแล้ว | ค่าจาก `req.query` · `req.body` · `req.params` |

## ② ยิงทดสอบ 3 แบบ

```bash
# ① เงื่อนไขที่เป็นจริงเสมอ
curl "http://localhost:3001/api/requests?status=x'%20OR%20'1'='1"

# ② พยายามลบตาราง
curl "http://localhost:3001/api/requests?status='%3B%20DROP%20TABLE%20requests%3B%20--"

# ③ ต่อเงื่อนไขเพิ่ม
curl "http://localhost:3001/api/requests?status=pending'%20OR%20status='completed"
```

| ยิงอะไร | ต้องได้ |
|---|---|
| ทั้ง 3 แบบ | **`[]` — 0 รายการ** |
| หลังยิงแบบ ② | **ตาราง `requests` ยังอยู่** |

## ③ พิสูจน์ว่าตารางยังอยู่

```bash
curl http://localhost:3001/api/requests
# ต้องคืนข้อมูลปกติ ไม่ใช่ error
```

## ④ บันทึกผล

เพิ่มหัวข้อใน `API_CONTRACT.md` หรือสร้าง `SECURITY_TEST.md` แยก

```markdown
## ผลการทดสอบ SQL Injection

### ① เงื่อนไขที่เป็นจริงเสมอ

**ยิง** `GET /api/requests?status=x' OR '1'='1`
**ผลที่ได้** `[]` (0 รายการ) ✓ ถูกป้องกัน
**เพราะ** ใช้ parameterized query — ค่าถูกตีความเป็นข้อความ ไม่ใช่คำสั่ง
```

ทำแบบนี้ครบทั้ง 3 ข้อ

## ⑤ สิ่งที่ `?` ใช้แทนไม่ได้

```js
// ❌ ใช้ ? แทนชื่อคอลัมน์ไม่ได้
db.prepare('SELECT * FROM requests ORDER BY ?').all(sortBy);
```

**ถ้าจำเป็นต้องให้ผู้ใช้เลือกคอลัมน์เรียง** ให้ใช้ allowlist

```js
const ALLOWED = ['id', 'status', 'priority', 'created_at'];
const col = ALLOWED.includes(sortBy) ? sortBy : 'id';
db.prepare(`SELECT * FROM requests ORDER BY ${col}`).all();
```

### ✓ ผ่าน CP31 เมื่อ

- [ ] ทุก query ที่รับค่าจากผู้ใช้ใช้ `?` ทั้งหมด
- [ ] ยิงทดสอบครบ 3 แบบ ได้ 0 รายการทุกครั้ง
- [ ] ตารางยังอยู่หลังยิงแบบ DROP
- [ ] บันทึกผลพร้อมคำอธิบายว่าทำไมถึงกันได้

---

# CP32 · แปลง Error จากฐานข้อมูล

**🏠 50 นาที**

## ปัญหา

ถ้าไม่จัดการอะไรเลย error จากฐานข้อมูลจะไปจบที่ `errorHandler` ของ Week 06 ซึ่งตอบ **500 ทั้งหมด**

### ทำไมไม่ดี

**500 แปลว่า "เซิร์ฟเวอร์ผิด"** — แต่กรณีเหล่านี้ส่วนใหญ่ **ผู้ใช้ส่งข้อมูลผิดมาเอง**

| ผลที่ตามมา | รายละเอียด |
|---|---|
| ผู้ใช้ไม่รู้ว่าต้องแก้อะไร | 500 บอกแค่ "ระบบพัง" ไม่บอกว่าผิดตรงไหน |
| ทีมจะตกใจ | เห็น 500 เยอะในระบบเฝ้าระวัง ทั้งที่ระบบปกติดี |

## ตารางที่ต้องจัดการ

| error จากฐานข้อมูล | ใครผิด | ควรตอบ |
|---|---|---|
| `FOREIGN KEY constraint failed` | ผู้ใช้ | **400** |
| `CHECK constraint failed` | ผู้ใช้ | **400** |
| `UNIQUE constraint failed` | ผู้ใช้ | **409** |
| `NOT NULL constraint failed` | ผู้ใช้ | **400** |
| `no such table` | **เซิร์ฟเวอร์** | **500** |

## วิธีทำ

### ① ใช้ `AppError` ที่ทำไว้ตั้งแต่ Week 07

ตอนนั้นเป็น Challenge ที่หลายคนข้าม — **ตอนนี้ได้ใช้จริงแล้ว**

ถ้ายังไม่มี ให้สร้างใน `middleware/errorHandler.js`

```js
export class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}
```

### ② เขียนตัวแปลงใน service

```js
function toAppError(err) {
  const m = err.message ?? '';
  if (m.includes('FOREIGN KEY')) return new AppError('อ้างถึงข้อมูลที่ไม่มีอยู่จริง', 400);
  if (m.includes('CHECK'))       return new AppError('ค่าที่ส่งมาไม่อยู่ในรายการที่กำหนด', 400);
  if (m.includes('UNIQUE'))      return new AppError('ข้อมูลนี้มีอยู่แล้วในระบบ', 409);
  return err;   // error อื่นปล่อยผ่าน → errorHandler ตอบ 500
}
```

### ③ ห่อ query ที่เขียนข้อมูล

```js
export function create(input) {
  try {
    // ... INSERT ...
  } catch (err) {
    throw toAppError(err);
  }
  return findById(id);
}
```

### ⚠ อย่าส่งข้อความ error ของฐานข้อมูลตรง ๆ

`FOREIGN KEY constraint failed` บอก**โครงสร้างภายในของระบบ** — ผู้ใช้ทั่วไปไม่เข้าใจ และคนไม่หวังดีจะได้ข้อมูลไปหาช่องโหว่

> **แปลเป็นภาษาคนเสมอ** — หลักการเดียวกับ `apiClient` ที่ทำใน Week 07 บทที่ 7

### `errorHandler` ไม่ต้องแก้

มันอ่าน `err.status` อยู่แล้ว — แค่ใส่ `status` ให้ถูกก็พอ

## ทดสอบ

| ยิงอะไร | ต้องได้ |
|---|---|
| POST ด้วย `requestType` ที่ไม่อยู่ในรายการ | **400** ไม่ใช่ 500 |
| ข้อความที่ผู้ใช้เห็น | ภาษาไทยที่เข้าใจได้ ไม่ใช่ `CHECK constraint failed` |

### ✓ ผ่าน CP32 เมื่อ

- [ ] constraint error ตอบ 4xx ไม่ใช่ 500
- [ ] ข้อความเป็นภาษาคน ไม่ใช่ข้อความจากฐานข้อมูล
- [ ] error ที่เป็นความผิดของเซิร์ฟเวอร์จริง ๆ ยังตอบ 500
- [ ] **ไม่ได้แก้ `errorHandler.js`** — แค่ใส่ `status` ให้ถูก

---

# CP33 · เขียน Test ที่ยิงเข้าฐานข้อมูลจริง

**🏠 50 นาที**

## test เดิมจาก Week 07 ใช้ได้เลย

ไม่ต้องแก้อะไร — เพราะ API ตอบเหมือนเดิมทุกอย่าง

## ต้องมีอย่างน้อย 6 เคส

| # | ทดสอบอะไร |
|---|---|
| ① | `GET /api/requests` → 200 และได้ array |
| ② | **คืน `requesterName` ไม่ใช่ `requester_id`** |
| ③ | `GET /:id` พบ → 200 · ไม่พบ → 404 |
| ④ | `POST` ถูกต้อง → 201 |
| ⑤ | `POST` ไม่ครบ → 400 |
| ⑥ | **ยิง SQL injection ผ่าน `?status=` แล้วไม่หลุด** |

## ตัวอย่าง

```js
test('คืน requesterName ไม่ใช่ requester_id', async () => {
  const r = await request(app).get('/api/requests');
  assert.ok('requesterName' in r.body[0]);
  assert.ok(!('requester_id' in r.body[0]));
});

test('SQL injection ผ่าน ?status= ไม่หลุด', async () => {
  const evil = encodeURIComponent("x' OR '1'='1");
  const r = await request(app).get(`/api/requests?status=${evil}`);
  assert.equal(r.status, 200);
  assert.equal(r.body.length, 0);
});
```

## ⚠ test ที่เขียนข้อมูลจะไปแก้ฐานข้อมูลจริง

ถ้า test สร้างคำร้องแล้วไม่ลบทิ้ง **ข้อมูลจะสะสมทุกครั้งที่รัน**

### วิธีแก้ — ใช้ฐานข้อมูลทดสอบแยก

```bash
DB_FILE=./data/test.db npm test
```

**นี่คือเหตุผลที่ CP27 ให้รองรับ `process.env.DB_FILE` ไว้**

หรือถ้าไม่อยากแยกไฟล์ ให้ลบข้อมูลที่สร้างในแต่ละ test ทิ้งเมื่อจบ

## รัน

```bash
npm test
```

### ✓ ผ่าน CP33 เมื่อ

- [ ] มี test อย่างน้อย 6 เคส
- [ ] ใช้ `request(app)` ยิงจริง
- [ ] **มีเคสทดสอบ SQL injection**
- [ ] รัน `npm test` แล้วผ่านทั้งหมด
- [ ] รันซ้ำ 2 ครั้งแล้วยังผ่าน (ไม่มีข้อมูลค้าง)

---

# CP34 · อัปเดต API Contract

**🏠 30 นาที**

## ทำไมต้องอัปเดต

API ยังตอบเหมือนเดิมทุกอย่าง — **แต่ข้างในเปลี่ยนไปแล้ว** จึงต้องบันทึกไว้

## เพิ่ม 3 หัวข้อ

### ① Data Model

ตาราง 2 ตาราง คอลัมน์ ชนิด constraint — คัดลอกจาก `DATA_MODEL.md` ของสัปดาห์ที่แล้วมาปรับได้

### ② ข้อสังเกตเรื่องรูปแบบ

> **โครงสร้างในฐานข้อมูลไม่เหมือนรูปแบบที่ API ส่งออก**
>
> - ฐานข้อมูลเก็บ `requester_id` (ตัวเลข) เพื่อไม่ให้ข้อมูลซ้ำ
> - API คืน `requesterName` (ชื่อ) เพราะ frontend ต้องการแบบนั้น
> - **ชั้น service เป็นตัวแปลงด้วย `JOIN` และ `AS`**

### ③ พฤติกรรมของ POST ⭐ สำคัญที่สุด

> ถ้าส่ง `requesterName` ที่ยังไม่มีในระบบ **จะสร้าง user ใหม่ให้อัตโนมัติ**

**ทำไมข้อนี้สำคัญ** — เป็น**พฤติกรรมที่คนอื่นเดาไม่ได้**จากการดู endpoint อย่างเดียว

ถ้าไม่เขียนไว้ คนที่มาใช้ API ต่อจะไม่รู้ว่าการ POST อาจสร้างผู้ใช้ใหม่ — และอาจสร้างผู้ใช้ขยะโดยไม่ตั้งใจ

> **contract มีไว้บอกสิ่งที่เดาไม่ได้** ไม่ใช่แค่ลอกรายการ endpoint

### ✓ ผ่าน CP34 เมื่อ

- [ ] มีหัวข้อ Data Model พร้อมตารางทั้งสอง
- [ ] อธิบายว่าทำไมโครงในฐานข้อมูลไม่เหมือนที่ API ส่งออก
- [ ] **ระบุพฤติกรรมของ POST ที่สร้าง user ให้อัตโนมัติ**
- [ ] อัปเดตเวอร์ชันและประวัติการเปลี่ยนแปลง

---

# ⭐ Challenge — คะแนนเพิ่ม

## ① Endpoint สำหรับ users

```js
// GET /api/users            → รายชื่อผู้ใช้ทั้งหมด
// GET /api/users/:id/requests → คำร้องของคนนั้น
```

สร้าง `routes/userRoutes.js` แล้วผูกใน `app.js`

> **ข้อคิด** — ควรมี service แยกไหม หรือใส่ใน route เลยก็พอ · ลองคิดดูว่าถ้าระบบโตขึ้นจะเป็นอย่างไร

## ② Transaction

```js
export function create(input) {
  const id = nextId();
  db.exec('BEGIN');
  try {
    const requesterId = resolveUserId(input.requesterName.trim());
    db.prepare(`INSERT INTO requests (...) VALUES (...)`).run(...);
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
  return findById(id);
}
```

### ปัญหาที่แก้

ถ้า `resolveUserId()` สร้าง user ใหม่สำเร็จ แต่ `INSERT INTO requests` ล้มเหลว — จะเหลือ **user ที่ไม่มีคำร้องค้างอยู่**

**พิสูจน์ว่าทำงาน**

```bash
# ส่ง requestType ที่ผิด CHECK พร้อมชื่อใหม่
# → ต้องได้ error และ ตาราง users ไม่เพิ่ม
```

## ③ Index และการวัดผล

```sql
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_requester ON requests(requester_id);
```

**วัดผลด้วย `EXPLAIN QUERY PLAN`**

```sql
EXPLAIN QUERY PLAN SELECT * FROM requests WHERE status = 'pending';
```

| ก่อนมี index | หลังมี index |
|---|---|
| `SCAN requests` — อ่านทุกแถว | `SEARCH requests USING INDEX ...` |

บันทึกผลทั้งสองแบบไว้เปรียบเทียบ

---

# การส่งงาน

## ตรวจให้ครบก่อนส่ง

```bash
node --disable-warning=ExperimentalWarning check-week10.mjs
node --disable-warning=ExperimentalWarning check-week07.mjs   # ต้องยัง 36/36
npm test
```

**เป้าหมาย 28/31** (31/31 ถ้าทำ Challenge ครบ)

## คำสั่ง git

> **ต้อง commit ไฟล์ `campus.db` ด้วย** — เหมือนสัปดาห์ที่ 9 · ผู้สอนต้องตรวจข้อมูล และ SQLite เป็นไฟล์เดียวขนาดเล็ก

```bash
git switch -c unit4/week-10
git add -A
git commit -m "LAB10: เชื่อม Node เข้ากับฐานข้อมูล"
git push -u origin unit4/week-10
git tag lab-10-submission-v1 && git push origin lab-10-submission-v1
```

## ใช้ AI ได้ แต่ต้องเป็นเจ้าของงาน

ผู้สอนจะ **สุ่มให้แก้ query สดหรืออธิบายว่าทำไมต้องแปลงชื่อเป็น id** · ถ้าอธิบายไม่ได้ คะแนนส่วนนั้นจะถูกทบทวน

---

## เตรียมตัวสำหรับสัปดาห์ที่ 11

สัปดาห์หน้าเราจะเจอ **MongoDB** — ฐานข้อมูลที่เก็บข้อมูลคนละแบบ และ**อยู่คนละเครื่อง**

| สิ่งที่จะเกิดขึ้น | รายละเอียด |
|---|---|
| **เรื่อง async จะกลับมา** | MongoDB อยู่คนละเครื่อง ต้องรอข้อมูลข้ามเครือข่าย — ตรงนั้นจะได้เห็นว่าทำไม service ควรเป็น async |
| เปรียบเทียบ SQL กับ NoSQL | เก็บข้อมูลต่างกันอย่างไร เหมาะกับงานแบบไหน |
| บูรณาการทั้งระบบ | React + API + Database ที่ทำงานได้จริง |

> **คำถามที่อยากให้คิดไว้ก่อน** — ถ้าเปลี่ยนจาก SQLite เป็น MongoDB จะยังแก้แค่ไฟล์เดียวได้ไหม
