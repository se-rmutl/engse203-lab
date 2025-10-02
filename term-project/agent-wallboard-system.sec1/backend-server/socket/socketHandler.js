const Message = require('../models/Message');
const Status = require('../models/Status');

// Track active connections
const activeConnections = new Map(); // agentCode -> socketId
const supervisorConnections = new Map(); // supervisorCode -> socketId

function socketHandler(io) {
  console.log('⚡ WebSocket server initialized');

    // ✅ เพิ่ม heartbeat check
  const heartbeatInterval = setInterval(() => {
    const now = Date.now();
    
    activeConnections.forEach((socketId, agentCode) => {
      const socket = io.sockets.sockets.get(socketId);
      
      if (!socket || !socket.connected) {
        console.log(`💔 Heartbeat: Agent ${agentCode} no longer connected`);
        
        // ลบและ broadcast
        activeConnections.delete(agentCode);
        
        io.emit('agent_disconnected', {
          agentCode: agentCode,
          timestamp: new Date(),
          reason: 'heartbeat_timeout'
        });
      }
    });
  }, 30000); // ตรวจทุก 30 วินาที

  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    /**
     * Agent Connection
     */
    socket.on('agent_connect', (data) => {
      try {
        const { agentCode } = data;

        if (!agentCode) {
          socket.emit('connection_error', { message: 'Agent code required' });
          return;
        }

        const cleanCode = agentCode.toUpperCase();

        // Store connection
        activeConnections.set(cleanCode, socket.id);
        socket.agentCode = cleanCode;
        socket.userType = 'agent';

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Agent ${cleanCode} connected`);
        console.log(`   Socket ID: ${socket.id}`);
        console.log(`   Total active: ${activeConnections.size}`);

    // ✅ สร้าง payload
    const connectPayload = {
      agentCode: cleanCode,
      timestamp: new Date()
    };
    
    console.log('📤 Broadcasting agent_connected:', connectPayload);
    
    // ✅ Broadcast ไปยัง supervisors
    socket.broadcast.emit('agent_connected', connectPayload);
    
    // ✅ ส่งไปยัง supervisors โดยตรง
    supervisorConnections.forEach((supervisorSocketId, supervisorCode) => {
      io.to(supervisorSocketId).emit('agent_connected', connectPayload);
      console.log(`  → Sent to supervisor ${supervisorCode}`);
    });
    
    // Confirm to agent
    socket.emit('connection_success', {
      agentCode: cleanCode,
      status: 'connected'
    });
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

/*
        // Notify supervisors
        socket.broadcast.emit('agent_connected', {
          agentCode: cleanCode,
          timestamp: new Date()
        });

        socket.emit('connection_success', {
          agentCode: cleanCode,
          status: 'connected'
        });
*/
      } catch (error) {
        console.error('Agent connect error:', error);
        socket.emit('connection_error', { message: 'Connection failed' });
      }
    });

    /**
     * Supervisor Connection
     */
    socket.on('supervisor_connect', (data) => {
      try {
        const { supervisorCode } = data;

        if (!supervisorCode) {
          socket.emit('connection_error', { message: 'Supervisor code required' });
          return;
        }

        const cleanCode = supervisorCode.toUpperCase();

        // Store connection
        supervisorConnections.set(cleanCode, socket.id);
        socket.supervisorCode = cleanCode;
        socket.userType = 'supervisor';

        console.log(`👨‍💼 Supervisor ${cleanCode} connected`);

        socket.emit('connection_success', {
          supervisorCode: cleanCode,
          status: 'connected'
        });

      } catch (error) {
        console.error('Supervisor connect error:', error);
        socket.emit('connection_error', { message: 'Connection failed' });
      }
    });

    /**
     * Status Update
     */
    socket.on('update_status', async (data) => {
      try {
        const { agentCode, status } = data;

        if (!agentCode || !status) {
          socket.emit('status_error', { message: 'agentCode and status required' });
          return;
        }

        // Save to MongoDB
        const statusUpdate = await Status.create({
          agentCode: agentCode.toUpperCase(),
          status: status,
          timestamp: new Date()
        });

        // Broadcast to all supervisors
        socket.broadcast.emit('agent_status_update', {
          agentCode: agentCode.toUpperCase(),
          status: status,
          timestamp: statusUpdate.timestamp
        });

        // Confirm to agent
        socket.emit('status_updated', {
          agentCode: agentCode.toUpperCase(),
          status: status,
          timestamp: statusUpdate.timestamp
        });

        console.log(`📊 ${agentCode} status: ${status}`);

      } catch (error) {
        console.error('Status update error:', error);
        socket.emit('status_error', { message: 'Failed to update status' });
      }
    });

    /**
     * Send Message
     */
    socket.on('send_message', async (data) => {
      try {
        const { fromCode, toCode, toTeamId, content, type } = data;

        // Save to MongoDB
        const messageData = {
          fromCode: fromCode.toUpperCase(),
          content: content,
          type: type || 'direct',
          timestamp: new Date(),
          isRead: false
        };

        if (type === 'direct' && toCode) {
          messageData.toCode = toCode.toUpperCase();
        } else if (type === 'broadcast' && toTeamId) {
          messageData.toTeamId = parseInt(toTeamId);
        }

        const message = await Message.create(messageData);

        // Send to recipient(s)
        if (type === 'direct' && toCode) {
          const targetSocketId = activeConnections.get(toCode.toUpperCase());

          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('📤 [SENDING MESSAGE]');
          console.log('To:', toCode);
          console.log('Socket ID:', targetSocketId);
          console.log('Socket connected?', targetSocketId ? 'YES' : 'NO');

          if (targetSocketId) {
            const messagePayload = {
              _id: message._id.toString(),
              messageId: message._id.toString(),
              fromCode: message.fromCode,
              content: message.content,
              timestamp: message.timestamp,
              type: 'direct',
              priority: message.priority,
              isRead: false
            };

            console.log('Message payload:', JSON.stringify(messagePayload, null, 2));

            io.to(targetSocketId).emit('new_message', messagePayload);

            console.log('✅ Message emitted to socket');
          } else {
            console.error('❌ Socket not found for agent:', toCode);
          }
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        } else if (type === 'broadcast') {
          socket.broadcast.emit('new_message', {
            messageId: message._id,
            fromCode: message.fromCode,
            content: message.content,
            timestamp: message.timestamp,
            type: 'broadcast',
            toTeamId: toTeamId
          });
        }

        // Confirm to sender
        socket.emit('message_sent', {
          messageId: message._id,
          status: 'delivered'
        });

        console.log(`💬 Message from ${fromCode} (${type})`);

      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('message_error', { message: 'Failed to send message' });
      }
    });

    /**
     * Disconnect
     */
  
    socket.on('disconnect', () => {
      try {
        console.log(`🔌 Client disconnected: ${socket.id}`);

        if (socket.agentCode) {
          activeConnections.delete(socket.agentCode);

          socket.broadcast.emit('agent_disconnected', {
            agentCode: socket.agentCode,
            timestamp: new Date()
          });

          console.log(`👤 Agent ${socket.agentCode} disconnected`);
        }

        if (socket.supervisorCode) {
          supervisorConnections.delete(socket.supervisorCode);
          console.log(`👨‍💼 Supervisor ${socket.supervisorCode} disconnected`);
        }

      } catch (error) {
        console.error('Disconnect error:', error);
      }
    });

  });
}

module.exports = socketHandler;