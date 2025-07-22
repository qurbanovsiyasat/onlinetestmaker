import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider: Initializing...');
    
    try {
      const userInfoFromStorage = localStorage.getItem('userInfo');
      if (userInfoFromStorage) {
        const parsedUser = JSON.parse(userInfoFromStorage);
        console.log('AuthProvider: User loaded from storage:', parsedUser.email);
        setUser(parsedUser);
        api.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
      }
    } catch (error) {
      console.error('AuthProvider: Error loading user from storage:', error);
      localStorage.removeItem('userInfo');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array - only run once

  const login = useCallback(async (email, password) => {
    try {
      console.log('AuthProvider: Attempting login for:', email);
      const { data } = await api.post('/api/auth/login', { email, password });
      
      console.log('AuthProvider: Login successful');
      localStorage.setItem('userInfo', JSON.stringify(data));
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data);
      return { success: true };
    } catch (error) {
      console.error('AuthProvider: Login error:', error);
      
      let errorMessage = 'An error occurred during login';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to server. Please try again later.';
      }
      
      return { success: false, error: errorMessage };
    }
  }, []); // No dependencies
  
  const register = useCallback(async (name, email, password) => {
    try {
      console.log('AuthProvider: Attempting registration for:', email);
      const { data } = await api.post('/api/auth/register', { name, email, password });
      
      console.log('AuthProvider: Registration successful');
      localStorage.setItem('userInfo', JSON.stringify(data));
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data);
      return { success: true };
    } catch (error) {
      console.error('AuthProvider: Registration error:', error);
      
      let errorMessage = 'An error occurred during registration';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to server. Please try again later.';
      }
      
      return { success: false, error: errorMessage };
    }
  }, []); // No dependencies

  const logout = useCallback(() => {
    console.log('AuthProvider: Logging out user');
    localStorage.removeItem('userInfo');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  }, []); // No dependencies

  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(() => ({
    user,
    login,
    logout,
    register,
  }), [user, login, logout, register]);

  console.log('AuthProvider: Rendering with user:', user?.email || 'None');

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};