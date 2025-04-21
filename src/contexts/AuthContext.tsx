import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5000";
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenExpiryTimer, setTokenExpiryTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Using localStorage here, but in production consider using more secure options like HTTP-only cookies
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      
      // Set up axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      
      // Set up token expiry (2 hours)
      setupTokenExpiryTimer();
    }
    
    setIsLoading(false);
  }, []);
  
  const setupTokenExpiryTimer = () => {
    // Clear any existing timer
    if (tokenExpiryTimer) {
      clearTimeout(tokenExpiryTimer);
    }
    
    // Set a new timer for 2 hours
    const timer = setTimeout(() => {
      logout();
    }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
    
    setTokenExpiryTimer(timer);
  };
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Set token and user
      setToken(token);
      setUser(user);
      
      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set up axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Set up token expiry timer
      setupTokenExpiryTimer();
    } catch (err) {
      console.error('Login error:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Invalid email or password');
      } else {
        setError('An error occurred during login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      // Set token and user
      setToken(token);
      setUser(user);
      
      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set up axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Set up token expiry timer
      setupTokenExpiryTimer();
    } catch (err) {
      console.error('Registration error:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Registration failed');
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    // Clear user and token
    setUser(null);
    setToken(null);
    
    // Remove from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear axios default headers
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear token expiry timer
    if (tokenExpiryTimer) {
      clearTimeout(tokenExpiryTimer);
      setTokenExpiryTimer(null);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};