import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearAllChatData } from '../services/chatStore';
import { clearLocalProfileData } from '../services/localProfile';
import { UserProfile, UserSession } from '@twynd/shared/types';
import { STORAGE_KEYS } from '@twynd/shared/constants';
import { EXTERNAL_LINKS } from '@twynd/shared/constants';

interface UserContextType {
  // Auth
  user: UserProfile | null;
  session: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Auth methods
  signUp: (email: string, authProvider: string) => Promise<void>;
  signIn: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  
  // Profile
  setUser: (user: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  
  // Room/Connection
  currentRoomId: string | null;
  setCurrentRoomId: (roomId: string | null) => void;
  
  isProfileComplete: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Helper function to fetch with timeout
const fetchWithTimeout = async (url: string, options: any = {}, timeoutMs: number = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeoutMs}ms. Is the server running? Check your API URL.`);
    }
    throw error;
  }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<UserSession | null>(null);
  const [currentRoomId, setCurrentRoomIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from storage on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      const storedRoomId = await AsyncStorage.getItem(STORAGE_KEYS.ROOM_CODE);

      if (storedToken && storedUser) {
        setSession(JSON.parse(storedToken));
        setUserState(JSON.parse(storedUser));
      }
      
      if (storedRoomId) {
        setCurrentRoomIdState(storedRoomId);
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = useCallback(async (email: string, authProvider: string) => {
    setIsLoading(true);
    try {
      const apiUrl = EXTERNAL_LINKS.SERVER_API;
      console.log('🚀 Signing up with API URL:', apiUrl);
      const response = await fetchWithTimeout(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, authProvider }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Sign up failed');
      }

      const data = await response.json();
      console.log('✅ Sign up successful:', data.user);

      // Transform server response to UserProfile
      const userProfile: UserProfile = {
        ...data.user,
        language: data.user.language || 'English',
      };

      const userSession: UserSession = {
        userId: data.user.id,
        token: data.token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };

      setUserState(userProfile);
      setSession(userSession);

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.USER_TOKEN, JSON.stringify(userSession)],
        [STORAGE_KEYS.USER_DATA, JSON.stringify(userProfile)],
      ]);
    } catch (error) {
      console.error('❌ Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      const apiUrl = EXTERNAL_LINKS.SERVER_API;
      console.log('🚀 Signing in with API URL:', apiUrl);
      const response = await fetchWithTimeout(`${apiUrl}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Sign in failed');
      }

      const data = await response.json();
      console.log('✅ Sign in successful:', data.user);

      // Transform server response to UserProfile
      const userProfile: UserProfile = {
        ...data.user,
        language: data.user.language || 'English',
      };

      const userSession: UserSession = {
        userId: data.user.id,
        token: data.token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };

      setUserState(userProfile);
      setSession(userSession);

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.USER_TOKEN, JSON.stringify(userSession)],
        [STORAGE_KEYS.USER_DATA, JSON.stringify(userProfile)],
      ]);
    } catch (error) {
      console.error('❌ Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      setUserState(null);
      setSession(null);
      setCurrentRoomIdState(null);

      await Promise.all([
        AsyncStorage.multiRemove([
          STORAGE_KEYS.USER_TOKEN,
          STORAGE_KEYS.USER_DATA,
          STORAGE_KEYS.ROOM_CODE,
          STORAGE_KEYS.AI_ANALYSIS,
          STORAGE_KEYS.AI_ANALYSIS_DATE,
        ]),
        clearAllChatData(),
        clearLocalProfileData(),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setUser = useCallback((updatedUser: UserProfile) => {
    setUserState(updatedUser);
    AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user || !session) return;
    
    try {
      const apiUrl = EXTERNAL_LINKS.SERVER_API;
      const response = await fetchWithTimeout(`${apiUrl}/users/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const data = await response.json();
      const updatedUser: UserProfile = { ...user, ...data, ...updates };
      
      setUser(updatedUser);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
    } catch (error) {
      throw error;
    }
  }, [user, session, setUser]);

  const setCurrentRoomId = useCallback((roomId: string | null) => {
    setCurrentRoomIdState(roomId);
    if (roomId) {
      AsyncStorage.setItem(STORAGE_KEYS.ROOM_CODE, roomId);
    } else {
      AsyncStorage.removeItem(STORAGE_KEYS.ROOM_CODE);
    }
  }, []);

  const isProfileComplete = 
    user !== null &&
    user.nickname !== null &&
    user.nickname.length > 0 &&
    user.avatar !== null &&
    user.avatar.length > 0;

  const value: UserContextType = {
    user,
    session,
    isAuthenticated: session !== null,
    isLoading,
    signUp,
    signIn,
    logout,
    setUser,
    updateProfile,
    currentRoomId,
    setCurrentRoomId,
    isProfileComplete,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
