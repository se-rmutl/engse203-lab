# สัปดาห์ที่ 7: Backend Development with Node.js
## ENGSE203 การเขียนโปรแกรมสำหรับวิศวกรซอฟต์แวร์ (ทฤษฎี 1 ชั่วโมง)
### Case Study: Agent Wallboard System

---

## Slide 1: Course Progression Overview
### จาก Frontend สู่ Full-Stack Development

```
สัปดาห์ที่ 5: React.js Fundamentals
           ↓
สัปดาห์ที่ 6: Advanced React & State Management  
           ↓
สัปดาห์ที่ 7: Backend Development with Node.js ← เรียนวันนี้
           ↓
สัปดาห์ที่ 8: Database Integration & MongoDB
```

**เป้าหมายวันนี้:**
- เข้าใจ **ทำไม** ต้องมี Backend
- เรียนรู้ **Node.js runtime** และ **Express.js framework**
- ออกแบบ **REST API** สำหรับ Agent Wallboard System
- เตรียมพร้อมสำหรับ **Database Integration**

---

## Slide 2: Agent Wallboard System - Why Backend?
### ทำไม Frontend อย่างเดียวไม่พอ?

**⚠️ ปัญหาของ Frontend-Only Solution:**

```javascript
// ❌ ข้อมูล agents อยู่เฉพาะใน client
const agents = [
  { id: 'A001', name: 'John', status: 'Available' },
  { id: 'A002', name: 'Jane', status: 'Active' }
];

// ปัญหา:
// 1. ข้อมูลไม่ sync ระหว่าง supervisor และ agents
// 2. ไม่มีการจัดเก็บข้อมูล persistent
// 3. ไม่สามารถ real-time communication ได้
// 4. ไม่มี business logic validation
```

**✅ Backend ช่วยแก้ปัญหา:**
- **Centralized Data** - ข้อมูลรวมที่เดียว
- **Real-time Communication** - WebSocket connections
- **Data Persistence** - บันทึกข้อมูลถาวร
- **Business Logic** - validation, processing rules
- **Security** - authentication, authorization

---

## Slide 3: What is Node.js?
### JavaScript ที่รันนอก Browser

**Node.js = JavaScript Runtime บน Server**

```javascript
// 🌐 JavaScript ใน Browser (สัปดาห์ที่ผ่านมา)
document.getElementById('status').innerText = 'Available';
localStorage.setItem('agentData', JSON.stringify(agent));

// 🖥️ JavaScript ใน Node.js (สัปดาห์นี้)
const fs = require('fs');
const http = require('http');
fs.writeFileSync('agents.json', JSON.stringify(agents));
```

**คุณสมบัติหลัก:**
- **V8 Engine** - JavaScript engine เดียวกับ Chrome
- **Event-driven** - เหมาะกับ I/O operations
- **Non-blocking** - จัดการหลาย requests พร้อมกัน
- **NPM Ecosystem** - packages มากมาย

**ทำไมเลือก Node.js สำหรับ Call Center?**
- Real-time capabilities สำหรับ agent status updates
- JavaScript ecosystem เดียวกับ Frontend
- Performance ดีสำหรับ concurrent users

---

## Slide 4: Node.js vs Traditional Backend
### เปรียบเทียบกับ Backend Languages อื่น

| Aspect | Node.js | PHP | Java | Python |
|--------|---------|-----|------|--------|
| **Language** | JavaScript | PHP | Java | Python |
| **Learning Curve** | ✅ ง่าย (same as frontend) | ✅ ง่าย | ❌ ยาก | ✅ ง่าย |
| **Real-time** | ✅ ดีเยี่ยม | ❌ จำกัด | ⚠️ ปานกลาง | ⚠️ ปานกลาง |
| **Performance** | ✅ สูง (I/O intensive) | ⚠️ ปานกลาง | ✅ สูง | ⚠️ ปานกลาง |
| **Ecosystem** | ✅ NPM (ใหญ่ที่สุด) | ✅ ใหญ่ | ✅ ใหญ่ | ✅ ใหญ่ |

**สำหรับ Agent Wallboard System:**
```javascript
// ✅ Node.js - เหมาะกับ real-time updates
io.emit('agentStatusUpdate', { agentId: 'A001', status: 'Available' });

// ❌ PHP - ไม่เหมาะกับ real-time
// ต้องใช้ polling หรือ third-party services
```

---

## Slide 5: Event Loop และ Non-blocking I/O
### ทำไม Node.js เร็ว?

**Event Loop คือหัวใจของ Node.js:**

```javascript
console.log('1. Start');

setTimeout(() => {
  console.log('3. Timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('2. Promise callback');
});

console.log('1. End');

// Output:
// 1. Start
// 1. End  
// 2. Promise callback
// 3. Timeout callback
```

**Non-blocking I/O ในทางปฏิบัติ:**
```javascript
// ❌ Blocking (หยุดรอ)
const data = fs.readFileSync('agents.json'); // รอจนกว่าจะอ่านเสร็จ
console.log('File read complete');

// ✅ Non-blocking (ไม่หยุดรอ)
fs.readFile('agents.json', (err, data) => {
  console.log('File read complete'); // เมื่ออ่านเสร็จค่อยรัน
});
console.log('Continue processing...'); // รันทันที
```

---

## Slide 6: NPM - Node Package Manager
### ระบบจัดการ Packages

**NPM = ห้องสมุดซอฟต์แวร์ที่ใหญ่ที่สุดในโลก**

```bash
# 📦 การจัดการ packages
npm init -y                    # สร้าง package.json
npm install express           # ติดตั้ง package
npm install --save-dev nodemon # development dependency
npm start                     # รัน application
```

**Package.json สำหรับ Agent Wallboard:**
```json
{
  "name": "agent-wallboard-backend",
  "version": "1.0.0",
  "description": "Backend for Call Center Agent Management",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.7.4",
    "cors": "^2.8.5"
  }
}
```

**ข้อดีของ NPM:**
- Packages มากกว่า 2 ล้านตัว
- Semantic versioning
- Dependency management อัตโนมัติ

---

## Slide 7: Express.js Framework
### Web Framework สำหรับ Node.js

**Express.js = Minimalist Web Framework**

```javascript
// 🚀 Basic Express Server
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Agent Wallboard!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**ทำไมใช้ Express.js?**
- **Simple & Flexible** - เขียนง่าย, customize ได้
- **Middleware Support** - เสียบ functionality ได้
- **Routing** - จัดการ URLs อย่างมีระบบ
- **Large Community** - documentation และ tutorials เยอะ

**Alternative Frameworks:**
- **Fastify** - เร็วกว่า แต่ ecosystem เล็กกว่า
- **Koa.js** - สร้างโดยทีม Express แต่ใช้ async/await
- **NestJS** - TypeScript-first, Angular-like structure

---

## Slide 8: HTTP Methods และ REST API Design
### การออกแบบ API ตามมาตรฐาน

**REST = REpresentational State Transfer**

| HTTP Method | Purpose | Agent Wallboard Example |
|-------------|---------|-------------------------|
| **GET** | ดึงข้อมูล | `GET /api/agents` - ดูรายชื่อ agents |
| **POST** | สร้างใหม่ | `POST /api/agents/A001/login` - agent เข้าสู่ระบบ |
| **PUT** | อัปเดททั้งหมด | `PUT /api/agents/A001` - อัปเดทข้อมูล agent |
| **PATCH** | อัปเดทบางส่วน | `PATCH /api/agents/A001/status` - เปลี่ยนสถานะ |
| **DELETE** | ลบข้อมูล | `DELETE /api/agents/A001/session` - logout |

**URL Design Patterns:**
```javascript
// ✅ RESTful URLs
GET    /api/agents              // รายชื่อ agents ทั้งหมด
GET    /api/agents/A001         // ข้อมูล agent A001
PATCH  /api/agents/A001/status  // เปลี่ยนสถานะ agent A001
POST   /api/messages            // ส่งข้อความใหม่

// ❌ Non-RESTful URLs  
GET    /api/getAllAgents
POST   /api/updateAgentStatus
GET    /api/agent_details_A001
```

---

## Slide 9: HTTP Status Codes
### การสื่อสารผลลัพธ์ผ่าน Status Codes

**Status Codes สำคัญสำหรับ API:**

| Code | Meaning | Agent Wallboard Example |
|------|---------|-------------------------|
| **200** | OK | ดึงรายชื่อ agents สำเร็จ |
| **201** | Created | agent login สำเร็จ |
| **400** | Bad Request | ส่งสถานะที่ไม่ถูกต้อง |
| **401** | Unauthorized | ไม่มีสิทธิ์เข้าถึง |
| **404** | Not Found | ไม่พบ agent ที่ระบุ |
| **500** | Server Error | ระบบขัดข้อง |

```javascript
// ตัวอย่างการใช้งาน
app.patch('/api/agents/:id/status', (req, res) => {
  const agent = findAgent(req.params.id);
  
  if (!agent) {
    return res.status(404).json({
      error: 'Agent not found',
      agentId: req.params.id
    });
  }
  
  if (!isValidStatus(req.body.status)) {
    return res.status(400).json({
      error: 'Invalid status',
      validStatuses: ['Available', 'Active', 'Not Ready']
    });
  }
  
  agent.status = req.body.status;
  res.status(200).json({ 
    message: 'Status updated successfully',
    agent: agent 
  });
});
```

---

## Slide 10: Express Middleware
### Middleware Pattern คืออะไร?

**Middleware = ฟังก์ชันที่รันระหว่าง Request และ Response**

```javascript
// 🔄 Middleware Flow
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

**ตัวอย่าง Middleware:**
```javascript
// 📝 Logging Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // ⚠️ สำคัญ! ต้องเรียก next()
});

// 🔒 Authentication Middleware
app.use('/api/admin', (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Token required' });
  }
  
  // ตรวจสอบ token...
  next();
});

// 📦 Body Parser Middleware
app.use(express.json()); // แปลง JSON request body
```

**Built-in Middlewares:**
- `express.json()` - แปลง JSON
- `express.static()` - serve static files
- `express.urlencoded()` - แปลง form data

---

## Slide 11: CORS - Cross-Origin Resource Sharing
### เชื่อมต่อ Frontend กับ Backend

**CORS Problem:**
```javascript
// Frontend (http://localhost:3000) พยายามเรียก
fetch('http://localhost:3001/api/agents')

// Browser block เพราะ different origin
// Error: "Access to fetch has been blocked by CORS policy"
```

**CORS Solution:**
```javascript
const cors = require('cors');

// ✅ เปิดใช้ CORS สำหรับทุก origins
app.use(cors());

// ✅ กำหนด origins เฉพาะ (ปลอดภัยกว่า)
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // สำหรับ cookies
}));
```

**สำหรับ Agent Wallboard System:**
- Frontend (Electron): `http://localhost:3000`
- Backend (Node.js): `http://localhost:3001` 
- ต้องมี CORS เพื่อให้ communicate กันได้

---

## Slide 12: JSON และ Data Exchange
### รูปแบบการส่งข้อมูล

**JSON = JavaScript Object Notation**

```javascript
// 📤 ส่งข้อมูล agent ใน JSON format
{
  "success": true,
  "data": {
    "agentId": "A001",
    "name": "John Doe",
    "status": "Available",
    "loginTime": "2024-01-15T08:00:00Z",
    "skills": ["English", "Technical Support"],
    "stats": {
      "totalCalls": 25,
      "averageTime": "00:05:30"
    }
  }
}

// Express.js จัดการ JSON อัตโนมัติ
app.use(express.json()); // parse JSON requests
res.json({ success: true, data: agents }); // send JSON response
```

**Response Pattern สำหรับ Agent Wallboard:**
```javascript
// ✅ Consistent Response Structure
{
  "success": true/false,
  "message": "Human readable message",
  "data": { /* actual data */ },
  "error": { /* error details (if failed) */ },
  "timestamp": "2024-01-15T08:00:00Z"
}
```

---

## Slide 13: Agent Wallboard API Design
### ออกแบบ APIs สำหรับ Call Center

**Core API Endpoints:**

```javascript
// 👥 Agent Management
GET    /api/agents                    // รายชื่อ agents ทั้งหมด
GET    /api/agents/:id                // ข้อมูล agent เฉพาะ
POST   /api/agents/:id/login          // agent เข้าสู่ระบบ
POST   /api/agents/:id/logout         // agent ออกจากระบบ
PATCH  /api/agents/:id/status         // เปลี่ยนสถานะ agent

// 💬 Message System  
POST   /api/messages                  // ส่งข้อความ
GET    /api/messages/agent/:id        // ข้อความของ agent
PUT    /api/messages/:id/read         // mark message as read

// 📊 Dashboard & Statistics
GET    /api/dashboard/stats           // สถิติ real-time
GET    /api/dashboard/performance     // performance metrics
```

**API Response Examples:**
```javascript
// GET /api/agents
{
  "success": true,
  "data": {
    "totalAgents": 45,
    "online": 32,
    "available": 18,
    "active": 12,
    "notReady": 2,
    "agents": [/* agent list */]
  }
}

// PATCH /api/agents/A001/status
{
  "success": true,
  "message": "Agent A001 status updated to Available",
  "data": {
    "agentId": "A001",
    "oldStatus": "Not Ready",
    "newStatus": "Available",
    "timestamp": "2024-01-15T08:00:00Z"
  }
}
```

---

## Slide 14: Real-time Communication
### WebSocket vs HTTP Polling

**HTTP Polling (แบบเก่า):**
```javascript
// ❌ Frontend ต้องถามซ้ำ ๆ
setInterval(async () => {
  const response = await fetch('/api/agents');
  const agents = await response.json();
  updateUI(agents);
}, 5000); // ทุก 5 วินาที

// ปัญหา: ใช้ bandwidth มาก, ไม่ real-time
```

**WebSocket (แบบใหม่):**
```javascript
// ✅ Server push ข้อมูลเมื่อมีการเปลี่ยนแปลง
const io = require('socket.io')(server);

// Agent เปลี่ยนสถานะ
agent.status = 'Available';
io.emit('agentStatusUpdate', {
  agentId: 'A001',
  status: 'Available',
  timestamp: new Date()
});

// Frontend รับข้อมูลทันที
socket.on('agentStatusUpdate', (data) => {
  updateAgentDisplay(data);
});
```

**ข้อดีของ WebSocket:**
- **Real-time** - อัปเดททันที
- **Bidirectional** - ส่งข้อมูลได้ทั้งสองทาง
- **Efficient** - connection เดียวใช้ต่อได้
- **Low Latency** - เหมาะกับ call center operations

---

## Slide 15: Error Handling Strategies
### การจัดการ Errors อย่างมืออาชีพ

**Error Types ใน Node.js:**
```javascript
// 1. 🚨 Synchronous Errors
try {
  const data = JSON.parse(invalidJson);
} catch (error) {
  console.error('Parse error:', error.message);
}

// 2. ⚡ Asynchronous Errors  
app.get('/api/agents', async (req, res, next) => {
  try {
    const agents = await fetchAgentsFromDB();
    res.json({ success: true, data: agents });
  } catch (error) {
    next(error); // ส่งไป global error handler
  }
});

// 3. 🌐 Global Error Handler
app.use((error, req, res, next) => {
  console.error('Global error:', error.stack);
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});
```

**Error Response Standards:**
```javascript
// ✅ Consistent Error Format
{
  "success": false,
  "error": {
    "code": "AGENT_NOT_FOUND",
    "message": "Agent A001 not found",
    "details": {
      "agentId": "A001",
      "availableAgents": ["A002", "A003"]
    }
  },
  "timestamp": "2024-01-15T08:00:00Z"
}
```

---

## Slide 16: Input Validation
### ป้องกันข้อมูลที่ไม่ถูกต้อง

**Validation คือการป้องกันแนวหน้า:**
```javascript
// ❌ ไม่มี validation
app.patch('/api/agents/:id/status', (req, res) => {
  const agent = findAgent(req.params.id);
  agent.status = req.body.status; // อันตราย!
  res.json({ success: true });
});

// ✅ มี validation
app.patch('/api/agents/:id/status', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Available', 'Active', 'Wrap Up', 'Not Ready'];
  
  // ตรวจสอบ input
  if (!status) {
    return res.status(400).json({
      success: false,
      error: 'Status is required'
    });
  }
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      error: `Invalid status. Valid options: ${validStatuses.join(', ')}`
    });
  }
  
  // ถูกต้องแล้วค่อยประมวลผล
  const agent = findAgent(req.params.id);
  agent.status = status;
  res.json({ success: true, agent });
});
```

**Validation Library - Joi:**
```javascript
const Joi = require('joi');

const agentStatusSchema = Joi.object({
  status: Joi.string().valid('Available', 'Active', 'Wrap Up', 'Not Ready').required(),
  reason: Joi.string().optional()
});

const { error, value } = agentStatusSchema.validate(req.body);
```

---

## Slide 17: Environment Variables
### การจัดการ Configuration

**Environment Variables สำหรับ Security และ Flexibility:**

```javascript
// ❌ Hard-coded values
const server = app.listen(3001, () => {
  console.log('Server running on port 3001');
});

const dbConnection = 'mongodb://admin:password123@localhost:27017/callcenter';

// ✅ Environment Variables
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**.env File:**
```env
# Development Environment
NODE_ENV=development
PORT=3001
DATABASE_URL=mongodb://localhost:27017/callcenter_dev
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:3000

# API Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000

# WebSocket Settings
WS_HEARTBEAT_INTERVAL=30000
```

**ข้อดีของ Environment Variables:**
- **Security** - sensitive data ไม่อยู่ใน code
- **Flexibility** - config ต่างกันตาม environment
- **Deployment** - ง่ายต่อการ deploy

---

## Slide 18: Logging และ Monitoring
### การติดตาม Application Health

**Why Logging Matters?**
- **Debugging** - หาจุดที่เกิด error
- **Monitoring** - ติดตามการใช้งาน
- **Audit Trail** - บันทึกการเปลี่ยนแปลง
- **Performance Analysis** - วิเคราะห์ bottlenecks

```javascript
// 📝 Basic Logging
console.log('Agent A001 logged in'); // ❌ ไม่เพียงพอ

// ✅ Professional Logging with Winston
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console()
  ]
});

// การใช้งาน
logger.info('Agent status updated', {
  agentId: 'A001',
  oldStatus: 'Not Ready',
  newStatus: 'Available',
  supervisor: 'S001',
  timestamp: new Date().toISOString()
});

logger.error('Database connection failed', {
  error: error.message,
  stack: error.stack
});
```

**Log Levels:**
- **Error** - ข้อผิดพลาดที่ต้องแก้ทันที
- **Warn** - เหตุการณ์ที่น่าสังเกต
- **Info** - การทำงานปกติ
- **Debug** - รายละเอียดสำหรับ developer

---

## Slide 19: API Testing with Postman
### การทดสอบ API อย่างเป็นระบบ

**Postman = เครื่องมือทดสอบ API**

**Basic API Testing:**
```http
POST http://localhost:3001/api/agents/A001/status
Content-Type: application/json

{
  "status": "Available",
  "reason": "Ready for calls"
}
```

**Postman Collection Structure:**
```
Agent Wallboard API
├── Authentication
│   ├── Login Supervisor
│   └── Verify Token
├── Agent Management
│   ├── Get All Agents
│   ├── Get Agent by ID
│   ├── Agent Login
│   ├── Agent Logout
│   └── Update Agent Status
├── Messages
│   ├── Send Message
│   ├── Get Agent Messages
│   └── Mark Message as Read
└── Dashboard
    ├── Get Statistics
    └── Get Performance Metrics
```

**Automated Testing in Postman:**
```javascript
// Test Script ใน Postman
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has agent data", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
    pm.expect(jsonData.data).to.have.property('agentId');
});

// Set variable for next request
pm.test("Save agent ID", function () {
    const jsonData = pm.response.json();
    pm.environment.set("agentId", jsonData.data.agentId);
});
```

---

## Slide 20: Performance Considerations
### การเพิ่มประสิทธิภาพ

**Performance Best Practices:**

```javascript
// 1. 🚀 Async/Await แทน Callbacks
// ❌ Callback Hell
app.get('/api/agents', (req, res) => {
  getAgents((err, agents) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      getAgentStats(agents, (err, stats) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ agents, stats });
        }
      });
    }
  });
});

// ✅ Clean Async/Await
app.get('/api/agents', async (req, res) => {
  try {
    const agents = await getAgents();
    const stats = await getAgentStats(agents);
    res.json({ agents, stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. 💨 Caching
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes

app.get('/api/agents', async (req, res) => {
  const cacheKey = 'all_agents';
  let agents = cache.get(cacheKey);
  
  if (!agents) {
    agents = await getAgentsFromDB();
    cache.set(cacheKey, agents);
  }
  
  res.json({ data: agents, cached: !!cache.get(cacheKey) });
});
```

**Monitoring Metrics:**
- **Response Time** - < 200ms สำหรับ GET requests
- **Throughput** - requests per second
- **Memory Usage** - ไม่ควรเกิน memory leaks
- **CPU Usage** - ไม่ควรเกิน 80%

---

## Slide 21: Security Best Practices
### การรักษาความปลอดภัย

**Security Checklist:**

```javascript
// 1. 🛡️ Input Sanitization
const validator = require('validator');

app.post('/api/messages', (req, res) => {
  const { message } = req.body;
  
  // Sanitize input
  const cleanMessage = validator.escape(message);
  
  // Validate length
  if (cleanMessage.length > 500) {
    return res.status(400).json({
      error: 'Message too long (max 500 characters)'
    });
  }
  
  // Process clean message...
});

// 2. 🔒 Rate Limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api', limiter);

// 3. 🔑 Authentication Headers
const helmet = require('helmet');
app.use(helmet()); // Sets various HTTP headers

// 4. 📝 Request Logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  next();
});
```

**Common Security Vulnerabilities:**
- **SQL Injection** - ใช้ parameterized queries
- **XSS (Cross-site Scripting)** - sanitize input
- **CSRF (Cross-site Request Forgery)** - ใช้ CSRF tokens
- **Data Exposure** - ไม่ส่ง sensitive data ใน responses

---

## Slide 22: Project Structure Best Practices
### การจัดระเบียบโค้ด

**Professional Node.js Project Structure:**

```
agent-wallboard-backend/
├── 📁 controllers/          # Business logic
│   ├── agentController.js
│   ├── messageController.js
│   └── dashboardController.js
├── 📁 middleware/           # Custom middleware
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
├── 📁 models/              # Data models
│   ├── Agent.js
│   └── Message.js
├── 📁 routes/              # API routes
│   ├── agents.js
│   ├── messages.js
│   └── dashboard.js
├── 📁 services/            # Business services
│   ├── agentService.js
│   └── messageService.js
├── 📁 utils/               # Utility functions
│   ├── logger.js
│   └── validator.js
├── 📁 config/              # Configuration files
│   └── database.js
├── 📁 tests/               # Test files
│   ├── agents.test.js
│   └── messages.test.js
├── 📄 .env                 # Environment variables
├── 📄 .gitignore
├── 📄 package.json
└── 📄 server.js            # Main server file
```

**ข้อดีของการจัดระเบียบ:**
- **Separation of Concerns** - แต่ละไฟล์มีหน้าที่ชัดเจน
- **Maintainability** - ง่ายต่อการแก้ไขและพัฒนาต่อ
- **Testability** - ทดสอบได้แยกส่วน
- **Team Collaboration** - หลายคนทำงานร่วมกันได้

---

## Slide 23: MVC Pattern ใน Express.js
### Model-View-Controller Architecture

**MVC ใน Context ของ API Server:**

```javascript
// 📊 Model (Data Layer)
// models/Agent.js
class Agent {
  constructor(code, name, status) {
    this.code = code;
    this.name = name;
    this.status = status;
    this.loginTime = new Date();
  }
  
  updateStatus(newStatus) {
    this.status = newStatus;
    this.lastStatusChange = new Date();
  }
}

// 🎮 Controller (Business Logic)
// controllers/agentController.js
const agentController = {
  async getAllAgents(req, res) {
    try {
      const agents = await agentService.getAll();
      res.json({ success: true, data: agents });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
  
  async updateAgentStatus(req, res) {
    try {
      const { agentId } = req.params;
      const { status } = req.body;
      
      const agent = await agentService.updateStatus(agentId, status);
      res.json({ success: true, data: agent });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
};

// 🛣️ Routes (URL Mapping)
// routes/agents.js
const router = express.Router();
router.get('/', agentController.getAllAgents);
router.patch('/:agentId/status', agentController.updateAgentStatus);
```

**ไม่มี View Layer ใน API?**
- API Server ไม่มี traditional "View"
- JSON response เป็น "View" ของเรา
- Frontend (React/Electron) เป็น View Layer แยกต่างหาก

---

## Slide 24: Database Integration Preview
### เตรียมพร้อมสำหรับสัปดาห์หน้า

**ปัจจุบัน: In-Memory Data**
```javascript
// ❌ ข้อมูลหายเมื่อ restart server
let agents = [
  { code: 'A001', name: 'John', status: 'Available' },
  { code: 'A002', name: 'Jane', status: 'Active' }
];

app.get('/api/agents', (req, res) => {
  res.json({ data: agents }); // ข้อมูลจาก memory
});
```

**สัปดาห์หน้า: Database Integration**
```javascript
// ✅ ข้อมูลถาวรใน database
const Agent = require('../models/Agent');

app.get('/api/agents', async (req, res) => {
  try {
    const agents = await Agent.find(); // ข้อมูลจาก MongoDB
    res.json({ data: agents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Database Options สำหรับ Agent Wallboard:**
- **MongoDB** - NoSQL, flexible schema, ดีสำหรับ real-time data
- **PostgreSQL** - SQL, ACID compliance, complex queries
- **Redis** - In-memory, caching, session storage
- **Hybrid Approach** - MongoDB + Redis + MSSQL

---

## Slide 25: API Documentation
### การเขียน Documentation ที่ดี

**API Documentation คือ Contract:**

```javascript
/**
 * @api {patch} /api/agents/:agentId/status Update Agent Status
 * @apiName UpdateAgentStatus
 * @apiGroup Agents
 * 
 * @apiParam {String} agentId Agent's unique identifier
 * 
 * @apiBody {String="Available","Active","Wrap Up","Not Ready"} status New agent status
 * @apiBody {String} [reason] Optional reason for status change
 * 
 * @apiSuccess {Boolean} success Response status
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Agent data
 * @apiSuccess {String} data.agentId Agent ID
 * @apiSuccess {String} data.status Updated status
 * @apiSuccess {String} data.timestamp Update timestamp
 * 
 * @apiError (400 Bad Request) {Object} error Invalid status value
 * @apiError (404 Not Found) {Object} error Agent not found
 * 
 * @apiExample {json} Request Example:
 * {
 *   "status": "Available",
 *   "reason": "Ready for calls"
 * }
 * 
 * @apiExample {json} Success Response:
 * {
 *   "success": true,
 *   "message": "Agent status updated successfully",
 *   "data": {
 *     "agentId": "A001",
 *     "status": "Available",
 *     "timestamp": "2024-01-15T08:00:00Z"
 *   }
 * }
 */
```

**Documentation Tools:**
- **Postman** - Generate documentation from collections
- **Swagger/OpenAPI** - Industry standard
- **API Blueprint** - Markdown-based
- **JSDoc** - Code comments เป็น documentation

---

## Slide 26: Testing Strategies
### การทดสอบ Backend APIs

**Types of Testing:**

```javascript
// 1. 🧪 Unit Testing (ทดสอบ function เดี่ยว)
// tests/agentService.test.js
const { expect } = require('chai');
const agentService = require('../services/agentService');

describe('AgentService', () => {
  it('should update agent status', () => {
    const agent = { code: 'A001', status: 'Not Ready' };
    const result = agentService.updateStatus(agent, 'Available');
    
    expect(result.status).to.equal('Available');
    expect(result.lastStatusChange).to.be.a('date');
  });
});

// 2. 🔗 Integration Testing (ทดสอบ API endpoints)
// tests/agents.integration.test.js
const request = require('supertest');
const app = require('../server');

describe('GET /api/agents', () => {
  it('should return list of agents', async () => {
    const response = await request(app)
      .get('/api/agents')
      .expect(200);
    
    expect(response.body.success).to.be.true;
    expect(response.body.data).to.be.an('array');
  });
});

// 3. 🌐 End-to-End Testing (ทดสอบ workflow สมบูรณ์)
describe('Agent Status Update Workflow', () => {
  it('should update status and broadcast to WebSocket', async () => {
    // 1. Agent login
    // 2. Update status  
    // 3. Verify WebSocket broadcast
    // 4. Verify database update
  });
});
```

**Testing Best Practices:**
- **Test-Driven Development (TDD)** - เขียน test ก่อน code
- **Code Coverage** - test ครอบคลุม code อย่างน้อย 80%
- **Mocking** - mock external dependencies
- **Continuous Integration** - run tests อัตโนมัติ

---

## Slide 27: Deployment Considerations
### เตรียมพร้อมสำหรับ Production

**Development vs Production:**

```javascript
// 🛠️ Development Environment
const config = {
  port: 3001,
  cors: { origin: '*' }, // เปิดทุก origins
  logging: 'debug',
  database: 'mongodb://localhost:27017/callcenter_dev'
};

// 🚀 Production Environment  
const config = {
  port: process.env.PORT || 80,
  cors: { 
    origin: ['https://callcenter.company.com'],
    credentials: true 
  },
  logging: 'error',
  database: process.env.DATABASE_URL // MongoDB Atlas
};

// Environment Detection
if (process.env.NODE_ENV === 'production') {
  // Production-only middleware
  app.use(compression()); // Gzip compression
  app.use(helmet()); // Security headers
}
```

**Deployment Platforms:**
- **Heroku** - ง่าย, Git-based deployment
- **Digital Ocean** - VPS, ปรับแต่งได้มาก
- **AWS EC2** - Scalable, enterprise-grade
- **Vercel/Netlify** - Serverless functions
- **Railway** - Modern alternative to Heroku

**Pre-deployment Checklist:**
- ✅ Environment variables configured
- ✅ Database connection tested
- ✅ Error handling implemented
- ✅ Security headers enabled
- ✅ CORS properly configured
- ✅ Logging system in place

---

## Slide 28: Monitoring และ Maintenance
### การดูแลระบบหลัง Deploy

**Application Health Monitoring:**

```javascript
// 🏥 Health Check Endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version,
    environment: process.env.NODE_ENV
  };
  
  try {
    // ทดสอบ database connection
    await pingDatabase();
    health.database = 'connected';
  } catch (error) {
    health.database = 'disconnected';
    health.status = 'ERROR';
  }
  
  const statusCode = health.status === 'OK' ? 200 : 503;
  res.status(statusCode).json(health);
});

// 📊 Performance Metrics
app.get('/metrics', (req, res) => {
  const metrics = {
    totalRequests: global.requestCount || 0,
    activeConnections: global.activeConnections || 0,
    averageResponseTime: global.avgResponseTime || 0,
    errorRate: global.errorRate || 0,
    lastUpdated: new Date().toISOString()
  };
  
  res.json(metrics);
});
```

**Monitoring Tools:**
- **PM2** - Process manager สำหรับ Node.js
- **New Relic** - Application performance monitoring
- **DataDog** - Infrastructure monitoring
- **Grafana + Prometheus** - Open-source monitoring stack

**Maintenance Tasks:**
- **Log Rotation** - จัดการ log files ไม่ให้เต็ม disk
- **Security Updates** - update dependencies เป็นประจำ
- **Performance Tuning** - optimize based on usage patterns
- **Backup Strategy** - สำรองข้อมูลสม่ำเสมอ

---

## Slide 29: Real-world Challenges
### ปัญหาที่พบบ่อยใน Production

**Challenge 1: การจัดการ WebSocket Connections**
```javascript
// ❌ Problem: Memory leak จาก connections ที่ไม่ปิด
io.on('connection', (socket) => {
  console.log('New connection:', socket.id);
  
  // หากไม่จัดการ disconnection ให้ดี
  // connections จะคั้งค่าอยู่ใน memory
});

// ✅ Solution: Proper connection management
io.on('connection', (socket) => {
  const agentId = socket.handshake.query.agentId;
  
  // เก็บ mapping ระหว่าง agent กับ socket
  global.agentSockets.set(agentId, socket.id);
  
  socket.on('disconnect', () => {
    console.log('Agent disconnected:', agentId);
    global.agentSockets.delete(agentId);
    
    // Notify supervisors about disconnection
    socket.broadcast.emit('agentOffline', { agentId });
  });
  
  // Heartbeat mechanism
  const heartbeat = setInterval(() => {
    socket.emit('ping');
  }, 30000);
  
  socket.on('disconnect', () => {
    clearInterval(heartbeat);
  });
});
```

**Challenge 2: Race Conditions**
```javascript
// ❌ Problem: หลาย requests มาพร้อมกัน
let agentCallCount = 0;

app.post('/api/agents/:id/call-completed', (req, res) => {
  agentCallCount++; // Race condition!
  res.json({ totalCalls: agentCallCount });
});

// ✅ Solution: Atomic operations
const Redis = require('redis');
const client = Redis.createClient();

app.post('/api/agents/:id/call-completed', async (req, res) => {
  const newCount = await client.incr(`agent:${req.params.id}:calls`);
  res.json({ totalCalls: newCount });
});
```

**Challenge 3: Error Recovery**
```javascript
// ✅ Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing HTTP server...');
  
  server.close(() => {
    console.log('HTTP server closed.');
    
    // Close database connections
    mongoose.connection.close(() => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  });
});
```

---

## Slide 30: สรุปและเตรียมตัวสำหรับสัปดาห์หน้า
### สิ่งที่เราได้เรียนรู้และก้าวต่อไป

### 🎯 สิ่งที่เราเรียนรู้วันนี้

**1. Node.js Fundamentals**
- JavaScript runtime บน server
- Event-driven และ non-blocking I/O
- NPM ecosystem

**2. Express.js Framework**
- Web framework สำหรับ Node.js
- Middleware pattern
- REST API design

**3. Agent Wallboard System Context**
- APIs สำหรับ agent management
- Real-time communication ด้วย WebSocket
- Error handling และ validation

**4. Production Readiness**
- Security best practices
- Testing strategies
- Deployment considerations

### 🚀 เตรียมตัวสำหรับสัปดาห์หน้า

**สัปดาห์ที่ 8: Database Integration & MongoDB**

**สิ่งที่จะเรียนต่อ:**
```javascript
// จากแบบนี้ (In-Memory)
let agents = [
  { code: 'A001', name: 'John', status: 'Available' }
];

// ไปเป็นแบบนี้ (Database)
const agent = await Agent.findOne({ code: 'A001' });
agent.status = 'Active';
await agent.save();
```

**Topics สำหรับสัปดาห์หน้า:**
1. **Database Design Principles** - SQL vs NoSQL
2. **MongoDB** - Document database, collections, queries
3. **Mongoose ODM** - Object Document Mapping
4. **Data Modeling** - Schema design สำหรับ Agent Wallboard
5. **Database Integration** - เชื่อมต่อ Express กับ MongoDB

### 📝 การบ้าน

**เตรียมความพร้อม:**
1. ติดตั้ง MongoDB Community Edition
2. ลองใช้ MongoDB Compass (GUI tool)
3. Review Node.js concepts ที่เรียนวันนี้
4. คิดถึง data structure ของ Agent Wallboard System

### 🎉 Key Takeaways

- **Backend เป็นหัวใจ** ของ modern applications
- **Node.js เหมาะกับ real-time systems** เช่น call center
- **Express.js ทำให้การสร้าง API ง่ายขึ้น**
- **Good architecture ต้องคิดถึง scalability และ maintenance**
- **Testing และ monitoring สำคัญสำหรับ production systems**

**พร้อมแล้วสำหรับการสร้าง Full-Stack Application!** 🚀

---

## 🤔 คำถามทบทวน

**Q1: ทำไม Node.js เหมาะกับ Agent Wallboard System?**
A: เพราะมี event-driven architecture ที่เหมาะกับ real-time communication และ I/O intensive operations

**Q2: REST API กับ WebSocket ต่างกันอย่างไร?**
A: REST API เป็น request-response pattern สำหรับ CRUD operations, WebSocket เป็น bidirectional communication สำหรับ real-time updates

**Q3: Middleware ใน Express.js คืออะไร?**
A: ฟังก์ชันที่รันระหว่าง request และ response เพื่อจัดการ cross-cutting concerns เช่น logging, authentication, validation

**Q4: Environment Variables สำคัญอย่างไร?**
A: ช่วยแยก configuration จาก code, เพิ่มความปลอดภัย, และทำให้ deploy ง่ายขึ้น

**มีคำถามเพิ่มเติมไหม?** 🙋‍♂️