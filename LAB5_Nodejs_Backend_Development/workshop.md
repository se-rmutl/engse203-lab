# LAB5:	Node.js & Backend Development

### ENGSE203 สัปดาห์ที่ 7 - Practical Session (4 ชั่วโมง)

---
## Workshop: Agent Wallboard System Backend Development (งานกลุ่ม)

## 🎯 Workshop Overview

**เป้าหมาย:** สร้าง Backend API สำหรับ Agent Wallboard System ตั้งแต่เริ่มต้น
**เวลา:** 4 ชั่วโมง (แบ่งเป็น 4 sessions)
**Case Study:** Call Center Agent Management System

**Features ที่จะสร้าง:**
- Agent Status Management (Available, Active, Wrap Up, Not Ready)
- Real-time Communication via WebSocket
- Message System (Supervisor → Agents)
- Dashboard Statistics
- Basic Authentication

---

## 📋 Pre-Workshop Setup (15 นาที)

### ติดตั้ง Software ที่จำเป็น:
```bash
# 1. ตรวจสอบ Node.js version
node --version  # ควรเป็น v16 หรือสูงกว่า

# 2. ตรวจสอบ npm
npm --version

# 3. ติดตั้ง Postman (สำหรับทดสอบ API)
# Download จาก: https://www.postman.com/downloads/

# 4. ติดตั้ง VS Code Extensions
# - REST Client
# - Thunder Client (optional)
```


### สร้าง git repository:

* สร้าง git repository ชื่อ+ทีม: `agent-wallboard-teamxx`,  (`xx`=กลุ่ม, เช่น `agent-wallboard-team03`)

* clone repository ลงมาทำงานที่ local

* เข้าไปทำงานที่ repository เช่น `agent-wallboard-team03` (*ตัวอย่างเท่านั้น, ให้ใช้ชื่อของทีมตัวเอง)
```bash
cd agent-wallboard-team03
```


### สร้าง Project Directory:
```bash
mkdir agent-wallboard-backend
cd agent-wallboard-backend
```

---

## 🏗️ Session 1: Project Setup และ Basic Structure (60 นาที)

### Step 1.1: Initialize Project (10 นาที)

```bash
# Initialize npm project
npm init -y
```

**แก้ไข package.json:**
```json
{
  "name": "agent-wallboard-backend",
  "version": "1.0.0",
  "description": "Backend API for Call Center Agent Management System",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "node test-api.js"
  },
  "keywords": ["agent", "wallboard", "call-center", "nodejs", "express"],
  "author": "Your Name",
  "license": "MIT"
}
```

### Step 1.2: Install Dependencies (10 นาที)

```bash
# Core dependencies
npm install express cors dotenv socket.io

# Development dependencies  
npm install --save-dev nodemon

# Utility dependencies
npm install joi winston express-rate-limit helmet
```

### Step 1.3: Create Project Structure (15 นาที)

```bash
# สร้าง directory structure
mkdir controllers middleware models routes services utils config
touch server.js .env .gitignore
```

**File Structure ที่สมบูรณ์:**
```
agent-wallboard-backend/
├── 📁 controllers/
│   ├── agentController.js
│   ├── messageController.js
│   └── dashboardController.js
├── 📁 middleware/
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
├── 📁 models/
│   ├── Agent.js
│   ├── Message.js
│   └── index.js
├── 📁 routes/
│   ├── agents.js
│   ├── messages.js
│   └── dashboard.js
├── 📁 services/
│   ├── agentService.js
│   └── messageService.js
├── 📁 utils/
│   ├── logger.js
│   └── responseHelper.js
├── 📁 config/
│   └── constants.js
├── 📄 .env
├── 📄 .gitignore
├── 📄 package.json
└── 📄 server.js
```

### Step 1.4: Setup Environment Variables (10 นาที)

**สร้าง .env file:**
```env
# Server Configuration
NODE_ENV=development
PORT=3001
HOST=localhost

# CORS Settings
FRONTEND_URL=http://localhost:3000

# API Settings
API_PREFIX=/api
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000

# WebSocket Settings
WS_HEARTBEAT_INTERVAL=30000
WS_CONNECTION_TIMEOUT=60000

# Logging
LOG_LEVEL=debug
```

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

### Step 1.5: Basic Server Setup (15 นาที)

**สร้าง server.js:**
```javascript
// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Import routes และ middleware
const agentRoutes = require('./routes/agents');
const messageRoutes = require('./routes/messages');
const dashboardRoutes = require('./routes/dashboard');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const server = http.createServer(app);

// WebSocket setup
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  }
});

const PORT = process.env.PORT || 3001;

// 🔒 Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 🌐 CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// 📦 Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 📝 Request Logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// 🏥 Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Agent Wallboard Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// 🛣️ API Routes
app.use('/api/agents', agentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 🚫 Handle 404
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// 🚨 Global Error Handler
app.use(errorHandler);

// 📡 WebSocket Connection Management
io.on('connection', (socket) => {
  logger.info(`WebSocket connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    logger.info(`WebSocket disconnected: ${socket.id}`);
  });
});

// 🚀 Start Server
server.listen(PORT, () => {
  console.log(`🏢 Agent Wallboard Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
  console.log(`📖 API Base URL: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Export for testing
module.exports = { app, server, io };
```

---

## 📊 Session 2: Data Models และ Utilities (60 นาที)

### Step 2.1: Constants และ Configuration (15 นาที)

**config/constants.js:**
```javascript
// config/constants.js
const AGENT_STATUS = {
  AVAILABLE: 'Available',
  ACTIVE: 'Active',
  WRAP_UP: 'Wrap Up',
  NOT_READY: 'Not Ready',
  OFFLINE: 'Offline'
};

const MESSAGE_TYPES = {
  INSTRUCTION: 'instruction',
  NOTIFICATION: 'notification',
  ALERT: 'alert',
  INFO: 'info'
};

const MESSAGE_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent'
};

const API_RESPONSES = {
  SUCCESS: {
    AGENT_STATUS_UPDATED: 'Agent status updated successfully',
    AGENT_LOGIN: 'Agent logged in successfully',
    AGENT_LOGOUT: 'Agent logged out successfully',
    MESSAGE_SENT: 'Message sent successfully'
  },
  ERROR: {
    AGENT_NOT_FOUND: 'Agent not found',
    INVALID_STATUS: 'Invalid agent status',
    VALIDATION_FAILED: 'Validation failed',
    UNAUTHORIZED: 'Unauthorized access',
    SERVER_ERROR: 'Internal server error'
  }
};

module.exports = {
  AGENT_STATUS,
  MESSAGE_TYPES,
  MESSAGE_PRIORITY,
  API_RESPONSES
};
```

### Step 2.2: Logger Utility (15 นาที)

**utils/logger.js:**
```javascript
// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'agent-wallboard-backend' },
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

// Add console transport for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'HH:mm:ss' }),
      winston.format.printf(({ timestamp, level, message, ...meta }) => {
        return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
      })
    )
  }));
}

module.exports = logger;
```

### Step 2.3: Response Helper (10 นาที)

**utils/responseHelper.js:**
```javascript
// utils/responseHelper.js
const logger = require('./logger');

class ResponseHelper {
  static success(res, data, message = 'Success', statusCode = 200) {
    const response = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };
    
    logger.info(`API Success: ${message}`, { statusCode, data });
    return res.status(statusCode).json(response);
  }

  static error(res, message, statusCode = 500, error = null) {
    const response = {
      success: false,
      message,
      timestamp: new Date().toISOString()
    };

    if (process.env.NODE_ENV === 'development' && error) {
      response.error = {
        message: error.message,
        stack: error.stack
      };
    }

    logger.error(`API Error: ${message}`, { statusCode, error: error?.message });
    return res.status(statusCode).json(response);
  }

  static validationError(res, errors) {
    const response = {
      success: false,
      message: 'Validation failed',
      errors,
      timestamp: new Date().toISOString()
    };

    logger.warn('Validation Error', { errors });
    return res.status(400).json(response);
  }
}

module.exports = ResponseHelper;
```

### Step 2.4: Agent Data Model (20 นาที)

**models/Agent.js:**
```javascript
// models/Agent.js
const { AGENT_STATUS } = require('../config/constants');

class Agent {
  constructor(data) {
    this.code = data.code;
    this.name = data.name;
    this.status = data.status || AGENT_STATUS.OFFLINE;
    this.loginTime = data.loginTime || null;
    this.logoutTime = data.logoutTime || null;
    this.lastStatusChange = data.lastStatusChange || new Date();
    this.totalCalls = data.totalCalls || 0;
    this.totalCallTime = data.totalCallTime || 0; // in seconds
    this.skills = data.skills || [];
    this.supervisor = data.supervisor || null;
    this.department = data.department || 'General';
    this.statusReason = data.statusReason || null;
    this.sessionId = data.sessionId || null;
    this.ipAddress = data.ipAddress || null;
    this.lastActivity = data.lastActivity || new Date();
  }

  // Agent methods
  updateStatus(newStatus, reason = null) {
    if (!Object.values(AGENT_STATUS).includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }
    
    this.status = newStatus;
    this.lastStatusChange = new Date();
    this.statusReason = reason;
    this.lastActivity = new Date();
  }

  login(sessionId = null, ipAddress = null) {
    this.status = AGENT_STATUS.AVAILABLE;
    this.loginTime = new Date();
    this.logoutTime = null;
    this.sessionId = sessionId;
    this.ipAddress = ipAddress;
    this.lastActivity = new Date();
  }

  logout() {
    this.status = AGENT_STATUS.OFFLINE;
    this.logoutTime = new Date();
    this.sessionId = null;
    this.lastActivity = new Date();
  }

  incrementCallCount() {
    this.totalCalls++;
    this.lastActivity = new Date();
  }

  addCallTime(seconds) {
    this.totalCallTime += seconds;
    this.lastActivity = new Date();
  }

  getAverageCallTime() {
    if (this.totalCalls === 0) return 0;
    return Math.round(this.totalCallTime / this.totalCalls);
  }

  isOnline() {
    return this.status !== AGENT_STATUS.OFFLINE;
  }

  toJSON() {
    return {
      code: this.code,
      name: this.name,
      status: this.status,
      loginTime: this.loginTime,
      logoutTime: this.logoutTime,
      lastStatusChange: this.lastStatusChange,
      totalCalls: this.totalCalls,
      averageCallTime: this.getAverageCallTime(),
      skills: this.skills,
      supervisor: this.supervisor,
      department: this.department,
      statusReason: this.statusReason,
      lastActivity: this.lastActivity,
      isOnline: this.isOnline()
    };
  }
}

// In-memory storage (จะเปลี่ยนเป็น database ในสัปดาห์หน้า)
const agents = new Map();

// Sample data
const sampleAgents = [
  new Agent({
    code: 'A001',
    name: 'John Doe',
    status: AGENT_STATUS.AVAILABLE,
    skills: ['English', 'Technical Support'],
    supervisor: 'S001',
    department: 'Technical'
  }),
  new Agent({
    code: 'A002', 
    name: 'Jane Smith',
    status: AGENT_STATUS.ACTIVE,
    skills: ['English', 'Sales'],
    supervisor: 'S001',
    department: 'Sales'
  }),
  new Agent({
    code: 'A003',
    name: 'Mike Johnson', 
    status: AGENT_STATUS.NOT_READY,
    skills: ['Thai', 'Customer Service'],
    supervisor: 'S002',
    department: 'Support'
  })
];

// Initialize sample data
sampleAgents.forEach(agent => {
  agents.set(agent.code, agent);
});

module.exports = { Agent, agents };
```

---

## 🛠️ Session 3: Core API Development (90 นาที)

### Step 3.1: Validation Middleware (20 นาที)

**middleware/validation.js:**
```javascript
// middleware/validation.js
const Joi = require('joi');
const ResponseHelper = require('../utils/responseHelper');
const { AGENT_STATUS, MESSAGE_TYPES, MESSAGE_PRIORITY } = require('../config/constants');

const schemas = {
  // Agent validation schemas
  agentStatus: Joi.object({
    status: Joi.string().valid(...Object.values(AGENT_STATUS)).required(),
    reason: Joi.string().max(200).optional()
  }),

  agentLogin: Joi.object({
    agentCode: Joi.string().pattern(/^[A-Z]\d{3}$/).required(),
    name: Joi.string().min(2).max(100).required(),
    skills: Joi.array().items(Joi.string()).optional(),
    supervisor: Joi.string().optional(),
    department: Joi.string().optional()
  }),

  // Message validation schemas
  sendMessage: Joi.object({
    from: Joi.string().required(),
    fromName: Joi.string().required(),
    to: Joi.alternatives().try(
      Joi.string().pattern(/^[A-Z]\d{3}$/),
      Joi.string().valid('all')
    ).required(),
    message: Joi.string().min(1).max(500).required(),
    type: Joi.string().valid(...Object.values(MESSAGE_TYPES)).default(MESSAGE_TYPES.INSTRUCTION),
    priority: Joi.string().valid(...Object.values(MESSAGE_PRIORITY)).default(MESSAGE_PRIORITY.NORMAL)
  }),

  // Query validation
  agentQuery: Joi.object({
    status: Joi.string().valid(...Object.values(AGENT_STATUS)).optional(),
    supervisor: Joi.string().optional(),
    department: Joi.string().optional(),
    skills: Joi.string().optional() // comma-separated
  })
};

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));
      
      return ResponseHelper.validationError(res, errors);
    }
    
    req.validatedData = value;
    next();
  };
};

// Query validation middleware
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return ResponseHelper.validationError(res, errors);
    }
    
    req.validatedQuery = value;
    next();
  };
};

module.exports = {
  schemas,
  validate,
  validateQuery
};
```

### Step 3.2: Agent Controller (35 นาที)

**controllers/agentController.js:**
```javascript
// controllers/agentController.js
const { Agent, agents } = require('../models/Agent');
const { AGENT_STATUS, API_RESPONSES } = require('../config/constants');
const ResponseHelper = require('../utils/responseHelper');
const logger = require('../utils/logger');

class AgentController {
  // GET /api/agents - ดึงรายชื่อ agents ทั้งหมด
  static async getAllAgents(req, res) {
    try {
      const { status, supervisor, department, skills } = req.validatedQuery || req.query;
      
      let filteredAgents = Array.from(agents.values());

      // Apply filters
      if (status) {
        filteredAgents = filteredAgents.filter(agent => agent.status === status);
      }
      
      if (supervisor) {
        filteredAgents = filteredAgents.filter(agent => agent.supervisor === supervisor);
      }
      
      if (department) {
        filteredAgents = filteredAgents.filter(agent => agent.department === department);
      }
      
      if (skills) {
        const skillsArray = skills.split(',').map(s => s.trim());
        filteredAgents = filteredAgents.filter(agent =>
          skillsArray.some(skill => agent.skills.includes(skill))
        );
      }

      // Generate statistics
      const stats = {
        total: agents.size,
        online: Array.from(agents.values()).filter(a => a.isOnline()).length,
        available: Array.from(agents.values()).filter(a => a.status === AGENT_STATUS.AVAILABLE).length,
        active: Array.from(agents.values()).filter(a => a.status === AGENT_STATUS.ACTIVE).length,
        wrapUp: Array.from(agents.values()).filter(a => a.status === AGENT_STATUS.WRAP_UP).length,
        notReady: Array.from(agents.values()).filter(a => a.status === AGENT_STATUS.NOT_READY).length,
        offline: Array.from(agents.values()).filter(a => a.status === AGENT_STATUS.OFFLINE).length
      };

      return ResponseHelper.success(res, {
        agents: filteredAgents.map(agent => agent.toJSON()),
        stats,
        count: filteredAgents.length,
        filters: { status, supervisor, department, skills }
      }, 'Agents retrieved successfully');

    } catch (error) {
      logger.error('Error in getAllAgents:', error);
      return ResponseHelper.error(res, API_RESPONSES.ERROR.SERVER_ERROR, 500, error);
    }
  }

  // GET /api/agents/:code - ดึงข้อมูล agent เฉพาะตัว
  static async getAgentByCode(req, res) {
    try {
      const { code } = req.params;
      const agent = agents.get(code);

      if (!agent) {
        return ResponseHelper.error(res, API_RESPONSES.ERROR.AGENT_NOT_FOUND, 404);
      }

      return ResponseHelper.success(res, agent.toJSON(), 'Agent retrieved successfully');

    } catch (error) {
      logger.error('Error in getAgentByCode:', error);
      return ResponseHelper.error(res, API_RESPONSES.ERROR.SERVER_ERROR, 500, error);
    }
  }

  // POST /api/agents/:code/login - Agent เข้าสู่ระบบ
  static async loginAgent(req, res) {
    try {
      const { code } = req.params;
      const { name, skills, supervisor, department } = req.validatedData;
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const ipAddress = req.ip;

      let agent = agents.get(code);

      if (!agent) {
        // สร้าง agent ใหม่
        agent = new Agent({
          code,
          name,
          skills: skills || [],
          supervisor: supervisor || 'S001',
          department: department || 'General'
        });
        agents.set(code, agent);
      } else {
        // อัพเดทข้อมูล agent ที่มีอยู่
        agent.name = name || agent.name;
        agent.skills = skills || agent.skills;
        agent.supervisor = supervisor || agent.supervisor;
        agent.department = department || agent.department;
      }

      agent.login(sessionId, ipAddress);

      // Broadcast agent login event via WebSocket
      const io = req.app.get('io') || global.io;
      if (io) {
        io.emit('agentLogin', {
          agentCode: code,
          agent: agent.toJSON(),
          timestamp: new Date().toISOString()
        });
      }

      logger.info(`Agent logged in: ${code}`, { 
        name: agent.name, 
        sessionId, 
        ipAddress 
      });

      return ResponseHelper.success(res, {
        agent: agent.toJSON(),
        sessionId
      }, API_RESPONSES.SUCCESS.AGENT_LOGIN, 201);

    } catch (error) {
      logger.error('Error in loginAgent:', error);
      return ResponseHelper.error(res, API_RESPONSES.ERROR.SERVER_ERROR, 500, error);
    }
  }

  // POST /api/agents/:code/logout - Agent ออกจากระบบ
  static async logoutAgent(req, res) {
    try {
      const { code } = req.params;
      const agent = agents.get(code);

      if (!agent) {
        return ResponseHelper.error(res, API_RESPONSES.ERROR.AGENT_NOT_FOUND, 404);
      }

      agent.logout();

      // Broadcast agent logout event
      const io = req.app.get('io') || global.io;
      if (io) {
        io.emit('agentLogout', {
          agentCode: code,
          agent: agent.toJSON(),
          timestamp: new Date().toISOString()
        });
      }

      logger.info(`Agent logged out: ${code}`);

      return ResponseHelper.success(res, agent.toJSON(), API_RESPONSES.SUCCESS.AGENT_LOGOUT);

    } catch (error) {
      logger.error('Error in logoutAgent:', error);
      return ResponseHelper.error(res, API_RESPONSES.ERROR.SERVER_ERROR, 500, error);
    }
  }

  // PATCH /api/agents/:code/status - อัพเดทสถานะ agent
  static async updateAgentStatus(req, res) {
    try {
      const { code } = req.params;
      const { status, reason } = req.validatedData;
      
      const agent = agents.get(code);

      if (!agent) {
        return ResponseHelper.error(res, API_RESPONSES.ERROR.AGENT_NOT_FOUND, 404);
      }

      const oldStatus = agent.status;
      agent.updateStatus(status, reason);

      // Broadcast status change event
      const io = req.app.get('io') || global.io;
      if (io) {
        io.emit('agentStatusUpdate', {
          agentCode: code,
          oldStatus,
          newStatus: status,
          agent: agent.toJSON(),
          timestamp: new Date().toISOString()
        });
      }

      logger.info(`Agent status updated: ${code}`, { 
        oldStatus, 
        newStatus: status, 
        reason 
      });

      return ResponseHelper.success(res, {
        agent: agent.toJSON(),
        statusChange: {
          from: oldStatus,
          to: status,
          reason,
          timestamp: agent.lastStatusChange
        }
      }, API_RESPONSES.SUCCESS.AGENT_STATUS_UPDATED);

    } catch (error) {
      if (error.message.includes('Invalid status')) {
        return ResponseHelper.error(res, API_RESPONSES.ERROR.INVALID_STATUS, 400, error);
      }
      
      logger.error('Error in updateAgentStatus:', error);
      return ResponseHelper.error(res, API_RESPONSES.ERROR.SERVER_ERROR, 500, error);
    }
  }

  // DELETE /api/agents/:code - ลบ agent (สำหรับ admin)
  static async deleteAgent(req, res) {
    try {
      const { code } = req.params;
      const agent = agents.get(code);

      if (!agent) {
        return ResponseHelper.error(res, API_RESPONSES.ERROR.AGENT_NOT_FOUND, 404);
      }

      agents.delete(code);

      logger.info(`Agent deleted: ${code}`);

      return ResponseHelper.success(res, { 
        deletedAgent: agent.toJSON() 
      }, 'Agent deleted successfully');

    } catch (error) {
      logger.error('Error in deleteAgent:', error);
      return ResponseHelper.error(res, API_RESPONSES.ERROR.SERVER_ERROR, 500, error);
    }
  }
}

module.exports = AgentController;
```

### Step 3.3: Agent Routes (15 นาที)

**routes/agents.js:**
```javascript
// routes/agents.js
const express = require('express');
const AgentController = require('../controllers/agentController');
const { validate, validateQuery, schemas } = require('../middleware/validation');

const router = express.Router();

// GET /api/agents - ดึงรายชื่อ agents ทั้งหมด
router.get('/', 
  validateQuery(schemas.agentQuery),
  AgentController.getAllAgents
);

// GET /api/agents/:code - ดึงข้อมูล agent เฉพาะตัว
router.get('/:code', AgentController.getAgentByCode);

// POST /api/agents/:code/login - Agent เข้าสู่ระบบ
router.post('/:code/login',
  validate(schemas.agentLogin),
  AgentController.loginAgent
);

// POST /api/agents/:code/logout - Agent ออกจากระบบ  
router.post('/:code/logout', AgentController.logoutAgent);

// PATCH /api/agents/:code/status - อัพเดทสถานะ agent
router.patch('/:code/status',
  validate(schemas.agentStatus),
  AgentController.updateAgentStatus
);

// DELETE /api/agents/:code - ลบ agent (admin only)
router.delete('/:code', AgentController.deleteAgent);

module.exports = router;
```

### Step 3.4: Error Handler Middleware (20 นาที)

**middleware/errorHandler.js:**
```javascript
// middleware/errorHandler.js
const logger = require('../utils/logger');
const ResponseHelper = require('../utils/responseHelper');

const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error('Global Error Handler:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  // Default error
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate entry';
  } else if (err.message.includes('Agent not found')) {
    statusCode = 404;
    message = err.message;
  }

  return ResponseHelper.error(res, message, statusCode, err);
};

module.exports = errorHandler;
```

## 💬 Session 4: Message System และ WebSocket (90 นาที)

### Step 4.1: Message Data Model (20 นาที)

**models/Message.js:**
```javascript
// models/Message.js
const { MESSAGE_TYPES, MESSAGE_PRIORITY } = require('../config/constants');

class Message {
  constructor(data) {
    this.id = data.id || Date.now() + Math.random();
    this.from = data.from;
    this.fromName = data.fromName;
    this.to = data.to; // agent code หรือ 'all'
    this.toName = data.toName;
    this.message = data.message;
    this.type = data.type || MESSAGE_TYPES.INSTRUCTION;
    this.priority = data.priority || MESSAGE_PRIORITY.NORMAL;
    this.timestamp = data.timestamp || new Date();
    this.read = data.read || false;
    this.delivered = data.delivered || false;
    this.readAt = data.readAt || null;
  }

  markAsRead() {
    this.read = true;
    this.readAt = new Date();
  }

  markAsDelivered() {
    this.delivered = true;
  }

  toJSON() {
    return {
      id: this.id,
      from: this.from,
      fromName: this.fromName,
      to: this.to,
      toName: this.toName,
      message: this.message,
      type: this.type,
      priority: this.priority,
      timestamp: this.timestamp,
      read: this.read,
      delivered: this.delivered,
      readAt: this.readAt
    };
  }
}

// In-memory message storage
const messages = new Map();

// Sample messages
const sampleMessages = [
  new Message({
    id: 1,
    from: 'supervisor1',
    fromName: 'Sarah Wilson',
    to: 'A001',
    toName: 'John Doe',
    message: 'Please check the priority queue - we have VIP customers waiting',
    type: MESSAGE_TYPES.INSTRUCTION,
    priority: MESSAGE_PRIORITY.HIGH,
    timestamp: new Date(Date.now() - 30 * 60000) // 30 minutes ago
  }),
  new Message({
    id: 2,
    from: 'supervisor1',
    fromName: 'Sarah Wilson',
    to: 'all',
    toName: 'All Agents',
    message: 'Team meeting scheduled for 2 PM today in Conference Room A',
    type: MESSAGE_TYPES.NOTIFICATION,
    priority: MESSAGE_PRIORITY.NORMAL,
    timestamp: new Date(Date.now() - 15 * 60000) // 15 minutes ago
  })
];

// Initialize sample data
sampleMessages.forEach(message => {
  messages.set(message.id, message);
});

module.exports = { Message, messages };
```

### Step 4.2: Message Controller (25 นาที)

**controllers/messageController.js:**
```javascript
// controllers/messageController.js
const { Message, messages } = require('../models/Message');
const { agents } = require('../models/Agent');
const { API_RESPONSES } = require('../config/constants');
const ResponseHelper = require('../utils/responseHelper');
const logger = require('../utils/logger');

class MessageController {
  // POST /api/messages - ส่งข้อความ
  static async sendMessage(req, res) {
    try {
      const { from, fromName, to, message, type, priority } = req.validatedData;

      // ตรวจสอบว่า target agent มีอยู่ (ยกเว้น 'all')
      if (to !== 'all') {
        const targetAgent = agents.get(to);
        if (!targetAgent) {
          return ResponseHelper.error(res, `Target agent ${to} not found`, 404);
        }
      }

      // สร้าง message ใหม่
      const newMessage = new Message({
        from,
        fromName,
        to,
        toName: to === 'all' ? 'All Agents' : agents.get(to)?.name || to,
        message: message.trim(),
        type,
        priority
      });

      messages.set(newMessage.id, newMessage);

      // ส่งผ่าน WebSocket
      const io = req.app.get('io') || global.io;
      if (io) {
        if (to === 'all') {
          // Broadcast ไปทุกคน
          io.emit('broadcastMessage', newMessage.toJSON());
          logger.info(`Broadcast message sent from ${from}:`, { 
            message: message.substring(0, 50) + '...',
            type,
            priority 
          });
        } else {
          // ส่งไปเฉพาะ agent เป้าหมาย
          io.emit('privateMessage', {
            targetAgent: to,
            message: newMessage.toJSON()
          });
          logger.info(`Private message sent from ${from} to ${to}:`, { 
            message: message.substring(0, 50) + '...',
            type,
            priority 
          });
        }
      }

      // Mark as delivered
      newMessage.markAsDelivered();

      return ResponseHelper.success(res, newMessage.toJSON(), API_RESPONSES.SUCCESS.MESSAGE_SENT, 201);

    } catch (error) {
      logger.error('Error in sendMessage:', error);
      return ResponseHelper.error(res, API_RESPONSES.ERROR.SERVER_ERROR, 500, error);
    }
  }

  // GET /api/messages/agent/:code - ดึงข้อความของ agent เฉพาะ
  static async getAgentMessages(req, res) {
    try {
      const { code } = req.params;
      const { unreadOnly = false, limit = 50 } = req.query;

      // ตรวจสอบว่า agent มีอยู่
      const agent = agents.get(code);
      if (!agent) {
        return ResponseHelper.error(res, API_RESPONSES.ERROR.AGENT_NOT_FOUND, 404);
      }

      // Filter messages สำหรับ agent นี้
      let agentMessages = Array.from(messages.values())
        .filter(msg => msg.to === code || msg.to === 'all')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      // Filter unread only if requested
      if (unreadOnly === 'true') {
        agentMessages = agentMessages.filter(msg => !msg.read);
      }

      // Apply limit
      agentMessages = agentMessages.slice(0, parseInt(limit));

      // Statistics
      const stats = {
        total: agentMessages.length,
        unread: agentMessages.filter(msg => !msg.read).length,
        high_priority: agentMessages.filter(msg => msg.priority === 'high' || msg.priority === 'urgent').length
      };

      return ResponseHelper.success(res, {
        messages: agentMessages.map(msg => msg.toJSON()),
        stats,
        agent: {
          code: agent.code,
          name: agent.name
        }
      }, 'Messages retrieved successfully');

    } catch (error) {
      logger.error('Error in getAgentMessages:', error);
      return ResponseHelper.error(res, API_RESPONSES.ERROR.SERVER_ERROR, 500, error);
    }
  }

  // PUT /api/messages/:id/read - Mark message as read
  static async markMessageAsRead(req, res) {
    try {
      const { id } = req.params;
      const message = messages.get(parseInt(id));

      if (!message) {
        return ResponseHelper.error(res, 'Message not found', 404);
      }

      message.markAsRead();

      logger.info(`Message ${id} marked as read`);

      return ResponseHelper.success(res, message.toJSON(), 'Message marked as read');

    } catch (error) {
      logger.error('Error in markMessageAsRead:', error);
      return ResponseHelper.error(res, API_RESPONSES.ERROR.SERVER_ERROR, 500, error);
    }
  }

  // GET /api/messages - ดึงข้อความทั้งหมด (สำหรับ admin/supervisor)
  static async getAllMessages(req, res) {
    try {
      const { limit = 100, type, priority, from } = req.query;
      
      let allMessages = Array.from(messages.values())
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      // Apply filters
      if (type) {
        allMessages = allMessages.filter(msg => msg.type === type);
      }

      if (priority) {
        allMessages = allMessages.filter(msg => msg.priority === priority);
      }

      if (from) {
        allMessages = allMessages.filter(msg => msg.from === from);
      }

      // Apply limit
      allMessages = allMessages.slice(0, parseInt(limit));

      // Generate statistics
      const stats = {
        total: messages.size,
        unread: Array.from(messages.values()).filter(msg => !msg.read).length,
        by_type: {},
        by_priority: {}
      };

      // Count by type and priority
      Array.from(messages.values()).forEach(msg => {
        stats.by_type[msg.type] = (stats.by_type[msg.type] || 0) + 1;
        stats.by_priority[msg.priority] = (stats.by_priority[msg.priority] || 0) + 1;
      });

      return ResponseHelper.success(res, {
        messages: allMessages.map(msg => msg.toJSON()),
        stats,
        filters: { type, priority, from, limit }
      }, 'All messages retrieved successfully');

    } catch (error) {
      logger.error('Error in getAllMessages:', error);
      return ResponseHelper.error(res, API_RESPONSES.ERROR.SERVER_ERROR, 500, error);
    }
  }
}

module.exports = MessageController;
```

### Step 4.3: Message Routes (10 นาที)

**routes/messages.js:**
```javascript
// routes/messages.js
const express = require('express');
const MessageController = require('../controllers/messageController');
const { validate, schemas } = require('../middleware/validation');

const router = express.Router();

// POST /api/messages - ส่งข้อความ
router.post('/', 
  validate(schemas.sendMessage),
  MessageController.sendMessage
);

// GET /api/messages - ดึงข้อความทั้งหมด (admin/supervisor)
router.get('/', MessageController.getAllMessages);

// GET /api/messages/agent/:code - ดึงข้อความของ agent เฉพาะ
router.get('/agent/:code', MessageController.getAgentMessages);

// PUT /api/messages/:id/read - Mark message as read
router.put('/:id/read', MessageController.markMessageAsRead);

module.exports = router;
```

### Step 4.4: Dashboard Controller (20 นาที)

**controllers/dashboardController.js:**
```javascript
// controllers/dashboardController.js
const { agents } = require('../models/Agent');
const { messages } = require('../models/Message');
const { AGENT_STATUS } = require('../config/constants');
const ResponseHelper = require('../utils/responseHelper');
const logger = require('../utils/logger');

class DashboardController {
  // GET /api/dashboard/stats - สถิติ real-time
  static async getStats(req, res) {
    try {
      const agentList = Array.from(agents.values());
      const messageList = Array.from(messages.values());
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // Agent statistics
      const agentStats = {
        total: agentList.length,
        online: agentList.filter(a => a.isOnline()).length,
        available: agentList.filter(a => a.status === AGENT_STATUS.AVAILABLE).length,
        active: agentList.filter(a => a.status === AGENT_STATUS.ACTIVE).length,
        wrapUp: agentList.filter(a => a.status === AGENT_STATUS.WRAP_UP).length,
        notReady: agentList.filter(a => a.status === AGENT_STATUS.NOT_READY).length,
        offline: agentList.filter(a => a.status === AGENT_STATUS.OFFLINE).length
      };

      // Message statistics
      const todayMessages = messageList.filter(msg => new Date(msg.timestamp) >= todayStart);
      const messageStats = {
        total: messageList.length,
        today: todayMessages.length,
        unread: messageList.filter(msg => !msg.read).length,
        high_priority: messageList.filter(msg => msg.priority === 'high' || msg.priority === 'urgent').length
      };

      // Performance metrics
      const onlineAgents = agentList.filter(a => a.isOnline());
      const totalCalls = onlineAgents.reduce((sum, agent) => sum + agent.totalCalls, 0);
      const totalCallTime = onlineAgents.reduce((sum, agent) => sum + agent.totalCallTime, 0);

      const performanceStats = {
        totalCalls,
        averageCallTime: onlineAgents.length > 0 ? Math.round(totalCallTime / Math.max(totalCalls, 1)) : 0,
        callsPerAgent: onlineAgents.length > 0 ? Math.round(totalCalls / onlineAgents.length) : 0,
        activeRate: agentStats.total > 0 ? Math.round((agentStats.online / agentStats.total) * 100) : 0
      };

      // Department breakdown
      const departments = {};
      agentList.forEach(agent => {
        if (!departments[agent.department]) {
          departments[agent.department] = {
            total: 0,
            online: 0,
            available: 0,
            active: 0
          };
        }
        departments[agent.department].total++;
        if (agent.isOnline()) departments[agent.department].online++;
        if (agent.status === AGENT_STATUS.AVAILABLE) departments[agent.department].available++;
        if (agent.status === AGENT_STATUS.ACTIVE) departments[agent.department].active++;
      });

      return ResponseHelper.success(res, {
        agents: agentStats,
        messages: messageStats,
        performance: performanceStats,
        departments,
        lastUpdated: new Date().toISOString(),
        systemInfo: {
          uptime: process.uptime(),
          environment: process.env.NODE_ENV
        }
      }, 'Dashboard statistics retrieved successfully');

    } catch (error) {
      logger.error('Error in getStats:', error);
      return ResponseHelper.error(res, 'Error retrieving dashboard statistics', 500, error);
    }
  }

  // GET /api/dashboard/agents/performance - Agent performance metrics
  static async getAgentPerformance(req, res) {
    try {
      const agentList = Array.from(agents.values());
      
      const performanceData = agentList.map(agent => ({
        code: agent.code,
        name: agent.name,
        status: agent.status,
        department: agent.department,
        totalCalls: agent.totalCalls,
        averageCallTime: agent.getAverageCallTime(),
        loginTime: agent.loginTime,
        lastActivity: agent.lastActivity,
        isOnline: agent.isOnline(),
        productivity: agent.totalCalls > 0 ? Math.round((agent.totalCalls / Math.max(1, Math.floor((new Date() - new Date(agent.loginTime || new Date())) / (1000 * 60 * 60)))) * 100) / 100 : 0 // calls per hour
      })).sort((a, b) => b.totalCalls - a.totalCalls); // Sort by call count

      const topPerformers = performanceData
        .filter(agent => agent.isOnline)
        .slice(0, 5);

      return ResponseHelper.success(res, {
        allAgents: performanceData,
        topPerformers,
        summary: {
          totalAgents: performanceData.length,
          onlineAgents: performanceData.filter(a => a.isOnline).length,
          totalCalls: performanceData.reduce((sum, a) => sum + a.totalCalls, 0),
          averageProductivity: performanceData.filter(a => a.isOnline).reduce((sum, a) => sum + a.productivity, 0) / Math.max(1, performanceData.filter(a => a.isOnline).length)
        }
      }, 'Agent performance data retrieved successfully');

    } catch (error) {
      logger.error('Error in getAgentPerformance:', error);
      return ResponseHelper.error(res, 'Error retrieving agent performance', 500, error);
    }
  }

  // GET /api/dashboard/activity/recent - Recent activities
  static async getRecentActivity(req, res) {
    try {
      const { limit = 20 } = req.query;
      const agentList = Array.from(agents.values());
      const messageList = Array.from(messages.values());

      // สร้าง activity log จาก agent status changes และ messages
      const activities = [];

      // Agent activities
      agentList.forEach(agent => {
        if (agent.loginTime) {
          activities.push({
            type: 'agent_login',
            agentCode: agent.code,
            agentName: agent.name,
            timestamp: agent.loginTime,
            description: `${agent.name} logged in`,
            status: agent.status
          });
        }

        if (agent.lastStatusChange) {
          activities.push({
            type: 'status_change',
            agentCode: agent.code,
            agentName: agent.name,
            timestamp: agent.lastStatusChange,
            description: `${agent.name} changed status to ${agent.status}`,
            status: agent.status
          });
        }
      });

      // Message activities
      messageList.forEach(message => {
        activities.push({
          type: 'message_sent',
          from: message.from,
          fromName: message.fromName,
          to: message.to,
          toName: message.toName,
          timestamp: message.timestamp,
          description: `Message sent from ${message.fromName} to ${message.toName}`,
          priority: message.priority,
          messageType: message.type
        });
      });

      // Sort by timestamp (newest first) and limit
      const recentActivities = activities
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, parseInt(limit));

      return ResponseHelper.success(res, {
        activities: recentActivities,
        count: recentActivities.length,
        totalActivities: activities.length
      }, 'Recent activities retrieved successfully');

    } catch (error) {
      logger.error('Error in getRecentActivity:', error);
      return ResponseHelper.error(res, 'Error retrieving recent activities', 500, error);
    }
  }
}

module.exports = DashboardController;
```

### Step 4.5: Dashboard Routes และ WebSocket Enhancement (15 นาที)

**routes/dashboard.js:**
```javascript
// routes/dashboard.js
const express = require('express');
const DashboardController = require('../controllers/dashboardController');

const router = express.Router();

// GET /api/dashboard/stats - สถิติ real-time
router.get('/stats', DashboardController.getStats);

// GET /api/dashboard/agents/performance - Agent performance metrics
router.get('/agents/performance', DashboardController.getAgentPerformance);

// GET /api/dashboard/activity/recent - Recent activities
router.get('/activity/recent', DashboardController.getRecentActivity);

module.exports = router;
```

**อัพเดท server.js เพื่อเพิ่ม WebSocket functionality:**
```javascript
// เพิ่มใน server.js (แทนที่ WebSocket section เดิม)

// 📡 WebSocket Connection Management
const connectedClients = new Map(); // เก็บ client connections

io.on('connection', (socket) => {
  logger.info(`WebSocket connected: ${socket.id}`, {
    userAgent: socket.request.headers['user-agent'],
    ip: socket.request.connection.remoteAddress
  });

  // Handle client registration
  socket.on('register', (data) => {
    const { userType, userId } = data; // userType: 'agent', 'supervisor', 'admin'
    connectedClients.set(socket.id, { userType, userId, connectedAt: new Date() });
    
    logger.info(`Client registered: ${userType} - ${userId}`, { socketId: socket.id });
    
    // Send welcome message
    socket.emit('registered', {
      message: 'Successfully connected to Agent Wallboard System',
      timestamp: new Date().toISOString(),
      connectedClients: connectedClients.size
    });
  });

  // Handle agent status updates
  socket.on('agentStatusChange', (data) => {
    logger.info('WebSocket agent status change:', data);
    // Broadcast to all supervisors and dashboard
    socket.broadcast.emit('agentStatusUpdate', {
      ...data,
      timestamp: new Date().toISOString()
    });
  });

  // Handle messages
  socket.on('sendMessage', (data) => {
    logger.info('WebSocket message:', { 
      from: data.from, 
      to: data.to, 
      type: data.type 
    });
    
    if (data.to === 'all') {
      socket.broadcast.emit('broadcastMessage', data);
    } else {
      // Send to specific agent
      socket.broadcast.emit('privateMessage', data);
    }
  });

  // Heartbeat mechanism
  const heartbeatInterval = setInterval(() => {
    socket.emit('ping', { timestamp: new Date().toISOString() });
  }, 30000);

  socket.on('pong', () => {
    // Client is alive
    logger.debug(`Heartbeat received from ${socket.id}`);
  });

  // Handle disconnection
  socket.on('disconnect', (reason) => {
    clearInterval(heartbeatInterval);
    const clientInfo = connectedClients.get(socket.id);
    connectedClients.delete(socket.id);
    
    logger.info(`WebSocket disconnected: ${socket.id}`, { 
      reason, 
      clientInfo,
      remainingClients: connectedClients.size 
    });

    // Notify other clients about disconnection if it was an agent
    if (clientInfo && clientInfo.userType === 'agent') {
      socket.broadcast.emit('agentDisconnected', {
        agentId: clientInfo.userId,
        timestamp: new Date().toISOString()
      });
    }
  });
});

// Make io available to routes
app.set('io', io);
global.io = io;
```

---

## 🧪 Testing และ Validation (30 นาที)

### Step 5.1: สร้าง Test File (15 นาที)

**สร้าง test-api.js:**
```javascript
// test-api.js - Simple API testing script
const http = require('http');

const BASE_URL = 'http://localhost:3001';

// Helper function for HTTP requests
function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: res.headers['content-type']?.includes('application/json') 
              ? JSON.parse(data) : data
          });
        } catch (error) {
          resolve({ statusCode: res.statusCode, data, error });
        }
      });
    });

    req.on('error', reject);
    
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

// Test cases
async function runTests() {
  console.log('🧪 Starting API Tests...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/health',
      method: 'GET'
    });
    console.log(`   Status: ${healthResponse.statusCode}`);
    console.log(`   Response: ${healthResponse.data.status}\n`);

    // Test 2: Get All Agents
    console.log('2. Testing Get All Agents...');
    const agentsResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/agents',
      method: 'GET'
    });
    console.log(`   Status: ${agentsResponse.statusCode}`);
    console.log(`   Agents Count: ${agentsResponse.data.data?.agents?.length || 0}\n`);

    // Test 3: Agent Login
    console.log('3. Testing Agent Login...');
    const loginResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/agents/A999/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }, {
      agentCode: 'A999',
      name: 'Test Agent',
      skills: ['Testing', 'API'],
      supervisor: 'S001',
      department: 'QA'
    });
    console.log(`   Status: ${loginResponse.statusCode}`);
    console.log(`   Success: ${loginResponse.data.success}\n`);

    // Test 4: Update Agent Status
    console.log('4. Testing Agent Status Update...');
    const statusResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/agents/A999/status',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      }
    }, {
      status: 'Active',
      reason: 'Taking calls'
    });
    console.log(`   Status: ${statusResponse.statusCode}`);
    console.log(`   Success: ${statusResponse.data.success}\n`);

    // Test 5: Send Message
    console.log('5. Testing Send Message...');
    const messageResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }, {
      from: 'supervisor_test',
      fromName: 'Test Supervisor',
      to: 'A999',
      message: 'This is a test message from API testing',
      type: 'instruction',
      priority: 'normal'
    });
    console.log(`   Status: ${messageResponse.statusCode}`);
    console.log(`   Success: ${messageResponse.data.success}\n`);

    // Test 6: Get Dashboard Stats
    console.log('6. Testing Dashboard Stats...');
    const dashboardResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/dashboard/stats',
      method: 'GET'
    });
    console.log(`   Status: ${dashboardResponse.statusCode}`);
    console.log(`   Online Agents: ${dashboardResponse.data.data?.agents?.online || 0}`);
    console.log(`   Total Messages: ${dashboardResponse.data.data?.messages?.total || 0}\n`);

    // Test 7: Agent Logout
    console.log('7. Testing Agent Logout...');
    const logoutResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/agents/A999/logout',
      method: 'POST'
    });
    console.log(`   Status: ${logoutResponse.statusCode}`);
    console.log(`   Success: ${logoutResponse.data.success}\n`);

    console.log('✅ All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run tests if server is running
runTests();
```

### Step 5.2: สร้าง Postman Collection (15 นาที)

**สร้างไฟล์ Agent-Wallboard-API.postman_collection.json:**
```json
{
  "info": {
    "name": "Agent Wallboard API",
    "description": "API collection for Call Center Agent Management System",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3001"
    },
    {
      "key": "agentCode",
      "value": "A999"
    }
  ],
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/health",
          "host": ["{{baseUrl}}"],
          "path": ["health"]
        }
      }
    },
    {
      "name": "Get All Agents",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/api/agents",
          "host": ["{{baseUrl}}"],
          "path": ["api", "agents"]
        }
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "exec": [
              "pm.test('Status code is 200', function () {",
              "    pm.response.to.have.status(200);",
              "});",
              "",
              "pm.test('Response has success property', function () {",
              "    const jsonData = pm.response.json();",
              "    pm.expect(jsonData.success).to.be.true;",
              "});",
              "",
              "pm.test('Response has agents data', function () {",
              "    const jsonData = pm.response.json();",
              "    pm.expect(jsonData.data).to.have.property('agents');",
              "    pm.expect(jsonData.data.agents).to.be.an('array');",
              "});"
            ]
          }
        }
      ]
    },
    {
      "name": "Agent Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"agentCode\": \"{{agentCode}}\",\n  \"name\": \"Test Agent\",\n  \"skills\": [\"English\", \"Technical Support\"],\n  \"supervisor\": \"S001\",\n  \"department\": \"Testing\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/agents/{{agentCode}}/login",
          "host": ["{{baseUrl}}"],
          "path": ["api", "agents", "{{agentCode}}", "login"]
        }
      }
    },
    {
      "name": "Update Agent Status",
      "request": {
        "method": "PATCH",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"status\": \"Active\",\n  \"reason\": \"Ready to take calls\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/agents/{{agentCode}}/status",
          "host": ["{{baseUrl}}"],
          "path": ["api", "agents", "{{agentCode}}", "status"]
        }
      }
    },
    {
      "name": "Send Message",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"from\": \"supervisor1\",\n  \"fromName\": \"Sarah Wilson\",\n  \"to\": \"{{agentCode}}\",\n  \"message\": \"Please check your queue for priority customers\",\n  \"type\": \"instruction\",\n  \"priority\": \"high\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/messages",
          "host": ["{{baseUrl}}"],
          "path": ["api", "messages"]
        }
      }
    },
    {
      "name": "Get Agent Messages",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/api/messages/agent/{{agentCode}}",
          "host": ["{{baseUrl}}"],
          "path": ["api", "messages", "agent", "{{agentCode}}"]
        }
      }
    },
    {
      "name": "Dashboard Stats",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/api/dashboard/stats",
          "host": ["{{baseUrl}}"],
          "path": ["api", "dashboard", "stats"]
        }
      }
    }
  ]
}
```

---

## 🚀 Workshop Completion และ Demo (30 นาที)

### Step 6.1: การรัน Application (10 นาที)

```bash
# สร้าง logs directory
mkdir logs

# เริ่มต้น development server
npm run dev
```

**ทดสอบระบบ:**
```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Run API tests
npm test
```

### Step 6.2: Demo Scenarios (20 นาที)

**Scenario 1: Agent Login และ Status Management**
1. Agent A001 เข้าสู่ระบบ
2. เปลี่ยนสถานะเป็น Available
3. เปลี่ยนสถานะเป็น Active (รับสาย)
4. เปลี่ยนสถานะเป็น Wrap Up
5. กลับเป็น Available

**Scenario 2: Message Communication**
1. Supervisor ส่งข้อความให้ Agent A001
2. Supervisor ส่งข้อความแบบ broadcast ให้ทุกคน
3. Agent เช็คข้อความที่ได้รับ
4. Mark message as read

**Scenario 3: Dashboard Monitoring**
1. ดูสถิติ real-time
2. ดู agent performance
3. ดู recent activities

---

## 🏠 Homework Assignment

### Assignment 1: เพิ่ม Features (Due: สัปดาห์หน้า)

**งานที่ 1: Break Time Management (30%)**
```javascript
// เพิ่ม API endpoints สำหรับ break time
POST /api/agents/:code/break/start   // เริ่ม break
POST /api/agents/:code/break/end     // จบ break
GET /api/agents/:code/break/history  // ประวัติ break
```

**Requirements:**
- Agent สามารถขอ break ได้
- ระบุประเภท break (lunch, coffee, personal)
- จำกัดเวลา break ตามประเภท
- Track break time statistics

**งานที่ 2: Skill-based Routing (30%)**
```javascript
// เพิ่ม API สำหรับจัดการ skills
PUT /api/agents/:code/skills         // อัพเดท skills
GET /api/agents/by-skill/:skillName  // ค้นหา agents ตาม skill
POST /api/routing/find-agent         // หา agent ที่เหมาะสม
```

**Requirements:**
- Agent มี skill levels (1-5)
- ระบบหา agent ที่ skill ตรงกับ requirement
- Priority routing ตาม skill level

**งานที่ 3: Notification System (40%)**
```javascript
// เพิ่ม notification features
POST /api/notifications              // สร้าง notification
GET /api/notifications/agent/:code   // ดู notifications
PUT /api/notifications/:id/acknowledge // รับทราบ notification
```

**Requirements:**
- แยกประเภท notifications (alert, info, warning)
- Auto-notification เมื่อ agent offline นาน
- Email/SMS integration (mock)

### Assignment 2: Code Quality Improvements

**งานที่ 4: Enhanced Testing (Bonus 10%)**
- เพิ่ม unit tests ด้วย Jest
- Integration tests สำหรับ API endpoints
- WebSocket testing
- Error scenario testing

**งานที่ 5: Security Enhancements (Bonus 10%)**
- เพิ่ม JWT authentication
- API rate limiting ต่าง rate ตาม endpoint
- Input sanitization
- Request logging และ monitoring

---

## 📌 การส่งงาน Submission Guidelines

**ที่ต้องส่ง:**
1. **Source Code** - Complete project with new features
2. **API Documentation** - Updated Postman collection
3. **Demo Video** - 5-10 นาทีแสดงการทำงาน
4. **README.md** - Setup instructions และ feature descriptions

**วิธีการส่งงาน:**
- ส่ง git repository url ที่ Trello
- ปรับสถานะของ Card
- **Due Date:** ก่อนเรียนสัปดาห์หน้า

**Grading Criteria:**
- **Functionality (60%)** - Features ทำงานได้ถูกต้อง
- **Code Quality (20%)** - Clean code, good structure
- **API Design (10%)** - RESTful design, proper status codes
- **Documentation (10%)** - Clear documentation และ comments

---

## 📋 Workshop Checklist

### ✅ สิ่งที่ควรได้หลัง Workshop

**Technical Skills:**
- [ ] สามารถสร้าง Express.js server ได้
- [ ] ออกแบบ REST API endpoints
- [ ] ใช้ Middleware pattern
- [ ] จัดการ Error handling
- [ ] ใช้ WebSocket สำหรับ real-time communication
- [ ] Validate input data
- [ ] Structure โปรเจค MVC pattern

**Agent Wallboard Features:**
- [ ] Agent login/logout system
- [ ] Agent status management (Available, Active, Wrap Up, Not Ready)
- [ ] Message system (Supervisor → Agents)
- [ ] Dashboard statistics
- [ ] Real-time updates via WebSocket

**Development Skills:**
- [ ] Testing APIs ด้วย Postman
- [ ] Logging และ monitoring
- [ ] Environment configuration
- [ ] Code organization และ best practices

### 🔧 Troubleshooting Common Issues

**Issue 1: Port already in use**
```bash
# หา process ที่ใช้ port 3001
lsof -ti:3001

# Kill process
kill -9 $(lsof -ti:3001)

# หรือเปลี่ยน port ใน .env
PORT=3002
```

**Issue 2: CORS errors**
```javascript
// ตรวจสอบ CORS configuration ใน server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
```

**Issue 3: WebSocket connection failed**
```javascript
// ตรวจสอบ io setup และ client connection
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  }
});
```

**Issue 4: Validation errors**
```javascript
// ตรวจสอบ Joi schema และ request format
const { error, value } = schema.validate(req.body);
if (error) {
  console.log('Validation errors:', error.details);
}
```

---

## 🎉 สรุป Workshop

### สิ่งที่เราได้สร้างวันนี้

**1. Complete Backend Architecture**
- MVC pattern implementation
- RESTful API design
- WebSocket integration
- Error handling และ validation

**2. Agent Management System**
- Agent login/logout
- Status management
- Real-time status broadcasting

**3. Communication System**
- Message routing
- Broadcast messaging
- Message history tracking

**4. Dashboard Analytics**
- Real-time statistics
- Performance metrics
- Activity monitoring

### Key Takeaways

- **Architecture matters** - การจัดโครงสร้างโค้ดที่ดีช่วยให้ maintain ง่าย
- **Error handling is crucial** - จัดการ errors ให้ดีเพื่อ user experience ที่ดี
- **Real-time features** - WebSocket เพิ่มประสิทธิภาพของ call center system
- **Testing is important** - การทดสอบ API อย่างเป็นระบบลด bugs ใน production

### เตรียมพร้อมสำหรับสัปดาห์หน้า

**Database Integration & MongoDB**
- เปลี่ยนจาก in-memory storage เป็น persistent database
- MongoDB schema design
- Mongoose ODM
- Data relationships และ aggregation

**Happy Coding! 🚀**# Workshop: Agent Wallboard System Backend Development

