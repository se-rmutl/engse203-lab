import React from 'react';

function AgentInfo({ agent, status }) {
  if (!agent) return null;

  const getStatusColor = (status) => {
    const colors = {
      Available: '#4CAF50',
      Busy: '#FF9800',
      Break: '#2196F3',
      Offline: '#9E9E9E'
    };
    return colors[status] || colors.Offline;
  };

  const getStatusIcon = (status) => {
    const icons = {
      Available: '✅',
      Busy: '🔴',
      Break: '⏸️',
      Offline: '⭕'
    };
    return icons[status] || icons.Offline;
  };

  return (
    <div className="agent-info">
      <div className="agent-avatar">
        <span className="avatar-icon">👤</span>
      </div>
      
      <div className="agent-details">
        <h3 className="agent-name">
          {agent.firstName} {agent.lastName}
        </h3>
        
        <div className="agent-meta">
          <div className="agent-code">
            <span className="label">Code:</span>
            <span className="value">{agent.agentCode}</span>
          </div>
          
          <div className="agent-team">
            <span className="label">Team:</span>
            <span className="value">{agent.teamName || 'N/A'}</span>
          </div>
        </div>
        
        <div className="agent-status">
          <span className="status-icon">{getStatusIcon(status)}</span>
          <span 
            className="status-text"
            style={{ color: getStatusColor(status) }}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AgentInfo;