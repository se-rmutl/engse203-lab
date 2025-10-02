const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// SQLite Configuration
const SQLITE_DB_PATH = process.env.SQLITE_DB_PATH || './database/sqlite/wallboard.db';

function initSQLite() {
  return new Promise((resolve, reject) => {
    // Calculate absolute path from project root (not from config folder)
    // Assuming server.js is in project root
    const projectRoot = path.resolve(__dirname, '../../');
    const dbPath = path.resolve(projectRoot, SQLITE_DB_PATH);

    console.log('🔍 SQLite Connection Details:');
    console.log(`   SQLITE_DB_PATH (env): ${SQLITE_DB_PATH}`);
    console.log(`   __dirname: ${__dirname}`);
    console.log(`   Project root: ${projectRoot}`);
    console.log(`   Resolved dbPath: ${dbPath}`);

    // Check if directory exists
    const dbDir = path.dirname(dbPath);

    console.log(`   Resolved dbDir: ${dbDir}`);

    if (!fs.existsSync(dbDir)) {
      console.log(`⚠️  Database directory does not exist: ${dbDir}`);
      console.log(`   Creating directory...`);
      try {
        fs.mkdirSync(dbDir, { recursive: true });
        console.log(`✅ Directory created successfully`);
      } catch (error) {
        console.error(`❌ Failed to create directory:`, error);
        reject(new Error(`Failed to create database directory: ${error.message}`));
        return;
      }
    }

    // Check if database file exists
    if (!fs.existsSync(dbPath)) {
      console.log(`⚠️  Database file does not exist: ${dbPath}`);
      console.log(`   Please run database setup script first:`);
      console.log(`   cd database/sqlite && ./setup.sh`);
      reject(new Error(`Database file not found: ${dbPath}`));
      return;
    }

    // Check file permissions
    try {
      fs.accessSync(dbPath, fs.constants.R_OK | fs.constants.W_OK);
      console.log(`✅ Database file has correct permissions`);
    } catch (error) {
      console.error(`❌ Database file permission error:`, error);
      reject(new Error(`Cannot access database file: ${error.message}`));
      return;
    }

    // Try to open database
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ SQLite connection error:', err);
        reject(err);
      } else {
        console.log('✅ Connected to SQLite database');
        console.log(`📁 Database location: ${dbPath}`);

        // Test query
        db.get("SELECT COUNT(*) as count FROM agents", (err, row) => {
          if (err) {
            console.error('❌ Database query error:', err);
            console.log('⚠️  Database file exists but schema might be missing');
            db.close();
            reject(new Error('Database schema error - please run setup script'));
          } else {
            console.log(`📊 Found ${row.count} agents in database`);
            db.close();
            resolve();
          }
        });
      }
    });
  });
}

// MongoDB Configuration with Retry Logic
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wallboard';

async function connectMongoDB() {
  const maxRetries = 5;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
      });
      console.log('✅ Connected to MongoDB');
      console.log(`📁 Database: ${MONGODB_URI}`);
      return;

    } catch (error) {
      currentRetry++;
      console.error(`❌ MongoDB connection attempt ${currentRetry}/${maxRetries} failed:`, error.message);

      if (currentRetry >= maxRetries) {
        console.error('❌ All MongoDB connection attempts failed');
        throw new Error(`MongoDB connection failed after ${maxRetries} attempts: ${error.message}`);
      }

      const waitTime = Math.min(1000 * Math.pow(2, currentRetry), 10000);
      console.log(`⏳ Waiting ${waitTime / 1000}s before retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('📊 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB connection closed due to app termination');
  process.exit(0);
});

// Export functions
module.exports = {
  initSQLite,
  connectMongoDB,
  // Export resolved path for use in models
  getSQLitePath: () => {
    const projectRoot = path.resolve(__dirname, '../../');
    return path.resolve(projectRoot, SQLITE_DB_PATH);
  }
};