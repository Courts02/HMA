// Import React to define components
import React from 'react';

// Import React Router modules for routing and navigation
import {
  BrowserRouter as Router, // Provides the routing context
  Routes,                  // Container for all your <Route> elements
  Route,                   // Defines a single route
  Link,                    // Creates links for navigation
  useLocation              // React hook to get the current URL path
} from 'react-router-dom';

// Import your pages/components
import Appointments from './Components/Appointments';
import Doctors from './Components/Doctors';
import Patients from '/Components/Patients';
import Signup from './Components/Signup'; 
import Login from './Components/Login';   

import axiosInstance from './api/axiosInstance'; // Axios instance for API calls

// Import global CSS styling
import './App.css';

// Define your Nav component for navigation bar
const Nav = () => {
  const location = useLocation();

  // Helper function to check if a nav link should be highlighted as active
  const isLinkActive = (path) => {
    if (location.pathname === '/' && path === '/appointments') return true;
    return location.pathname === path;
  };

  return (
    <nav>
      <ul>
        <li className={isLinkActive('/appointments') ? 'active' : ''}>
          <Link to="/appointments">Appointments</Link>
        </li>
        <li className={isLinkActive('/doctors') ? 'active' : ''}>
          <Link to="/doctors">Doctors</Link>
        </li>
        <li className={isLinkActive('/patients') ? 'active' : ''}>
          <Link to="/patients">Patients</Link>
        </li>
        <li className={isLinkActive('/signup') ? 'active' : ''}>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className={isLinkActive('/login') ? 'active' : ''}>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

// Define your main App component
const App = () => {
  return (
    <Router>
      <div className="container">
        <h1 style={{ color: 'green' }}>
          Hospital Management App
        </h1>

        <Nav />

        <Routes>
          <Route path="/" element={<Appointments />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/signup" element={<Signup />} />  {/* ✅ NEW */}
          <Route path="/login" element={<Login />} />    {/* ✅ NEW */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
