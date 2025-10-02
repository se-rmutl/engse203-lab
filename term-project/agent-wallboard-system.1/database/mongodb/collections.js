const mongoose = require('mongoose');

// Agent Status Schema
const agentStatusSchema = new mongoose.Schema({
  agentCode: {
    type: String,
    required: true,
    index: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Busy', 'Break', 'Meeting', 'Offline'],
    default: 'Offline'
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  sessionId: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  collection: 'agent_status',
  timestamps: true
});

// Message Schema
const messageSchema = new mongoose.Schema({
  fromCode: {
    type: String,
    required: true,
    index: true
  },
  toCode: {
    type: String,
    index: true,
    default: null // null for broadcast messages
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  type: {
    type: String,
    enum: ['direct', 'broadcast'],
    default: 'direct'
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date,
    default: null
  },
  deliveredAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'messages',
  timestamps: true
});

// Connection Log Schema
const connectionLogSchema = new mongoose.Schema({
  agentCode: {
    type: String,
    required: true,
    index: true
  },
  eventType: {
    type: String,
    enum: ['connect', 'disconnect', 'reconnect'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  ipAddress: {
    type: String,
    default: 'unknown'
  },
  userAgent: {
    type: String,
    default: 'unknown'
  },
  sessionId: {
    type: String,
    required: true
  },
  connectionDuration: {
    type: Number, // in seconds
    default: 0
  }
}, {
  collection: 'connection_logs',
  timestamps: true
});

// Performance Metrics Schema (for reporting)
const performanceMetricsSchema = new mongoose.Schema({
  teamId: {
    type: Number,
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  metrics: {
    totalAgents: { type: Number, default: 0 },
    activeAgents: { type: Number, default: 0 },
    utilization: { type: Number, default: 0 }, // percentage
    avgResponseTime: { type: Number, default: 0 }, // seconds
    statusBreakdown: {
      available: { type: Number, default: 0 },
      busy: { type: Number, default: 0 },
      break: { type: Number, default: 0 },
      meeting: { type: Number, default: 0 },
      offline: { type: Number, default: 0 }
    },
    totalMessages: { type: Number, default: 0 },
    totalStatusChanges: { type: Number, default: 0 }
  }
}, {
  collection: 'performance_metrics',
  timestamps: true
});

// Create compound indexes for better query performance
agentStatusSchema.index({ agentCode: 1, timestamp: -1 });
messageSchema.index({ toCode: 1, timestamp: -1 });
messageSchema.index({ fromCode: 1, timestamp: -1 });
connectionLogSchema.index({ agentCode: 1, timestamp: -1 });
performanceMetricsSchema.index({ teamId: 1, date: -1 });

// Export models
const AgentStatus = mongoose.model('AgentStatus', agentStatusSchema);
const Message = mongoose.model('Message', messageSchema);
const ConnectionLog = mongoose.model('ConnectionLog', connectionLogSchema);
const PerformanceMetrics = mongoose.model('PerformanceMetrics', performanceMetricsSchema);

module.exports = {
  AgentStatus,
  Message,
  ConnectionLog,
  PerformanceMetrics
};