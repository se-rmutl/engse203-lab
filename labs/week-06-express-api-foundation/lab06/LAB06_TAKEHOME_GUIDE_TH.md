# ENGSE203 LAB 06 — คู่มือ Take-Home

**🏠 ทำที่บ้าน · CP06 → CP08 + ⭐ Challenge**
**หน่วยที่ 3 · สัปดาห์ที่ 6 · ส่งภายใน 5 วันหลังคาบ**

---

## อ่านก่อนเริ่ม

คู่มือนี้ต่อจาก **In-Class** ที่คุณทำจบในห้องแล้ว

| | สถานะ |
|---|---|
| 🏫 In-Class · CP00–CP05 | ✅ ควรเสร็จแล้วในห้อง — CRUD API ทำงานได้ |
| 🏠 **Take-Home · CP06–CP08** | ← คู่มือนี้ |
| ⭐ Challenge | ไม่บังคับ · คะแนนเพิ่ม |

> **ถ้า In-Class ยังไม่ครบ 23/23 ให้ทำให้เสร็จก่อน** — งานที่บ้านต่อยอดจากตรงนั้น · ถ้าติดจริง ๆ ทักผู้สอนก่อนเริ่ม

```bash
npm run check -- --inclass    # ต้องได้ 23/23 ก่อนเริ่มคู่มือนี้
```

---

## เป้าหมายของงานที่บ้าน

In-Class เราทำให้ API **ทำงานได้** · Take-Home ทำให้ API **เป็นระเบียบและทนทาน**

| CP | ทำอะไร | ทำไมต้องทำ |
|---|---|---|
| **CP06** | แยกชั้น route/controller/service ให้สมบูรณ์ | โค้ดโตขึ้นแล้วยังหาของเจอ |
| **CP07** | error handling + notFound รวมศูนย์ | เซิร์ฟเวอร์ไม่ล่มเมื่อเกิดข้อผิดพลาด |
| **CP08** | เก็บข้อมูลลงไฟล์ JSON + เอกสารทดสอบ | ข้อมูลไม่หายเมื่อรีสตาร์ทเซิร์ฟเวอร์ |

**เป้าหมายตัวเลข** — `npm run check` ผ่าน **25/28** (เหลือ 3 รายการเป็น ⭐ Challenge)

---

# CP06 · ตรวจการแยกชั้นให้สมบูรณ์

**🏠 30 นาที**

ตอน In-Class เราเขียนโค้ดกระจายไปตามไฟล์แล้ว — ช่วงนี้ตรวจว่าแต่ละชั้น **รับผิดชอบเฉพาะสิ่งที่ควรทำ**

## กฎของแต่ละชั้น

| ชั้น | ทำอะไร | **ห้ามทำ** |
|---|---|---|
| `routes/` | จับคู่ method + path กับ controller | ห้ามมี logic ธุรกิจ |
| `controllers/` | อ่าน `req` · ตัดสิน status · ส่ง `res` | ห้ามแตะ array ข้อมูลโดยตรง |
| `services/` | จัดการข้อมูล — หา เพิ่ม ลบ | **ห้ามรู้จัก `req` หรือ `res`** |

## สิ่งที่ต้องตรวจในโค้ดตัวเอง

เปิด `src/services/requestService.js` แล้วค้นหาคำว่า `req` และ `res`

- [ ] **ต้องไม่เจอเลย** — ถ้าเจอแปลว่า service รู้จัก HTTP ซึ่งผิดหลักการ
- [ ] ทุกฟังก์ชันใน service คืนข้อมูลหรือ `null`/`true`/`false` — ไม่ส่ง response เอง

เปิด `src/controllers/requestController.js`

- [ ] ไม่มีการเข้าถึงตัวแปร `requests` โดยตรง — ต้องผ่าน `service.` เท่านั้น
- [ ] ทุกฟังก์ชันจบด้วยการส่ง response (`res.json()` หรือ `res.status().end()`)

## ⚠ ทำไมเรื่องนี้สำคัญ

**หน่วยที่ 4 เราจะเปลี่ยนจากเก็บข้อมูลในหน่วยความจำเป็นฐานข้อมูล SQLite**

ถ้าแยกชั้นถูกต้อง — แก้แค่ `services/` ไฟล์เดียว · `controllers/` และ `routes/` ไม่ต้องแตะเลย

นี่คือหลักการเดียวกับ Service Layer ของ React ใน Week 05 ที่เปลี่ยนจาก localStorage เป็น API โดย component ไม่ต้องแก้

### ✓ ผ่าน CP06 เมื่อ

- [ ] ค้นหา `req` / `res` ใน `services/` แล้วไม่เจอ
- [ ] controller ไม่แตะข้อมูลโดยตรง
- [ ] `npm run check` ยังผ่านเท่าเดิม (การแยกชั้นไม่ทำให้พฤติกรรมเปลี่ยน)

---

# CP07 · Error Handling รวมศูนย์

**🏠 40 นาที**

ตอนนี้ถ้าเกิด error ที่เราไม่ได้คาดไว้ เซิร์ฟเวอร์จะตอบหน้า error ยาว ๆ ที่มี stack trace — **ซึ่งไม่ควรให้ผู้ใช้เห็น**

## ① notFound — คำขอที่ไม่มี route ตรง

`src/middleware/errorHandler.js` → **`TODO W06-M4`**

```js
export function notFound(req, res) {
  res.status(404).json({ error: `ไม่พบเส้นทาง ${req.method} ${req.originalUrl}` });
}
```

## ② errorHandler — จับ error ที่หลุดมา

`src/middleware/errorHandler.js` → **`TODO W06-M3`**

```js
export function errorHandler(err, req, res, next) {
  console.error('เกิดข้อผิดพลาด:', err.message);
  res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
}
```

### ⚠ ต้องมี 4 พารามิเตอร์เท่านั้น

Express รู้ว่าฟังก์ชันไหนเป็น error handler **จากจำนวนพารามิเตอร์** ถ้าเขียนแค่ 3 ตัว Express จะคิดว่าเป็น middleware ธรรมดาแล้วไม่เรียกตอนเกิด error

```js
// ✕ ผิด — Express ไม่รู้ว่าเป็น error handler
export function errorHandler(err, req, res) { ... }

// ✓ ถูก — ต้องมี next แม้จะไม่ได้ใช้
export function errorHandler(err, req, res, next) { ... }
```

### ⚠ อย่าส่ง stack trace ให้ผู้ใช้

```js
// ✕ ผิด — เปิดเผยโครงสร้างภายในให้คนภายนอกเห็น
res.status(500).json({ error: err.stack });

// ✓ ถูก — log ไว้ดูเอง ส่งข้อความกลาง ๆ ให้ผู้ใช้
console.error(err.message);
res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
```

## ③ ติดตั้งใน app.js

`src/app.js` → **`TODO W06-A4`**

```js
app.use(notFound);        // ต้องอยู่หลัง route ทั้งหมด
app.use(errorHandler);    // ต้องอยู่ท้ายสุดเสมอ
```

**ลำดับสำคัญมาก** — ถ้าเอา `notFound` ไว้ก่อน route จะดักทุกคำขอไว้หมด ไม่มีอะไรถึง route เลย

## ทดสอบ

| ยิงอะไร | ต้องได้ |
|---|---|
| `GET /api/unknown-path` | **404** + JSON `{"error": "..."}` ไม่ใช่หน้า HTML |
| `POST /api/requests` ที่ไม่ครบ | **400** + `details` เป็น array บอกว่าผิดอะไรบ้าง |

### ✓ ผ่าน CP07 เมื่อ

- [ ] path ที่ไม่มี → 404 พร้อม JSON (ไม่ใช่หน้า HTML ของ Express)
- [ ] `npm run check` ผ่านส่วน 🏠 ที่บ้าน **2/2**

---

# CP08 · เก็บข้อมูลลงไฟล์ + เอกสารทดสอบ

**🏠 50 นาที**

## ① ปัญหาที่ต้องแก้

ลองทำแบบนี้

1. เพิ่มคำร้องใหม่ด้วย POST
2. `GET /api/requests` → เห็นคำร้องที่เพิ่ง เพิ่ม
3. **กด Ctrl+C ปิดเซิร์ฟเวอร์ แล้วเปิดใหม่**
4. `GET /api/requests` → **คำร้องที่เพิ่มหายไป**

**เพราะข้อมูลอยู่ในหน่วยความจำของเซิร์ฟเวอร์** ปิดโปรแกรมแล้วหาย — ปัญหาเดียวกับ `useState` ใน Week 05 ที่ refresh แล้วหาย

## ② วิธีแก้ — เขียนกลับลงไฟล์

เพิ่มฟังก์ชันบันทึกใน `src/services/requestService.js`

```js
import { readFile, writeFile } from 'node:fs/promises';

const DATA_PATH = new URL('../../data/requests.json', import.meta.url);

async function persist() {
  await writeFile(DATA_PATH, JSON.stringify(requests, null, 2), 'utf8');
}
```

แล้วเรียก `persist()` **หลังทุกครั้งที่ข้อมูลเปลี่ยน** — ใน `create()` และ `remove()`

> ⚠ ฟังก์ชันที่เรียก `persist()` ต้องเป็น `async` และ controller ต้อง `await` ด้วย

## ③ โหลดจากไฟล์ตอนเริ่ม

แก้ `loadSeed()` ให้ลองอ่าน `data/requests.json` ก่อน — ถ้าไม่มีค่อยอ่าน `initialRequests.json`

```js
export async function loadSeed() {
  try {
    const raw = await readFile(DATA_PATH, 'utf8');
    requests = JSON.parse(raw);
  } catch {
    const raw = await readFile(SEED_PATH, 'utf8');
    requests = JSON.parse(raw);
    await persist();
  }
  return requests;
}
```

> **หลักการเดียวกับ Week 05** — อ่านจากที่เก็บก่อน ถ้าไม่มีค่อยใช้ข้อมูลตัวอย่าง · และ `try/catch` เพราะไฟล์อาจไม่มีหรืออ่านไม่ได้

**อย่าลืม** เพิ่ม `data/requests.json` ลง `.gitignore` — เป็นข้อมูลที่สร้างตอนรัน ไม่ควร commit

## ④ เขียน API_TEST.md

สร้างไฟล์ `evidence/API_TEST.md` บันทึกผลทดสอบจริง

| # | Method | Path | ส่งอะไร | status ที่ได้ | ผ่าน |
|---|---|---|---|---|---|
| 1 | GET | `/api/requests` | — | | ☐ |
| 2 | GET | `/api/requests/REQ-001` | — | | ☐ |
| 3 | GET | `/api/requests/REQ-999` | — | | ☐ |
| 4 | POST | `/api/requests` | ข้อมูลครบ | | ☐ |
| 5 | POST | `/api/requests` | ข้อมูลไม่ครบ | | ☐ |
| 6 | DELETE | `/api/requests/REQ-003` | — | | ☐ |
| 7 | DELETE | `/api/requests/REQ-999` | — | | ☐ |
| 8 | GET | `/api/unknown` | — | | ☐ |

> **บันทึกผลจริง** — ถ้าข้อไหนไม่ผ่านให้เขียนว่าไม่ผ่านพร้อมสิ่งที่เห็นจริง · รายงานที่เขียนย้อนหลังจะเป็น "ผ่าน" ทั้งหมดเสมอ ซึ่งไม่มีคุณค่า

## ⑤ Screenshot

เก็บภาพหน้าจอ 3 ภาพใน `evidence/images/`

| ไฟล์ | ถ่ายอะไร |
|---|---|
| `postman-get-200.png` | Postman ยิง GET แล้วได้ 200 พร้อมข้อมูล |
| `postman-post-201.png` | Postman ยิง POST แล้วได้ 201 |
| `terminal-logger.png` | terminal ที่เห็น log จาก middleware |

### ✓ ผ่าน CP08 เมื่อ

- [ ] เพิ่มคำร้อง → ปิดเซิร์ฟเวอร์ → เปิดใหม่ → **คำร้องยังอยู่**
- [ ] `API_TEST.md` กรอกครบ 8 รายการ
- [ ] Screenshot ครบ 3 ภาพ
- [ ] `data/requests.json` อยู่ใน `.gitignore`

---

# ⭐ Challenge — คะแนนเพิ่ม

**ไม่บังคับ · ทำได้ทำ · คะแนนพิเศษสูงสุด +15%**

Challenge ทั้ง 3 ข้อนี้ checker ตรวจให้ (รายการ `⭐` ในผลลัพธ์)

## ⭐ 1 · กรองด้วย query string

`GET /api/requests?status=pending` → คืนเฉพาะคำร้องที่ status ตรงกัน

**TODO ที่เกี่ยว** — `W06-S1b` ใน service

```js
export function findAll({ status } = {}) {
  if (!status) return structuredClone(requests);
  return structuredClone(requests.filter((r) => r.status === status));
}
```

controller อ่านค่าจาก `req.query.status` แล้วส่งต่อ

> **ทำไมใช้ query ไม่ใช่ path** — การกรองไม่ใช่ทรัพยากรใหม่ · `/pendingRequests` ผิดหลัก REST เพราะทรัพยากรยังเป็น requests เหมือนเดิม แค่กรอง

## ⭐ 2 · เปลี่ยนสถานะคำร้อง

`PUT /api/requests/:id` พร้อม body `{"status": "in-progress"}`

**TODO ที่เกี่ยว** — `W06-S4` (service) และ `W06-C4` (controller)

| กรณี | status ที่ต้องตอบ |
|---|---|
| เปลี่ยนสำเร็จ | 200 + คำร้องที่อัปเดตแล้ว |
| status ไม่อยู่ใน 3 ค่าที่ยอมรับ | **400** |
| ไม่พบคำร้องรหัสนั้น | **404** |

ค่าที่ยอมรับ — `pending`, `in-progress`, `completed`

## ⭐ 3 · แยก validation เป็น middleware ของตัวเอง

ตอนนี้ `validateRequest` ตรวจทุก field รวมกัน · ลองแยกเป็นฟังก์ชันย่อยแล้วนำมาต่อกัน หรือทำ middleware factory ที่รับ schema

---

# การส่งงาน

## โครงสร้างที่ต้องมี

```
engse203-student-labs-<รหัสนักศึกษา>/
└── labs/
    └── week-06/
        ├── src/                    ← โค้ด API
        │   ├── app.js
        │   ├── server.js
        │   ├── routes/
        │   ├── controllers/
        │   ├── services/
        │   └── middleware/
        ├── data/
        │   └── initialRequests.json
        ├── scripts/
        │   └── check-project.mjs
        ├── evidence/
        │   ├── API_TEST.md
        │   ├── images/             ← screenshot 3 ภาพ
        │   └── Campus_Service_API.postman_collection.json
        ├── AI_USAGE.md
        ├── package.json
        └── .gitignore              ← ต้องมี node_modules และ data/requests.json
```

## ขั้นตอนส่ง

```bash
# 1 · ตรวจก่อนส่ง
npm run check
# ต้องได้อย่างน้อย 25/28 (ถ้าทำ Challenge ครบจะได้ 28/28)

# 2 · ลบ node_modules ก่อนตรวจครั้งสุดท้าย
rm -rf node_modules
# แล้วตรวจว่าไม่มีอะไรหลุด
git status

# 3 · commit และ push
git switch -c unit3/week-06        # ถ้ายังไม่ได้สร้าง branch
git add -A
git commit -m "LAB06: RESTful API ด้วย Express — CRUD, middleware, error handling"
git push -u origin unit3/week-06

# 4 · ติด tag
git tag lab-06-submission-v1
git push origin lab-06-submission-v1
```

## กติกาเรื่อง AI

**ใช้ AI ได้** แต่ต้องกรอก `AI_USAGE.md` ว่าถามอะไร ใช้คำตอบส่วนไหน แก้เองตรงไหน

> **ผู้สอนจะสุ่มถามจากโค้ดที่ส่ง** — ถ้าอธิบายโค้ดตัวเองไม่ได้ คะแนนส่วนนั้นจะถูกทบทวน · **ใช้ AI เพื่อเข้าใจ ไม่ใช่เพื่อลอก**

---

## เช็คลิสต์ก่อนส่ง

### โค้ด

- [ ] `npm run check` ได้อย่างน้อย **25/28**
- [ ] `npm run dev` เปิดได้ไม่มี error
- [ ] service ไม่มี `req` หรือ `res`
- [ ] เพิ่มคำร้อง → รีสตาร์ทเซิร์ฟเวอร์ → ข้อมูลยังอยู่

### หลักฐาน

- [ ] `evidence/API_TEST.md` กรอกครบ 8 รายการ **ตามผลจริง**
- [ ] Screenshot 3 ภาพใน `evidence/images/`
- [ ] Postman collection อยู่ใน `evidence/`
- [ ] `AI_USAGE.md` กรอกแล้ว (ถ้าใช้ AI)

### Git

- [ ] `.gitignore` มี `node_modules/` และ `data/requests.json`
- [ ] `git status` สะอาด ไม่มีไฟล์ค้าง
- [ ] push ขึ้น branch `unit3/week-06`
- [ ] tag `lab-06-submission-v1`

---

## เกณฑ์ให้คะแนน

| ส่วน | คะแนน | วัดจาก |
|---|---|---|
| 🏫 In-Class (CP00–CP05) | 30% | checkpoint ที่ตรวจในห้อง |
| 🏠 Take-Home (CP06–CP08) | 70% | checker + evidence + oral |
| ⭐ Challenge | +15% bonus | checker รายการ ⭐ |

---

## ภาคผนวก · ปัญหาที่พบบ่อยตอนทำที่บ้าน

| อาการ | สาเหตุ | วิธีแก้ |
|---|---|---|
| `Cannot find module` | ลืม `npm install` | รัน `npm install` |
| ข้อมูลหายทุกครั้งที่รีสตาร์ท | ยังไม่ได้ทำ CP08 หรือลืมเรียก `persist()` | ตรวจว่าเรียกหลังทุกครั้งที่ข้อมูลเปลี่ยน |
| `persist is not a function` | ลืม `async`/`await` | ฟังก์ชันที่เรียก persist ต้องเป็น async |
| error handler ไม่ทำงาน | เขียนแค่ 3 พารามิเตอร์ | ต้องมี `(err, req, res, next)` ครบ 4 |
| ทุกคำขอได้ 404 | เอา `notFound` ไว้ก่อน route | ย้ายไปหลัง route ทั้งหมด |
| `git push` ถูกปฏิเสธ | ยังไม่ได้สร้าง branch บน remote | ใช้ `git push -u origin unit3/week-06` |

## ภาคผนวก · เอกสารประกอบการสอนบทไหนช่วยเรื่องอะไร

| ติดตรงไหน | อ่านบท |
|---|---|
| ไม่เข้าใจว่าทำไมต้องมี backend | บทที่ 1 |
| Node.js ต่างจากเบราว์เซอร์อย่างไร | บทที่ 2 |
| HTTP request/response · method · URL | บทที่ 3 |
| Postman · DevTools Network | บทที่ 3.5 |
| Express · route · handler | บทที่ 4, 5 |
| `req.body` ว่าง · `res` ใช้ยังไง | บทที่ 6 |
| middleware · `next()` · ลำดับ | บทที่ 7 |
| REST · ตั้งชื่อ path | บทที่ 8 |
| status code ตัวไหนใช้เมื่อไร | บทที่ 9 |
| การแยกชั้น route/controller/service | บทที่ 10 |
