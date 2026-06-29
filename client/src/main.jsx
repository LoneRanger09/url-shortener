// client/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from 'axios';

// Configure Axios base URL globally for separate frontend/backend deployments
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '';

// --- CHANGE 1: Import the AuthProvider ---
// This gives us access to the provider component we just created.
import { AuthProvider } from './context/AuthContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* --- CHANGE 2: Wrap the entire App component --- */}
    {/* By placing AuthProvider here, every single component inside App,
        including all your pages and future components, will be able to
        access the authentication context. */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);