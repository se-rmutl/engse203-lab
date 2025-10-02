const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  fromCode: {
    type: String,
    required: true,
    uppercase: true,
    index: true
  },
  toCode: {
    type: String,
    uppercase: true,
    index: true
  },
  toTeamId: {
    type: Number,
    index: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  type: {
    type: String,
    enum: ['direct', 'broadcast'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high'],
    default: 'normal'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  collection: 'messages',
  timestamps: true
});

// Compound indexes for efficient queries
messageSchema.index({ toCode: 1, timestamp: -1 });
messageSchema.index({ toTeamId: 1, timestamp: -1 });
messageSchema.index({ fromCode: 1, timestamp: -1 });

module.exports = mongoose.model('Message', messageSchema);