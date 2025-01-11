import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // If you're using TailwindCSS
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
