import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate
} from 'react-router-dom';

import Appointments from './Components/Appointments';
import Doctors from './Components/Doctors';
import Patients from './Components/Patients';
import Signup from './Components/Signup';
import Login from './Components/Login';

import axiosInstance from './api/axiosInstance'; // Axios instance for API calls

import './App.css';

// Navigation component
const Nav = ({ user, handleLogout }) => {
  const location = useLocation();

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
      </ul>
      <div className="user-info">
        <span>Welcome, {user.email}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

// Main App component
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (token) {
      // Attach token to every request automatically
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <Router>
      <div className="container">
        <h1 style={{ color: 'green' }}>Hospital Management App</h1>

        {token && user && <Nav user={user} handleLogout={handleLogout} />}

        <Routes>
          {/* Protected routes */}
          {token ? (
            <>
              <Route path="/" element={<Appointments />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<Signup setToken={setToken} setUser={setUser} />} />
              <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
