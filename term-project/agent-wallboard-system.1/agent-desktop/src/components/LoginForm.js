import React, { useState } from 'react';
import { loginAgent } from '../services/api';
import { validateAgentCode } from '../utils/validation';

function LoginForm({ onLogin }) {
  const [agentCode, setAgentCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
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
        onLogin(result.agent);
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setAgentCode(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <h2>Agent Login</h2>
          <p>Enter your agent code to continue</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="agentCode">Agent Code</label>
            <input
              id="agentCode"
              type="text"
              placeholder="e.g., AG001"
              value={agentCode}
              onChange={handleInputChange}
              disabled={loading}
              maxLength={5}
              autoComplete="off"
              autoFocus
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading || !agentCode.trim()}
            className="login-btn"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
        </form>
        
        <div className="login-footer">
          <p>Sample codes: AG001, AG002, AG003</p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;