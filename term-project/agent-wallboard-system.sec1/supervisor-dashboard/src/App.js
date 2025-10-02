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
  // ===========================================
  // STATE
  // ===========================================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [supervisor, setSupervisor] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  // ===========================================
  // WEBSOCKET SETUP
  // ===========================================
  useEffect(() => {
    // เชื่อมต่อ WebSocket หลัง login
    if (isLoggedIn && supervisor) {
      console.log('Setting up WebSocket connection...');

      const socket = connectSocket(supervisor.supervisorCode);

      // Event: เชื่อมต่อสำเร็จ
      socket.on('connect', () => {
        console.log('WebSocket connected');
        setSocketConnected(true);
      });

      // Event: ตัดการเชื่อมต่อ
      socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
        setSocketConnected(false);
      });

      // Event: Agent เปลี่ยน status
      socket.on('agent_status_update', (data) => {
        console.log('Agent status update:', data);

        // อัพเดท teamData
        setTeamData(prev => prev.map(agent =>
          agent.agentCode === data.agentCode
            ? {
              ...agent,
              currentStatus: data.status,
              lastUpdate: data.timestamp
            }
            : agent
        ));
      });
/*
      // Event: Agent เชื่อมต่อ (online)
      socket.on('agent_connected', (data) => {
        console.log('Agent connected:', data.agentCode);

        setTeamData(prev => prev.map(agent =>
          agent.agentCode === data.agentCode
            ? {
              ...agent,
              isOnline: true,
              lastSeen: data.timestamp
            }
            : agent
        ));
      });
*/
      /*      
            // Event: Agent ตัดการเชื่อมต่อ (offline)
            socket.on('agent_disconnected', (data) => {
              console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
              console.log('📴 [AGENT DISCONNECTED EVENT]');
              console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
              console.log('Disconnected agent:', data);
              console.log('Agent code:', data.agentCode);
              console.log('Timestamp:', data.timestamp);
              
              setTeamData(prev => prev.map(agent =>
                agent.agentCode === data.agentCode
                  ? { 
                      ...agent, 
                      isOnline: false,
                      lastSeen: data.timestamp 
                    }
                  : agent
              ));
      
              
            });
       */


      // ✅ Event: Agent เชื่อมต่อ (online)
      socket.on('agent_connected', (data) => {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🟢 [AGENT CONNECTED EVENT]');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Data received:', data);
        console.log('Agent code:', data.agentCode);
        console.log('Timestamp:', data.timestamp);
        
        setTeamData(prev => {
          console.log('📊 Current team data:', prev);
          
          const updated = prev.map(agent => {
            if (agent.agentCode === data.agentCode) {
              console.log(`✅ Found agent ${agent.agentCode} - updating to online`);
              return {
                ...agent,
                isOnline: true,
                currentStatus: 'Available',
                lastSeen: data.timestamp,
                lastUpdate: data.timestamp
              };
            }
            return agent;
          });
          
          console.log('📊 Updated team data:', updated);
          return updated;
        });
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      });



      // Event: Agent ตัดการเชื่อมต่อ (offline)
      socket.on('agent_disconnected', (data) => {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📴 [AGENT DISCONNECTED]');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Agent code:', data.agentCode);
        console.log('Timestamp:', data.timestamp);

        setTeamData(prev => {
          console.log('Before update:', prev);

          const updated = prev.map(agent =>
            agent.agentCode === data.agentCode
              ? {
                ...agent,
                isOnline: false,
                currentStatus: 'Offline',
                lastSeen: data.timestamp
              }
              : agent
          );

          console.log('After update:', updated);
          return updated;
        });

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      });

      // Event: ข้อความใหม่
      socket.on('new_message', (message) => {
        console.log('New message:', message);
        setMessages(prev => [...prev, message]);
      });
    }

    // Cleanup: ตัดการเชื่อมต่อเมื่อ unmount หรือ logout
    return () => {

      disconnectSocket();
      setSocketConnected(false);
    };
  }, [isLoggedIn, supervisor]);

  // ===========================================
  // HANDLERS
  // ===========================================

  /**
   * Handle Login Success
   * เรียกจาก LoginForm เมื่อ login สำเร็จ
   */
  const handleLogin = (loginData) => {
    console.log('Login successful:', loginData);

    // เก็บ supervisor info
    setSupervisor({
      supervisorCode: loginData.data.user.agentCode,
      name: loginData.data.user.agentName,
      teamId: loginData.data.user.teamId,
      teamName: loginData.data.user.teamName,
      email: loginData.data.user.email
    });

    // เก็บ team data
    const agents = loginData.data.teamData || [];
    setTeamData(agents.map(agent => ({
      ...agent,
      isOnline: false, // เริ่มต้นเป็น offline
      currentStatus: 'Offline'
    })));

    // เก็บ token
    setToken(loginData.data.token);

    // เปลี่ยน state เป็น logged in
    setIsLoggedIn(true);
  };

  /**
   * Handle Logout
   */
  const handleLogout = () => {
    console.log('Logging out...');

    // ตัดการเชื่อมต่อ WebSocket
    disconnectSocket();

    // Clear state
    setIsLoggedIn(false);
    setSupervisor(null);
    setTeamData([]);
    setMessages([]);
    setSocketConnected(false);
  };

  /**
   * Handle Send Message
   * เรียกจาก Dashboard/MessagePanel
   */
  const handleSendMessage = (messageData) => {
    console.log('Sending message:', messageData);

    // ส่งผ่าน WebSocket
    const socket = window.socket;
    if (socket && socket.connected) {
      socket.emit('send_message', {
        fromCode: supervisor.supervisorCode,
        ...messageData
      });

      // เพิ่มลง messages state เพื่อแสดงใน UI
      setMessages(prev => [...prev, {
        ...messageData,
        fromCode: supervisor.supervisorCode,
        timestamp: new Date(),
        sender: supervisor.name
      }]);
    } else {
      console.error('WebSocket not connected');
    }
  };

  // ===========================================
  // RENDER
  // ===========================================
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ py: 2 }}>
          {!isLoggedIn ? (
            // แสดง Login Form
            <LoginForm onLogin={handleLogin} />
          ) : (
            // แสดง Dashboard
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