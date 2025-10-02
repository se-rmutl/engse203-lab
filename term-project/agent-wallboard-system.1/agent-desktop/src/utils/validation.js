// Input validation utility functions

export const validateAgentCode = (code) => {
  if (!code) {
    return 'Agent code is required';
  }
  
  const trimmedCode = code.trim().toUpperCase();
  
  if (trimmedCode.length === 0) {
    return 'Agent code cannot be empty';
  }
  
  // Check format: AG001, SP001, etc.
  if (!/^[A-Z]{2}\d{3}$/.test(trimmedCode)) {
    return 'Agent code must be in format: AG001 or SP001';
  }
  
  return null; // Valid
};

export const validateStatus = (status) => {
  const validStatuses = ['Available', 'Busy', 'Break', 'Offline'];
  return validStatuses.includes(status);
};

export const validateMessage = (message) => {
  const errors = {};
  
  if (!message.content || message.content.trim().length === 0) {
    errors.content = 'Message content is required';
  }
  
  if (message.content && message.content.length > 500) {
    errors.content = 'Message cannot exceed 500 characters';
  }
  
  if (!message.fromCode) {
    errors.fromCode = 'Sender code is required';
  }
  
  if (!message.toCode && !message.toTeamId) {
    errors.recipient = 'Recipient is required';
  }
  
  if (!['direct', 'broadcast'].includes(message.type)) {
    errors.type = 'Invalid message type';
  }
  
  if (!['low', 'normal', 'high'].includes(message.priority)) {
    errors.priority = 'Invalid priority level';
  }
  
  return Object.keys(errors).length > 0 ? errors : null;
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return input;
  }
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove basic HTML tags
    .substring(0, 1000); // Limit length
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date instanceof Date && !isNaN(date);
};