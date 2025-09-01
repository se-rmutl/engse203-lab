# Agent Wallboard System - Revised 3 Phase Plan (Simplified)

## 📋 **Phase Distribution**

| Phase | Focus | Duration | Complexity | Key Learning |
|-------|-------|----------|------------|-------------|
| Phase 1 | Basic API + CRUD | 4 hrs | ⭐ Beginner | Express.js, RESTful API, In-memory storage |
| **Phase 2** | **Database + Simple WebSocket** | **4 hrs** | ⭐⭐ **Intermediate**| **MongoDB basics, Real-time updates** |
| Phase 3 | Authentication + Production | 4 hrs | ⭐⭐⭐ Advanced | JWT basics, Deployment ready |

---

## 🗄️ **PHASE 2: Database Integration + Simple Real-time**

### 🎯 **Learning Objectives:**
1. **เปลี่ยนจาก in-memory เป็น MongoDB** - เข้าใจ database basics
2. **เพิ่ม Simple WebSocket** - real-time status updates
3. **Message System พื้นฐาน** - Supervisor ส่งข้อความหา Agents
4. **Data Persistence** - ข้อมูลไม่หายเมื่อ restart server

### ⏰ **Time Allocation:**
- **Hour 1:** MongoDB Setup + Connection (60 นาที)
- **Hour 2:** Migrate จาก Arrays เป็น MongoDB (60 นาที)  
- **Hour 3:** Simple WebSocket + Status Broadcasting (60 นาที)
- **Hour 4:** Basic Message System (60 นาที)

---

### 📊 **HOUR 1: MongoDB Setup & Connection**

#### 🧠 **Understanding Database (15 นาที)**
```javascript
// เปรียบเทียบ In-Memory vs Database
// Phase 1: Arrays
let agents = []; // หายเมื่อ restart server

// Phase 2: MongoDB  
// ข้อมูลเก็บถาวรใน database
// สามารถ query, filter, sort ได้ง่าย
```

#### 🔧 **MongoDB Atlas Setup (25 นาที)**
```bash
# 1. สมัคร MongoDB Atlas (Free Tier)
# 2. สร้าง Cluster ใหม่
# 3. สร้าง Database User
# 4. Get Connection String
# 5. Install mongoose
npm install mongoose
```

#### 🚀 **Basic Connection (20 นาที)**
```javascript
// เพิ่มใน server.js
const mongoose = require('mongoose');

// Simple connection (ไม่ซับซ้อน)
mongoose.connect('mongodb+srv://username:password@cluster.mongodb.net/agentdb')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
```

---

### 📊 **HOUR 2: Data Migration**

#### 🗂️ **Simple Agent Schema (20 นาที)**
```javascript
// เพิ่มใน server.js (ยังไม่แยกไฟล์)
const agentSchema = new mongoose.Schema({
  agentCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, default: 'General' },
  status: { type: String, default: 'Available' },
  loginTime: Date,
  lastStatusChange: { type: Date, default: Date.now }
});

const Agent = mongoose.model('Agent', agentSchema);
```

#### 🔄 **Replace Array Operations (40 นาที)**
```javascript
// จาก: let agents = [];
// เป็น: MongoDB operations

// GET /api/agents
app.get('/api/agents', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json({ success: true, data: agents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/agents  
app.post('/api/agents', async (req, res) => {
  try {
    const agent = new Agent(req.body);
    await agent.save();
    res.status(201).json({ success: true, data: agent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// เหลือจะทำทีละตัว step by step
```

---

### 📊 **HOUR 3: Simple WebSocket**

#### 🌐 **WebSocket Setup (20 นาที)**
```bash
npm install socket.io
```

```javascript
// เพิ่มใน server.js
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "http://localhost:3000" }
});

// เปลี่ยนจาก app.listen เป็น server.listen
server.listen(PORT, () => {
  console.log(`🚀 Server with WebSocket on port ${PORT}`);
});
```

#### 📡 **Real-time Status Updates (40 นาที)**
```javascript
// WebSocket connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// เมื่ออัพเดท Agent Status
app.patch('/api/agents/:id/status', async (req, res) => {
  try {
    // ... update agent status logic ...
    
    // ส่ง real-time update
    io.emit('agentStatusChanged', {
      agentId: agent._id,
      agentCode: agent.agentCode,
      newStatus: agent.status,
      timestamp: new Date()
    });
    
    res.json({ success: true, data: agent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
```

---

### 📊 **HOUR 4: Basic Message System**

#### 💬 **Simple Message Schema (15 นาที)**
```javascript
const messageSchema = new mongoose.Schema({
  from: { type: String, required: true }, // supervisor name
  to: { type: String, required: true },   // agent code or 'ALL'
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

const Message = mongoose.model('Message', messageSchema);
```

#### 📨 **Message APIs (30 นาที)**
```javascript
// POST /api/messages - ส่งข้อความ
app.post('/api/messages', async (req, res) => {
  try {
    const { from, to, message } = req.body;
    
    const newMessage = new Message({ from, to, message });
    await newMessage.save();
    
    // ส่ง real-time message
    io.emit('newMessage', {
      from,
      to,
      message,
      timestamp: newMessage.timestamp
    });
    
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /api/messages/:agentCode - ดูข้อความของ Agent
app.get('/api/messages/:agentCode', async (req, res) => {
  try {
    const { agentCode } = req.params;
    const messages = await Message.find({
      $or: [
        { to: agentCode },
        { to: 'ALL' }
      ]
    }).sort({ timestamp: -1 });
    
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
```

#### 🧪 **WebSocket Testing (15 นาที)**
```html
<!-- สร้างไฟล์ test-websocket.html สำหรับทดสอบ -->
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();
  
  socket.on('agentStatusChanged', (data) => {
    console.log('Status changed:', data);
  });
  
  socket.on('newMessage', (data) => {
    console.log('New message:', data);
  });
</script>
```

### ✅ **Phase 2 Deliverables:**
- ✅ MongoDB connection และ data persistence
- ✅ Agent CRUD operations ด้วย database
- ✅ Simple WebSocket real-time status updates
- ✅ Basic message system (Supervisor → Agents)
- ✅ WebSocket testing ได้

### 🎯 **Phase 2 - 20% Challenge:**
1. **Message Read Status** - Mark message as read
2. **Message History** - Show conversation history
3. **Agent Online Status** - Track who's connected via WebSocket
4. **Message to Specific Agent** - Target specific agent instead of broadcast

---

## 🔐 **PHASE 3: Authentication + Production Ready** (Revised)

### 🎯 **Learning Objectives:**
1. **Simple JWT Authentication** - Login/logout system
2. **Role-based Access** - Agent vs Supervisor permissions
3. **Production Deployment** - Deploy บน cloud platform
4. **API Documentation** - Swagger/OpenAPI basics

### ⏰ **Time Allocation:**
- **Hour 1:** JWT Authentication Setup (60 นาที)
- **Hour 2:** Role-based Access Control (60 นาที)
- **Hour 3:** Production Preparation (60 นาที)
- **Hour 4:** Deployment + Documentation (60 นาที)

---

### 📊 **HOUR 1: Simple JWT Authentication**

#### 🔐 **JWT Basics Understanding (15 นาที)**
```javascript
// JWT = JSON Web Token
// เป็นวิธีการยืนยันตัวตนแบบ stateless
// ไม่ต้องเก็บ session ใน server

// JWT Structure: Header.Payload.Signature
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VudENvZGUiOiJBMDAxIn0.signature
```

#### 🔧 **Setup JWT (25 นาที)**
```bash
npm install jsonwebtoken bcryptjs
```

```javascript
// เพิ่มใน server.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Simple User Schema (ไม่ซับซ้อน)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['agent', 'supervisor'], default: 'agent' },
  agentCode: String // ถ้าเป็น agent จะมี agentCode
});

const User = mongoose.model('User', userSchema);
```

#### 🚪 **Login/Register APIs (20 นาที)**
```javascript
// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, role, agentCode } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      password: hashedPassword,
      role,
      agentCode
    });
    
    await user.save();
    res.status(201).json({ success: true, message: 'User registered' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id, role: user.role, agentCode: user.agentCode },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        username: user.username,
        role: user.role,
        agentCode: user.agentCode
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
```

---

### 📊 **HOUR 2: Role-based Access Control**

#### 🛡️ **Simple Auth Middleware (30 นาที)**
```javascript
// Middleware ตรวจสอบ JWT (ง่ายๆ)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Middleware ตรวจสอบ Role
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ 
        success: false, 
        message: `Requires ${role} role` 
      });
    }
    next();
  };
};
```

#### 🔒 **Protect Routes (30 นาที)**
```javascript
// เฉพาะ Agent ดูได้แค่ข้อมูลตัวเอง
app.get('/api/agents/me', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'agent') {
      return res.status(403).json({ success: false, message: 'Agents only' });
    }
    
    const agent = await Agent.findOne({ agentCode: req.user.agentCode });
    res.json({ success: true, data: agent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// เฉพาะ Supervisor ดูรายการ Agent ทั้งหมดได้
app.get('/api/agents', authenticateToken, requireRole('supervisor'), async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json({ success: true, data: agents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// เฉพาะ Supervisor ส่งข้อความได้
app.post('/api/messages', authenticateToken, requireRole('supervisor'), async (req, res) => {
  // ... message logic ...
});
```

---

### 📊 **HOUR 3: Production Preparation**

#### 🔧 **Environment Configuration (20 นาที)**
```javascript
// .env production
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=super-secure-secret-key-here
FRONTEND_URL=https://your-frontend-domain.com
```

#### 🛡️ **Production Security (20 นาที)**
```bash
npm install helmet express-rate-limit
```

```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Production CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

#### 📝 **Error Logging (20 นาที)**
```javascript
// Simple error logging สำหรับ production
const logError = (error, req = null) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    error: error.message,
    stack: error.stack,
    url: req ? req.url : null,
    method: req ? req.method : null
  };
  
  // ใน production จริงจะส่งไป logging service
  console.error('ERROR:', JSON.stringify(errorLog, null, 2));
};

// Global error handler
app.use((error, req, res, next) => {
  logError(error, req);
  
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ success: false, message: 'Internal server error' });
  } else {
    res.status(500).json({ success: false, message: error.message });
  }
});
```

---

### 📊 **HOUR 4: Deployment + Documentation**

#### 🚀 **Railway Deployment (30 นาที)**
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Initialize project
railway init

# 4. Deploy
railway up

# 5. Add environment variables ใน Railway dashboard
```

#### 📚 **Simple API Documentation (30 นาที)**
```javascript
// GET /api/docs - Simple API documentation
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'Agent Wallboard API Documentation',
    version: '1.0.0',
    baseUrl: req.protocol + '://' + req.get('host'),
    
    authentication: {
      type: 'Bearer Token',
      login: 'POST /api/auth/login',
      register: 'POST /api/auth/register'
    },
    
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register new user',
        'POST /api/auth/login': 'Login and get JWT token'
      },
      agents: {
        'GET /api/agents': 'Get all agents (Supervisor only)',
        'GET /api/agents/me': 'Get current agent info (Agent only)',
        'PATCH /api/agents/:id/status': 'Update agent status'
      },
      messages: {
        'POST /api/messages': 'Send message (Supervisor only)',
        'GET /api/messages/:agentCode': 'Get agent messages'
      },
      dashboard: {
        'GET /api/dashboard/summary': 'Dashboard statistics (Supervisor only)'
      }
    },
    
    sampleRequests: {
      login: {
        url: '/api/auth/login',
        method: 'POST',
        body: {
          username: 'supervisor1',
          password: 'password123'
        }
      }
    }
  });
});
```

### ✅ **Phase 3 Deliverables:**
- ✅ JWT Authentication system
- ✅ Role-based access control (Agent vs Supervisor)
- ✅ Production-ready security measures
- ✅ Cloud deployment (Railway/Heroku)
- ✅ API documentation endpoint
- ✅ Environment configuration

### 🎯 **Phase 3 - 20% Challenge:**
1. **Password Reset System** - Email-based password reset
2. **User Profile Management** - Update user information
3. **Advanced Rate Limiting** - Different limits per role
4. **API Key System** - Alternative authentication method

---

## 🎯 **Next Steps**

1. **Phase 1**: Already completed and working great! ✅
2. **Phase 2**: lready completed and working great! ✅
3. **Phase 3**: Focused on practical authentication + deployment

**Happy Coding! 💻✨**