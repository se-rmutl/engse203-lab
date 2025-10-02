const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');
const Status = require('../models/Status');
const authMiddleware = require('../middleware/auth');

/**
 * GET /api/agents/team/:teamId
 * Get all agents in a team (for supervisors)
 */
router.get('/team/:teamId', authMiddleware, async (req, res) => {
  try {
    const { teamId } = req.params;
    
    const agents = await Agent.findByTeam(parseInt(teamId));
    
    res.json({
      success: true,
      teamId: parseInt(teamId),
      agents: agents,
      count: agents.length
    });
    
  } catch (error) {
    console.error('Get team agents error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get team agents'
    });
  }
});

/**
 * PUT /api/agents/:agentCode/status
 * Update agent status
 */
router.put('/:agentCode/status', authMiddleware, async (req, res) => {
  try {
    const { agentCode } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['Available', 'Busy', 'Break', 'Offline'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    // Verify agent exists
    const agent = await Agent.findByCode(agentCode.toUpperCase());
    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
    }
    
    // Save status to MongoDB
    const statusUpdate = await Status.create({
      agentCode: agentCode.toUpperCase(),
      status: status,
      timestamp: new Date(),
      teamId: agent.team_id
    });
    
    res.json({
      success: true,
      data: {
        agentCode: agentCode.toUpperCase(),
        status: status,
        timestamp: statusUpdate.timestamp,
        teamId: agent.team_id
      }
    });
    
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update status'
    });
  }
});

/**
 * GET /api/agents/:agentCode/history
 * Get agent status history
 */
router.get('/:agentCode/history', authMiddleware, async (req, res) => {
  try {
    const { agentCode } = req.params;
    const { limit = 50 } = req.query;
    
    const history = await Status.find({
      agentCode: agentCode.toUpperCase()
    })
    .sort({ timestamp: -1 })
    .limit(parseInt(limit))
    .lean();
    
    res.json({
      success: true,
      agentCode: agentCode.toUpperCase(),
      history: history,
      count: history.length
    });
    
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get agent history'
    });
  }
});

module.exports = router;