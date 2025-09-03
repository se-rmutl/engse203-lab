# Agent Wallboard API Phase 1 - Complete Developer Guide
## คู่มือนักพัฒนาสำหรับการทำงานเป็นทีม (Developer, PO, Tester, SA)

---

## 📋 Overview & Team Collaboration

### 🎯 ข้อมูลโปรเจค
- **ชื่อโปรเจค**: Agent Wallboard API Phase 1
- **ระยะเวลา**: 4.5 ชั่วโมง (แบ่งเป็น 4 Phase)
- **เทคโนโลยี**: Node.js, Express.js, Joi, Helmet
- **Architecture**: MVC Pattern
- **ลักษณะงาน**: REST API Development สำหรับระบบจัดการ Agent Call Center

### 👥 Team Roles & Responsibilities

#### 🧑‍💻 **Developer (นักศึกษา)**
- เขียนโค้ดตามเอกสาร technical specification
- ทดสอบ unit testing ในส่วนของตัวเอง
- สื่อสารกับ Tester เกี่ยวกับ bug fixes
- รายงานความคืบหน้าต่อ PO
- ขอคำแนะนำจาก SA เมื่อมีปัญหาทางเทคนิค

#### 📊 **Product Owner (PO)**
- กำหนด requirements และ acceptance criteria
- ตรวจสอบความสอดคล้องกับ business requirements
- อนุมัติ features ที่เสร็จสิ้น
- จัดลำดับความสำคัญของงาน

#### 🧪 **Tester**
- สร้าง test cases จาก requirements
- ทำ manual testing และ API testing
- รายงาน bugs พร้อม reproduction steps
- ตรวจสอบ edge cases

#### 🏗️ **System Analyst (SA)**
- ให้คำแนะนำด้าน architecture และ design patterns
- ตรวจสอบ technical design
- แก้ไขปัญหาเชิงเทคนิคที่ซับซ้อน
- Code review สำหรับส่วนที่สำคัญ

---

## 🚀 Phase 0: การเตรียมความพร้อมก่อนเริ่มงาน (30 นาที)

### 📦 สิ่งที่ต้องเตรียม

#### สำหรับ Developer:
```bash
# 1. ตรวจสอบ Node.js version
node --version  # ต้อง >= 16.x.x
npm --version   # ต้อง >= 8.x.x

# 2. ติดตั้ง tools ที่จำเป็น
npm install -g nodemon    # สำหรับ auto-restart server
```

#### สำหรับ Tester:
- ติดตั้ง Postman หรือ Insomnia
- เตรียม spreadsheet สำหรับบันทึก test results
- ศึกษา API specification ในเอกสาร

#### สำหรับ PO:
- ทบทวน business requirements
- เตรียม checklist สำหรับ acceptance testing
- กำหนด success criteria ที่ชัดเจน

### 🗂️ การจัดการไฟล์และโฟลเดอร์

```bash
# สร้าง project directory
mkdir agent-wallboard-team
cd agent-wallboard-team

# สร้าง structure สำหรับทีม
mkdir -p {development,testing,documentation,deliverables}

# Development structure
mkdir -p development/agent-wallboard-api
mkdir -p testing/{test-cases,test-results,bug-reports}
mkdir -p documentation/{requirements,technical-specs,meeting-notes}
mkdir -p deliverables/{phase-1,final-release}
```

### 📝 การสื่อสารในทีม

#### Daily Standup Template (ทุกเช้า 15 นาที):
```
Developer Update:
- เมื่อวานทำอะไรเสร็จ:
- วันนี้จะทำอะไร:
- มีปัญหาอะไรที่ต้องการความช่วยเหลือ:

Tester Update:
- Test cases ที่เสร็จเมื่อวาน:
- พบ bugs อะไร:
- วันนี้จะทดสอบส่วนไหน:

PO Update:
- Requirements ที่ต้องชี้แจงเพิ่ม:
- Priority changes:
- Stakeholder feedback:
```

---

## 🏗️ Phase 1: Project Setup & Structure (70 นาที)

### 🎯 เป้าหมายของ Phase 1
- ✅ สร้าง professional project structure
- ✅ ติดตั้ง dependencies ที่จำเป็น
- ✅ กำหนดค่า environment variables
- ✅ สร้าง constants และ helper functions

### 👨‍💻 งาน Developer

#### Step 1: Project Initialization (15 นาที)
```bash
# สร้างโปรเจค
mkdir agent-wallboard-api
cd agent-wallboard-api

# Initialize npm
npm init -y

# ติดตั้ง dependencies
npm install express cors dotenv joi helmet morgan
npm install --save-dev nodemon
```

**📋 Checklist for Developer:**
- [ ] Project initialized successfully
- [ ] All dependencies installed without errors
- [ ] Package.json contains correct scripts

#### Step 2: Project Structure (15 นาที)
```bash
# สร้าง folder structure
mkdir controllers middleware models routes utils
touch server.js .env .env.example .gitignore README.md

# ตรวจสอบ structure
tree . -I node_modules
```

**Expected Structure:**
```
agent-wallboard-api/
├── 📁 controllers/          # Business logic
├── 📁 middleware/          # Request processing
├── 📁 models/             # Data models
├── 📁 routes/             # API routes
├── 📁 utils/              # Helper functions
├── 📄 server.js           # Main application
├── 📄 package.json
├── 📄 .env                # Environment variables
├── 📄 .env.example        # Environment template
└── 📄 README.md          # Documentation
```

#### Step 3: Environment Setup (10 นาที)
สร้างไฟล์ `.env.example`:
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

**📋 Task for Developer:**
1. สร้าง `.env` โดยคัดลอกจาก `.env.example`
2. เปลี่ยน PORT เป็น 3001 (หรือตามที่ทีมกำหนด)
3. ทดสอบว่า environment variables อ่านได้

#### Step 4: Constants และ Utils (30 นาที)

**สร้าง `utils/constants.js`:**
```javascript
// utils/constants.js
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

**สร้าง `utils/apiResponse.js`:**
```javascript
// utils/apiResponse.js
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

### 📊 งาน PO - Requirements Review

**PO ต้องทำ:**
1. **ทบทวน Business Requirements:**
   - Agent สามารถมีสถานะอะไรได้บ้าง?
   - การเปลี่ยนสถานะมีข้อจำกัดอะไร?
   - ข้อมูลอะไรที่จำเป็นต้องเก็บ?

2. **กำหนด Acceptance Criteria:**
   ```
   Feature: Agent Status Management
   Scenario: Agent changes status from Available to Busy
   Given: Agent A001 has status "Available"
   When: Agent A001 changes status to "Busy"
   Then: Status should be updated to "Busy"
   And: LastStatusChange timestamp should be updated
   And: Status history should be recorded
   ```

3. **ตรวจสอบ Constants:**
   - AGENT_STATUS ครอบคลุมทุกสถานะที่ business ต้องการหรือไม่?
   - DEPARTMENTS ถูกต้องตามโครงสร้างองค์กรหรือไม่?
   - VALID_STATUS_TRANSITIONS สมเหตุสมผลกับ business process หรือไม่?

### 🧪 งาน Tester - Test Planning

**Tester ต้องเตรียม:**

1. **Test Environment Setup:**
   - ติดตั้ง Postman Collections
   - เตรียม test data templates
   - สร้าง test result tracking sheet

2. **สร้าง Test Cases สำหรับ Phase 1:**
```
TC001: Project Structure Verification
- ตรวจสอบว่า folder structure ถูกต้อง
- ตรวจสอบว่าทุกไฟล์ที่จำเป็นมีครบ

TC002: Environment Configuration
- ตรวจสอบว่า server start ได้
- ตรวจสอบว่า PORT configuration ทำงาน

TC003: Constants Validation
- ตรวจสอบค่า AGENT_STATUS
- ตรวจสอบค่า DEPARTMENTS
- ตรวจสอบ VALID_STATUS_TRANSITIONS logic
```

### 🏗️ งาน SA - Technical Review

**SA ต้องทำ:**

1. **Architecture Review:**
   - ตรวจสอบ MVC pattern implementation
   - ตรวจสอบ separation of concerns
   - ให้คำแนะนำเกี่ยวกับ code organization

2. **Code Review Checklist:**
   ```
   □ Error handling patterns consistent?
   □ Input validation comprehensive?
   □ API response format standardized?
   □ Code follows naming conventions?
   □ Security middleware properly configured?
   ```

3. **Technical Recommendations:**
   - แนะนำ best practices สำหรับ Express.js
   - ตรวจสอบ security considerations
   - แนะนำ performance optimization

### ✅ Phase 1 Completion Checklist

**ก่อนไป Phase 2 ต้องผ่านเงื่อนไขเหล่านี้:**

#### Developer Checklist:
- [ ] Project structure สร้างครบทุก folders
- [ ] Dependencies ติดตั้งครบถ้วน
- [ ] Environment variables กำหนดค่าเรียบร้อย
- [ ] Constants และ Utils functions ทำงานได้
- [ ] Server สามารถ start ได้โดยไม่ error

#### PO Acceptance:
- [ ] Business requirements ได้รับการ validate
- [ ] Acceptance criteria ชัดเจน
- [ ] Constants สอดคล้องกับ business needs

#### Tester Sign-off:
- [ ] Test cases สำหรับ Phase 1 ผ่านทั้งหมด
- [ ] Test environment พร้อมใช้งาน
- [ ] ไม่พบ critical bugs

#### SA Approval:
- [ ] Architecture design ถูกต้อง
- [ ] Code quality standards ผ่าน
- [ ] Security considerations ครบถ้วน

---

## 💾 Phase 2: Models & Controllers (70 นาที)

### 🎯 เป้าหมายของ Phase 2
- ✅ สร้าง Agent Model พร้อม methods
- ✅ พัฒนา Controllers สำหรับ business logic
- ✅ ทดสอบ CRUD operations
- ✅ จัดการ status transitions

### 👨‍💻 งาน Developer

#### Step 5: Agent Model Development (25 นาที)

**สร้าง `models/Agent.js`:**
```javascript
// models/Agent.js
class Agent {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.agentCode = data.agentCode;
    this.name = data.name;
    this.email = data.email;
    this.department = data.department || 'General';
    this.skills = data.skills || [];
    this.status = data.status || 'Available';
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.loginTime = data.loginTime || null;
    this.lastStatusChange = new Date();
    this.statusHistory = data.statusHistory || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
  }

  generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  }

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

  getStatusHistory() {
    return this.statusHistory;
  }
}

// In-memory storage (Phase 1 only)
const agents = new Map();

// Sample data initialization
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

  sampleAgents.forEach(data => {
    const agent = new Agent(data);
    agents.set(agent.id, agent);
  });

  console.log(`✅ Initialized ${agents.size} sample agents`);
}

initializeSampleData();

module.exports = { Agent, agents };
```

**📋 Developer Tasks:**
1. ทดสอบการสร้าง Agent instance
2. ทดสอบ updateStatus method
3. ทดสอบ toJSON method
4. ตรวจสอบว่า sample data loading ถูกต้อง

#### Step 6: Controllers Implementation (45 นาที)

**สร้าง `controllers/agentController.js` (พร้อม TODO sections สำหรับนักศึกษา):**

```javascript
// controllers/agentController.js
const { Agent, agents } = require('../models/Agent');
const { AGENT_STATUS, VALID_STATUS_TRANSITIONS, API_MESSAGES } = require('../utils/constants');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const agentController = {
  // ✅ ให้ code สำเร็จเป็นตัวอย่าง
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

  // 📄 TODO #1: นักศึกษาทำเอง (10 นาที)
  getAllAgents: (req, res) => {
    try {
      // TODO: ดึงข้อมูล agents ทั้งหมดจาก Map
      // TODO: Filter ตาม query parameters (status, department)
      // TODO: ส่ง response ด้วย sendSuccess
      
      return sendError(res, 'TODO: Implement getAllAgents function', 501);
    } catch (error) {
      console.error('Error in getAllAgents:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // 📄 TODO #2: นักศึกษาทำเอง (15 นาที)  
  createAgent: (req, res) => {
    try {
      // TODO: ตรวจสอบว่า agentCode ซ้ำไหม
      // TODO: สร้าง Agent ใหม่
      // TODO: เก็บลง Map
      // TODO: ส่ง response พร้อม status 201
      
      return sendError(res, 'TODO: Implement createAgent function', 501);
    } catch (error) {
      console.error('Error in createAgent:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // ✅ ให้ code สำเร็จ
  updateAgent: (req, res) => {
    try {
      const { id } = req.params;
      const agent = agents.get(id);

      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }

      const { name, email, department, skills } = req.body;
      
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

  // 📄 TODO #3: นักศึกษาทำเอง (15 นาที - ยากสุด)
  updateAgentStatus: (req, res) => {
    try {
      // TODO: หา agent จาก id
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

### 📊 งาน PO - Business Logic Validation

**PO ต้องทำ:**

1. **ทบทวน Controller Functions:**
   ```
   Function: getAllAgents
   Business Rule: ต้องสามารถ filter ด้วย status และ department
   Acceptance Criteria:
   - GET /api/agents ส่งคืน agents ทั้งหมด
   - GET /api/agents?status=Available ส่งคืนเฉพาะ Available agents
   - GET /api/agents?department=Sales ส่งคืนเฉพาะ Sales department
   ```

2. **ตรวจสอบ Status Transition Logic:**
   ```
   Business Rule: Agent ไม่สามารถเปลี่ยนจาก Available เป็น Wrap ได้โดยตรง
   Test Case: Available -> Busy -> Wrap -> Available (Valid)
   Test Case: Available -> Wrap (Invalid)
   ```

3. **Data Validation Requirements:**
   - agentCode format: ต้องเป็น A001, A002, S001 เป็นต้น
   - email ต้องเป็น format ที่ถูกต้อง
   - department ต้องอยู่ใน predefined list

### 🧪 งาน Tester - Unit Testing

**สร้าง Test Cases สำหรับแต่ละ Function:**

```
TC201: Agent Model Testing
Test Case: Create new Agent
Steps:
1. สร้าง Agent ใหม่ด้วย valid data
2. ตรวจสอบว่า properties ถูกต้อง
3. ทดสอบ generateId() ว่าสร้าง unique ID
Expected: Agent object ถูกสร้างสมบูรณ์

TC202: Agent Status Update
Test Case: Update agent status with valid transition
Steps:
1. สร้าง Agent ด้วย status "Available"
2. เรียก updateStatus("Busy", "Handling call")
3. ตรวจสอบ status ใหม่และ statusHistory
Expected: Status updated, history recorded

TC203: Get All Agents
Test Case: Retrieve agents with filtering
Steps:
1. มี agents หลายตัวในระบบ
2. เรียก getAllAgents()
3. เรียก getAllAgents() พร้อม filter
Expected: ผลลัพธ์ถูกต้องตาม filter
```

**Test Data Template:**
```javascript
// สำหรับ Tester ใช้ทดสอบ
const testAgentData = {
  valid: {
    agentCode: "T001",
    name: "Test Agent",
    email: "test@company.com",
    department: "Sales",
    skills: ["Thai", "English"]
  },
  invalid: {
    agentCode: "invalid-format",
    name: "X", // too short
    email: "not-email",
    department: "InvalidDept"
  }
};
```

### 🏗️ งาน SA - Code Quality Review

**SA Code Review Checklist:**

1. **Design Patterns:**
   - [ ] MVC pattern implemented correctly?
   - [ ] Separation of concerns maintained?
   - [ ] Single Responsibility Principle followed?

2. **Error Handling:**
   - [ ] Try-catch blocks in all controller methods?
   - [ ] Appropriate HTTP status codes used?
   - [ ] Consistent error response format?

3. **Code Quality:**
   - [ ] Function names descriptive and clear?
   - [ ] Comments provided for complex logic?
   - [ ] Magic numbers/strings converted to constants?

4. **Performance Considerations:**
   - [ ] Efficient data structures used (Map vs Array)?
   - [ ] No unnecessary iterations?
   - [ ] Memory leaks prevented?

**SA Recommendations:**
```javascript
// Example: SA แนะนำปรับปรุง performance
// แทนที่จะใช้:
agents.forEach(agent => {
  if (agent.status === status) results.push(agent);
});

// ใช้:
const results = agents.filter(agent => agent.status === status);
```

### ✅ Phase 2 Completion Checklist

#### Developer Tasks:
- [ ] Agent Model สร้างและทดสอบได้
- [ ] Sample data loading สำเร็จ
- [ ] Controller functions ที่ให้มาทำงานได้
- [ ] TODO functions คืน 501 error (พร้อมให้นักศึกษาทำต่อ)

#### PO Acceptance:
- [ ] Business logic validation ผ่าน
- [ ] Status transition rules ถูกต้อง
- [ ] Data model ตรงกับ requirements

#### Tester Sign-off:
- [ ] Unit test cases สร้างเรียบร้อย
- [ ] Test data templates พร้อมใช้งาน
- [ ] พบ 0 critical bugs ใน existing code

#### SA Approval:
- [ ] Code architecture ถูกต้อง
- [ ] Error handling patterns consistent
- [ ] Performance considerations addressed

---

## 🛡️ Phase 3: Validation & Error Handling (70 นาที)

### 🎯 เป้าหมายของ Phase 3
- ✅ สร้าง Joi validation middleware
- ✅ จัดการ global error handling
- ✅ ทดสอบ validation scenarios
- ✅ สร้าง performance monitoring

### 👨‍💻 งาน Developer

#### Step 7: Joi Validation Setup (35 นาที)

**สร้าง `middleware/validation.js`:**
```javascript
// middleware/validation.js
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

  // 📄 TODO #4: นักศึกษาทำเอง (15 นาที)
  statusUpdate: Joi.object({
    // TODO: สร้าง validation สำหรับ status update
    // Requirements:
    // 1. status ต้องเป็น valid AGENT_STATUS
    // 2. reason เป็น optional string ไม่เกิน 200 ตัวอักษร
    // 3. ใส่ error messages ที่เหมาะสม
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

// 📄 TODO #5: นักศึกษาทำเอง (10 นาที)
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

**📋 Developer Learning Tasks:**
1. ศึกษา Joi validation patterns
2. ทำความเข้าใจ middleware chain
3. ทดสอบ validation กับ invalid data
4. เรียนรู้ error message customization

#### Step 8: Global Error Handler (20 นาที)

**สร้าง `middleware/errorHandler.js`:**
```javascript
// middleware/errorHandler.js
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
      console.warn(`🌀 Slow request: ${req.method} ${req.url} took ${duration}ms`);
    }
    
    console.log(`⚡ ${req.method} ${req.url}: ${duration}ms - ${res.statusCode}`);
  });
  
  next();
};

module.exports = { globalErrorHandler, notFoundHandler, performanceMonitor };
```

#### Step 9: Routes Setup (15 นาที)

**สร้าง `routes/agents.js`:**
```javascript
// routes/agents.js
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

**สร้าง `routes/index.js`:**
```javascript
// routes/index.js
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

### 📊 งาน PO - Validation Requirements Review

**PO ต้องกำหนด Business Rules สำหรับ Validation:**

1. **Agent Code Format Rules:**
   ```
   Business Rule: Agent Code Format
   Pattern: [Letter][3 digits]
   Valid Examples: A001, B002, S001
   Invalid Examples: AA01, A1, 001, Agent1
   
   Rationale: เพื่อให้ง่ายต่อการจดจำและจัดหมวดหมู่
   - A = Agent
   - S = Supervisor  
   - B = Backup Agent
   ```

2. **Department Validation:**
   ```
   Business Rule: Valid Departments
   Allowed Values: Sales, Support, Technical, General, Supervisor
   Default Value: General
   
   Rationale: ต้องสอดคล้องกับโครงสร้างองค์กร
   ```

3. **Status Transition Rules:**
   ```
   Business Rule: Status Transition Matrix
   Available -> [Busy, Break, Not Ready, Offline]
   Busy -> [Available, Wrap, Not Ready]  
   Wrap -> [Available, Not Ready]
   Break -> [Available, Not Ready]
   Not Ready -> [Available, Offline]
   Offline -> [Available]
   
   Rationale: ป้องกันการเปลี่ยนสถานะที่ไม่สมเหตุสมผล
   ```

**PO Acceptance Criteria:**
```
Feature: Input Validation
Scenario: Create agent with invalid data
Given: User submits agent data with invalid agentCode "123"
When: API processes the request
Then: API should return 400 Bad Request
And: Error message should clearly explain the format requirement
And: No agent should be created in the system

Scenario: Status transition validation  
Given: Agent A001 has status "Available"
When: User tries to change status to "Wrap"
Then: API should return 400 Bad Request
And: Error message should list valid transitions
And: Agent status should remain "Available"
```

### 🧪 งาน Tester - Validation Testing Strategy

**Tester ต้องสร้าง Comprehensive Test Suite:**

#### Test Category 1: Input Validation Tests
```
TC301: Agent Code Validation
Test Data:
- Valid: "A001", "B002", "S999" 
- Invalid: "AA01", "A1", "001", "Agent1", "", null

TC302: Email Validation
Test Data:
- Valid: "user@domain.com", "test.email@company.co.th"
- Invalid: "notanemail", "user@", "@domain.com", "", null

TC303: Name Validation  
Test Data:
- Valid: "John Doe", "สมชาย ใจดี", "A-B"
- Invalid: "X", "", "Name that is way too long exceeding 100 characters...", null

TC304: Department Validation
Test Data:
- Valid: "Sales", "Support", "Technical", "General", "Supervisor"
- Invalid: "Marketing", "HR", "", null, 123
```

#### Test Category 2: Status Transition Tests
```
TC305: Valid Status Transitions
Test Cases:
- Available -> Busy: Should succeed
- Busy -> Wrap: Should succeed  
- Wrap -> Available: Should succeed
- Available -> Break: Should succeed

TC306: Invalid Status Transitions
Test Cases:
- Available -> Wrap: Should fail with 400
- Busy -> Break: Should fail with 400
- Wrap -> Offline: Should fail with 400
```

**Test Data Templates สำหรับ Postman:**
```json
{
  "validAgent": {
    "agentCode": "T001",
    "name": "Test Agent", 
    "email": "test@company.com",
    "department": "Sales",
    "skills": ["Thai", "English"]
  },
  "invalidAgentCode": {
    "agentCode": "INVALID",
    "name": "Test Agent",
    "email": "test@company.com"
  },
  "invalidEmail": {
    "agentCode": "T002", 
    "name": "Test Agent",
    "email": "not-an-email"
  },
  "validStatusUpdate": {
    "status": "Busy",
    "reason": "Handling customer call"
  },
  "invalidStatusUpdate": {
    "status": "InvalidStatus",
    "reason": "Test reason"
  }
}
```

### 🏗️ งาน SA - Security & Performance Review

**SA Security Checklist:**

1. **Input Sanitization:**
   ```javascript
   // SA แนะนำเพิ่ม security middleware
   const helmet = require('helmet');
   const rateLimit = require('express-rate-limit');
   
   // ป้องกัน XSS attacks
   app.use(helmet());
   
   // Rate limiting
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   app.use('/api/', limiter);
   ```

2. **Error Information Disclosure:**
   ```javascript
   // SA ตรวจสอบว่า error messages ไม่เปิดเผยข้อมูลที่ sensitive
   // ❌ Bad: แสดง database error โดยตรง
   return res.status(500).json({ error: err.stack });
   
   // ✅ Good: แสดงเฉพาะข้อมูลที่จำเป็น
   return sendError(res, 'Internal server error', 500);
   ```

3. **Performance Monitoring:**
   ```javascript
   // SA แนะนำติดตาม performance metrics
   const performanceThresholds = {
     slow: 1000,      // > 1 second = slow
     critical: 5000   // > 5 seconds = critical
   };
   ```

**SA Code Review Points:**
- [ ] Validation schemas ครอบคลุม edge cases?
- [ ] Error messages ไม่เปิดเผยข้อมูลที่ sensitive?
- [ ] Performance monitoring มีการ log ที่เหมาะสม?
- [ ] Memory usage optimized (ไม่มี memory leaks)?

### ✅ Phase 3 Completion Checklist

#### Developer Tasks:
- [ ] Joi validation schemas สร้างเรียบร้อย
- [ ] Validation middleware ทำงานได้
- [ ] Global error handler setup เสร็จ
- [ ] Routes เชื่อมต่อกับ middleware ถูกต้อง
- [ ] Performance monitoring ทำงาน

#### PO Acceptance:
- [ ] Validation rules สอดคล้องกับ business requirements
- [ ] Error messages ชัดเจนและเป็นมิตรกับผู้ใช้
- [ ] Status transition rules ถูกต้องตาม business process

#### Tester Sign-off:
- [ ] Validation test cases ครอบคลุม positive และ negative scenarios
- [ ] Test data templates พร้อมใช้งาน
- [ ] Edge cases ได้รับการทดสอบ

#### SA Approval:
- [ ] Security considerations addressed
- [ ] Performance monitoring implemented
- [ ] Error handling follows best practices
- [ ] No sensitive information leakage

---

## 🖥️ Phase 4: Main Server & Integration Testing (70 นาที)

### 🎯 เป้าหมายของ Phase 4
- ✅ สร้าง main server.js
- ✅ Integration testing ทุก endpoints
- ✅ สร้าง documentation และ README
- ✅ เตรียมข้อมูลสำหรับ Phase 2

### 👨‍💻 งาน Developer

#### Step 10: Main Server Setup (15 นาที)

**สร้าง `server.js`:**
```javascript
// server.js
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

**Package.json Scripts Update:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo 'Run Postman tests - see README.md'",
    "docs": "echo 'API Documentation: http://localhost:3001/api/docs'"
  }
}
```

#### Step 11: Complete Testing Protocol (35 นาที)

**Integration Testing Sequence - ทำตามลำดับนี้:**

```bash
# 1. Start server
npm run dev

# 2. Test system health
curl http://localhost:3001/
curl http://localhost:3001/api/health
curl http://localhost:3001/api/docs
```

**Expected Results:**
```json
// GET / Response
{
  "success": true,
  "message": "Agent Wallboard API Enhanced v1.0",
  "version": "1.0.0",
  "environment": "development"
}

// GET /api/health Response
{
  "success": true,
  "status": "OK",
  "uptime": 45,
  "timestamp": "2025-01-01T10:00:00.000Z",
  "version": "1.0.0",
  "environment": "development"
}
```

**API Testing Sequence:**

1. **Get All Agents (ทดสอบ sample data):**
```bash
curl http://localhost:3001/api/agents
```

2. **Create New Agent (ทดสอบ validation):**
```bash
curl -X POST http://localhost:3001/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "agentCode": "T001",
    "name": "Test Agent",
    "email": "test@company.com",
    "department": "Sales",
    "skills": ["Thai", "English"]
  }'
```

3. **Test Validation Errors:**
```bash
curl -X POST http://localhost:3001/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "agentCode": "invalid",
    "name": "X",
    "email": "not-email"
  }'
```

4. **Get Agent by ID:**
```bash
# ใช้ ID ที่ได้จากการสร้าง agent
curl http://localhost:3001/api/agents/[AGENT-ID]
```

5. **Update Agent Status:**
```bash
curl -X PATCH http://localhost:3001/api/agents/[AGENT-ID]/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Busy",
    "reason": "Handling customer call"
  }'
```

6. **Get Status Summary:**
```bash
curl http://localhost:3001/api/agents/status/summary
```

#### Step 12: Documentation Creation (20 นาที)

**สร้าง `README.md`:**
```markdown
# Agent Wallboard API - Phase 1 Complete

> Professional Node.js API สำหรับจัดการ Call Center Agents แบบ Real-time

## ✨ Features
- 🏗️ Professional MVC project structure
- ✅ Input validation with Joi
- 🛡️ Security middleware (Helmet)
- 📝 Request logging และ performance monitoring
- ⚠️ Global error handling
- 📊 Consistent API response format

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Start development server
npm run dev

# 4. Test API
curl http://localhost:3001/api/health
```

## 📗 API Endpoints

### 📊 System Information
- `GET /` - API information
- `GET /api/health` - Health check  
- `GET /api/docs` - API documentation

### 👥 Agent Management
- `GET /api/agents` - List agents (supports `?status=` and `?department=`)
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
# Health check
curl http://localhost:3001/api/health

# Get all agents  
curl http://localhost:3001/api/agents

# Create new agent
curl -X POST http://localhost:3001/api/agents \
  -H "Content-Type: application/json" \
  -d '{"agentCode":"A999","name":"Test Agent","email":"test@company.com","department":"Sales"}'
```

### Test Results Template
```
Test Execution Date: [DATE]
Tester Name: [NAME]
Environment: Development

System Tests:
□ Server starts without errors
□ Health endpoint responds correctly
□ Documentation endpoint accessible
□ Performance monitoring active

API Tests:  
□ GET /api/agents returns sample data
□ POST /api/agents creates new agent
□ Validation blocks invalid data
□ Status transitions work correctly
□ Error responses consistent

Issues Found:
- [List any bugs or issues]

Sign-off: [TESTER NAME] [DATE]
```

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

## 🚨 Troubleshooting

### Common Issues
```bash
# Issue: Port already in use
# Solution: 
killall node
# หรือเปลี่ยน PORT ใน .env

# Issue: Validation ไม่ทำงาน
# Solution: ตรวจสอب middleware order ใน routes

# Issue: CORS error  
# Solution: ตรวจสอบ FRONTEND_URL ใน .env
```

## 🎯 Next Steps (Phase 2)
- Database integration (MSSQL + MongoDB)
- JWT authentication
- WebSocket real-time features  
- Advanced logging และ monitoring

## 🏆 Team Credits
- **Developer**: [Student Name]
- **Product Owner**: [PO Name]  
- **Tester**: [Tester Name]
- **System Analyst**: [SA Name]

**Project Completion Date**: [DATE]
**Phase 1 Duration**: 4.5 hours
**Next Phase**: Database Integration (Phase 2)
```

### 📊 งาน PO - Final Acceptance Testing

**PO Final Checklist:**

1. **Business Requirements Validation:**
```
□ Agent CRUD operations ทำงานครบถ้วน
□ Status transition rules ถูกต้องตาม business logic  
□ Data validation ป้องกัน invalid data entry
□ Error messages เป็นมิตรกับผู้ใช้
□ API response format consistent ทุก endpoints
```

2. **User Story Acceptance:**
```
User Story: ในฐานะ Supervisor ฉันต้องการดูรายชื่อ agents ทั้งหมดพร้อมสถานะปัจจุบัน
Acceptance Test: GET /api/agents ส่งคืนข้อมูล agents พร้อม status, department, skills
Result: □ PASS □ FAIL

User Story: ในฐานะ Supervisor ฉันต้องการเปลี่ยนสถานะ agent เมื่อจำเป็น  
Acceptance Test: PATCH /api/agents/:id/status ทำงานได้และมี validation
Result: □ PASS □ FAIL

User Story: ในฐานะ Administrator ฉันต้องการป้องกันการใส่ข้อมูลผิดรูปแบบ
Acceptance Test: ระบบ validate input และส่ง error messages ที่ชัดเจน
Result: □ PASS □ FAIL
```

3. **Performance Acceptance:**
```
□ API response time < 1 second สำหรับ normal requests
□ Server รองรับ concurrent requests ได้
□ Memory usage อยู่ในเกณฑ์ปกติ
□ Error handling ไม่ทำให้ server crash
```

### 🧪 งาน Tester - Final Test Report

**Comprehensive Test Report Template:**

```
AGENT WALLBOARD API PHASE 1 - TEST REPORT
=========================================

Test Information:
- Test Period: [Start Date] to [End Date]  
- Tester: [Name]
- Environment: Development
- API Version: 1.0.0

Test Summary:
- Total Test Cases: [Number]
- Passed: [Number]
- Failed: [Number]  
- Blocked: [Number]
- Success Rate: [Percentage]%

Functional Test Results:
□ System Health Tests (TC001-TC003): PASS/FAIL
□ Agent CRUD Operations (TC101-TC106): PASS/FAIL
□ Validation Tests (TC301-TC306): PASS/FAIL
□ Status Transition Tests (TC401-TC403): PASS/FAIL
□ Error Handling Tests (TC501-TC503): PASS/FAIL

Performance Test Results:
□ Response Time < 1000ms: PASS/FAIL
□ Concurrent Request Handling: PASS/FAIL
□ Memory Usage Acceptable: PASS/FAIL

Security Test Results:
□ Input Sanitization: PASS/FAIL
□ Error Information Disclosure: PASS/FAIL
□ CORS Configuration: PASS/FAIL

Critical Issues Found:
1. [Issue Description] - Priority: High/Medium/Low
2. [Issue Description] - Priority: High/Medium/Low

Recommendation:
□ READY FOR PRODUCTION
□ READY WITH MINOR FIXES
□ REQUIRES MAJOR FIXES
□ NOT READY

Tester Sign-off: [Name] [Date]
```

**Detailed Test Cases:**

```
TC001: System Health Verification
Steps:
1. Start server with npm run dev
2. GET http://localhost:3001/
3. GET http://localhost:3001/api/health
4. GET http://localhost:3001/api/docs

Expected:
- All endpoints return 200 OK
- JSON responses well-formed
- Server logs show no errors

Result: □ PASS □ FAIL
Notes: [Any observations]

TC101: Get All Agents
Steps:  
1. GET http://localhost:3001/api/agents
2. Verify sample data present
3. Test with filter: ?status=Available
4. Test with filter: ?department=Sales

Expected:
- Returns agent array with sample data
- Filtering works correctly
- Response format consistent

Result: □ PASS □ FAIL

TC201: Create Agent - Valid Data
Test Data:
{
  "agentCode": "T999",
  "name": "Test Agent",
  "email": "test@company.com", 
  "department": "Sales",
  "skills": ["Thai", "English"]
}

Expected:
- 201 Created status
- Agent created successfully
- Correct response format

Result: □ PASS □ FAIL

TC301: Validation - Invalid Agent Code
Test Data:
{
  "agentCode": "INVALID123",
  "name": "Test Agent",
  "email": "test@company.com"
}

Expected:
- 400 Bad Request status
- Clear validation error message
- No agent created

Result: □ PASS □ FAIL

TC401: Status Transition - Valid
Steps:
1. Create agent with status "Available"
2. PATCH status to "Busy"
3. Verify status changed
4. Check status history updated

Expected:
- Status updated successfully
- Status history recorded
- Timestamps correct

Result: □ PASS □ FAIL

TC402: Status Transition - Invalid
Steps:
1. Create agent with status "Available" 
2. PATCH status to "Wrap" (invalid transition)

Expected:
- 400 Bad Request
- Error explains valid transitions
- Status unchanged

Result: □ PASS □ FAIL
```

### 🏗️ งาน SA - Architecture Review & Phase 2 Preparation

**SA Final Architecture Assessment:**

1. **Code Quality Metrics:**
```javascript
// SA ตรวจสอบ metrics เหล่านี้:
const qualityMetrics = {
  codeComplexity: 'Low',        // ✅ Functions มี single responsibility
  errorHandling: 'Comprehensive', // ✅ Try-catch ครอบคลุม
  codeReusability: 'High',      // ✅ Utils และ helpers ใช้ซ้ำได้
  maintainability: 'Excellent', // ✅ Structure ชัดเจน
  scalability: 'Good',          // ✅ เตรียมพร้อมสำหรับ Phase 2
  securityLevel: 'Basic'        // ⚠️ ต้องเพิ่มใน Phase 2
};
```

2. **Technical Debt Assessment:**
```
□ No magic numbers - constants used properly
□ No code duplication - DRY principle followed  
□ No dead code - all functions used
□ No security vulnerabilities identified
□ Memory leaks prevented
□ Performance bottlenecks identified and documented
```

3. **Phase 2 Readiness Checklist:**
```
Architecture Readiness:
□ MVC pattern well-established
□ Middleware chain properly structured
□ Error handling centralized
□ API routes organized logically
□ Code follows consistent naming conventions

Database Integration Readiness:
□ Models abstracted from data source
□ Controllers independent of storage mechanism
□ Validation layer separated from business logic
□ Error handling ready for database errors

Security Readiness:
□ Input validation framework established
□ Error handling doesn't leak sensitive info
□ CORS properly configured
□ Request logging implemented
```

**SA Recommendations for Phase 2:**
```javascript
// Phase 2 พัฒนาที่ SA แนะนำ:

// 1. Database Abstraction Layer
class DatabaseManager {
  constructor() {
    // จะเชื่อมต่อ MSSQL + MongoDB ใน Phase 2
    this.mssql = null; // Agent master data
    this.mongodb = null; // Real-time logs
  }
}

// 2. Authentication Middleware
const authenticateUser = (req, res, next) => {
  // JWT validation จะเพิ่มใน Phase 2
};

// 3. WebSocket Integration
const WebSocket = require('ws');
// Real-time communication ใน Phase 2

// 4. Advanced Logging
const winston = require('winston');
// Structured logging ใน Phase 2
```

### ✅ Phase 4 & Project Completion Checklist

#### Developer Final Tasks:
- [ ] Server.js ทำงานได้สมบูรณ์
- [ ] ทุก endpoints ผ่านการทดสอบ
- [ ] Documentation ครบถ้วน
- [ ] README.md อธิบายการใช้งานชัดเจน
- [ ] Code ผ่าน SA review
- [ ] Performance monitoring ทำงาน
- [ ] Error logging ชัดเจน

#### PO Final Acceptance:
- [ ] ทุก business requirements ได้รับการพัฒนา
- [ ] User stories ทั้งหมด PASS
- [ ] Acceptance criteria ครบถ้วน
- [ ] API behavior สอดคล้องกับ specification
- [ ] Error messages เป็นมิตรกับผู้ใช้
- [ ] Performance เป็นไปตามคาดหวัง

#### Tester Final Sign-off:
- [ ] ทุก test cases PASS
- [ ] Edge cases ผ่านการทดสอบ
- [ ] Performance tests ผ่าน
- [ ] Security tests ผ่าน
- [ ] No critical bugs outstanding
- [ ] Test report สมบูรณ์

#### SA Final Approval:
- [ ] Architecture design ถูกต้องและ scalable
- [ ] Code quality standards ผ่าน
- [ ] Security considerations addressed
- [ ] Performance optimized
- [ ] Ready for Phase 2 development
- [ ] Technical debt minimal

---

## 🎓 Student Learning Outcomes & Team Collaboration Review

### 📊 Skills Developed (สำหรับนักศึกษา)

#### Technical Skills:
1. **Backend API Development**
   - Node.js และ Express.js framework
   - RESTful API design principles
   - MVC architecture pattern
   - Input validation with Joi
   - Error handling strategies

2. **Software Engineering Practices**
   - Project structure organization
   - Separation of concerns
   - Code reusability and maintainability
   - Documentation writing
   - Testing methodologies

3. **Professional Development Skills**
   - Working with different team roles
   - Communication with PO, Tester, SA
   - Requirements understanding
   - Problem-solving approach
   - Code review participation

#### Team Collaboration Skills:
1. **Communication**
   - Technical explanations to non-technical team members
   - Progress reporting and status updates
   - Issue escalation and problem reporting
   - Documentation for team understanding

2. **Project Management**
   - Meeting deadlines and milestones
   - Task prioritization
   - Quality assurance participation
   - Continuous improvement mindset

### 🏆 Project Success Metrics

#### Quantitative Metrics:
```
Code Quality:
- Lines of Code: ~800-1200 lines
- Functions Implemented: 15+ functions
- Test Cases Coverage: 20+ test cases
- Documentation Pages: Complete README + inline comments

Performance:
- API Response Time: <1000ms average
- Error Rate: <1% under normal load
- Uptime: 99.9% during development period

Team Collaboration:
- Daily Standups: [Number] meetings
- Issues Resolved: [Number] issues  
- Code Reviews: [Number] reviews
- Knowledge Transfer Sessions: [Number] sessions
```

#### Qualitative Assessment:
```
Student Self-Assessment (1-5 scale):
□ Understanding of MVC pattern: ___/5
□ Ability to implement REST APIs: ___/5
□ Error handling comprehension: ___/5
□ Team communication skills: ___/5
□ Problem-solving ability: ___/5
□ Code quality awareness: ___/5

PO Assessment:
□ Requirements understanding: ___/5
□ Business logic implementation: ___/5
□ Communication effectiveness: ___/5

Tester Assessment:
□ Code testability: ___/5
□ Bug fix responsiveness: ___/5
□ Quality consciousness: ___/5

SA Assessment:
□ Technical design understanding: ___/5
□ Code architecture quality: ___/5
□ Best practices adoption: ___/5
```

### 📚 Knowledge Transfer & Documentation

#### For Next Developer (Phase 2):
```markdown
# Phase 1 to Phase 2 Handover Document

## What Was Built:
- Complete REST API with CRUD operations
- In-memory data storage (Map-based)
- Joi validation system
- Global error handling
- Performance monitoring
- Professional project structure

## Key Files to Understand:
1. `models/Agent.js` - Core business entity
2. `controllers/agentController.js` - Business logic
3. `middleware/validation.js` - Input validation
4. `utils/constants.js` - Business rules
5. `server.js` - Application entry point

## Phase 2 Integration Points:
1. Replace Map storage with Database connections
2. Add JWT authentication middleware  
3. Implement WebSocket for real-time features
4. Add advanced logging and monitoring

## Known Limitations (By Design):
- Data stored in memory (will be database in Phase 2)
- No authentication (will be JWT in Phase 2)
- No real-time updates (will be WebSocket in Phase 2)
- Basic error logging (will be Winston in Phase 2)

## Technical Debt to Address:
- None significant - code ready for Phase 2
- Consider adding more comprehensive input sanitization
- May need to optimize for larger datasets in Phase 2
```

### 🔄 Continuous Improvement Process

#### Lessons Learned Session (30 นาที):
```
What Went Well:
- [Team feedback on successful practices]
- [Technical implementations that worked well]
- [Effective communication patterns]

What Could Be Improved:
- [Areas for team process improvement]  
- [Technical challenges that took longer than expected]
- [Communication gaps that occurred]

Action Items for Future Projects:
- [Specific improvements to implement]
- [Skills to develop further]
- [Process changes to adopt]

Knowledge Sharing:
- [Key technical insights gained]
- [Best practices discovered]
- [Tools and techniques to remember]
```

#### Future Development Roadmap:
```
Phase 2 Preparation (Next 1-2 weeks):
- Study database integration patterns
- Learn JWT authentication concepts
- Understand WebSocket programming
- Review MongoDB and MSSQL basics

Phase 3 Preparation (Next 2-4 weeks):  
- Advanced Node.js patterns
- Microservices architecture
- Docker containerization
- Production deployment strategies

Long-term Skills Development:
- System design principles
- Performance optimization
- Security best practices
- Cloud platform integration
```

---

## 📋 Final Deliverables Checklist

### 🗂️ Code Deliverables:
- [ ] Complete source code in organized folder structure
- [ ] README.md with comprehensive documentation
- [ ] .env.example with configuration template
- [ ] package.json with correct dependencies and scripts
- [ ] All TODO functions implemented and tested

### 📊 Documentation Deliverables:
- [ ] API documentation with endpoint specifications
- [ ] Test cases and test results
- [ ] Architecture decisions document
- [ ] Team collaboration summary
- [ ] Lessons learned report

### 🧪 Testing Deliverables:
- [ ] Postman collection with all test cases
- [ ] Test execution report
- [ ] Bug report and resolution log
- [ ] Performance test results
- [ ] Security test assessment

### 👥 Team Deliverables:
- [ ] Project retrospective summary
- [ ] Individual role contribution summaries
- [ ] Knowledge transfer documentation
- [ ] Recommendations for future development
- [ ] Phase 2 preparation checklist

---

## 🎯 Success Criteria Summary

**ผ่านเกณฑ์ Phase 1 เมื่อ:**

✅ **Technical Requirements (40%)**
- API endpoints ทำงานครบถ้วนตาม specification
- Validation system ป้องกัน invalid data
- Error handling ครอบคลุมและสม่ำเสมอ
- Performance อยู่ในเกณฑ์ที่กำหนด

✅ **Code Quality (25%)**  
- MVC architecture ถูกต้องและชัดเจน
- Code organization ตาม best practices
- Documentation ครบถ้วนและเข้าใจง่าย
- Error messages เป็นมิตรกับผู้ใช้

✅ **Team Collaboration (20%)**
- Communication ระหว่าง roles มีประสิทธิภาพ
- Requirements ได้รับการทำความเข้าใจถูกต้อง
- Issues ได้รับการแก้ไขทันท่วงที
- Knowledge sharing เกิดขึ้นสม่ำเสมอ

✅ **Testing & Quality Assurance (15%)**
- Test coverage ครอบคลุม functional requirements
- Bug fixing process มีประสิทธิภาพ
- Quality gates ผ่านตามเกณฑ์
- User acceptance criteria พึงพอใจ

**🏆 โปรเจค Phase 1 สำเร็จเมื่อทีมทุกคนยืนยันว่า:**
- นักศึกษาสามารถพัฒนา API ได้ตามมาตรฐานอุตสาหกรรม
- ผลงานพร้อมสำหรับการพัฒนา Phase 2 ต่อไป  
- ทีมมีความมั่นใจในคุณภาพของผลงาน
- ประสบการณ์การทำงานเป็นทีมเป็นไปอย่างราบรื่น

---

*คู่มือนี้ออกแบบมาเพื่อให้นักศึกษาได้เรียนรู้การพัฒนาซอฟต์แวร์อย่างเป็นระบบและการทำงานเป็นทีมในสภาพแวดล้อมที่เหมือนจริง รวมถึงการสื่อสารกับ stakeholders ต่างๆ ที่จะพบในโลกการทำงานจริง*