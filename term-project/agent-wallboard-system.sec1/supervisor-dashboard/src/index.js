import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

// สร้าง root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);