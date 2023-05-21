import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
