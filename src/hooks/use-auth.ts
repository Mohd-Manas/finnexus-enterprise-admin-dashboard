import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '@shared/types';
import { USER_PROFILE } from '@/lib/mock-data';
const AUTH_KEY = 'skylinks_terminal_session';
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const initRef = useRef(false);
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as User;
        // Verify minimum data integrity for session to prevent application crashes
        if (parsed && typeof parsed === 'object' && parsed.id && parsed.role) {
          setUser(parsed);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(AUTH_KEY);
        }
      } catch (e) {
        console.error("Auth session corrupted, purging session data...", e);
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setIsLoading(false);
  }, []);
  const login = useCallback((email: string, role: UserRole = 'admin') => {
    const sanitizedEmail = email?.trim().toLowerCase() || (role === 'guest' ? 'guest-node@skylinkscapital.com' : 'admin@skylinkscapital.com');
    // Construct identity object with consistent corporate branding and fallback defaults
    const sessionUser: User = {
      ...USER_PROFILE,
      id: role === 'guest' ? `guest-${crypto.randomUUID().split('-')[0]}` : USER_PROFILE.id,
      name: role === 'guest' ? `Guest Collaborator` : (USER_PROFILE.name || "Alexander Vance"),
      email: sanitizedEmail,
      role: role,
      status: 'active',
      avatar: role === 'admin'
        ? (USER_PROFILE.avatar || `https://ui-avatars.com/api/?name=Admin&background=020B4B&color=fff&bold=true`)
        : `https://ui-avatars.com/api/?name=Guest+Collab&background=020B4B&color=fff&bold=true`,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    setIsAuthenticated(true);
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  }, [navigate]);
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };
}