// client/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';

// --- CHANGE 1: Import the new Navbar component ---
import Navbar from './components/Navbar';

function App() {
  return (
    // The Router component provides the routing context to our entire app.
    <Router>
      {/* --- CHANGE 2: Place the Navbar component here --- */}
      {/* By placing the Navbar here, outside of the <Routes> block,
          we ensure it is rendered on EVERY page that our router handles.
          It becomes a persistent part of our application's layout. */}
      <Navbar />

      <div className="container">
        {/* The <Routes> component is where React Router looks for a match
            and renders only the component for the current URL path. */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Route */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;