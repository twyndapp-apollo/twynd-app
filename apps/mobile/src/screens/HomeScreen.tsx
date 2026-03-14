import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';
import { useUser } from '../context/UserContext';
import { GAME_CONFIG, REACTIONS } from '@twynd/shared/constants';
import { VibesScreen } from './VibesScreen';
import { UsScreen } from './UsScreen';
import { SettingsScreen } from './SettingsScreen';
import { GamesGalleryScreen } from './GamesGalleryScreen';
import { ChatSessionScreen } from './ChatSessionScreen';
import { getChatSessions, upsertChatSession } from '../services/chatStore';
import { getGame } from '../games/registry';
import { getLastAnalysis } from '../services/onDeviceAI';
import type { LocalChatSession, GameQuestion } from '@twynd/shared/types';

type ActiveView = 'home' | 'vibes' | 'us' | 'settings' | 'games' | 'chat';

interface HomeScreenProps {
  initialView?: ActiveView;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ initialView }) => {
  const { user, setCurrentRoomId, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>(initialView ?? 'home');
  const [activeChatSessionId, setActiveChatSessionId] = useState<string | null>(null);

  // Chat sessions loaded from local store
  const [chatSessions, setChatSessions] = useState<LocalChatSession[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Prevent screenshots while in a room (always-on)
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();
    return () => { ScreenCapture.allowScreenCaptureAsync(); };
  }, []);

  // Load sessions on mount and whenever returning to home
  const loadSessions = useCallback(async () => {
    const sessions = await getChatSessions();
    setChatSessions(sessions);
  }, []);

  useEffect(() => {
    if (activeView === 'home') loadSessions();
  }, [activeView, loadSessions]);

  // Filtered + sorted (getChatSessions already sorts by lastMessageAt desc)
  const filteredSessions = searchQuery.trim()
    ? chatSessions.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : chatSessions;

  // ── Navigation helpers ──────────────────────────────────────────────────────

  const navigateTo = (view: ActiveView) => {
    setMenuOpen(false);
    setActiveView(view);
  };

  const openGame = async (gameId: string) => {
    const game = getGame(gameId);
    if (!game) return;

    // Merge templated + AI questions
    const base = game.getTemplatedQuestions();
    const analysis = await getLastAnalysis();
    const extras: GameQuestion[] = analysis?.aiQuestions?.[gameId] ?? [];
    const questions = [...base, ...extras];

    const now = new Date().toISOString();
    const session: LocalChatSession = {
      id: `game_${gameId}_${Date.now()}`,
      title: game.name,
      gameType: gameId,
      gameState: 'my_turn',
      gameQuestions: questions,
      isGameCreator: true,
      lastMessageAt: now,
      lastMessagePreview: `🎮 ${game.name} — your turn`,
      unreadCount: 0,
      createdAt: now,
    };
    await upsertChatSession(session);
    openChat(session.id);
  };

  const openChat = (sessionId: string) => {
    setActiveChatSessionId(sessionId);
    setActiveView('chat');
    setMenuOpen(false);
  };

  // Surface a milestone chat session (called from VibesScreen)
  const handleOpenMilestoneChat = (chatSessionId: string) => {
    loadSessions();
    openChat(chatSessionId);
  };

  // ── Sub-screen renders ──────────────────────────────────────────────────────

  if (activeView === 'vibes') {
    return (
      <VibesScreen
        onBack={() => setActiveView('home')}
        onOpenChat={handleOpenMilestoneChat}
      />
    );
  }

  if (activeView === 'us') {
    return <UsScreen onBack={() => setActiveView('home')} />;
  }

  if (activeView === 'settings') {
    return (
      <SettingsScreen
        onBack={() => setActiveView('home')}
        onLeaveRoom={() => setCurrentRoomId(null)}
        onDeleteAccount={() => logout()}
      />
    );
  }

  if (activeView === 'games') {
    return (
      <GamesGalleryScreen
        onSelectGame={(gameId) => { openGame(gameId); setActiveView('chat'); }}
        onBack={() => setActiveView('home')}
      />
    );
  }

  if (activeView === 'chat' && activeChatSessionId) {
    return (
      <ChatSessionScreen
        sessionId={activeChatSessionId}
        onBack={() => {
          loadSessions();
          setActiveView('home');
        }}
        onGameAnswered={() => {
          loadSessions();
          setActiveView('home');
        }}
      />
    );
  }

  // ── Render helpers ──────────────────────────────────────────────────────────

  const renderChatSession = ({ item }: { item: LocalChatSession }) => {
    const hasUnread = item.unreadCount > 0;
    const time = new Date(item.lastMessageAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return (
      <TouchableOpacity
        style={[styles.chatSessionItem, hasUnread && styles.chatSessionItemUnread]}
        onPress={() => openChat(item.id)}
      >
        <View style={styles.chatSessionInfo}>
          <Text style={[styles.chatSessionTitle, hasUnread && styles.chatSessionTitleUnread]}>
            {item.title}
          </Text>
          {item.lastMessagePreview && (
            <Text
              style={[styles.chatSessionMessage, hasUnread && styles.chatSessionMessageUnread]}
              numberOfLines={1}
            >
              {item.lastMessagePreview}
            </Text>
          )}
        </View>
        {hasUnread && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>{item.unreadCount}</Text>
          </View>
        )}
        <Text style={styles.timestamp}>{time}</Text>
      </TouchableOpacity>
    );
  };

  // ── Home view ───────────────────────────────────────────────────────────────

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

        {/* Search — visible once there's at least 1 session */}
        {chatSessions.length > 0 && (
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search conversations…"
              placeholderTextColor="#bbb"
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
            />
          </View>
        )}

        {filteredSessions.length === 0 && chatSessions.length === 0 ? (
          // Empty State
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💫</Text>
            <Text style={styles.emptyTitle}>Welcome, {user?.nickname}!</Text>
            <Text style={styles.emptyDescription}>
              Tap New to pick a game and start a conversation
            </Text>
          </View>
        ) : (
          // Chat Sessions List
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conversations</Text>
            {filteredSessions.length === 0 ? (
              <Text style={styles.noResults}>No matches for "{searchQuery}"</Text>
            ) : (
              <FlatList
                data={filteredSessions}
                renderItem={renderChatSession}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            )}
          </View>
        )}
      </ScrollView>

      {/* New Button (Floating) — opens Games Gallery */}
      <TouchableOpacity style={styles.newButton} onPress={() => navigateTo('games')}>
        <Text style={styles.newButtonText}>New</Text>
      </TouchableOpacity>

      {/* Hamburger Menu Drawer */}
      {menuOpen && (
        <View style={styles.menuDrawer}>
          {/* Fixed top: logo + nav items */}
          <View style={styles.menuHeader}>
            <Text style={styles.menuLogo}>Twynd</Text>
          </View>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('games')}>
            <Text style={styles.menuItemIcon}>✨</Text>
            <Text style={styles.menuItemText}>New</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('vibes')}>
            <Text style={styles.menuItemIcon}>💫</Text>
            <Text style={styles.menuItemText}>Vibes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('us')}>
            <Text style={styles.menuItemIcon}>👥</Text>
            <Text style={styles.menuItemText}>Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemIcon}>🛍️</Text>
            <Text style={styles.menuItemText}>Affiliate Store</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* Scrollable chat sessions */}
          <ScrollView style={styles.menuScrollArea} showsVerticalScrollIndicator={false}>
            {chatSessions.length > 0 && (
              <>
                <Text style={styles.menuSectionTitle}>Chat Sessions</Text>
                {chatSessions.map((session) => (
                  <TouchableOpacity
                    key={session.id}
                    style={styles.menuItem}
                    onPress={() => openChat(session.id)}
                  >
                    <Text style={styles.sessionIcon}>💬</Text>
                    <View style={styles.menuSessionTextGroup}>
                      <Text style={styles.menuItemText} numberOfLines={1}>
                        {session.title}
                      </Text>
                      {session.unreadCount > 0 && (
                        <View style={styles.menuUnreadDot} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </ScrollView>

          {/* Fixed bottom: settings */}
          <View style={styles.menuDivider} />
          <View style={styles.menuBottom}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('settings')}>
              <Text style={styles.menuItemIcon}>⚙️</Text>
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
          </View>
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
  menuButton: { padding: 8 },
  menuIcon: { fontSize: 24 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#000' },
  notificationButton: { padding: 8 },
  notificationIcon: { fontSize: 20 },

  scrollContent: { paddingHorizontal: 16, paddingVertical: 16 },

  // Search bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ebebeb',
  },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#000', paddingVertical: 10 },
  noResults: { fontSize: 14, color: '#aaa', textAlign: 'center', paddingVertical: 24 },

  // Empty state
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '600', color: '#000', marginBottom: 8 },
  emptyDescription: { fontSize: 14, color: '#666', textAlign: 'center' },

  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#000' },

  // Chat session rows
  chatSessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  chatSessionItemUnread: {
    backgroundColor: '#FFF8EC',
    borderLeftWidth: 3,
    borderLeftColor: '#FF9500',
  },
  chatSessionInfo: { flex: 1 },
  chatSessionTitle: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 4 },
  chatSessionTitleUnread: { color: '#000' },
  chatSessionMessage: { fontSize: 14, color: '#999' },
  chatSessionMessageUnread: { color: '#555', fontWeight: '500' },
  unreadBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingHorizontal: 4,
  },
  unreadCount: { fontSize: 12, fontWeight: '600', color: '#fff' },
  timestamp: { fontSize: 12, color: '#999' },

  // New floating button
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
    shadowColor: '#FF9500',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  newButtonText: { fontSize: 16, fontWeight: '700', color: '#fff' },

  // Menu drawer
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
    flexDirection: 'column',
  },
  menuScrollArea: { flex: 1 },
  menuBottom: {
    paddingBottom: Platform.OS === 'android' ? 24 : 34,
  },
  menuHeader: { paddingHorizontal: 16, paddingVertical: 12 },
  menuLogo: { fontSize: 24, fontWeight: '700', color: '#000' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  menuItemIcon: { fontSize: 20, marginRight: 12, width: 28 },
  sessionIcon: { fontSize: 16, marginRight: 12, width: 28 },
  menuItemText: { fontSize: 16, color: '#000', flex: 1 },
  menuSessionTextGroup: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  menuUnreadDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#FF9500', marginLeft: 6,
  },
  menuDivider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 8 },
  menuSectionTitle: {
    fontSize: 12, fontWeight: '600', color: '#999',
    textTransform: 'uppercase', paddingHorizontal: 16, paddingVertical: 8,
  },
  menuOverlay: {
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 99,
  },
});
