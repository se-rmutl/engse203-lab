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