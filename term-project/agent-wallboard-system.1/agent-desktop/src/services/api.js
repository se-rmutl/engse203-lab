const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class APIError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
  }
}

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let data;
  
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }
  
  if (!response.ok) {
    throw new APIError(
      data.error || data.message || `HTTP ${response.status}`,
      response.status,
      data.code
    );
  }
  
  return data;
};

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };
  
  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or other errors
    throw new APIError(
      'Network error. Please check your connection.',
      0,
      'NETWORK_ERROR'
    );
  }
};

// Authentication API
export const loginAgent = async (agentCode) => {
  return await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ agentCode }),
  });
};

export const loginSupervisor = async (supervisorCode) => {
  return await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ supervisorCode }),
  });
};

// Agent API
export const getAgentInfo = async (agentCode, token) => {
  return await apiCall(`/agents/${agentCode}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const updateAgentStatus = async (agentCode, status, token) => {
  return await apiCall(`/agents/${agentCode}/status`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
};

// Team API
export const getTeamMembers = async (supervisorCode, token) => {
  return await apiCall(`/teams/${supervisorCode}/agents`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

// Message API
export const sendMessage = async (messageData, token) => {
  return await apiCall('/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  });
};

export const getMessageHistory = async (params, token) => {
  const queryString = new URLSearchParams(params).toString();
  return await apiCall(`/messages/history?${queryString}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

// Health check
export const healthCheck = async () => {
  return await apiCall('/health', { method: 'GET' });
};