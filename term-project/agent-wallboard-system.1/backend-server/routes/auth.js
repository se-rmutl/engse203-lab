const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Agent = require('../models/Agent');

// ========== AGENT/SUPERVISOR LOGIN ==========
router.post('/login', async (req, res) => {
  try {
    const { agentCode, supervisorCode, type } = req.body;
    
    // Determine login type
    const isAgent = agentCode && !supervisorCode;
    const isSupervisor = supervisorCode && !agentCode;
    
    if (!isAgent && !isSupervisor) {
      return res.status(400).json({
        success: false,
        error: 'Must provide either agentCode or supervisorCode'
      });
    }
    
    let user;
    
    if (isAgent) {
      // Agent login
      user = await Agent.findByCode(agentCode.toUpperCase());
      if (!user || user.role !== 'agent') {
        return res.status(401).json({
          success: false,
          error: 'Invalid agent code'
        });
      }
    } else {
      // Supervisor login
      user = await Agent.findByCode(supervisorCode.toUpperCase());
      if (!user || user.role !== 'supervisor') {
        return res.status(401).json({
          success: false,
          error: 'Invalid supervisor code'
        });
      }
      
      // Get team data for supervisor
      const teamData = await Agent.findByTeam(user.teamId);
      user.teamData = teamData;
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.agentCode,
        role: user.role,
        teamId: user.teamId 
      },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      data: {
        user: {
          agentCode: user.agentCode,
          agentName: user.agentName,
          teamId: user.teamId,
          teamName: user.teamName,
          role: user.role,
          ...(user.teamData && { teamData: user.teamData })
        },
        token
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// ========== LOGOUT ==========
router.post('/logout', (req, res) => {
  // In a real app, you might invalidate the JWT token here
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;