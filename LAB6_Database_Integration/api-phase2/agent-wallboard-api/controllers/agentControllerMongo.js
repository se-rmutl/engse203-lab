// controllers/agentControllerMongo.js - MongoDB-based controllers
const AgentMongo = require('../models/AgentMongo');
const { AGENT_STATUS, VALID_STATUS_TRANSITIONS, API_MESSAGES } = require('../utils/constants');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const agentControllerMongo = {
  // GET /api/agents
  getAllAgents: async (req, res) => {
    try {
      const { status, department, isOnline } = req.query;
      console.log('📖 Getting all agents with filters:', { status, department, isOnline });
      
      // Build filter object
      const filter = {};
      if (status) filter.status = status;
      if (department) filter.department = department;
      if (isOnline !== undefined) filter.isOnline = isOnline === 'true';
      
      const agents = await AgentMongo.find(filter)
        .select('-statusHistory') // Exclude history for performance
        .sort({ agentCode: 1 });
      
      console.log(`📋 Retrieved ${agents.length} agents from MongoDB`);
      
      return sendSuccess(res, 'Agents retrieved successfully', agents);
    } catch (error) {
      console.error('Error in getAllAgents:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // GET /api/agents/:id
  getAgentById: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`📖 Getting agent by ID: ${id}`);
      
      const agent = await AgentMongo.findById(id);
      
      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }

      console.log(`✅ Retrieved agent: ${agent.agentCode}`);
      return sendSuccess(res, 'Agent retrieved successfully', agent);
    } catch (error) {
      console.error('Error in getAgentById:', error);
      if (error.name === 'CastError') {
        return sendError(res, 'Invalid agent ID format', 400);
      }
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // POST /api/agents
  createAgent: async (req, res) => {
    try {
      const agentData = req.body;
      console.log('📝 Creating new agent:', agentData);
      
      // Check duplicate agentCode
      const existingAgent = await AgentMongo.findOne({ 
        agentCode: agentData.agentCode 
      });
      
      if (existingAgent) {
        return sendError(res, `Agent code ${agentData.agentCode} already exists`, 409);
      }
      
      // Create new agent
      const newAgent = new AgentMongo(agentData);
      await newAgent.save();
      
      console.log(`✅ Created agent: ${newAgent.agentCode} - ${newAgent.name}`);
      
      // Emit WebSocket event (if io is available)
      if (req.io) {
        req.io.emit('agentCreated', {
          agent: newAgent,
          timestamp: new Date()
        });
      }
      
      return sendSuccess(res, API_MESSAGES.AGENT_CREATED, newAgent, 201);
    } catch (error) {
      console.error('Error in createAgent:', error);
      
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return sendError(res, `${field} already exists`, 409);
      }
      
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));
        return sendError(res, 'Validation failed', 400, validationErrors);
      }
      
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // PUT /api/agents/:id
  updateAgent: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      console.log(`✏️ Updating agent ID: ${id}`, updateData);
      
      // Remove protected fields
      delete updateData.agentCode;
      delete updateData.statusHistory;
      delete updateData.createdAt;
      
      const agent = await AgentMongo.findByIdAndUpdate(
        id, 
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      
      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }
      
      console.log(`✅ Updated agent: ${agent.agentCode}`);
      
      // Emit WebSocket event
      if (req.io) {
        req.io.emit('agentUpdated', {
          agent: agent,
          timestamp: new Date()
        });
      }
      
      return sendSuccess(res, API_MESSAGES.AGENT_UPDATED, agent);
    } catch (error) {
      console.error('Error in updateAgent:', error);
      
      if (error.name === 'CastError') {
        return sendError(res, 'Invalid agent ID format', 400);
      }
      
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));
        return sendError(res, 'Validation failed', 400, validationErrors);
      }
      
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // PATCH /api/agents/:id/status
  updateAgentStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;
      console.log(`🔄 Updating agent status: ${id} -> ${status}`);

      const agent = await AgentMongo.findById(id);
      
      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }

      // Validate status
      if (!Object.values(AGENT_STATUS).includes(status)) {
        return sendError(res, 
          `Invalid status. Valid statuses: ${Object.values(AGENT_STATUS).join(', ')}`, 
          400
        );
      }

      // Validate transition
      const currentStatus = agent.status;
      const validTransitions = VALID_STATUS_TRANSITIONS[currentStatus];

      if (!validTransitions.includes(status)) {
        return sendError(res, 
          `Cannot change from ${currentStatus} to ${status}. Valid transitions: ${validTransitions.join(', ')}`, 
          400
        );
      }

      // Update status using instance method
      await agent.updateStatus(status, reason);
      
      console.log(`✅ Agent ${agent.agentCode} status updated to ${status}`);
      
      // Emit real-time WebSocket event
      if (req.io) {
        req.io.emit('agentStatusChanged', {
          agentId: agent._id,
          agentCode: agent.agentCode,
          previousStatus: currentStatus,
          newStatus: status,
          reason: reason,
          timestamp: new Date(),
          agent: {
            id: agent._id,
            agentCode: agent.agentCode,
            name: agent.name,
            status: agent.status
          }
        });
      }
      
      return sendSuccess(res, API_MESSAGES.STATUS_UPDATED, agent);
    } catch (error) {
      console.error('Error in updateAgentStatus:', error);
      
      if (error.name === 'CastError') {
        return sendError(res, 'Invalid agent ID format', 400);
      }
      
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // DELETE /api/agents/:id
  deleteAgent: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`🗑️ Deleting agent ID: ${id}`);
      
      const agent = await AgentMongo.findByIdAndDelete(id);
      
      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }
      
      console.log(`✅ Deleted agent: ${agent.agentCode} - ${agent.name}`);
      
      // Emit WebSocket event
      if (req.io) {
        req.io.emit('agentDeleted', {
          agentId: agent._id,
          agentCode: agent.agentCode,
          timestamp: new Date()
        });
      }
      
      return sendSuccess(res, API_MESSAGES.AGENT_DELETED);
    } catch (error) {
      console.error('Error in deleteAgent:', error);
      
      if (error.name === 'CastError') {
        return sendError(res, 'Invalid agent ID format', 400);
      }
      
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // GET /api/agents/status/summary
  getStatusSummary: async (req, res) => {
    try {
      console.log('📊 Getting status summary from MongoDB');
      
      const totalAgents = await AgentMongo.countDocuments({ isActive: true });
      
      // Aggregate status counts
      const statusCounts = await AgentMongo.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      
      // Convert to object
      const statusCountsObj = {};
      Object.values(AGENT_STATUS).forEach(status => {
        statusCountsObj[status] = 0;
      });
      
      statusCounts.forEach(item => {
        statusCountsObj[item._id] = item.count;
      });

      const statusPercentages = {};
      Object.entries(statusCountsObj).forEach(([status, count]) => {
        statusPercentages[status] = totalAgents > 0 ? Math.round((count / totalAgents) * 100) : 0;
      });
      
      // Online agents count
      const onlineAgents = await AgentMongo.countDocuments({ 
        isActive: true, 
        isOnline: true 
      });

      const summary = {
        totalAgents,
        onlineAgents,
        offlineAgents: totalAgents - onlineAgents,
        statusCounts: statusCountsObj,
        statusPercentages,
        lastUpdated: new Date().toISOString()
      };

      return sendSuccess(res, 'Status summary retrieved successfully', summary);
    } catch (error) {
      console.error('Error in getStatusSummary:', error);
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  },

  // GET /api/agents/:id/history
  getAgentStatusHistory: async (req, res) => {
    try {
      const { id } = req.params;
      const { limit = 50, page = 1 } = req.query;
      
      console.log(`📊 Getting status history for agent: ${id}`);
      
      const agent = await AgentMongo.findById(id)
        .select('agentCode name statusHistory');
      
      if (!agent) {
        return sendError(res, API_MESSAGES.AGENT_NOT_FOUND, 404);
      }
      
      // Paginate status history
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      
      const sortedHistory = agent.statusHistory
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(startIndex, endIndex);
      
      const response = {
        agent: {
          id: agent._id,
          agentCode: agent.agentCode,
          name: agent.name
        },
        history: sortedHistory,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: agent.statusHistory.length,
          hasMore: endIndex < agent.statusHistory.length
        }
      };
      
      return sendSuccess(res, 'Status history retrieved successfully', response);
    } catch (error) {
      console.error('Error in getAgentStatusHistory:', error);
      
      if (error.name === 'CastError') {
        return sendError(res, 'Invalid agent ID format', 400);
      }
      
      return sendError(res, API_MESSAGES.INTERNAL_ERROR, 500);
    }
  }
};

module.exports = agentControllerMongo;