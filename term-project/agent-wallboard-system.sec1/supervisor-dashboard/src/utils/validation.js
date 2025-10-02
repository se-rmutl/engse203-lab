/**
 * Validate Supervisor Code
 * Format: SP + 3 digits (SP001, SP002, etc.)
 */
export const validateSupervisorCode = (code) => {
  if (!code) {
    return 'Supervisor code is required';
  }

  const trimmed = code.trim().toUpperCase();

  if (trimmed.length === 0) {
    return 'Supervisor code cannot be empty';
  }

  // ตรวจสอบ format: SP + 3 digits
  const pattern = /^SP\d{3}$/;
  if (!pattern.test(trimmed)) {
    return 'Invalid format. Use SP001, SP002, etc.';
  }

  return null; // valid
};

/**
 * Validate Message Content
 */
export const validateMessage = (content) => {
  if (!content || !content.trim()) {
    return 'Message cannot be empty';
  }

  if (content.length > 500) {
    return 'Message is too long (max 500 characters)';
  }

  return null; // valid
};

/**
 * Validate Email (ถ้าต้องการใช้)
 */
export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    return 'Invalid email format';
  }

  return null;
};