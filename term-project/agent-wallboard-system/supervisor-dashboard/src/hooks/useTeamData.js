import { useState } from 'react';

export const useTeamData = (initialData = []) => {
  const [agents, setAgents] = useState(initialData);

  /**
   * Update agent status
   */
  const updateAgentStatus = (agentCode, status, timestamp) => {
    setAgents(prev => prev.map(agent =>
      agent.agentCode === agentCode
        ? { 
            ...agent, 
            currentStatus: status,
            lastUpdate: timestamp 
          }
        : agent
    ));
  };

  /**
   * Set agent online/offline
   */
  const setAgentOnline = (agentCode, isOnline, timestamp) => {
    setAgents(prev => prev.map(agent =>
      agent.agentCode === agentCode
        ? { 
            ...agent, 
            isOnline,
            lastSeen: timestamp 
          }
        : agent
    ));
  };

  /**
   * Reset team data
   */
  const resetTeamData = (newData) => {
    setAgents(newData);
  };

  return {
    agents,
    updateAgentStatus,
    setAgentOnline,
    resetTeamData
  };
};