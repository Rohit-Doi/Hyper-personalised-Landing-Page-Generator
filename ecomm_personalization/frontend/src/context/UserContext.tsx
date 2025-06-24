'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  name?: string;
  email?: string;
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    language?: string;
    [key: string]: any;
  };
  profile?: {
    ageGroup?: string;
    gender?: string;
    location?: string;
    [key: string]: any;
  };
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  login: (userData: Partial<User>) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();

  // Load user from localStorage on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        // In a real app, you might fetch the user from an API or auth service
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        setError(err instanceof Error ? err : new Error('Failed to load user'));
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData: Partial<User>) => {
    // In a real app, you would validate credentials with your backend
    const newUser = {
      id: userData.id || 'anonymous',
      ...userData,
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    // Invalidate any queries that depend on user data
    queryClient.invalidateQueries({ queryKey: ['recommendations'] });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    // Clear all queries on logout
    queryClient.clear();
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      ...updates,
      preferences: {
        ...user.preferences,
        ...updates.preferences,
      },
      profile: {
        ...user.profile,
        ...updates.profile,
      },
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Invalidate queries that depend on user data
    queryClient.invalidateQueries({ queryKey: ['recommendations'] });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
