const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import configurations
const { initSQLite, connectMongoDB } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const agentRoutes = require('./routes/agents');
const messageRoutes = require('./routes/messages');

// Import socket handler
const socketHandler = require('./socket/socketHandler');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Initialize Express
const app = express();
const server = http.createServer(app);

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: 'Too many login attempts, please try again later.'
  }
});

app.use('/api/auth/', authLimiter);

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/messages', messageRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
      total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use(errorHandler);

// WebSocket setup
const io = socketio(server, {
  cors: corsOptions
});

socketHandler(io);

// Database initialization and server start
async function startServer() {
  try {
    console.log('🚀 Starting Agent Wallboard Backend Server...');
    console.log('');
    
    // Initialize databases
    console.log('📊 Initializing databases...');
    await initSQLite();
    await connectMongoDB();
    console.log('');
    
    // Start server
    const PORT = process.env.PORT || 3001;
    server.listen(PORT, () => {
      console.log('✅ Server started successfully!');
      console.log('');
      console.log(`📡 HTTP Server: http://localhost:${PORT}`);
      console.log(`⚡ WebSocket Server: ws://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
      console.log('');
      console.log('📋 Available Routes:');
      console.log('   POST   /api/auth/login');
      console.log('   POST   /api/auth/logout');
      console.log('   GET    /api/agents/team/:teamId');
      console.log('   PUT    /api/agents/:agentCode/status');
      console.log('   GET    /api/agents/:agentCode/history');
      console.log('   POST   /api/messages/send');
      console.log('   GET    /api/messages/agent/:agentCode');
      console.log('   PUT    /api/messages/:messageId/read');
      console.log('');
      console.log('🔌 WebSocket Events:');
      console.log('   Client → Server:');
      console.log('     - agent_connect');
      console.log('     - supervisor_connect');
      console.log('     - update_status');
      console.log('     - send_message');
      console.log('   Server → Client:');
      console.log('     - connection_success');
      console.log('     - agent_status_update');
      console.log('     - new_message');
      console.log('');
      console.log('🛡️  Rate Limiting:');
      console.log('   - API: 100 requests / 15 min');
      console.log('   - Auth: 10 requests / 15 min');
      console.log('');
      console.log('Press Ctrl+C to stop');
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Start the server
startServer();

module.exports = { app, io };