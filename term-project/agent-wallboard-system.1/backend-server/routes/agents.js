const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');
const Status = require('../models/Status');
const authMiddleware = require('../middleware/auth');

// ========== GET TEAM AGENTS (for supervisors) ==========
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

// ========== UPDATE AGENT STATUS ==========
router.put('/:agentCode/status', authMiddleware, async (req, res) => {
  try {
    const { agentCode } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['Available', 'Busy', 'Break', 'Offline'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be: ' + validStatuses.join(', ')
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
      teamId: agent.teamId
    });
    
    res.json({
      success: true,
      data: {
        agentCode: agentCode.toUpperCase(),
        currentStatus: status,
        timestamp: statusUpdate.timestamp,
        teamId: agent.teamId
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

// ========== GET AGENT HISTORY ==========
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
    console.error('Get agent history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get agent history'
    });
  }
});

module.exports = router;