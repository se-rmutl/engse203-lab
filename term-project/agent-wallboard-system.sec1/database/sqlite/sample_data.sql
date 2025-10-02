-- Sample Data for Agent Wallboard System

-- Insert teams
INSERT INTO teams (team_id, team_name, supervisor_code, description) VALUES
(1, 'Customer Service', 'SP001', 'Main customer service team'),
(2, 'Technical Support', 'SP002', 'Technical support specialists'),
(3, 'Sales Team', 'SP003', 'Sales and marketing team');

-- Insert supervisors
INSERT INTO agents (agent_code, agent_name, team_id, role, email, phone, hire_date) VALUES
('SP001', 'Sarah Wilson', 1, 'supervisor', 'sarah.wilson@company.com', '555-0101', '2023-01-15'),
('SP002', 'Mike Johnson', 2, 'supervisor', 'mike.johnson@company.com', '555-0102', '2023-01-20'),
('SP003', 'Lisa Chen', 3, 'supervisor', 'lisa.chen@company.com', '555-0103', '2023-02-01');

-- Insert Customer Service agents
INSERT INTO agents (agent_code, agent_name, team_id, role, email, phone, hire_date) VALUES
('AG001', 'John Smith', 1, 'agent', 'john.smith@company.com', '555-0201', '2023-03-01'),
('AG002', 'Emma Davis', 1, 'agent', 'emma.davis@company.com', '555-0202', '2023-03-05'),
('AG003', 'Robert Brown', 1, 'agent', 'robert.brown@company.com', '555-0203', '2023-03-10'),
('AG004', 'Jennifer Wilson', 1, 'agent', 'jennifer.wilson@company.com', '555-0204', '2023-03-15');

-- Insert Technical Support agents
INSERT INTO agents (agent_code, agent_name, team_id, role, email, phone, hire_date) VALUES
('AG005', 'David Miller', 2, 'agent', 'david.miller@company.com', '555-0301', '2023-04-01'),
('AG006', 'Amanda Taylor', 2, 'agent', 'amanda.taylor@company.com', '555-0302', '2023-04-05'),
('AG007', 'Chris Anderson', 2, 'agent', 'chris.anderson@company.com', '555-0303', '2023-04-10');

-- Insert Sales agents
INSERT INTO agents (agent_code, agent_name, team_id, role, email, phone, hire_date) VALUES
('AG008', 'Michelle Garcia', 3, 'agent', 'michelle.garcia@company.com', '555-0401', '2023-05-01'),
('AG009', 'Kevin Martinez', 3, 'agent', 'kevin.martinez@company.com', '555-0402', '2023-05-05'),
('AG010', 'Jessica Rodriguez', 3, 'agent', 'jessica.rodriguez@company.com', '555-0403', '2023-05-10');

-- Insert system configuration
INSERT INTO system_config (config_key, config_value, description) VALUES
('status_timeout', '300', 'Auto-offline timeout in seconds'),
('message_retention', '30', 'Message retention in days'),
('max_concurrent_sessions', '1', 'Max sessions per agent'),
('notification_enabled', 'true', 'Enable desktop notifications'),
('websocket_timeout', '30000', 'WebSocket timeout in milliseconds'),
('api_rate_limit', '100', 'API requests per minute'),
('session_duration', '28800', 'Max session duration in seconds (8 hours)'),
('backup_interval', '86400', 'Database backup interval in seconds (24 hours)');