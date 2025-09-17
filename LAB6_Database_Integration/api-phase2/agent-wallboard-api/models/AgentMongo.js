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