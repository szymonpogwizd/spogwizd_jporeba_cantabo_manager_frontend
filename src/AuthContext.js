import React, { createContext, useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardAppPage from './pages/DashboardAppPage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
        <LoginPage />
        <DashboardAppPage />
    </AuthContext.Provider>
  );
};
