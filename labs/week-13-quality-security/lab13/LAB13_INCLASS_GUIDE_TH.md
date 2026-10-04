# ENGSE203 LAB 13 — คู่มือ In-Class

**🏫 ทำในห้อง · ช่วงบ่าย · CP48 → CP52 · ความปลอดภัยพื้นฐานและความพร้อมก่อนใช้งาน**
**หน่วยที่ 5 · สัปดาห์ที่ 13 · CLO6 · ประมาณ 3 ชั่วโมง (ต่อจาก LAB 12 ช่วงเช้า)**

---

## 🖥️ หน้าจอ Live-Coding (ฉายประกอบการสอน)

| Checkpoint | เนื้อหา | เปิด |
|---|---|---|
| CP48 | validation เข้มขึ้น + จำกัดขนาด body | [เปิด](https://se-rmutl.github.io/engse203/week13/guides/ENGSE203_Week13_CP48_LiveCoding.html) |
| CP49 | เก็บรหัสผ่านด้วย scrypt (ทำให้ test ที่ให้มาผ่าน) | [เปิด](https://se-rmutl.github.io/engse203/week13/guides/ENGSE203_Week13_CP49_LiveCoding.html) |
| CP50 | `POST /api/auth/login` ออก JWT | [เปิด](https://se-rmutl.github.io/engse203/week13/guides/ENGSE203_Week13_CP50_LiveCoding.html) |
| CP51 | `authenticate` + `requireRole` · 401 vs 403 | [เปิด](https://se-rmutl.github.io/engse203/week13/guides/ENGSE203_Week13_CP51_LiveCoding.html) |
| CP52 | secret · fail fast · production ไม่ส่ง stack | [เปิด](https://se-rmutl.github.io/engse203/week13/guides/ENGSE203_Week13_CP52_LiveCoding.html) |

สไลด์ · [เอกสารประกอบการสอน Week 13](https://se-rmutl.github.io/engse203/week13/week13-teaching-doc.html) (บทที่ 1 และ 3 อ่านระหว่างพักกลางวันได้)

---

## อ่านก่อนเริ่ม

ระบบที่แก้ bug เมื่อเช้า**ใครก็เปลี่ยนสถานะหรือลบคำร้องได้** แค่รู้ URL — เปิด terminal แล้วยิง `curl -X DELETE` ก็ลบงานของคนอื่นได้ทันที

บ่ายนี้เราจะทำให้ระบบตอบคำถาม 2 ข้อได้

| คำถาม | ถ้าตอบไม่ได้ |
|---|---|
| **คุณคือใคร** (authentication) | **401** — ไม่มี token · token ปลอม · token หมดอายุ |
| **คุณทำสิ่งนี้ได้ไหม** (authorization) | **403** — รู้ว่าเป็นใคร แต่ไม่มีสิทธิ์ |

### กติกาของระบบหลังจบบ่ายนี้

| ทำอะไร | ใครทำได้ |
|---|---|
| `GET` ดูคำร้อง · `POST` ส่งคำร้อง | ทุกคน (ไม่ต้องเข้าสู่ระบบ) |
| `PUT` เปลี่ยนสถานะ · `DELETE` ลบ | **เจ้าหน้าที่เท่านั้น** — ต้องแนบ token |

> **ประโยคแกนกลางของบ่ายนี้**
> **"ทุกอย่างที่มาจากนอกระบบ คือข้อมูลที่ยังไม่ได้ตรวจ"** — body · header · token · แม้แต่ค่าที่ frontend ของเราเองส่งมา

### เป้าหมายตอนจบช่วงบ่าย

```bash
node --disable-warning=ExperimentalWarning check-week13.mjs --inclass    # 23/23
```

---

## ⓪ เตรียมโฟลเดอร์ใน Student Repository

starter ของบ่ายนี้ = **เฉลยของเมื่อเช้า** (bug 4 ตัวแก้แล้ว test ครบแล้ว) + โครงของระบบเข้าสู่ระบบ

```bash
# รันที่ root ของ Student Repository
cp -r ../engse203-lab/labs/week-13-quality-security/lab13/starter labs/week-13/source
cd labs/week-13/source

npm install --prefix api             # มี jsonwebtoken เพิ่มมาใน package.json แล้ว
npm install --prefix frontend
npm run db:setup --prefix api        # ตาราง users มีคอลัมน์ role และ password_hash แล้ว
```

> 🪟 **Windows (PowerShell)** — ใช้ `Copy-Item -Recurse ..\engse203-lab\labs\week-13-quality-security\lab13\starter labs\week-13\source`

> ⚠ ถ้าเคยมี `api/data/campus.db` เก่าในโฟลเดอร์นี้ (เช่นคัดลอกทับของ Week 12) ให้ใช้ `npm run db:reset --prefix api` แทน — ไม่งั้นจะเจอ `no such column: role`

### ลองรัน test ก่อนเริ่ม

```bash
npm test --prefix api
# ผ่าน 43 · ไม่ผ่าน 13  ← ตั้งใจ
```

test ที่ไม่ผ่านคือ **เป้าหมายของบ่ายนี้** — เราเขียน test ไว้ก่อน แล้วทำโค้ดให้ผ่าน (test-first)

| ไฟล์ test | ไม่ผ่านเพราะ | ทำให้ผ่านใน |
|---|---|---|
| `tests/unit/password.test.js` (10 ข้อ) | `hashPassword` / `verifyPassword` ยังโยน error | CP49 |
| `tests/integration/auth.api.test.js` (3 ข้อ) | ยังไม่มี login · ยังไม่ป้องกัน PUT | CP50 · CP51 |

> CP48 ไม่มี test ให้ — เขียน test ค่าขอบเอง (เทคนิคเดียวกับเมื่อเช้า)

### โครงสร้างที่เกี่ยวข้อง

```
labs/week-13/source/
├── api/
│   ├── src/
│   │   ├── validators/requestValidator.js   ← CP48 · W13-VALID
│   │   ├── utils/password.js                ← CP49 · W13-HASH
│   │   ├── services/authService.js          ← CP50 · W13-LOGIN
│   │   ├── routes/authRoutes.js             ← ให้มาแล้ว (POST /login)
│   │   ├── middleware/auth.js               ← CP51 · W13-AUTH
│   │   ├── routes/requestRoutes.js          ← CP51 · ผูก middleware ที่ PUT/DELETE
│   │   ├── app.js                           ← CP48 (limit) · CP50 (ผูก /api/auth)
│   │   └── config.js                        ← CP52 · W13-SECRET
│   ├── data/schema.sql                      ← มีบัญชีเจ้าหน้าที่ (เก็บเป็น hash)
│   ├── tests/helpers/auth.js                ← ให้มาแล้ว: STAFF · loginAsStaff · tokenFor
│   └── .env.example                         ← CP52
└── check-week13.mjs
```

> ค้นหา TODO ทั้งหมดได้ด้วย `grep -rn "TODO W13" api/src api/tests` (หรือ Ctrl+Shift+F ใน VS Code)

---

# CP48 · validation เข้มขึ้น + จำกัดขนาด body

**🏫 25 นาที · We do**

## ① ค้นหาช่องโหว่จากกฎเดิม

กฎของ Week 12 ตรวจแค่ "อย่างน้อย" — ไม่มี "ไม่เกิน" และไม่ตรวจชนิดข้อมูล

| ส่งอะไรมา | ผลตอนนี้ |
|---|---|
| ชื่อยาว 100,000 ตัวอักษร | บันทึกลงฐานข้อมูล · หน้าเว็บพัง |
| `"details": 12345678901` (ตัวเลข) | ได้ error ว่า "สั้นเกินไป" — ข้อความชวนงง |
| body ขนาด 5 MB | server ต้องอ่านทั้งก้อนก่อนจะรู้ว่าผิด |

## ② ปรับ `api/src/validators/requestValidator.js` (W13-VALID)

```js
export const MAX_NAME = 100;
export const MAX_LOCATION = 100;
export const MAX_DETAILS = 1000;
```

| ช่อง | กฎใหม่ |
|---|---|
| ชื่อผู้แจ้ง · สถานที่ · รายละเอียด | ต้องเป็น `string` ไม่งั้นบอกว่า "…ต้องเป็นข้อความ" |
| ชื่อผู้แจ้ง | 2 – 100 ตัวอักษร |
| สถานที่ | ต้องมี · ไม่เกิน 100 |
| รายละเอียด | 10 – 1000 ตัวอักษร |

> 💡 กฎ 3 ช่องหน้าตาเหมือนกัน — เขียน helper ตัวเดียว (เช่น `checkText(value, label, { min, max })`) ดีกว่าเขียนซ้ำ 3 รอบ

## ③ เพิ่ม unit test ค่าขอบของค่าสูงสุด

ใช้เทคนิคเดียวกับเมื่อเช้า — **100 ผ่าน · 101 ไม่ผ่าน**

```js
test('ชื่อ 100 ตัวพอดี → ผ่าน', () => {
  expect(validateRequestInput(withField({ requesterName: 'ก'.repeat(100) }))).toEqual([]);
});
test('ชื่อ 101 ตัว → ไม่ผ่าน', () => {
  expect(validateRequestInput(withField({ requesterName: 'ก'.repeat(101) }))).toHaveLength(1);
});
```

## ④ จำกัดขนาด body ใน `api/src/app.js`

```js
app.use(express.json({ limit: '10kb' }));   // เกิน → 413
```

errorHandler แปลข้อความให้แล้ว: `ข้อมูลที่ส่งมามีขนาดใหญ่เกินกำหนด`

> ⚠ **validation ≠ sanitize** — เราปฏิเสธข้อมูลที่ผิดกฎ ไม่ได้ "ล้าง" ข้อความ
> ข้อความที่มี `<script>` ยังบันทึกได้ แต่ React **escape ให้อัตโนมัติ**ตอนแสดงผล → อย่าใช้ `dangerouslySetInnerHTML` กับข้อความจากผู้ใช้

### ✓ ผ่าน CP48 เมื่อ

- [ ] ชื่อ 100 ตัวผ่าน · 101 ตัวถูกปฏิเสธ
- [ ] รายละเอียด 1000 ตัวผ่าน · 1001 ตัวถูกปฏิเสธ · สถานที่ 101 ตัวถูกปฏิเสธ
- [ ] body ใหญ่เกิน 10kb → **413** เป็น JSON

### 💬 คำถามที่ต้องตอบได้

> frontend มี `maxLength` ในช่องกรอกอยู่แล้ว ทำไม API ต้องตรวจซ้ำอีก

---

# CP49 · เก็บรหัสผ่านด้วย scrypt

**🏫 35 นาที · I do → We do · test-first**

## ① ทำไมเก็บรหัสผ่านตรง ๆ ไม่ได้

| วิธีเก็บ | ถ้าฐานข้อมูลหลุด |
|---|---|
| ข้อความตรง ๆ | ได้รหัสผ่านทุกคนทันที (และคนส่วนใหญ่ใช้รหัสเดียวกันหลายเว็บ) |
| `sha256(รหัสผ่าน)` | เร็วเกินไป — เครื่องเดียวเดาได้หลายพันล้านครั้งต่อวินาที |
| **scrypt + salt สุ่ม** | ช้าโดยตั้งใจ · รหัสเดียวกันได้ hash ต่างกัน → ต้องเดาทีละบัญชี |

> scrypt มากับ Node ใน `node:crypto` ไม่ต้องติดตั้งเพิ่ม · ไม่ใช้ bcrypt เพราะเป็น native module ที่ติดตั้งบน Windows แล้วพังบ่อย

## ② อ่าน test ที่ให้มาก่อน (`api/tests/unit/password.test.js`)

test 10 ข้อบอกสเปกครบแล้ว — รูปแบบ `scrypt$<salt>$<hash>` · salt สุ่ม · ถูก/ผิด · hash ผิดรูปแบบต้องคืน `false` · **hash ของบัญชีเจ้าหน้าที่ใน `schema.sql` ต้องตรวจผ่าน**

```bash
npm run test:watch --prefix api -- password     # รันเฉพาะไฟล์นี้ วนซ้ำทุกครั้งที่บันทึก
```

## ③ เขียน `api/src/utils/password.js` (W13-HASH)

```js
export function hashPassword(plain) {
  const salt = randomBytes(16).toString('hex');                     // 32 ตัวอักษร
  const hash = scryptSync(plain, salt, KEY_LENGTH).toString('hex'); // 128 ตัวอักษร
  return `scrypt$${salt}$${hash}`;
}
```

`verifyPassword(plain, stored)` — เขียนเองตาม TODO ในไฟล์

1. แยก `stored` ด้วย `'$'` → ได้ scheme · salt · hash
2. scheme ไม่ใช่ `'scrypt'` หรือขาดส่วนใดส่วนหนึ่ง → `return false`
3. `scryptSync(plain, salt, ความยาวของ hash เดิม)`
4. เทียบด้วย `timingSafeEqual` **ไม่ใช่ `===`**

> ⚠ ใช้ salt ที่เป็น**ข้อความ hex ตรง ๆ** ทั้งตอน hash และตอน verify — ถ้าตอน verify แปลงเป็น `Buffer.from(salt, 'hex')` ผลจะไม่ตรงกับ hash ใน `schema.sql` แล้วจะเข้าสู่ระบบด้วยบัญชีเจ้าหน้าที่ไม่ได้

### ✓ ผ่าน CP49 เมื่อ

- [ ] `password.test.js` ผ่านทั้ง 10 ข้อ
- [ ] hash ไม่มีรหัสผ่านจริงปนอยู่ และรหัสเดียวกัน 2 ครั้งได้ hash ต่างกัน
- [ ] ตรวจ hash ของ `staff@rmutl.ac.th` ใน `schema.sql` ด้วย `staff1234` ได้ `true`

### 💬 คำถามที่ต้องตอบได้

> salt ถูกเก็บไว้ข้าง hash ให้เห็นกันทั้งคู่ — แล้ว salt ยังช่วยอะไรได้

---

# CP50 · `POST /api/auth/login` ออก JWT

**🏫 35 นาที · I do → We do**

## ① JWT คืออะไร (3 ส่วนคั่นด้วยจุด)

```
eyJhbGciOiJIUzI1NiJ9 . eyJzdWIiOiI1Iiwicm9sZSI6InN0YWZmIn0 . k3S0yX...
     header                    payload (อ่านได้ทุกคน)              signature
```

| ส่วน | คืออะไร |
|---|---|
| header | อัลกอริทึมที่ใช้ |
| payload | ข้อมูลผู้ใช้ — **แค่ base64url ไม่ได้เข้ารหัส** ใครก็ถอดอ่านได้ |
| signature | คำนวณจาก header + payload + **secret** → แก้ payload แม้แต่ตัวเดียว signature ก็ไม่ตรง |

> ลองวาง token ใน interactive "JWT decoder" ในสไลด์ — จะเห็นว่า payload อ่านได้ทันที **ห้ามใส่รหัสผ่านหรือข้อมูลลับใน payload**

## ② เขียน `login()` ใน `api/src/services/authService.js` (W13-LOGIN)

```js
export function login(email, password) {
  const user = findUserByEmail(email);
  if (!user || user.role !== 'staff' || !verifyPassword(password, user.passwordHash)) {
    return null;
  }
  const payload = { sub: String(user.id), name: user.name, role: user.role };
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
  return { token, user: { id: user.id, name: user.name, role: user.role } };
}
```

`verifyToken(token)` = `jwt.verify(token, config.jwtSecret)` — ถูกคืน payload · ปลอม/หมดอายุโยน error

## ③ ผูก route ใน `api/src/app.js`

`routes/authRoutes.js` ให้มาแล้ว (ตรวจรูปแบบ → เรียก `login` → ตอบ 200 หรือ 401) — เหลือแค่ import แล้ว

```js
app.use('/api/auth', authRoutes);
```

## ④ ลองยิงจริง

```bash
npm run dev --prefix api
# อีก terminal
curl -X POST localhost:3001/api/auth/login -H "Content-Type: application/json" \
  -d '{"email":"staff@rmutl.ac.th","password":"staff1234"}'
```

> 🔐 อีเมลที่ไม่มีในระบบ กับ รหัสผ่านผิด → ต้องได้ **401 ข้อความเดียวกัน** `อีเมลหรือรหัสผ่านไม่ถูกต้อง`
> ถ้าตอบต่างกัน คนนอกจะลองอีเมลไปเรื่อย ๆ จนรู้ว่าใครมีบัญชีบ้าง

เติม test ที่ TODO ใน `auth.api.test.js` — อีเมลที่ไม่มี → 401 และ `r.body.error` เท่ากับกรณีรหัสผิด

### ✓ ผ่าน CP50 เมื่อ

- [ ] login ถูก → 200 พร้อม token 3 ส่วน
- [ ] payload มี `role: 'staff'` และ `exp` · ไม่มีรหัสผ่าน
- [ ] รหัสผิด กับ อีเมลที่ไม่มี → 401 ข้อความเดียวกัน
- [ ] ผู้แจ้งทั่วไป (ไม่มีรหัสผ่าน) เข้าสู่ระบบไม่ได้

### 💬 คำถามที่ต้องตอบได้

> ถ้าแก้ payload ใน token จาก `"requester"` เป็น `"staff"` แล้วส่งกลับมา server จะรู้ได้อย่างไร

---

# CP51 · `authenticate` + `requireRole` · 401 vs 403

**🏫 35 นาที · We do → You do**

## ① เขียน middleware ใน `api/src/middleware/auth.js` (W13-AUTH)

```js
export function authenticate(req, res, next) {
  const header = req.get('Authorization') ?? '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    res.set('WWW-Authenticate', 'Bearer');
    return res.status(401).json({ error: 'ต้องเข้าสู่ระบบก่อน' });
  }
  try {
    req.user = verifyToken(token);   // แนบข้อมูลผู้ใช้ไว้ให้ชั้นถัดไป
    next();
  } catch {
    return res.status(401).json({ error: 'token ไม่ถูกต้องหรือหมดอายุ กรุณาเข้าสู่ระบบใหม่' });
  }
}
```

`requireRole(role)` — เขียนเอง: `req.user?.role` ไม่ตรง → **403** `ไม่มีสิทธิ์ทำรายการนี้`

## ② ผูกที่ route ใน `api/src/routes/requestRoutes.js`

```js
router.put('/:id', authenticate, requireRole('staff'), controller.updateRequestStatus);
router.delete('/:id', authenticate, requireRole('staff'), controller.deleteRequest);
```

> ลำดับสำคัญ — `authenticate` ต้องมาก่อน เพราะ `requireRole` อ่าน `req.user` ที่ `authenticate` เป็นคนแนบ

## ③ test เดิมพัง 401 — **ตั้งใจ**

```bash
npm test --prefix api
# test PUT/DELETE ใน requests.api.test.js ที่เขียนเมื่อเช้า → expected 200, received 401
```

> นี่ไม่ใช่ bug — **requirement เปลี่ยน test ต้องเปลี่ยนตาม** · test ที่พังบอกเราว่ามีที่ไหนบ้างที่ได้รับผลกระทบ

แก้ด้วย helper ที่ให้มาใน `tests/helpers/auth.js`

```js
import { loginAsStaff } from '../helpers/auth.js';

let auth;
beforeEach(async () => {
  await loadSeed();
  auth = { Authorization: `Bearer ${await loginAsStaff(app)}` };   // loginAsStaff คืน token
});

await request(app).put('/api/requests/REQ-001').set(auth).send({ status: 'completed' });
```

## ④ เติม test สิทธิ์ใน `auth.api.test.js` (TODO W13-AUTH)

| กรณี | ใช้ | คาดหวัง |
|---|---|---|
| token ของคนที่ไม่ใช่เจ้าหน้าที่ | `tokenFor('requester')` | **403** |
| token ปลอม (secret อื่น) | `tokenFor('staff', 'not-the-real-secret')` | **401** |
| เจ้าหน้าที่ | `await loginAsStaff(app)` | PUT **200** · DELETE **204** |
| GET · POST ไม่มี token | — | 200 · 201 (ยังเปิดให้ทุกคน) |

```js
const r = await request(app).put('/api/requests/REQ-001')
  .set('Authorization', `Bearer ${tokenFor('requester')}`)
  .send({ status: 'completed' });
expect(r.status).toBe(403);
```

### ✓ ผ่าน CP51 เมื่อ

- [ ] PUT ไม่มี token → 401 · token ปลอม → 401 · ไม่ใช่เจ้าหน้าที่ → 403
- [ ] เจ้าหน้าที่ PUT → 200 และ DELETE → 204
- [ ] GET และ POST ยังไม่ต้องเข้าสู่ระบบ
- [ ] test ของเมื่อเช้าแก้ให้เข้าสู่ระบบแล้ว · BUG #1 ยังไม่กลับมา (ลบแล้วเพิ่มใหม่ → 201)

### 💬 คำถามที่ต้องตอบได้

> token หมดอายุ ควรได้ 401 หรือ 403 — เพราะอะไร

---

# CP52 · secret · fail fast · production ไม่ส่ง stack

**🏫 20 นาที · I do → You do**

## ① ค่า secret ตอนนี้อันตรายตรงไหน

```js
jwtSecret: process.env.JWT_SECRET || 'dev-only-secret-do-not-use-in-production',
```

ถ้าลืมตั้ง `JWT_SECRET` บน Render ระบบจะใช้ค่านี้ — **ซึ่งอยู่ใน GitHub ให้ทุกคนอ่าน** → ใครก็สร้าง token ของเจ้าหน้าที่ได้เอง

## ② แก้ `api/src/config.js` ให้ fail fast (W13-SECRET)

| สภาพแวดล้อม | มี `JWT_SECRET` | ไม่มี |
|---|---|---|
| development / test | ใช้ค่าที่ตั้ง | ใช้ค่าสำหรับพัฒนาได้ |
| **production** | ใช้ค่าที่ตั้ง | **`throw new Error(...)` ทันที** — ไม่ยอม start |

> ระบบที่ไม่ยอม start = เห็นปัญหาทันทีตอน deploy · ระบบที่ start ด้วย secret ที่ทุกคนรู้ = ไม่มีใครรู้ว่ามีปัญหาจนกว่าจะโดน

ลองดูว่าทำงานจริง

```bash
NODE_ENV=production node --disable-warning=ExperimentalWarning api/src/server.js
# ต้องเห็น error ที่มีคำว่า JWT_SECRET แล้วโปรแกรมหยุด
```

> 🪟 PowerShell — `$env:NODE_ENV="production"; node api/src/server.js` แล้ว `Remove-Item Env:NODE_ENV` เมื่อเสร็จ

## ③ เพิ่ม `JWT_SECRET=` ใน `api/.env.example` (เว้นค่าว่าง)

```bash
# สร้างค่าสุ่มสำหรับใส่ใน .env ของเครื่องตัวเอง (ห้าม commit)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

| ไฟล์ | commit ไหม | มีอะไร |
|---|---|---|
| `api/.env.example` | ✅ | ชื่อตัวแปรครบ · **ค่าว่าง** |
| `api/.env` | ❌ (อยู่ใน `.gitignore`) | ค่าจริงของเครื่องตัวเอง |
| Render → Environment | — | ค่าจริงของ production (`render.yaml` ใช้ `generateValue: true` ให้ Render สุ่มให้) |

## ④ production ไม่ส่ง stack trace

ส่ง JSON พัง ๆ ตอน production → ผู้ใช้ต้องเห็นแค่ข้อความ ไม่เห็นชื่อไฟล์และบรรทัดของ server (checker ตรวจข้อนี้ให้)

## ⑤ ตรวจก่อน push ทุกครั้ง

```bash
git status            # มี .env หลุดเข้ามาไหม
git diff --cached     # อ่านสิ่งที่จะ commit จริง ๆ
```

> ⚠ ถ้า commit secret ขึ้น GitHub ไปแล้ว **ลบไฟล์ทิ้งไม่พอ** (ยังอยู่ในประวัติ git) — ต้อง**เปลี่ยน secret ใหม่**ทันที

### ✓ ผ่าน CP52 เมื่อ

- [ ] production ไม่ตั้ง `JWT_SECRET` → ระบบไม่ยอม start
- [ ] production: error ไม่ส่ง stack ให้ผู้ใช้
- [ ] `.env.example` มี `JWT_SECRET=` ค่าว่าง และ `.gitignore` มี `.env`
- [ ] `npm test --prefix api` ผ่านทุกข้อ และมี test ของทั้ง 401 และ 403

### 💬 คำถามที่ต้องตอบได้

> ทำไมไม่ตั้ง `JWT_SECRET` ค่ายาว ๆ ไว้ใน `config.js` ไปเลย จะได้ไม่ต้องตั้งบน Render

---

# ตรวจงานและส่ง (ก่อนเลิกคาบ)

```bash
node --disable-warning=ExperimentalWarning check-week13.mjs --inclass   # 23/23
node --disable-warning=ExperimentalWarning check-week13.mjs             # 27/27 ถ้าทำ Challenge
node --disable-warning=ExperimentalWarning check-week12.mjs --inclass   # ยังต้องได้ 20/20 (ขอ token เองแล้ว)
```

> checker สัปดาห์ 7 และ 10 ใช้กับโฟลเดอร์นี้ไม่ได้แล้ว เพราะ PUT/DELETE ต้องเข้าสู่ระบบ — requirement เปลี่ยน เป็นเรื่องปกติ

```bash
git switch -c unit5/week-13
git status                       # ไม่มี .env
git add -A
git commit -m "LAB13: validation, scrypt, JWT login, 401/403, fail-fast secret"
git push -u origin unit5/week-13
git tag lab-13-submission-v1 && git push origin lab-13-submission-v1
```

## ⭐ Challenge (ถ้าเหลือเวลา)

| ข้อ | ทำอะไร |
|---|---|
| security headers | ทุก response มี `X-Content-Type-Options: nosniff` · `X-Frame-Options: DENY` · `Referrer-Policy: no-referrer` |
| จำกัดการเดารหัสผ่าน | login ผิด 5 ครั้งใน 15 นาที → **429** |
| frontend แนบ token | `frontend/src/services/apiClient.js` ส่ง `Authorization: Bearer …` |
| Render สุ่ม secret | `render.yaml` มี `JWT_SECRET` แบบ `generateValue: true` |

> เพิ่มบัญชีเจ้าหน้าที่ใหม่: `npm run create-staff --prefix api -- <อีเมล> <รหัสผ่าน> [ชื่อ]`

---

## ตารางไล่ปัญหาที่พบบ่อย

| อาการ | สาเหตุ / วิธีแก้ |
|---|---|
| `no such column: role` | `campus.db` เป็นของเก่า → `npm run db:reset --prefix api` |
| `Cannot find package 'jsonwebtoken'` | ยังไม่ได้ `npm install --prefix api` หลังคัดลอก starter |
| test "ตรวจ hash ใน schema.sql" ไม่ผ่าน แต่ข้ออื่นผ่าน | ตอน verify แปลง salt เป็น Buffer · หรือใช้ความยาว key ไม่ใช่ 64 |
| login ถูกแต่ได้ 401 | `verifyPassword` คืน false · หรือ `findUserByEmail` ได้ user ที่ role ไม่ใช่ staff |
| `secretOrPrivateKey must have a value` | `.env` มี `JWT_SECRET=` ค่าว่าง และ config ใช้ `??` (ค่าว่างผ่าน `??` ไปได้) → ตรวจด้วย `if (secret)` หรือ `\|\|` แทน |
| ส่ง token แล้วยังได้ 401 | header ต้องเป็น `Authorization: Bearer <token>` (มีเว้นวรรค 1 ช่อง) · token หมดอายุ (2 ชั่วโมง) |
| test PUT/DELETE เดิมพัง 401 | ตั้งใจ — แก้ test ให้ `.set(auth)` จาก `loginAsStaff(app)` |
| ทุกคำขอได้ 401 แม้แต่ GET | ใส่ `authenticate` ด้วย `router.use(...)` ทั้ง router → ใส่เฉพาะ PUT และ DELETE |
| เจ้าหน้าที่ login ถูกแล้วยังได้ 403 | สลับลำดับ — `requireRole` อยู่ก่อน `authenticate` จึงยังไม่มี `req.user` |
| production start ได้ทั้งที่ไม่ตั้ง secret | ตรวจ `NODE_ENV` สะกด `production` · ตรวจว่า throw อยู่นอก if ของ dev |

---

## Release Checklist (แนะนำท้ายคาบ — ทำจริงใน Term Project)

ก่อนบอกใครว่า "ระบบพร้อมใช้" ต้องตอบ "ใช่" ได้ทุกข้อ

- [ ] `npm test` ผ่านทั้งหมด (api + frontend)
- [ ] `npm run build` ได้ไม่มี error
- [ ] ไม่มี secret ใน git (`git ls-files | grep .env` เจอแค่ `.env.example`)
- [ ] `.env.example` มีตัวแปรครบ ค่าว่าง
- [ ] README บอกวิธีติดตั้ง · วิธีรัน · วิธี deploy · บัญชีทดสอบ
- [ ] `/api/health` ผ่านบน URL จริง
- [ ] `npm audit` ไม่มีระดับ high / critical (หรืออธิบายได้ว่าทำไม)
- [ ] tag เวอร์ชัน `v1.0.0`

---

## ต่อจากนี้ — Final Term Project

สิ่งที่บ่ายนี้ทำแค่ฝั่ง API จะต่อในโปรเจกต์กลุ่ม (ไม่มีงาน take-home แยก)

| ฝั่ง | ต้องทำในโปรเจกต์ |
|---|---|
| Front-end | หน้า login · เก็บ token · `apiClient` แนบ `Authorization` · ซ่อนปุ่มที่ไม่มีสิทธิ์ · test ฝั่ง frontend |
| Back-end | validation · auth 401/403 · unit + integration test · `DEBUG_LOG.md` |
| DevOps | `.env.example` · secret บน cloud · CI รัน test · `RELEASE_CHECKLIST.md` · tag `v1.0.0` · deploy |

> แนวทางฝั่ง React (เก็บ token ที่ไหน · แนบ header ที่ `apiClient` ที่เดียว · ล้าง token เมื่อได้ 401) อยู่ในเอกสารประกอบการสอนบทที่ 8 และสไลด์ 36–37
