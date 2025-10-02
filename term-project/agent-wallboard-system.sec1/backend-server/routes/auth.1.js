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
    if (user.role === 'supervisor') {
      teamData = await Agent.findByTeam(user.team_id);
      teamData = transformAgents(rawTeamData); // แค่บรรทัดนี้
    }
    
    // Generate JWT token
    const token = jwt.sign(
      {
        //agentCode: user.agent_code,
        user: transformAgent(user), // และบรรทัดนี้
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
        user: {
          agentCode: user.agent_code,
          agentName: user.agent_name,
          teamId: user.team_id,
          teamName: user.team_name,
          role: user.role,
          email: user.email
        },
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