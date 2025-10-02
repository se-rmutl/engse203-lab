// ========== DEPENDENCIES ==========
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
require('dotenv').config();

// ========== IMPORTS ==========
// Import route handlers
const authRoutes = require('./routes/auth');
const agentRoutes = require('./routes/agents');
const messageRoutes = require('./routes/messages');

// Import WebSocket handler
const socketHandler = require('./socket/socketHandler');

// Import database configuration
const { connectMongoDB, initSQLite } = require('./config/database');

// ========== EXPRESS APP SETUP ==========
const app = express();
const server = http.createServer(app);

// ========== MIDDLEWARE SETUP ==========
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== ROUTES SETUP ==========
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/messages', messageRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ========== WEBSOCKET SETUP ==========
const io = socketio(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST']
  }
});

// Initialize WebSocket handler
socketHandler(io);

// ========== DATABASE INITIALIZATION ==========
async function initializeDatabases() {
  try {
    await initSQLite();
    console.log('✅ SQLite database initialized');
    
    await connectMongoDB();
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// ========== SERVER START ==========
const PORT = process.env.PORT || 3001;

initializeDatabases().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Backend server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`⚡ WebSocket server ready`);
  });
});

module.exports = app;