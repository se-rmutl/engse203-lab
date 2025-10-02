import React, { useState, useEffect } from 'react';
import { loginAgent, checkServerHealth } from '../services/api';
import { validateAgentCode } from '../utils/validation';

function LoginForm({ onLogin }) {
  const [agentCode, setAgentCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serverStatus, setServerStatus] = useState('unknown');

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      await checkServerHealth();
      setServerStatus('online');
    } catch (error) {
      setServerStatus('offline');
      setError('Backend server is not running. Please start the server first.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateAgentCode(agentCode);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await loginAgent(agentCode.toUpperCase());
      
      if (result.success) {
        onLogin(result.data.user, result.data.token);
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      if (err.message.includes('fetch')) {
        setError('Cannot connect to server. Please check if backend is running.');
        setServerStatus('offline');
      } else {
        setError(err.message || 'Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError('');
    checkHealth();
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <h2>Agent Login</h2>
          <p>Enter your agent code to continue</p>
          
          <div className={`server-status ${serverStatus}`}>
            <span className="status-dot"></span>
            <span>Server: {serverStatus}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="agentCode">Agent Code</label>
            <input
              id="agentCode"
              type="text"
              placeholder="e.g., AG001"
              value={agentCode}
              onChange={(e) => {
                setAgentCode(e.target.value.toUpperCase());
                if (error) setError('');
              }}
              disabled={loading || serverStatus === 'offline'}
              maxLength={5}
              autoFocus
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading || !agentCode.trim() || serverStatus === 'offline'}
            className="login-btn"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          
          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
              {serverStatus === 'offline' && (
                <button 
                  type="button" 
                  onClick={handleRetry} 
                  className="retry-btn"
                >
                  Retry Connection
                </button>
              )}
            </div>
          )}
        </form>
        
        <div className="login-footer">
          <p>Sample codes: AG001, AG002, AG003</p>
          <p className="help-text">
            Need help? Check if backend server is running on port 3001
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;