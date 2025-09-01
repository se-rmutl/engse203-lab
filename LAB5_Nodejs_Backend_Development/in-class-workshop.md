# In-Class LAB: Agent Wallboard System - Step by Step Learning

## Student Instruction Guide: Agent Wallboard LAB
**ENGSE203 สัปดาห์ที่ 7 - Node.js & Backend Development**

---

## 📋 เอกสารนี้คืออะไร?

นี่คือ **คู่มือการปปฏิบัติงาน** สำหรับนักศึกษาใช้ระหว่าง LAB 
- ✅ **Checklist** สำหรับติดตามความคืบหน้า
- 📝 **Code Templates** และ instructions ที่ชัดเจน  
- 🧪 **Testing Steps** ที่ต้องทำในแต่ละขั้นตอน
- 🔍 **Troubleshooting** สำหรับปัญหาที่เจอบ่อย

**วิธีใช้:** เปิดเอกสารนี้ไว้ข้าง LAB หลัก แล้วทำตาม checklist ทีละขั้น

---

## 🕐 HOUR 1: Setup & Understanding
**เป้าหมาย:** เข้าใจ business + สร้าง basic server

### Step 1.1: Business Concepts (15 นาที)
**จุดประสงค์:** ทำความเข้าใจระบบก่อนเขียนโค้ด

#### ✅ Checklist:
- [ ] ฟัง explanation ของ Call Center system
- [ ] เข้าใจ Agent Status ทั้ง 5 แบบ
- [ ] ตอบคำถาม discussion ได้
- [ ] วาดแผนภาพ Agent workflow ใน notebook

#### 🧠 Key Concepts ที่ต้องจำ:
```
AVAILABLE  = พร้อมรับสาย
ACTIVE     = กำลังคุยกับลูกค้า  
WRAP_UP    = บันทึกหลังจบสาย
NOT_READY  = ไม่พร้อมรับสาย (พัก/ประชุม)
OFFLINE    = ออฟไลน์
```

---

### Step 1.2: Project Setup (25 นาที)
**จุดประสงค์:** สร้างโปรเจกต์จากศูนย์เพื่อเข้าใจทุกขั้นตอน

#### ✅ Checklist:
- [ ] สร้างโฟลเดอร์ `agent-wallboard-learn`
- [ ] รัน `npm init` (ไม่ใช้ -y)
- [ ] ติดตั้ง `express` ด้วย `npm install express`
- [ ] ตรวจสอบไฟล์ที่เกิดขึ้น: `package.json`, `node_modules`, `package-lock.json`

#### 📝 Code Template - server.js:
```javascript
// ขั้นที่ 1: Import Express
const express = _______; // เติมให้ถูก

// ขั้นที่ 2: สร้าง app  
const app = _______; // เติมให้ถูก

// ขั้นที่ 3: กำหนด PORT
const PORT = 3001;

// ขั้นที่ 4: สร้าง route แรก
app.___('/', (req, res) => {
    res.___("Hello Agent Wallboard!");
}); // เติม method และ response function

// ขั้นที่ 5: เริ่ม server
app._____(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

#### ✅ Testing Checklist:
- [ ] รัน `node server.js` ไม่มี error
- [ ] เปิด browser ไปที่ `http://localhost:3001` เห็น "Hello Agent Wallboard!"
- [ ] ในเบราว์เซอร์เข้าไปที่ `/test` เห็น error (เป็นปกติ)

---

### Step 1.3: เพิ่ม Health Check Route (20 นาที)
**จุดประสงค์:** ฝึกสร้าง route และเข้าใจ req, res

#### 📝 Mini Challenge 1:
สร้าง route `/health` ที่ return JSON:
```json
{
    "status": "OK",
    "timestamp": "เวลาปัจจุบัน"
}
```

#### 💡 Hints:
- ใช้ `res.json()` แทน `res.send()` สำหรับ JSON
- JavaScript ใช้ `new Date().toISOString()` สำหรับเวลา

#### ✅ Completion Checklist:
- [ ] เขียนโค้ด route `/health` เสร็จ
- [ ] ทดสอบใน browser ได้ผลลัพธ์เป็น JSON
- [ ] อธิบายความแตกต่าง `res.send()` vs `res.json()` ได้

#### 🔍 Expected Result:
```json
{
    "status": "OK", 
    "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🕑 HOUR 2: Agent Management
**เป้าหมาย:** สร้าง Agent API แบบ step-by-step

### Step 2.1: Agent Data Design (20 นาที)
**จุดประสงค์:** ออกแบบข้อมูลก่อนเขียน API

#### 🧠 Design Challenge:
คิดว่า Agent 1 คนควรมีข้อมูลอะไรบ้าง? เขียนลงกระดาษ:

```javascript
const agent = {
    code: "A001",        // รหัส Agent
    name: _____,         // เติมคิดเอง
    status: _____,       // เติมคิดเอง  
    // คิดต่อว่าควรมีอะไรอีก...
};
```

#### ✅ Design Checklist:
- [ ] คิดข้อมูลที่จำเป็นได้อย่างน้อย 5 อย่าง
- [ ] สร้าง sample agents อย่างน้อย 3 ตัว
- [ ] เขียน agents array ลงใน server.js

#### 📝 Code Template - Agent Array:
```javascript
// ใส่ด้านบน server.js ก่อน routes
const agents = [
    {
        code: "A001",
        name: "John Doe",
        status: "Available", 
        // เพิ่มข้อมูลอื่นๆ...
    },
    // สร้าง agent อีก 2 ตัว...
];
```

---

### Step 2.2: GET All Agents API (25 นาที)
**จุดประสงค์:** เรียนรู้การสร้าง RESTful API

#### 💭 คิดก่อนเขียน:
- ควรใช้ HTTP Method อะไร? ทำไม?
- URL ควรเป็น `/agents` หรือ `/api/agents`?
- Response ควรมีข้อมูลอะไรนอกจาก agents array?

#### 📝 Code Template:
```javascript
app.___('/api/agents', (req, res) => {
    // ควร return อะไร?
    res.json({
        success: _____,     // เติม true/false
        data: _____,        // เติม agents หรือไม่?
        count: _____,       // เติมจำนวน agents
        timestamp: _____    // เติมเวลาปัจจุบัน
    });
});
```

#### ✅ Implementation Checklist:
- [ ] เติม HTTP method ที่ถูกต้อง
- [ ] เติมข้อมูลใน response object
- [ ] ทดสอบใน browser เห็น JSON response
- [ ] Response format สวย อ่านง่าย

#### 🧪 Testing Steps:
1. **Browser Test:**
   - URL: `http://localhost:3001/api/agents`
   - Expected: JSON response ที่มี agents ทั้งหมด

2. **Postman Test:**
   - Method: GET
   - URL: `http://localhost:3001/api/agents`  
   - Check: Status Code 200, JSON format

---

### Step 2.3: Postman Setup (15 นาที)
**จุดประสงค์:** เรียนรู้เครื่องมือทดสอบ API

#### ✅ Postman Setup Checklist:
- [ ] เปิด Postman
- [ ] สร้าง New Collection ชื่อ "Agent Wallboard LAB"
- [ ] สร้าง Request แรก: "Get All Agents"
- [ ] ทดสอบ GET `http://localhost:3001/api/agents` สำเร็จ
- [ ] บันทึก Request ลงใน Collection

#### 📝 Mini Challenge 2:
สร้าง route `/api/agents/count` ที่ return:
```json
{
    "success": true,
    "count": 3,
    "timestamp": "..."
}
```

#### ✅ Challenge Completion:
- [ ] เขียน route `/api/agents/count`
- [ ] ทดสอบใน Postman
- [ ] บันทึก Request ใหม่ใน Collection

---

## 🕒 HOUR 3: Status Management
**เป้าหมาย:** สร้าง logic การเปลี่ยนสถานะ Agent

### Step 3.1: Status Workflow Analysis (15 นาที)
**จุดประสงค์:** เข้าใจ business logic ก่อนเขียนโค้ด

#### 🧠 Workflow Challenge:
วาดแผนภาพการไหลของ Agent Status:
```
LOGIN → ??? → ??? → ??? → LOGOUT
```

#### ✅ Understanding Checklist:
- [ ] เข้าใจ status transitions ที่อนุญาต
- [ ] รู้ว่าการเปลี่ยนไหนที่ไม่ควรอนุญาต
- [ ] คิด edge cases ที่อาจเกิดขึ้น

---

### Step 3.2: Status Change API (25 นาที)
**จุดประสงค์:** สร้าง API ที่ซับซ้อนขึ้น

#### 💭 Design Questions:
- ใช้ HTTP Method อะไร? POST? PUT? PATCH?
- URL structure: `/api/agents/A001/status` หรือแบบอื่น?
- Request body ควรมีอะไร?

#### 📝 Code Template - อย่าให้ทั้งหมด ให้ทำทีละส่วน:

**ขั้นที่ 1: เพิ่ม middleware สำหรับ JSON**
```javascript
// เพิ่มบรรทัดนี้ก่อน routes
app.use(express.json()); // สำคัญมาก!
```

**ขั้นที่ 2: สร้าง route structure**
```javascript
app.___('/api/agents/:code/status', (req, res) => {
    // Step 1: ดึง agent code จาก URL
    const agentCode = req.params.____; // เติม
    
    // Step 2: ดึง status ใหม่จาก body
    const newStatus = req.body.____; // เติม
    
    // ต่อไปให้นักศึกษาเขียนเอง...
});
```

#### ✅ Step-by-Step Implementation:
- [ ] เติม HTTP method
- [ ] เติม parameter และ body extraction  
- [ ] เขียน agent finding logic
- [ ] เขียน validation logic
- [ ] เขียน status update logic
- [ ] เขียน response logic

#### 💡 Implementation Hints:
```javascript
// หา agent ในระบบ
const agent = agents.find(a => a.code === agentCode);

// ตรวจสอบ valid statuses
const validStatuses = ["Available", "Active", "Wrap Up", "Not Ready", "Offline"];

// บันทึกสถานะเก่า
const oldStatus = agent.status;
```

---

### Step 3.3: Testing Status Changes (20 นาที)
**จุดประสงค์:** ทดสอบ API อย่างละเอียด

#### 🧪 Test Cases ที่ต้องทำ:

**Test 1: Success Case**
- Method: PATCH
- URL: `http://localhost:3001/api/agents/A001/status`
- Headers: `Content-Type: application/json`
- Body:
```json
{
    "status": "Active"
}
```
- Expected: Status 200, success response

**Test 2: Agent Not Found**
- URL: `http://localhost:3001/api/agents/A999/status`
- Expected: Status 404, error message

**Test 3: Invalid Status**
- Body:
```json
{
    "status": "Sleeping"  
}
```
- Expected: Status 400, validation error

#### ✅ Testing Checklist:
- [ ] Test Case 1 ผ่าน
- [ ] Test Case 2 ผ่าน  
- [ ] Test Case 3 ผ่าน
- [ ] บันทึกทุก test ใน Postman Collection
- [ ] ตรวจสอบ agent status เปลี่ยนจริงด้วย GET /api/agents

#### 📝 Mini Challenge 3:
เพิ่ม console.log เพื่อติดตาม status changes:
```javascript
console.log(`[${new Date().toISOString()}] Agent ${agentCode}: ${oldStatus} → ${newStatus}`);
```

---

## 🕓 HOUR 4: Dashboard & Final Project
**เป้าหมาย:** สร้าง dashboard และ mini project

### Step 4.1: Dashboard Statistics (20 นาที)
**จุดประสงค์:** ฝึกการคำนวณและ data aggregation

#### 💭 Requirements Analysis:
หัวหน้า Call Center อยากรู้อะไร?
- จำนวน agents ทั้งหมด
- จำนวน agents ในแต่ละสถานะ
- เปรเซ็นต์ที่ว่าง/ยุ่ง

#### 📝 Code Template - ให้ทำทีละขั้น:
```javascript
app.get('/api/dashboard/stats', (req, res) => {
    // ขั้นที่ 1: นับจำนวนรวม
    const totalAgents = agents.____; // เติม
    
    // ขั้นที่ 2: นับ Available agents
    const available = agents.filter(a => a.____ === "Available").____; // เติม
    
    // ให้นักศึกษาเขียน active, wrapUp, notReady, offline เอง
    
    // ขั้นที่ 3: คำนวณเปอร์เซ็นต์  
    const availablePercent = totalAgents > 0 ? 
        Math.round((available / totalAgents) * 100) : 0;
    
    // ให้นักศึกษาทำส่วนอื่นเอง...
});
```

#### ✅ Implementation Checklist:
- [ ] นับ agents ในแต่ละ status ได้ถูกต้อง
- [ ] คำนวณเปอร์เซ็นต์ได้ถูกต้อง
- [ ] จัดการกรณี totalAgents = 0 ได้
- [ ] Response format สวยงาม อ่านง่าย
- [ ] ทดสอบใน Postman สำเร็จ

#### 🧪 Expected Response Format:
```json
{
    "success": true,
    "data": {
        "total": 3,
        "statusBreakdown": {
            "available": { "count": 1, "percent": 33 },
            "active": { "count": 1, "percent": 33 },
            "wrapUp": { "count": 0, "percent": 0 },
            "notReady": { "count": 1, "percent": 33 },
            "offline": { "count": 0, "percent": 0 }
        },
        "timestamp": "..."
    }
}
```

---

### Step 4.2: CORS Setup (15 นาที)
**จุดประสงค์:** เตรียมพร้อมสำหรับ frontend integration

#### 🧪 CORS Problem Demo:
สร้างไฟล์ `test.html`:
```html
<script>
fetch('http://localhost:3001/api/agents')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error('CORS Error:', err));
</script>
```

#### ✅ Problem & Solution Steps:
- [ ] เปิด `test.html` ในเบราว์เซอร์
- [ ] เปิด Console เห็น CORS error
- [ ] ติดตั้ง cors: `npm install cors`
- [ ] เพิ่มโค้ด:
```javascript
const cors = require('cors');
app.use(cors());
```
- [ ] ทดสอบใหม่ → ไม่มี error แล้ว

---

### Step 4.3: Final Mini Project (25 นาที)
**จุดประสงค์:** รวมทุกอย่างที่เรียนมา

#### 🎯 Project Requirements:
สร้าง Agent Login/Logout System:

1. **Agent Login API**
   - `POST /api/agents/:code/login`
   - Request body: `{"name": "Agent Name"}`
   - เมื่อ login: status → "Available", บันทึก loginTime

2. **Agent Logout API**  
   - `POST /api/agents/:code/logout`
   - เมื่อ logout: status → "Offline", ลบ loginTime

#### 📝 Implementation Template - ไม่ให้โค้ดเต็ม:
```javascript
app.post('/api/agents/:code/login', (req, res) => {
    const agentCode = req.params.code;
    const { name } = req.body;
    
    // ให้นักศึกษาเขียนเอง:
    // 1. หา agent หรือสร้างใหม่
    // 2. เซ็ต status เป็น "Available"  
    // 3. บันทึก loginTime
    // 4. ส่ง response
});
```

#### ✅ Project Checklist:
- [ ] Login API ทำงานถูกต้อง
- [ ] Logout API ทำงานถูกต้อง
- [ ] ทดสอบ workflow: login → change status → logout
- [ ] ทุก API อยู่ใน Postman Collection
- [ ] ส่งภาพหน้าจอ Postman ให้อาจารย์

#### 🧪 Final Testing Workflow:
1. **Login Agent:** `POST /api/agents/A004/login`
2. **Check Status:** `GET /api/agents` (เห็น A004 status = Available)
3. **Change Status:** `PATCH /api/agents/A004/status` (เป็น Active)
4. **Check Dashboard:** `GET /api/dashboard/stats` (เลขเปลี่ยน)
5. **Logout:** `POST /api/agents/A004/logout` (status เป็น Offline)

---

## 🏆 LAB Completion Checklist

### ✅ Hour 1 Completion:
- [ ] เข้าใจ Agent Wallboard business concepts
- [ ] สร้าง Express server พื้นฐานได้
- [ ] ทดสอบ routes ใน browser สำเร็จ
- [ ] มี health check endpoint

### ✅ Hour 2 Completion:
- [ ] ออกแบบ agent data structure
- [ ] สร้าง GET /api/agents สำเร็จ
- [ ] ใช้ Postman ทดสอบได้
- [ ] เข้าใจ RESTful API concepts

### ✅ Hour 3 Completion:
- [ ] เข้าใจ agent status workflow
- [ ] สร้าง PATCH /api/agents/:code/status สำเร็จ
- [ ] ทดสอบ success และ error cases ครบ
- [ ] มี proper error handling

### ✅ Hour 4 Completion:
- [ ] สร้าง dashboard statistics API
- [ ] ตั้งค่า CORS สำเร็จ
- [ ] ทำ mini project (login/logout) เสร็จ
- [ ] มี complete Postman collection

### ✅ Final Submission:
- [ ] ทดสอบ full workflow: login → status change → logout สำเร็จ
- [ ] ส่งภาพหน้าจอ Postman collection
- [ ] อธิบายความแตกต่าง LAB vs Workshop ได้
- [ ] เตรียมตัวสำหรับ Workshop assignment

---

## 🔧 Troubleshooting Guide

### Problem 1: "Cannot GET /api/agents"
**สาเหตุ:** Route ไม่ถูกต้องหรือ server ไม่ทำงาน
**แก้ไข:**
- ตรวจสอบ `app.get('/api/agents', ...)` เขียนถูกไหม
- ตรวจสอบ server รันอยู่ไหม (`node server.js`)
- ตรวจสอบ port ถูกไหม (3001)

### Problem 2: "req.body is undefined"
**สาเหตุ:** ไม่มี `app.use(express.json())`
**แก้ไข:**
- เพิ่ม `app.use(express.json());` ก่อน routes
- ตรวจสอบ Content-Type header ใน Postman

### Problem 3: CORS Error ใน browser
**สาเหตุ:** ไม่ได้ตั้งค่า CORS
**แก้ไข:**
- `npm install cors`
- เพิ่ม `const cors = require('cors'); app.use(cors());`

### Problem 4: "Agent not found" แต่มี agent
**สาเหตุ:** Type mismatch หรือ case sensitivity
**แก้ไข:**
- ตรวจสอบ agent code ตรงกันไหม (A001 vs a001)
- ใช้ `console.log()` debug

### Problem 5: Port 3001 already in use
**แก้ไข:**
```bash
# หา process ที่ใช้ port
lsof -ti:3001
# Kill process  
kill -9 $(lsof -ti:3001)
# หรือเปลี่ยน PORT ใน server.js
```

---

## 📚 Quick Reference

### HTTP Methods:
- **GET:** ดึงข้อมูล (Read)
- **POST:** สร้างใหม่ (Create)  
- **PUT:** แก้ไขทั้งหมด (Replace)
- **PATCH:** แก้ไขบางส่วน (Update)
- **DELETE:** ลบ (Delete)

### Common Status Codes:
- **200:** OK (สำเร็จ)
- **201:** Created (สร้างใหม่สำเร็จ)
- **400:** Bad Request (ข้อมูลผิด)
- **404:** Not Found (ไม่เจอ)
- **500:** Internal Server Error (server error)

### Express Basics:
```javascript
// Route with parameter
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
});

// Get JSON body
app.post('/api/users', (req, res) => {
    const userData = req.body;
});

// Send JSON response
res.json({ success: true, data: result });

// Send error response
res.status(404).json({ error: 'Not found' });
```

### JavaScript Array Methods:
```javascript
// หาข้อมูล
const user = users.find(u => u.id === userId);

// กรองข้อมูล
const activeUsers = users.filter(u => u.status === 'active');

// นับจำนวน
const count = users.length;
```

---

## 🎯 Next Steps

### เตรียมตัวสำหรับ Workshop:
1. **ทบทวนสิ่งที่เรียนวันนี้** - แต่ละบรรทัดโค้ดเข้าใจไหม?
2. **ศึกษา WebSocket basics** - สำหรับ real-time features
3. **อ่าน workshop.md overview** - ดูว่าจะซับซ้อนขึ้นอย่างไร
4. **ฝึก Postman** - สร้าง collections และ tests

### Workshop Assignment Preview:
- ✨ WebSocket real-time updates
- 📨 Message system (Supervisor ↔ Agents) 
- 🛡️ Input validation with Joi
- 📊 Advanced dashboard features
- 🗂️ Better project structure (MVC pattern)
- 🚨 Comprehensive error handling

LAB วันนี้เป็นพื้นฐานสำคัญ Workshop จะขยายความรู้เหล่านี้ให้ลึกและครอบคลุมมากขึ้น!

**ขอให้สนุกกับการเรียนรู้และการเขียนโค้ด! 🚀**