import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService from '../services/simpleAuth';
import { AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const authUser = await authService.login(username, password);
      setUser(authUser);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData: any) => {
    try {
      const authUser = await authService.signup(userData);
      setUser(authUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const authUser = await authService.signInWithGoogle();
      setUser(authUser);
    } catch (error) {
      throw error;
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        signInWithGoogle,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
