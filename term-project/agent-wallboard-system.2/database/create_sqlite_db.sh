#!/bin/bash
# create_sqlite_db.sh

echo "Creating SQLite database..."

# Create database directory if it doesn't exist
mkdir -p sqlite

# Remove existing database (for fresh start)
rm -f sqlite/wallboard.db

# Create database and run initialization scripts
sqlite3 sqlite/wallboard.db < init.sql
sqlite3 sqlite/wallboard.db < sample_data.sql

echo " SQLite database created successfully!"
echo " Database location: $(pwd)/sqlite/wallboard.db"

# Verify data
echo " Verification - Agent count:"
sqlite3 sqlite/wallboard.db "SELECT role, COUNT(*) as count FROM agents GROUP BY role;"

echo " Verification - Team count:"
sqlite3 sqlite/wallboard.db "SELECT team_name, COUNT(a.agent_code) as agent_count FROM teams t LEFT JOIN agents a ON t.team_id = a.team_id GROUP BY t.team_id;"
