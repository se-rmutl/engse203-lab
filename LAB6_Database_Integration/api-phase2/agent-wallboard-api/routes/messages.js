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