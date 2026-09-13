# ENGSE203 LAB 07 — คู่มือ In-Class

**🏫 ทำในห้อง · CP09 → CP12 · เชื่อม React กับ API ให้ทำงานจริง**
**หน่วยที่ 3 · สัปดาห์ที่ 7 · ปฏิบัติ 3 ชั่วโมง**

---

## อ่านก่อนเริ่ม

สัปดาห์นี้เป็น **payoff ที่ปูมาสองสัปดาห์** — Week 05 สร้าง Service Layer · Week 06 สร้าง API ที่ตรง contract · วันนี้ต่อสองฝั่งเข้าด้วยกัน

| | ทำอะไร |
|---|---|
| **🏫 ในห้อง (คู่มือนี้)** | CP09–CP12 · เจอ CORS error จริง → แก้ → เชื่อม React กับ API |
| 🏠 ที่บ้าน | CP13–CP16 · PUT, morgan, API contract, automated test |
| ⭐ Challenge | AppError, asyncHandler, retry |

### สิ่งที่ต่างจากทุกสัปดาห์ที่ผ่านมา

**วันนี้ต้องรัน 2 โปรแกรมพร้อมกัน** — API ที่พอร์ต 3001 และ React ที่พอร์ต 5173 · การ debug จึงต้องดูสองที่

| ดูที่ไหน | เห็นอะไร |
|---|---|
| **DevTools → Console** | error ฝั่งเบราว์เซอร์ · CORS error จะขึ้นที่นี่ |
| **DevTools → Network** | คำขอไปถึงไหม · ได้ status อะไรกลับมา |
| **terminal ของ API** | คำขอมาถึงเซิร์ฟเวอร์ไหม · error ฝั่งเซิร์ฟเวอร์ |

---

## เตรียมตัว — เปิด 2 terminal

```bash
# Terminal 1 — API (ต่อจาก Week 06)
cd labs/week-07/source/api
npm install
cp .env.example .env
npm run dev
# ต้องเห็น: Campus Service API พร้อมที่ http://localhost:3001
```

```bash
# Terminal 2 — Frontend (ต่อจาก Week 05)
cd labs/week-07/source/frontend
npm install
cp .env.example .env.local
npm run dev
# ต้องเห็น: Local: http://localhost:5173
```

> **เปิดค้างไว้ทั้งคาบทั้งสองอัน** · ทั้งสองตัวมี watch จะรีสตาร์ทเองเมื่อแก้ไฟล์

### ✓ พร้อมเริ่มเมื่อ

- [ ] API เปิดที่ 3001 · เปิดเบราว์เซอร์ไปที่ `http://localhost:3001` เห็น JSON
- [ ] React เปิดที่ 5173 · เห็นหน้า Dashboard (ยังโหลดจาก localStorage อยู่)
- [ ] เปิด DevTools (F12) ค้างไว้ที่แท็บ Console

---

## แผนที่ของวันนี้

| CP | ทำอะไร | ไฟล์ | เวลา |
|---|---|---|---|
| **CP09** | เจอ CORS error ด้วยตาตัวเอง | `requestService.js` (ชั่วคราว) | 20 นาที |
| **CP10** | เปิด CORS + environment config | `config.js` `app.js` `server.js` | 35 นาที |
| **CP11** | apiClient + แก้ requestService | `apiClient.js` `requestService.js` | 60 นาที |
| **CP12** | loading + error state | `DashboardPage.jsx` | 30 นาที |

**เป้าหมายตอนจบ** — `node check-week07.mjs --inclass` ผ่าน **25/25**

---

# CP09 · เจอ CORS error ด้วยตาตัวเอง

**🏫 20 นาที · I do สาธิต → ทุกคนลองเอง**

ก่อนจะแก้ปัญหา เราต้อง**เห็นปัญหาก่อน** — ไม่งั้นจะไม่เข้าใจว่ากำลังแก้อะไร

## ทดลอง

เปิด `frontend/src/services/requestService.js` แล้ว**แก้ชั่วคราว**ให้เรียก API ตรง ๆ

```js
export async function getRequests(options = {}) {
  const res = await fetch('http://localhost:3001/api/requests');
  return res.json();
}
```

บันทึก แล้วเปิดหน้า Dashboard ในเบราว์เซอร์

## สิ่งที่จะเห็น

**ใน Console จะขึ้น error แบบนี้**

```
Access to fetch at 'http://localhost:3001/api/requests'
from origin 'http://localhost:5173' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## อ่าน error ให้เป็น

ข้อความนี้บอกครบทุกอย่าง

| ส่วน | บอกอะไร |
|---|---|
| `Access to fetch at 'http://localhost:3001/...'` | เรียกไปที่ไหน |
| `from origin 'http://localhost:5173'` | เรียกมาจากไหน |
| `blocked by CORS policy` | ถูกบล็อกเพราะ CORS |
| `No 'Access-Control-Allow-Origin' header` | ขาด header อะไร |

## ⚠ ตรวจสอบให้เห็นด้วยตา — คำขอไปถึงเซิร์ฟเวอร์แล้ว

**ดูที่ terminal ของ API** — จะเห็น log ว่ามีคำขอเข้ามาจริง

```
GET /api/requests → 200 (2ms)
```

**นี่คือจุดสำคัญที่สุดของ CP นี้**

- คำขอ**ไปถึงเซิร์ฟเวอร์แล้ว** และเซิร์ฟเวอร์**ตอบ 200 กลับมาแล้ว**
- แต่**เบราว์เซอร์ไม่ให้โค้ดเราอ่าน response นั้น**
- **CORS error ไม่ได้มาจากเซิร์ฟเวอร์ — มาจากเบราว์เซอร์ที่อยู่ตรงกลาง**

## ลองเทียบกับ Postman

ยิง `GET http://localhost:3001/api/requests` ใน Postman → **ได้ 200 ปกติ ไม่ติดอะไรเลย**

> เพราะ Postman ไม่ใช่เบราว์เซอร์ จึงไม่มีกฎ Same-Origin Policy · **นี่คือเหตุผลที่ Week 06 ไม่เคยเจอปัญหานี้**

### ✓ ผ่าน CP09 เมื่อ

- [ ] เห็น CORS error ใน Console ด้วยตาตัวเอง
- [ ] เห็น log ใน terminal ของ API ว่าคำขอมาถึงจริง
- [ ] ยิง Postman แล้วได้ 200 ปกติ (ไม่ติด CORS)
- [ ] อธิบายได้ว่า**ใครเป็นคนบล็อก**

### 💬 คำถามที่ต้องตอบได้

> CORS error มาจากเซิร์ฟเวอร์หรือเบราว์เซอร์ · และทำไม Postman ถึงไม่ติด

---

# CP10 · เปิด CORS + Environment Config

**🏫 35 นาที · We do**

## ① config.js — รวมค่าตั้งค่าไว้ที่เดียว

`api/src/config.js` → **`TODO W07-CFG`**

```js
import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT ?? 3001),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  get isProduction() { return this.nodeEnv === 'production'; },
};
```

### ⚠ `process.env` ได้ string เสมอ

`process.env.PORT` ได้ `"3001"` ไม่ใช่ `3001` — **ต้อง `Number()` เอง** ไม่งั้นบางที่จะทำงานผิดโดยไม่มี error บอก

### ทำไมต้องรวมไว้ไฟล์เดียว

เปิดไฟล์นี้ไฟล์เดียวก็รู้ทันทีว่า**แอปนี้ต้องการค่าอะไรบ้างถึงจะรันได้** · เป็นหลักการเดียวกับ Service Layer — รวมสิ่งที่เปลี่ยนบ่อยไว้ที่เดียว

## ② เปิด CORS

`api/src/app.js` → **`TODO W07-A1`**

```js
import cors from 'cors';

export function createApp() {
  const app = express();

  // ต้องอยู่บนสุด ก่อน middleware และ route ทั้งหมด
  app.use(cors({ origin: config.corsOrigin }));

  app.use(express.json());
  // ... route ทั้งหมดอยู่ข้างล่าง
}
```

### ⚠ กับดัก — วางผิดที่

ถ้าเขียน `app.use(cors())` **ไว้หลัง route** คำขอ preflight (`OPTIONS`) จะไปไม่ถึง เพราะ route ตอบไปก่อนแล้ว · **ต้องอยู่บนสุดเสมอ**

### ⚠ กับดัก — `origin: '*'`

`origin: '*'` แปลว่าอนุญาตทุกเว็บในโลก · ตอนพัฒนาสะดวก แต่ถ้าเผลอติดไปตอนใช้งานจริงจะเปิดช่องให้เว็บใดก็ได้เรียก API เรา · **ใช้ค่าจาก config เสมอ**

## ③ server.js ใช้ config.port

`api/src/server.js` → **`TODO W07-SRV`**

```js
app.listen(config.port, () => {
  console.log(`Campus Service API พร้อมที่ http://localhost:${config.port}`);
  console.log(`อนุญาตให้เรียกจาก: ${config.corsOrigin}`);
});
```

## ทดสอบ

**หนึ่ง — รีเฟรชหน้า Dashboard** · CORS error ควรหายไปแล้ว (ยังไม่แสดงข้อมูลก็ไม่เป็นไร เพราะเรายังไม่ได้แก้ service ให้ครบ)

**สอง — ดู Response Headers ใน DevTools → Network**

```
Access-Control-Allow-Origin: http://localhost:5173
```

**สาม — ทดสอบว่า PORT เปลี่ยนได้จริง**

```bash
# แก้ .env เป็น PORT=3002 แล้วดู terminal
# ต้องเห็น: พร้อมที่ http://localhost:3002
# แล้วแก้กลับเป็น 3001
```

### ✓ ผ่าน CP10 เมื่อ

- [ ] CORS error หายไปจาก Console
- [ ] Network tab เห็น header `Access-Control-Allow-Origin`
- [ ] แก้ `PORT` ใน `.env` แล้วพอร์ตเปลี่ยนตามจริง
- [ ] ไม่มีเลข `3001` ฝังอยู่ใน `server.js` แล้ว

### 💬 คำถามที่ต้องตอบได้

> ทำไม `app.use(cors(...))` ต้องอยู่บนสุด

---

# CP11 · API Client + แก้ Service Layer

**🏫 60 นาที · We do apiClient → You do requestService**
**ช่วงเวลาสำคัญที่สุดของคาบ**

## ① apiClient.js — ที่เดียวที่เรียก fetch (We do)

`frontend/src/services/apiClient.js` → **`TODO W07-F1` และ `W07-F2`**

```js
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

export async function apiFetch(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
  } catch {
    // ① ต่อเซิร์ฟเวอร์ไม่ได้เลย — fetch โยน error
    throw new ApiError('ติดต่อเซิร์ฟเวอร์ไม่ได้ — ตรวจว่าเปิด API ที่พอร์ต 3001 แล้วหรือยัง', 0);
  }

  if (!response.ok) {
    // ② เซิร์ฟเวอร์ตอบ แต่เป็น 4xx/5xx
    throw new ApiError(await parseError(response), response.status);
  }

  if (response.status === 204) return null;   // ③ DELETE สำเร็จ ไม่มี body
  return response.json();                     // ④ ปกติ
}
```

### ⚠ กับดักที่เจอมาแล้วใน Week 05

`fetch` **ไม่โยน error เมื่อได้ 404 หรือ 500** — มันจะ resolve สำเร็จ ต้องเช็ค `response.ok` เอง

`fetch` จะโยน error **เฉพาะตอนต่อเซิร์ฟเวอร์ไม่ได้เลย** เช่น API ไม่ได้เปิด — จึงต้องมี `try/catch` รอบ `fetch` แยกต่างหาก

### ⚠ ตัวแปรต้องขึ้นต้นด้วย `VITE_`

Vite ส่งเฉพาะตัวแปรที่ขึ้นต้นด้วย `VITE_` ไปให้โค้ดฝั่งเบราว์เซอร์ · ตั้งชื่อว่า `API_BASE_URL` เฉย ๆ จะได้ `undefined`

> **ทำไมต้องกันแบบนี้** — เพราะโค้ดฝั่งเบราว์เซอร์ผู้ใช้เปิดดูได้ทั้งหมด · ถ้า Vite ส่งทุกตัวแปรไป รหัสผ่านที่อยู่ใน `.env` จะหลุดไปอยู่ในไฟล์ที่ใครก็โหลดดูได้

## ② requestService.js — เปลี่ยนไปเรียก API (You do)

### กฎเหล็ก — signature ต้องเหมือนเดิมทุกตัว

| ฟังก์ชัน | รับอะไร | **คืนอะไร (ห้ามเปลี่ยน)** |
|---|---|---|
| `getRequests(options)` | optional | array |
| `getRequestById(id)` | string | object หรือ **`null`** |
| `addRequest(input)` | object | object ที่สร้าง |
| `deleteRequest(id)` | string | array ที่เหลือ |

**ถ้าเปลี่ยน signature — component จะพังทันที** และเราจะเสียประโยชน์ทั้งหมดของ Service Layer

### `TODO W07-F3` · getRequests

```js
export async function getRequests(options = {}) {
  if (options.scenario === 'error') throw new ApiError('LAB scenario: จำลองการโหลดไม่สำเร็จ', 500);
  if (options.scenario === 'empty') return [];

  const query = options.status ? `?status=${encodeURIComponent(options.status)}` : '';
  return apiFetch(`/api/requests${query}`);
}
```

### `TODO W07-F4` · getRequestById — จุดที่ต้องคิดเป็นพิเศษ

```js
export async function getRequestById(requestId) {
  try {
    return await apiFetch(`/api/requests/${encodeURIComponent(requestId)}`);
  } catch (error) {
    // 404 ไม่ใช่ความผิดพลาดของระบบ — แปลว่าไม่มีคำร้องรหัสนี้
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;   // error อื่นปล่อยผ่านไปให้หน้าจอจัดการ
  }
}
```

**ทำไมต้องแปลง 404 เป็น `null`** — เพราะ Week 05 ฟังก์ชันนี้คืน `null` เมื่อไม่พบ และ `RequestDetailPage` เขียนไว้ว่า `if (!request) แสดงว่าไม่พบ` · ถ้าปล่อยให้โยน error หน้าจอจะขึ้น "เกิดข้อผิดพลาด" แทน "ไม่พบคำร้อง" — **ซึ่งสื่อสารผิดกับผู้ใช้**

### `TODO W07-F5` · addRequest

```js
export async function addRequest(requestInput) {
  return apiFetch('/api/requests', { method: 'POST', body: JSON.stringify(requestInput) });
}
```

> **ไม่ต้อง validate ฝั่งนี้แล้ว** — API ตรวจให้และคืน 400 พร้อมข้อความบอกว่าผิดตรงไหน

### `TODO W07-F7` · deleteRequest

```js
export async function deleteRequest(requestId) {
  await apiFetch(`/api/requests/${encodeURIComponent(requestId)}`, { method: 'DELETE' });
  return getRequests();   // คืนรายการล่าสุดจากเซิร์ฟเวอร์
}
```

**ทำไมต้องเรียก `getRequests()` ต่อ** — เพื่อให้หน้าจอตรงกับข้อมูลจริงบนเซิร์ฟเวอร์เสมอ ไม่ใช่เดาเอาเองว่าเหลืออะไร · ถ้ามีคนอื่นเพิ่มคำร้องพร้อมกัน เราจะเห็นด้วย

## ทดสอบ — ทีละหน้า

| หน้า | ทำอะไร | ต้องเห็น |
|---|---|---|
| Dashboard | โหลดหน้า | รายการคำร้องจาก **API** (ดู Network tab ยืนยัน) |
| Dashboard | กดลบ | รายการหายไป · Network เห็น `DELETE` แล้วตามด้วย `GET` |
| หน้าสร้างคำร้อง | กรอกครบแล้วส่ง | สร้างสำเร็จ · Network เห็น `OPTIONS` ตามด้วย `POST` |
| หน้าสร้างคำร้อง | กรอกไม่ครบ | ขึ้นข้อความจาก API ที่บอกว่าผิดตรงไหน |
| หน้ารายละเอียด | เปิด `REQ-001` | เห็นข้อมูล |
| หน้ารายละเอียด | แก้ URL เป็น `REQ-999` | ขึ้น **"ไม่พบคำร้อง"** ไม่ใช่หน้า error |

### ⚠ ตรวจยืนยันว่าข้อมูลมาจาก API จริง

ปิด API (Ctrl+C ที่ Terminal 1) แล้วรีเฟรชหน้า Dashboard → **ต้องโหลดไม่ขึ้น** · ถ้ายังขึ้นข้อมูลอยู่แปลว่ายังอ่าน localStorage อยู่

จากนั้นเปิด API กลับมา

### ✓ ผ่าน CP11 เมื่อ

- [ ] Dashboard โหลดข้อมูลจาก API ได้ (ยืนยันด้วย Network tab)
- [ ] เพิ่ม / ลบ คำร้องได้ และข้อมูลอยู่ที่เซิร์ฟเวอร์จริง
- [ ] `REQ-999` ขึ้น "ไม่พบคำร้อง" ไม่ใช่หน้า error
- [ ] **ปิด API แล้วข้อมูลโหลดไม่ขึ้น** (พิสูจน์ว่าไม่ได้อ่าน localStorage)
- [ ] **ไม่ได้แก้ไฟล์ component แม้แต่ไฟล์เดียว**

### 💬 คำถามที่ต้องตอบได้

> เปลี่ยน `requestService.js` ทั้งไฟล์แล้ว ทำไม `DashboardPage.jsx` ไม่ต้องแก้เลย

---

# CP12 · Loading และ Error State

**🏫 30 นาที · You do**

ตอน Week 05 ข้อมูลอยู่ในเครื่อง อ่านเสร็จแทบทันที · ตอนนี้ข้อมูลอยู่คนละโปรแกรม **สิ่งที่อาจผิดพลาดมีมากขึ้น**

## สิ่งที่ต้องทำ

`DashboardPage.jsx` มีโครง loading/error อยู่แล้วจาก Week 05 — งานของ CP นี้คือ**ทำให้ข้อความ error สื่อสารถูกต้องตามสาเหตุ**

```js
catch (error) {
  if (ignore) return;
  setLoadState('error');
  setErrorMessage(error.message);   // ใช้ข้อความจาก ApiError
}
```

เนื่องจาก `apiClient` แปลงข้อความเป็นภาษาไทยให้แล้ว หน้าจอจึงแค่แสดงต่อ

## ทดสอบทั้ง 4 สถานะ

| ทดสอบอย่างไร | ต้องเห็น |
|---|---|
| โหลดปกติ | เห็น loading แวบหนึ่ง แล้วขึ้นรายการ |
| **ปิด API แล้วรีเฟรช** | **"ติดต่อเซิร์ฟเวอร์ไม่ได้ — ตรวจว่าเปิด API แล้วหรือยัง"** |
| ลบคำร้องจนหมด | "ยังไม่มีคำร้อง" + ปุ่มสร้างใหม่ |
| กด "ลองใหม่" หลังเปิด API กลับมา | โหลดสำเร็จ |

### ⚠ อย่าแสดงข้อความเทคนิคให้ผู้ใช้

`TypeError: Failed to fetch` ไม่มีความหมายกับผู้ใช้ทั่วไป · **แปลเป็นภาษาคนที่บอกว่าควรทำอะไรต่อ** — นี่คือเหตุผลที่เราใส่ข้อความไทยไว้ใน `apiClient`

### ✓ ผ่าน CP12 เมื่อ

- [ ] ปิด API แล้วหน้าจอขึ้นข้อความที่ผู้ใช้เข้าใจ ไม่ใช่หน้าขาวหรือข้อความ error ดิบ
- [ ] มีปุ่มให้ลองใหม่ และกดแล้วทำงานจริง
- [ ] ทดสอบครบทั้ง 4 สถานะ

### 💬 คำถามที่ต้องตอบได้

> `fetch` โยน error ตอนไหน และไม่โยนตอนไหน

---

# ตรวจงานตอนจบคาบ

```bash
# รันจาก root ของ week-07 (โฟลเดอร์ที่มีทั้ง api/ และ frontend/)
node check-week07.mjs --inclass
```

**ต้องได้ `🏫 ในห้อง (CP09–CP12) ผ่าน 25/25 รายการ`**

## ถ้ายังไม่ครบ

```bash
node check-week07.mjs --inclass | grep TODO
```

## ตารางไล่ปัญหาที่พบบ่อย

| อาการ | สาเหตุที่พบบ่อยที่สุด |
|---|---|
| ยังขึ้น CORS error | `app.use(cors())` อยู่หลัง route หรือลืม restart API |
| `BASE_URL` เป็น `undefined` | ตัวแปรไม่ขึ้นต้นด้วย `VITE_` หรือลืมสร้าง `.env.local` |
| แก้ `.env` แล้วไม่มีผล | Vite ต้อง restart เมื่อแก้ `.env` (ต่างจากแก้โค้ด) |
| Dashboard ว่างเปล่า ไม่มี error | API ไม่ได้เปิด · ดู Terminal 1 |
| `REQ-999` ขึ้น "เกิดข้อผิดพลาด" | ลืมแปลง 404 เป็น `null` ใน `getRequestById` |
| ลบแล้วรายการไม่อัปเดต | `deleteRequest` ไม่ได้เรียก `getRequests()` ต่อ |
| POST ขึ้น CORS error แต่ GET ปกติ | preflight ไม่ผ่าน — ดู `OPTIONS` ใน Network tab |

---

## เช็คลิสต์ก่อนออกจากห้อง

- [ ] `node check-week07.mjs --inclass` ผ่าน **25/25**
- [ ] เปิดสองหน้าต่างแล้วแอปทำงานได้ครบ — ดู เพิ่ม ลบ
- [ ] ปิด API แล้วขึ้นข้อความที่ผู้ใช้เข้าใจ
- [ ] **ยืนยันว่าไม่ได้แก้ component เลยสักไฟล์**
- [ ] `git add -A && git commit -m "LAB07 in-class: เชื่อม React กับ API"` แล้ว
- [ ] รู้ว่าต้องทำอะไรต่อที่บ้าน (เปิดคู่มือ Take-Home)

---

## 4 คำถามที่ต้องตอบได้ทั้งหมด

1. CORS error มาจากเซิร์ฟเวอร์หรือเบราว์เซอร์ · ทำไม Postman ไม่ติด
2. ทำไม `app.use(cors(...))` ต้องอยู่บนสุด
3. เปลี่ยน `requestService.js` ทั้งไฟล์แล้ว ทำไม component ไม่ต้องแก้เลย
4. `fetch` โยน error ตอนไหน และไม่โยนตอนไหน

---

## ภาคผนวก · คำสั่งที่ใช้บ่อย

```bash
# Terminal 1 — API
cd api && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev

# ตรวจงาน (จาก root ของ week-07)
node check-week07.mjs --inclass
node check-week07.mjs --inclass | grep TODO

# ทดสอบ API ด้วย test (ฝั่ง api/)
npm test
```

## ภาคผนวก · ศัพท์ของสัปดาห์นี้

| คำ | หมายถึง |
|---|---|
| origin | protocol + host + port · ต่างแม้แต่ส่วนเดียวถือว่าคนละที่ |
| Same-Origin Policy | กฎของเบราว์เซอร์ที่ห้ามอ่านข้อมูลข้าม origin |
| CORS | กลไกให้เซิร์ฟเวอร์บอกว่าอนุญาต origin ไหนบ้าง |
| preflight | คำขอ `OPTIONS` ที่เบราว์เซอร์ส่งไปถามก่อนสำหรับ POST/PUT/DELETE |
| environment variable | ค่าที่อยู่นอกโค้ด เปลี่ยนได้ตามเครื่องที่รัน |
| API client | ชั้นที่เป็นที่เดียวในโปรเจกต์ที่เรียก `fetch()` |
