# ENGSE203 LAB 06 — คู่มือ In-Class

**🏫 ทำในห้อง · CP00 → CP05 · สร้าง CRUD API ให้ครบ**
**หน่วยที่ 3 · สัปดาห์ที่ 6 · ปฏิบัติ 3 ชั่วโมง**

---

## อ่านก่อนเริ่ม

สัปดาห์นี้เราสร้าง **เซิร์ฟเวอร์ตัวแรกของคุณ** ให้กับแอป Campus Service Request ที่ทำมาแล้วใน Week 04–05

| | ทำอะไร |
|---|---|
| **🏫 ในห้อง (คู่มือนี้)** | CP00–CP05 · รู้จัก API แล้วสร้าง CRUD ครบ · **ทำให้เสร็จในคาบ** |
| 🏠 ที่บ้าน | CP06–CP08 · แยกชั้น, validation middleware, ไฟล์ JSON · ดูคู่มือ Take-Home |
| ⭐ Challenge | PUT, query filter · คะแนนเพิ่ม |

> **Week 06 ยังไม่เชื่อมกับ React** — เราทดสอบ API ด้วย **Postman** ก่อน · การเชื่อมกับแอป React อยู่ Week 07 หลังเรียน CORS

### รูปแบบการเรียน — I do / We do / You do

| โหมด | หมายถึง |
|---|---|
| **I do** | ผู้สอนทำให้ดู · คุณดูอย่างเดียว ยังไม่ต้องพิมพ์ |
| **We do** | พิมพ์ตามพร้อมกันทั้งห้อง |
| **You do** | ทำเอง · ผู้สอนเดินดูและช่วยเมื่อติด |

---

## เตรียมตัวก่อนเริ่ม

```bash
# ตรวจ Node version — ต้อง 22.12.0 ขึ้นไป
node -v

# เข้าโฟลเดอร์โปรเจกต์
cd labs/week-06/starter
npm install

# เปิดเซิร์ฟเวอร์ (ยังไม่ทำ TODO ก็เปิดได้)
npm run dev
```

**ต้องเห็น** `Campus Service API พร้อมที่ http://localhost:3001`

> เปิดค้างไว้ทั้งคาบ · `--watch` จะรีสตาร์ทให้เองเมื่อแก้ไฟล์

### เครื่องมือที่ต้องมี

- **Postman** (โปรแกรมแยก) หรือ **Thunder Client** (ส่วนขยายใน VS Code — เบากว่า)
- Chrome พร้อม DevTools

---

## แผนที่ของวันนี้

| CP | ทำอะไร | ไฟล์ | เวลา |
|---|---|---|---|
| **CP00** | รู้จัก API ของจริงก่อน | — | 30 นาที |
| **CP01** | Hello Server | `app.js` | 20 นาที |
| **CP02** | GET 2 เส้น + 404 | `service` `controller` `routes` `app` | 45 นาที |
| **CP03** | middleware logger + json | `logger.js` `app.js` | 25 นาที |
| **CP04** | POST + validation | `service` `controller` `validateRequest` | 40 นาที |
| **CP05** | DELETE | `service` `controller` `routes` | 20 นาที |

**เป้าหมายตอนจบ** — `npm run check -- --inclass` ผ่าน **23/23**

---

# CP00 · รู้จัก API ด้วยของจริงก่อน

**🏫 30 นาที · ยังไม่เขียนโค้ด**

หลักการของช่วงนี้คือ **หัดอ่านก่อนหัดเขียน** — เห็น API ที่คนอื่นสร้างไว้ทำงานก่อน แล้วพอไปสร้างเองจะเข้าใจว่ากำลังทำอะไรให้ใคร

## CP00a · เปิด public API ในเบราว์เซอร์

เปิด URL นี้ในเบราว์เซอร์

```
https://jsonplaceholder.typicode.com/posts/1
```

**สังเกตและตอบในใจ**

- ข้อมูลที่ได้กลับมาหน้าตาเป็นอย่างไร
- มี field อะไรบ้าง
- เหมือนหรือต่างจากข้อมูลคำร้องในแอปเราอย่างไร

ลองเปลี่ยนเลขท้ายเป็น `2`, `50`, `9999` แล้วดูว่าเกิดอะไรขึ้น

## CP00b · ดู request/response จริงด้วย DevTools

1. เปิดเว็บอะไรก็ได้ที่ใช้ประจำ
2. กด **F12** → เลือกแท็บ **Network**
3. กด **F5** รีเฟรชหน้า
4. ดูรายการ request ที่โผล่ขึ้นมา

**หาให้เจอ**

- [ ] request ที่ **method เป็น GET**
- [ ] request ที่ได้ **status 200**
- [ ] request ที่ได้ข้อมูล **JSON** กลับมา (ดูคอลัมน์ Type)
- [ ] คลิกที่ request หนึ่งอัน → ดูแท็บ **Headers**, **Response**

> **ทักษะที่ต้องได้** — ชี้ได้ว่า method, status code, request body, response อยู่ตรงไหนในหน้าจอ DevTools

## CP00c · ยิง request เองด้วย Postman

ยิง 3 request นี้แล้วบันทึกผล

| # | Method | URL | status ที่ได้ |
|---|---|---|---|
| 1 | GET | `https://jsonplaceholder.typicode.com/posts` | ______ |
| 2 | GET | `https://jsonplaceholder.typicode.com/posts/1` | ______ |
| 3 | POST | `https://jsonplaceholder.typicode.com/posts` | ______ |

**สำหรับข้อ 3** เลือก Body → raw → JSON แล้วใส่

```json
{ "title": "ทดสอบ", "body": "เนื้อหา", "userId": 1 }
```

### ✓ ผ่าน CP00 เมื่อ

- [ ] เปิด public API ในเบราว์เซอร์แล้วเห็น JSON
- [ ] ชี้ได้ว่าใน DevTools Network method/status อยู่ตรงไหน
- [ ] ยิง GET และ POST ด้วย Postman ได้
- [ ] **สังเกตได้ว่า POST สำเร็จได้ status 201 ไม่ใช่ 200**

### 💬 คำถามที่ต้องตอบได้

> ทำไม POST สำเร็จถึงได้ 201 ไม่ใช่ 200

---

# CP01 · Hello Server

**🏫 20 นาที · We do (พิมพ์ตามพร้อมกัน)**

เซิร์ฟเวอร์ Express มี **3 ส่วนเสมอ** — สร้าง app → กำหนด route → เปิดรับคำขอ

## สิ่งที่ต้องทำ

เปิด `src/app.js` แล้วทำ **`TODO W06-A2`**

```js
app.get('/', (req, res) => {
  res.json({ message: 'Campus Service API is running', version: '1.0.0' });
});
```

> ส่วน "สร้าง app" (`const app = express()`) กับ "เปิดรับคำขอ" (`app.listen`) มีให้แล้วใน starter — คุณเติมแค่ส่วน route

## ทดสอบ

เปิดเบราว์เซอร์ไปที่ `http://localhost:3001`

### ✓ ผ่าน CP01 เมื่อ

- [ ] เบราว์เซอร์แสดง `{"message":"Campus Service API is running","version":"1.0.0"}`
- [ ] ยิงด้วย Postman ได้ **status 200**

### ⚠ ถ้าไม่ผ่าน

| อาการ | น่าจะเป็นเพราะ |
|---|---|
| `Cannot GET /` | ยังไม่ได้เขียน route หรือเขียนผิด path |
| หน้าเว็บโหลดไม่ขึ้นเลย | เซิร์ฟเวอร์ไม่ได้รัน — ดู terminal |
| port ถูกใช้แล้ว | มีเซิร์ฟเวอร์ตัวเก่าค้างอยู่ · ปิดด้วย Ctrl+C แล้วรันใหม่ |

### 💬 คำถามที่ต้องตอบได้

> เซิร์ฟเวอร์ Express มี 3 ส่วนอะไรบ้าง

---

# CP02 · GET 2 เส้น + 404

**🏫 45 นาที · We do เส้นแรก → You do เส้นที่สอง**

ช่วงนี้เป็นช่วงที่ยาวที่สุด เพราะต้องแตะ 4 ไฟล์ — แต่พอทำเส้นแรกได้ เส้นที่สองจะง่ายมาก

## ลำดับการทำงาน — จากล่างขึ้นบน

```
① service    ← จัดการข้อมูล (ไม่รู้จัก HTTP)
② controller ← ตัดสิน status code
③ routes     ← จับคู่ path กับ controller
④ app.js     ← เชื่อม routes เข้าเซิร์ฟเวอร์
```

## ② เส้นแรก — GET /api/requests (We do)

**① `src/services/requestService.js` → `TODO W06-S1`**

```js
export function findAll({ status } = {}) {
  if (!status) return structuredClone(requests);
  return structuredClone(requests.filter((r) => r.status === status));
}
```

> `structuredClone()` คืนสำเนา เพื่อไม่ให้ข้างนอกแก้ข้อมูลต้นฉบับได้ — หลักการเดียวกับที่ใช้ใน Week 05

**② `src/controllers/requestController.js` → `TODO W06-C1`**

```js
export function listRequests(req, res) {
  const { status } = req.query;
  res.status(200).json(service.findAll({ status }));
}
```

**③ `src/routes/requestRoutes.js` → `TODO W06-R1`**

```js
router.get('/', controller.listRequests);
```

**④ `src/app.js` → `TODO W06-A3`**

```js
app.use('/api/requests', requestRoutes);
```

**ทดสอบทันที** — Postman ยิง `GET http://localhost:3001/api/requests` ต้องได้ **200** พร้อมรายการ 3 คำร้อง

## เส้นที่สอง — GET /api/requests/:id (You do)

ทำเอง โดยดูเส้นแรกเป็นแบบ

**`TODO W06-S2`** ใน service — หาคำร้องตามรหัส · **ไม่พบให้คืน `null`** (ห้าม throw)

**`TODO W06-C2`** ใน controller — ไม่พบ → **404** · พบ → **200**

```js
export function getRequest(req, res) {
  const found = service.findById(req.params.id);
  if (!found) {
    return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
  }
  res.status(200).json(found);
}
```

**`TODO W06-R1`** ใน routes — เพิ่ม `router.get('/:id', controller.getRequest);`

## ⚠ กับดักสำคัญ — ลำดับ route

```js
router.get('/', ...)        // ✓ เจาะจง เขียนก่อน
router.get('/:id', ...)     // ✓ มีตัวแปร เขียนหลัง
```

**ถ้าสลับกัน** คำขอ `/api/requests` อาจถูกจับเป็น `:id` แทน · กฎคือ **route เจาะจงมาก่อน route ที่มีตัวแปรเสมอ**

## ทดสอบ

| ยิงอะไร | ต้องได้ |
|---|---|
| `GET /api/requests` | 200 + รายการ 3 คำร้อง |
| `GET /api/requests/REQ-001` | 200 + ข้อมูลคำร้องนั้น |
| `GET /api/requests/REQ-999` | **404** + ข้อความบอกว่าไม่พบ |

### ✓ ผ่าน CP02 เมื่อ

- [ ] ทั้ง 3 กรณีข้างบนได้ status ถูกต้อง
- [ ] ข้อมูลที่ได้มี field ครบ 7 ตัว (`id`, `requesterName`, `requestType`, `location`, `details`, `priority`, `status`)

### 💬 คำถามที่ต้องตอบได้

> ทำไมต้องเขียน route เจาะจงก่อน route ที่มีตัวแปร

---

# CP03 · Middleware

**🏫 25 นาที · We do**

middleware คือ **ฟังก์ชันที่คำขอไหลผ่านก่อนถึง handler** เหมือนด่านตรวจที่สนามบิน

```
request → logger → express.json() → handler → response
```

## สิ่งที่ต้องทำ

**① `src/middleware/logger.js` → `TODO W06-M1`**

```js
export function logger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
  });
  next();
}
```

> `res.on('finish')` รอจนตอบเสร็จ เพื่อจะรู้ status code · ถ้าพิมพ์ทันทีจะยังไม่รู้ว่าจะตอบอะไร

**② `src/app.js` → `TODO W06-A1`**

```js
app.use(logger);
app.use(express.json());
```

## ⚠ กับดัก 2 อันของช่วงนี้

**หนึ่ง · ลืมเรียก `next()`**
คำขอจะค้างอยู่ที่ middleware นั้น ผู้ใช้รอคำตอบไปเรื่อย ๆ จนหมดเวลา

**สอง · เขียน middleware หลัง route**
middleware ที่ใช้กับทุก route ต้องเขียน **ก่อน** route ทั้งหมด ไม่งั้นจะไม่ทำงานตอน route ทำงาน

## ทดสอบ

ยิง request อะไรก็ได้ แล้วดู **terminal** ที่รันเซิร์ฟเวอร์

```
GET /api/requests → 200 (2ms)
GET /api/requests/REQ-999 → 404 (1ms)
```

### ✓ ผ่าน CP03 เมื่อ

- [ ] terminal พิมพ์ log ทุกครั้งที่มีคำขอ
- [ ] log แสดง method, path และ status code ถูกต้อง

> **checker ตรวจข้อนี้ไม่ได้** — ต้องดูด้วยตาว่า log ออกมาจริงหรือไม่

### 💬 คำถามที่ต้องตอบได้

> ถ้าลืม `app.use(express.json())` จะเกิดอะไรขึ้น

---

# CP04 · POST + Validation

**🏫 40 นาที · We do validation → You do controller**

## ① Validation middleware (We do)

`src/middleware/validateRequest.js` → **`TODO W06-M2`**

```js
export function validateRequest(req, res, next) {
  const input = req.body;
  const errors = [];

  if (!input || typeof input !== 'object') {
    return res.status(400).json({ error: 'ต้องส่งข้อมูลคำร้องมาด้วย' });
  }
  if (readText(input.requesterName).length < 2) errors.push('ชื่อผู้แจ้งต้องมีอย่างน้อย 2 ตัวอักษร');
  if (!REQUEST_TYPES.includes(input.requestType)) errors.push('ประเภทคำร้องไม่ถูกต้อง');
  if (!readText(input.location)) errors.push('กรุณาระบุสถานที่');
  if (readText(input.details).length < 10) errors.push('รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร');
  if (!PRIORITIES.includes(input.priority)) errors.push('ความเร่งด่วนต้องเป็น normal หรือ urgent');

  if (errors.length > 0) {
    return res.status(400).json({ error: 'ข้อมูลคำร้องไม่ถูกต้อง', details: errors });
  }
  next();
}
```

### ⚠ กับดักสำคัญ — อย่าใช้ `?.` ตรวจข้อมูล

```js
// ✕ ผิด
if (input.requesterName?.trim().length < 2) { ... }
```

ถ้า `requesterName` เป็น `undefined` เครื่องหมาย `?.` จะลัดวงจร ทำให้ทั้งนิพจน์เป็น `undefined` แล้ว `undefined < 2` ให้ `false` — **ข้อมูลที่ไม่มีชื่อเลยจะผ่านการตรวจไปได้**

```js
// ✓ ถูก — ใช้ readText() ที่ให้มาแล้ว
if (readText(input.requesterName).length < 2) { ... }
```

## ② Service + Controller (You do)

**`TODO W06-S3`** ใน service

```js
export function create(input) {
  const newRequest = {
    id: createId(),
    requesterName: input.requesterName.trim(),
    requestType: input.requestType,
    location: input.location.trim(),
    details: input.details.trim(),
    priority: input.priority,
    status: 'pending',     // เริ่มต้นเป็น pending เสมอ
  };
  requests.push(newRequest);
  return structuredClone(newRequest);
}
```

**`TODO W06-C3`** ใน controller — ตอบ **201** ไม่ใช่ 200

**`TODO W06-R1`** ใน routes — ใส่ middleware คั่น

```js
router.post('/', validateRequest, controller.createRequest);
```

> สังเกตว่า `validateRequest` อยู่ระหว่าง path กับ controller — คำขอจะผ่าน validation ก่อนถึง controller เสมอ

## ทดสอบ

| ยิงอะไร | ต้องได้ |
|---|---|
| POST ข้อมูลครบถูกต้อง | **201** + คำร้องใหม่ที่มี `id` และ `status: "pending"` |
| POST `{"requesterName":"x"}` | **400** + `details` บอกว่าผิดอะไรบ้าง |
| POST ที่ `details` สั้นกว่า 10 ตัว | **400** |
| POST ที่ `priority` เป็นค่าอื่น | **400** |

**Body สำหรับทดสอบ (Postman → Body → raw → JSON)**

```json
{
  "requesterName": "ทดสอบ นักศึกษา",
  "requestType": "แจ้งซ่อม",
  "location": "C3-401",
  "details": "รายละเอียดยาวพอสมควรจริง",
  "priority": "normal"
}
```

### ✓ ผ่าน CP04 เมื่อ

- [ ] POST ถูกต้อง → 201 · คำร้องใหม่มี `status: "pending"` และ `id` ขึ้นต้นด้วย `REQ-`
- [ ] POST ไม่ครบ → 400 พร้อมข้อความที่คนทั่วไปเข้าใจ (ไม่ใช่ `TypeError`)
- [ ] `GET /api/requests` เห็นคำร้องที่เพิ่งเพิ่ม

### 💬 คำถามที่ต้องตอบได้

> POST สำเร็จตอบ 201 ไม่ใช่ 200 เพราะอะไร

---

# CP05 · DELETE

**🏫 20 นาที · You do ล้วน**

ช่วงนี้ทำเองทั้งหมด — เป็นท่าเดียวกับที่ทำมาแล้ว

## สิ่งที่ต้องทำ

**`TODO W06-S5`** ใน service — คืน `true` ถ้าลบได้ · `false` ถ้าไม่พบ

```js
export function remove(id) {
  const before = requests.length;
  requests = requests.filter((r) => r.id !== id);
  return requests.length < before;
}
```

**`TODO W06-C5`** ใน controller — ไม่พบ → 404 · สำเร็จ → **204**

```js
res.status(204).end();
```

> **204 No Content** แปลว่าสำเร็จแต่ไม่มีข้อมูลส่งกลับ · ใช้ `.end()` ไม่ใช่ `.json()` เพราะไม่มีอะไรจะส่ง

**`TODO W06-R1`** ใน routes — `router.delete('/:id', controller.deleteRequest);`

## ทดสอบ

| ยิงอะไร | ต้องได้ |
|---|---|
| `DELETE /api/requests/REQ-003` | **204** (ไม่มี body) |
| `DELETE /api/requests/REQ-999` | **404** |
| `GET /api/requests` หลังลบ | เหลือ 2 รายการ |

### ✓ ผ่าน CP05 เมื่อ

- [ ] ลบได้ → 204 · ไม่พบ → 404
- [ ] ลบแล้วหายจากรายการจริง

### 💬 คำถามที่ต้องตอบได้

> DELETE สำเร็จตอบ 204 ไม่ใช่ 200 เพราะอะไร

---

# ตรวจงานตอนจบคาบ

```bash
npm run check -- --inclass
```

**ต้องได้ `🏫 ในห้อง (CP00–CP05) ผ่าน 23/23 รายการ`**

## ถ้ายังไม่ครบ

รันแล้วอ่านบรรทัดที่ขึ้น `[TODO]` — checker บอกตรง ๆ ว่าเหลืออะไร

```bash
npm run check -- --inclass | grep "TODO"
```

## ตารางไล่ปัญหาที่พบบ่อย

| อาการ | สาเหตุที่พบบ่อยที่สุด |
|---|---|
| `req.body` เป็น `undefined` | ลืม `app.use(express.json())` หรือเขียนหลัง route |
| POST ได้ 400 ทั้งที่ข้อมูลครบ | validation ใช้ `?.` แทน `readText()` |
| ทุก path ได้ 404 | ลืม `app.use('/api/requests', requestRoutes)` |
| `GET /api/requests` เข้า route `:id` | เขียน `/:id` ไว้ก่อน `/` |
| terminal ไม่มี log | ลืม `app.use(logger)` หรือลืม `next()` ใน logger |
| เซิร์ฟเวอร์ค้าง ไม่ตอบ | ลืมเรียก `next()` ใน middleware |

---

## เช็คลิสต์ก่อนออกจากห้อง

- [ ] `npm run check -- --inclass` ผ่าน **23/23**
- [ ] terminal เห็น log ทุกคำขอ (checker ตรวจไม่ได้ ต้องดูเอง)
- [ ] ยิงครบทุก endpoint ใน Postman แล้วได้ status ถูกต้อง
- [ ] `git add -A && git commit -m "LAB06 in-class: CRUD API"` แล้ว
- [ ] **รู้ว่าต้องทำอะไรต่อที่บ้าน** (เปิดคู่มือ Take-Home)

---

## 5 คำถามที่ต้องตอบได้ทั้งหมด

ผู้สอนอาจสุ่มถามคนใดคนหนึ่งตอนจบคาบ

1. ทำไม POST สำเร็จถึงได้ 201 ไม่ใช่ 200
2. เซิร์ฟเวอร์ Express มี 3 ส่วนอะไรบ้าง
3. ทำไมต้องเขียน route เจาะจงก่อน route ที่มีตัวแปร
4. ถ้าลืม `app.use(express.json())` จะเกิดอะไรขึ้น
5. DELETE สำเร็จตอบ 204 ไม่ใช่ 200 เพราะอะไร

---

## ภาคผนวก · คำสั่งที่ใช้บ่อย

```bash
npm run dev                      # เปิดเซิร์ฟเวอร์ (รีสตาร์ทอัตโนมัติ)
npm run check -- --inclass       # ตรวจเฉพาะงานในห้อง
npm run check                    # ตรวจทั้งหมด (รวมงานที่บ้าน)
npm run check | grep "TODO"      # ดูเฉพาะที่ยังไม่ผ่าน
```

## ภาคผนวก · Postman collection

`Campus_Service_API.postman_collection.json` — import เข้า Postman แล้วยิงได้เลยทั้ง 9 request

**วิธี import** — Postman → Import → เลือกไฟล์ → Open

## ภาคผนวก · ศัพท์ของสัปดาห์นี้

| คำ | หมายถึง |
|---|---|
| endpoint | จุดที่ API เปิดให้เรียก = method + path หนึ่งคู่ |
| handler | ฟังก์ชันที่ทำงานเมื่อมีคำขอตรงกับ route นั้น |
| middleware | ฟังก์ชันที่คำขอไหลผ่านก่อนถึง handler |
| route param | ส่วนที่เปลี่ยนได้ใน path เช่น `:id` |
| query string | ค่าหลัง `?` ใน URL เช่น `?status=pending` |
| status code | ตัวเลข 3 หลักที่บอกผลของคำขอ |
