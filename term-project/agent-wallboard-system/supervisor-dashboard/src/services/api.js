const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Login Supervisor
 */
export const loginSupervisor = async (supervisorCode) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ supervisorCode })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }

  return response.json();
};

/**
 * Send Message
 */
export const sendMessage = async (messageData, token) => {
  const response = await fetch(`${API_BASE_URL}/messages/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(messageData)
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
};

/**
 * Check Server Health
 */
export const checkServerHealth = async () => {
  const response = await fetch(API_BASE_URL.replace('/api', '/health'));
  return response.json();
};