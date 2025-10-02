import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001';
let socket = null;

export const connectSocket = (agentCode) => {
  if (socket) disconnectSocket();

  console.log('Connecting to WebSocket...', SOCKET_URL);

  socket = io(SOCKET_URL, {
    query: {
      agentCode: agentCode.toUpperCase(),
      type: 'agent'
    },
    timeout: 20000,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000
  });

  socket.on('connect', () => {
    console.log('WebSocket connected:', socket.id);
    socket.emit('agent_connect', { agentCode: agentCode.toUpperCase() });
  });

  socket.on('disconnect', (reason) => {
    console.log('WebSocket disconnected:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error);
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log('WebSocket reconnected after', attemptNumber, 'attempts');
  });

  socket.on('reconnect_error', (error) => {
    console.error('WebSocket reconnection error:', error);
  });

  socket.on('reconnect_failed', () => {
    console.error('WebSocket reconnection failed after all attempts');
  });

  socket.on('connection_error', (error) => {
    console.error('Connection error from server:', error);
  });

  socket.on('status_error', (error) => {
    console.error('Status update error from server:', error);
  });

  socket.on('message_error', (error) => {
    console.error('Message error from server:', error);
  });

  window.socket = socket;
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log('Disconnecting WebSocket...');
    socket.disconnect();
    socket = null;
    window.socket = null;
  }
};

export const sendStatusUpdate = (agentCode, status) => {
  if (socket && socket.connected) {
    console.log('Sending status update via WebSocket:', { agentCode, status });
    socket.emit('update_status', {
      agentCode: agentCode.toUpperCase(),
      status: status
    });
    return true;
  }
  console.warn('Socket not connected, cannot send status update');
  return false;
};

export const isSocketConnected = () => {
  return socket && socket.connected;
};

export const getSocket = () => socket;