import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import { connectSocket, disconnectSocket } from './services/socket';
import { setToken } from './services/auth';
import theme from './theme/theme';
import './App.css';

function App() {
  // STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [supervisor, setSupervisor] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  // WEBSOCKET SETUP
  useEffect(() => {
    if (isLoggedIn && supervisor) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔌 Setting up WebSocket connection...');
      console.log('Supervisor:', supervisor.supervisorCode);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      const socket = connectSocket(supervisor.supervisorCode);
      
      // Event: เชื่อมต่อสำเร็จ
      socket.on('connect', () => {
        console.log('✅ WebSocket connected');
        setSocketConnected(true);
      });
      
      // Event: ตัดการเชื่อมต่อ
      socket.on('disconnect', () => {
        console.log('⚠️  WebSocket disconnected');
        setSocketConnected(false);
      });
      
      // Event: Agent เชื่อมต่อ (online)
      socket.on('agent_connected', (data) => {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🟢 [AGENT CONNECTED]');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Agent code:', data.agentCode);
        console.log('Timestamp:', data.timestamp);
        
        setTeamData(prev => {
          console.log('Before update:', prev.map(a => ({ 
            code: a.agentCode, 
            online: a.isOnline 
          })));
          
          const updated = prev.map(agent =>
            agent.agentCode === data.agentCode
              ? { 
                  ...agent, 
                  isOnline: true,
                  currentStatus: 'Available',
                  lastSeen: data.timestamp,
                  lastUpdate: data.timestamp
                }
              : agent
          );
          
          console.log('After update:', updated.map(a => ({ 
            code: a.agentCode, 
            online: a.isOnline 
          })));
          
          return updated;
        });
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      });
      
      // Event: Agent ตัดการเชื่อมต่อ (offline)
      socket.on('agent_disconnected', (data) => {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🔴 [AGENT DISCONNECTED]');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Agent code:', data.agentCode);
        
        setTeamData(prev => prev.map(agent =>
          agent.agentCode === data.agentCode
            ? { 
                ...agent, 
                isOnline: false,
                currentStatus: 'Offline',
                lastSeen: data.timestamp 
              }
            : agent
        ));
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      });
      
      // Event: Agent เปลี่ยน status
      socket.on('agent_status_update', (data) => {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📊 [STATUS UPDATE]');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Agent:', data.agentCode);
        console.log('Status:', data.status);
        
        setTeamData(prev => prev.map(agent => 
          agent.agentCode === data.agentCode
            ? { 
                ...agent, 
                currentStatus: data.status,
                lastUpdate: data.timestamp 
              }
            : agent
        ));
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      });
      
      // Event: ข้อความใหม่
      socket.on('new_message', (message) => {
        console.log('💬 New message:', message);
        setMessages(prev => [...prev, message]);
      });
      
      // Cleanup
      return () => {
        console.log('🧹 Cleaning up WebSocket...');
        socket.off('connect');
        socket.off('disconnect');
        socket.off('agent_connected');
        socket.off('agent_disconnected');
        socket.off('agent_status_update');
        socket.off('new_message');
        
        disconnectSocket();
        setSocketConnected(false);
      };
    }
  }, [isLoggedIn, supervisor]);

  // HANDLERS
  const handleLogin = (loginData) => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Login successful');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const supervisorData = {
      supervisorCode: loginData.data.user.agentCode,
      name: loginData.data.user.agentName,
      teamId: loginData.data.user.teamId,
      teamName: loginData.data.user.teamName,
      email: loginData.data.user.email
    };
    
    console.log('Supervisor:', supervisorData);
    
    const rawTeamData = loginData.data.teamData || [];
    console.log('Team data count:', rawTeamData.length);
    
    setSupervisor(supervisorData);
    setTeamData(rawTeamData);
    setToken(loginData.data.token);
    setIsLoggedIn(true);
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  };
  
  const handleLogout = () => {
    console.log('Logging out...');
    
    disconnectSocket();
    
    setIsLoggedIn(false);
    setSupervisor(null);
    setTeamData([]);
    setMessages([]);
    setSocketConnected(false);
  };
  
  const handleSendMessage = (messageData) => {
    console.log('Sending message:', messageData);
    
    const socket = window.socket;
    if (socket && socket.connected) {
      socket.emit('send_message', {
        fromCode: supervisor.supervisorCode,
        ...messageData
      });
      
      setMessages(prev => [...prev, {
        ...messageData,
        fromCode: supervisor.supervisorCode,
        timestamp: new Date()
      }]);
    }
  };

  // RENDER
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ py: 2 }}>
          {!isLoggedIn ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <Dashboard
              supervisor={supervisor}
              teamData={teamData}
              messages={messages}
              socketConnected={socketConnected}
              onSendMessage={handleSendMessage}
              onLogout={handleLogout}
            />
          )}
        </Container>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;