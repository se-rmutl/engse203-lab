import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '16px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>
              ⚠️
            </div>
            
            <h2 style={{ 
              margin: '0 0 16px 0',
              color: '#333',
              fontSize: '24px'
            }}>
              Something went wrong
            </h2>
            
            <p style={{ 
              color: '#666', 
              fontSize: '14px',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              The application encountered an unexpected error. 
              Please try reloading the application.
            </p>
            
            {this.state.error && (
              <details style={{
                marginBottom: '24px',
                textAlign: 'left',
                background: '#f5f5f5',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '12px',
                maxHeight: '150px',
                overflow: 'auto'
              }}>
                <summary style={{ 
                  cursor: 'pointer',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#666'
                }}>
                  Error Details
                </summary>
                <pre style={{ 
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  color: '#d32f2f'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button 
                onClick={this.handleReload}
                style={{
                  padding: '12px 24px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#5568d3'}
                onMouseOut={(e) => e.target.style.background = '#667eea'}
              >
                Reload Application
              </button>
              
              <button 
                onClick={this.handleReset}
                style={{
                  padding: '12px 24px',
                  background: '#f0f0f0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#e0e0e0'}
                onMouseOut={(e) => e.target.style.background = '#f0f0f0'}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;