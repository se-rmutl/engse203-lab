# Phase 1 Enhanced: Agent Wallboard API with Professional Structure

## 📋 **Phase 1 ภาพรวม**

### 🎯 **Phase 1 ในระบบ Agent Wallboard ทั้งหมด**

```
┌──────────────────────────────────┐
│   Frontend (Desktop Apps)        │  ← Phase 4: Electron.js
│   • Agent App • Supervisor App   │
└───────────────┬──────────────────┘
                │ HTTP/REST + WebSocket
                ▼
┌──────────────────────────────────┐
│   Backend API (Phase 1 ตรงนี้!)    │  ← Node.js + Express
│   • REST APIs • Validation       │
└───────────────┬──────────────────┘
                │ Database Connections
                ▼
┌──────────────────────────────────┐
│   Database (Phase 2–3)           │  ← MSSQL + MongoDB
└──────────────────────────────────┘

```

### 📚 **สิ่งที่จะได้เรียนรู้ใน Phase 1:**
- ✅ **Professional Node.js API Development** - ✅ **MVC Architecture Pattern**
- ✅ **Input Validation with Joi**
- ✅ **Error Handling & Middleware**
- ✅ **API Testing & Documentation**
- ✅ **Code Organization Best Practices**

### ⏰ **Time Allocation (4.5 ชั่วโมง):**
- **Hour 1:** Setup + Project Structure (70 นาที)
- **Hour 2:** Models + Controllers (70 นาที)  
- **Hour 3:** Validation + Error Handling (70 นาที)
- **Hour 4:** Testing + Integration (70 นาที)

---

## ⏰ **HOUR 1: Project Setup & Structure (70 นาที)**

### 🚀 **Step 1: Project Initialization (15 นาที)**

```bash
# 1. สร้างโปรเจค
mkdir agent-wallboard-api
cd agent-wallboard-api

# 2. Initialize npm
npm init -y

# 3. ติดตั้ง dependencies
npm install express cors dotenv joi helmet morgan
npm install --save-dev nodemon

# 4. สร้าง folder structure
mkdir controllers middleware models routes utils
touch server.js .env .gitignore README.md
````

### 📁 **Step 2: Professional Project Structure (15 นาที)**

```
agent-wallboard-api/
├── 📁 controllers/          # Business logic
│   └── agentController.js   
├── 📁 middleware/          # Request processing
│   ├── validation.js       
│   └── errorHandler.js     
├── 📁 models/             # Data models  
│   └── Agent.js            
├── 📁 routes/             # API routes
│   ├── agents.js           
│   └── index.js            
├── 📁 utils/              # Helper functions
│   ├── constants.js        
│   └── apiResponse.js      
├── 📄 server.js           # Main application
├── 📄 package.json
├── 📄 .env                # Environment variables
├── 📄 .env.example        # Environment template
└── 📄 README.md          # Documentation
```

### ⚙️ **Step 3: Environment Configuration (10 นาที)**

**สร้างไฟล์ `.env.example`:**

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration  
FRONTEND_URL=http://localhost:3000

# Future: Database Configuration (Phase 2)
# DB_CONNECTION_STRING=your-database-url
# JWT_SECRET=your-super-secret-key
```

**สร้างไฟล์ `.env`:**

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**สร้างไฟล์ `.gitignore`:**

```gitignore
node_modules/
.env
.DS_Store
*.log
logs/
dist/
```

### 📦 **Step 4: Package.json Scripts (10 นาที)**

**อัพเดท `package.json`:**

```json
{
  "name": "agent-wallboard-api-enhanced",
  "version": "1.0.0",
  "description": "Agent Wallboard API with Professional Structure",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo 'Run Postman tests - see README.md'",
    "docs": "echo 'API Documentation: http://localhost:3001/api/docs'"
  },
  "keywords": ["agent", "wallboard", "api", "callcenter"],
  "author": "Your Name",
  "dependencies": {
    "express": "^4.18.2", 
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "joi": "^17.11.0",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### 🔧 **Step 5: Core Constants (20 นาที)**

**สร้างไฟล์ `utils/constants.js`:**

```javascript
// utils/constants.js - ค่าคงที่ของระบบ
const AGENT_STATUS = {
  AVAILABLE: 'Available',
  BUSY: 'Busy',
  WRAP: 'Wrap', 
  BREAK: 'Break',
  NOT_READY: 'Not Ready',
  OFFLINE: 'Offline'
};

const DEPARTMENTS = [
  'Sales',
  'Support', 
  'Technical',
  'General',
  'Supervisor'
];

// กฎการเปลี่ยนสถานะที่อนุญาต
const VALID_STATUS_TRANSITIONS = {
  'Available': ['Busy', 'Break', 'Not Ready', 'Offline'],
  'Busy': ['Available', 'Wrap', 'Not Ready'],
  'Wrap': ['Available', 'Not Ready'],
  'Break': ['Available', 'Not Ready'],
  'Not Ready': ['Available', 'Offline'],
  'Offline': ['Available']
};

const API_MESSAGES = {
  AGENT_NOT_FOUND: 'Agent not found',
  AGENT_CREATED: 'Agent created successfully',
  AGENT_UPDATED: 'Agent updated successfully',
  AGENT_DELETED: 'Agent deleted successfully',
  STATUS_UPDATED: 'Agent status updated successfully',
  VALIDATION_FAILED: 'Validation failed',
  INTERNAL_ERROR: 'Internal server error'
};

module.exports = { 
  AGENT_STATUS, 
  DEPARTMENTS, 
  VALID_STATUS_TRANSITIONS,
  API_MESSAGES
};
```

**สร้างไฟล์ `utils/apiResponse.js`:**

```javascript
// utils/apiResponse.js - Consistent API responses
const sendSuccess = (res, message, data = null, statusCode = 200) => {
  const response = {
    success: true,
    message,
    timestamp: new Date().toISOString()
  };

  if (data !== null) {
    if (Array.isArray(data)) {
      response.count = data.length;
    }
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

const sendError = (res, message, statusCode = 400, errors = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

module.exports = { sendSuccess, sendError };
```

-----

## ⏰ **HOUR 2: Models & Controllers (70 นาที)**

### 📊 **Step 6: Enhanced Agent Model (25 นาที - อธิบาย + ให้ code สำเร็จ)**

**สร้างไฟล์ `models/Agent.js`:**

```javascript
// models/Agent.js - Enhanced Agent model with methods
// 👉 ไฟล์นี้ใช้สร้าง "Agent" object สำหรับเก็บข้อมูลของพนักงาน call center
// 👉 ใน Phase 1 ยังไม่ใช้ Database จริง แต่จะเก็บใน memory (Map) ก่อน

class Agent {
  constructor(data) {
    // สร้าง unique id (ถ้าไม่มีส่งเข้ามา) ด้วย generateId()
    this.id = data.id || this.generateId();

    // รหัสประจำตัว agent (เช่น A001)
    this.agentCode = data.agentCode;

    // ชื่อ-อีเมล-แผนก
    this.name = data.name;
    this.email = data.email;
    this.department = data.department || 'General';

    // ความสามารถ (skills เช่น ภาษา, ความรู้เฉพาะด้าน)
    this.skills = data.skills || [];

    // สถานะเริ่มต้น = Available
    this.status = data.status || 'Available';

    // บ่งบอกว่า agent ยัง active อยู่ไหม
    this.isActive = data.isActive !== undefined ? data.isActive : true;

    // เวลาที่ login เข้าระบบ
    this.loginTime = data.loginTime || null;

    // เวลาล่าสุดที่เปลี่ยนสถานะ
    this.lastStatusChange = new Date();

    // เก็บประวัติการเปลี่ยนสถานะทั้งหมด
    this.statusHistory = data.statusHistory || [];

    // เวลาสร้างและอัพเดทล่าสุด
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
  }

  // ฟังก์ชันสร้าง id แบบสุ่ม ใช้ใน Phase 1 (ยังไม่ใช้ database)
  generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  }

  // ฟังก์ชันอัพเดทสถานะ พร้อมบันทึกประวัติ
  updateStatus(newStatus, reason = null) {
    this.statusHistory.push({
      from: this.status,
      to: newStatus,
      reason,
      timestamp: new Date()
    });

    this.status = newStatus;
    this.lastStatusChange = new Date();
    this.updatedAt = new Date();
  }

  // ฟังก์ชันส่งข้อมูลออกมาในรูป JSON (สำหรับ API response)
  toJSON() {
    return {
      id: this.id,
      agentCode: this.agentCode,
      name: this.name,
      email: this.email,
      department: this.department,
      skills: this.skills,
      status: this.status,
      isActive: this.isActive,
      loginTime: this.loginTime,
      lastStatusChange: this.lastStatusChange,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // ฟังก์ชันให้ admin ดูประวัติการเปลี่ยนสถานะ
  getStatusHistory() {
    return this.statusHistory;
  }
}

// ✅ เก็บ agent ทั้งหมดไว้ใน Map (ทำหน้าที่เหมือน database ชั่วคราว)
const agents = new Map();

// ✅ สร้าง sample data สำหรับทดสอบ API
function initializeSampleData() {
  const sampleAgents = [
    {
      agentCode: 'A001',
      name: 'John Doe', 
      email: 'john.doe@company.com',
      department: 'Sales',
      skills: ['Thai', 'English', 'Sales'],
      status: 'Available'
    },
    {
      agentCode: 'A002',
      name: 'Jane Smith',
      email: 'jane.smith@company.com', 
      department: 'Support',
      skills: ['Thai', 'Technical Support'],
      status: 'Busy'
    },
    {
      agentCode: 'S001',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      department: 'Technical', 
      skills: ['English', 'Technical', 'Supervisor'],
      status: 'Available'
    }
  ];

  // เพิ่ม agent ทั้งหมดเข้า Map
  sampleAgents.forEach(data => {
    const agent = new Agent(data);
    agents.set(agent.id, agent);
  });

  console.log(`✅ Initialized ${agents.size} sample agents`);
}

// เรียกฟังก์ชันสร้าง sample data ตอนเริ่มต้น
initializeSampleData();

module.exports = { Agent, agents };

```

### 🎮 **Step 7: Controllers - นักศึกษาทำเอง (30 นาที)**

**สร้างไฟล์ `controllers/agentController.js`:**

```javascript
// controllers/agentController.js - Business logic ที่แยกจาก routes
const { Agent, agents } = require('../models/Agent');
const { AGENT_STATUS, VALID_STATUS_TRANSITIONS, API_MESSAGES } = require('../utils/constants');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const agentController = {
  // ✅ ให้ code สำเร็จเป็นตัวอย่าง
  // GET /api/agents/:id
  getAgentById: (req, res) => {
    try {
      const { id } = req.params;
      const agent = agents.get(id);

      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }

      console.log(`📋 Retrieved agent: ${agent.agentCode}`);
      return sendSuccess(res, 'Agent retrieved successfully', agent.toJSON());
    } catch (error) {
      console.error('Error in getAgentById:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // 🔄 TODO #1: นักศึกษาทำเอง (10 นาที)
  // GET /api/agents
  getAllAgents: (req, res) => {
    try {
      // TODO: ดึงข้อมูล agents ทั้งหมดจาก Map
      // Hint: ใช้ Array.from(agents.values())
      
      // TODO: Filter ตาม query parameters
      // Hint: req.query.status และ req.query.department
      
      // TODO: ส่ง response ด้วย sendSuccess
      // Hint: sendSuccess(res, message, data)
      
      return sendError(res, 'TODO: Implement getAllAgents function', 501);
    } catch (error) {
      console.error('Error in getAllAgents:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // 🔄 TODO #2: นักศึกษาทำเอง (15 นาที)  
  // POST /api/agents
  createAgent: (req, res) => {
    try {
      const agentData = req.body;

      // TODO: ตรวจสอบว่า agentCode ซ้ำไหม
      // Hint: ใช้ Array.from(agents.values()).find()
      
      // TODO: สร้าง Agent ใหม่
      // Hint: const newAgent = new Agent(agentData);
      
      // TODO: เก็บลง Map
      // Hint: agents.set(newAgent.id, newAgent);
      
      // TODO: ส่ง response พร้อม status 201
      
      return sendError(res, 'TODO: Implement createAgent function', 501);
    } catch (error) {
      console.error('Error in createAgent:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // ✅ ให้ code สำเร็จเป็นตัวอย่าง
  // PUT /api/agents/:id
  updateAgent: (req, res) => {
    try {
      const { id } = req.params;
      const agent = agents.get(id);

      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }

      const { name, email, department, skills } = req.body;
      
      // Update allowed fields
      if (name) agent.name = name;
      if (email) agent.email = email;
      if (department) agent.department = department;
      if (skills) agent.skills = skills;
      
      agent.updatedAt = new Date();
      
      console.log(`✏️ Updated agent: ${agent.agentCode}`);
      return sendSuccess(res, API_MESSAGES.AGENT_UPDATED, agent.toJSON());
    } catch (error) {
      console.error('Error in updateAgent:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // 🔄 TODO #3: นักศึกษาทำเอง (15 นาที - ยากสุด)
  // PATCH /api/agents/:id/status  
  updateAgentStatus: (req, res) => {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;

      // TODO: หา agent จาก id
      // TODO: ตรวจสอบว่า agent มีอยู่ไหม
      // TODO: validate status ด้วย AGENT_STATUS  
      // TODO: ตรวจสอบ valid transition ด้วย VALID_STATUS_TRANSITIONS
      // TODO: เรียก agent.updateStatus(status, reason)
      // TODO: ส่ง response กลับ

      return sendError(res, 'TODO: Implement updateAgentStatus function', 501);
    } catch (error) {
      console.error('Error in updateAgentStatus:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // ✅ ให้ code สำเร็จ
  // DELETE /api/agents/:id
  deleteAgent: (req, res) => {
    try {
      const { id } = req.params;
      const agent = agents.get(id);

      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }

      agents.delete(id);
      
      console.log(`🗑️ Deleted agent: ${agent.agentCode} - ${agent.name}`);
      return sendSuccess(res, API_MESSAGES.AGENT_DELETED);
    } catch (error) {
      console.error('Error in deleteAgent:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // ✅ ให้ code สำเร็จ - Dashboard API
  // GET /api/agents/status/summary
  getStatusSummary: (req, res) => {
    try {
      const agentList = Array.from(agents.values());
      const totalAgents = agentList.length;
      
      const statusCounts = {};
      Object.values(AGENT_STATUS).forEach(status => {
        statusCounts[status] = agentList.filter(agent => agent.status === status).length;
      });

      const statusPercentages = {};
      Object.entries(statusCounts).forEach(([status, count]) => {
        statusPercentages[status] = totalAgents > 0 ? Math.round((count / totalAgents) * 100) : 0;
      });

      const summary = {
        totalAgents,
        statusCounts,
        statusPercentages,
        lastUpdated: new Date().toISOString()
      };

      return sendSuccess(res, 'Status summary retrieved successfully', summary);
    } catch (error) {
      console.error('Error in getStatusSummary:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  }
};

module.exports = agentController;
```

### 📝 **TODO Completion Guide สำหรับนักศึกษา:**

#### **TODO \#1: getAllAgents (10 นาที)**

```javascript
// Solution hints:
getAllAgents: (req, res) => {
  try {
    const { status, department } = req.query;
    let agentList = Array.from(agents.values());

    // Filter by status
    if (status) {
      agentList = agentList.filter(agent => agent.status === status);
    }
    
    // Filter by department  
    if (department) {
      agentList = agentList.filter(agent => agent.department === department);
    }

    console.log(`📋 Retrieved ${agentList.length} agents`);
    return sendSuccess(res, 'Agents retrieved successfully', 
      agentList.map(agent => agent.toJSON())
    );
  } catch (error) {
    console.error('Error in getAllAgents:', error);
    return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
  }
}
```

-----

## ⏰ **HOUR 3: Validation & Error Handling (70 นาที) มีคำอธิบายด้านล่าง**

### ✅ **Step 8: Joi Validation - ผสมระหว่างให้ code และให้ทำเอง (35 นาที)**

**สร้างไฟล์ `middleware/validation.js`:**

```javascript
// middleware/validation.js - Professional validation with Joi
const Joi = require('joi');
const { AGENT_STATUS, DEPARTMENTS } = require('../utils/constants');
const { sendError } = require('../utils/apiResponse');

// Validation schemas
const schemas = {
  // ✅ ให้ code สำเร็จเป็นตัวอย่าง
  agent: Joi.object({
    agentCode: Joi.string()
      .pattern(/^[A-Z]\d{3}$/)
      .required()
      .messages({
        'string.pattern.base': 'Agent code must be in format A001 (letter + 3 digits)',
        'any.required': 'Agent code is required'
      }),
    
    name: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 100 characters',
        'any.required': 'Name is required'
      }),
    
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    
    department: Joi.string()
      .valid(...DEPARTMENTS)
      .default('General')
      .messages({
        'any.only': `Department must be one of: ${DEPARTMENTS.join(', ')}`
      }),
    
    skills: Joi.array()
      .items(Joi.string().min(2).max(50))
      .default([])
      .messages({
        'array.base': 'Skills must be an array of strings'
      })
  }),

  // 🔄 TODO #4: นักศึกษาทำเอง (15 นาที)
  statusUpdate: Joi.object({
    // TODO: สร้าง validation สำหรับ status update
    // Requirements:
    // 1. status ต้องเป็น valid AGENT_STATUS
    // 2. reason เป็น optional string ไม่เกิน 200 ตัวอักษร
    // 3. ใส่ error messages ที่เหมาะสม
    
    // Hint structure:
    // status: Joi.string().valid(...).required().messages({...}),
    // reason: Joi.string().max(200).optional().messages({...})
  })
};

// Validation middleware functions
const validateAgent = (req, res, next) => {
  const { error, value } = schemas.agent.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const validationErrors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));

    console.log('❌ Validation failed:', validationErrors);
    return sendError(res, 'Validation failed', 400, validationErrors);
  }

  req.body = value;
  next();
};

// 🔄 TODO #5: นักศึกษาทำเอง (10 นาที)
const validateStatusUpdate = (req, res, next) => {
  // TODO: implement ตาม pattern ของ validateAgent
  // Hint: ใช้ schemas.statusUpdate แทน schemas.agent
  
  return sendError(res, 'TODO: Implement validateStatusUpdate middleware', 501);
};

module.exports = {
  validateAgent,
  validateStatusUpdate
};
```

---

โค้ดนี้คือ **middleware สำหรับตรวจสอบความถูกต้องของข้อมูล (Validation) โดยใช้ Joi**
ซึ่งทำให้ API ของเราปลอดภัยและป้องกันข้อมูลผิดรูปแบบเข้าสู่ระบบ

---

## 📌 อธิบายโค้ดทีละส่วน

### 1) import modules

```javascript
const Joi = require('joi');
const { AGENT_STATUS, DEPARTMENTS } = require('../utils/constants');
const { sendError } = require('../utils/apiResponse');
```

* `Joi` → ไลบรารีสำหรับ validation ข้อมูลตาม schema
* `AGENT_STATUS, DEPARTMENTS` → constants ที่เรากำหนดไว้ เช่น รายชื่อสถานะ และแผนกที่ถูกต้อง
* `sendError` → helper function สำหรับส่ง response เมื่อ validation ล้มเหลว

---

### 2) สร้าง **schemas** (แม่แบบ validation)

```javascript
const schemas = {
  agent: Joi.object({
    agentCode: Joi.string()
      .pattern(/^[A-Z]\d{3}$/)
      .required()
      .messages({
        'string.pattern.base': 'Agent code must be in format A001 (letter + 3 digits)',
        'any.required': 'Agent code is required'
      }),
    
    name: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 100 characters',
        'any.required': 'Name is required'
      }),
    
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    
    department: Joi.string()
      .valid(...DEPARTMENTS)
      .default('General')
      .messages({
        'any.only': `Department must be one of: ${DEPARTMENTS.join(', ')}`
      }),
    
    skills: Joi.array()
      .items(Joi.string().min(2).max(50))
      .default([])
      .messages({
        'array.base': 'Skills must be an array of strings'
      })
  }),
```

📖 ความหมาย:

* `agentCode` → ต้องตรงรูปแบบ เช่น `A001` (ตัวอักษร 1 ตัว + ตัวเลข 3 หลัก) และห้ามว่าง
* `name` → ต้องมีอย่างน้อย 2 ตัวอักษร และไม่เกิน 100 ตัวอักษร
* `email` → ต้องเป็นอีเมลที่ถูกต้อง
* `department` → ต้องอยู่ในรายการที่กำหนด (`Sales`, `Support`, ฯลฯ) ถ้าไม่ใส่ default = `General`
* `skills` → ต้องเป็น array ของ string เช่น `["Thai","English"]`

---

### 3) Schema สำหรับ **update status** (ยังเป็น TODO)

```javascript
statusUpdate: Joi.object({
  // TODO: ต้องตรวจสอบว่า status อยู่ใน AGENT_STATUS และ reason ไม่เกิน 200 ตัวอักษร
})
```

👉 ตรงนี้นักศึกษาจะต้องทำเอง:

* `status`: ต้องเป็นหนึ่งในค่าของ `AGENT_STATUS` และ required
* `reason`: เป็น optional string ยาวไม่เกิน 200 ตัวอักษร

---

### 4) Middleware function: **validateAgent**

```javascript
const validateAgent = (req, res, next) => {
  const { error, value } = schemas.agent.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });
```

📖 ความหมาย:

* `schemas.agent.validate(req.body)` → ตรวจสอบข้อมูลที่ client ส่งเข้ามา
* `abortEarly: false` → ตรวจสอบจนหมดทุก field (ไม่หยุดทันทีที่เจอ error แรก)
* `stripUnknown: true` → ตัด field แปลก ๆ ที่ไม่ได้อยู่ใน schema ทิ้ง

---

### 5) การจัดการ error

```javascript
  if (error) {
    const validationErrors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));

    console.log('❌ Validation failed:', validationErrors);
    return sendError(res, 'Validation failed', 400, validationErrors);
  }
```

📖 ความหมาย:

* ถ้ามี error จะเก็บรายละเอียด field และ message
* ส่ง response กลับไปยัง client โดยใช้ `sendError`
* ตัวอย่าง response:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please provide a valid email address" }
  ]
}
```

---

### 6) กรณีผ่าน validation

```javascript
  req.body = value;
  next();
};
```

* ถ้าข้อมูลถูกต้อง จะ replace `req.body` ด้วยค่าที่ Joi ตรวจสอบแล้ว
* จากนั้นเรียก `next()` เพื่อส่งต่อไปยัง controller

---

### 7) Middleware: **validateStatusUpdate** (ยังไม่ทำ)

```javascript
const validateStatusUpdate = (req, res, next) => {
  return sendError(res, 'TODO: Implement validateStatusUpdate middleware', 501);
};
```

📖 ความหมาย:

* ยังไม่ได้ implement → ส่ง error 501 (Not Implemented) กลับไป
* นักศึกษาต้องทำเอง โดยใช้ `schemas.statusUpdate` ตรวจสอบเหมือนกับ `validateAgent`

---

### ⚠️ **Step 9: Error Handling (20 นาที - ให้ code สำเร็จ)**

**สร้างไฟล์ `middleware/errorHandler.js`:**

```javascript
// middleware/errorHandler.js - Professional error handling
const { sendError } = require('../utils/apiResponse');

const globalErrorHandler = (err, req, res, next) => {
  console.error('🚨 Global Error Handler:', {
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method
  });

  // Joi validation errors
  if (err.isJoi) {
    const validationErrors = err.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    return sendError(res, 'Validation failed', 400, validationErrors);
  }

  // Default server error
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;
    
  return sendError(res, message, 500);
};

const notFoundHandler = (req, res) => {
  console.log(`🔍 404 Not Found: ${req.method} ${req.originalUrl}`);
  return sendError(res, `Route ${req.originalUrl} not found`, 404);
};

// Performance monitoring middleware
const performanceMonitor = (req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    if (duration > 1000) {
      console.warn(`🐌 Slow request: ${req.method} ${req.url} took ${duration}ms`);
    }
    
    console.log(`⚡ ${req.method} ${req.url}: ${duration}ms - ${res.statusCode}`);
  });
  
  next();
};

module.exports = { globalErrorHandler, notFoundHandler, performanceMonitor };
```

### 📝 **Learning Check Point - Hour 3:**

```markdown
### ✅ **ตรวจสอบความเข้าใจ**
1. **อธิบายความแตกต่างของ Joi validation กับ if/else validation**
2. **Global error handler ช่วยอะไรบ้าง?** 3. **Performance monitor จะเป็นประโยชน์อย่างไรใน real-time system?**
```

### 🛤️ **Step 10: Routes Setup (15 นาที - ให้ code สำเร็จ)**

**สร้างไฟล์ `routes/agents.js`:**

```javascript
// routes/agents.js - เชื่อม routes กับ controllers
const express = require('express');
const agentController = require('../controllers/agentController');
const { validateAgent, validateStatusUpdate } = require('../middleware/validation');

const router = express.Router();

// GET /api/agents - List all agents
router.get('/', agentController.getAllAgents);

// GET /api/agents/status/summary - ต้องมาก่อน /:id route
router.get('/status/summary', agentController.getStatusSummary);

// GET /api/agents/:id - Get specific agent
router.get('/:id', agentController.getAgentById);

// POST /api/agents - Create new agent (with validation)
router.post('/', validateAgent, agentController.createAgent);

// PUT /api/agents/:id - Update agent
router.put('/:id', agentController.updateAgent);

// PATCH /api/agents/:id/status - Update status (with validation)
router.patch('/:id/status', validateStatusUpdate, agentController.updateAgentStatus);

// DELETE /api/agents/:id - Delete agent
router.delete('/:id', agentController.deleteAgent);

module.exports = router;
```

**สร้างไฟล์ `routes/index.js`:**

```javascript
// routes/index.js - Routes aggregator
const express = require('express');
const agentRoutes = require('./agents');

const router = express.Router();

// API health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API documentation
router.get('/docs', (req, res) => {
  res.json({
    title: 'Agent Wallboard API Documentation',
    version: '1.0.0',
    baseUrl: `${req.protocol}://${req.get('host')}`,
    endpoints: {
      'GET /api/health': 'API health check',
      'GET /api/agents': 'List all agents (supports ?status= and ?department=)',
      'POST /api/agents': 'Create new agent',
      'GET /api/agents/:id': 'Get specific agent',
      'PUT /api/agents/:id': 'Update agent information',
      'PATCH /api/agents/:id/status': 'Update agent status',
      'DELETE /api/agents/:id': 'Delete agent',
      'GET /api/agents/status/summary': 'Agent status summary'
    },
    examples: {
      createAgent: {
        method: 'POST',
        url: '/api/agents',
        body: {
          agentCode: 'A999',
          name: 'John Doe',
          email: 'john@company.com',
          department: 'Sales',
          skills: ['Thai', 'English']
        }
      }
    }
  });
});

// Mount agent routes
router.use('/agents', agentRoutes);

module.exports = router;
```

### 🖥️ **Step 11: Main Server (15 นาที - ให้ code สำเร็จ)**

**สร้างไฟล์ `server.js`:**

```javascript
// server.js - Main application server
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import routes และ middleware
const routes = require('./routes');
const { globalErrorHandler, notFoundHandler, performanceMonitor } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging (เฉพาะ development)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Performance monitoring
app.use(performanceMonitor);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Agent Wallboard API Enhanced v1.0',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    documentation: '/api/docs',
    health: '/api/health',
    endpoints: {
      agents: '/api/agents',
      health: '/api/health',
      docs: '/api/docs'
    }
  });
});

// API routes
app.use('/api', routes);

// Error handlers (ต้องอยู่ท้ายสุด)
app.use('*', notFoundHandler);
app.use(globalErrorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log('🚀 Agent Wallboard API Enhanced');
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown (เตรียมสำหรับ Phase 3)
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});

module.exports = app;
```

-----

## ⏰ **HOUR 4: Testing & Integration (70 นาที)**

### 🧪 **Step 12: Complete Testing Guide (35 นาที)**

#### **Test Setup:**

1.  **เปิด Terminal รัน server:**

<!-- end list -->

```bash
npm run dev
```

2.  **เปิด Postman หรือใช้ curl**
3.  **Test ตาม sequence นี้:**

#### **Test Case 1: System Health (5 นาที)**

```bash
# Request
GET http://localhost:3001/

# Expected Response (Status: 200)
{
  "success": true,
  "message": "Agent Wallboard API Enhanced v1.0",
  "version": "1.0.0",
  "environment": "development",
  "documentation": "/api/docs"
}

# Health Check
GET http://localhost:3001/api/health

# Expected Response (Status: 200)
{
  "success": true,
  "status": "OK",
  "uptime": 45,
  "timestamp": "2025-01-01T10:00:00.000Z"
}
```

#### **Test Case 2: Get All Agents (10 นาที)**

```bash
# Request
GET http://localhost:3001/api/agents

# Expected Response (Status: 200)
{
  "success": true,
  "message": "Agents retrieved successfully",
  "count": 3,
  "data": [
    {
      "id": "generated-id-1",
      "agentCode": "A001",
      "name": "John Doe",
      "email": "john.doe@company.com",
      "department": "Sales",
      "skills": ["Thai", "English", "Sales"],
      "status": "Available"
    }
    // ... more agents
  ]
}

# Test filtering
GET http://localhost:3001/api/agents?status=Available
GET http://localhost:3001/api/agents?department=Sales
```

#### **Test Case 3: Create Agent - Success (10 นาที)**

```bash
# Request
POST http://localhost:3001/api/agents
Content-Type: application/json

{
  "agentCode": "A999",
  "name": "Test Agent",
  "email": "test@company.com",
  "department": "Sales",
  "skills": ["Thai", "English"]
}

# Expected Response (Status: 201)
{
  "success": true,
  "message": "Agent created successfully",
  "data": {
    "id": "auto-generated",
    "agentCode": "A999",
    "name": "Test Agent",
    "email": "test@company.com",
    "department": "Sales",
    "skills": ["Thai", "English"],
    "status": "Available",
    "isActive": true,
    "createdAt": "2025-01-01T10:00:00.000Z"
  }
}
```

#### **Test Case 4: Validation Testing (10 นาที)**

```bash
# Request - Invalid data (ทดสอบ Joi validation)
POST http://localhost:3001/api/agents
Content-Type: application/json

{
  "agentCode": "invalid-format",
  "name": "X",
  "email": "not-email"
}

# Expected Response (Status: 400)
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "agentCode",
      "message": "Agent code must be in format A001 (letter + 3 digits)"
    },
    {
      "field": "name",
      "message": "Name must be at least 2 characters"
    },
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### 📊 **Step 13: Status Management Testing (20 นาที)**

#### **Test Status Update - Valid Transition:**

```bash
# Get agent ID first
GET http://localhost:3001/api/agents

# Copy agent ID และทดสอบ status update
PATCH http://localhost:3001/api/agents/[AGENT-ID]/status
Content-Type: application/json

{
  "status": "Busy",
  "reason": "Handling customer call"
}

# Expected Response (Status: 200)
{
  "success": true,
  "message": "Agent status updated to Busy",
  "data": {
    "id": "agent-id",
    "agentCode": "A001", 
    "status": "Busy",
    "lastStatusChange": "2025-01-01T10:05:00.000Z"
  }
}
```

#### **Test Invalid Status Transition:**

```bash
# Try invalid transition (Available -> Offline without proper flow)
PATCH http://localhost:3001/api/agents/[AGENT-ID]/status
Content-Type: application/json

{
  "status": "Wrap"
}

# Expected Response (Status: 400)
{
  "success": false,
  "message": "Cannot change from Busy to Wrap. Valid transitions: Available, Wrap, Not Ready"
}
```

### 📚 **Step 14: Documentation Creation (15 นาที)**

**สร้างไฟล์ `README.md`:**

````markdown
# Agent Wallboard API - Enhanced Phase 1

> Professional Node.js API สำหรับจัดการ Call Center Agents แบบ Real-time

## ✨ Features Enhanced
- 🏗️ Professional MVC project structure  
- ✅ Input validation with Joi
- 🛡️ Security middleware (Helmet)
- 📝 Request logging และ performance monitoring
- ⚠️ Global error handling
- 📊 Consistent API response format

## 🚀 Quick Start

```bash
# 1. Clone และ install dependencies
npm install

# 2. สร้าง environment file
cp .env.example .env

# 3. Start development server
npm run dev

# 4. Test API
curl http://localhost:3001/api/health
````

## 🔗 API Endpoints

### 📊 System Information

  - `GET /` - API information
  - `GET /api/health` - Health check
  - `GET /api/docs` - API documentation

### 👥 Agent Management

  - `GET /api/agents` - List agents (supports `?status=` และ `?department=`)
  - `GET /api/agents/:id` - Get specific agent
  - `POST /api/agents` - Create agent (requires validation)
  - `PUT /api/agents/:id` - Update agent information
  - `DELETE /api/agents/:id` - Delete agent

### 📈 Status Management

  - `PATCH /api/agents/:id/status` - Update agent status (with transition validation)
  - `GET /api/agents/status/summary` - Status summary statistics

## 🧪 Testing

### Manual Testing

```bash
# 1. Health check
curl http://localhost:3001/api/health

# 2. Get all agents
curl http://localhost:3001/api/agents

# 3. Create new agent
curl -X POST http://localhost:3001/api/agents \
  -H "Content-Type: application/json" \
  -d '{"agentCode":"A999","name":"Test Agent","email":"test@company.com","department":"Sales"}'
```

### Postman Collection

  - Import collection: `Agent_Wallboard_API_Enhanced.postman_collection.json`
  - มี test cases ครอบคลุม success และ error scenarios

## ⚙️ Configuration

### Environment Variables

```env
PORT=3001                           # Server port
NODE_ENV=development                # Environment mode
FRONTEND_URL=http://localhost:3000  # CORS origin
```

### Agent Status Flow

```
Available → Busy → Wrap → Available
    ↓        ↓       ↓
  Break   Not Ready  ↓
    ↓        ↓    Available  
Not Ready  Available
    ↓
 Offline
```

```
```


## 🚨 Troubleshooting

### Common Issues
```bash
# Issue: "AGENT_STATUS is not defined"
# Solution: Check imports ใน constants.js

# Issue: Validation ไม่ทำงาน
# Solution: ตรวจสอบ middleware order ใน routes

# Issue: CORS error
# Solution: ตรวจสอบ FRONTEND_URL ใน .env
```

## 🎯 Next Steps (Phase 2)
- Database integration (MSSQL + MongoDB)
- JWT authentication
- WebSocket real-time features
- Advanced logging และ monitoring

## 📞 Support
- Office Hours: [ระบุเวลา]
- Email: [อีเมลอาจารย์]
- Issues: GitHub Issues tab

---

## 💡 **นักศึกษาทำเอง Section (TODO Completion)**

### ✍️ **TODO #1: Complete getAllAgents (10 นาที)**

**Function:** `getAllAgents` ใน `controllers/agentController.js`

**Requirements:**
1. ดึงข้อมูล agents ทั้งหมดจาก Map storage
2. รองรับ query filtering: `?status=Available` และ `?department=Sales`
3. ส่ง response ด้วย `sendSuccess` helper
4. จัดการ error ด้วย try-catch

**Hints:**
```javascript
// 1. Get all agents from Map
const { status, department } = req.query;
let agentList = Array.from(agents.values());

// 2. Apply filters
if (status) {
  agentList = agentList.filter(agent => agent.status === status);
}

// 3. Send response
return sendSuccess(res, 'Agents retrieved successfully', 
  agentList.map(agent => agent.toJSON())
);
```

**Expected Output:**
- ✅ GET `/api/agents` ส่งคืน agents ทั้งหมด
- ✅ GET `/api/agents?status=Available` filter เฉพาะ Available agents
- ✅ Response format ถูกต้องตาม `sendSuccess` pattern

### ✍️ **TODO #2: Complete createAgent (15 นาที)**

**Function:** `createAgent` ใน `controllers/agentController.js`

**Requirements:**
1. ตรวจสอบว่า `agentCode` ซ้ำไหม
2. สร้าง Agent instance ใหม่
3. เก็บลง Map storage  
4. ส่ง response พร้อม status code 201

**Hints:**
```javascript
// 1. Check duplicate
const existingAgent = Array.from(agents.values())
  .find(agent => agent.agentCode === agentData.agentCode);

if (existingAgent) {
  return sendError(res, `Agent code ${agentData.agentCode} already exists`, 409);
}

// 2. Create new agent
const newAgent = new Agent(agentData);
agents.set(newAgent.id, newAgent);

// 3. Success response
return sendSuccess(res, API_MESSAGES.AGENT_CREATED, newAgent.toJSON(), 201);
```

### ✍️ **TODO #3: Complete updateAgentStatus (15 นาที - Advanced)**

**Function:** `updateAgentStatus` ใน `controllers/agentController.js`

**Requirements:**
1. หา agent จาก ID parameter
2. Validate status ด้วย `AGENT_STATUS` constants
3. ตรวจสอบ valid transition ด้วย `VALID_STATUS_TRANSITIONS`
4. เรียกใช้ `agent.updateStatus()` method
5. ส่ง response พร้อมข้อมูล agent ที่อัพเดทแล้ว

**Hints:**
```javascript
const { id } = req.params;
const { status, reason } = req.body;
const agent = agents.get(id);

// Validation checks
if (!agent) {
  return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
}

if (!Object.values(AGENT_STATUS).includes(status)) {
  return sendError(res, `Invalid status. Valid: ${Object.values(AGENT_STATUS).join(', ')}`, 400);
}

// Transition validation
const currentStatus = agent.status;
const validTransitions = VALID_STATUS_TRANSITIONS[currentStatus];

if (!validTransitions.includes(status)) {
  return sendError(res, 
    `Cannot change from ${currentStatus} to ${status}. Valid: ${validTransitions.join(', ')}`, 
    400
  );
}
```

### ✍️ **TODO #4: Complete statusUpdate Schema (15 นาที)**

**File:** `schemas.statusUpdate` ใน `middleware/validation.js`

**Requirements:**
1. `status` field ต้องเป็น valid `AGENT_STATUS` และ required
2. `reason` field เป็น optional string ไม่เกิน 200 characters  
3. ใส่ custom error messages ที่เหมาะสม

**Solution:**
```javascript
statusUpdate: Joi.object({
  status: Joi.string()
    .valid(...Object.values(AGENT_STATUS))
    .required()
    .messages({
      'any.only': `Status must be one of: ${Object.values(AGENT_STATUS).join(', ')}`,
      'any.required': 'Status is required'
    }),
  
  reason: Joi.string()
    .max(200)
    .optional()
    .messages({
      'string.max': 'Reason cannot exceed 200 characters'
    })
})
```

### ✍️ **TODO #5: Complete validateStatusUpdate (10 นาที)**

**Function:** `validateStatusUpdate` ใน `middleware/validation.js`

**Requirements:**
- ทำงานเหมือน `validateAgent` แต่ใช้ `schemas.statusUpdate`
- ส่ง validation errors ในรูปแบบเดียวกัน

**Solution Pattern:**
```javascript
const validateStatusUpdate = (req, res, next) => {
  const { error, value } = schemas.statusUpdate.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const validationErrors = error.details.map(detail => ({
      field: detail.path[0], 
      message: detail.message
    }));

    return sendError(res, 'Status validation failed', 400, validationErrors);
  }

  req.body = value;
  next();
};
```

---

## 📊 **Learning Check Points**

### ✅ **Hour 2 Check Point:**
1. **อธิบายความแตกต่างระหว่าง Controller และ Route**
   - Route: กำหนด endpoint และ HTTP methods
   - Controller: business logic และ data processing

2. **ทำไมต้องใช้ `sendSuccess` และ `sendError` helpers?**
   - Consistent response format
   - ลด code duplication
   - ง่ายต่อการ maintain

3. **Status transition validation ป้องกันปัญหาอะไร?**
   - ป้องกัน invalid status changes
   - รักษา business rules
   - ป้องกัน data inconsistency

### ✅ **Hour 3 Check Point:**
1. **ข้อดีของ Joi validation เปรียบเทียบกับ manual validation**
   - Schema-based, declarative
   - Rich validation rules built-in
   - Better error messages
   - Type coercion และ sanitization

2. **Global error handler ช่วยอะไร?**
   - Centralized error processing
   - Consistent error responses
   - Logging และ monitoring
   - ป้องกัน server crash

---

## 🆘 **Troubleshooting Guide**

### **Issue 1: Cannot Start Server**
```bash
# Error: "Cannot find module"
# Solution: 
npm install

# Error: "Port already in use"
# Solution:
killall node
# หรือ เปลี่ยน PORT ใน .env
```

### **Issue 2: TODO Functions Return 501 Error**
```bash
# Error: "TODO: Implement getAllAgents function"  
# Solution: Replace TODO code ด้วย implementation จริง

# Example:
return sendError(res, 'TODO: Implement function', 501);
# เปลี่ยนเป็น:
return sendSuccess(res, 'Success message', data);
```

### **Issue 3: Validation Not Working**
```bash
# Error: Validation ไม่ทำงาน
# Solution: ตรวจสอบ middleware order ใน routes

# ❌ ผิด
router.post('/', agentController.createAgent);

# ✅ ถูก
router.post('/', validateAgent, agentController.createAgent);
```

### **Issue 4: CORS Errors**
```bash
# Error: CORS policy blocking requests
# Solution: ตรวจสอบ FRONTEND_URL ใน .env file
FRONTEND_URL=http://localhost:3000

# หรือ disable CORS ชั่วคราว (development only):
app.use(cors({ origin: '*' }));
```

---

## 🎯 **Enhanced 20% Challenge (แบ่งตาม Levels)**

### ⭐ **Level 1: Beginner (5-10 คะแนนพิเศษ)**

#### 1. **Enhanced Health Check (5 คะแนน)**
เพิ่มข้อมูลใน `/api/health` endpoint:
```javascript
// TODO: เพิ่มข้อมูล system info
{
  "success": true,
  "status": "OK",
  "uptime": 45,
  "memoryUsage": process.memoryUsage(),
  "agentCount": agents.size,
  "timestamp": new Date().toISOString()
}
```

#### 2. **Request Logging Enhancement (5 คะแนน)**
เพิ่ม custom request logging:
```javascript
// TODO: สร้าง custom logger middleware
// Log: timestamp, method, URL, response time, status code
```

#### 3. **API Rate Limiting (10 คะแนน)**
เพิ่ม rate limiting middleware:
```bash
npm install express-rate-limit
```

### ⭐⭐ **Level 2: Intermediate (10-15 คะแนนพิเศษ)**

#### 1. **Agent Search API (10 คะแนน)**
```javascript
// GET /api/agents/search?q=john&fields=name,email
// ค้นหา agent ใน name, email, agentCode fields
// รองรับ fields parameter เลือกข้อมูลที่ต้องการ
```

#### 2. **Department Statistics (10 คะแนน)**
```javascript  
// GET /api/agents/departments/stats
// แสดงสถิติแยกตาม department
{
  "departments": {
    "Sales": {"total": 5, "available": 3, "busy": 2},
    "Support": {"total": 3, "available": 1, "busy": 1, "break": 1}
  }
}
```

#### 3. **Status History API (15 คะแนน)**
```javascript
// GET /api/agents/:id/status/history  
// แสดงประวัติการเปลี่ยนสถานะ พร้อม pagination
// รองรับ ?page=1&limit=10&from_date=&to_date=
```

### ⭐⭐⭐ **Level 3: Advanced (15-20 คะแนนพิเศษ)**

#### 1. **OpenAPI Documentation (15 คะแนน)**
```bash
npm install swagger-ui-express swagger-jsdoc
```
สร้าง Swagger documentation ที่ `/api-docs`

#### 2. **Input Sanitization (15 คะแนน)**  
```bash
npm install xss validator
```
เพิ่ม XSS protection และ input sanitization

#### 3. **Graceful Shutdown & Health Monitoring (20 คะแนน)**
```javascript
// TODO: Implement graceful shutdown
// TODO: Advanced health checks with dependencies
// TODO: Metrics collection endpoint
```

---

## 🔄 **เตรียมความพร้อมสำหรับ Phase 2**

### **Database Abstraction Layer (Preview)**
```javascript
// models/AgentRepository.js - เตรียมไว้สำหรับ Phase 2
class AgentRepository {
  constructor() {
    // Phase 1: ใช้ Map storage
    this.storage = new Map();
    
    // Phase 2: จะเปลี่ยนเป็น database
    // this.db = require('../config/database');
  }

  async findAll(filters = {}) {
    // Phase 1: จาก Map
    let agents = Array.from(this.storage.values());
    
    // Apply filters
    if (filters.status) {
      agents = agents.filter(agent => agent.status === filters.status);
    }
    
    return agents;
    
    // Phase 2: จะเป็น
    // return await this.db.collection('agents').find(filters).toArray();
  }

  async save(agent) {
    // Phase 1: save to Map
    this.storage.set(agent.id, agent);
    return agent;
    
    // Phase 2: จะเป็น  
    // return await this.db.collection('agents').insertOne(agent);
  }
}
```

### **API Versioning Structure**
```javascript
// routes/index.js - เตรียม versioning
// API version 1 (Phase 1 features)
router.use('/v1/agents', agentRoutes);

// API version 2 (Phase 2+ features) 
// router.use('/v2/agents', agentRoutesV2);

// Default ไปที่ latest version
router.use('/agents', agentRoutes);
```

---

## 📅 **Timeline & Deliverables**

### **📋 Checklist ท้าย Phase 1:**
- [ ] ✅ All TODO functions implemented และ tested
- [ ] 🧪 Postman collection ทำงานครบทุก test cases  
- [ ] 📚 README.md documentation complete
- [ ] 🔧 Environment configuration setup ถูกต้อง
- [ ] ⚠️ Error handling ทำงานในทุก scenarios
- [ ] 📊 API responses consistent และ professional

### **🎯 Success Criteria:**
1. **Functional APIs (40%)** - ทุก endpoint ทำงานถูกต้อง
2. **Code Quality (30%)** - MVC structure, clean code, proper naming
3. **Error Handling (15%)** - Validation และ error responses
4. **Documentation (10%)** - README และ API docs  
5. **Testing (5%)** - Postman collection และ manual testing

### **📈 Phase 2 Readiness:**
- เข้าใจ MVC pattern และสามารถประยุกต์ใช้
- เข้าใจ middleware concept สำหรับ authentication
- API structure พร้อมสำหรับ database integration
- Error handling pattern พร้อมสำหรับ production

---

## 🌟 **Real-World Context**

### **💼 Skills ที่ได้จาก Phase 1:**
- ✅ **Backend API Development** (Node.js + Express)
- ✅ **Input Validation & Security** (Joi + Helmet)
- ✅ **Error Handling Patterns** (Global error handler)
- ✅ **API Design Principles** (RESTful + consistent responses)
- ✅ **Code Organization** (MVC + separation of concerns)
- ✅ **API Testing & Documentation** (Postman + documentation)

### **🏢 Career Applications:**
- 💼 **Backend Developer** positions
- 💼 **Full-Stack Developer** roles  
- 💼 **API Developer** specialized positions
- 💼 **DevOps Engineer** (foundation skills)

### **🚀 Industry Relevance:**
- **Call Centers:** Agent management systems
- **Customer Service:** Support ticket routing
- **Remote Teams:** Status tracking systems
- **Help Desk:** Technician availability monitoring

**Phase 1 ให้ foundation ที่แข็งแรงสำหรับการพัฒนา enterprise-grade applications!**
