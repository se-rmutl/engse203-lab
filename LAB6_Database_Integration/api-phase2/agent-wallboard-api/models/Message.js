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