const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Agent = require('../models/Agent');
const { transformAgent, transformAgents } = require('../utils/transformers'); // เพิ่ม

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-me';

/**
 * POST /api/auth/login
 * Agent/Supervisor login
 */
router.post('/login', async (req, res) => {
  try {
    const { agentCode, supervisorCode } = req.body;
    
    // Determine login type
    const code = (agentCode || supervisorCode || '').toUpperCase();
    
    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'Agent code or Supervisor code is required'
      });
    }
    
    // Find user
    const user = await Agent.findByCode(code);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // For supervisors, get team members
    let teamData = null;
    let rawTeamData = null; // ประกาศตรงนี้
    
    if (user.role === 'supervisor') {
      rawTeamData = await Agent.findByTeam(user.team_id);
      console.log('Raw team data from DB:', rawTeamData);
      
      teamData = transformAgents(rawTeamData);
      console.log('Transformed team data:', teamData);
    }
    
    // Generate JWT token
    const token = jwt.sign(
      {
        agentCode: user.agent_code,
        role: user.role,
        teamId: user.team_id
      },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    // Response
    res.json({
      success: true,
      data: {
        user: transformAgent(user),
        teamData: teamData,
        token: token
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

/**
 * POST /api/auth/logout
 * User logout
 */
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;