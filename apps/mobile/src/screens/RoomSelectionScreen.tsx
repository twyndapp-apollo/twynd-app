import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { generateRoomCode, generateQRCodeUrl } from '@twynd/shared/utils';

interface RoomSelectionScreenProps {
  onComplete?: () => void;
}

export const RoomSelectionScreen: React.FC<RoomSelectionScreenProps> = ({ onComplete }) => {
  const { user, setCurrentRoomId } = useUser();
  const [mode, setMode] = useState<'select' | 'create' | 'join' | null>(null);
  const [loading, setLoading] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [createdRoom, setCreatedRoom] = useState<{ code: string; qrUrl: string } | null>(null);

  const handleCreateRoom = async () => {
    setLoading(true);
    try {
      // Generate room code
      const code = generateRoomCode();
      const qrData = `twynd://room/${code}`;
      const qrUrl = generateQRCodeUrl(qrData);

      setCreatedRoom({ code, qrUrl });
      setCurrentRoomId(code);

      // TODO: Call API to create room in backend
      // await roomApi.createRoom(session?.token)
    } catch (error) {
      Alert.alert('Error', 'Failed to create room. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!roomCode.trim()) {
      Alert.alert('Error', 'Please enter a room code');
      return;
    }

    setLoading(true);
    try {
      // TODO: Call API to join room
      // const response = await roomApi.joinRoom(session?.token, roomCode);
      setCurrentRoomId(roomCode);
      onComplete?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to join room. Please check the code and try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Selection Screen
  if (!mode) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Let's Connect</Text>
          <Text style={styles.subtitle}>
            {user?.nickname}, choose what you'd like to do
          </Text>

          {/* Create Room Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => setMode('create')}
          >
            <Text style={styles.cardIcon}>✨</Text>
            <Text style={styles.cardTitle}>Create Room</Text>
            <Text style={styles.cardDescription}>
              Start a new connection and share your QR code
            </Text>
            <Text style={styles.cardNote}>Free once per day</Text>
          </TouchableOpacity>

          {/* Join Room Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => setMode('join')}
          >
            <Text style={styles.cardIcon}>🔗</Text>
            <Text style={styles.cardTitle}>Join Room</Text>
            <Text style={styles.cardDescription}>
              Scan a QR code or enter a room code
            </Text>
            <Text style={styles.cardNote}>Unlimited joins</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Create Room Screen
  if (mode === 'create') {
    if (createdRoom) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Room Created!</Text>
            <Text style={styles.subtitle}>
              Share this QR code with your partner
            </Text>

            {/* QR Code Display */}
            <View style={styles.qrContainer}>
              <Image
                source={{ uri: createdRoom.qrUrl }}
                style={styles.qrImage}
              />
            </View>

            {/* Room Code */}
            <View style={styles.codeBox}>
              <Text style={styles.codeLabel}>Room Code</Text>
              <Text style={styles.code}>{createdRoom.code}</Text>
            </View>

            {/* Share Options */}
            <Text style={styles.sectionTitle}>Share Via</Text>
            <View style={styles.shareButtons}>
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareIcon}>📱</Text>
                <Text style={styles.shareText}>Messenger</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareIcon}>👍</Text>
                <Text style={styles.shareText}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareIcon}>🎵</Text>
                <Text style={styles.shareText}>TikTok</Text>
              </TouchableOpacity>
            </View>

            {/* Info */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                ⏰ Your room will be active for 24 hours. Once someone scans the QR code or enters the room code, their profile will appear here.
              </Text>
            </View>

            {/* Complete Button */}
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => {
                // Show waiting screen
                setMode('waiting');
              }}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            {/* Back Button */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                setMode(null);
                setCreatedRoom(null);
              }}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Create a Room</Text>
          <Text style={styles.subtitle}>
            Get a unique room to connect with your partner
          </Text>

          {/* Info */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              📌 You can create one room for free per day. After approaching the limit, you'll need a subscription.
            </Text>
          </View>

          {/* Create Button */}
          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleCreateRoom}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Generate QR Code</Text>
            )}
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setMode(null)}
          >
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Join Room Screen
  if (mode === 'join') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Join a Room</Text>
          <Text style={styles.subtitle}>
            Enter the code or scan the QR code
          </Text>

          {/* Room Code Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Room Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 8-character code"
              placeholderTextColor="#999"
              value={roomCode}
              onChangeText={(text) => setRoomCode(text.toUpperCase())}
              maxLength={8}
              autoCapitalize="characters"
              editable={!loading}
            />
          </View>

          {/* Scan QR Option */}
          <TouchableOpacity style={styles.qrScanButton}>
            <Text style={styles.qrScanIcon}>📷</Text>
            <Text style={styles.qrScanText}>Scan QR Code</Text>
          </TouchableOpacity>

          {/* Info */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              🔍 Your partner will see your profile when you join. You can accept or decline the connection.
            </Text>
          </View>

          {/* Join Button */}
          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              (!roomCode || loading) && styles.buttonDisabled,
            ]}
            onPress={handleJoinRoom}
            disabled={!roomCode || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Join Room</Text>
            )}
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setMode(null)}
          >
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Waiting Screen
  if (mode === 'waiting') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.pulseContainer}>
            <Text style={styles.waitingIcon}>⏳</Text>
          </View>

          <Text style={styles.title}>Waiting for Your Partner</Text>
          <Text style={styles.subtitle}>
            Scan the QR code or share the room code to connect
          </Text>

          <View style={styles.timerBox}>
            <Text style={styles.timerText}>23:45</Text>
            <Text style={styles.timerLabel}>Time remaining</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              ✨ When your partner joins, you'll see their profile and can choose to accept or decline the connection.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              setMode(null);
              setCreatedRoom(null);
            }}
          >
            <Text style={styles.secondaryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardNote: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  qrContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  qrImage: {
    width: 250,
    height: 250,
    borderRadius: 8,
  },
  codeBox: {
    backgroundColor: '#e8f4ff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#bbd9f0',
    alignItems: 'center',
  },
  codeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  code: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    letterSpacing: 2,
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    justifyContent: 'space-around',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  shareIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  shareText: {
    fontSize: 12,
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#fffbea',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  qrScanButton: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  qrScanIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  qrScanText: {
    fontSize: 16,
    color: '#333',
  },
  pulseContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  waitingIcon: {
    fontSize: 80,
  },
  timerBox: {
    backgroundColor: '#e8f4ff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#007AFF',
  },
  timerLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});
