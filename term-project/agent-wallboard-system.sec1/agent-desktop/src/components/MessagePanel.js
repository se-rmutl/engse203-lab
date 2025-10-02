import React, { useEffect, useRef, useState } from 'react';
import { formatTime, getTimeAgo } from '../utils/dateUtils';
import { markMessageAsRead } from '../services/api';

function MessagePanel({ messages, agentCode, loading = false }) {
  const messagesEndRef = useRef(null);
  const messageListRef = useRef(null);
  const [markingRead, setMarkingRead] = useState(new Set());
  const [autoScroll, setAutoScroll] = useState(true);
  
  // ✅ เพิ่ม local state สำหรับจัดการ read status
  const [localMessages, setLocalMessages] = useState([]);

  // ✅ Sync กับ messages prop
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
    scrollToBottom();
  }, [localMessages]);

  // ✅ แก้ไข handleMarkAsRead
  const handleMarkAsRead = async (messageId) => {
    if (markingRead.has(messageId)) return;

    // เพิ่ม messageId เข้า set
    setMarkingRead(prev => new Set(prev).add(messageId));

    // ✅ อัปเดต UI ทันที (Optimistic Update)
    setLocalMessages(prev => prev.map(msg => 
      (msg._id === messageId || msg.messageId === messageId)
        ? { ...msg, isRead: true, readAt: new Date() }
        : msg
    ));

    try {
      // เรียก API
      await markMessageAsRead(messageId);
      console.log('✅ Message marked as read:', messageId);
      
    } catch (error) {
      console.error('❌ Failed to mark message as read:', error);
      
      // ✅ ถ้า API fail, rollback UI
      setLocalMessages(prev => prev.map(msg => 
        (msg._id === messageId || msg.messageId === messageId)
          ? { ...msg, isRead: false, readAt: null }
          : msg
      ));
      
    } finally {
      // ลบออกจาก set
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

  // ✅ นับจาก localMessages แทน messages prop
  const unreadCount = localMessages.filter(m => !m.isRead).length;

  return (
    <div className="message-panel">
      <div className="message-header">
        <h3>
          Messages ({localMessages.length})
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount} unread</span>
          )}
        </h3>
        
        {localMessages.length > 0 && (
          <button 
            onClick={() => scrollToBottom(true)}
            className="scroll-btn"
            title="Scroll to bottom"
          >
            ⬇️
          </button>
        )}
      </div>
      
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
        ) : localMessages.length === 0 ? (
          <div className="no-messages">
            <div className="no-messages-icon">🔭</div>
            <p>No messages yet</p>
            <small>Messages from supervisors will appear here</small>
          </div>
        ) : (
          <>
            {localMessages.map((message, index) => (
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
    </div>
  );
}

export default MessagePanel;