import { useState, useEffect, useCallback } from 'react';
import TokenManager from '../services/tokenManager';

interface UseTokenReturn {
  isLoggedIn: boolean;
  userRole: string | null;
  userEmail: string | null;
  login: (tokenData: {
    accessToken: string;
    refreshToken: string;
    role: string;
    email: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
  checkAuthStatus: () => Promise<void>;
  isLoading: boolean;
}

export const useToken = (): UseTokenReturn => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      await TokenManager.initialize();
      const loggedIn = TokenManager.isLoggedIn;
      const role = TokenManager.userRole;
      const email = TokenManager.email;

      setIsLoggedIn(loggedIn);
      setUserRole(role);
      setUserEmail(email);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
      setUserRole(null);
      setUserEmail(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (tokenData: {
    accessToken: string;
    refreshToken: string;
    role: string;
    email: string;
  }) => {
    await TokenManager.saveTokens(tokenData);
    setIsLoggedIn(true);
    setUserRole(tokenData.role);
    setUserEmail(tokenData.email);
  }, []);

  const logout = useCallback(async () => {
    await TokenManager.logout();
    setIsLoggedIn(false);
    setUserRole(null);
    setUserEmail(null);
  }, []);

  const refreshToken = useCallback(async () => {
    return await TokenManager.forceRefresh();
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    isLoggedIn,
    userRole,
    userEmail,
    login,
    logout,
    refreshToken,
    checkAuthStatus,
    isLoading,
  };
};

export default useToken;
