# Phase 1 Enhanced: Agent Wallboard API with Professional Structure

## 📋 **Enhanced Phase 1 Overview**

**Original Phase 1:** Basic API + CRUD (ทำงานได้แต่โครงสร้างเรียบง่าย)  
**Enhanced Phase 1:** Professional API Structure + Essential Middleware (โครงสร้างมืออาชีพแต่ไม่ซับซ้อน)

### 🎯 **Enhanced Learning Objectives:**
1. **Better Project Structure** - แยก routes, controllers, middleware 
2. **Input Validation** - ใช้ Joi สำหรับ validation ที่ดีขึ้น
3. **Error Handling** - จัดการ error แบบมืออาชีพ
4. **API Standards** - Response format ที่สม่ำเสมอ
5. **Basic Security** - Helmet middleware สำหรับความปลอดภัย

### ⏰ **Time Allocation:**
- **Hour 1:** Enhanced Project Structure + Setup (60 นาที)
- **Hour 2:** Professional Routes + Controllers (60 นาที)  
- **Hour 3:** Joi Validation + Error Handling (60 นาที)
- **Hour 4:** Testing + Documentation (60 นาที)

---

## ⏰ **HOUR 1: Enhanced Project Structure (60 นาที)**

### 🏗️ **Better Project Structure (20 นาที)**

**Enhanced Structure (ไม่ซับซ้อนเกินไป):**
```
agent-wallboard-api/
├── 📁 controllers/
│   └── agentController.js      # Business logic แยกจาก routes
├── 📁 middleware/
│   ├── validation.js          # Joi validation
│   └── errorHandler.js        # Error handling
├── 📁 models/
│   └── Agent.js               # Agent model พร้อม methods
├── 📁 routes/
│   ├── agents.js              # Agent routes
│   └── index.js               # Routes aggregator
├── 📁 utils/
│   ├── constants.js           # System constants
│   └── apiResponse.js         # Response helpers
├── 📄 server.js               # Main server
├── 📄 package.json
├── 📄 .env
└── 📄 README.md
```

### 🔧 **Dependencies Installation (15 นาที)**
```bash
# เดิม
npm install express cors dotenv
npm install --save-dev nodemon

# เพิ่มใหม่ (สำหรับ professional structure)
npm install joi helmet morgan

# อธิบาย:
# joi = input validation ที่ดีกว่า if/else
# helmet = basic security headers
# morgan = HTTP request logging
```

### ⚙️ **Enhanced Server Setup (25 นาที)**
```javascript
// server.js - Enhanced but not complex
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import routes
const routes = require('./routes');
const { globalErrorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Basic security middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));

// Simple request logging (ดูว่า API ถูกเรียกเมื่อไหร่)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Agent Wallboard API Enhanced v1.0',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: ['/api/agents', '/api/docs']
  });
});

// API routes
app.use('/api', routes);

// Error handlers
app.use('*', notFoundHandler);
app.use(globalErrorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Enhanced Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
});
```

### 📁 **Routes Aggregator (เชื่อม routes ทั้งหมด)**
```javascript
// routes/index.js - เชื่อม routes ทั้งหมดไว้ที่เดียว
const express = require('express');
const agentRoutes = require('./agents');

const router = express.Router();

// API health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
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
      'GET /api/agents': 'List all agents',
      'POST /api/agents': 'Create new agent',
      'GET /api/agents/:id': 'Get specific agent',
      'PUT /api/agents/:id': 'Update agent',
      'PATCH /api/agents/:id/status': 'Update agent status',
      'DELETE /api/agents/:id': 'Delete agent',
      'GET /api/agents/status/summary': 'Agent status summary'
    }
  });
});

// Mount routes
router.use('/agents', agentRoutes);

module.exports = router;
```

---

## ⏰ **HOUR 2: Professional Routes + Controllers (60 นาที)**

### 📊 **Enhanced Agent Model (20 นาที)**
```javascript
// models/Agent.js - Enhanced with better methods
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
    this.statusHistory = []; // เก็บประวัติการเปลี่ยนสถานะ
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
  }

  generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  }

  updateStatus(newStatus, reason = null) {
    // เก็บประวัติ
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

  // สำหรับ admin ดูประวัติ (bonus feature)
  getStatusHistory() {
    return this.statusHistory;
  }
}

// In-memory storage with sample data
const agents = new Map();

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

// Initialize data
initializeSampleData();

module.exports = { Agent, agents };
```

### 🎮 **Professional Controller (25 นาที)**
```javascript
// controllers/agentController.js - Business logic แยกจาก routes
const { Agent, agents } = require('../models/Agent');
const { AGENT_STATUS, VALID_STATUS_TRANSITIONS } = require('../utils/constants');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const agentController = {
  // GET /api/agents
  getAllAgents: (req, res) => {
    try {
      const { status, department } = req.query;
      let agentList = Array.from(agents.values());

      // Simple filtering
      if (status) {
        agentList = agentList.filter(agent => agent.status === status);
      }
      
      if (department) {
        agentList = agentList.filter(agent => agent.department === department);
      }

      console.log(`📋 Retrieved ${agentList.length} agents`);
      
      return sendSuccess(res, 'Agents retrieved successfully', 
        agentList.map(agent => agent.toJSON())
      );
    } catch (error) {
      console.error('Error in getAllAgents:', error);
      return sendError(res, 'Failed to retrieve agents', 500);
    }
  },

  // GET /api/agents/:id
  getAgentById: (req, res) => {
    try {
      const { id } = req.params;
      const agent = agents.get(id);

      if (!agent) {
        return sendError(res, 'Agent not found', 404);
      }

      return sendSuccess(res, 'Agent retrieved successfully', agent.toJSON());
    } catch (error) {
      console.error('Error in getAgentById:', error);
      return sendError(res, 'Failed to retrieve agent', 500);
    }
  },

  // POST /api/agents  
  createAgent: (req, res) => {
    try {
      const agentData = req.body;

      // Check duplicate agent code
      const existingAgent = Array.from(agents.values())
        .find(agent => agent.agentCode === agentData.agentCode);
      
      if (existingAgent) {
        return sendError(res, `Agent code ${agentData.agentCode} already exists`, 409);
      }

      // Create new agent
      const newAgent = new Agent(agentData);
      agents.set(newAgent.id, newAgent);
      
      console.log(`✅ Created agent: ${newAgent.agentCode} - ${newAgent.name}`);
      return sendSuccess(res, 'Agent created successfully', newAgent.toJSON(), 201);
    } catch (error) {
      console.error('Error in createAgent:', error);
      return sendError(res, 'Failed to create agent', 500);
    }
  },

  // PUT /api/agents/:id
  updateAgent: (req, res) => {
    try {
      const { id } = req.params;
      const agent = agents.get(id);

      if (!agent) {
        return sendError(res, 'Agent not found', 404);
      }

      const { name, email, department, skills } = req.body;
      
      // Update allowed fields
      if (name) agent.name = name;
      if (email) agent.email = email;
      if (department) agent.department = department;
      if (skills) agent.skills = skills;
      
      agent.updatedAt = new Date();
      
      console.log(`✏️ Updated agent: ${agent.agentCode}`);
      return sendSuccess(res, 'Agent updated successfully', agent.toJSON());
    } catch (error) {
      console.error('Error in updateAgent:', error);
      return sendError(res, 'Failed to update agent', 500);
    }
  },

  // PATCH /api/agents/:id/status
  updateAgentStatus: (req, res) => {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;
      const agent = agents.get(id);

      if (!agent) {
        return sendError(res, 'Agent not found', 404);
      }

      // Validate status
      if (!Object.values(AGENT_STATUS).includes(status)) {
        return sendError(res, 
          `Invalid status. Valid statuses: ${Object.values(AGENT_STATUS).join(', ')}`, 
          400
        );
      }

      // Check valid transition
      const currentStatus = agent.status;
      const validTransitions = VALID_STATUS_TRANSITIONS[currentStatus];
      
      if (!validTransitions.includes(status)) {
        return sendError(res, 
          `Cannot change from ${currentStatus} to ${status}. Valid transitions: ${validTransitions.join(', ')}`, 
          400
        );
      }

      // Update status
      const previousStatus = agent.status;
      agent.updateStatus(status, reason);
      
      console.log(`🔄 Agent ${agent.agentCode}: ${previousStatus} → ${status}`);
      
      return sendSuccess(res, `Agent status updated to ${status}`, agent.toJSON());
    } catch (error) {
      console.error('Error in updateAgentStatus:', error);
      return sendError(res, 'Failed to update agent status', 500);
    }
  },

  // DELETE /api/agents/:id
  deleteAgent: (req, res) => {
    try {
      const { id } = req.params;
      const agent = agents.get(id);

      if (!agent) {
        return sendError(res, 'Agent not found', 404);
      }

      agents.delete(id);
      
      console.log(`🗑️ Deleted agent: ${agent.agentCode} - ${agent.name}`);
      return sendSuccess(res, 'Agent deleted successfully');
    } catch (error) {
      console.error('Error in deleteAgent:', error);
      return sendError(res, 'Failed to delete agent', 500);
    }
  },

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
      return sendError(res, 'Failed to get status summary', 500);
    }
  }
};

module.exports = agentController;
```

### 🛤️ **Enhanced Routes (15 นาที)**
```javascript
// routes/agents.js - Routes เชื่อมกับ controller
const express = require('express');
const agentController = require('../controllers/agentController');
const { validateAgent, validateStatusUpdate } = require('../middleware/validation');

const router = express.Router();

// GET /api/agents - List all agents
router.get('/', agentController.getAllAgents);

// GET /api/agents/status/summary - ต้องมาก่อน /:id
router.get('/status/summary', agentController.getStatusSummary);

// GET /api/agents/:id - Get specific agent
router.get('/:id', agentController.getAgentById);

// POST /api/agents - Create new agent (with validation)
router.post('/', validateAgent, agentController.createAgent);

// PUT /api/agents/:id - Update agent
router.put('/:id', agentController.updateAgent);

// PATCH /api/agents/:id/status - Update agent status (with validation)
router.patch('/:id/status', validateStatusUpdate, agentController.updateAgentStatus);

// DELETE /api/agents/:id - Delete agent
router.delete('/:id', agentController.deleteAgent);

module.exports = router;
```

---

## ⏰ **HOUR 3: Joi Validation + Error Handling (60 นาที)**

### ✅ **Joi Validation Middleware (30 นาที)**
```javascript
// middleware/validation.js - Professional validation with Joi
const Joi = require('joi');
const { AGENT_STATUS, DEPARTMENTS } = require('../utils/constants');
const { sendError } = require('../utils/apiResponse');

// Validation schemas
const schemas = {
  // Agent creation/update validation
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

  // Status update validation
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
      .when('status', {
        is: 'Break',
        then: Joi.optional(), // สามารถใส่ reason เมื่อ Break
        otherwise: Joi.optional()
      })
      .messages({
        'string.max': 'Reason cannot exceed 200 characters'
      })
  })
};

// Validation middleware functions
const validateAgent = (req, res, next) => {
  const { error, value } = schemas.agent.validate(req.body, {
    abortEarly: false, // แสดง error ทั้งหมด
    stripUnknown: true // ลบ fields ที่ไม่รู้จัก
  });

  if (error) {
    const validationErrors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));

    console.log('❌ Validation failed:', validationErrors);
    return sendError(res, 'Validation failed', 400, validationErrors);
  }

  req.body = value; // ใช้ validated data
  next();
};

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

    console.log('❌ Status validation failed:', validationErrors);
    return sendError(res, 'Status validation failed', 400, validationErrors);
  }

  req.body = value;
  next();
};

module.exports = {
  validateAgent,
  validateStatusUpdate
};
```

### ⚠️ **Enhanced Error Handler (20 นาที)**
```javascript
// middleware/errorHandler.js - Professional error handling
const { sendError } = require('../utils/apiResponse');

const globalErrorHandler = (err, req, res, next) => {
  console.error('🚨 Global Error Handler:', {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });

  // Joi validation errors (ถ้า validation ผ่านมาจากที่อื่น)
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

module.exports = { globalErrorHandler, notFoundHandler };
```

### 📊 **API Response Helpers (10 นาที)**
```javascript
// utils/apiResponse.js - Consistent response format
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

---

## ⏰ **HOUR 4: Testing + Documentation (60 นาที)**

### 🧪 **Enhanced Testing with Postman (30 นาที)**

**สร้าง Postman Collection: "Agent Wallboard Enhanced API"**

**Environment Variables:**
```
baseUrl = http://localhost:3001
```

**Enhanced Test Cases:**

1. **Health Check**
   - GET `{{baseUrl}}/api/health`
   - Test: Status 200, response has `success: true`

2. **API Documentation**
   - GET `{{baseUrl}}/api/docs`
   - Test: Status 200, มี endpoints list

3. **Get All Agents**
   - GET `{{baseUrl}}/api/agents`
   - Test: Status 200, มี data array และ count

4. **Filter Agents**
   - GET `{{baseUrl}}/api/agents?status=Available`
   - Test: ทุก agent มี status = Available

5. **Create Agent (Valid)**
   - POST `{{baseUrl}}/api/agents`
   - Body:
   ```json
   {
     "agentCode": "A999",
     "name": "Test Agent",
     "email": "test@company.com",
     "department": "Sales",
     "skills": ["Thai", "English"]
   }
   ```
   - Test: Status 201, agent created

6. **Create Agent (Invalid - Joi Validation)**
   - POST `{{baseUrl}}/api/agents`
   - Body:
   ```json
   {
     "agentCode": "invalid",
     "name": "T",
     "email": "not-email"
   }
   ```
   - Test: Status 400, มี validation errors array

7. **Update Status (Valid)**
   - PATCH `{{baseUrl}}/api/agents/{{agentId}}/status`
   - Body: `{"status": "Busy"}`
   - Test: Status 200, status updated

8. **Update Status (Invalid Transition)**
   - PATCH `{{baseUrl}}/api/agents/{{agentId}}/status`
   - Body: `{"status": "Offline"}` (จาก Available)
   - Test: Status 400, invalid transition error

9. **Status Summary**
   - GET `{{baseUrl}}/api/agents/status/summary`
   - Test: Status 200, มี totalAgents, statusCounts, statusPercentages

### 📚 **Enhanced Documentation (20 นาที)**

**สร้าง README.md:**
```markdown
# Agent Wallboard API - Enhanced Version

## ✨ Features Enhanced
- 🏗️ Professional project structure (MVC pattern)
- ✅ Input validation with Joi
- 🛡️ Basic security with Helmet
- 📝 Request logging with Morgan
- ⚠️ Professional error handling
- 📊 Consistent API response format

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## 📡 API Endpoints

### Agents Management
- `GET /api/agents` - List all agents (supports ?status= and ?department=)
- `GET /api/agents/:id` - Get specific agent
- `POST /api/agents` - Create new agent (with validation)
- `PUT /api/agents/:id` - Update agent information
- `PATCH /api/agents/:id/status` - Update agent status (with validation)
- `DELETE /api/agents/:id` - Delete agent

### System
- `GET /api/health` - Health check
- `GET /api/docs` - API documentation
- `GET /api/agents/status/summary` - Status summary

## 🔧 Enhanced Features

### Input Validation (Joi)
All POST/PATCH endpoints use Joi validation:
- Agent code format: A001 (letter + 3 digits)
- Email validation
- Status transition validation
- Field length limits

### Error Handling
Professional error responses with:
- Consistent error format
- Validation error details
- HTTP status codes
- Request logging

### Security
- Helmet middleware for security headers
- CORS configuration
- Request size limits

## 🧪 Testing
- Import Postman collection: `Agent_Wallboard_Enhanced.postman_collection.json`
- Run all test cases including validation tests
```

### 🎯 **Enhanced Deliverables Checklist (10 นาที)**

#### ✅ **Technical Enhancements:**
- [ ] Professional project structure (controllers, middleware, routes)
- [ ] Joi validation for all input endpoints
- [ ] Global error handling with detailed responses
- [ ] Helmet security middleware
- [ ] Morgan request logging
- [ ] Consistent API response format
- [ ] Enhanced Agent model with status history

#### ✅ **API Enhancements:**
- [ ] All 7 CRUD endpoints working
- [ ] Input validation on POST/PATCH
- [ ] Professional error messages
- [ ] Status transition validation
- [ ] API documentation endpoint
- [ ] Health check endpoint

#### ✅ **Testing Enhancements:**
- [ ] Complete Postman collection with validation tests
- [ ] Error scenario testing
- [ ] Success and failure test cases
- [ ] Environment variables setup

---

## 🎯 **Enhanced 20% Challenge (งานบ้าน)**

### เลือกทำ 1-2 ข้อ สำหรับคะแนนพิเศษ:

#### 1. **Agent Search API** (⭐⭐)
```javascript
// GET /api/agents/search?q=john&fields=name,email
// ค้นหา agent ใน name, email, agentCode
// รองรับ fields parameter เพื่อเลือกข้อมูลที่ต้องการ
```

#### 2. **Status History API** (⭐⭐⭐)
```javascript
// GET /api/agents/:id/status/history
// แสดงประวัติการเปลี่ยนสถานะของ agent
// รองรับ pagination และ date filtering
```

#### 3. **Advanced Validation** (⭐⭐)
```javascript
// เพิ่ม validation rules:
// - Email ห้ามซ้ำ
// - Agent code ตาม department (S001 = Supervisor, A001 = Agent)
// - Skills validation (ต้องเป็น predefined list)
```

-