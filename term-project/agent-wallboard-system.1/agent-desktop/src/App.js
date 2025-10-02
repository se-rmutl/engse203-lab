import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import StatusPanel from './components/StatusPanel';
import MessagePanel from './components/MessagePanel';
import AgentInfo from './components/AgentInfo';
import { connectSocket, disconnectSocket, sendStatusUpdate } from './services/socket';
import { showDesktopNotification, requestNotificationPermission } from './services/notifications';
import './styles/App.css';
import './styles/components.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agent, setAgent] = useState(null);
  const [status, setStatus] = useState('Offline');
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [error, setError] = useState(null);

  // Request notification permission on app start
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // WebSocket connection management
  useEffect(() => {
    if (isLoggedIn && agent) {
      const socket = connectSocket(agent.agentCode);
      
      if (socket) {
        // Connection status handlers
        socket.on('connect', () => {
          console.log('Connected to server');
          setConnectionStatus('connected');
          setError(null);
        });
        
        socket.on('disconnect', () => {
          console.log('Disconnected from server');
          setConnectionStatus('disconnected');
        });
        
        socket.on('connect_error', (error) => {
          console.error('Connection error:', error);
          setConnectionStatus('error');
          setError('Failed to connect to server');
        });
        
        // Agent-specific event handlers
        socket.on('status_updated', (data) => {
          console.log('Status updated:', data);
          setStatus(data.status);
        });
        
        socket.on('new_message', (message) => {
          console.log('New message received:', message);
          setMessages(prev => [...prev, message]);
          
          // Show notification
          showDesktopNotification(
            `Message from ${message.fromCode}`,
            message.content
          );
        });
        
        socket.on('agent_connected', (data) => {
          console.log('Agent connected:', data);
        });
        
        socket.on('agent_disconnected', (data) => {
          console.log('Agent disconnected:', data);
        });
        
        // Error handlers
        socket.on('error', (error) => {
          console.error('Socket error:', error);
          setError(error.message || 'Socket error occurred');
        });
      }
    }
    
    return () => {
      disconnectSocket();
      setConnectionStatus('disconnected');
    };
  }, [isLoggedIn, agent]);

  // Handle successful login
  const handleLogin = (agentData) => {
    console.log('Login successful:', agentData);
    setAgent(agentData);
    setIsLoggedIn(true);
    setStatus('Available');
    setError(null);
  };

  // Handle logout
  const handleLogout = () => {
    disconnectSocket();
    setIsLoggedIn(false);
    setAgent(null);
    setStatus('Offline');
    setMessages([]);
    setConnectionStatus('disconnected');
    setError(null);
  };

  // Handle status change
  const handleStatusChange = (newStatus) => {
    if (!agent) return;
    
    console.log('Changing status to:', newStatus);
    setStatus(newStatus);
    
    // Send status update via WebSocket
    sendStatusUpdate(agent.agentCode, newStatus);
  };

  // Clear error message
  const clearError = () => {
    setError(null);
  };

  return (
    <div className="app">
      {/* Connection status indicator */}
      <div className={`connection-status ${connectionStatus}`}>
        <div className="status-indicator"></div>
        <span>
          {connectionStatus === 'connected' && 'Connected'}
          {connectionStatus === 'disconnected' && 'Disconnected'}
          {connectionStatus === 'error' && 'Connection Error'}
        </span>
      </div>

      {/* Error message */}
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={clearError} className="error-close">×</button>
        </div>
      )}

      {/* Main content */}
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div className="dashboard">
          <div className="dashboard-header">
            <AgentInfo agent={agent} status={status} />
            <button onClick={handleLogout} className="logout-btn">
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
          />
        </div>
      )}
    </div>
  );
}

export default App;