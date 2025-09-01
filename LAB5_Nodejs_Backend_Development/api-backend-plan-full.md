# Agent Wallboard System Backend API Workshop - 3 Phase Plan 

## 📋 Complete SRS Traceability Matrix

### Functional Requirements (ครบถ้วน)

| SRS ID | Requirement | Use Case | Phase | API Endpoints | Status |
|--------|------------|----------|-------|---------------|--------|
| **FR-01** | Agent Login/Logout Management | UC-01, UC-02 | Phase 1 | POST /api/auth/login, /logout | ✅ |
| **FR-02** | Real-time Agent Status Tracking | UC-03 | Phase 1 | PATCH /api/agents/:id/status | ✅ |
| **FR-03** | Supervisor-Agent Communication | UC-04, UC-05 | Phase 2 | POST /api/messages | ✅ |
| **FR-04** | Message Broadcasting System | UC-06 | Phase 2 | POST /api/messages/broadcast | ✅ |
| **FR-05** | Real-time Dashboard & Statistics | UC-07 | Phase 2 | GET /api/dashboard/* | ✅ |
| **FR-06** | Agent Performance Monitoring | UC-08 | Phase 3 | GET /api/analytics/* | ✅ |
| **FR-07** | Break Time Management | UC-09 | Phase 3 | POST /api/agents/:id/break/* | ✅ |
| **FR-08** | Skill-based Agent Routing | UC-10 | Phase 3 | POST /api/routing/find-agent | ✅ |
| **FR-09** | Advanced Notification System | UC-11 | Phase 3 | POST /api/notifications | ✅ |
| **FR-10** | System Administration | UC-12, UC-13 | Phase 3 | POST /api/admin/* | ✅ |
| **FR-11** | Audit Trail & Logging | UC-14 | Phase 3 | GET /api/audit/* | ✅ |

### Non-Functional Requirements

| NFR ID | Requirement | Implementation | Phase | Status |
|--------|------------|----------------|-------|--------|
| **NFR-01** | Real-time Communication (WebSocket) | Socket.io | Phase 2 | ✅ |
| **NFR-02** | Database Persistence (MSSQL + MongoDB) | Dual Database | Phase 1-3 | ✅ |
| **NFR-03** | API Performance (<200ms response) | Optimization | Phase 1-3 | ✅ |
| **NFR-04** | Authentication & Security | JWT + Middleware | Phase 1,3 | ✅ |
| **NFR-05** | Scalability (100+ concurrent users) | Architecture design | Phase 2-3 | ✅ |
| **NFR-06** | Error Handling & Recovery | Global handlers | Phase 1-3 | ✅ |
| **NFR-07** | Monitoring & Logging | Winston + metrics | Phase 3 | ✅ |

---

## 🏗️ Phase 1: Foundation & Authentication (Complete System Base)
**Duration:** 4 hours
**Focus:** พื้นฐานระบบที่สมบูรณ์ พร้อมใช้งาน

### 📚 Learning Objectives
- สร้าง Express.js API server ที่สมบูรณ์
- Authentication system ด้วย JWT
- Database integration (MSSQL + MongoDB)
- Agent management ครบถ้วน
- Error handling และ logging

### 🎯 Complete Features Phase 1

#### 1.1 Project Foundation & Database Setup (60 นาที)
```
✅ SRS Mapping: NFR-02 (Database Integration)
```

**Project Structure:**
```
agent-wallboard-backend/
├── config/
│   ├── database.js         // MSSQL + MongoDB connections
│   ├── constants.js        // Business constants
│   └── environment.js      // Environment variables
├── controllers/
│   ├── authController.js   // Authentication logic
│   └── agentController.js  // Agent management
├── middleware/
│   ├── auth.js            // JWT verification
│   ├── validation.js      // Input validation
│   └── errorHandler.js    // Global error handling
├── models/
│   ├── Agent.js           // MSSQL Agent model
│   └── StatusLog.js       // MongoDB status logging
├── routes/
│   ├── auth.js            // Authentication routes
│   └── agents.js          // Agent management routes
├── services/
│   ├── authService.js     // Business logic
│   └── agentService.js    // Agent operations
├── utils/
│   ├── logger.js          // Winston logging
│   └── responseHelper.js  // Standard responses
├── server.js              // Main server file
└── package.json
```

**Database Setup:**
```javascript
// MSSQL Tables
CREATE TABLE Agents (
    AgentId INT IDENTITY(1,1) PRIMARY KEY,
    AgentCode NVARCHAR(10) UNIQUE NOT NULL,
    AgentName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100),
    Department NVARCHAR(50),
    Skills NVARCHAR(500), -- JSON string
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE AgentSessions (
    SessionId INT IDENTITY(1,1) PRIMARY KEY,
    AgentId INT FOREIGN KEY REFERENCES Agents(AgentId),
    LoginTime DATETIME NOT NULL,
    LogoutTime DATETIME NULL,
    Status NVARCHAR(20) NOT NULL,
    LastStatusChange DATETIME DEFAULT GETDATE(),
    IPAddress NVARCHAR(50),
    UserAgent NVARCHAR(500)
);

// MongoDB Collections
// status_logs collection for real-time status tracking
// activity_logs collection for all system activities
```

#### 1.2 Authentication System (90 นาที)
```
✅ SRS Mapping: FR-01 (Agent Login/Logout), NFR-04 (Security)
✅ Use Cases: UC-01 (Agent Login), UC-02 (Agent Logout)
```

**Complete API Endpoints:**
```javascript
// Authentication Routes
POST   /api/auth/login                // Agent login with credentials
POST   /api/auth/logout               // Agent logout
POST   /api/auth/refresh              // Refresh JWT token
GET    /api/auth/verify               // Verify token validity
```

**Features:**
- JWT token generation และ validation
- Secure password handling (bcrypt)
- Session management ใน database
- Role-based access control (Agent, Supervisor, Admin)
- Auto-logout หลัง session timeout

#### 1.3 Complete Agent Management (90 นาที)
```
✅ SRS Mapping: FR-02 (Agent Status Tracking)
✅ Use Cases: UC-03 (Update Status)
```

**API Endpoints:**
```javascript
// Agent Management Routes (Protected by JWT)
GET    /api/agents                    // ดูรายชื่อ agents ทั้งหมด
GET    /api/agents/:id                // ดูข้อมูล agent เฉพาะ
POST   /api/agents                    // สร้าง agent ใหม่ (admin only)
PUT    /api/agents/:id                // อัพเดทข้อมูล agent
DELETE /api/agents/:id                // ลบ agent (admin only)
PATCH  /api/agents/:id/status         // เปลี่ยนสถานะ agent

// Agent Status Management
GET    /api/agents/status/summary     // สรุปสถานะ agents ทั้งหมด
GET    /api/agents/by-status/:status  // Filter agents ตามสถานะ
```

**Agent Status Flow Implementation:**
```javascript
const AGENT_STATUS = {
  OFFLINE: 'Offline',
  AVAILABLE: 'Available', 
  ACTIVE: 'Active',
  WRAP_UP: 'Wrap Up',
  NOT_READY: 'Not Ready',
  BREAK: 'Break'
};

// Status transition rules
const STATUS_TRANSITIONS = {
  'Offline': ['Available'],
  'Available': ['Active', 'Not Ready', 'Break', 'Offline'],
  'Active': ['Wrap Up', 'Not Ready'],
  'Wrap Up': ['Available', 'Not Ready'],
  'Not Ready': ['Available', 'Offline'],
  'Break': ['Available', 'Offline']
};
```

### 📊 Phase 1 Deliverables (สามารถใช้งานได้เลย)
1. **Complete Authentication System** - Login/Logout พร้อม JWT
2. **Working Agent Management** - CRUD operations ครบถ้วน
3. **Database Integration** - MSSQL + MongoDB พร้อมใช้งาน
4. **API Documentation** - Postman Collection พร้อม examples
5. **Error Handling** - Global error handling และ logging

### 🧪 Phase 1 Testing Scenarios
```javascript
// สามารถทดสอบครบทั้งระบบ
1. Agent Registration และ Authentication
2. Login/Logout flow ครบวงจร
3. Status management กับ validation rules
4. Database operations (MSSQL + MongoDB)
5. Error handling และ edge cases
```

---

## 🌐 Phase 2: Real-time Communication & Dashboard (Advanced Features)
**Duration:** 4 hours
**Focus:** WebSocket integration และ Dashboard ที่สมบูรณ์

### 📚 Learning Objectives
- WebSocket implementation กับ Socket.io
- Message system ครบถ้วน (private + broadcast)
- Real-time dashboard พร้อม analytics
- Event-driven architecture

### 🎯 Complete Features Phase 2

#### 2.1 WebSocket Integration & Real-time Events (75 นาที)
```
✅ SRS Mapping: NFR-01 (Real-time Communication), NFR-05 (Scalability)
```

**WebSocket Events:**
```javascript
// Server-side events
io.on('connection', (socket) => {
  // Agent connection management
  socket.on('agent:connect', (agentData))
  socket.on('agent:disconnect', (agentId))
  
  // Status updates
  socket.on('agent:status_change', (statusData))
  socket.emit('agent:status_updated', (statusData))
  
  // Message events
  socket.on('message:send', (messageData))
  socket.on('message:read', (messageId))
  socket.emit('message:received', (messageData))
  
  // Supervisor events  
  socket.on('supervisor:broadcast', (broadcastData))
  socket.emit('dashboard:update', (dashboardData))
});
```

#### 2.2 Complete Message System (90 นaที)
```
✅ SRS Mapping: FR-03 (Supervisor Communication), FR-04 (Broadcasting)
✅ Use Cases: UC-04 (Send Message), UC-05 (Receive Message), UC-06 (Broadcast)
```

**API Endpoints:**
```javascript
// Message Management (ครบถ้วน)
POST   /api/messages                   // ส่งข้อความ private/broadcast
GET    /api/messages                   // ดูข้อความทั้งหมด (admin)
GET    /api/messages/inbox/:agentId    // ข้อความของ agent
GET    /api/messages/sent/:userId      // ข้อความที่ส่งไป
PUT    /api/messages/:id/read          // mark as read
DELETE /api/messages/:id               // ลบข้อความ

// Message Broadcasting
POST   /api/messages/broadcast         // broadcast ไปทุก agent
POST   /api/messages/broadcast/group   // broadcast ตาม department/skill
GET    /api/messages/broadcast/history // ประวัติ broadcast messages
```

**Message Types & Priority:**
```javascript
const MESSAGE_TYPES = {
  CHAT: 'chat',                    // ข้อความทั่วไป
  INSTRUCTION: 'instruction',      // คำสั่งจาก supervisor
  ALERT: 'alert',                  // การแจ้งเตือนสำคัญ
  NOTIFICATION: 'notification',    // การแจ้งเตือนระบบ
  EMERGENCY: 'emergency'           // เหตุการณ์ฉุกเฉิน
};

const MESSAGE_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal', 
  HIGH: 'high',
  URGENT: 'urgent'
};
```

#### 2.3 Advanced Dashboard & Analytics (75 นาที)
```
✅ SRS Mapping: FR-05 (Real-time Dashboard)
✅ Use Cases: UC-07 (View Dashboard)
```

**Dashboard API Endpoints:**
```javascript
// Real-time Dashboard
GET    /api/dashboard/overview          // ภาพรวมระบบ
GET    /api/dashboard/agents/status     // สถานะ agents real-time
GET    /api/dashboard/agents/performance // ประสิทธิภาพ agents
GET    /api/dashboard/messages/stats    // สถิติข้อความ
GET    /api/dashboard/system/health     // system health metrics

// Analytics
GET    /api/analytics/daily             // สถิติรายวัน
GET    /api/analytics/hourly            // สถิติรายชั่วโมง
GET    /api/analytics/agents/activity   // กิจกรรม agents
GET    /api/analytics/messages/trends   // แนวโน้มข้อความ
GET    /api/analytics/performance/kpi   // KPI metrics
```

### 📊 Phase 2 Deliverables (ระบบ Real-time สมบูรณ์)
1. **WebSocket Server** - Real-time communication ทุกรูปแบบ
2. **Complete Message System** - Private, broadcast, notification ครบถ้วน
3. **Live Dashboard** - Real-time updates กับ analytics
4. **Event-driven Architecture** - ระบบ event handling ที่แข็งแกร่ง
5. **Performance Monitoring** - Real-time metrics และ KPIs

### 🧪 Phase 2 Testing Scenarios
```javascript
// ทดสอบระบบ real-time ครบถ้วน
1. WebSocket connection/disconnection handling
2. Real-time status updates แบบ multi-user
3. Message routing (private + broadcast)
4. Dashboard real-time updates
5. Performance under load (50+ concurrent connections)
```

---

## 🚀 Phase 3: Production Ready & Advanced Management (Enterprise Level)
**Duration:** 4 hours
**Focus:** Production deployment และ advanced business features

### 📚 Learning Objectives
- Production-ready architecture
- Advanced business logic implementation
- System administration และ monitoring
- Performance optimization
- Security hardening

### 🎯 Complete Features Phase 3

#### 3.1 Advanced Agent Features & Break Management (60 นาที)
```
✅ SRS Mapping: FR-06 (Performance Monitoring), FR-07 (Break Management)
✅ Use Cases: UC-08 (Performance Tracking), UC-09 (Break Management)
```

**API Endpoints:**
```javascript
// Advanced Agent Management
GET    /api/agents/performance/report   // รายงานประสิทธิภาพ
PUT    /api/agents/:id/skills          // จัดการ skills
GET    /api/agents/skills/matrix       // skill matrix ทั้งหมด

// Break Management System
POST   /api/agents/:id/break/start     // เริ่ม break
POST   /api/agents/:id/break/end       // จบ break
GET    /api/agents/:id/break/history   // ประวัติ break
PUT    /api/agents/:id/break/schedule  // กำหนดตาราง break

// Performance Tracking
GET    /api/performance/agents/:id     // performance metrics
GET    /api/performance/department/:dept // performance by department
POST   /api/performance/goals/set      // ตั้งเป้าหมาย
GET    /api/performance/reports/daily  // รายงานประจำวัน
```

#### 3.2 Advanced Routing & Notification System (75 นาที)
```
✅ SRS Mapping: FR-08 (Skill-based Routing), FR-09 (Notification System)
✅ Use Cases: UC-10 (Skill Routing), UC-11 (Notifications)
```

**Skill-based Routing:**
```javascript
// Intelligent Agent Routing
POST   /api/routing/find-agent         // หา agent ที่เหมาะสม
POST   /api/routing/assign-task        // มอบหมายงาน
GET    /api/routing/queue/status       // สถานะคิว
PUT    /api/routing/priorities         // ตั้งค่า priority rules

// Skill Management
GET    /api/skills/categories          // หมวดหมู่ skills
POST   /api/skills/certify            // รับรอง skill
GET    /api/skills/demand/forecast     // คาดการณ์ความต้องการ skill
```

**Advanced Notification System:**
```javascript
// Notification Management
POST   /api/notifications              // สร้าง notification
GET    /api/notifications/agent/:id    // notifications ของ agent
PUT    /api/notifications/:id/ack      // acknowledge notification
DELETE /api/notifications/:id          // ลบ notification

// Notification Templates & Rules
GET    /api/notifications/templates    // templates ที่มี
POST   /api/notifications/rules        // ตั้ง notification rules
GET    /api/notifications/history      // ประวัติ notifications
```

#### 3.3 System Administration & Security (90 นาที)
```
✅ SRS Mapping: FR-10 (System Administration), FR-11 (Audit Trail)
✅ Use Cases: UC-12 (Admin Dashboard), UC-13 (System Config), UC-14 (Audit)
```

**System Administration:**
```javascript
// System Management
GET    /api/admin/system/status        // system health
POST   /api/admin/system/maintenance   // maintenance mode
GET    /api/admin/system/config        // system configuration
PUT    /api/admin/system/config        // update configuration

// User Management
GET    /api/admin/users                // จัดการ users
POST   /api/admin/users                // สร้าง user
PUT    /api/admin/users/:id/roles      // จัดการ roles
DELETE /api/admin/users/:id            // ลบ user

// Audit Trail
GET    /api/audit/logs                 // audit logs
GET    /api/audit/activities           // user activities
GET    /api/audit/reports              // audit reports
POST   /api/audit/export               // export audit data
```

**Security Implementation:**
```javascript
// Security Features
- JWT token expiration และ refresh mechanism
- Rate limiting ต่าง rate ตาม endpoint
- Input sanitization และ SQL injection prevention
- API documentation security (hide sensitive endpoints)
- HTTPS enforcement
- CORS configuration
- Security headers (helmet.js)
```

#### 3.4 Monitoring & Production Deployment (75 นาที)
```
✅ SRS Mapping: NFR-07 (Monitoring)
```

**Monitoring & Metrics:**
```javascript
// System Monitoring
GET    /api/monitoring/health          // health check
GET    /api/monitoring/metrics         // performance metrics
GET    /api/monitoring/alerts          // active alerts
GET    /api/monitoring/logs/errors     // error logs

// Performance Metrics
GET    /api/metrics/response-times     // API response times
GET    /api/metrics/database/queries   // database performance
GET    /api/metrics/websocket/connections // WebSocket metrics
GET    /api/metrics/memory/usage       // memory usage
```

### 📊 Phase 3 Deliverables (Production Ready)
1. **Enterprise Agent Management** - ครบครันด้วย performance tracking
2. **Intelligent Routing System** - skill-based routing และ optimization
3. **Comprehensive Admin Panel** - system administration ครบถ้วน
4. **Production Security** - security hardening และ monitoring
5. **Complete Documentation** - API docs, deployment guide, troubleshooting

### 🧪 Phase 3 Testing Scenarios
```javascript
// Production-level testing
1. Load testing (100+ concurrent users)
2. Security testing (penetration testing)
3. Failover testing (database/server failures)
4. Performance optimization validation
5. Admin functionality comprehensive testing
```

---

## 🔄 Phase Continuity & Integration

### Phase 1 → Phase 2 Transition
**สิ่งที่ส่งต่อ:**
- Complete authentication system เป็นพื้นฐานสำหรับ WebSocket authentication
- Agent management APIs เป็นพื้นฐานสำหรับ real-time status updates
- Database schema ใช้สำหรับ message storage และ analytics

### Phase 2 → Phase 3 Transition  
**สิ่งที่ส่งต่อ:**
- WebSocket infrastructure สำหรับ advanced notifications
- Message system เป็นพื้นฐานสำหรับ routing และ admin communications
- Dashboard analytics เป็นพื้นฐานสำหรับ performance monitoring

### Integration Points
```javascript
// ตัวอย่างการ integrate ระหว่าง phases
Phase 1: Basic agent login
Phase 2: + Real-time status broadcasting เมื่อ login
Phase 3: + Performance metrics recording + audit logging

Phase 1: Simple message sending  
Phase 2: + Real-time delivery + dashboard stats
Phase 3: + Advanced routing + notification rules
```

---

## 🎯 Complete API Endpoint Summary

### Phase 1 APIs (18 endpoints)
```javascript
// Authentication (4)
POST /api/auth/login, /logout, /refresh
GET  /api/auth/verify

// Agent Management (14) 
GET    /api/agents, /api/agents/:id, /api/agents/status/summary
POST   /api/agents
PUT    /api/agents/:id
DELETE /api/agents/:id
PATCH  /api/agents/:id/status
GET    /api/agents/by-status/:status
```

### Phase 2 APIs (25 endpoints)  
```javascript
// Messages (8)
POST /api/messages, /api/messages/broadcast
GET  /api/messages, /api/messages/inbox/:id, /api/messages/sent/:id
PUT  /api/messages/:id/read
DELETE /api/messages/:id

// Dashboard & Analytics (12)
GET /api/dashboard/overview, /agents/status, /agents/performance
GET /api/analytics/daily, /hourly, /agents/activity
```

### Phase 3 APIs (35+ endpoints)
```javascript
// Advanced Agent Features (12)
POST /api/agents/:id/break/start, /end
GET  /api/agents/:id/break/history, /performance/report
PUT  /api/agents/:id/skills

// Routing & Notifications (15)
POST /api/routing/find-agent, /api/notifications
GET  /api/notifications/agent/:id, /templates

// Administration (20+)
GET  /api/admin/system/status, /users, /api/audit/logs
POST /api/admin/system/maintenance, /users
```

**Total: 78+ API endpoints ครอบคลุม SRS ครบถ้วน**

---

## 🔥 Workshop Success Metrics

### Technical Completeness
- **SRS Coverage: 100%** - ทุก requirements ถูก implement
- **API Completeness: 78+ endpoints** - ครอบคลุมทุก use cases
- **Database Integration: Full** - MSSQL + MongoDB ครบถ้วน
- **Real-time Features: Complete** - WebSocket ทุกรูปแบบ
- **Security Implementation: Production-ready** - JWT + Security hardening

### Learning Progression
- **Phase 1: Foundation** - พื้นฐานที่แข็งแกร่งและสมบูรณ์
- **Phase 2: Real-time** - ทักษะ WebSocket และ event-driven architecture  
- **Phase 3: Enterprise** - Production deployment และ advanced features

### Deliverable Quality
- **Working Software** - ทุก Phase สามารถ demo ได้จริง
- **Production Ready** - Phase 3 พร้อม deploy จริง
- **Complete Documentation** - API docs, setup guides, troubleshooting
- **Testing Coverage** - Unit tests, integration tests, load tests

**Expected Outcome:** นักศึกษาสามารถสร้าง Production-ready Backend API สำหรับ Enterprise-level Real-time applications ได้อย่างสมบูรณ์