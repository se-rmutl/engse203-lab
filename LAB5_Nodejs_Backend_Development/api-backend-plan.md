# Agent Wallboard System Backend API Workshop - 3 Phase Plan (Revised)

## 🔄 Key Changes
**การปรับปรุง:** ย้าย JWT Authentication ไป Phase 3 เพื่อให้ Phase 1 เน้นพื้นฐาน API และ Phase 2 เน้น Database integration เพื่อให้การเรียนรู้เป็นไปตามลำดับความยากง่ายที่เหมาะสมกับนักศึกษา

---

## 📋 Revised SRS Traceability Matrix

### Phase Distribution

| SRS ID | Requirement | Use Case | Phase | Implementation | Priority |
|--------|------------|----------|-------|---------------|----------|
| **FR-01** | Basic Agent Management | UC-01, UC-02 | Phase 1 | Simple In-memory CRUD | High |
| **FR-02** | Agent Status Tracking | UC-03 | Phase 1 | In-memory status management | High |
| **FR-03** | Supervisor-Agent Communication | UC-04, UC-05 | Phase 2 | Database + Basic messaging | High |
| **FR-04** | Message Broadcasting System | UC-06 | Phase 2 | Database + WebSocket | High |
| **FR-05** | Real-time Dashboard & Statistics | UC-07 | Phase 2 | Database + Real-time updates | Medium |
| **FR-06** | Advanced Authentication & Security | UC-01-Auth | Phase 3 | JWT + Role-based access | High |
| **FR-07** | Agent Performance Monitoring | UC-08 | Phase 3 | Advanced analytics + JWT | Medium |
| **FR-08** | Break Time Management | UC-09 | Phase 3 | Business logic + Authentication | Low |
| **FR-09** | Skill-based Agent Routing | UC-10 | Phase 3 | Advanced algorithms + Security | Low |
| **FR-10** | Advanced Notification System | UC-11 | Phase 3 | Rules engine + Authentication | Medium |
| **FR-11** | System Administration | UC-12, UC-13 | Phase 3 | Admin panel + Security | Medium |
| **FR-12** | Audit Trail & Logging | UC-14 | Phase 3 | Comprehensive logging + Auth | Medium |

### Non-Functional Requirements Distribution

| NFR ID | Requirement | Phase 1 | Phase 2 | Phase 3 |
|--------|------------|---------|---------|---------|
| **NFR-01** | Real-time Communication | ❌ | ✅ WebSocket | ✅ Advanced |
| **NFR-02** | Database Persistence | ❌ In-memory | ✅ Full DB | ✅ Optimized |
| **NFR-03** | API Performance | ✅ Basic | ✅ Optimized | ✅ Production |
| **NFR-04** | Authentication & Security | ❌ Simple | ❌ Basic | ✅ JWT + Enterprise |
| **NFR-05** | Scalability | ❌ | ✅ Basic | ✅ Advanced |
| **NFR-06** | Error Handling | ✅ Basic | ✅ Advanced | ✅ Production |
| **NFR-07** | Monitoring & Logging | ✅ Console | ✅ File/DB | ✅ Enterprise |

---

## 🏗️ Phase 1: Basic API Foundation (Beginner - No Authentication)
**Duration:** 4 hours
**Focus:** Express.js พื้นฐาน, CRUD operations, In-memory storage

### 📚 Learning Objectives
- Express.js server setup และ middleware basics
- RESTful API design patterns
- In-memory data structures และ CRUD operations
- Input validation พื้นฐาน
- Error handling และ logging
- API testing basics

### 🎯 Complete Features Phase 1

#### 1.1 Project Setup & Express Server (60 minutes)
```
✅ SRS Mapping: Basic Foundation Setup
```

**Simple Project Structure:**
```
agent-wallboard-backend/
├── controllers/
│   └── agentController.js     // Agent CRUD operations
├── middleware/
│   ├── validation.js         // Basic input validation
│   └── errorHandler.js       // Simple error handling
├── models/
│   └── Agent.js              // In-memory Agent model
├── routes/
│   └── agents.js             // Agent routes
├── utils/
│   ├── logger.js             // Console logging
│   ├── responseHelper.js     // Standard API responses
│   └── constants.js          // Status constants
├── tests/
│   └── agents.test.js        // Basic API tests
├── server.js                 // Simple Express server
├── package.json
├── .env
└── README.md
```

#### 1.2 Simple In-Memory Data Management (60 minutes)
```
✅ SRS Mapping: FR-01 (Basic Agent Management)
```

**Basic Agent Model:**
```javascript
// models/Agent.js
class Agent {
  constructor(data) {
    this.id = data.id || Date.now() + Math.random();
    this.agentCode = data.agentCode;
    this.name = data.name;
    this.email = data.email;
    this.department = data.department || 'General';
    this.skills = data.skills || [];
    this.status = data.status || 'Available';
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
  }
}

// Simple in-memory storage
const agents = new Map();

// Sample data initialization
function initializeSampleData() {
  const sampleAgents = [
    { agentCode: 'A001', name: 'John Doe', email: 'john@company.com' },
    { agentCode: 'A002', name: 'Jane Smith', email: 'jane@company.com' },
    { agentCode: 'S001', name: 'Sarah Wilson', email: 'sarah@company.com' }
  ];

  sampleAgents.forEach(data => {
    const agent = new Agent(data);
    agents.set(agent.id, agent);
  });
}

module.exports = { Agent, agents, initializeSampleData };
```

#### 1.3 Basic CRUD API Endpoints (90 minutes)
```
✅ SRS Mapping: FR-01 (Agent Management), FR-02 (Status Tracking)
✅ Use Cases: UC-01 (Manage Agents), UC-03 (Update Status)
```

**Simple API Endpoints (No Authentication Required):**
```javascript
// Basic Agent Routes (เข้าใจง่าย ไม่ซับซ้อน)
GET    /api/agents                     // List all agents
GET    /api/agents/:id                 // Get specific agent
POST   /api/agents                     // Create new agent
PUT    /api/agents/:id                 // Update agent info
DELETE /api/agents/:id                 // Delete agent
PATCH  /api/agents/:id/status          // Update agent status

// Basic filtering and summary
GET    /api/agents/status/summary      // Simple status count
GET    /api/agents?status=Available    // Filter by status
GET    /api/agents?department=Sales    // Filter by department
```

**Simple Status Management:**
```javascript
const AGENT_STATUS = {
  AVAILABLE: 'Available',
  BUSY: 'Busy',
  BREAK: 'Break',
  OFFLINE: 'Offline'
};

// Simple status transitions (no complex validation)
const VALID_STATUS_TRANSITIONS = {
  'Available': ['Busy', 'Break', 'Offline'],
  'Busy': ['Available', 'Break'],
  'Break': ['Available', 'Offline'],
  'Offline': ['Available']
};
```

#### 1.4 Basic Validation & Error Handling (30 minutes)
```
✅ SRS Mapping: NFR-06 (Basic Error Handling)
```

**Simple Input Validation:**
```javascript
// Basic validation without complex libraries
function validateAgent(data) {
  const errors = [];
  
  if (!data.agentCode || !/^[A-Z]\d{3}$/.test(data.agentCode)) {
    errors.push('Agent code must be in format A001');
  }
  
  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!data.email || !data.email.includes('@')) {
    errors.push('Valid email is required');
  }
  
  return errors;
}
```

### 📊 Phase 1 Deliverables
1. **Simple Express.js API** (9 endpoints) - ใช้งานง่าย ไม่ซับซ้อน
2. **Basic Agent Management** - CRUD operations เข้าใจง่าย
3. **In-memory Storage** - เรียนรู้ data structure basics
4. **Simple Validation** - Input checking พื้นฐาน
5. **Basic Testing** - API endpoint testing
6. **Clear Documentation** - Setup guide และ API examples

### 🧪 Phase 1 Testing Focus
- API endpoint functionality testing
- Basic input validation
- Simple error scenarios
- CRUD operations consistency
- Status transition logic

---

## 🌐 Phase 2: Database Integration & Real-time Features (Intermediate)
**Duration:** 4 hours
**Focus:** Database persistence, WebSocket, Real-time dashboard

### 📚 Learning Objectives
- Database design และ integration (MSSQL + MongoDB)
- Data migration จาก in-memory เป็น persistent storage
- WebSocket implementation for real-time features
- Message system development
- Dashboard analytics และ real-time updates

### 🎯 Complete Features Phase 2

#### 2.1 Database Integration (90 minutes)
```
✅ SRS Mapping: NFR-02 (Database Persistence)
```

**Database Setup:**
- **MSSQL:** Structured data (Agents, Departments, System config)
- **MongoDB:** Unstructured data (Messages, Activity logs, Analytics)
- **Migration:** จาก in-memory ไป persistent database
- **Connection Management:** Database pools และ error handling

**Database Schema:**
```sql
-- MSSQL Schema
CREATE TABLE Agents (
    AgentId INT IDENTITY(1,1) PRIMARY KEY,
    AgentCode NVARCHAR(10) UNIQUE NOT NULL,
    AgentName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Department NVARCHAR(50),
    Skills NVARCHAR(MAX), -- JSON array
    Status NVARCHAR(20) DEFAULT 'Available',
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- MongoDB Collections
// messages collection
// activity_logs collection  
// dashboard_stats collection
```

#### 2.2 WebSocket & Real-time Communication (75 minutes)
```
✅ SRS Mapping: NFR-01 (Real-time Communication)
```

**WebSocket Features:**
- Real-time agent status broadcasting
- Live dashboard updates
- Basic real-time notifications
- Connection management

**WebSocket Events:**
```javascript
// Server-side events
io.on('connection', (socket) => {
  socket.on('agent-status-change', (data) => {
    // Broadcast status change to all clients
    io.emit('status-updated', data);
  });
  
  socket.on('join-dashboard', () => {
    socket.join('dashboard');
  });
});
```

#### 2.3 Message System (60 minutes)
```
✅ SRS Mapping: FR-03 (Communication), FR-04 (Broadcasting)
✅ Use Cases: UC-04, UC-05, UC-06
```

**Message APIs:**
```javascript
POST   /api/messages                   // Send message
POST   /api/messages/broadcast         // Send to all agents
GET    /api/messages/agent/:agentId    // Get agent's messages
PUT    /api/messages/:id/read          // Mark message as read
GET    /api/messages                   // Get all messages (basic)
```

**Message Model:**
```javascript
// MongoDB Message Schema
{
  _id: ObjectId,
  from: String,        // sender name/id
  to: String,          // recipient id or 'all'
  message: String,     // message content
  type: String,        // 'message', 'broadcast', 'alert'
  timestamp: Date,
  read: Boolean,
  delivered: Boolean
}
```

#### 2.4 Real-time Dashboard (75 minutes)
```
✅ SRS Mapping: FR-05 (Dashboard & Statistics)
✅ Use Cases: UC-07 (Dashboard Views)
```

**Dashboard APIs:**
```javascript
GET    /api/dashboard/stats            // Real-time statistics
GET    /api/dashboard/agents/status    // Agent status breakdown
GET    /api/dashboard/messages/recent  // Recent message activity
GET    /api/dashboard/activity/live    // Live activity feed
```

**Dashboard Features:**
- Real-time agent status counts
- Message activity monitoring
- Simple analytics and charts data
- Live updates via WebSocket

### 📊 Phase 2 Deliverables
1. **Database Integration** - MSSQL + MongoDB working together
2. **Data Migration** - From in-memory to persistent storage
3. **WebSocket Server** - Real-time communication infrastructure
4. **Message System** - Complete messaging functionality
5. **Live Dashboard** - Real-time monitoring interface
6. **Performance Optimization** - Basic database indexing

---

## 🚀 Phase 3: Authentication, Security & Advanced Features (Advanced)
**Duration:** 4 hours  
**Focus:** JWT Authentication, Advanced security, Enterprise features

### 📚 Learning Objectives
- JWT authentication และ authorization
- Role-based access control
- Advanced security measures
- Enterprise-level features
- Production deployment preparation

### 🎯 Complete Features Phase 3

#### 3.1 JWT Authentication & Authorization (90 minutes)
```
✅ SRS Mapping: FR-06 (Advanced Authentication & Security)
✅ Use Cases: UC-01-Auth (Secure Login/Logout)
```

**Authentication System:**
```javascript
// JWT-based authentication
POST   /api/auth/register              // User registration
POST   /api/auth/login                 // JWT login
POST   /api/auth/logout                // Secure logout
POST   /api/auth/refresh               // Token refresh
GET    /api/auth/me                    // Current user info
GET    /api/auth/verify                // Token verification
```

**Role-based Access Control:**
```javascript
const USER_ROLES = {
  AGENT: 'agent',
  SUPERVISOR: 'supervisor', 
  ADMIN: 'admin'
};

// Protected routes with role checking
router.use('/api/admin/*', requireRole(['admin']));
router.use('/api/supervisor/*', requireRole(['admin', 'supervisor']));
```

**Security Features:**
- Password hashing with bcrypt
- JWT token expiration and refresh
- Role-based route protection
- Input sanitization
- Rate limiting per endpoint

#### 3.2 Advanced Agent Features (60 minutes)
```
✅ SRS Mapping: FR-07 (Performance Monitoring), FR-08 (Break Management)
✅ Use Cases: UC-08, UC-09
```

**Performance Monitoring:**
```javascript
// Advanced agent analytics (requires authentication)
GET    /api/analytics/agent/:id/performance    // Individual metrics
GET    /api/analytics/department/performance   // Department stats
POST   /api/analytics/goals                    // Set performance goals
GET    /api/analytics/reports/daily            // Daily performance reports
```

**Break Management:**
```javascript
// Break time tracking (requires authentication)
POST   /api/agents/:id/break/start     // Start break (with reason)
POST   /api/agents/:id/break/end       // End break
GET    /api/agents/:id/break/history   // Break time history
GET    /api/agents/:id/break/summary   // Break time statistics
```

#### 3.3 Advanced Routing & Notifications (75 minutes)
```
✅ SRS Mapping: FR-09 (Skill Routing), FR-10 (Notifications)
✅ Use Cases: UC-10, UC-11
```

**Intelligent Agent Routing:**
```javascript
// Skill-based routing (admin/supervisor only)
POST   /api/routing/find-best-agent    // Find optimal agent for task
POST   /api/routing/assign-task        // Auto-assign based on skills
GET    /api/routing/availability       // Real-time availability matrix
PUT    /api/routing/rules              // Configure routing rules
```

**Advanced Notification System:**
```javascript
// Rule-based notifications (requires authentication)
POST   /api/notifications/rules        // Create notification rules
GET    /api/notifications/templates    // Notification templates
POST   /api/notifications/send         // Send custom notification
GET    /api/notifications/history      // Notification history
```

#### 3.4 System Administration & Audit (75 minutes)
```
✅ SRS Mapping: FR-11 (System Administration), FR-12 (Audit Trail)
✅ Use Cases: UC-12, UC-13, UC-14
```

**System Administration (Admin only):**
```javascript
// System management endpoints
GET    /api/admin/system/health        // Detailed system health
POST   /api/admin/system/maintenance   // Enable maintenance mode
GET    /api/admin/users                // User management
PUT    /api/admin/config               // System configuration
GET    /api/admin/logs                 // System logs
```

**Comprehensive Audit Trail:**
```javascript
// Audit and compliance features
GET    /api/audit/activities           // User activity logs
GET    /api/audit/security             // Security event logs
GET    /api/audit/data-changes         // Data modification logs
POST   /api/audit/export               // Export audit data
```

**Production Features:**
- Environment-based configuration
- Health checks and monitoring endpoints
- Comprehensive error logging
- Performance metrics collection
- Security event logging

### 📊 Phase 3 Deliverables
1. **Complete Authentication System** - JWT with role-based access
2. **Advanced Agent Management** - Performance tracking และ break management
3. **Intelligent Routing** - Skill-based agent assignment
4. **Enterprise Admin Panel** - Complete system administration
5. **Production Security** - Comprehensive security measures
6. **Audit & Compliance** - Complete activity tracking
7. **Deployment Package** - Docker และ production configuration

---

## 🔄 Revised Learning Progression

### Phase 1: Simple API Basics (4 hours)
**Skills Learned:**
- Express.js fundamentals
- RESTful API design
- In-memory data management
- Basic CRUD operations
- Simple validation และ error handling

**Complexity Level:** Beginner
**Output:** Working API with basic functionality

### Phase 2: Database & Real-time (4 hours)
**Skills Learned:**
- Database integration (MSSQL + MongoDB)
- WebSocket programming
- Real-time data synchronization
- Message system development
- Dashboard analytics

**Complexity Level:** Intermediate  
**Output:** Full-featured application with persistence

### Phase 3: Security & Enterprise (4 hours)
**Skills Learned:**
- JWT authentication และ authorization
- Role-based access control
- Advanced security measures
- Enterprise-level features
- Production deployment

**Complexity Level:** Advanced
**Output:** Production-ready enterprise system

---

## 🎯 Benefits of Revised Structure

### Educational Benefits:
1. **Gentle Learning Curve** - เริ่มจากพื้นฐาน Express.js
2. **Progressive Complexity** - เพิ่มความยากขึ้นเรื่อยๆ
3. **Practical Focus** - ได้ working system ตั้งแต่ Phase 1
4. **Real-world Skills** - จบแล้วใช้งานได้จริงในการทำงาน

### Technical Benefits:
1. **Solid Foundation** - เข้าใจ API basics ก่อนเรียน security
2. **Database Skills** - ได้เรียน database integration แยกจาก authentication
3. **Security Awareness** - เข้าใจความสำคัญของ security ใน production
4. **Production Ready** - จบแล้วพร้อม deploy จริง

**Expected Outcome:** นักศึกษาจะได้เรียนรู้แบบ step-by-step จาก API พื้นฐานไปสู่ระบบ enterprise ที่มี authentication และ security ครบถ้วน โดยไม่รู้สึกท้อแท้จากความซับซ้อนในช่วงแรก