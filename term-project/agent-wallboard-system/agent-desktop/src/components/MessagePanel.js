import React, { useEffect, useRef, useState } from 'react';
import { formatTime, getTimeAgo } from '../utils/dateUtils';
import { markMessageAsRead } from '../services/api';
import './MessagePanel.css';

function MessagePanel({ messages, agentCode, loading = false }) {
  const messagesEndRef = useRef(null);
  const messageListRef = useRef(null);
  const [markingRead, setMarkingRead] = useState(new Set());
  const [autoScroll, setAutoScroll] = useState(true);
  const [localMessages, setLocalMessages] = useState([]);
  
  // ✅ เพิ่ม state สำหรับ filtering และ pagination
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'broadcast', 'direct'
  const [showAll, setShowAll] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(5);

  // Sync กับ messages prop
  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  const scrollToBottom = (force = false) => {
    if (force || autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (messageListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setAutoScroll(isAtBottom);
    }
  };

  useEffect(() => {
    if (!showAll) {
      scrollToBottom();
    }
  }, [localMessages, showAll]);

  const handleMarkAsRead = async (messageId) => {
    if (markingRead.has(messageId)) return;

    setMarkingRead(prev => new Set(prev).add(messageId));

    // Optimistic update
    setLocalMessages(prev => prev.map(msg => 
      (msg._id === messageId || msg.messageId === messageId)
        ? { ...msg, isRead: true, readAt: new Date() }
        : msg
    ));

    try {
      await markMessageAsRead(messageId);
      console.log('✅ Message marked as read:', messageId);
    } catch (error) {
      console.error('❌ Failed to mark message as read:', error);
      // Rollback
      setLocalMessages(prev => prev.map(msg => 
        (msg._id === messageId || msg.messageId === messageId)
          ? { ...msg, isRead: false, readAt: null }
          : msg
      ));
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

  // ✅ Filter messages
  const filteredMessages = localMessages.filter(msg => {
    if (filter === 'unread') return !msg.isRead;
    if (filter === 'broadcast') return msg.type === 'broadcast';
    if (filter === 'direct') return msg.type === 'direct';
    return true; // 'all'
  });

  // ✅ Limit messages
  const displayedMessages = showAll 
    ? filteredMessages 
    : filteredMessages.slice(-displayLimit);

  const unreadCount = localMessages.filter(m => !m.isRead).length;
  const hiddenCount = filteredMessages.length - displayedMessages.length;

  return (
    <div className="message-panel">
      <div className="message-header">
        <h3>
          Messages ({localMessages.length})
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount} unread</span>
          )}
        </h3>
        
        {localMessages.length > 0 && !showAll && (
          <button 
            onClick={() => scrollToBottom(true)}
            className="scroll-btn"
            title="Scroll to bottom"
          >
            ⬇️
          </button>
        )}
      </div>
      
      {/* ✅ Filter Tabs */}
      <div className="message-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({localMessages.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
        <button 
          className={`filter-btn ${filter === 'broadcast' ? 'active' : ''}`}
          onClick={() => setFilter('broadcast')}
        >
          Broadcast ({localMessages.filter(m => m.type === 'broadcast').length})
        </button>
        <button 
          className={`filter-btn ${filter === 'direct' ? 'active' : ''}`}
          onClick={() => setFilter('direct')}
        >
          Direct ({localMessages.filter(m => m.type === 'direct').length})
        </button>
      </div>

      {/* ✅ Show All Toggle */}
      {filteredMessages.length > displayLimit && (
        <div className="show-all-toggle">
          <button 
            className="toggle-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll 
              ? `Show Latest ${displayLimit}` 
              : `Show All (${hiddenCount} more)`
            }
          </button>
        </div>
      )}
      
      <div 
        className="message-list"
        ref={messageListRef}
        onScroll={handleScroll}
      >
        {loading ? (
          <div className="loading-messages">
            <div className="loading-spinner"></div>
            <p>Loading messages...</p>
          </div>
        ) : displayedMessages.length === 0 ? (
          <div className="no-messages">
            <div className="no-messages-icon">🔭</div>
            <p>
              {filteredMessages.length === 0 
                ? 'No messages yet'
                : `No ${filter} messages`
              }
            </p>
            <small>
              {filter !== 'all' && (
                <button 
                  className="clear-filter-btn"
                  onClick={() => setFilter('all')}
                >
                  Clear filter
                </button>
              )}
            </small>
          </div>
        ) : (
          <>
            {/* ✅ Hidden messages indicator */}
            {!showAll && hiddenCount > 0 && (
              <div className="hidden-indicator">
                {hiddenCount} older messages hidden
              </div>
            )}

            {displayedMessages.map((message, index) => (
              <div 
                key={message._id || message.messageId || index}
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
                      onClick={() => handleMarkAsRead(message._id || message.messageId)}
                      disabled={markingRead.has(message._id || message.messageId)}
                      title="Mark as read"
                    >
                      {markingRead.has(message._id || message.messageId) ? '⏳' : '✓'}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* ✅ Quick actions */}
      {unreadCount > 0 && (
        <div className="message-actions">
          <button 
            className="action-btn"
            onClick={() => {
              // Mark all as read
              displayedMessages.forEach(msg => {
                if (!msg.isRead) {
                  handleMarkAsRead(msg._id || msg.messageId);
                }
              });
            }}
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
}

export default MessagePanel;