#!/bin/bash

echo "🍃 Setting up MongoDB..."

# Check if MongoDB is running
if ! mongosh --eval "db.adminCommand('ping')" >/dev/null 2>&1; then
    echo "❌ MongoDB is not running. Please start MongoDB first."
    echo ""
    echo "Start MongoDB:"
    echo "  Windows: net start MongoDB"
    echo "  macOS: brew services start mongodb-community"
    echo "  Linux: sudo systemctl start mongod"
    exit 1
fi

echo "✅ MongoDB is running"

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install mongoose
fi

# Run sample data script
echo "📊 Creating collections and inserting sample data..."
node sample_data.js

if [ $? -ne 0 ]; then
    echo "❌ Failed to setup MongoDB"
    exit 1
fi

echo ""
echo "🔍 Verify with:"
echo "   mongosh wallboard --eval 'show collections'"
echo "   mongosh wallboard --eval 'db.messages.countDocuments()'"