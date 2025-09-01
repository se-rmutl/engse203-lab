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

## 🎯 **Next Steps**

1. **Phase 1**: Already completed and working great! ✅
2. **Phase 2**: lready completed and working great! ✅
3. **Phase 3**: Focused on practical authentication + deployment

**Happy Coding! 💻✨**