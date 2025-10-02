import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoginForm from './components/LoginForm';
import AgentInfo from './components/AgentInfo';
import StatusPanel from './components/StatusPanel';
import MessagePanel from './components/MessagePanel';
import {
  setAuthToken,
  getMessages,
  updateAgentStatus,
  logoutAgent
} from './services/api';
import {
  connectSocket,
  disconnectSocket,
  sendStatusUpdate
} from './services/socket';
import {
  showDesktopNotification,
  requestNotificationPermission
} from './services/notifications';
import logger from './utils/logger';
import './styles/App.css';
import './styles/components.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agent, setAgent] = useState(null);
  const [status, setStatus] = useState('Offline');
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [error, setError] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Refs to prevent stale closures
  const socketRef = useRef(null);
  const isLoggedInRef = useRef(false);

  // Update refs when state changes
  useEffect(() => {
    isLoggedInRef.current = isLoggedIn;
  }, [isLoggedIn]);

  // Request notification permission on start
  useEffect(() => {
    requestNotificationPermission();
    logger.info('App initialized');
  }, []);

  // Load existing messages
  const loadMessages = useCallback(async (agentCode) => {
    setLoadingMessages(true);
    try {
      logger.log('Loading existing messages for', agentCode);
      const messagesData = await getMessages(agentCode, 50);

      if (messagesData.success) {
        const messageList = messagesData.messages || [];
        logger.log('Loaded', messageList.length, 'messages');
        setMessages(messageList);
      }
    } catch (error) {
      logger.error('Failed to load messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  // WebSocket connection management with proper cleanup
  useEffect(() => {
    if (!isLoggedIn || !agent) {
      return;
    }

    logger.log('Setting up WebSocket connection for', agent.agentCode);
    const socket = connectSocket(agent.agentCode);
    socketRef.current = socket;

    if (!socket) {
      logger.error('Failed to create socket connection');
      return;
    }

    // Define all event handlers
    const handlers = {
      connect: () => {
        logger.log('WebSocket connected');
        setConnectionStatus('connected');
        setError(null);
      },

      disconnect: (reason) => {
        logger.log('WebSocket disconnected:', reason);
        setConnectionStatus('disconnected');
      },

      connect_error: (error) => {
        logger.error('WebSocket connection error:', error);
        setConnectionStatus('error');
        setError('Failed to connect to server');
      },

      reconnect: (attemptNumber) => {
        logger.log('WebSocket reconnected after', attemptNumber, 'attempts');
        setConnectionStatus('connected');
        setError(null);
      },

      connection_success: (data) => {
        logger.log('WebSocket authentication successful:', data);
      },

      connection_error: (error) => {
        logger.error('Connection error from server:', error);
        setError(error.message || 'Connection error');
      },

      status_updated: (data) => {
        logger.log('Status updated:', data);
        setStatus(data.status);
      },

      status_error: (error) => {
        logger.error('Status error from server:', error);
        setError(error.message || 'Status update failed');
      },
      /*  
            new_message: (message) => {
              logger.log('New message received:', message);
              
              // Only add message if still logged in
              if (isLoggedInRef.current) {
                setMessages(prev => [message, ...prev]);
                showDesktopNotification(
                  `Message from ${message.fromCode}`,
                  message.content
                );
              }
            },
      */
      new_message: (message) => {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📨 [NEW MESSAGE EVENT RECEIVED]');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Message data:', JSON.stringify(message, null, 2));
        console.log('isLoggedInRef.current:', isLoggedInRef.current);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        // Validate message structure
        if (!message || !message.content) {
          console.error('❌ Invalid message structure');
          return;
        }

        // Check if logged in
        if (!isLoggedInRef.current) {
          console.error('❌ User not logged in');
          return;
        }

        // Add to state
        console.log('📝 Adding message to state...');
        setMessages(prev => {
          const isDuplicate = prev.some(m =>
            m._id === message._id ||
            m.messageId === message.messageId
          );

          if (isDuplicate) {
            console.warn('⚠️ Duplicate message, skipping');
            return prev;
          }

          console.log('✅ Message added to state');
          return [message, ...prev];
        });

        // Show notification
        console.log('🔔 Calling showDesktopNotification...');
        const notificationTitle = message.type === 'broadcast'
          ? `Broadcast from ${message.fromCode}`
          : `Message from ${message.fromCode}`;

        showDesktopNotification(notificationTitle, message.content)
          .then(result => {
            console.log('✅ Notification promise resolved:', result);
          })
          .catch(error => {
            console.error('❌ Notification promise rejected:', error);
          });

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      },

      message_sent: (data) => {
        logger.log('Message sent confirmation:', data);
      },

      message_error: (error) => {
        logger.error('Message error from server:', error);
      },

      agent_connected: (data) => {
        logger.log('Agent connected:', data);
      },

      agent_disconnected: (data) => {
        logger.log('Agent disconnected:', data);
      }
    };

    // Register all event handlers
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    // Cleanup function - CRITICAL for preventing memory leaks
    return () => {
      logger.log('Cleaning up WebSocket connection');

      // Remove all event listeners
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });

      // Disconnect socket
      disconnectSocket();
      socketRef.current = null;
      setConnectionStatus('disconnected');
    };
  }, [isLoggedIn, agent]); // Dependencies are correct

  /**
   * Handle successful login
   */
  const handleLogin = useCallback(async (agentData, token) => {
    logger.log('Login successful:', agentData);

    // Set authentication token
    setAuthToken(token);

    // Set agent data and login state
    setAgent(agentData);
    setIsLoggedIn(true);
    setStatus('Available');
    setError(null);

    // Load existing messages
    await loadMessages(agentData.agentCode);
  }, [loadMessages]);

  /**
   * Handle logout with cleanup
   */
  const handleLogout = useCallback(async () => {
    logger.log('Logging out');

    try {
      // Call logout API
      await logoutAgent();
    } catch (error) {
      logger.error('Logout API call failed:', error);
    }

    // Disconnect WebSocket (cleanup in useEffect will handle listener removal)
    disconnectSocket();

    // Reset all state
    setIsLoggedIn(false);
    setAgent(null);
    setStatus('Offline');
    setMessages([]);
    setConnectionStatus('disconnected');
    setError(null);
    setLoadingMessages(false);
  }, []);

  /**
   * Handle status change with fallback mechanism
   */
  const handleStatusChange = useCallback(async (newStatus) => {
    if (!agent) return;

    logger.log('Changing status to:', newStatus);

    // Optimistically update UI
    const previousStatus = status;
    setStatus(newStatus);

    try {
      // Method 1: Try WebSocket first (real-time)
      const socketSuccess = sendStatusUpdate(agent.agentCode, newStatus);

      if (socketSuccess) {
        logger.log('Status update sent via WebSocket');
      } else {
        // Method 2: Fallback to HTTP API
        logger.log('WebSocket not connected, using HTTP API fallback');
        await updateAgentStatus(agent.agentCode, newStatus);
        logger.log('Status updated via HTTP API');
      }
    } catch (error) {
      logger.error('Status update failed:', error);

      // Revert to previous status on error
      setStatus(previousStatus);
      setError('Failed to update status. Please try again.');

      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  }, [agent, status]);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="app">
      {/* Connection Status Bar */}
      <div className={`connection-status ${connectionStatus}`}>
        <div className="status-indicator"></div>
        <span>
          {connectionStatus === 'connected' && 'Connected'}
          {connectionStatus === 'disconnected' && 'Disconnected'}
          {connectionStatus === 'error' && 'Connection Error'}
        </span>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={clearError} className="error-close" aria-label="Close error">
            ×
          </button>
        </div>
      )}

      {/* Main Content */}
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div className="dashboard">
          <div className="dashboard-header">
            <AgentInfo agent={agent} status={status} />
            <button
              onClick={handleLogout}
              className="logout-btn"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>

          <StatusPanel
            currentStatus={status}
            onStatusChange={handleStatusChange}
            disabled={connectionStatus !== 'connected'}
          />

          <MessagePanel
            messages={messages}
            agentCode={agent?.agentCode}
            loading={loadingMessages}
          />
        </div>
      )}
    </div>
  );
}

export default App;