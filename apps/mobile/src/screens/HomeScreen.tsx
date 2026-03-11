import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { GAME_CONFIG, REACTIONS } from '@twynd/shared/constants';

interface ChatSession {
  id: string;
  title: string;
  lastMessage?: string;
  unreadCount: number;
  timestamp: Date;
}

export const HomeScreen: React.FC = () => {
  const { user } = useUser();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStartGame = (gameType: string) => {
    // Create new chat session with game
    const newSession: ChatSession = {
      id: `session_${Date.now()}`,
      title: GAME_CONFIG[gameType as keyof typeof GAME_CONFIG]?.name || gameType,
      unreadCount: 0,
      timestamp: new Date(),
    };
    setChatSessions([newSession, ...chatSessions]);
  };

  const handleChatSessionPress = (session: ChatSession) => {
    // Navigate to chat screen
    console.log('Chat session:', session.id);
  };

  const renderGameItem = ({ item, index }: { item: [string, any]; index: number }) => {
    const [gameKey, gameConfig] = item;
    return (
      <TouchableOpacity
        style={styles.gameCard}
        onPress={() => handleStartGame(gameKey)}
      >
        <Text style={styles.gameIcon}>{gameConfig.icon}</Text>
        <Text style={styles.gameName}>{gameConfig.name}</Text>
        <Text style={styles.gameDescription}>{gameConfig.description}</Text>
      </TouchableOpacity>
    );
  };

  const renderChatSession = ({ item }: { item: ChatSession }) => (
    <TouchableOpacity
      style={styles.chatSessionItem}
      onPress={() => handleChatSessionPress(item)}
    >
      <View style={styles.chatSessionInfo}>
        <Text style={styles.chatSessionTitle}>{item.title}</Text>
        {item.lastMessage && (
          <Text style={styles.chatSessionMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        )}
      </View>
      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unreadCount}</Text>
        </View>
      )}
      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Twynd</Text>

        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {chatSessions.length === 0 ? (
          // Empty State
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💫</Text>
            <Text style={styles.emptyTitle}>Welcome, {user?.nickname}!</Text>
            <Text style={styles.emptyDescription}>
              Start a game or conversation to deepen your connection
            </Text>
          </View>
        ) : (
          // Chat Sessions List
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Conversations</Text>
            <FlatList
              data={chatSessions}
              renderItem={renderChatSession}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Games Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Games</Text>
          <FlatList
            data={Object.entries(GAME_CONFIG)}
            renderItem={renderGameItem}
            keyExtractor={([key]) => key}
            numColumns={2}
            columnWrapperStyle={styles.gameGrid}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* New Button (Floating) */}
      <TouchableOpacity style={styles.newButton}>
        <Text style={styles.newButtonText}>New</Text>
      </TouchableOpacity>

      {/* Hamburger Menu Drawer */}
      {menuOpen && (
        <View style={styles.menuDrawer}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuLogo}>Twynd</Text>
          </View>

          {/* Menu Items */}
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemIcon}>✨</Text>
            <Text style={styles.menuItemText}>New</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemIcon}>💫</Text>
            <Text style={styles.menuItemText}>Vibes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemIcon}>👥</Text>
            <Text style={styles.menuItemText}>Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemIcon}>🛍️</Text>
            <Text style={styles.menuItemText}>Affiliate Store</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.menuDivider} />

          {/* Chat Sessions in Menu */}
          {chatSessions.length > 0 && (
            <>
              <Text style={styles.menuSectionTitle}>Chat Sessions</Text>
              {chatSessions.map((session) => (
                <TouchableOpacity
                  key={session.id}
                  style={styles.menuItem}
                  onPress={() => handleChatSessionPress(session)}
                >
                  <Text style={styles.sessionIcon}>💬</Text>
                  <Text style={styles.menuItemText} numberOfLines={1}>
                    {session.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* Divider */}
          <View style={styles.menuDivider} />

          {/* Settings */}
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemIcon}>⚙️</Text>
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Overlay to close menu */}
      {menuOpen && (
        <TouchableOpacity
          style={styles.menuOverlay}
          onPress={() => setMenuOpen(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingTop: 12,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    fontSize: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  gameCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginHorizontal: 6,
    marginBottom: 12,
  },
  gameGrid: {
    gap: 0,
  },
  gameIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  gameName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  chatSessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  chatSessionInfo: {
    flex: 1,
  },
  chatSessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  chatSessionMessage: {
    fontSize: 14,
    color: '#999',
  },
  unreadBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  newButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#FF9500',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  menuDrawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '75%',
    height: '100%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
    paddingTop: 16,
    zIndex: 100,
  },
  menuHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuLogo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 28,
  },
  sessionIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 28,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  menuSectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 99,
  },
});
