import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@shared/types';
import { USER_PROFILE } from '@/lib/mock-data';
const AUTH_KEY = 'finnexus_auth_session';
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setIsLoading(false);
  }, []);
  const login = useCallback((email: string) => {
    const sessionUser: User = {
      ...USER_PROFILE,
      email: email,
      role: 'admin',
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    setIsAuthenticated(true);
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  }, [navigate]);
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };
}