-- Agent Wallboard System Database Schema
-- SQLite Database for Master Data

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
    team_id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_name VARCHAR(50) NOT NULL UNIQUE,
    supervisor_code VARCHAR(10),
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1
);

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
    agent_code VARCHAR(10) PRIMARY KEY,
    agent_name VARCHAR(100) NOT NULL,
    team_id INTEGER,
    role VARCHAR(20) NOT NULL CHECK (role IN ('agent', 'supervisor', 'admin')),
    email VARCHAR(100),
    phone VARCHAR(20),
    hire_date DATE,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

-- System configuration table
CREATE TABLE IF NOT EXISTS system_config (
    config_key VARCHAR(50) PRIMARY KEY,
    config_value TEXT NOT NULL,
    description TEXT,
    data_type VARCHAR(20) DEFAULT 'string',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Agent sessions table (for tracking login/logout)
CREATE TABLE IF NOT EXISTS agent_sessions (
    session_id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_code VARCHAR(10) NOT NULL,
    login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    logout_time DATETIME NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT 1,
    FOREIGN KEY (agent_code) REFERENCES agents(agent_code)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agents_team ON agents(team_id);
CREATE INDEX IF NOT EXISTS idx_agents_role ON agents(role);
CREATE INDEX IF NOT EXISTS idx_sessions_agent ON agent_sessions(agent_code);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON agent_sessions(is_active);