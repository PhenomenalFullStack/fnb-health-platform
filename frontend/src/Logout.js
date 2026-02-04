// src/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login', { state: { message: '✅ Successfully logged out.' } });
  }, [navigate]);

  return null;
}

export default Logout;
