import React, { useEffect, useRef, useState } from 'react';
import { formatTime, getTimeAgo } from '../utils/dateUtils';
import { markMessageAsRead } from '../services/api';

function MessagePanel({ messages, agentCode, loading = false }) {
  const messagesEndRef = useRef(null);
  const [markingRead, setMarkingRead] = useState(new Set());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMarkAsRead = async (messageId) => {
    if (markingRead.has(messageId)) return;

    setMarkingRead(prev => new Set(prev).add(messageId));

    try {
      await markMessageAsRead(messageId);
      console.log('Message marked as read:', messageId);
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    } finally {
      setMarkingRead(prev => {
        const newSet = new Set(prev);
        newSet.delete(messageId);
        return newSet;
      });
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#f44336',
      normal: '#2196f3',
      low: '#9e9e9e'
    };
    return colors[priority] || colors.normal;
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="message-panel">
      <div className="message-header">
        <h3>
          Messages ({messages.length})
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount} unread</span>
          )}
        </h3>
        
        {messages.length > 0 && (
          <button 
            onClick={scrollToBottom}
            className="scroll-btn"
            title="Scroll to bottom"
          >
            ⬇️
          </button>
        )}
      </div>
      
      <div className="message-list">
        {loading ? (
          <div className="loading-messages">
            <div className="loading-spinner"></div>
            <p>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="no-messages">
            <div className="no-messages-icon">📭</div>
            <p>No messages yet</p>
            <small>Messages from supervisors will appear here</small>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div 
                key={message._id || index}
                className={`message-item ${message.type} ${message.isRead ? 'read' : 'unread'}`}
              >
                <div className="message-top">
                  <div className="message-from">
                    <span className="from-label">From:</span>
                    <strong>{message.fromCode}</strong>
                  </div>
                  <div className="message-priority">
                    <span 
                      className="priority-indicator"
                      style={{ backgroundColor: getPriorityColor(message.priority) }}
                      title={`Priority: ${message.priority}`}
                    >
                      {message.priority === 'high' ? '🔴' : 
                       message.priority === 'low' ? '🔵' : '⚪'}
                    </span>
                  </div>
                </div>
                
                <div className="message-content">
                  {message.content}
                </div>
                
                <div className="message-footer">
                  <div className="message-meta">
                    <span className="message-type">
                      {message.type === 'broadcast' ? '📢 Broadcast' : '💬 Direct'}
                    </span>
                    <span className="message-time">
                      {formatTime(message.timestamp)}
                    </span>
                    <span className="time-ago">
                      {getTimeAgo(message.timestamp)}
                    </span>
                  </div>
                  
                  {!message.isRead && (
                    <button
                      className="mark-read-btn"
                      onClick={() => handleMarkAsRead(message._id)}
                      disabled={markingRead.has(message._id)}
                      title="Mark as read"
                    >
                      {markingRead.has(message._id) ? '⏳' : '✓'}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
}

export default MessagePanel;