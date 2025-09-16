// utils/constants.js - ค่าคงที่ของระบบ
const AGENT_STATUS = {
  AVAILABLE: 'Available',
  BUSY: 'Busy',
  WRAP: 'Wrap', 
  BREAK: 'Break',
  NOT_READY: 'Not Ready',
  OFFLINE: 'Offline'
};

const DEPARTMENTS = [
  'Sales',
  'Support', 
  'Technical',
  'General',
  'Supervisor'
];

// กฎการเปลี่ยนสถานะที่อนุญาต
const VALID_STATUS_TRANSITIONS = {
  'Available': ['Busy', 'Break', 'Not Ready', 'Offline'],
  'Busy': ['Available', 'Wrap', 'Not Ready'],
  'Wrap': ['Available', 'Not Ready'],
  'Break': ['Available', 'Not Ready'],
  'Not Ready': ['Available', 'Offline'],
  'Offline': ['Available']
};

const API_MESSAGES = {
  AGENT_NOT_FOUND: 'Agent not found',
  AGENT_CREATED: 'Agent created successfully',
  AGENT_UPDATED: 'Agent updated successfully',
  AGENT_DELETED: 'Agent deleted successfully',
  STATUS_UPDATED: 'Agent status updated successfully',
  VALIDATION_FAILED: 'Validation failed',
  INTERNAL_ERROR: 'Internal server error'
};

module.exports = { 
  AGENT_STATUS, 
  DEPARTMENTS, 
  VALID_STATUS_TRANSITIONS,
  API_MESSAGES
};