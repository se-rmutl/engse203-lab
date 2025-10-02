const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  agentCode: {
    type: String,
    required: true,
    uppercase: true,
    index: true
  },
  status: {
    type: String,
    enum: ['Available', 'Busy', 'Break', 'Offline'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  teamId: {
    type: Number,
    index: true
  },
  duration: {
    type: Number
  },
  sessionId: {
    type: String
  }
}, {
  collection: 'agent_status',
  timestamps: true
});

// Compound indexes
statusSchema.index({ agentCode: 1, timestamp: -1 });
statusSchema.index({ teamId: 1, timestamp: -1 });

module.exports = mongoose.model('Status', statusSchema);