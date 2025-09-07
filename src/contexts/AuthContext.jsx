import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/client';
import { STORAGE_KEYS } from '../constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password);
      const userData = {
        id: response.user_id,
        username: response.username,
      };
      
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.access_token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL
      });
      
      // Handle different error types
      if (error.response?.status === 500) {
        return {
          success: false,
          error: 'Server error. The backend is experiencing issues. Please check if your Spring Boot server is running properly.',
        };
      } else if (error.response?.status === 401) {
        return {
          success: false,
          error: 'Invalid username or password.',
        };
      } else if (error.response?.status === 400) {
        return {
          success: false,
          error: error.response?.data?.message || 'Invalid input. Please check your credentials.',
        };
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        return {
          success: false,
          error: 'Unable to connect to server. Please check if your Spring Boot server is running on http://localhost:8080.',
        };
      } else {
        return {
          success: false,
          error: error.response?.data?.message || 'Login failed. Please try again.',
        };
      }
    }
  };

  const register = async (username, password) => {
    try {
      const response = await authAPI.register(username, password);
      const userData = {
        id: response.user_id,
        username: response.username,
      };
      
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.access_token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle different error types
      if (error.response?.status === 500) {
        return {
          success: false,
          error: 'Server error. Please try again later or contact support.',
        };
      } else if (error.response?.status === 409) {
        return {
          success: false,
          error: 'Username already exists. Please choose a different username.',
        };
      } else if (error.response?.status === 400) {
        return {
          success: false,
          error: error.response?.data?.message || 'Invalid input. Please check your credentials.',
        };
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        return {
          success: false,
          error: 'Unable to connect to server. Please check your internet connection.',
        };
      } else {
        return {
          success: false,
          error: error.response?.data?.message || 'Registration failed. Please try again.',
        };
      }
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
