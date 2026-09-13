# ENGSE203 LAB 07 — คู่มือ Take-Home

**🏠 ทำที่บ้าน · CP13 → CP16 + ⭐ Challenge**
**หน่วยที่ 3 · สัปดาห์ที่ 7 · ส่งภายใน 5 วันหลังคาบ**

---

## อ่านก่อนเริ่ม

คู่มือนี้ต่อจาก **In-Class** ที่คุณทำจบในห้องแล้ว

| | สถานะ |
|---|---|
| 🏫 In-Class · CP09–CP12 | ✅ ควรเสร็จแล้ว — React เรียก API ได้จริง |
| 🏠 **Take-Home · CP13–CP16** | ← คู่มือนี้ |
| ⭐ Challenge | ไม่บังคับ · คะแนนเพิ่ม |

```bash
# ตรวจก่อนเริ่ม — ต้องได้ 25/25
node check-week07.mjs --inclass
```

> **ถ้ายังไม่ครบ ให้ทำ In-Class ให้เสร็จก่อน** — งานที่บ้านต่อยอดจากตรงนั้น · ถ้าติดจริง ๆ ทักผู้สอนก่อนเริ่ม

---

## เป้าหมายของงานที่บ้าน

In-Class เราทำให้สองฝั่ง**ต่อกันได้** · Take-Home ทำให้ระบบ**สมบูรณ์และพร้อมส่งมอบ**

| CP | ทำอะไร | ทำไมต้องทำ |
|---|---|---|
| **CP13** | `PUT` เปลี่ยนสถานะ — ทั้ง API และปุ่มใน React | CRUD ต้องครบจริงก่อนจบหน่วย |
| **CP14** | morgan + error handling ระดับ production | log ที่ใช้ไล่ปัญหาได้จริง · ไม่เปิดเผยข้อมูลภายใน |
| **CP15** | เขียน `API_CONTRACT.md` | เอกสารที่ทำให้คนอื่นใช้ API เราได้ |
| **CP16** | automated test อย่างน้อย 6 เคส | รู้ทันทีเมื่อของเดิมพัง |

**เป้าหมายตัวเลข** — `node check-week07.mjs` ผ่าน **31/36** (36/36 ถ้าทำ Challenge ครบ)

---

# CP13 · PUT เปลี่ยนสถานะ — ทั้งสองฝั่ง

**🏠 60 นาที**

ตอนนี้แอปเรา **สร้างได้ ลบได้ แต่แก้ไม่ได้** — คำร้องที่สร้างแล้วจะเป็น `pending` ตลอดไป

## ① ฝั่ง API

`api/src/services/requestService.js` และ `requestController.js` มี `updateStatus` / `updateRequestStatus` อยู่แล้วจาก Week 06 (เป็น Challenge) — ถ้ายังไม่ได้ทำให้ทำตอนนี้

| กรณี | status ที่ต้องตอบ |
|---|---|
| เปลี่ยนสำเร็จ | `200` + คำร้องที่อัปเดตแล้ว |
| `status` ไม่อยู่ใน 3 ค่าที่ยอมรับ | `400` |
| ไม่พบคำร้องรหัสนั้น | `404` |

ค่าที่ยอมรับ — `pending` · `in-progress` · `completed`

**ทดสอบด้วย Postman ก่อน**

```http
PUT http://localhost:3001/api/requests/REQ-001
Content-Type: application/json

{ "status": "in-progress" }
```

## ② ฝั่ง React — service

ทำ **`TODO W07-F6`** ใน `frontend/src/services/requestService.js`

```js
export async function updateRequestStatus(requestId, status) {
  return apiFetch(`/api/requests/${encodeURIComponent(requestId)}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}
```

## ③ ฝั่ง React — ปุ่มในหน้าจอ

เพิ่มปุ่มเปลี่ยนสถานะใน `RequestDetailPage.jsx` หรือใน `RequestCard.jsx`

**สิ่งที่ต้องคิด**

- [ ] ระหว่างกดแล้วรอ API ตอบ — ปุ่มควร disabled กันกดซ้ำ
- [ ] สำเร็จแล้วหน้าจอต้องอัปเดตให้ตรงกับข้อมูลใหม่
- [ ] ถ้าเปลี่ยนไม่สำเร็จ ต้องบอกผู้ใช้

```jsx
async function handleChangeStatus(nextStatus) {
  setUpdating(true);
  try {
    const updated = await updateRequestStatus(request.id, nextStatus);
    setRequest(updated);
  } catch (error) {
    setError(error.message);
  } finally {
    setUpdating(false);
  }
}
```

### ⚠ กับดัก — อย่าอัปเดตหน้าจอก่อนที่ API จะตอบสำเร็จ

```jsx
// ✕ ผิด — ถ้า API ล้มเหลว หน้าจอจะแสดงค่าที่ไม่จริง
setRequest({ ...request, status: nextStatus });
await updateRequestStatus(request.id, nextStatus);

// ✓ ถูก — ใช้ค่าที่เซิร์ฟเวอร์ตอบกลับมา
const updated = await updateRequestStatus(request.id, nextStatus);
setRequest(updated);
```

### ✓ ผ่าน CP13 เมื่อ

- [ ] Postman: `PUT` สำเร็จ → 200 · status ผิด → 400 · ไม่พบ → 404
- [ ] กดปุ่มในหน้าเว็บแล้วสถานะเปลี่ยนจริง
- [ ] refresh หน้าเว็บแล้วสถานะใหม่ยังอยู่ (แปลว่าบันทึกจริง)
- [ ] ระหว่างรอ API ตอบ ปุ่มกดซ้ำไม่ได้

---

# CP14 · Logging และ Error Handling ระดับ Production

**🏠 45 นาที**

## ① เปลี่ยน logger เองเป็น morgan

Week 06 เราเขียน logger เองเพื่อเข้าใจว่า middleware ทำงานอย่างไร · ในงานจริงมีคนทำไว้ให้แล้วและครบกว่า

ทำ **`TODO W07-A2`** ใน `api/src/app.js`

```js
import morgan from 'morgan';

app.use(morgan(config.isProduction ? 'combined' : 'dev'));
```

| รูปแบบ | ใช้เมื่อ | ได้อะไร |
|---|---|---|
| `'dev'` | ตอนพัฒนา | สั้น มีสี อ่านง่ายบนหน้าจอ |
| `'combined'` | ตอนใช้งานจริง | ละเอียด มี IP, user-agent, เวลา — เหมาะเก็บเป็นไฟล์ |

**ทดสอบ** — ลองสลับค่า `NODE_ENV` ใน `.env` ระหว่าง `development` กับ `production` แล้วดูว่า log เปลี่ยนรูปแบบจริง

> อย่าลืม**เปลี่ยนกลับเป็น `development`** หลังทดสอบ

## ② Error handling ที่ไม่เปิดเผยข้อมูลภายใน

ทำใน `api/src/middleware/errorHandler.js`

```js
export function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;

  if (status >= 500) {
    console.error('เกิดข้อผิดพลาดภายใน:', err.message);
  }

  res.status(status).json({
    error: status >= 500 ? 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' : err.message,
    // ส่ง stack เฉพาะตอนพัฒนาเท่านั้น
    ...(config.isProduction ? {} : { stack: err.stack?.split('\n').slice(0, 3) }),
  });
}
```

### ⚠ ห้ามส่ง stack trace ให้ผู้ใช้ตอน production

stack trace บอก**โครงสร้างไฟล์ในเครื่องเซิร์ฟเวอร์** และบางทีบอกชื่อตัวแปรหรือ query ที่ใช้ · เป็นข้อมูลที่คนไม่หวังดีใช้หาช่องโหว่ได้

### ⚠ error 5xx ควร log ไว้ แต่บอกผู้ใช้กลาง ๆ

ผู้ใช้ไม่ได้ทำอะไรผิด — บอกไปก็ไม่ช่วยอะไร · แต่**เราต้องรู้** เพื่อไปแก้ จึง `console.error` ไว้

### ✓ ผ่าน CP14 เมื่อ

- [ ] terminal เห็น log รูปแบบ morgan (`GET /api/requests 200 3.221 ms - 669`)
- [ ] สลับ `NODE_ENV` แล้วรูปแบบ log เปลี่ยนจริง
- [ ] ตั้ง `NODE_ENV=production` แล้ว response ของ error **ไม่มี** `stack`

---

# CP15 · เขียน API Contract

**🏠 60 นาที**

## ทำไมต้องเขียน

สมมติทีมมี 4 คน — 2 คนทำ front-end 2 คนทำ back-end

**ถ้าไม่มี contract** ฝั่ง front-end ต้องรอ back-end ทำเสร็จก่อนถึงจะเริ่มได้
**ถ้ามี contract** ทั้งสองฝั่งเริ่มพร้อมกันได้เลย เพราะรู้แล้วว่าจะส่งอะไรให้กันในรูปแบบไหน

> **เราใช้ contract นี้มาตลอดโดยไม่รู้ตัว** — ตอน Week 05 เราออกแบบ `requestService.js` ให้มี 4 ฟังก์ชันที่ตรงกับ REST endpoint · นั่นคือการวาง contract ไว้ล่วงหน้า · Week 06 สร้าง API ให้ตรง · Week 07 ต่อเข้าด้วยกันได้โดยแทบไม่ต้องปรับอะไร

## สิ่งที่ต้องมีใน `API_CONTRACT.md`

สร้างไฟล์ที่ root ของ week-07

| หัวข้อ | ต้องมีอะไร |
|---|---|
| **โครงสร้างข้อมูล** | ทุก field · ชนิด · จำเป็นไหม · ตัวอย่างค่า |
| **รายการ endpoint** | method + path + ทำอะไร · ครบทั้ง 5 |
| **request body** | ส่งอะไรไป พร้อมตัวอย่าง JSON จริง |
| **response ทุกกรณี** | สำเร็จได้อะไร · ผิดพลาดได้อะไร |
| **status code** | กรณีไหนได้อะไร |
| **รูปแบบ error** | ฝั่ง front-end จะได้เขียนโค้ดจัดการถูก |
| **CORS** | origin ไหนที่อนุญาต |
| **Environment variables** | ทั้งสองฝั่งต้องตั้งอะไรบ้าง |
| **วิธีรันทั้งระบบ** | คำสั่งเปิด 2 terminal |

## 📄 มี template ให้แล้ว — ไม่ต้องเริ่มจากหน้าว่าง

อยู่ใน starter ที่แจก: `lab07/starter/templates/`

| ไฟล์ | ใช้เมื่อไร |
|---|---|
| `API_CONTRACT_TEMPLATE.md` | **ใช้ทำงานส่ง** — คัดลอกไปเป็น `API_CONTRACT.md` แล้วเขียนต่อ |
| `API_CONTRACT_TEMPLATE.docx` | **ใช้เมื่อต้องส่งให้ลูกค้าหรือหน่วยงาน** — ฉบับทางการ มีปก สารบัญ เลขหน้า และหน้าลงนาม |

### วิธีใช้ฉบับ `.md`

```bash
cp lab07/starter/templates/API_CONTRACT_TEMPLATE.md API_CONTRACT.md
```

ใน template มี **3 แบบ** ปนกันอยู่ สังเกตสัญลักษณ์

| สัญลักษณ์ | คืออะไร | ต้องทำอะไร |
|---|---|---|
| บรรทัดขึ้นต้นด้วย `>` | คำอธิบายสอนว่าหัวข้อนั้นมีไว้ทำไม | **อ่านแล้วลบทิ้ง** |
| ✅ | ตัวอย่างที่เขียนเสร็จแล้วจาก API ของเรา (GET, POST) | ใช้เป็นแบบอย่าง · แก้ให้ตรงระบบตัวเอง |
| ✍️ | ส่วนที่คุณต้องเขียนเอง (PUT, DELETE, ประวัติการเปลี่ยนแปลง) | **เขียนตามรูปแบบของ ✅** |

> **ทำไมให้ตัวอย่างมาครึ่งเดียว** — ถ้าให้ครบคุณจะแค่คัดลอกส่ง โดยไม่ได้เข้าใจว่าแต่ละส่วนมีไว้ทำไม
> ✅ สองเส้นแรกทำให้ดูเป็นตัวอย่าง แล้ว ✍️ สองเส้นหลังคุณเขียนเองตามรูปแบบเดียวกัน

### ⚠ กฎเหล็กของ CP15

**ทุกตัวอย่างต้องคัดลอกมาจากการยิงจริง** — เปิด Postman ยิงแล้วคัดลอกผลที่ได้มาใส่

ถ้าเขียนจากความจำหรือเดาเอา contract จะกลายเป็นเอกสารที่หลอกคนอ่าน · ผู้สอนจะสุ่มยิง 2–3 เส้นเทียบกับที่คุณเขียน

### เมื่อไรควรใช้ฉบับ `.docx`

`.md` เหมาะกับงานในทีมพัฒนา เพราะอยู่ใน git ดู diff ได้

แต่เมื่อต้อง**ส่งให้ลูกค้า หัวหน้างาน หรือหน่วยงานภายนอก** ไฟล์ `.md` ไม่เหมาะ เพราะเปิดแล้วเห็นเป็นข้อความดิบ ไม่มีเลขหน้า ไม่มีที่ลงนาม

ฉบับ `.docx` จึงมี — ปก · สารบัญอัตโนมัติ · หัวท้ายกระดาษ · เลขหน้า · **หน้าลงนามรับทราบ**

> **ไม่บังคับส่ง `.docx`** สำหรับ CP15 — ส่ง `.md` พอ · แต่ลองเปิดดูไว้ เพราะตอนทำงานจริงคุณจะต้องใช้

### ⚠ เขียนจากของจริง ไม่ใช่จากที่คิดว่าควรเป็น

ยิงทุก endpoint ใน Postman แล้ว **copy response จริงมาใส่** · contract ที่เขียนจากความจำมักผิดตรงรายละเอียด เช่นชื่อ field หรือรูปแบบ error

### ✓ ผ่าน CP15 เมื่อ

- [ ] มีไฟล์ `API_CONTRACT.md` ครบทั้ง 5 endpoint
- [ ] ตัวอย่าง request/response **copy มาจากของจริง**
- [ ] มีส่วน error, CORS และ environment variables
- [ ] **ให้เพื่อนอ่านแล้วเขาเรียก API เราได้โดยไม่ต้องถาม**

---

# CP16 · Automated Test

**🏠 60 นาที**

## ทำไมต้องเขียนเอง ทั้งที่มี checker แล้ว

| | checker ของวิชา | test ที่คุณเขียนเอง |
|---|---|---|
| ใครเขียน | ผู้สอน | **คุณ** |
| ตรวจอะไร | สิ่งที่โจทย์กำหนด | **สิ่งที่คุณคิดว่าสำคัญ** |
| ใช้ตอนไหน | ตอนส่งงาน | ทุกครั้งที่แก้โค้ด |
| ในงานจริง | ไม่มี | **มีเสมอ** |

> **ประโยชน์จริงของ test** ไม่ใช่ "พิสูจน์ว่าโค้ดถูก" แต่คือ **"รู้ทันทีเมื่อของเดิมพัง"** — เหมือน regression checklist ที่เราทำด้วยมือใน Week 05 แต่รันอัตโนมัติในไม่กี่วินาที

## เขียนใน `api/tests/api.test.js`

ทำ **`TODO W07-TEST`** — อย่างน้อย 6 เคส

```js
import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

let app;
before(async () => {
  await loadSeed();
  app = createApp();
});

describe('GET /api/requests', () => {
  test('คืนรายการทั้งหมด พร้อม status 200', async () => {
    const res = await request(app).get('/api/requests');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
  });
});
```

**เคสที่ต้องมี**

| # | ทดสอบอะไร | ต้องได้ |
|---|---|---|
| 1 | `GET /api/requests` | 200 + array |
| 2 | `GET /api/requests/:id` ที่มีอยู่ | 200 |
| 3 | `GET /api/requests/:id` ที่ไม่มี | 404 |
| 4 | `POST` ข้อมูลถูกต้อง | 201 + `status: "pending"` |
| 5 | `POST` ข้อมูลไม่ครบ | 400 |
| 6 | CORS header ตอบ origin ที่อนุญาต | header ตรง |

```bash
npm test
```

### 💡 supertest ยิง request จริงโดยไม่ต้องเปิดเซิร์ฟเวอร์

มันสร้างเซิร์ฟเวอร์ชั่วคราวขึ้นมาเองแล้วปิดให้อัตโนมัติ · จึงรัน test หลายไฟล์พร้อมกันได้โดยไม่ชนพอร์ต และไม่ต้องจำว่าต้องเปิด API ก่อน

### ⚠ test ที่ดีต้องอธิบายตัวเองได้

```js
// ✕ อ่านแล้วไม่รู้ว่าทดสอบอะไร
test('test 1', async () => { ... });

// ✓ อ่านชื่อก็รู้ว่าคาดหวังอะไร
test('POST ข้อมูลไม่ครบ ตอบ 400 พร้อมรายการที่ผิด', async () => { ... });
```

### ✓ ผ่าน CP16 เมื่อ

- [ ] `npm test` ผ่านทุกเคส
- [ ] มีอย่างน้อย 6 เคส
- [ ] ชื่อ test อ่านแล้วรู้ว่าทดสอบอะไร
- [ ] **ลองทำให้พัง** — แก้ controller ให้ตอบ 200 แทน 201 แล้วรัน test ต้องฟ้อง

---

# ⭐ Challenge — คะแนนเพิ่ม

**ไม่บังคับ · คะแนนพิเศษสูงสุด +15%**

## ⭐ 1 · `AppError` — กำหนด status เองได้

```js
export class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}
```

ใช้แล้วโยนจากที่ไหนก็ได้ แล้ว `errorHandler` จะอ่าน `err.status` ไปตอบให้อัตโนมัติ

```js
if (!found) throw new AppError('ไม่พบคำร้อง', 404);
```

**ประโยชน์** — controller ไม่ต้องเขียน `res.status(404).json(...)` ซ้ำทุกที่

## ⭐ 2 · `asyncHandler` — ห่อ handler ที่เป็น async

```js
export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
```

```js
router.get('/', asyncHandler(controller.listRequests));
```

**ทำไมต้องมี** — Express 5 จับ error จาก async handler ให้อัตโนมัติแล้ว **แต่ Express 4 ที่ยังใช้กันมากในงานจริงไม่จับ** · error จะหายเงียบไปเลย · เป็นรูปแบบที่ควรรู้จักไว้

## ⭐ 3 · Retry อัตโนมัติฝั่ง React

เมื่อ API ล่มชั่วคราว ลองใหม่อัตโนมัติ 2–3 ครั้งก่อนแจ้งผู้ใช้

**สิ่งที่ต้องคิด**

- retry เฉพาะ error ที่ลองใหม่แล้วมีโอกาสสำเร็จ (status `0` หรือ `5xx`)
- **อย่า retry เมื่อได้ `400` หรือ `404`** — ลองอีกกี่ครั้งก็ได้ผลเดิม
- เว้นระยะห่างระหว่างครั้ง (เช่น 500ms, 1s, 2s) ไม่ใช่ยิงรัว ๆ

---

# การส่งงาน

## โครงสร้างที่ต้องมี

```
labs/week-07/source/
├── api/
│   ├── src/
│   ├── tests/api.test.js          ← CP16
│   ├── .env.example               ← commit อันนี้
│   └── package.json
├── frontend/
│   ├── src/services/apiClient.js
│   ├── src/services/requestService.js
│   ├── .env.example               ← commit อันนี้
│   └── package.json
├── API_CONTRACT.md                ← CP15
├── check-week07.mjs
├── evidence/
│   ├── API_TEST.md
│   └── images/                    ← screenshot 3 ภาพ
├── AI_USAGE.md
└── .gitignore                     ← ต้องมี node_modules, .env, .env.local
```

## Screenshot ที่ต้องมี

| ไฟล์ | ถ่ายอะไร |
|---|---|
| `network-cors-ok.png` | DevTools Network แสดง header `Access-Control-Allow-Origin` |
| `app-with-api.png` | หน้า Dashboard แสดงข้อมูลจาก API (เห็น Network tab ด้วย) |
| `error-state.png` | ปิด API แล้วแอปแสดงข้อความบอกสาเหตุ |

## ขั้นตอนส่ง

```bash
# 1 · ตรวจก่อนส่ง
node check-week07.mjs
# ต้องได้อย่างน้อย 31/36

cd api && npm test        # ต้องผ่านทุกเคส

# 2 · ตรวจว่าไม่มีอะไรหลุด
cd .. && git status
# ต้องไม่เห็น node_modules, .env, .env.local

# 3 · commit และ push
git switch -c unit3/week-07
git add -A
git commit -m "LAB07: เชื่อม React กับ API — CORS, env config, contract, test"
git push -u origin unit3/week-07

# 4 · ติด tag
git tag lab-07-submission-v1
git push origin lab-07-submission-v1
```

### ⚠ ห้าม commit `.env` และ `.env.local`

commit เฉพาะ `.env.example` ที่ไม่มีค่าจริง · ถ้าเผลอ commit ไปแล้วให้ลบออกจาก git แล้วเพิ่มใน `.gitignore`

## กติกาเรื่อง AI

**ใช้ AI ได้** แต่ต้องกรอก `AI_USAGE.md` ว่าถามอะไร ใช้คำตอบส่วนไหน แก้เองตรงไหน

> ผู้สอนจะสุ่มถามจากโค้ดที่ส่ง — **ถ้าอธิบายโค้ดตัวเองไม่ได้ คะแนนส่วนนั้นจะถูกทบทวน**

---

## เช็คลิสต์ก่อนส่ง

### โค้ด

- [ ] `node check-week07.mjs` ได้อย่างน้อย **31/36**
- [ ] `cd api && npm test` ผ่านทุกเคส
- [ ] เปิดทั้งสองฝั่งแล้วใช้แอปได้ครบทุกหน้า รวม PUT เปลี่ยนสถานะ
- [ ] ปิด API แล้วแอปแสดงข้อความบอกสาเหตุ ไม่ใช่หน้าขาว

### เอกสารและหลักฐาน

- [ ] `API_CONTRACT.md` ครบ 5 endpoint · ตัวอย่างมาจากของจริง
- [ ] `evidence/API_TEST.md` กรอกตามผลจริง
- [ ] Screenshot 3 ภาพ
- [ ] `AI_USAGE.md` กรอกแล้ว

### Git

- [ ] `.gitignore` มี `node_modules/`, `.env`, `.env.local`
- [ ] `git status` สะอาด
- [ ] push ขึ้น branch `unit3/week-07`
- [ ] tag `lab-07-submission-v1`

---

## เกณฑ์ให้คะแนน

| ส่วน | คะแนน | วัดจาก |
|---|---|---|
| 🏫 In-Class (CP09–CP12) | 30% | checkpoint ที่ตรวจในห้อง |
| 🏠 Take-Home (CP13–CP16) | 70% | checker + evidence + oral |
| ⭐ Challenge | +15% bonus | checker รายการ ⭐ |

---

## ภาคผนวก · ปัญหาที่พบบ่อยตอนทำที่บ้าน

| อาการ | สาเหตุ | วิธีแก้ |
|---|---|---|
| `npm test` ฟ้อง `Cannot find module 'supertest'` | ยังไม่ได้ติดตั้ง | `cd api && npm install --save-dev supertest` |
| `npm test` ฟ้องหาไฟล์ไม่เจอ | รูปแบบคำสั่งผิด | ต้องเป็น `node --test "tests/*.test.js"` |
| กดปุ่มเปลี่ยนสถานะแล้วหน้าจอไม่เปลี่ยน | ไม่ได้ใช้ค่าที่ API ตอบกลับมา | `setRequest(updated)` ไม่ใช่เดาค่าเอง |
| morgan ไม่แสดง log | ยังมี logger เก่าอยู่ หรือวางหลัง route | ลบ logger เก่า · ย้าย morgan ขึ้นบน |
| response ยังมี `stack` ตอน production | `config.isProduction` ไม่ทำงาน | ตรวจว่าตั้ง `NODE_ENV=production` ใน `.env` แล้ว |
| `git status` เห็น `.env` | ยังไม่ได้ใส่ใน `.gitignore` | เพิ่มแล้ว `git rm --cached .env` |

## ภาคผนวก · เอกสารประกอบการสอนบทไหนช่วยเรื่องอะไร

| ติดตรงไหน | อ่านบท |
|---|---|
| CORS · origin · preflight | บทที่ 2, 3 |
| environment variables · `VITE_` | บทที่ 4 |
| apiClient · การจัดการ error | บทที่ 5 |
| แก้ requestService · signature | บทที่ 6 |
| loading / error state | บทที่ 7 |
| morgan · error handling | บทที่ 8 |
| API Contract | บทที่ 9 |
| automated test | บทที่ 10 |
