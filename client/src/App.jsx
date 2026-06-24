import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. Import our page components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  // All the state and effect hooks are gone.
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          {/* Route for the Home page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Route for the Login page */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Route for the Register page */}
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Route for the User Dashboard page */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;