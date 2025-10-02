import React from 'react';

function StatusPanel({ currentStatus, onStatusChange, disabled = false }) {
  const statuses = [
    { key: 'Available', label: 'Available', color: '#4CAF50', icon: '✅' },
    { key: 'Busy', label: 'Busy', color: '#FF9800', icon: '🔴' },
    { key: 'Break', label: 'Break', color: '#2196F3', icon: '⏸️' },
    { key: 'Offline', label: 'Offline', color: '#9E9E9E', icon: '⭕' }
  ];

  const handleStatusClick = (statusKey) => {
    if (!disabled && statusKey !== currentStatus) {
      onStatusChange(statusKey);
    }
  };

  return (
    <div className="status-panel">
      <div className="status-header">
        <h3>Status Control</h3>
        <div className="current-status">
          Current: <span 
            className={`status-badge ${currentStatus.toLowerCase()}`}
            style={{ backgroundColor: statuses.find(s => s.key === currentStatus)?.color }}
          >
            {statuses.find(s => s.key === currentStatus)?.icon} {currentStatus}
          </span>
        </div>
      </div>
      
      <div className="status-buttons">
        {statuses.map(status => (
          <button
            key={status.key}
            className={`status-btn ${status.key === currentStatus ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={() => handleStatusClick(status.key)}
            disabled={disabled}
            style={{ 
              backgroundColor: status.color,
              opacity: disabled ? 0.5 : (status.key === currentStatus ? 1 : 0.8)
            }}
            title={disabled ? 'Not connected to server' : `Change status to ${status.label}`}
          >
            <span className="status-icon">{status.icon}</span>
            <span className="status-label">{status.label}</span>
          </button>
        ))}
      </div>
      
      {disabled && (
        <div className="status-warning">
          ⚠️ Not connected to server
        </div>
      )}
    </div>
  );
}

export default StatusPanel;