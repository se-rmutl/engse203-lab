# Agent Wallboard System - 3 Phase Plan

## 📋 **Phase Distribution**

| Phase | Focus | Duration | Complexity | Key Learning |
|-------|-------|----------|------------|-------------|
| Phase 1 | Basic API + CRUD | 4 hrs | ⭐ Beginner | Express.js, RESTful API, In-memory storage|
| Phase 2 | Database + Simple WebSocket | 4 hrs | ⭐⭐ Intermediate | MongoDB basics, Real-time updates |
| Phase 3 | Authentication + Production | 4 hrs | ⭐⭐⭐ Advanced | JWT basics, Deployment ready |


### 📈 **Complexity Progression:**

```
Phase 1: Single file (server.js) ← Start here
    ↓
Phase 2: server.js + MongoDB ← Add persistence  
    ↓
Phase 3: server.js + Auth + Deploy ← Production ready
```

### 🎓 **Learning Outcomes:**

หลังจบทั้ง 3 Phase นักศึกษาจะสามารถ:

1. **สร้าง REST API** ที่สมบูรณ์
2. **จัดการ Database** พื้นฐาน
3. **ทำ Real-time Features** ด้วย WebSocket
4. **Authentication System** แบบ JWT
5. **Deploy Production** บน cloud platform
6. **API Documentation** สำหรับผู้ใช้งาน

---

## 🏆 **Benefits of Plan**

### ✅ **For Students:**
- เรียนรู้แบบ progressive (ไม่ shock จากความซับซ้อน)
- ได้ working system จริงๆ ในแต่ละ Phase
- มีความมั่นใจจากการทำสำเร็จ
- พร้อมสำหรับการทำงานจริง

### ✅ **For Industry:**
- นักศึกษาจบมามีทักษะที่ใช้งานได้จริง
- เข้าใจ full-stack development workflow
- ประสบการณ์ deployment และ production
- Mindset ในการแก้ปัญหาแบบ systematic

---

## 🗄️ **Phase 1: Agent Wallboard Basic API Foundation**

## 📋 **Phase Distribution**

| Phase | Focus | Duration | Complexity | Key Learning |
|-------|-------|----------|------------|-------------|
| **Phase 1** | **Basic API + CRUD** | **4 hrs** | ⭐ **Beginner** | **Express.js, RESTful API, In-memory storage** |
| Phase 2 | Database + Simple WebSocket | 4 hrs | ⭐⭐ Intermediate | MongoDB basics, Real-time updates |
| Phase 3 | Authentication + Production | 4 hrs | ⭐⭐⭐ Advanced | JWT basics, Deployment ready |

---

## 🎯 Learning Objectives (ง่ายและชัดเจน)

หลังจบ Workshop นักศึกษาจะ:
1. **สร้าง Express server** พร้อม basic routes ได้
2. **ทำ CRUD operations** แบบ in-memory storage
3. **จัดการ Agent status** ตาม business rules  
4. **ทดสอบ API** ด้วย Postman อย่างเป็นระบบ
5. **เข้าใจ project structure** แบบ professional

---

## ⏰ **HOUR 1: เข้าใจและ Setup** (60 นาที)

### 🧠 Business Understanding (15 นาที)

**Agent Wallboard คืออะไร?**
ระบบติดตามสถานะพนักงาน Call Center แบบ real-time

**Agent มี 4 สถานะ:**
- 🟢 **Available** - พร้อมรับสาย
- 🔴 **Busy** - กำลังคุยกับลูกค้า  
- 🟡 **Break** - พักเบรก
- ⚫ **Offline** - ออฟไลน์

**กฎการเปลี่ยนสถานะ:**
```
Available ↔ Busy ↔ Break → Offline
```

#### ✅ Checkpoint 1:
- [ ] เข้าใจ 4 สถานะของ Agent
- [ ] รู้กฎการเปลี่ยนสถานะ

---

### 🔧 Project Setup (25 นาที)

```bash
# 1. สร้างโปรเจกต์
mkdir agent-wallboard-api
cd agent-wallboard-api

# 2. Initialize npm (กด Enter หมด ไม่ต้องตอบอะไร)
npm init -y

# 3. ติดตั้ง packages
npm install express cors dotenv
npm install --save-dev nodemon

# 4. สร้าง files พื้นฐาน
touch server.js .env
echo "node_modules/\n.env" > .gitignore
```

**ตั้งค่า package.json:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

**ตั้งค่า .env:**
```
PORT=3001
NODE_ENV=development
```

#### ✅ Checkpoint 2:
- [ ] โฟลเดอร์สร้างเสร็จ
- [ ] packages ติดตั้งเสร็จ
- [ ] files พื้นฐานพร้อม

---

### 🚀 Basic Express Server (20 นาที)

**server.js แบบเริ่มต้น:**
```javascript
// นักศึกษาพิมพ์ตาม step by step
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ทดสอบ route แรก
app.get('/', (req, res) => {
  res.json({
    message: 'Agent Wallboard API is running! 🚀',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

**ทดสอบ:**
```bash
npm run dev
# เปิด browser: http://localhost:3001
```

#### ✅ Checkpoint 3:
- [ ] Server รันได้ไม่มี error
- [ ] เห็นข้อความใน browser
- [ ] /health endpoint ทำงาน

---

## ⏰ **HOUR 2: Agent Data & CRUD** (60 นาที)

### 📊 Agent Data Model (15 นาที)

**เพิ่มใน server.js:**
```javascript
// Agent data structure (ใส่หลัง const PORT)
let agents = [
  {
    id: 1,
    agentCode: 'A001',
    name: 'John Doe',
    email: 'john@company.com',
    status: 'Available',
    department: 'Sales'
  },
  {
    id: 2,
    agentCode: 'A002', 
    name: 'Jane Smith',
    email: 'jane@company.com',
    status: 'Busy',
    department: 'Support'
  }
];

let nextId = 3; // สำหรับ auto increment
```

---

### 📡 Basic CRUD Routes (45 นาที)

#### GET - ดูรายการ Agents (10 นาที)
```javascript
// เพิ่มใน server.js หลัง health route
app.get('/api/agents', (req, res) => {
  res.json({
    success: true,
    count: agents.length,
    data: agents
  });
});
```

**ทดสอบ:** http://localhost:3001/api/agents

---

#### GET by ID - ดู Agent เฉพาะ (10 นาที)
```javascript
app.get('/api/agents/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const agent = agents.find(a => a.id === id);
  
  if (!agent) {
    return res.status(404).json({
      success: false,
      message: 'Agent not found'
    });
  }
  
  res.json({
    success: true,
    data: agent
  });
});
```

**ทดสอบ:** http://localhost:3001/api/agents/1

---

#### POST - สร้าง Agent ใหม่ (15 นาที)
```javascript
app.post('/api/agents', (req, res) => {
  const { agentCode, name, email, department } = req.body;
  
  // ตรวจสอบข้อมูลพื้นฐาน
  if (!agentCode || !name || !email) {
    return res.status(400).json({
      success: false,
      message: 'agentCode, name, email are required'
    });
  }
  
  // สร้าง agent ใหม่
  const newAgent = {
    id: nextId++,
    agentCode,
    name,
    email,
    department: department || 'General',
    status: 'Available'
  };
  
  agents.push(newAgent);
  
  res.status(201).json({
    success: true,
    message: 'Agent created successfully',
    data: newAgent
  });
});
```

---

#### PUT - แก้ไข Agent (10 นาที)
```javascript
app.put('/api/agents/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const agentIndex = agents.findIndex(a => a.id === id);
  
  if (agentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Agent not found'
    });
  }
  
  const { name, email, department } = req.body;
  
  // อัพเดทข้อมูล (ไม่รวม status)
  if (name) agents[agentIndex].name = name;
  if (email) agents[agentIndex].email = email;
  if (department) agents[agentIndex].department = department;
  
  res.json({
    success: true,
    message: 'Agent updated successfully',
    data: agents[agentIndex]
  });
});
```

#### ✅ Checkpoint 4:
- [ ] GET /api/agents ทำงาน
- [ ] GET /api/agents/:id ทำงาน  
- [ ] POST /api/agents ทำงาน
- [ ] PUT /api/agents/:id ทำงาน

---

## ⏰ **HOUR 3: Status Management** (60 นาที)

### 🔄 Status Update Route (30 นาที)

```javascript
// Status constants
const VALID_STATUSES = ['Available', 'Busy', 'Break', 'Offline'];

// Status transition rules
const VALID_TRANSITIONS = {
  'Available': ['Busy', 'Break', 'Offline'],
  'Busy': ['Available', 'Break'],
  'Break': ['Available', 'Offline'],
  'Offline': ['Available']
};

// PATCH - อัพเดท Agent Status
app.patch('/api/agents/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const agentIndex = agents.findIndex(a => a.id === id);
  
  // ตรวจสอบ Agent มีอยู่ไหม
  if (agentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Agent not found'
    });
  }
  
  // ตรวจสอบ Status ถูกต้องไหม
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Valid: ${VALID_STATUSES.join(', ')}`
    });
  }
  
  const agent = agents[agentIndex];
  const currentStatus = agent.status;
  
  // ตรวจสอบการเปลี่ยนสถานะได้ไหม
  if (!VALID_TRANSITIONS[currentStatus].includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Cannot change from ${currentStatus} to ${status}`
    });
  }
  
  // อัพเดทสถานะ
  agent.status = status;
  
  console.log(`Agent ${agent.agentCode}: ${currentStatus} → ${status}`);
  
  res.json({
    success: true,
    message: `Status updated to ${status}`,
    data: agent
  });
});
```

**ทดสอบใน Postman:**
- Method: PATCH
- URL: http://localhost:3001/api/agents/1/status
- Body (JSON):
```json
{
  "status": "Busy"
}
```

---

### 📊 Status Summary (20 นาที)

```javascript
// GET - สรุปสถานะทั้งหมด
app.get('/api/dashboard/summary', (req, res) => {
  const total = agents.length;
  const statusCount = {};
  
  // นับจำนวนแต่ละสถานะ
  VALID_STATUSES.forEach(status => {
    statusCount[status] = agents.filter(a => a.status === status).length;
  });
  
  // คิดเปอร์เซ็นต์
  const statusPercent = {};
  Object.keys(statusCount).forEach(status => {
    statusPercent[status] = total > 0 ? Math.round((statusCount[status] / total) * 100) : 0;
  });
  
  res.json({
    success: true,
    data: {
      totalAgents: total,
      statusCount,
      statusPercent,
      timestamp: new Date().toISOString()
    }
  });
});
```

---

### 🧪 Basic Testing (10 นาที)

**ทดสอบใน Browser:**
1. GET http://localhost:3001/api/agents
2. GET http://localhost:3001/api/dashboard/summary

**เตรียม Postman:**
- สร้าง Collection ชื่อ "Agent Wallboard API"
- เพิ่ม Environment: baseUrl = http://localhost:3001

#### ✅ Checkpoint 5:
- [ ] Status update API ทำงาน
- [ ] Status validation ทำงาน
- [ ] Dashboard summary ทำงาน
- [ ] Console log แสดงการเปลี่ยนสถานะ

---

## ⏰ **HOUR 4: Testing & Finishing** (60 นาที)

### 🧪 Postman Testing (25 นาที)

**สร้าง Test Cases ใน Postman:**

1. **Get All Agents**
   - GET {{baseUrl}}/api/agents
   - ✅ Status 200, มี data array

2. **Create Agent**  
   - POST {{baseUrl}}/api/agents
   - Body:
   ```json
   {
     "agentCode": "A999",
     "name": "Test Agent", 
     "email": "test@company.com",
     "department": "Sales"
   }
   ```
   - ✅ Status 201, agent ถูกสร้าง

3. **Update Status**
   - PATCH {{baseUrl}}/api/agents/1/status
   - Body: `{"status": "Busy"}`
   - ✅ Status 200, สถานะเปลี่ยน

4. **Invalid Status**
   - PATCH {{baseUrl}}/api/agents/1/status  
   - Body: `{"status": "Sleeping"}`
   - ✅ Status 400, error message

5. **Dashboard**
   - GET {{baseUrl}}/api/dashboard/summary
   - ✅ Status 200, มี statistics

---

### 🔧 Error Handling (15 นาที)

```javascript
// เพิ่มใน server.js ก่อน app.listen()

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});
```

---

### 📝 Documentation (10 นาที)

**สร้าง README.md:**
```markdown
# Agent Wallboard API - Phase 1

## 🚀 Quick Start
```bash
npm install
npm run dev
```

## 📡 API Endpoints

### Agents
- GET /api/agents - รายการ agents ทั้งหมด
- GET /api/agents/:id - ข้อมูล agent เฉพาะ  
- POST /api/agents - สร้าง agent ใหม่
- PUT /api/agents/:id - แก้ไขข้อมูล agent
- PATCH /api/agents/:id/status - เปลี่ยนสถานะ

### Dashboard  
- GET /api/dashboard/summary - สรุปสถานะทั้งหมด

## 🧪 Testing
Import Postman collection: `Agent_Wallboard_API.postman_collection.json`
```

---

### 🎁 Git Setup (10 นาที)

```bash
# Initialize git
git init
git add .
git commit -m "feat: Agent Wallboard API Phase 1 complete

✅ CRUD operations for agents
✅ Status management with business logic  
✅ Dashboard summary statistics
✅ Error handling and validation
✅ Postman testing ready"

# Export Postman Collection
# File → Export → Collection v2.1
# บันทึกเป็น Agent_Wallboard_API.postman_collection.json
```

#### ✅ Final Checkpoint:
- [ ] ทุก API endpoints ทำงาน
- [ ] Postman collection ครบ  
- [ ] Error handling ทำงาน
- [ ] README.md เสร็จ
- [ ] Git repository พร้อม

---

## 🎯 **20% Challenge งานบ้าน**

### เลือกทำ 1-2 ข้อ (ไม่บังคับ แต่ได้คะแนนพิเศษ):

#### 1. **DELETE Agent** (⭐)
```javascript
// DELETE /api/agents/:id - ลบ agent
app.delete('/api/agents/:id', (req, res) => {
  // TODO: Implement delete logic
});
```

#### 2. **Agent Search** (⭐⭐)
```javascript
// GET /api/agents/search?q=john
app.get('/api/agents/search', (req, res) => {
  const query = req.query.q;
  // TODO: Search in name, email, agentCode
});
```

#### 3. **Status History** (⭐⭐⭐)
```javascript
// Track status changes
let statusHistory = [];

// GET /api/agents/:id/history - ประวัติการเปลี่ยนสถานะ
app.get('/api/agents/:id/history', (req, res) => {
  // TODO: Return status change history
});
```

### 📤 การส่งงาน:
1. Push code ขึ้น GitHub
2. Export Postman collection
3. ส่ง repository URL + Postman collection file
4. Screenshot API testing results

---

## 🏆 Grading Rubric

| หัวข้อ | คะแนน | รายละเอียด |
|--------|-------|-----------|
| **Basic CRUD** | 40% | GET, POST, PUT ทำงานถูกต้อง |
| **Status Management** | 25% | PATCH status พร้อม validation |
| **Dashboard** | 15% | Summary statistics API |
| **Testing** | 10% | Postman collection ครบถ้วน |
| **Code Quality** | 10% | Clean code, proper structure |

**Bonus (งานบ้าน):** +5-15% ตาม complexity

---

## 📚 **สรุป & Next Steps**

### ✅ **สิ่งที่ทำได้แล้ว:**
- Express.js server พร้อม middleware
- Agent CRUD operations แบบ in-memory  
- Status management พร้อม business rules
- Dashboard summary statistics
- Error handling และ validation
- API testing ด้วย Postman

### 🚀 **Phase 2 Preview:**
- MongoDB database integration
- WebSocket real-time updates  
- Message system (Supervisor ↔ Agents)
- JWT Authentication

### 💡 **Tips:**
1. เริ่มจาก basic ให้ทำงานได้ก่อน
2. ทดสอบทุกครั้งที่เพิ่ม feature  
3. อ่าน error message ให้เข้าใจ
4. ใช้ console.log() debug เมื่อติดปัญหา

---

## 🎉 **ยินดีด้วย!**

คุณได้สร้าง **Agent Wallboard Backend API** แบบ professional level แล้ว! 

**Ready for Phase 2:** Database & Real-time Features 🚀

1. **Phase 1**: Already completed and working great! ✅
2. **Phase 2**: Ready to implement with simplified approach
3. **Phase 3**: Focused on practical authentication + deployment



**Happy Coding! 💻✨**