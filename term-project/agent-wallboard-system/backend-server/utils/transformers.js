/**
 * Data Transformers
 * แปลง database format (snake_case) เป็น API format (camelCase)
 */

/**
 * Transform single agent object from database to API format
 * @param {Object} agent - Agent object from database
 * @returns {Object|null} Transformed agent object
 */
function transformAgent(agent) {
  if (!agent) {
    console.warn('transformAgent: received null/undefined agent');
    return null;
  }
  
  try {
    const transformed = {
      agentCode: agent.agent_code,
      agentName: agent.agent_name,
      teamId: agent.team_id,
      teamName: agent.team_name || null,
      role: agent.role,
      email: agent.email || null,
      phone: agent.phone || null,
      hireDate: agent.hire_date || null,
      isActive: agent.is_active === 1,
      // Default values for UI
      currentStatus: 'Offline',
      isOnline: false,
      lastUpdate: new Date(),
      lastSeen: new Date()
    };
    
    console.log(`Transformed agent: ${agent.agent_code} -> ${transformed.agentCode}`);
    return transformed;
    
  } catch (error) {
    console.error('Error transforming agent:', error);
    return null;
  }
}

/**
 * Transform array of agents
 * @param {Array} agents - Array of agent objects from database
 * @returns {Array} Array of transformed agent objects
 */
function transformAgents(agents) {
  if (!Array.isArray(agents)) {
    console.warn('transformAgents: received non-array input');
    return [];
  }
  
  console.log(`Transforming ${agents.length} agents...`);
  
  const transformed = agents
    .map(transformAgent)
    .filter(agent => agent !== null);
  
  console.log(`Successfully transformed ${transformed.length} agents`);
  
  return transformed;
}

module.exports = {
  transformAgent,
  transformAgents
};