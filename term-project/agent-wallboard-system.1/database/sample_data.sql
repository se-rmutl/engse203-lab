-- Sample Data for Agent Wallboard System
-- Run this after creating the schema

-- Insert Teams
INSERT OR REPLACE INTO teams (team_id, team_name, supervisor_code, description) VALUES
(1, 'Customer Service', 'SP001', 'Main customer service team'),
(2, 'Technical Support', 'SP002', 'Technical support specialists'),
(3, 'Sales Team', 'SP003', 'Sales and marketing team');

-- Insert Agents and Supervisors
INSERT OR REPLACE INTO agents (agent_code, agent_name, team_id, role, email, phone, hire_date) VALUES
-- Supervisors
('SP001', 'Sarah Wilson', 1, 'supervisor', 'sarah.wilson@company.com', '555-0101', '2022-01-15'),
('SP002', 'Mike Johnson', 2, 'supervisor', 'mike.johnson@company.com', '555-0102', '2022-02-20'),
('SP003', 'Lisa Chen', 3, 'supervisor', 'lisa.chen@company.com', '555-0103', '2022-03-10'),

-- Customer Service Agents
('AG001', 'John Smith', 1, 'agent', 'john.smith@company.com', '555-0201', '2023-01-10'),
('AG002', 'Emma Davis', 1, 'agent', 'emma.davis@company.com', '555-0202', '2023-01-15'),
('AG003', 'Robert Brown', 1, 'agent', 'robert.brown@company.com', '555-0203', '2023-02-01'),
('AG004', 'Jennifer Wilson', 1, 'agent', 'jennifer.wilson@company.com', '555-0204', '2023-02-10'),

-- Technical Support Agents
('AG005', 'David Miller', 2, 'agent', 'david.miller@company.com', '555-0301', '2023-01-20'),
('AG006', 'Amanda Taylor', 2, 'agent', 'amanda.taylor@company.com', '555-0302', '2023-02-05'),
('AG007', 'Chris Anderson', 2, 'agent', 'chris.anderson@company.com', '555-0303', '2023-02-15'),

-- Sales Team Agents
('AG008', 'Michelle Garcia', 3, 'agent', 'michelle.garcia@company.com', '555-0401', '2023-01-25'),
('AG009', 'Kevin Martinez', 3, 'agent', 'kevin.martinez@company.com', '555-0402', '2023-02-20'),
('AG010', 'Jessica Rodriguez', 3, 'agent', 'jessica.rodriguez@company.com', '555-0403', '2023-03-01'),

-- Admin User
('AD001', 'System Admin', NULL, 'admin', 'admin@company.com', '555-0001', '2022-01-01');

-- System Configuration
INSERT OR REPLACE INTO system_config (config_key, config_value, description, data_type) VALUES
('max_break_time_minutes', '120', 'Maximum break time allowed per day', 'integer'),
('auto_logout_hours', '8', 'Auto logout after inactive hours', 'integer'),
('status_update_interval_seconds', '30', 'Status update broadcast interval', 'integer'),
('max_message_length', '500', 'Maximum message length for direct messages', 'integer'),
('max_broadcast_length', '1000', 'Maximum message length for broadcast messages', 'integer'),
('enable_desktop_notifications', 'true', 'Enable desktop notifications', 'boolean'),
('system_timezone', 'Asia/Bangkok', 'System timezone', 'string'),
('company_name', 'RMUTL Agent Wallboard', 'Company name for display', 'string');

-- Sample session data (for testing)
INSERT OR REPLACE INTO agent_sessions (agent_code, login_time, ip_address, user_agent) VALUES
('AG001', '2024-09-22 08:00:00', '192.168.1.101', 'Electron Agent App'),
('AG002', '2024-09-22 08:15:00', '192.168.1.102', 'Electron Agent App'),
('SP001', '2024-09-22 07:45:00', '192.168.1.201', 'Chrome Browser');