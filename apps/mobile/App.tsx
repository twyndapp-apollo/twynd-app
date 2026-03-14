import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Linking } from 'react-native';
import { UserProvider, useUser } from './src/context/UserContext';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { ProfileSetupScreen } from './src/screens/ProfileSetupScreen';
import { RoomSelectionScreen } from './src/screens/RoomSelectionScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { pushWidgetData, parseDeepLink } from './src/utils/widget';

function AppContent() {
  const { isAuthenticated, isProfileComplete, currentRoomId, session } = useUser();
  const [initialDeepLink, setInitialDeepLink] = useState<string | null>(null);

  // Push latest partner data to widget shared container whenever session is active
  useEffect(() => {
    if (session?.token) pushWidgetData();
  }, [session?.token]);

  // Handle deep links (widget tap → twynd://us)
  useEffect(() => {
    // Check if app was launched from a deep link
    Linking.getInitialURL().then((url) => {
      if (url) setInitialDeepLink(parseDeepLink(url));
    });

    const sub = Linking.addEventListener('url', ({ url }) => {
      setInitialDeepLink(parseDeepLink(url));
    });

    return () => sub.remove();
  }, []);

  if (isAuthenticated && !isProfileComplete) {
    return <ProfileSetupScreen />;
  }

  if (isAuthenticated && isProfileComplete && !currentRoomId) {
    return <RoomSelectionScreen />;
  }

  if (isAuthenticated && isProfileComplete && currentRoomId) {
    // Pass the deep link target so HomeScreen can pre-open the right view
    return <HomeScreen initialView={initialDeepLink === 'us' ? 'us' : undefined} />;
  }

  return <SignUpScreen />;
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
      <StatusBar style="auto" />
    </UserProvider>
  );
}
