# Phase 2 Enhanced: Complete Database + WebSocket + Message System

## 📋 Phase 2 Overview

**Build From:** Enhanced Phase 1 (MVC structure, Joi validation, professional API)  
**Add:** MongoDB persistence, WebSocket real-time, Message system, API keys

### 🎯 Learning Objectives
1. **Database Migration** - จาก in-memory เป็น MongoDB Atlas
2. **Real-time Communication** - WebSocket สำหรับ live status updates
3. **Message System** - Supervisor-Agent communication system
4. **API Security** - API key authentication with roles
5. **Production Features** - Environment management และ monitoring

### ⏰ Time Allocation
- **Hour 1:** MongoDB Setup + Schema Migration (60 min)
- **Hour 2:** Database CRUD + Advanced Queries (60 min)  
- **Hour 3:** WebSocket Integration + Real-time Updates (60 min)
- **Hour 4:** Message System + API Keys (60 min)

---

## ⏰ HOUR 1: MongoDB Setup + Schema Migration (60 นาที)

### 🗄️ MongoDB Atlas Setup (20 นาที)

#### Step 1.1: Create MongoDB Atlas Account
```bash
# 1. ไปที่ https://cloud.mongodb.com
# 2. สมัครด้วย email หรือ Google account
# 3. สร้าง Organization และ Project
# 4. สร้าง Database (เลือก FREE M0 Sandbox)
# 5. เลือก Region ใกล้ที่สุด (Singapore)
```

#### Step 1.2: Database Configuration
```bash
# Database User Setup:
# Username: agentdb_user
# Password: (generate secure password)
# Role: Read and write to any database

# Network Access:
# IP Address: 0.0.0.0/0 (for development)
# Description: Development Access
```

#### Step 1.3: Get Connection String
```bash
# Connection String Format:
# mongodb+srv://agentdb_user:<password>@cluster0.xxxxx.mongodb.net/agentdb?retryWrites=true&w=majority

# Install Dependencies
npm install mongoose
```

### 📦 Enhanced Environment Setup (15 นาที)

#### Step 1.4: Update .env Configuration
```bash
# .env - Enhanced for Phase 2
NODE_ENV=development
PORT=3001

# Database Configuration
MONGODB_URI=mongodb+srv://agentdb_user:your_password@cluster0.xxxxx.mongodb.net/agentdb?retryWrites=true&w=majority
DB_NAME=agentdb

# API Security
API_KEY_SECRET=your-super-secret-api-key-here

# WebSocket Configuration
SOCKET_ORIGINS=http://localhost:3000,http://localhost:3001

# CORS
FRONTEND_URL=http://localhost:3000

# Pagination
DEFAULT_PAGE_SIZE=10
MAX_PAGE_SIZE=100

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 🔧 Database Connection Setup (25 นาที)

#### Step 1.5: Create Database Configuration
```javascript
// config/database.js - Production-ready database connection
const mongoose = require('mongoose');

class DatabaseConnection {
  constructor() {
    this.isConnected = false;
    this.connectionAttempts = 0;
    this.maxRetries = 5;
  }

  async connect() {
    try {
      if (this.isConnected) {
        console.log('📦 Already connected to MongoDB');
        return;
      }

      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        bufferMaxEntries: 0, // Disable mongoose buffering
        bufferCommands: false // Disable mongoose buffering
      };

      await mongoose.connect(process.env.MONGODB_URI, options);
      this.isConnected = true;
      this.connectionAttempts = 0;
      
      console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
      console.log(`📊 Database: ${mongoose.connection.name}`);
      
      this.setupEventHandlers();
      
    } catch (error) {
      this.connectionAttempts++;
      console.error(`❌ MongoDB connection attempt ${this.connectionAttempts} failed:`, error.message);
      
      if (this.connectionAttempts < this.maxRetries) {
        console.log(`🔄 Retrying connection in 5 seconds...`);
        setTimeout(() => this.connect(), 5000);
      } else {
        console.error(`💀 Failed to connect to MongoDB after ${this.maxRetries} attempts`);
        process.exit(1);
      }
    }
  }

  setupEventHandlers() {
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      this.isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
      this.isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
      this.isConnected = true;
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🔚 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        process.exit(1);
      }
    });
  }

  async disconnect() {
    try {
      await mongoose.connection.close();
      this.isConnected = false;
      console.log('🔚 MongoDB disconnected');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name
    };
  }
}

module.exports = new DatabaseConnection();
```

#### Step 1.6: Update Constants
```javascript
// utils/constants.js - Enhanced with message constants
const AGENT_STATUS = {
  AVAILABLE: 'Available',
  BUSY: 'Busy',
  BREAK: 'Break',
  OFFLINE: 'Offline'
};

const VALID_STATUS_TRANSITIONS = {
  'Available': ['Busy', 'Break', 'Offline'],
  'Busy': ['Available', 'Break'],
  'Break': ['Available', 'Offline'],  
  'Offline': ['Available']
};

const DEPARTMENTS = [
  'Sales',
  'Support', 
  'Technical',
  'General'
];

// New: Message constants
const MESSAGE_TYPES = {
  MESSAGE: 'message',
  BROADCAST: 'broadcast',
  ALERT: 'alert',
  SYSTEM: 'system'
};

const MESSAGE_PRIORITIES = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent'
};

const API_ROLES = {
  AGENT: 'agent',
  SUPERVISOR: 'supervisor', 
  ADMIN: 'admin'
};

// WebSocket Events
const WEBSOCKET_EVENTS = {
  AGENT_STATUS_CHANGED: 'agent_status_changed',
  AGENT_CREATED: 'agent_created',
  AGENT_ONLINE: 'agent_online',
  AGENT_OFFLINE: 'agent_offline',
  NEW_MESSAGE: 'new_message',
  MESSAGE_READ: 'message_read',
  CONNECTION_COUNT: 'connection_count'
};

module.exports = {
  AGENT_STATUS,
  VALID_STATUS_TRANSITIONS,
  DEPARTMENTS,
  MESSAGE_TYPES,
  MESSAGE_PRIORITIES,
  API_ROLES,
  WEBSOCKET_EVENTS
};
```

---

## ⏰ HOUR 2: Database CRUD + Advanced Queries (60 นาที)

### 🏗️ Enhanced Agent Model (30 นาที)

#### Step 2.1: Professional Agent Schema
```javascript
// models/Agent.js - Complete MongoDB model
const mongoose = require('mongoose');
const { 
  AGENT_STATUS, 
  DEPARTMENTS, 
  VALID_STATUS_TRANSITIONS 
} = require('../utils/constants');

const agentSchema = new mongoose.Schema({
  agentCode: {
    type: String,
    required: [true, 'Agent code is required'],
    unique: true,
    uppercase: true,
    match: [/^[A-Z]\d{3}$/, 'Agent code must be in format A001'],
    index: true
  },
  
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
    index: true
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    index: true
  },
  
  department: {
    type: String,
    enum: {
      values: DEPARTMENTS,
      message: 'Department must be one of: {VALUE}'
    },
    default: 'General',
    index: true
  },
  
  skills: [{
    type: String,
    trim: true,
    minlength: [2, 'Skill must be at least 2 characters'],
    maxlength: [50, 'Skill cannot exceed 50 characters']
  }],
  
  status: {
    type: String,
    enum: {
      values: Object.values(AGENT_STATUS),
      message: 'Status must be one of: {VALUE}'
    },
    default: 'Available',
    index: true
  },
  
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  
  // Session tracking
  loginTime: Date,
  lastStatusChange: {
    type: Date,
    default: Date.now
  },
  
  // Performance tracking
  statusHistory: [{
    from: {
      type: String,
      enum: Object.values(AGENT_STATUS)
    },
    to: {
      type: String,
      enum: Object.values(AGENT_STATUS)
    },
    reason: {
      type: String,
      maxlength: [200, 'Reason cannot exceed 200 characters']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    duration: Number // minutes in previous status
  }],
  
  // Statistics
  statistics: {
    totalSessions: { type: Number, default: 0 },
    totalTimeOnline: { type: Number, default: 0 }, // minutes
    averageSessionTime: { type: Number, default: 0 }, // minutes
    statusCounts: {
      available: { type: Number, default: 0 },
      busy: { type: Number, default: 0 },
      break: { type: Number, default: 0 }
    }
  }

}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Compound indexes for performance
agentSchema.index({ status: 1, department: 1 });
agentSchema.index({ isActive: 1, status: 1 });
agentSchema.index({ createdAt: -1 });

// Text search index
agentSchema.index({ 
  name: 'text', 
  email: 'text',
  agentCode: 'text'
}, {
  weights: {
    agentCode: 3,
    name: 2,
    email: 1
  }
});

// Virtual for current session duration
agentSchema.virtual('currentSessionDuration').get(function() {
  if (!this.loginTime) return 0;
  return Math.floor((new Date() - this.loginTime) / (1000 * 60)); // minutes
});

// Instance methods
agentSchema.methods.updateStatus = async function(newStatus, reason = null) {
  const previousStatus = this.status;
  const now = new Date();
  
  // Calculate duration in previous status
  const duration = this.lastStatusChange ? 
    Math.floor((now - this.lastStatusChange) / (1000 * 60)) : 0;
  
  // Add to history
  this.statusHistory.push({
    from: previousStatus,
    to: newStatus,
    reason,
    timestamp: now,
    duration
  });
  
  // Update status fields
  this.status = newStatus;
  this.lastStatusChange = now;
  
  // Update statistics
  if (previousStatus && this.statistics.statusCounts[previousStatus.toLowerCase()]) {
    this.statistics.statusCounts[previousStatus.toLowerCase()] += duration;
  }
  
  await this.save();
  return this;
};

agentSchema.methods.login = async function() {
  this.loginTime = new Date();
  this.status = 'Available';
  this.statistics.totalSessions += 1;
  
  await this.save();
  return this;
};

agentSchema.methods.logout = async function() {
  if (this.loginTime) {
    const sessionDuration = Math.floor((new Date() - this.loginTime) / (1000 * 60));
    this.statistics.totalTimeOnline += sessionDuration;
    this.statistics.averageSessionTime = Math.floor(
      this.statistics.totalTimeOnline / this.statistics.totalSessions
    );
  }
  
  this.status = 'Offline';
  this.loginTime = null;
  
  await this.save();
  return this;
};

// Static methods
agentSchema.statics.getStatusSummary = async function() {
  const pipeline = [
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        agents: { 
          $push: {
            agentCode: '$agentCode',
            name: '$name',
            lastStatusChange: '$lastStatusChange'
          }
        }
      }
    }
  ];
  
  const [statusGroups, totalCount] = await Promise.all([
    this.aggregate(pipeline),
    this.countDocuments({ isActive: true })
  ]);
  
  const result = {
    totalAgents: totalCount,
    statusCounts: {},
    statusPercentages: {},
    statusDetails: {}
  };
  
  // Initialize all statuses
  Object.values(AGENT_STATUS).forEach(status => {
    result.statusCounts[status] = 0;
    result.statusPercentages[status] = 0;
    result.statusDetails[status] = [];
  });
  
  // Fill actual data
  statusGroups.forEach(group => {
    result.statusCounts[group._id] = group.count;
    result.statusPercentages[group._id] = totalCount > 0 ? 
      Math.round((group.count / totalCount) * 100) : 0;
    result.statusDetails[group._id] = group.agents;
  });
  
  return result;
};

agentSchema.statics.getDepartmentStats = async function() {
  return await this.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$department',
        total: { $sum: 1 },
        available: { 
          $sum: { $cond: [{ $eq: ['$status', 'Available'] }, 1, 0] }
        },
        busy: { 
          $sum: { $cond: [{ $eq: ['$status', 'Busy'] }, 1, 0] }
        }
      }
    },
    { $sort: { total: -1 } }
  ]);
};

module.exports = mongoose.model('Agent', agentSchema);
```

#### Step 1.6: Initialize Sample Data Function
```javascript
// utils/sampleData.js - Sample data for development
const Agent = require('../models/Agent');

const sampleAgents = [
  {
    agentCode: 'A001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Sales',
    skills: ['Thai', 'English', 'Sales Techniques'],
    status: 'Available'
  },
  {
    agentCode: 'A002',
    name: 'Jane Smith', 
    email: 'jane.smith@company.com',
    department: 'Support',
    skills: ['Thai', 'Technical Support', 'Customer Service'],
    status: 'Busy'
  },
  {
    agentCode: 'S001',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    department: 'Technical',
    skills: ['English', 'Technical Leadership', 'Problem Solving'],
    status: 'Available'
  },
  {
    agentCode: 'A003',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com', 
    department: 'Sales',
    skills: ['English', 'B2B Sales'],
    status: 'Break'
  }
];

const initializeSampleData = async () => {
  try {
    // Check if data already exists
    const existingAgents = await Agent.countDocuments();
    
    if (existingAgents === 0) {
      console.log('📊 Initializing sample data...');
      
      for (const agentData of sampleAgents) {
        const agent = new Agent(agentData);
        await agent.save();
        console.log(`✅ Created sample agent: ${agent.agentCode}`);
      }
      
      console.log(`🎉 Sample data initialized: ${sampleAgents.length} agents created`);
    } else {
      console.log(`📦 Database already has ${existingAgents} agents`);
    }
  } catch (error) {
    console.error('❌ Error initializing sample data:', error);
  }
};

module.exports = { initializeSampleData };
```

---

## ⏰ HOUR 2: Database CRUD + Advanced Queries (60 นาที)

### 🎮 Enhanced Controllers with Database (35 นาที)

#### Step 2.1: Complete Agent Controller Migration
```javascript
// controllers/agentController.js - Complete database integration
const Agent = require('../models/Agent');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { AGENT_STATUS, VALID_STATUS_TRANSITIONS } = require('../utils/constants');

const agentController = {
  // GET /api/agents - Enhanced with database queries
  getAllAgents: async (req, res) => {
    try {
      const { 
        page = 1, 
        limit = 10, 
        status, 
        department, 
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;
      
      const skip = (page - 1) * limit;
      
      // Build filter object
      let filter = { isActive: true };
      
      if (status && Object.values(AGENT_STATUS).includes(status)) {
        filter.status = status;
      }
      
      if (department && DEPARTMENTS.includes(department)) {
        filter.department = department;
      }
      
      if (search) {
        filter.$text = { $search: search };
      }
      
      // Build sort object
      const sortObj = {};
      sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;
      
      // Execute queries
      const [agents, totalCount] = await Promise.all([
        Agent.find(filter)
          .sort(sortObj)
          .skip(skip)
          .limit(parseInt(limit))
          .select('-statusHistory -statistics') // Exclude heavy fields
          .lean(),
        Agent.countDocuments(filter)
      ]);
      
      const pagination = {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      };
      
      console.log(`📋 Retrieved ${agents.length} agents (page ${page})`);
      
      return sendSuccess(res, 'Agents retrieved successfully', agents, 200, { pagination });
    } catch (error) {
      console.error('Error in getAllAgents:', error);
      return sendError(res, 'Failed to retrieve agents', 500);
    }
  },

  // GET /api/agents/:id - Enhanced with database
  getAgentById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const agent = await Agent.findById(id).lean();
      
      if (!agent) {
        return sendError(res, 'Agent not found', 404);
      }
      
      console.log(`👤 Retrieved agent: ${agent.agentCode}`);
      return sendSuccess(res, 'Agent retrieved successfully', agent);
    } catch (error) {
      if (error.name === 'CastError') {
        return sendError(res, 'Invalid agent ID format', 400);
      }
      console.error('Error in getAgentById:', error);
      return sendError(res, 'Failed to retrieve agent', 500);
    }
  },

  // POST /api/agents - Enhanced with database
  createAgent: async (req, res) => {
    try {
      const agentData = req.body;
      
      // Create agent
      const newAgent = new Agent(agentData);
      await newAgent.save();
      
      console.log(`✅ Created agent: ${newAgent.agentCode} - ${newAgent.name}`);
      
      // Real-time broadcast (if WebSocket available)
      const io = req.app.get('io');
      if (io) {
        io.emit('agent_created', {
          agent: newAgent.toJSON(),
          timestamp: new Date()
        });
      }
      
      return sendSuccess(res, 'Agent created successfully', newAgent.toJSON(), 201);
    } catch (error) {
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyPattern)[0];
        return sendError(res, `${duplicateField} already exists`, 409);
      }
      
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));
        return sendError(res, 'Validation failed', 400, validationErrors);
      }
      
      console.error('Error in createAgent:', error);
      return sendError(res, 'Failed to create agent', 500);
    }
  },

  // PUT /api/agents/:id - Enhanced with database
  updateAgent: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Remove fields that shouldn't be updated directly
      delete updateData.agentCode;
      delete updateData.status;
      delete updateData.statusHistory;
      delete updateData.statistics;
      
      const updatedAgent = await Agent.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      
      if (!updatedAgent) {
        return sendError(res, 'Agent not found', 404);
      }
      
      console.log(`✏️ Updated agent: ${updatedAgent.agentCode}`);
      
      return sendSuccess(res, 'Agent updated successfully', updatedAgent.toJSON());
    } catch (error) {
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
      
      console.error('Error in updateAgent:', error);
      return sendError(res, 'Failed to update agent', 500);
    }
  },

  // PATCH /api/agents/:id/status - Enhanced with business logic
  updateAgentStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;
      
      const agent = await Agent.findById(id);
      if (!agent) {
        return sendError(res, 'Agent not found', 404);
      }

      // Business logic validation
      const currentStatus = agent.status;
      const validTransitions = VALID_STATUS_TRANSITIONS[currentStatus];
      
      if (!validTransitions.includes(status)) {
        return sendError(res, 
          `Invalid status transition from ${currentStatus} to ${status}. Valid: ${validTransitions.join(', ')}`, 
          400
        );
      }
      
      // Special business rules
      if (status === 'Break' && !reason) {
        return sendError(res, 'Reason is required when going on break', 400);
      }

      // Update using model method
      await agent.updateStatus(status, reason);
      
      console.log(`🔄 Agent ${agent.agentCode}: ${currentStatus} → ${status} ${reason ? `(${reason})` : ''}`);
      
      // Real-time broadcast
      const io = req.app.get('io');
      if (io) {
        const updateData = {
          agentId: agent._id,
          agentCode: agent.agentCode,
          name: agent.name,
          previousStatus: currentStatus,
          newStatus: status,
          reason,
          timestamp: new Date()
        };
        
        // Broadcast to all connected clients
        io.emit('agent_status_changed', updateData);
        
        // Send specific notification to the agent
        io.to(`agent_${agent.agentCode}`).emit('status_updated', updateData);
        
        // Update dashboard clients
        io.to('dashboard').emit('dashboard_update', {
          type: 'status_change',
          data: updateData
        });
      }
      
      return sendSuccess(res, `Agent status updated to ${status}`, agent.toJSON());
    } catch (error) {
      console.error('Error in updateAgentStatus:', error);
      return sendError(res, 'Failed to update agent status', 500);
    }
  },

  // DELETE /api/agents/:id - Soft delete
  deleteAgent: async (req, res) => {
    try {
      const { id } = req.params;
      
      const agent = await Agent.findByIdAndUpdate(
        id,
        { isActive: false, status: 'Offline' },
        { new: true }
      );
      
      if (!agent) {
        return sendError(res, 'Agent not found', 404);
      }
      
      console.log(`🗑️ Soft deleted agent: ${agent.agentCode} - ${agent.name}`);
      
      // Real-time broadcast
      const io = req.app.get('io');
      if (io) {
        io.emit('agent_deleted', {
          agentId: agent._id,
          agentCode: agent.agentCode,
          timestamp: new Date()
        });
      }
      
      return sendSuccess(res, 'Agent deleted successfully');
    } catch (error) {
      console.error('Error in deleteAgent:', error);
      return sendError(res, 'Failed to delete agent', 500);
    }
  },

  // GET /api/agents/status/summary - Enhanced with database aggregation
  getStatusSummary: async (req, res) => {
    try {
      const summary = await Agent.getStatusSummary();
      summary.lastUpdated = new Date().toISOString();
      
      return sendSuccess(res, 'Status summary retrieved successfully', summary);
    } catch (error) {
      console.error('Error in getStatusSummary:', error);
      return sendError(res, 'Failed to get status summary', 500);
    }
  },

  // GET /api/agents/departments/stats - New department statistics
  getDepartmentStats: async (req, res) => {
    try {
      const departmentStats = await Agent.getDepartmentStats();
      
      return sendSuccess(res, 'Department statistics retrieved successfully', departmentStats);
    } catch (error) {
      console.error('Error in getDepartmentStats:', error);
      return sendError(res, 'Failed to get department statistics', 500);
    }
  }
};

module.exports = agentController;
```

### 📊 Enhanced Dashboard Controller (25 นาที)

#### Step 2.2: Advanced Dashboard Features
```javascript
// controllers/dashboardController.js - New comprehensive dashboard
const Agent = require('../models/Agent');
const Message = require('../models/Message');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const dashboardController = {
  // GET /api/dashboard/overview - Complete dashboard overview
  getOverview: async (req, res) => {
    try {
      const [
        agentSummary,
        departmentStats,
        recentMessages,
        systemStats
      ] = await Promise.all([
        Agent.getStatusSummary(),
        Agent.getDepartmentStats(),
        Message.find()
          .sort({ createdAt: -1 })
          .limit(10)
          .select('from to message type priority createdAt')
          .lean(),
        getSystemStats()
      ]);
      
      const overview = {
        agents: agentSummary,
        departments: departmentStats,
        recentActivity: recentMessages,
        system: systemStats,
        lastUpdated: new Date().toISOString()
      };
      
      return sendSuccess(res, 'Dashboard overview retrieved successfully', overview);
    } catch (error) {
      console.error('Error in getOverview:', error);
      return sendError(res, 'Failed to get dashboard overview', 500);
    }
  },

  // GET /api/dashboard/realtime - Real-time dashboard data
  getRealTimeData: async (req, res) => {
    try {
      const io = req.app.get('io');
      
      // Get connected clients info
      const connectedClients = [];
      if (io) {
        const sockets = await io.fetchSockets();
        const agentSockets = s