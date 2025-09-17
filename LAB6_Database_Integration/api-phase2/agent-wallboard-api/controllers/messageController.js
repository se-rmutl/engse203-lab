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