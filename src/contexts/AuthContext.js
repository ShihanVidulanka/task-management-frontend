import React, { createContext, useState, useContext } from 'react';
import { register, login } from '../services/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const registerUser = async (email, password) => {
    try {
      const data = await register(email, password);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, registerUser, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
