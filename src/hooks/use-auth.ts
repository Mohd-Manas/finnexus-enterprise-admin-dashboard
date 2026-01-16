import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '@shared/types';
import { USER_PROFILE } from '@/lib/mock-data';
const AUTH_KEY = 'skylinks_terminal_session';
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
        if (parsed && typeof parsed === 'object' && parsed.id) {
          setUser(parsed);
          setIsAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setIsLoading(false);
  }, []);
  const login = useCallback((email: string, role: UserRole = 'admin') => {
    // Robust identifier fallback for guests or empty strings
    const effectiveEmail = email?.trim() || (role === 'guest' ? 'guest-node@skylinkscapital.com' : 'a.vance@skylinkscapital.com');
    const sessionUser: User = {
      ...USER_PROFILE,
      id: role === 'guest' ? `guest-${crypto.randomUUID().slice(0, 8)}` : USER_PROFILE.id,
      name: role === 'guest' ? `Guest Collaborator` : "Alexander Vance",
      email: effectiveEmail,
      role: role,
      status: 'active',
      avatar: role === 'admin' 
        ? USER_PROFILE.avatar 
        : `https://ui-avatars.com/api/?name=Guest&background=0F172A&color=fff`,
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