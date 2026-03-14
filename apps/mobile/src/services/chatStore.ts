/**
 * chatStore.ts — local-only chat persistence.
 * Chat sessions and messages live entirely on-device (never sent to server).
 * The server WebSocket relays messages in real-time; this store is the durable layer.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@twynd/shared/constants';
import type { LocalChatSession, LocalChatMessage } from '@twynd/shared/types';

// ─── Sessions ────────────────────────────────────────────────────────────────

export async function getChatSessions(): Promise<LocalChatSession[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.CHAT_SESSIONS);
  if (!raw) return [];
  const sessions: LocalChatSession[] = JSON.parse(raw);
  // Always return sorted newest-last-message first
  return sessions.sort(
    (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
  );
}

export async function getChatSession(sessionId: string): Promise<LocalChatSession | null> {
  const sessions = await getChatSessions();
  return sessions.find((s) => s.id === sessionId) ?? null;
}

export async function upsertChatSession(session: LocalChatSession): Promise<void> {
  const sessions = await getChatSessions();
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.unshift(session);
  }
  await AsyncStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(sessions));
}

export async function deleteChatSession(sessionId: string): Promise<void> {
  const sessions = await getChatSessions();
  const filtered = sessions.filter((s) => s.id !== sessionId);
  await AsyncStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(filtered));
  // Also remove messages
  await AsyncStorage.removeItem(STORAGE_KEYS.CHAT_MESSAGES_PREFIX + sessionId);
}

export async function searchChatSessions(query: string): Promise<LocalChatSession[]> {
  if (!query.trim()) return getChatSessions();
  const sessions = await getChatSessions();
  const q = query.toLowerCase();
  return sessions.filter((s) => s.title.toLowerCase().includes(q));
}

// ─── Messages ────────────────────────────────────────────────────────────────

export async function getMessages(sessionId: string): Promise<LocalChatMessage[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES_PREFIX + sessionId);
  if (!raw) return [];
  return JSON.parse(raw) as LocalChatMessage[];
}

export async function addMessage(message: LocalChatMessage): Promise<void> {
  const messages = await getMessages(message.sessionId);
  messages.push(message);
  await AsyncStorage.setItem(
    STORAGE_KEYS.CHAT_MESSAGES_PREFIX + message.sessionId,
    JSON.stringify(messages),
  );

  // Update the session's lastMessageAt, preview, and unread count
  const session = await getChatSession(message.sessionId);
  if (session) {
    const isMine = message.senderId === 'me';  // caller sets 'me' for own messages
    await upsertChatSession({
      ...session,
      lastMessageAt: message.timestamp,
      lastMessagePreview: message.contentType === 'game_result'
        ? '🎮 Game result'
        : message.text.slice(0, 60),
      unreadCount: isMine ? session.unreadCount : session.unreadCount + 1,
    });
  }
}

export async function markMessagesRead(sessionId: string, myUserId: string): Promise<void> {
  const messages = await getMessages(sessionId);
  const updated = messages.map((m) =>
    m.senderId !== myUserId && !m.isRead ? { ...m, isRead: true } : m,
  );
  await AsyncStorage.setItem(
    STORAGE_KEYS.CHAT_MESSAGES_PREFIX + sessionId,
    JSON.stringify(updated),
  );

  // Zero out unread counter on session
  const session = await getChatSession(sessionId);
  if (session) {
    await upsertChatSession({ ...session, unreadCount: 0 });
  }
}

// ─── Session factory helpers ──────────────────────────────────────────────────

export function createGameSession(gameId: string, gameTitle: string): LocalChatSession {
  const now = new Date().toISOString();
  return {
    id: `game_${gameId}_${Date.now()}`,
    title: gameTitle,
    gameType: gameId,
    lastMessageAt: now,
    unreadCount: 0,
    createdAt: now,
  };
}

export function createMilestoneSession(milestoneId: string, milestoneTitle: string): LocalChatSession {
  const now = new Date().toISOString();
  return {
    id: `milestone_${milestoneId}_${Date.now()}`,
    title: milestoneTitle,
    milestoneId,
    lastMessageAt: now,
    unreadCount: 0,
    createdAt: now,
  };
}

// ─── Clear (called on logout / leave room) ───────────────────────────────────

export async function clearAllChatData(): Promise<void> {
  const sessions = await getChatSessions();
  const keys = [
    STORAGE_KEYS.CHAT_SESSIONS,
    ...sessions.map((s) => STORAGE_KEYS.CHAT_MESSAGES_PREFIX + s.id),
  ];
  await AsyncStorage.multiRemove(keys);
}
