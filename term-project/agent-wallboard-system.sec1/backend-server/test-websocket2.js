const io = require('socket.io-client');

const SOCKET_URL = 'http://localhost:3001';

console.log('🧪 Testing WebSocket Connection...\n');

// --- Client 1: Agent ---
const agentSocket = io(SOCKET_URL);

agentSocket.on('connect', () => {
  console.log('✅ Agent connected:', agentSocket.id);
  agentSocket.emit('agent_connect', { agentCode: 'AG001' });
});

agentSocket.on('connection_success', (data) => {
  console.log('✅ Agent authenticated:', data);

  // Agent ส่งอัปเดตสถานะ (นี่คือจุดที่ trigger notification)
  console.log('\n📊 Agent sending status update...');
  agentSocket.emit('update_status', {
    agentCode: 'AG001',
    status: 'Available'
  });
});

// --- Client 2: Supervisor ---
setTimeout(() => {
  console.log('\n👨‍💼 Creating supervisor connection...');
  const supervisorSocket = io(SOCKET_URL);

  supervisorSocket.on('connect', () => {
    console.log('✅ Supervisor connected:', supervisorSocket.id);
    supervisorSocket.emit('supervisor_connect', { supervisorCode: 'SP001' });
  });

  // Supervisor รอรับ notification
  supervisorSocket.on('agent_status_update', (data) => {
    console.log('🎉 SUCCESS! Supervisor received notification:', data);

    // Cleanup
    setTimeout(() => {
      console.log('\n🛑 Closing connections...');
      agentSocket.close();
      supervisorSocket.close();
      process.exit(0);
    }, 1000);
  });

}, 2000); // หน่วงเวลาเพื่อให้ agent เชื่อมต่อเสร็จก่อน