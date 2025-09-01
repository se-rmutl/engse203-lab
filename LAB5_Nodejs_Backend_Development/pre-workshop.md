# Pre-Workshop: Node.js & Express.js Fundamentals

**ENGSE203: เตรียมความพร้อมสู่การเป็น Full-Stack Developer (งานเดี่ยว)**

นี่คือเอกสาร Pre-Workshop สำหรับ **สัปดาห์ที่ 7: Backend Development with Node.js**. เอกสารนี้ได้รวมทุกรายละเอียด, คำอธิบาย, การทดลองย่อย, และแนวทางแก้ปัญหาที่จำเป็น เพื่อให้ทุกคนไม่เพียงแต่ทำตามได้ แต่เข้าใจหลักการทำงานเบื้องหลังอย่างแท้จริง และพร้อมสำหรับ Workshop หลักของเราครับ

## 📌 The Big Picture: Backend สำคัญอย่างไร?

ก่อนจะเริ่มเขียนโค้ด, มาทำความเข้าใจภาพรวมกันก่อนครับว่าสิ่งที่เรากำลังจะทำในสัปดาห์นี้ อยู่ในส่วนไหนของการพัฒนาซอฟต์แวร์

  * **สัปดาห์ที่ 5-6 (Frontend):** เราได้สร้าง "หน้าร้าน" หรือ User Interface (UI) ด้วย **React.js**. เปรียบเสมือนส่วนที่ผู้ใช้มองเห็นและโต้ตอบด้วย แต่ตอนนี้มันยังไม่มีข้อมูลจริง
  * **สัปดาห์ที่ 7 (Backend - สัปดาห์นี้):** เรากำลังจะสร้าง **"หลังร้าน" (Backend)** ด้วย **Node.js และ Express.js**.  ส่วนนี้คือ "สมอง" ของระบบ ที่จะคอยจัดการ Logic, ประมวลผลข้อมูล, และเป็นตัวกลางเชื่อมต่อไปยังฐานข้อมูล 
  * **สัปดาห์ที่ 9 (Database):** เราจะนำ **"โกดังเก็บข้อมูล" (Database)** อย่าง  **MSSQL** , **MongoDB** มาเชื่อมต่อกับหลังร้านของเรา เพื่อให้ข้อมูลถูกจัดเก็บอย่างถาวร 

สิ่งที่เราทำใน Pre-Workshop นี้ คือการวางรากฐานที่แข็งแรงให้กับ "สมอง" ของแอปพลิเคชันของเราครับ

-----

## 🛠️ Step 1: Environment Setup (20 นาที) - ตรวจความพร้อม\!

ส่วนนี้สำคัญมาก ขอให้ทุกคนตรวจสอบว่าเครื่องมือของเราพร้อมใช้งาน

### 1.1 ตรวจสอบ Node.js และ npm

Node.js คือสภาพแวดล้อมที่ทำให้เรารัน JavaScript นอกเบราว์เซอร์ได้ ส่วน npm คือผู้จัดการแพ็กเกจ (เหมือน App Store ของนักพัฒนา) 

```bash
# ตรวจสอบเวอร์ชัน Node.js
node --version
# ควรได้ผลลัพธ์เป็น v20.x.x หรือสูงกว่า

# ตรวจสอบเวอร์ชัน npm
npm --version
# ควรได้ผลลัพธ์เป็น 8.x.x หรือสูงกว่า
```

**ถ้ายังไม่มี:** ให้ไปที่ [https://nodejs.org/](https://nodejs.org/) แล้วดาวน์โหลดเวอร์ชัน **LTS (Long Term Support)** มาติดตั้งนะครับ

### 1.2 ติดตั้งเครื่องมือทดสอบ API

เราต้องมีเครื่องมือสำหรับยิง request ไปทดสอบ API ที่เราสร้างขึ้น เลือกใช้ตัวไหนก็ได้ที่ถนัดครับ 

  * **Postman:** โปรแกรมแยกยอดนิยม ฟีเจอร์ครบครัน

    1.  ไปที่ [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
    2.  ดาวน์โหลดและติดตั้งให้เรียบร้อย

  * **Thunder Client:** ส่วนขยาย (Extension) บน VS Code สะดวกมาก ไม่ต้องสลับโปรแกรม

    1.  เปิด VS Code
    2.  ไปที่แท็บ Extensions (ไอคอนรูปสี่เหลี่ยม)
    3.  ค้นหา "Thunder Client" แล้วกด Install


### 1.3 สร้าง git repository:

* สร้าง git repository: `engse203-backend`

* clone repository ลงมาทำงานที่ local

-----

## 🚀 Step 2: สร้างโปรเจกต์แรก (20 นาที) - Hello, Express\!

### 2.1 สร้าง Directory และ Initialize Project

```bash
# เข้าไปที่โฟลเดอร์หลักสำหรับโปรเจกต์
cd engse203-backend

# สร้างไฟล์ package.json เพื่อจัดการโปรเจกต์
npm init -y
```

**`npm init -y`** จะสร้างไฟล์ `package.json` ซึ่งเปรียบเสมือนบัตรประชาชนของโปรเจกต์เรา ที่จะเก็บข้อมูลสำคัญและรายชื่อ dependencies ทั้งหมดครับ


**สร้าง .gitignore:**
```gitignore
# Dependencies
node_modules/
npm-debug.log*

# Environment variables
.env
.env.local

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

### 2.2 ติดตั้ง Express.js

Express.js คือ Web Framework ที่จะช่วยให้เราสร้าง Server และ API ได้ง่ายและรวดเร็วขึ้นมาก 

```bash
# ติดตั้ง Express.js
npm install express
```

หลังจากรันคำสั่งนี้ สังเกตว่าจะมีโฟลเดอร์ `node_modules` และไฟล์ `package-lock.json` เพิ่มขึ้นมา และใน `package.json` จะมี `express` อยู่ใน `dependencies` ครับ

### 2.3 สร้าง Server แรกของเรา

สร้างไฟล์ชื่อ `server.js` แล้วใส่โค้ดนี้ลงไป:

```javascript
// server.js - My First Express Server
const express = require('express');
const app = express();
const PORT = 3000;

// สร้าง Route (เส้นทาง) แรกสำหรับหน้าหลัก
app.get('/', (req, res) => {
  res.send('<h1>Hello from ENGSE203 Express Server!</h1>');
});

// เริ่มต้นให้ Server รอรับการเชื่อมต่อ
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
```

**รัน Server:**

```bash
node server.js
```

ตอนนี้เปิดเบราว์เซอร์แล้วเข้าไปที่ `http://localhost:3000` จะเห็นข้อความที่เราเขียนไว้\! 🎉

-----

## ⚙️ Step 3: ปรับปรุง Workflow การพัฒนาด้วย `nodemon` (10 นาที)

ทุกครั้งที่เราแก้โค้ด เราต้องหยุด (Ctrl+C) แล้วเริ่มเซิร์ฟเวอร์ใหม่ ซึ่งเสียเวลามาก `nodemon` คือเครื่องมือที่จะช่วยแก้ปัญหานี้ครับ

  * **What is it?**: `nodemon` คือเครื่องมือที่จะคอยสอดส่องไฟล์ในโปรเจกต์ของเรา และเมื่อมีการเปลี่ยนแปลง (เช่น กดเซฟ) มันจะทำการรีสตาร์ทเซิร์ฟเวอร์ให้เราโดยอัตโนมัติ
  * **Why?**: เพื่อประหยัดเวลาและทำให้ขั้นตอนการพัฒนาลื่นไหล ไม่ต้องคอยสลับไปมาระหว่าง Code Editor กับ Terminal
  * **Mini-Experiment**:
    1.  **ติดตั้ง:**
        ```bash
        # --save-dev หมายถึง ติดตั้งเป็น dependency สำหรับตอนพัฒนาเท่านั้น
        # จะไม่ถูกติดตั้งไปด้วยตอนนำแอปขึ้น Production
        npm install --save-dev nodemon
        ```
    2.  **ตั้งค่า `npm scripts`:** เปิดไฟล์ `package.json` แล้วแก้ไขส่วน `"scripts"`:
        ```json
        // package.json
        "scripts": {
          "start": "node server.js",
          "dev": "nodemon server.js",
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        ```
    3.  **ทดสอบ:**
          * รันเซิร์ฟเวอร์ด้วยคำสั่งใหม่: `npm run dev`
          * ตอนนี้ลองกลับไปแก้ข้อความใน `server.js` จากนั้นกดเซฟ
          * สังเกตที่ Terminal จะเห็นว่า `nodemon` ทำการรีสตาร์ทเซิร์ฟเวอร์ให้เอง\!

-----

## 🧠 Step 4: ทำความเข้าใจหัวใจของ Express: Middleware (10 นาที)

ก่อนจะไปดูไลบรารี่อื่นๆ เราต้องเข้าใจคอนเซปต์ที่สำคัญที่สุดของ Express ก่อน นั่นคือ **Middleware** 

  * **What is it?**: Middleware คือ **ฟังก์ชัน** ที่จะทำงาน **"คั่นกลาง"** ระหว่างตอนที่เซิร์ฟเวอร์ได้รับ Request เข้ามา และก่อนที่จะส่ง Response กลับไปหา Client

  * **Analogy (อุปมาอุปไมย):** ลองจินตนาการว่า Request ของเราคือ "พัสดุ" ที่เดินทางมาถึง "ศูนย์กระจายสินค้า" (Express App) ของเรา ก่อนที่พัสดุจะถูกส่งไปที่แผนกปลายทาง (Route Handler) มันต้องผ่านจุดตรวจหลายด่าน:

    1.  **ด่าน Security (`helmet`):** ตรวจสอบว่าพัสดุไม่มีอะไรอันตรายแอบแฝง
    2.  **ด่านศุลกากร (`cors`):** ตรวจสอบว่าพัสดุมาจากแหล่งที่ได้รับอนุญาตหรือไม่
    3.  **ด่าน X-ray (`express.json()`):** สแกนและแกะกล่องพัสดุ (ถ้าเป็น JSON) เพื่อให้แผนกอื่นทำงานต่อได้
    4.  **ด่านลงบันทึก (`logger`):** บันทึกเวลาและรายละเอียดของพัสดุที่ผ่านเข้ามา

    ฟังก์ชันในแต่ละด่านนี่แหละครับคือ Middleware\! โดยทุก Middleware จะมี `next()` เพื่อบอกว่า "ตรวจเสร็จแล้ว ไปด่านต่อไปได้"

-----

## 🔬 Step 5: ทดลองใช้ Libraries สำคัญ (40 นาที)

ใน Workshop เราจะใช้ Libraries หลายตัว มาทำความรู้จักและทดลองใช้ทีละตัวกันครับ

### 5.1 `dotenv` - จัดการข้อมูลลับ

  * **What is it?**: `dotenv` คือเครื่องมือที่ช่วยโหลด "Environment Variables" (ค่าตัวแปรของระบบ) จากไฟล์ `.env` เข้าสู่ `process.env` ใน Node.js
  * **Why?**: เพื่อแยกข้อมูลที่เป็นความลับ (เช่น รหัสผ่าน, API Keys) ออกจาก Source Code ไม่ควร Hardcode ของพวกนี้ลงในโค้ดโดยตรง\!
  * **Mini-Experiment**:
    1.  **ติดตั้ง:** `npm install dotenv`
    2.  **สร้างไฟล์** ชื่อ `.env` (ต้องมีจุดนำหน้า) ในโฟลเดอร์โปรเจกต์ แล้วใส่ข้อมูลนี้:
        ```env
        PORT=3001
        APP_NAME="ENGSE203 Super App"
        ```
    3.  **อัปเดต `server.js`** เพื่อให้รู้จัก `.env`:
        ```javascript
        // server.js
        const express = require('express');
        require('dotenv').config(); // << เพิ่มบรรทัดนี้ที่ด้านบน

        const app = express();
        const PORT = process.env.PORT || 3000; // << อ่านค่า PORT จาก .env
        const APP_NAME = process.env.APP_NAME;

        app.get('/', (req, res) => {
          res.send(`<h1>Hello from ${APP_NAME}!</h1>`);
        });

        app.listen(PORT, () => {
          console.log(`🚀 ${APP_NAME} is running on http://localhost:${PORT}`);
        });
        ```
    4.  **ทดสอบ:** หยุด Server เดิม (Ctrl+C) แล้วรันใหม่ด้วย `npm run dev` สังเกตว่าตอนนี้ Server จะรันที่ Port `3001` และ Log ที่แสดงผลก็เปลี่ยนไปตามค่าในไฟล์ `.env`

### 5.2 `cors` - เปิดประตูให้ Frontend

  * **What is it?**: `cors` เป็น Middleware ที่ช่วยจัดการเรื่อง **C**ross-**O**rigin **R**esource **S**haring [
  * **Why?**: โดยปกติแล้ว เบราว์เซอร์มีนโยบายความปลอดภัย (Same-Origin Policy) ที่จะไม่อนุญาตให้เว็บจากโดเมนหนึ่ง (เช่น `localhost:5173` ของ React) เรียก API ที่อยู่อีกโดเมนหนึ่ง (เช่น `localhost:3001` ของเรา) `cors` จะช่วยบอกเบราว์เซอร์ว่า "เซิร์ฟเวอร์ของเราอนุญาตนะ" 
  * **Mini-Experiment**:
    1.  **ติดตั้ง:** `npm install cors`
    2.  **อัปเดต `server.js`** เพื่อใช้งาน `cors`:
        ```javascript
        //... (ส่วนบนเหมือนเดิม)
        const cors = require('cors'); // << Import cors

        const app = express();
        require('dotenv').config();

        app.use(cors()); // << เพิ่มบรรทัดนี้: ใช้ cors กับทุก request
        //... (ส่วนที่เหลือ)

        // เพิ่ม Route ใหม่สำหรับทดสอบ
        app.get('/api/data', (req, res) => {
            res.json({ message: 'This data is open for everyone!' });
        });
        ```
    3.  **ทดสอบ:** สร้างไฟล์ `test.html` ขึ้นมาง่ายๆ แล้วเปิดด้วยเบราว์เซอร์ ลอง fetch ข้อมูลจาก Server ของเรา
        ```html
        <script>
            fetch('http://localhost:3001/api/data')
                .then(res => res.json())
                .then(data => console.log('Data from server:', data))
                .catch(err => console.error('Error:', err));
        </script>
        ```
        เปิด Console ในเบราว์เซอร์ จะเห็นว่าเราสามารถรับข้อมูล `{ message: '...' }` มาได้ **ถ้าลอง Comment `app.use(cors());` ออกแล้วรันใหม่ จะเจอ Error เกี่ยวกับ CORS ทันที\!**

### 5.3 `helmet` - เพิ่มเกราะป้องกัน

  * **What is it?**: `helmet` เป็น Middleware ที่ช่วยตั้งค่า HTTP Headers ต่างๆ เพื่อเพิ่มความปลอดภัยให้กับแอปพลิเคชันของเราโดยอัตโนมัติ
  * **Why?**: เพื่อป้องกันช่องโหว่พื้นฐานทางเว็บที่รู้จักกันดี (เช่น XSS, clickjacking) โดยที่เราไม่ต้องไปตั้งค่าเองทั้งหมด
  * **Mini-Experiment**:
    1.  **ติดตั้ง:** `npm install helmet`
    2.  **อัปเดต `server.js`** เพื่อใช้งาน `helmet`:
        ```javascript
        //... (ส่วนบนเหมือนเดิม)
        const helmet = require('helmet'); // << Import helmet

        //...
        app.use(helmet()); // << เพิ่มบรรทัดนี้: ใส่เกราะป้องกัน!
        app.use(cors());
        //...
        ```
    3.  **ทดสอบ:** รัน Server แล้วเปิด `http://localhost:3001` ในเบราว์เซอร์ จากนั้นเปิด **Developer Tools** (กด F12) ไปที่แท็บ **Network** รีเฟรชหน้าเว็บ แล้วคลิกที่ request `localhost` ที่เห็น **ลองดูในส่วน Response Headers จะเห็น Headers แปลกๆ ที่ `helmet` เพิ่มเข้ามาให้** เช่น `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`

### 5.4 `joi` - ยามเฝ้าประตูข้อมูล

  * **What is it?**: `joi` เป็น Library สำหรับตรวจสอบและยืนยันความถูกต้องของข้อมูล (Data Validation) ที่ทรงพลังและใช้ง่าย
  * **Why?**: เพื่อให้แน่ใจว่าข้อมูลที่ส่งเข้ามาที่ API ของเรา (เช่น จากฟอร์ม) มีรูปแบบและคุณสมบัติครบถ้วนถูกต้อง ก่อนที่จะนำไปประมวลผลต่อ
  * **Mini-Experiment**:
    1.  **ติดตั้ง:** `npm install joi`
    2.  **อัปเดต `server.js`** เพื่อสร้าง Route ใหม่สำหรับรับข้อมูล POST และใช้ `joi` ตรวจสอบ:
        ```javascript
        //... (ส่วนบนเหมือนเดิม)
        const Joi = require('joi'); // << Import Joi

        //...
        app.use(helmet());
        app.use(cors());
        app.use(express.json()); // << สำคัญ! ต้องมี middleware นี้เพื่ออ่าน JSON body

        // สร้าง Schema สำหรับตรวจสอบข้อมูล user
        const userSchema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            birth_year: Joi.number().integer().min(1900).max(new Date().getFullYear())
        });

        // Route สำหรับสร้าง user
        app.post('/api/users', (req, res) => {
            const { error, value } = userSchema.validate(req.body);

            if (error) {
                // ถ้าข้อมูลไม่ถูกต้อง ส่ง 400 Bad Request กลับไปพร้อมรายละเอียด
                return res.status(400).json({ message: 'Invalid data', details: error.details });
            }

            // ถ้าข้อมูลถูกต้อง
            console.log('Validated data:', value);
            res.status(201).json({ message: 'User created successfully!', data: value });
        });
        //...
        ```
    3.  **ทดสอบ (ใช้ Postman/Thunder Client):**
          * **เคสที่ 1 (ถูกต้อง):** ส่ง `POST` request ไปที่ `http://localhost:3001/api/users` พร้อม Body เป็น JSON แบบนี้:
            ```json
            {
                "username": "testuser",
                "password": "password123",
                "birth_year": 2000
            }
            ```
            จะได้ Response `201 Created` กลับมา
          * **เคสที่ 2 (ผิดพลาด):** ลองส่ง `username` ที่สั้นไป หรือ `password` ที่มีอักขระพิเศษ:
            ```json
            {
                "username": "tu",
                "password": "p@ssword"
            }
            ```
            จะได้ Response `400 Bad Request` พร้อมเหตุผลว่าข้อมูลผิดพลาดตรงไหน

-----

## 🧪 Step 6: API Testing แบบละเอียด (20 นาที)

มาถึงส่วนสำคัญ คือการทดสอบ API ที่เราสร้างขึ้น 

### 6.1 การใช้ Postman

1.  **เปิด Postman** แล้วสร้าง "Collection" ใหม่ ตั้งชื่อว่า "ENGSE203 Workshop"
2.  **สร้าง Request แรก (GET):**
      * คลิก "Add Request"
      * ตั้งชื่อ "Get Homepage"
      * เลือก Method เป็น `GET`
      * ใส่ URL: `http://localhost:3001/`
      * กด **Send** คุณจะเห็นผลลัพธ์เป็น HTML ในหน้าต่าง Response ด้านล่าง
3.  **สร้าง Request ที่สอง (POST):**
      * Add Request อีกครั้ง ตั้งชื่อ "Create User"
      * เลือก Method เป็น `POST`
      * ใส่ URL: `http://localhost:3001/api/users`
      * ไปที่แท็บ **Headers** เพิ่ม Key: `Content-Type` และ Value: `application/json`
      * ไปที่แท็บ **Body** เลือก `raw` และเลือกประเภทเป็น `JSON`
      * ใส่ข้อมูล JSON ที่จะส่ง (ลองทั้งเคสที่ถูกและผิดจาก Step 5.4)
      * กด **Send** แล้วสังเกต Response ที่ได้

### 6.2 การใช้ Thunder Client (ใน VS Code)

1.  **คลิกที่ไอคอน Thunder Client** ใน Activity Bar ด้านซ้าย
2.  คลิก **New Request**
3.  **ทดสอบ GET:**
      * ในหน้าจอหลัก, เลือก `GET` แล้วใส่ URL `http://localhost:3001/`
      * กด **Send** ผลลัพธ์จะแสดงในแท็บ Response ทางขวา
4.  **ทดสอบ POST:**
      * เลือก `POST` แล้วใส่ URL `http://localhost:3001/api/users`
      * ไปที่แท็บ **Body** เลือก `JSON`
      * ใส่ข้อมูล JSON ที่จะทดสอบลงใน Textbox
      * กด **Send** และดูผลลัพธ์

-----

## 🌐 Step 7: WebSocket พื้นฐานกับ `socket.io` (Bonus - 20 นาที)

หัวข้อนี้จะอยู่ในเนื้อหา **Full-Stack Integration** แต่เรามาลองเล่นกันก่อนได้ครับ\!

  * **What is it?**: `socket.io` เป็น Library ที่ทำให้การสื่อสารสองทางแบบ Real-time ระหว่าง Client และ Server เป็นเรื่องง่าย 
  * **Why?**: เหมาะสำหรับแอปพลิเคชันที่ต้องการอัปเดตข้อมูลทันที เช่น แอปแชท, เกม, หรือ Dashboard ที่แสดงข้อมูลสด
  * **Mini-Experiment**:
    1.  **ติดตั้ง:** `npm install socket.io`
    2.  **อัปเดต `server.js`** ให้รองรับ WebSocket:
        ```javascript
        // server.js (ฉบับอัปเกรด)
        const express = require('express');
        const http = require('http'); // << Import http ของ Node
        const { Server } = require("socket.io"); // << Import Server จาก socket.io
        require('dotenv').config();

        const app = express();
        const server = http.createServer(app); // << สร้าง server ด้วย http
        const io = new Server(server, { // << ผูก socket.io กับ http server
            cors: { origin: "*" } // อนุญาตการเชื่อมต่อจากทุกที่
        });

        const PORT = process.env.PORT || 3001;

        // เสิร์ฟไฟล์ HTML สำหรับ Client
        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        });

        // จัดการ Event เมื่อมีคนเชื่อมต่อเข้ามา
        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            // เมื่อได้รับ event 'chat message' จาก client
            socket.on('chat message', (msg) => {
                console.log('message: ' + msg);
                // ส่ง event 'chat message' กลับไปให้ client ทุกคนที่เชื่อมต่ออยู่
                io.emit('chat message', `[${socket.id} says]: ${msg}`);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        });

        server.listen(PORT, () => {
            console.log(`🚀 Server with WebSocket running on http://localhost:${PORT}`);
        });
        ```
    3.  **สร้างไฟล์ `index.html`** สำหรับ Client:
        ```html
        <!DOCTYPE html>
        <html>
        <head><title>Chat</title></head>
        <body>
            <ul id="messages"></ul>
            <form id="form" action="">
                <input id="input" autocomplete="off" /><button>Send</button>
            </form>
            <script src="/socket.io/socket.io.js"></script>
            <script>
                var socket = io();
                var form = document.getElementById('form');
                var input = document.getElementById('input');

                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    if (input.value) {
                        socket.emit('chat message', input.value);
                        input.value = '';
                    }
                });

                socket.on('chat message', function(msg) {
                    var item = document.createElement('li');
                    item.textContent = msg;
                    document.getElementById('messages').appendChild(item);
                });
            </script>
        </body>
        </html>
        ```
    4.  **ทดสอบ:** รัน Server แล้วเปิดเบราว์เซอร์ 2 แท็บ (หรือ 2 หน้าต่าง) ไปที่ `http://localhost:3001` ลองพิมพ์ข้อความในหน้าต่างหนึ่ง แล้วดูผลลัพธ์ที่ปรากฏขึ้นพร้อมกันในอีกหน้าต่างหนึ่งแบบ Real-time\!

-----

## 🆘 Step 8: Troubleshooting - แก้ปัญหาที่เจอบ่อย

การเขียนโค้ดกับการเจอ Error เป็นของคู่กันครับ นี่คือปัญหาที่นักศึกษาเจอบ่อยที่สุดและวิธีแก้:

### 1\. **Error: `listen EADDRINUSE: address already in use :::3001`**

  * **สาเหตุ:** Port ที่เราจะรัน (3001) มีโปรเซสอื่นใช้งานอยู่ (อาจจะเป็นเซิร์ฟเวอร์เก่าที่เราลืมปิด)
  * **วิธีแก้:**
      * **ง่ายที่สุด:** ปิด Terminal เก่าให้หมดแล้วเปิดใหม่
      * **เปลี่ยน Port:** แก้เลข Port ในไฟล์ `.env` เป็นเลขอื่น เช่น `3002`

### 2\. **`req.body` เป็น `undefined`**

  * **สาเหตุ:** เราลืมใส่ Middleware `express.json()` ก่อนที่จะถึง Route ที่รับข้อมูล
  * **วิธีแก้:** เพิ่ม `app.use(express.json());` เข้าไปใน `server.js` โดยต้องให้อยู่ **ก่อน** `app.post(...)` หรือ `app.use('/api', ...)`

### 3\. **CORS Error ใน Console ของเบราว์เซอร์**

  * **สาเหตุ:** ลืมใช้ `cors` middleware หรือตั้งค่าผิด
  * **วิธีแก้:** ตรวจสอบว่ามี `app.use(cors());` อยู่ใน `server.js` หรือไม่ และควรวางไว้เป็นลำดับต้นๆ ของ Middleware

### 4\. **`TypeError: Router.use() requires a middleware function but got a Object`**

  * **สาเหตุ:** มักเกิดจากการ `require` หรือ `export` ไฟล์ผิดพลาด ทำให้ Express ได้รับ Object ธรรมดาแทนที่จะเป็นฟังก์ชัน Middleware หรือ Router
  * **วิธีแก้:** ตรวจสอบไฟล์ Route ของเราให้ดีว่ามีการ `module.exports = router;` ที่ท้ายไฟล์หรือไม่ และไฟล์ `server.js` ได้ `require` มาอย่างถูกต้อง

-----

## ✅ Final Checklist

ก่อนเข้า Workshop, ตรวจสอบอีกครั้งว่าคุณ:

  - [ ] เข้าใจภาพรวมว่า Backend, Frontend, Database ทำงานร่วมกันอย่างไร
  - [ ] ใช้ `npm run dev` เพื่อรันเซิร์ฟเวอร์ด้วย `nodemon` ได้
  - [ ] อธิบายแนวคิดของ Middleware แบบง่ายๆ ได้
  - [ ] ทดลองใช้ `dotenv`, `cors`, `helmet`, `joi` และเห็นผลลัพธ์ด้วยตัวเอง
  - [ ] ใช้ Postman หรือ Thunder Client ส่ง `GET` และ `POST` request พร้อม JSON body ได้
  - [ ] พร้อมรับมือกับ Error พื้นฐานที่อาจเกิดขึ้น

