const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
  console.log('Auth token set');
};

export const clearAuthToken = () => {
  authToken = null;
  console.log('Auth token cleared');
};

export const getAuthToken = () => authToken;

export const loginAgent = async (agentCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentCode })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    if (data.data?.token) {
      setAuthToken(data.data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
};

export const logoutAgent = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();
    clearAuthToken();
    return data;
  } catch (error) {
    console.error('Logout API Error:', error);
    clearAuthToken();
    throw error;
  }
};

export const getMessages = async (agentCode, limit = 50, unreadOnly = false) => {
  try {
    if (!authToken) {
      throw new Error('Not authenticated');
    }

    const url = `${API_BASE_URL}/messages/agent/${agentCode}?limit=${limit}&unreadOnly=${unreadOnly}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to get messages');
    }
    
    return data;
  } catch (error) {
    console.error('Get Messages API Error:', error);
    throw error;
  }
};

export const markMessageAsRead = async (messageId) => {
  try {
    if (!authToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/messages/${messageId}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to mark message as read');
    }
    
    return data;
  } catch (error) {
    console.error('Mark Read API Error:', error);
    throw error;
  }
};

export const updateAgentStatus = async (agentCode, status) => {
  try {
    if (!authToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/agents/${agentCode}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ status })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update status');
    }
    
    return data;
  } catch (error) {
    console.error('Update Status API Error:', error);
    throw error;
  }
};

export const getStatusHistory = async (agentCode, limit = 50) => {
  try {
    if (!authToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/agents/${agentCode}/history?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to get status history');
    }
    
    return data;
  } catch (error) {
    console.error('Get Status History API Error:', error);
    throw error;
  }
};

export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`, {
      method: 'GET'
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error('Server health check failed');
    }
    
    return data;
  } catch (error) {
    console.error('Health Check Error:', error);
    throw error;
  }
};