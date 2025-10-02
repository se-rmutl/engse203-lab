const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');
const path = require('path');

// ========== SQLITE CONFIGURATION ==========
const SQLITE_DB_PATH = process.env.SQLITE_DB_PATH || '../database/sqlite/wallboard.db';

const initSQLite = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(SQLITE_DB_PATH, (err) => {
      if (err) {
        console.error('SQLite connection error:', err);
        reject(err);
      } else {
        console.log('✅ Connected to SQLite database');
        resolve();
      }
      db.close();
    });
  });
};

// ========== MONGODB CONFIGURATION ==========
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wallboard';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

module.exports = {
  initSQLite,
  connectMongoDB
};