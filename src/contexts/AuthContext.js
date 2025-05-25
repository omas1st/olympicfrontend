import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
  const [status, setStatus] = useState(localStorage.getItem('status') || 'step1');

  useEffect(() => {
    if (token) {
      const { status: s } = jwtDecode(token);
      setStatus(s);
      localStorage.setItem('status', s);
    }
  }, [token]);

  const loginUser = (t, s) => {
    localStorage.setItem('token', t);
    localStorage.setItem('status', s);
    setToken(t);
    setStatus(s);
  };

  const loginAdmin = (t) => {
    localStorage.setItem('adminToken', t);
    setAdminToken(t);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setAdminToken(null);
    setStatus('step1');
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      status, 
      adminToken, 
      loginUser, 
      loginAdmin, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}