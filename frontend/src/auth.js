export const isAuthenticated = () => {
    return !!localStorage.getItem('access');
  };
  
  export const refreshAccessToken = async () => {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return false;
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('access', data.access);
        return true;
      } else {
        logoutUser(); // remove invalid tokens
        return false;
      }
    } catch (err) {
      console.error('Token refresh failed:', err);
      return false;
    }
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  };
  