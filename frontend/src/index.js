import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { SignInProvider } from './contexts/SignInContext';
import { SearchProvider } from './contexts/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <SignInProvider>
          <App />
        </SignInProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
