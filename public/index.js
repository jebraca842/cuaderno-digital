import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Mock para window.storage (simulando almacenamiento)
window.storage = {
  get: async (key, parse) => {
    const value = localStorage.getItem(key);
    return { value: value ? (parse ? value : value) : null };
  },
  set: async (key, value, parse) => {
    localStorage.setItem(key, value);
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);