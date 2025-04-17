import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

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
        console.error('Auth initialization error:', error);
        localStorage.clear();
      } finally {
        setLoading(false); // Ensure loading stops
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

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);