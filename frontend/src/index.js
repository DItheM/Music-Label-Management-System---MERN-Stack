import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { SignInProvider } from './contexts/SignInContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SignInProvider>
        <App />
      </SignInProvider>
    </AuthProvider>
  </React.StrictMode>
);
