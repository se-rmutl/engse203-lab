const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = process.env.SQLITE_DB_PATH || '../database/sqlite/wallboard.db';

class Agent {
  static async findByCode(agentCode) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(DB_PATH);
      
      const query = `
        SELECT a.*, t.team_name 
        FROM agents a 
        LEFT JOIN teams t ON a.team_id = t.team_id 
        WHERE a.agent_code = ? AND a.is_active = 1
      `;
      
      db.get(query, [agentCode], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null);
        }
        db.close();
      });
    });
  }
  
  static async findByTeam(teamId) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(DB_PATH);
      
      const query = `
        SELECT agent_code, agent_name, role, email, phone
        FROM agents 
        WHERE team_id = ? AND is_active = 1
        ORDER BY agent_name
      `;
      
      db.all(query, [teamId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows || []);
        }
        db.close();
      });
    });
  }
}

module.exports = Agent;