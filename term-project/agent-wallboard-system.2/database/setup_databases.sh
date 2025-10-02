#!/bin/bash
# setup_databases.sh

echo "🗄️ Setting up Agent Wallboard Databases..."

# Setup SQLite
echo "📊 Setting up SQLite database..."
cd sqlite
chmod +x create_sqlite_db.sh
./create_sqlite_db.sh
cd ..

# Setup MongoDB
echo "🍃 Setting up MongoDB database..."
node mongodb/sample_data.js

echo "✅ Database setup completed!"
echo ""
echo "📍 Database locations:"
echo "   SQLite: $(pwd)/sqlite/wallboard.db"
echo "   MongoDB: localhost:27017/wallboard"
echo ""
echo "🔍 Quick verification:"
echo "   SQLite agents: $(sqlite3 sqlite/wallboard.db 'SELECT COUNT(*) FROM agents;')"
echo "   MongoDB collections created: agent_status, messages, connection_logs"