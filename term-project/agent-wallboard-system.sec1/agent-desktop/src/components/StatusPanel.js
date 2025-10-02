import React from 'react';

function StatusPanel({ currentStatus, onStatusChange, disabled = false }) {
  const statuses = [
    { key: 'Available', label: 'Available', color: '#4CAF50', icon: '✓' },
    { key: 'Busy', label: 'Busy', color: '#FF9800', icon: '⏱' },
    { key: 'Break', label: 'Break', color: '#2196F3', icon: '☕' },
    { key: 'Offline', label: 'Offline', color: '#9E9E9E', icon: '⏸' }
  ];

  return (
    <div className="status-panel">
      <div className="status-header">
        <h3>Status Control</h3>
        <div className="current-status">
          Current: <span className="status-badge" style={{ 
            backgroundColor: statuses.find(s => s.key === currentStatus)?.color 
          }}>
            {currentStatus}
          </span>
        </div>
      </div>
      
      <div className="status-buttons">
        {statuses.map(status => (
          <button
            key={status.key}
            className={`status-btn ${status.key === currentStatus ? 'active' : ''}`}
            onClick={() => onStatusChange(status.key)}
            disabled={disabled}
            style={{ 
              backgroundColor: status.color,
              opacity: disabled ? 0.5 : (status.key === currentStatus ? 1 : 0.8)
            }}
          >
            <span className="status-icon">{status.icon}</span>
            <span className="status-label">{status.label}</span>
          </button>
        ))}
      </div>
      
      {disabled && (
        <div className="status-warning">
          ⚠️ Not connected to server - Status updates unavailable
        </div>
      )}
    </div>
  );
}

export default StatusPanel;