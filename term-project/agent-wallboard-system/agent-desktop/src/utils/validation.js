export const validateAgentCode = (code) => {
  if (!code) {
    return 'Agent code is required';
  }
  
  const trimmed = code.trim().toUpperCase();
  
  if (trimmed.length === 0) {
    return 'Agent code cannot be empty';
  }
  
  if (!/^[A-Z]{2}\d{3}$/.test(trimmed)) {
    return 'Agent code must be in format: AG001 or SP001';
  }
  
  return null;
};

export const validateMessage = (content) => {
  if (!content || content.trim().length === 0) {
    return 'Message cannot be empty';
  }
  
  if (content.length > 500) {
    return 'Message is too long (max 500 characters)';
  }
  
  return null;
};