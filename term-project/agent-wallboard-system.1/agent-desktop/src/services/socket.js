import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001';
let socket = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const reconnectDelay = 1000; // Start with 1 second

export const connectSocket = (agentCode) => {
  // Disconnect existing socket if any
  if (socket) {
    disconnectSocket();
  }

  console.log('Connecting to WebSocket server...', SOCKET_URL);

  socket = io(SOCKET_URL, {
    query: { 
      agentCode: agentCode.toUpperCase(), 
      type: 'agent' 
    },
    timeout: 20000,
    reconnection: true,
    reconnectionAttempts: maxReconnectAttempts,
    reconnectionDelay: reconnectDelay,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5,
  });

  // Connection event handlers
  socket.on('connect', () => {
    console.log('✅ Connected to WebSocket server');
    reconnectAttempts = 0;
  });

  socket.on('disconnect', (reason) => {
    console.log('❌ Disconnected from WebSocket server:', reason);
    
    if (reason === 'io server disconnect') {
      // Server disconnected the socket, try to reconnect manually
      setTimeout(() => {
        if (socket && !socket.connected) {
          socket.connect();
        }
      }, 1000);
    }
  });

  socket.on('connect_error', (error) => {
    console.error('❌ WebSocket connection error:', error);
    reconnectAttempts++;
    
    if (reconnectAttempts >= maxReconnectAttempts) {
      console.error('❌ Max reconnection attempts reached');
    }
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log('🔄 Reconnected to WebSocket server (attempt:', attemptNumber, ')');
    reconnectAttempts = 0;
  });

  socket.on('reconnect_error', (error) => {
    console.error('❌ WebSocket reconnection error:', error);
  });

  socket.on('reconnect_failed', () => {
    console.error('❌ WebSocket reconnection failed - max attempts reached');
  });

  // Agent-specific event handlers
  socket.on('connection_success', (data) => {
    console.log('✅ Agent connection confirmed:', data);
  });

  socket.on('connection_error', (data) => {
    console.error('❌ Agent connection error:', data);
  });

  // Error handling
  socket.on('error', (error) => {
    console.error('❌ WebSocket error:', error);
  });

  // Store socket globally for access in components
  window.socket = socket;
  
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log('🔌 Disconnecting from WebSocket server...');
    socket.disconnect();
    socket = null;
    window.socket = null;
  }
};

export const sendStatusUpdate = (agentCode, status) => {
  if (socket && socket.connected) {
    console.log('📤 Sending status update:', { agentCode, status });
    socket.emit('update_status', {
      agentCode: agentCode.toUpperCase(),
      status: status
    });
    return true;
  } else {
    console.warn('⚠️ Cannot send status update - socket not connected');
    return false;
  }
};

export const sendMessage = (messageData) => {
  if (socket && socket.connected) {
    console.log('📤 Sending message:', messageData);
    socket.emit('send_message', messageData);
    return true;
  } else {
    console.warn('⚠️ Cannot send message - socket not connected');
    return false;
  }
};

export const getSocketStatus = () => {
  return {
    connected: socket ? socket.connected : false,
    id: socket ? socket.id : null,
    reconnectAttempts: reconnectAttempts
  };
};
