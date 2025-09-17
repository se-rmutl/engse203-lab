// routes/agents.js - เชื่อม routes กับ controllers
const express = require('express');
const agentController = require('../controllers/agentControllerMongo');
const { validateAgent, validateStatusUpdate } = require('../middleware/validation');

const router = express.Router();

// GET /api/agents - List all agents
router.get('/', agentController.getAllAgents);

// GET /api/agents/status/summary - ต้องมาก่อน /:id route
router.get('/status/summary', agentController.getStatusSummary);

// GET /api/agents/:id - Get specific agent
router.get('/:id', agentController.getAgentById);

// POST /api/agents - Create new agent (with validation)
router.post('/', validateAgent, agentController.createAgent);

// PUT /api/agents/:id - Update agent
router.put('/:id', agentController.updateAgent);

// PATCH /api/agents/:id/status - Update status (with validation)
router.patch('/:id/status', validateStatusUpdate, agentController.updateAgentStatus);

// DELETE /api/agents/:id - Delete agent
router.delete('/:id', agentController.deleteAgent);

module.exports = router;