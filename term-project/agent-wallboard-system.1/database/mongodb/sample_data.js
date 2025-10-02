const mongoose = require('mongoose');
const { AgentStatus, Message, ConnectionLog } = require('./collections');

async function insertSampleData() {
  try {
    console.log('🌱 Inserting MongoDB sample data...');

    // Clear existing data
    await AgentStatus.deleteMany({});
    await Message.deleteMany({});
    await ConnectionLog.deleteMany({});

    // Sample Agent Status Data
    const statusData = [
      {
        agentCode: 'AG001',
        status: 'Available',
        sessionId: 'session_001',
        timestamp: new Date('2024-09-22T08:00:00Z')
      },
      {
        agentCode: 'AG002',
        status: 'Busy',
        sessionId: 'session_002',
        timestamp: new Date('2024-09-22T08:15:00Z')
      },
      {
        agentCode: 'AG003',
        status: 'Break',
        sessionId: 'session_003',
        timestamp: new Date('2024-09-22T09:00:00Z')
      },
      {
        agentCode: 'AG004',
        status: 'Available',
        sessionId: 'session_004',
        timestamp: new Date('2024-09-22T08:30:00Z')
      },
      {
        agentCode: 'AG005',
        status: 'Offline',
        sessionId: 'session_005',
        timestamp: new Date('2024-09-22T07:45:00Z')
      }
    ];

    // Sample Messages
    const messageData = [
      {
        fromCode: 'SP001',
        toCode: 'AG001',
        message: 'Please check your queue, there are 3 pending tickets.',
        type: 'direct',
        priority: 'normal',
        timestamp: new Date('2024-09-22T09:15:00Z'),
        isRead: false
      },
      {
        fromCode: 'SP001',
        toCode: 'AG002',
        message: 'Great job on handling the difficult customer!',
        type: 'direct',
        priority: 'low',
        timestamp: new Date('2024-09-22T10:00:00Z'),
        isRead: true,
        readAt: new Date('2024-09-22T10:02:00Z')
      },
      {
        fromCode: 'SP001',
        toCode: null,
        message: 'Team meeting at 2 PM today. Please join the conference room.',
        type: 'broadcast',
        priority: 'high',
        timestamp: new Date('2024-09-22T11:00:00Z'),
        isRead: false
      },
      {
        fromCode: 'SP002',
        toCode: 'AG005',
        message: 'Can you help with the technical issue in ticket #12345?',
        type: 'direct',
        priority: 'urgent',
        timestamp: new Date('2024-09-22T11:30:00Z'),
        isRead: false
      },
      {
        fromCode: 'SP003',
        toCode: null,
        message: 'New sales target for this month has been updated. Check your dashboard.',
        type: 'broadcast',
        priority: 'normal',
        timestamp: new Date('2024-09-22T12:00:00Z'),
        isRead: false
      }
    ];

    // Sample Connection Logs
    const connectionData = [
      {
        agentCode: 'AG001',
        eventType: 'connect',
        timestamp: new Date('2024-09-22T08:00:00Z'),
        ipAddress: '192.168.1.101',
        userAgent: 'Electron Agent App v1.0',
        sessionId: 'session_001'
      },
      {
        agentCode: 'AG002',
        eventType: 'connect',
        timestamp: new Date('2024-09-22T08:15:00Z'),
        ipAddress: '192.168.1.102',
        userAgent: 'Electron Agent App v1.0',
        sessionId: 'session_002'
      },
      {
        agentCode: 'SP001',
        eventType: 'connect',
        timestamp: new Date('2024-09-22T07:45:00Z'),
        ipAddress: '192.168.1.201',
        userAgent: 'Mozilla/5.0 Chrome/118.0.0.0',
        sessionId: 'supervisor_session_001'
      }
    ];

    // Insert data
    await AgentStatus.insertMany(statusData);
    console.log('✅ Agent status data inserted');

    await Message.insertMany(messageData);
    console.log('✅ Message data inserted');

    await ConnectionLog.insertMany(connectionData);
    console.log('✅ Connection log data inserted');

    console.log('🎉 MongoDB sample data insertion completed!');

    // Verify data
    const statusCount = await AgentStatus.countDocuments();
    const messageCount = await Message.countDocuments();
    const logCount = await ConnectionLog.countDocuments();

    console.log(`📊 Verification:
    - Agent Status records: ${statusCount}
    - Message records: ${messageCount}
    - Connection Log records: ${logCount}`);

  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
  }
}

// MongoDB Connection and Setup
async function setupMongoDB() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wallboard';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Insert sample data
    await insertSampleData();
    
    console.log('🚀 MongoDB setup completed successfully!');
  } catch (error) {
    console.error('❌ MongoDB setup failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Export for use in other files
module.exports = {
  setupMongoDB,
  insertSampleData
};

// Run setup if called directly
if (require.main === module) {
  setupMongoDB();
}