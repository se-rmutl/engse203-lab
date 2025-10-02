const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// ✅ Import the path getter function
const { getSQLitePath } = require('../config/database');

class Agent {
  static getDbPath() {
    // Use the centralized path resolution
    return getSQLitePath();
  }

  static findByCode(agentCode) {
    return new Promise((resolve, reject) => {
      const dbPath = Agent.getDbPath();
      
      const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error(`❌ Error opening database for agent ${agentCode}:`, err);
          reject(new Error(`Database connection failed: ${err.message}`));
          return;
        }
      });
      
      const query = `
        SELECT 
          a.agent_id,
          a.agent_code,
          a.agent_name,
          a.team_id,
          a.role,
          a.email,
          a.phone,
          a.hire_date,
          a.is_active,
          t.team_name
        FROM agents a
        LEFT JOIN teams t ON a.team_id = t.team_id
        WHERE a.agent_code = ? AND a.is_active = 1
      `;
      
      db.get(query, [agentCode.toUpperCase()], (err, row) => {
        if (err) {
          console.error(`❌ Error finding agent ${agentCode}:`, err);
          db.close();
          reject(new Error(`Query failed: ${err.message}`));
        } else {
          db.close();
          resolve(row || null);
        }
      });
    });
  }

  /**
   * Find all agents in a team
   * @param {number} teamId - Team ID
   * @returns {Promise<Array>} Array of agent objects
   */
  static findByTeam(teamId) {
    return new Promise((resolve, reject) => {
      const dbPath = Agent.getDbPath();
      const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error(`❌ Error opening database for team ${teamId}:`, err);
          reject(new Error(`Database connection failed: ${err.message}`));
          return;
        }
      });
      
      const query = `
        SELECT 
          agent_code,
          agent_name,
          role,
          email,
          phone
        FROM agents
        WHERE team_id = ? AND is_active = 1 AND role = 'agent'
        ORDER BY agent_name
      `;
      
      db.all(query, [teamId], (err, rows) => {
        if (err) {
          console.error(`❌ Error finding team ${teamId} agents:`, err);
          db.close();
          reject(new Error(`Query failed: ${err.message}`));
        } else {
          db.close();
          resolve(rows || []);
        }
      });
    });
  }

  /**
   * Get all active agents
   * @returns {Promise<Array>} Array of all agents
   */
  static findAll() {
    return new Promise((resolve, reject) => {
      const dbPath = Agent.getDbPath();      
      const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('❌ Error opening database:', err);
          reject(new Error(`Database connection failed: ${err.message}`));
          return;
        }
      });
      
      const query = `
        SELECT 
          a.agent_code,
          a.agent_name,
          a.team_id,
          a.role,
          t.team_name
        FROM agents a
        LEFT JOIN teams t ON a.team_id = t.team_id
        WHERE a.is_active = 1
        ORDER BY a.role DESC, a.agent_name
      `;
      
      db.all(query, [], (err, rows) => {
        if (err) {
          console.error('❌ Error finding all agents:', err);
          db.close();
          reject(new Error(`Query failed: ${err.message}`));
        } else {
          db.close();
          resolve(rows || []);
        }
      });
    });
  }
}

module.exports = Agent;