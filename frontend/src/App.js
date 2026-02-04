// src/App.js
import './App.css';
import React from 'react';
import { useEffect } from 'react';
import { refreshAccessToken } from './auth';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Logout from './Logout';
import Login from './Login';
import Register from './Register';
import DoctorDashboard from './DoctorDashboard';
import Report from './Report'; 
import Patient from './Patient';
import Appointments from './Appointments';
import PatientChat from './PatientChat';
import History from './History';
import Setting from './Setting';




// Helper to check if user is logged in
const isAuthenticated = () => {
  return !!localStorage.getItem('access');
};

function App() {
  const location = useLocation();
  const stateMessage = location.state?.message;
  
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 1 * 60 * 1000); // every 4 minutes
  
    return () => clearInterval(interval); // clean up on unmount
  }, []);

  return (
    <div className="App">
      {/* ✅ Global Message */}
      {stateMessage && <p style={{ color: 'green' }}>{stateMessage}</p>}

      {/* ✅ Route Definitions */}
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} />} />
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={isAuthenticated() ? <DoctorDashboard /> : <Navigate to="/login" />} />
        <Route path="/report" element={isAuthenticated() ? <Report /> : <Navigate to="/login" />} /> 
         <Route path="/patients" element={isAuthenticated() ? <Patient /> : <Navigate to="/login" />} />
        <Route path="/appointments" element={isAuthenticated() ? <Appointments /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAuthenticated() ? <PatientChat /> : <Navigate to="/login" />} />
        <Route path="/chat/:patientId" element={isAuthenticated() ? <PatientChat /> : <Navigate to="/login" />} />
        <Route path="/history" element={isAuthenticated() ? <History /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated() ? <Setting /> : <Navigate to="/login" />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}