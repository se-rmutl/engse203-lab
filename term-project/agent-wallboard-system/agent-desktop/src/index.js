import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

document.body.classList.add('app-loaded');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

console.log('Agent Wallboard Desktop App - Started');
console.log('Version:', process.env.REACT_APP_VERSION || '3.1.0');
console.log('Environment:', process.env.NODE_ENV);