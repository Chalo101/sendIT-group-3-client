import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Provide the context to children components
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { token, role }

  // Effect to check local storage for user data on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    const storedRole = localStorage.getItem('role');
    
    if (storedToken && storedRole) {
      setUser({ token: storedToken, role: storedRole });
    }
  }, []);

  // Login function to set user data and store in local storage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('access_token', userData.token);
    localStorage.setItem('role', userData.role);
  };

  // Logout function to clear user data and remove from local storage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
  };

  // Return the context provider with the current user, login, and logout methods
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
