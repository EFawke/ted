import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('authToken');
        
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    };
    initializeAuth();
  }, []);

  const login = (userData, token) => {
    const userWithAdminFlag = { 
      ...userData,
      isAdmin: userData.isAdmin // Ensure backend sends this flag
    };
    localStorage.setItem('user', JSON.stringify(userWithAdminFlag));
    localStorage.setItem('authToken', token);
    setUser(userWithAdminFlag);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);