import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { UserProvider, useUser } from './src/context/UserContext';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { ProfileSetupScreen } from './src/screens/ProfileSetupScreen';
import { RoomSelectionScreen } from './src/screens/RoomSelectionScreen';
import { HomeScreen } from './src/screens/HomeScreen';

function AppContent() {
  const { isAuthenticated, isProfileComplete, currentRoomId, isLoading } = useUser();

  // Show profile setup for new users
  if (isAuthenticated && !isProfileComplete) {
    return <ProfileSetupScreen />;
  }

  // Show room selection after profile but no connection
  if (isAuthenticated && isProfileComplete && !currentRoomId) {
    return <RoomSelectionScreen />;
  }

  // Show home once everything is set up
  if (isAuthenticated && isProfileComplete && currentRoomId) {
    return <HomeScreen />;
  }

  // Default to signup
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
