/**
 * Transform agent data from API to UI format
 */
export const transformAgent = (agent, defaultTeamId = null) => {
  if (!agent) return null;

  return {
    agentCode: agent.agent_code || agent.agentCode,
    agentName: agent.agent_name || agent.agentName,
    role: agent.role || 'agent',
    email: agent.email || '',
    phone: agent.phone || '',
    team_id: agent.team_id || agent.teamId || defaultTeamId,
    // UI fields
    currentStatus: agent.currentStatus || 'Offline',
    isOnline: agent.isOnline || false,
    lastUpdate: agent.lastUpdate || new Date(),
    lastSeen: agent.lastSeen || new Date()
  };
};

export const transformAgents = (agents, defaultTeamId = null) => {
  if (!Array.isArray(agents)) return [];
  return agents.map(agent => transformAgent(agent, defaultTeamId)).filter(a => a !== null);
};