const io = require('socket.io-client');

const SOCKET_URL = 'http://localhost:3001';

console.log('🧪 Testing WebSocket Connection...\n');

// Create agent connection
const agentSocket = io(SOCKET_URL);

agentSocket.on('connect', () => {
  console.log('✅ Agent connected:', agentSocket.id);
  
  // Authenticate as agent
  agentSocket.emit('agent_connect', { agentCode: 'AG001' });
});

agentSocket.on('connection_success', (data) => {
  console.log('✅ Agent authenticated:', data);
  
  // Test status update
  console.log('\n📊 Testing status update...');
  agentSocket.emit('update_status', {
    agentCode: 'AG001',
    status: 'Available'
  });
});

agentSocket.on('status_updated', (data) => {
  console.log('✅ Status updated:', data);
});

agentSocket.on('new_message', (message) => {
  console.log('💬 New message received:', message);
});

agentSocket.on('connection_error', (error) => {
  console.error('❌ Connection error:', error);
});

// Create supervisor connection
setTimeout(() => {
  console.log('\n👨‍💼 Creating supervisor connection...');
  const supervisorSocket = io(SOCKET_URL);
  
  supervisorSocket.on('connect', () => {
    console.log('✅ Supervisor connected:', supervisorSocket.id);
    
    supervisorSocket.emit('supervisor_connect', { supervisorCode: 'SP001' });
  });
  
  supervisorSocket.on('connection_success', (data) => {
    console.log('✅ Supervisor authenticated:', data);
    
    // Test sending message
    console.log('\n💬 Testing send message...');
    supervisorSocket.emit('send_message', {
      fromCode: 'SP001',
      toCode: 'AG001',
      content: 'Test message from WebSocket',
      type: 'direct'
    });
  });
  
  supervisorSocket.on('message_sent', (data) => {
    console.log('✅ Message sent:', data);
    
    // Cleanup
    setTimeout(() => {
      console.log('\n🛑 Closing connections...');
      agentSocket.close();
      supervisorSocket.close();
      process.exit(0);
    }, 2000);
  });
  
  supervisorSocket.on('agent_status_update', (data) => {
    console.log('📊 Status update received:', data);
  });
  
}, 2000);