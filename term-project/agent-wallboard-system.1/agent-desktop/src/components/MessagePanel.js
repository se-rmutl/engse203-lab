import React, { useEffect, useRef } from 'react';
import { formatTime, getTimeAgo } from '../utils/dateUtils';

function MessagePanel({ messages, agentCode }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMessageTypeIcon = (type) => {
    return type === 'broadcast' ? '📢' : '💬';
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      high: '🔴',
      normal: '🔵',
      low: '⚪'
    };
    return icons[priority] || icons.normal;
  };

  const renderMessage = (message, index) => {
    const isToMe = message.toCode === agentCode;
    const isBroadcast = message.type === 'broadcast';
    
    return (
      <div 
        key={index} 
        className={`message-item ${message.priority} ${isBroadcast ? 'broadcast' : 'direct'}`}
      >
        <div className="message-header">
          <div className="message-meta">
            <span className="message-type">
              {getMessageTypeIcon(message.type)}
            </span>
            <span className="sender">
              From: <strong>{message.fromCode}</strong>
            </span>
            {message.priority !== 'normal' && (
              <span className="priority">
                {getPriorityIcon(message.priority)} {message.priority.toUpperCase()}
              </span>
            )}
          </div>
          
          <div className="message-time">
            <span className="time" title={new Date(message.timestamp).toLocaleString()}>
              {formatTime(message.timestamp)}
            </span>
            <span className="time-ago">
              {getTimeAgo(message.timestamp)}
            </span>
          </div>
        </div>
        
        <div className="message-content">
          {message.content}
        </div>
        
        <div className="message-footer">
          {isBroadcast ? (
            <span className="broadcast-info">📢 Broadcast to all team members</span>
          ) : (
            <span className="direct-info">💬 Direct message to you</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="message-panel">
      <div className="message-header">
        <h3>
          Messages 
          <span className="message-count">({messages.length})</span>
        </h3>
        
        {messages.length > 0 && (
          <button 
            onClick={scrollToBottom}
            className="scroll-to-bottom"
            title="Scroll to bottom"
          >
            ⬇️
          </button>
        )}
      </div>
      
      <div className="message-list">
        {messages.length === 0 ? (
          <div className="no-messages">
            <div className="no-messages-icon">📭</div>
            <p>No messages yet</p>
            <small>Messages from supervisors will appear here</small>
          </div>
        ) : (
          <>
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
}

export default MessagePanel;