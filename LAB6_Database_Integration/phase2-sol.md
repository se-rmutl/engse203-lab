# Phase 2: Database Migration + WebSocket Complete Solution
## จาก In-Memory ไป MongoDB + Real-time Features

## 🎯 Overview

Phase 2 นี้จะเปลี่ยนจาก Phase 1 ที่ใช้ in-memory Map เป็น MongoDB และเพิ่ม WebSocket สำหรับ real-time features

## 📋 Prerequisites

มาจาก Phase 1 ที่ทำเสร็จแล้ว:
- ✅ Basic Express.js API
- ✅ Agent CRUD operations 
- ✅ Validation middleware
- ✅ Error handling

## 🚀 Installation & Setup

### Step 1: Install Dependencies

```bash
# เพิ่ม dependencies สำหรับ Phase 2
npm install mongoose socket.io cors
npm install --save-dev @types/node  # optional

# ติดตั้ง MongoDB Compass (GUI tool)
# หรือใช้ MongoDB Atlas (Cloud)
```

### Step 2: Environment Variables

**เพิ่มใน `.env`:**
```env
# Phase 1 Variables (existing)
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Phase 2: MongoDB Variables
MONGODB_URI=mongodb://localhost:27017/agentdb
# หรือใช้ MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agentdb

# Phase 2: WebSocket
WEBSOCKET_PORT=3002
```

---

## 🗂️ Step 3: MongoDB Schema & Models

### models/AgentMongo.js (ใหม่)
```javascript
// models/AgentMongo.js - MongoDB schema สำหรับ Agent
const mongoose = require('mongoose');

const statusHistorySchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  reason: { type: String, default: null },
  timestamp: { type: Date, default: Date.now }
});

const agentMongoSchema = new mongoose.Schema({
  agentCode: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^[A-Z]\d{3}$/
  },
  name: { 
    type: String, 
    required: true,
    minlength: 2,
    maxlength: 100
  },
  email: { 
    type: String, 
    required: true,
    unique: true
  },
  department: { 
    type: String, 
    default: 'General',
    enum: ['Sales', 'Support', 'Technical', 'General', 'Supervisor']
  },
  skills: [{ 
    type: String,
    minlength: 2,
    maxlength: 50
  }],
  status: { 
    type: String, 
    default: 'Available',
    enum: ['Available', 'Busy', 'Wrap', 'Break', 'Not Ready', 'Offline']
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  loginTime: { 
    type: Date, 
    default: null 
  },
  lastStatusChange: { 
    type: Date, 
    default: Date.now 
  },
  statusHistory: [statusHistorySchema],
  
  // WebSocket session tracking
  socketId: { 
    type: String, 
    default: null 
  },
  isOnline: { 
    type: Boolean, 
    default: false 
  },
  
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update updatedAt before saving
agentMongoSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Instance method สำหรับ update status
agentMongoSchema.methods.updateStatus = function(newStatus, reason = null) {
  this.statusHistory.push({
    from: this.status,
    to: newStatus,
    reason,
    timestamp: new Date()
  });
  
  this.status = newStatus;
  this.lastStatusChange = new Date();
  this.updatedAt = new Date();
  
  return this.save();
};

// Static method สำหรับ migration
agentMongoSchema.statics.migrateFromMemory = async function(memoryAgents) {
  try {
    // Clear existing data
    await this.deleteMany({});
    
    // Convert Map to Array
    const agentsArray = Array.from(memoryAgents.values());
    
    // Insert to MongoDB
    const migrated = await this.insertMany(agentsArray);
    console.log(`✅ Migrated ${migrated.length} agents to MongoDB`);
    
    return migrated;
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  }
};

const AgentMongo = mongoose.model('Agent', agentMongoSchema);

module.exports = AgentMongo;
```

### models/Message.js (ใหม่)
```javascript
// models/Message.js - Message schema สำหรับ Communication
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: { 
    type: String, 
    required: true 
  },
  to: { 
    type: String, 
    required: true 
  }, // agent code หรือ 'ALL'
  message: { 
    type: String, 
    required: true,
    maxlength: 1000
  },
  type: { 
    type: String, 
    enum: ['message', 'broadcast', 'alert', 'system'],
    default: 'message'
  },
  priority: { 
    type: String, 
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  read: { 
    type: Boolean, 
    default: false 
  },
  delivered: { 
    type: Boolean, 
    default: false 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

// Index สำหรับ query ที่เร็ว
messageSchema.index({ to: 1, timestamp: -1 });
messageSchema.index({ from: 1, timestamp: -1 });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
```

---

## 🔗 Step 4: Database Connection

### config/database.js (ใหม่)
```javascript
// config/database.js - MongoDB connection management
const mongoose = require('mongoose');

class DatabaseConnection {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    try {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agentdb';
      
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10, // Connection pool
        serverSelectionTimeoutMS: 5000, // Timeout after 5s
        socketTimeoutMS: 45000, // Close sockets after 45s
      };

      await mongoose.connect(mongoUri, options);
      
      this.isConnected = true;
      console.log('✅ Connected to MongoDB');
      console.log(`📍 Database: ${mongoose.connection.name}`);
      
      // Event listeners
      mongoose.connection.on('error', (error) => {
        console.error('❌ MongoDB connection error:', error);
        this.isConnected = false;
      });
      
      mongoose.connection.on('disconnected', () => {
        console.log('⚠️ MongoDB disconnected');
        this.isConnected = false;
      });
      
      return mongoose.connection;
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error.message);
      this.isConnected = false;
      throw error;
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('👋 Disconnected from MongoDB');
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error);
    }
  }

  getStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name
    };
  }
}

module.exports = new DatabaseConnection();
```

---

## 🔄 Step 5: Migrate Controllers to MongoDB

### controllers/agentControllerMongo.js (ใหม่)
```javascript
// controllers/agentControllerMongo.js - MongoDB-based controllers
const AgentMongo = require('../models/AgentMongo');
const { AGENT_STATUS, VALID_STATUS_TRANSITIONS, API_MESSAGES } = require('../utils/constants');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const agentControllerMongo = {
  // GET /api/agents
  getAllAgents: async (req, res) => {
    try {
      const { status, department, isOnline } = req.query;
      console.log('📖 Getting all agents with filters:', { status, department, isOnline });
      
      // Build filter object
      const filter = {};
      if (status) filter.status = status;
      if (department) filter.department = department;
      if (isOnline !== undefined) filter.isOnline = isOnline === 'true';
      
      const agents = await AgentMongo.find(filter)
        .select('-statusHistory') // Exclude history for performance
        .sort({ agentCode: 1 });
      
      console.log(`📋 Retrieved ${agents.length} agents from MongoDB`);
      
      return sendSuccess(res, 'Agents retrieved successfully', agents);
    } catch (error) {
      console.error('Error in getAllAgents:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // GET /api/agents/:id
  getAgentById: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`📖 Getting agent by ID: ${id}`);
      
      const agent = await AgentMongo.findById(id);
      
      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }

      console.log(`✅ Retrieved agent: ${agent.agentCode}`);
      return sendSuccess(res, 'Agent retrieved successfully', agent);
    } catch (error) {
      console.error('Error in getAgentById:', error);
      if (error.name === 'CastError') {
        return sendError(res, 'Invalid agent ID format', 400);
      }
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // POST /api/agents
  createAgent: async (req, res) => {
    try {
      const agentData = req.body;
      console.log('📝 Creating new agent:', agentData);
      
      // Check duplicate agentCode
      const existingAgent = await AgentMongo.findOne({ 
        agentCode: agentData.agentCode 
      });
      
      if (existingAgent) {
        return sendError(res, `Agent code ${agentData.agentCode} already exists`, 409);
      }
      
      // Create new agent
      const newAgent = new AgentMongo(agentData);
      await newAgent.save();
      
      console.log(`✅ Created agent: ${newAgent.agentCode} - ${newAgent.name}`);
      
      // Emit WebSocket event (if io is available)
      if (req.io) {
        req.io.emit('agentCreated', {
          agent: newAgent,
          timestamp: new Date()
        });
      }
      
      return sendSuccess(res, API_MESSAGES.AGENT_CREATED, newAgent, 201);
    } catch (error) {
      console.error('Error in createAgent:', error);
      
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return sendError(res, `${field} already exists`, 409);
      }
      
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));
        return sendError(res, 'Validation failed', 400, validationErrors);
      }
      
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // PUT /api/agents/:id
  updateAgent: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      console.log(`✏️ Updating agent ID: ${id}`, updateData);
      
      // Remove protected fields
      delete updateData.agentCode;
      delete updateData.statusHistory;
      delete updateData.createdAt;
      
      const agent = await AgentMongo.findByIdAndUpdate(
        id, 
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      
      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }
      
      console.log(`✅ Updated agent: ${agent.agentCode}`);
      
      // Emit WebSocket event
      if (req.io) {
        req.io.emit('agentUpdated', {
          agent: agent,
          timestamp: new Date()
        });
      }
      
      return sendSuccess(res, API_MESSAGES.AGENT_UPDATED, agent);
    } catch (error) {
      console.error('Error in updateAgent:', error);
      
      if (error.name === 'CastError') {
        return sendError(res, 'Invalid agent ID format', 400);
      }
      
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));
        return sendError(res, 'Validation failed', 400, validationErrors);
      }
      
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // PATCH /api/agents/:id/status
  updateAgentStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;
      console.log(`🔄 Updating agent status: ${id} -> ${status}`);

      const agent = await AgentMongo.findById(id);
      
      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }

      // Validate status
      if (!Object.values(AGENT_STATUS).includes(status)) {
        return sendError(res, 
          `Invalid status. Valid statuses: ${Object.values(AGENT_STATUS).join(', ')}`, 
          400
        );
      }

      // Validate transition
      const currentStatus = agent.status;
      const validTransitions = VALID_STATUS_TRANSITIONS[currentStatus];

      if (!validTransitions.includes(status)) {
        return sendError(res, 
          `Cannot change from ${currentStatus} to ${status}. Valid transitions: ${validTransitions.join(', ')}`, 
          400
        );
      }

      // Update status using instance method
      await agent.updateStatus(status, reason);
      
      console.log(`✅ Agent ${agent.agentCode} status updated to ${status}`);
      
      // Emit real-time WebSocket event
      if (req.io) {
        req.io.emit('agentStatusChanged', {
          agentId: agent._id,
          agentCode: agent.agentCode,
          previousStatus: currentStatus,
          newStatus: status,
          reason: reason,
          timestamp: new Date(),
          agent: {
            id: agent._id,
            agentCode: agent.agentCode,
            name: agent.name,
            status: agent.status
          }
        });
      }
      
      return sendSuccess(res, API_MESSAGES.STATUS_UPDATED, agent);
    } catch (error) {
      console.error('Error in updateAgentStatus:', error);
      
      if (error.name === 'CastError') {
        return sendError(res, 'Invalid agent ID format', 400);
      }
      
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // DELETE /api/agents/:id
  deleteAgent: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`🗑️ Deleting agent ID: ${id}`);
      
      const agent = await AgentMongo.findByIdAndDelete(id);
      
      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }
      
      console.log(`✅ Deleted agent: ${agent.agentCode} - ${agent.name}`);
      
      // Emit WebSocket event
      if (req.io) {
        req.io.emit('agentDeleted', {
          agentId: agent._id,
          agentCode: agent.agentCode,
          timestamp: new Date()
        });
      }
      
      return sendSuccess(res, API_MESSAGES.AGENT_DELETED);
    } catch (error) {
      console.error('Error in deleteAgent:', error);
      
      if (error.name === 'CastError') {
        return sendError(res, 'Invalid agent ID format', 400);
      }
      
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // GET /api/agents/status/summary
  getStatusSummary: async (req, res) => {
    try {
      console.log('📊 Getting status summary from MongoDB');
      
      const totalAgents = await AgentMongo.countDocuments({ isActive: true });
      
      // Aggregate status counts
      const statusCounts = await AgentMongo.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      
      // Convert to object
      const statusCountsObj = {};
      Object.values(AGENT_STATUS).forEach(status => {
        statusCountsObj[status] = 0;
      });
      
      statusCounts.forEach(item => {
        statusCountsObj[item._id] = item.count;
      });

      const statusPercentages = {};
      Object.entries(statusCountsObj).forEach(([status, count]) => {
        statusPercentages[status] = totalAgents > 0 ? Math.round((count / totalAgents) * 100) : 0;
      });
      
      // Online agents count
      const onlineAgents = await AgentMongo.countDocuments({ 
        isActive: true, 
        isOnline: true 
      });

      const summary = {
        totalAgents,
        onlineAgents,
        offlineAgents: totalAgents - onlineAgents,
        statusCounts: statusCountsObj,
        statusPercentages,
        lastUpdated: new Date().toISOString()
      };

      return sendSuccess(res, 'Status summary retrieved successfully', summary);
    } catch (error) {
      console.error('Error in getStatusSummary:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // GET /api/agents/:id/history
  getAgentStatusHistory: async (req, res) => {
    try {
      const { id } = req.params;
      const { limit = 50, page = 1 } = req.query;
      
      console.log(`📊 Getting status history for agent: ${id}`);
      
      const agent = await AgentMongo.findById(id)
        .select('agentCode name statusHistory');
      
      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }
      
      // Paginate status history
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      
      const sortedHistory = agent.statusHistory
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(startIndex, endIndex);
      
      const response = {
        agent: {
          id: agent._id,
          agentCode: agent.agentCode,
          name: agent.name
        },
        history: sortedHistory,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: agent.statusHistory.length,
          hasMore: endIndex < agent.statusHistory.length
        }
      };
      
      return sendSuccess(res, 'Status history retrieved successfully', response);
    } catch (error) {
      console.error('Error in getAgentStatusHistory:', error);
      
      if (error.name === 'CastError') {
        return sendError(res, 'Invalid agent ID format', 400);
      }
      
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  }
};

module.exports = agentControllerMongo;
```

---

## 📨 Step 6: Message System Controllers

### controllers/messageController.js (ใหม่)
```javascript
// controllers/messageController.js - Message system controllers
const Message = require('../models/Message');
const AgentMongo = require('../models/AgentMongo');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const messageController = {
  // POST /api/messages - Send message
  sendMessage: async (req, res) => {
    try {
      const { from, to, message, type = 'message', priority = 'normal' } = req.body;
      console.log(`📨 Sending message from ${from} to ${to}`);
      
      // Validate recipient (except for broadcast)
      if (to !== 'ALL') {
        const recipient = await AgentMongo.findOne({ agentCode: to, isActive: true });
        if (!recipient) {
          return sendError(res, `Agent ${to} not found or inactive`, 404);
        }
      }
      
      // Create message
      const newMessage = new Message({
        from,
        to,
        message,
        type,
        priority
      });
      
      await newMessage.save();
      
      console.log(`✅ Message sent: ${newMessage._id}`);
      
      // Emit real-time message via WebSocket
      if (req.io) {
        if (to === 'ALL') {
          // Broadcast to all connected agents
          req.io.emit('newMessage', {
            messageId: newMessage._id,
            from,
            to,
            message,
            type,
            priority,
            timestamp: newMessage.timestamp
          });
        } else {
          // Send to specific agent
          req.io.emit('newMessage', {
            messageId: newMessage._id,
            from,
            to,
            message,
            type,
            priority,
            timestamp: newMessage.timestamp
          });
        }
      }
      
      return sendSuccess(res, 'Message sent successfully', newMessage, 201);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));
        return sendError(res, 'Validation failed', 400, validationErrors);
      }
      
      return sendError(res, 'Failed to send message', 500);
    }
  },

  // GET /api/messages/:agentCode - Get messages for agent
  getMessagesForAgent: async (req, res) => {
    try {
      const { agentCode } = req.params;
      const { limit = 50, page = 1, unreadOnly = false } = req.query;
      
      console.log(`📖 Getting messages for agent: ${agentCode}`);
      
      // Build filter
      const filter = {
        $or: [
          { to: agentCode },
          { to: 'ALL' }
        ]
      };
      
      if (unreadOnly === 'true') {
        filter.read = false;
      }
      
      const skip = (page - 1) * limit;
      
      const messages = await Message.find(filter)
        .sort({ timestamp: -1 })
        .limit(parseInt(limit))
        .skip(skip);
      
      const totalMessages = await Message.countDocuments(filter);
      const unreadCount = await Message.countDocuments({
        ...filter,
        read: false
      });
      
      const response = {
        messages,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalMessages,
          hasMore: skip + messages.length < totalMessages
        },
        unreadCount
      };
      
      console.log(`📋 Retrieved ${messages.length} messages for ${agentCode}`);
      return sendSuccess(res, 'Messages retrieved successfully', response);
    } catch (error) {
      console.error('Error in getMessagesForAgent:', error);
      return sendError(res, 'Failed to get messages', 500);
    }
  },

  // PATCH /api/messages/:id/read - Mark message as read
  markMessageAsRead: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`📖 Marking message as read: ${id}`);
      
      const message = await Message.findByIdAndUpdate(
        id,
        { read: true },
        { new: true }
      );
      
      if (!message) {
        return sendError(res, 'Message not found', 404);
      }
      
      console.log(`✅ Message marked as read: ${id}`);
      
      // Emit WebSocket event
      if (req.io) {
        req.io.emit('messageRead', {
          messageId: message._id,
          to: message.to,
          timestamp: new Date()
        });
      }
      
      return sendSuccess(res, 'Message marked as read', message);
    } catch (error) {
      console.error('Error in markMessageAsRead:', error);
      
      if (error.name === 'CastError') {
        return sendError(res, 'Invalid message ID format', 400);
      }
      
      return sendError(res, 'Failed to mark message as read', 500);
    }
  },

  // GET /api/messages - Get all messages (for supervisors)
  getAllMessages: async (req, res) => {
    try {
      const { limit = 100, page = 1, from, to, type } = req.query;
      console.log('📖 Getting all messages with filters:', { from, to, type });
      
      const filter = {};
      if (from) filter.from = from;
      if (to) filter.to = to;
      if (type) filter.type = type;
      
      const skip = (page - 1) * limit;
      
      const messages = await Message.find(filter)
        .sort({ timestamp: -1 })
        .limit(parseInt(limit))
        .skip(skip);
      
      const totalMessages = await Message.countDocuments(filter);
      
      const response = {
        messages,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalMessages,
          hasMore: skip + messages.length < totalMessages
        }
      };
      
      console.log(`📋 Retrieved ${messages.length} messages`);
      return sendSuccess(res, 'All messages retrieved successfully', response);
    } catch (error) {
      console.error('Error in getAllMessages:', error);
      return sendError(res, 'Failed to get messages', 500);
    }
  }
};

module.exports = messageController;
```

---

## 🌐 Step 7: WebSocket Server Setup

### websocket/socketServer.js (ใหม่)
```javascript
// websocket/socketServer.js - WebSocket server management
const socketIo = require('socket.io');
const AgentMongo = require('../models/AgentMongo');

class SocketServer {
  constructor() {
    this.io = null;
    this.connectedClients = new Map(); // Map: socketId -> clientInfo
  }

  initialize(server) {
    this.io = socketIo(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      },
      pingTimeout: 60000,
      pingInterval: 25000
    });

    this.setupEventHandlers();
    console.log('🌐 WebSocket server initialized');
    return this.io;
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`👤 Client connected: ${socket.id}`);
      
      // Agent login
      socket.on('agent-login', async (data) => {
        try {
          const { agentCode, agentName } = data;
          console.log(`🔐 Agent login: ${agentCode}`);
          
          // Update agent online status
          const agent = await AgentMongo.findOneAndUpdate(
            { agentCode },
            { 
              isOnline: true, 
              socketId: socket.id,
              loginTime: new Date()
            },
            { new: true }
          );
          
          if (agent) {
            // Store client info
            this.connectedClients.set(socket.id, {
              agentCode,
              agentName,
              agentId: agent._id,
              loginTime: new Date()
            });
            
            // Join agent to their room
            socket.join(`agent-${agentCode}`);
            
            // Notify others
            socket.broadcast.emit('agent-online', {
              agentCode,
              agentName,
              timestamp: new Date()
            });
            
            // Send welcome message
            socket.emit('login-success', {
              agent: agent,
              message: 'Successfully connected to Agent Wallboard System'
            });
            
            console.log(`✅ Agent ${agentCode} logged in successfully`);
          } else {
            socket.emit('login-error', {
              message: `Agent ${agentCode} not found`
            });
          }
        } catch (error) {
          console.error('❌ Agent login error:', error);
          socket.emit('login-error', {
            message: 'Login failed'
          });
        }
      });

      // Agent logout
      socket.on('agent-logout', async (data) => {
        try {
          const clientInfo = this.connectedClients.get(socket.id);
          if (clientInfo) {
            await this.handleAgentDisconnect(socket.id);
          }
        } catch (error) {
          console.error('❌ Agent logout error:', error);
        }
      });

      // Join dashboard room (for supervisors)
      socket.on('join-dashboard', () => {
        socket.join('dashboard');
        console.log(`📊 Client joined dashboard room: ${socket.id}`);
        
        // Send current stats
        this.sendDashboardUpdate();
      });

      // Handle disconnection
      socket.on('disconnect', async () => {
        console.log(`👤 Client disconnected: ${socket.id}`);
        await this.handleAgentDisconnect(socket.id);
      });

      // Ping-pong for connection health
      socket.on('ping', () => {
        socket.emit('pong');
      });
    });
  }

  async handleAgentDisconnect(socketId) {
    try {
      const clientInfo = this.connectedClients.get(socketId);
      
      if (clientInfo) {
        const { agentCode, agentName } = clientInfo;
        
        // Update agent offline status
        await AgentMongo.findOneAndUpdate(
          { agentCode },
          { 
            isOnline: false, 
            socketId: null,
            status: 'Offline'
          }
        );
        
        // Remove from connected clients
        this.connectedClients.delete(socketId);
        
        // Notify others
        this.io.emit('agent-offline', {
          agentCode,
          agentName,
          timestamp: new Date()
        });
        
        console.log(`🔌 Agent ${agentCode} disconnected and marked offline`);
      }
    } catch (error) {
      console.error('❌ Error handling agent disconnect:', error);
    }
  }

  async sendDashboardUpdate() {
    try {
      // Get current statistics
      const totalAgents = await AgentMongo.countDocuments({ isActive: true });
      const onlineAgents = await AgentMongo.countDocuments({ 
        isActive: true, 
        isOnline: true 
      });
      
      const statusCounts = await AgentMongo.aggregate([
        { $match: { isActive: true, isOnline: true } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      
      const stats = {
        totalAgents,
        onlineAgents,
        offlineAgents: totalAgents - onlineAgents,
        statusBreakdown: statusCounts.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        timestamp: new Date()
      };
      
      // Send to dashboard room
      this.io.to('dashboard').emit('dashboardUpdate', stats);
    } catch (error) {
      console.error('❌ Error sending dashboard update:', error);
    }
  }

  // Method to send message to specific agent
  sendToAgent(agentCode, event, data) {
    this.io.to(`agent-${agentCode}`).emit(event, data);
  }

  // Method to broadcast to all agents
  broadcastToAllAgents(event, data) {
    this.io.emit(event, data);
  }

  // Get connected clients info
  getConnectedClients() {
    return Array.from(this.connectedClients.values());
  }

  // Get WebSocket instance
  getIO() {
    return this.io;
  }
}

module.exports = new SocketServer();
```

---

## 🛣️ Step 8: Updated Routes

### routes/agents.js (อัพเดท)
```javascript
// routes/agents.js - Updated routes สำหรับ MongoDB
const express = require('express');
const agentController = require('../controllers/agentControllerMongo'); // เปลี่ยนเป็น MongoDB version
const { validateAgent, validateStatusUpdate } = require('../middleware/validation');

const router = express.Router();

// GET /api/agents - List all agents
router.get('/', agentController.getAllAgents);

// GET /api/agents/status/summary - ต้องมาก่อน /:id route
router.get('/status/summary', agentController.getStatusSummary);

// GET /api/agents/:id - Get specific agent
router.get('/:id', agentController.getAgentById);

// GET /api/agents/:id/history - Get agent status history
router.get('/:id/history', agentController.getAgentStatusHistory);

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

### routes/messages.js (ใหม่)
```javascript
// routes/messages.js - Message system routes
const express = require('express');
const messageController = require('../controllers/messageController');
const { validateMessage } = require('../middleware/validation');

const router = express.Router();

// POST /api/messages - Send message
router.post('/', validateMessage, messageController.sendMessage);

// GET /api/messages - Get all messages (for supervisors)
router.get('/', messageController.getAllMessages);

// GET /api/messages/:agentCode - Get messages for specific agent
router.get('/:agentCode', messageController.getMessagesForAgent);

// PATCH /api/messages/:id/read - Mark message as read
router.patch('/:id/read', messageController.markMessageAsRead);

module.exports = router;
```

### routes/index.js (อัพเดท)
```javascript
// routes/index.js - Updated routes aggregator
const express = require('express');
const agentRoutes = require('./agents');
const messageRoutes = require('./messages');

const router = express.Router();

// API health check with database status
router.get('/health', async (req, res) => {
  const mongoose = require('mongoose');
  
  res.json({
    success: true,
    status: 'OK',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    version: '2.0.0', // Phase 2
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      name: mongoose.connection.name
    },
    websocket: {
      status: 'Active',
      connectedClients: req.io ? Object.keys(req.io.sockets.sockets).length : 0
    }
  });
});

// API documentation
router.get('/docs', (req, res) => {
  res.json({
    title: 'Agent Wallboard API Phase 2 - Database + WebSocket',
    version: '2.0.0',
    baseUrl: `${req.protocol}://${req.get('host')}`,
    features: [
      'MongoDB persistence',
      'Real-time WebSocket communication',
      'Message system',
      'Agent status tracking',
      'Dashboard statistics'
    ],
    endpoints: {
      // Agent endpoints
      'GET /api/health': 'API health check with database status',
      'GET /api/agents': 'List all agents (supports ?status=, ?department=, ?isOnline=)',
      'POST /api/agents': 'Create new agent',
      'GET /api/agents/:id': 'Get specific agent',
      'PUT /api/agents/:id': 'Update agent information',
      'PATCH /api/agents/:id/status': 'Update agent status',
      'DELETE /api/agents/:id': 'Delete agent',
      'GET /api/agents/status/summary': 'Agent status summary',
      'GET /api/agents/:id/history': 'Agent status history',
      
      // Message endpoints
      'POST /api/messages': 'Send message to agent(s)',
      'GET /api/messages': 'Get all messages',
      'GET /api/messages/:agentCode': 'Get messages for specific agent',
      'PATCH /api/messages/:id/read': 'Mark message as read'
    },
    websocketEvents: {
      client: [
        'agent-login',
        'agent-logout', 
        'join-dashboard'
      ],
      server: [
        'agentStatusChanged',
        'newMessage',
        'agentCreated',
        'agentUpdated',
        'agentDeleted',
        'dashboardUpdate'
      ]
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
      },
      sendMessage: {
        method: 'POST',
        url: '/api/messages',
        body: {
          from: 'Supervisor1',
          to: 'A001',
          message: 'Please check your queue',
          type: 'message',
          priority: 'normal'
        }
      }
    }
  });
});

// Mount routes
router.use('/agents', agentRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
```

---

## 🔧 Step 9: Enhanced Middleware

### middleware/validation.js (อัพเดท)
```javascript
// middleware/validation.js - Enhanced validation with message validation
const Joi = require('joi');
const { AGENT_STATUS, DEPARTMENTS } = require('../utils/constants');
const { sendError } = require('../utils/apiResponse');

// Validation schemas
const schemas = {
  // Agent validation (existing)
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

  // Status update validation (existing)
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
  }),

  // Message validation (ใหม่)
  message: Joi.object({
    from: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'From must be at least 2 characters',
        'string.max': 'From cannot exceed 100 characters',
        'any.required': 'From is required'
      }),
    
    to: Joi.string()
      .min(1)
      .max(100)
      .required()
      .messages({
        'string.min': 'To must be at least 1 character',
        'string.max': 'To cannot exceed 100 characters',
        'any.required': 'To is required'
      }),
    
    message: Joi.string()
      .min(1)
      .max(1000)
      .required()
      .messages({
        'string.min': 'Message cannot be empty',
        'string.max': 'Message cannot exceed 1000 characters',
        'any.required': 'Message is required'
      }),
    
    type: Joi.string()
      .valid('message', 'broadcast', 'alert', 'system')
      .default('message')
      .messages({
        'any.only': 'Type must be one of: message, broadcast, alert, system'
      }),
    
    priority: Joi.string()
      .valid('low', 'normal', 'high', 'urgent')
      .default('normal')
      .messages({
        'any.only': 'Priority must be one of: low, normal, high, urgent'
      })
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

    console.log('⚠️ Agent validation failed:', validationErrors);
    return sendError(res, 'Validation failed', 400, validationErrors);
  }

  req.body = value;
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

    console.log('⚠️ Status validation failed:', validationErrors);
    return sendError(res, 'Status validation failed', 400, validationErrors);
  }

  req.body = value;
  next();
};

// Message validation (ใหม่)
const validateMessage = (req, res, next) => {
  const { error, value } = schemas.message.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const validationErrors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));

    console.log('⚠️ Message validation failed:', validationErrors);
    return sendError(res, 'Message validation failed', 400, validationErrors);
  }

  req.body = value;
  next();
};

module.exports = {
  validateAgent,
  validateStatusUpdate,
  validateMessage
};
```

---

## 🖥️ Step 10: Updated Main Server

### server.js (อัพเดท)
```javascript
// server.js - Phase 2: Main application server with MongoDB + WebSocket
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import configurations
const databaseConnection = require('./config/database');
const socketServer = require('./websocket/socketServer');

// Import routes
const routes = require('./routes');
const { globalErrorHandler, notFoundHandler, performanceMonitor } = require('./middleware/errorHandler');

// Import models for migration
const { agents } = require('./models/Agent'); // Phase 1 in-memory data
const AgentMongo = require('./models/AgentMongo'); // Phase 2 MongoDB model

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Initialize WebSocket
const io = socketServer.initialize(server);

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

// WebSocket middleware - เพิ่ม io instance ใน request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Agent Wallboard API Phase 2 - Database + WebSocket',
    version: '2.0.0',
    phase: 2,
    features: [
      'MongoDB persistence',
      'Real-time WebSocket communication', 
      'Message system',
      'Agent status tracking',
      'Dashboard statistics'
    ],
    environment: process.env.NODE_ENV || 'development',
    documentation: '/api/docs',
    health: '/api/health',
    endpoints: {
      agents: '/api/agents',
      messages: '/api/messages',
      health: '/api/health',
      docs: '/api/docs'
    },
    websocket: {
      url: `ws://localhost:${PORT}`,
      events: ['agentStatusChanged', 'newMessage', 'dashboardUpdate']
    }
  });
});

// API routes
app.use('/api', routes);

// Error handlers (ต้องอยู่ท้ายสุด)
app.use('*', notFoundHandler);
app.use(globalErrorHandler);

// Data migration function
async function migrateFromMemoryToMongo() {
  try {
    console.log('🔄 Starting migration from in-memory to MongoDB...');
    
    if (agents.size === 0) {
      console.log('⚠️ No in-memory agents to migrate');
      return;
    }
    
    await AgentMongo.migrateFromMemory(agents);
    console.log('✅ Migration completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    // Don't stop server if migration fails
  }
}

// Start server
const startServer = async () => {
  try {
    console.log('🚀 Starting Agent Wallboard API Phase 2...');
    
    // Connect to MongoDB
    await databaseConnection.connect();
    
    // Migrate data from Phase 1 (if exists)
    await migrateFromMemoryToMongo();
    
    // Start listening
    server.listen(PORT, () => {
      console.log('🎯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🌟                PHASE 2 READY!                🌟');
      console.log('🎯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🌐 Server running on http://localhost:${PORT}`);
      console.log(`🔌 WebSocket server active on ws://localhost:${PORT}`);
      console.log('📚 API Endpoints:');
      console.log(`   👤 Agents: http://localhost:${PORT}/api/agents`);
      console.log(`   💬 Messages: http://localhost:${PORT}/api/messages`);
      console.log(`   🏥 Health: http://localhost:${PORT}/api/health`);
      console.log(`   📖 Docs: http://localhost:${PORT}/api/docs`);
      console.log('🔥 New Features:');
      console.log('   ✅ MongoDB persistence');
      console.log('   ✅ Real-time WebSocket');
      console.log('   ✅ Message system');
      console.log('   ✅ Online/offline tracking');
      console.log('🎯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  
  // Close WebSocket connections
  if (io) {
    io.close();
  }
  
  // Close database connection
  await databaseConnection.disconnect();
  
  // Close HTTP server
  server.close(() => {
    console.log('✅ Process terminated gracefully');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  
  // Close WebSocket connections
  if (io) {
    io.close();
  }
  
  // Close database connection
  await databaseConnection.disconnect();
  
  // Close HTTP server
  server.close(() => {
    console.log('✅ Process terminated gracefully');
    process.exit(0);
  });
});

startServer();

module.exports = { app, server, io };
```

---

## 🧪 Step 11: Testing Phase 2

### test-websocket.html (ใหม่)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent Wallboard WebSocket Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .log { background: #f5f5f5; padding: 10px; border-radius: 5px; height: 200px; overflow-y: scroll; margin: 10px 0; }
        input, button, select { margin: 5px; padding: 8px; }
        .online { color: green; }
        .offline { color: red; }
        .status { padding: 5px; margin: 5px; border-radius: 3px; }
        .Available { background-color: #d4edda; }
        .Busy { background-color: #f8d7da; }
        .Break { background-color: #fff3cd; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌐 Agent Wallboard WebSocket Test</h1>
        
        <!-- Connection Status -->
        <div class="section">
            <h3>Connection Status</h3>
            <div id="connectionStatus" class="offline">Disconnected</div>
            <button onclick="connect()">Connect</button>
            <button onclick="disconnect()">Disconnect</button>
        </div>

        <!-- Agent Login -->
        <div class="section">
            <h3>Agent Login</h3>
            <input type="text" id="agentCode" placeholder="Agent Code (e.g., A001)" value="A001">
            <input type="text" id="agentName" placeholder="Agent Name" value="Test Agent">
            <button onclick="agentLogin()">Login as Agent</button>
            <button onclick="agentLogout()">Logout</button>
        </div>

        <!-- Status Update -->
        <div class="section">
            <h3>Update Status</h3>
            <select id="statusSelect">
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Wrap">Wrap</option>
                <option value="Break">Break</option>
                <option value="Not Ready">Not Ready</option>
                <option value="Offline">Offline</option>
            </select>
            <input type="text" id="statusReason" placeholder="Reason (optional)">
            <button onclick="updateStatus()">Update Status</button>
        </div>

        <!-- Send Message -->
        <div class="section">
            <h3>Send Message</h3>
            <input type="text" id="messageTo" placeholder="To Agent Code (or ALL)" value="ALL">
            <input type="text" id="messageText" placeholder="Message">
            <select id="messageType">
                <option value="message">Message</option>
                <option value="broadcast">Broadcast</option>
                <option value="alert">Alert</option>
            </select>
            <button onclick="sendMessage()">Send Message</button>
        </div>

        <!-- Dashboard -->
        <div class="section">
            <h3>Dashboard</h3>
            <button onclick="joinDashboard()">Join Dashboard</button>
            <div id="dashboardStats"></div>
        </div>

        <!-- Event Log -->
        <div class="section">
            <h3>Event Log</h3>
            <button onclick="clearLog()">Clear Log</button>
            <div id="eventLog" class="log"></div>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        let socket = null;
        
        function log(message) {
            const eventLog = document.getElementById('eventLog');
            const timestamp = new Date().toLocaleTimeString();
            eventLog.innerHTML += `<div>[${timestamp}] ${message}</div>`;
            eventLog.scrollTop = eventLog.scrollHeight;
        }
        
        function updateConnectionStatus(status) {
            const statusEl = document.getElementById('connectionStatus');
            statusEl.textContent = status;
            statusEl.className = status === 'Connected' ? 'online' : 'offline';
        }
        
        function connect() {
            if (socket) {
                socket.disconnect();
            }
            
            socket = io('http://localhost:3001');
            
            socket.on('connect', () => {
                log('✅ Connected to WebSocket server');
                updateConnectionStatus('Connected');
            });
            
            socket.on('disconnect', () => {
                log('❌ Disconnected from WebSocket server');
                updateConnectionStatus('Disconnected');
            });
            
            socket.on('login-success', (data) => {
                log(`🔐 Login successful: ${JSON.stringify(data)}`);
            });
            
            socket.on('login-error', (data) => {
                log(`❌ Login error: ${data.message}`);
            });
            
            socket.on('agentStatusChanged', (data) => {
                log(`🔄 Status changed: ${data.agentCode} ${data.previousStatus} → ${data.newStatus}`);
            });
            
            socket.on('newMessage', (data) => {
                log(`💬 New message: From ${data.from} to ${data.to}: ${data.message}`);
            });
            
            socket.on('agent-online', (data) => {
                log(`🟢 Agent online: ${data.agentCode} - ${data.agentName}`);
            });
            
            socket.on('agent-offline', (data) => {
                log(`🔴 Agent offline: ${data.agentCode} - ${data.agentName}`);
            });
            
            socket.on('dashboardUpdate', (data) => {
                log(`📊 Dashboard update: ${data.onlineAgents}/${data.totalAgents} agents online`);
                updateDashboard(data);
            });
        }
        
        function disconnect() {
            if (socket) {
                socket.disconnect();
                socket = null;
            }
        }
        
        function agentLogin() {
            if (!socket) {
                log('❌ Not connected to server');
                return;
            }
            
            const agentCode = document.getElementById('agentCode').value;
            const agentName = document.getElementById('agentName').value;
            
            socket.emit('agent-login', { agentCode, agentName });
            log(`🔐 Attempting login: ${agentCode}`);
        }
        
        function agentLogout() {
            if (!socket) {
                log('❌ Not connected to server');
                return;
            }
            
            socket.emit('agent-logout');
            log('🔐 Logging out...');
        }
        
        async function updateStatus() {
            const agentCode = document.getElementById('agentCode').value;
            const status = document.getElementById('statusSelect').value;
            const reason = document.getElementById('statusReason').value;
            
            try {
                // Get agent ID first
                const agentsResponse = await fetch('/api/agents');
                const agentsData = await agentsResponse.json();
                const agent = agentsData.data.find(a => a.agentCode === agentCode);
                
                if (!agent) {
                    log(`❌ Agent ${agentCode} not found`);
                    return;
                }
                
                // Update status
                const response = await fetch(`/api/agents/${agent._id}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status, reason })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    log(`✅ Status updated successfully: ${status}`);
                } else {
                    log(`❌ Status update failed: ${result.message}`);
                }
            } catch (error) {
                log(`❌ Error updating status: ${error.message}`);
            }
        }
        
        async function sendMessage() {
            const from = document.getElementById('agentName').value || 'Test Supervisor';
            const to = document.getElementById('messageTo').value;
            const message = document.getElementById('messageText').value;
            const type = document.getElementById('messageType').value;
            
            try {
                const response = await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ from, to, message, type })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    log(`✅ Message sent successfully`);
                    document.getElementById('messageText').value = '';
                } else {
                    log(`❌ Message send failed: ${result.message}`);
                }
            } catch (error) {
                log(`❌ Error sending message: ${error.message}`);
            }
        }
        
        function joinDashboard() {
            if (!socket) {
                log('❌ Not connected to server');
                return;
            }
            
            socket.emit('join-dashboard');
            log('📊 Joined dashboard room');
        }
        
        function updateDashboard(data) {
            const dashboardEl = document.getElementById('dashboardStats');
            dashboardEl.innerHTML = `
                <div>Total Agents: ${data.totalAgents}</div>
                <div>Online Agents: <span class="online">${data.onlineAgents}</span></div>
                <div>Offline Agents: <span class="offline">${data.offlineAgents}</span></div>
                <div>Status Breakdown: ${JSON.stringify(data.statusBreakdown)}</div>
                <div>Last Updated: ${new Date(data.timestamp).toLocaleTimeString()}</div>
            `;
        }
        
        function clearLog() {
            document.getElementById('eventLog').innerHTML = '';
        }
        
        // Auto-connect on page load
        window.onload = function() {
            log('🌐 WebSocket Test Client loaded');
            log('Click "Connect" to start testing');
        };
    </script>
</body>
</html>
```

---

## 📋 Step 12: Testing Guide

### Manual Testing Checklist

#### 1. Database Connection Test
```bash
# Start MongoDB (if local)
mongod

# Start the server
npm run dev

# Expected output:
# ✅ Connected to MongoDB
# 🔄 Starting migration from in-memory to MongoDB...
# ✅ Migration completed successfully
# 🌟 PHASE 2 READY!
```

#### 2. API Endpoints Test
```bash
# Health check
curl http://localhost:3001/api/health

# Expected response includes database status
{
  "success": true,
  "database": {
    "status": "Connected",
    "name": "agentdb"
  },
  "websocket": {
    "status": "Active",
    "connectedClients": 0
  }
}
```

#### 3. CRUD Operations Test (MongoDB)
```bash
# Create agent
curl -X POST http://localhost:3001/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "agentCode": "A101",
    "name": "MongoDB Test Agent",
    "email": "test@mongo.com",
    "department": "Technical"
  }'

# Get all agents
curl http://localhost:3001/api/agents

# Update agent status
curl -X PATCH http://localhost:3001/api/agents/[AGENT_ID]/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Busy",
    "reason": "Testing MongoDB update"
  }'
```

#### 4. Message System Test
```bash
# Send message
curl -X POST http://localhost:3001/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Supervisor1",
    "to": "A101",
    "message": "Testing message system",
    "type": "message"
  }'

# Get messages for agent
curl http://localhost:3001/api/messages/A101
```

#### 5. WebSocket Test
```html
<!-- Open test-websocket.html in browser -->
1. Click "Connect" 
2. Enter agent code "A101"
3. Click "Login as Agent"
4. Try "Update Status"
5. Try "Send Message"
6. Click "Join Dashboard"

<!-- Expected: Real-time events in Event Log -->
```

---

## 🎯 Step 13: 20% Challenge Features

### Challenge 1: Message Read Status (Medium)
```javascript
// Add to messageController.js
markAllAsRead: async (req, res) => {
  try {
    const { agentCode } = req.params;
    
    const result = await Message.updateMany(
      { 
        $or: [{ to: agentCode }, { to: 'ALL' }],
        read: false 
      },
      { read: true }
    );
    
    // Emit WebSocket event
    if (req.io) {
      req.io.emit('allMessagesRead', {
        agentCode,
        count: result.modifiedCount,
        timestamp: new Date()
      });
    }
    
    return sendSuccess(res, `Marked ${result.modifiedCount} messages as read`);
  } catch (error) {
    return sendError(res, 'Failed to mark messages as read', 500);
  }
}
```

### Challenge 2: Agent Performance Metrics (Hard)
```javascript
// Add to AgentMongo schema
performanceSchema: {
  totalCalls: { type: Number, default: 0 },
  avgCallDuration: { type: Number, default: 0 },
  satisfactionScore: { type: Number, default: 0 },
  totalBreakTime: { type: Number, default: 0 }
}

// Add endpoint
// GET /api/agents/:id/performance
getAgentPerformance: async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;
    
    // Calculate performance metrics from status history
    const agent = await AgentMongo.findById(id);
    // Complex aggregation logic here...
    
    return sendSuccess(res, 'Performance data', metrics);
  } catch (error) {
    return sendError(res, 'Failed to get performance data', 500);
  }
}
```

### Challenge 3: Real-time Dashboard Analytics (Hard)
```javascript
// Add to socketServer.js
startDashboardUpdates() {
  setInterval(async () => {
    await this.sendDashboardUpdate();
  }, 5000); // Update every 5 seconds
}

// Enhanced dashboard data
async sendDashboardUpdate() {
  const stats = await AgentMongo.aggregate([
    {
      $group: {
        _id: null,
        totalAgents: { $sum: 1 },
        onlineAgents: { 
          $sum: { $cond: [{ $eq: ['$isOnline', true] }, 1, 0] } 
        },
        avgResponseTime: { $avg: '$avgResponseTime' },
        statusBreakdown: {
          $push: {
            status: '$status',
            count: 1
          }
        }
      }
    }
  ]);
  
  this.io.to('dashboard').emit('dashboardUpdate', stats[0]);
}
```

---

## 🚀 Next Steps: Preparing for Phase 3

### What's Coming in Phase 3:
1. **JWT Authentication** - Secure login system
2. **Role-based Access Control** - Agent vs Supervisor permissions  
3. **Advanced Security** - Input sanitization, rate limiting
4. **Production Deployment** - Docker, environment configs
5. **Advanced Analytics** - Performance monitoring, reporting

### Database Optimization for Phase 3:
```javascript
// Add indexes for better performance
agentMongoSchema.index({ agentCode: 1 });
agentMongoSchema.index({ status: 1, isOnline: 1 });
agentMongoSchema.index({ department: 1 });

messageSchema.index({ to: 1, timestamp: -1 });
messageSchema.index({ from: 1, timestamp: -1 });
messageSchema.index({ read: 1, to: 1 });
```

## 🎉 Summary

Phase 2 successfully transforms the in-memory system into a full-featured application with:

✅ **MongoDB Integration** - Persistent data storage
✅ **Real-time WebSocket** - Live status updates and messaging  
✅ **Message System** - Supervisor-Agent communication
✅ **Online Status Tracking** - Know who's connected
✅ **Enhanced APIs** - Status history, filtering, pagination
✅ **Professional Error Handling** - Graceful degradation
✅ **Migration Tools** - Seamless transition from Phase 1

The system is now ready for production-grade authentication and deployment in Phase 3!
