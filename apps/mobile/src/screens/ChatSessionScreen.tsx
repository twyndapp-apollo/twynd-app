/**
 * ChatSessionScreen — full chat UI for a single session.
 *
 * Layout (top → bottom):
 *   Header (title + back)
 *   Game result card (if session has a game result message)
 *   ↳ Reaction row directly under result card
 *   Message list (FlatList, inverted so newest at bottom)
 *   Text input (200 char max)
 *
 * Messages from me → right-aligned blue bubble
 * Messages from partner → left-aligned grey bubble
 * Sessions with unread messages arrive highlighted; reading marks them read.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { REACTION_LIST, VALIDATION_RULES } from '@twynd/shared/constants';
import type { LocalChatMessage, LocalChatSession } from '@twynd/shared/types';
import {
  getMessages,
  addMessage,
  markMessagesRead,
  getChatSession,
} from '../services/chatStore';
import { partnerSync } from '../services/partnerSync';
import { useUser } from '../context/UserContext';

interface ChatSessionScreenProps {
  sessionId: string;
  onBack: () => void;
}

export const ChatSessionScreen: React.FC<ChatSessionScreenProps> = ({ sessionId, onBack }) => {
  const { user } = useUser();
  const myId = user?.id ?? 'me';

  const [session, setSession] = useState<LocalChatSession | null>(null);
  const [messages, setMessages] = useState<LocalChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [reactionMap, setReactionMap] = useState<Record<string, string>>({});  // msgId → emoji

  const flatListRef = useRef<FlatList>(null);

  // Load session + messages, mark as read
  useEffect(() => {
    const load = async () => {
      const [sess, msgs] = await Promise.all([
        getChatSession(sessionId),
        getMessages(sessionId),
      ]);
      setSession(sess);
      setMessages(msgs);
      await markMessagesRead(sessionId, myId);
    };
    load();
  }, [sessionId, myId]);

  // Listen for incoming partner messages
  useEffect(() => {
    const unsub = partnerSync.addListener(async (msg) => {
      if (msg.type !== 'chat_message') return;
      const { targetSessionId, text, contentType, messageId, timestamp } = msg.payload as {
        targetSessionId: string;
        text: string;
        contentType: 'text' | 'game_result';
        messageId: string;
        timestamp: string;
      };
      if (targetSessionId !== sessionId) return;

      const incoming: LocalChatMessage = {
        id: messageId,
        sessionId,
        senderId: msg.senderId ?? 'partner',
        text,
        contentType,
        timestamp,
        isRead: true,  // already open in this screen
      };
      await addMessage(incoming);
      setMessages((prev) => [...prev, incoming]);
    });
    return unsub;
  }, [sessionId]);

  const sendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text || sending) return;
    setSending(true);

    const msg: LocalChatMessage = {
      id: `msg_${Date.now()}`,
      sessionId,
      senderId: myId,
      text,
      contentType: 'text',
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    await addMessage(msg);
    setMessages((prev) => [...prev, msg]);
    setInputText('');

    // Relay to partner via WebSocket
    partnerSync.sendRaw('chat_message', {
      targetSessionId: sessionId,
      text,
      contentType: 'text',
      messageId: msg.id,
      timestamp: msg.timestamp,
    });

    setSending(false);
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, [inputText, sending, sessionId, myId]);

  const toggleReaction = (msgId: string, emoji: string) => {
    setReactionMap((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === emoji ? '' : emoji,
    }));
  };

  // Separate game result message (pinned above thread)
  const gameResultMsg = messages.find((m) => m.contentType === 'game_result');
  const chatMessages = messages.filter((m) => m.contentType !== 'game_result');

  const renderMessage = ({ item }: { item: LocalChatMessage }) => {
    const isMine = item.senderId === myId;
    const time = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
      <View style={[styles.messagRow, isMine ? styles.messageRowMe : styles.messageRowPartner]}>
        <View style={[styles.bubble, isMine ? styles.bubbleMe : styles.bubblePartner]}>
          <Text style={[styles.bubbleText, isMine ? styles.bubbleTextMe : styles.bubbleTextPartner]}>
            {item.text}
          </Text>
        </View>
        <Text style={[styles.messageTime, isMine ? styles.timeRight : styles.timeLeft]}>{time}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {session?.title ?? '…'}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={chatMessages}
          renderItem={renderMessage}
          keyExtractor={(m) => m.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          ListHeaderComponent={
            gameResultMsg?.gameResultData ? (
              <GameResultCard
                gameResult={gameResultMsg.gameResultData}
                messageId={gameResultMsg.id}
                reactionMap={reactionMap}
                onReaction={toggleReaction}
              />
            ) : null
          }
        />

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Message…"
            placeholderTextColor="#bbb"
            value={inputText}
            onChangeText={setInputText}
            maxLength={VALIDATION_RULES.CHAT_MESSAGE_MAX_LENGTH}
            multiline
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!inputText.trim() || sending) && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim() || sending}
          >
            <Text style={styles.sendBtnText}>↑</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.charHint}>{inputText.length}/{VALIDATION_RULES.CHAT_MESSAGE_MAX_LENGTH}</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── Game Result Card ─────────────────────────────────────────────────────────

interface GameResultCardProps {
  gameResult: NonNullable<LocalChatMessage['gameResultData']>;
  messageId: string;
  reactionMap: Record<string, string>;
  onReaction: (msgId: string, emoji: string) => void;
}

const GameResultCard: React.FC<GameResultCardProps> = ({
  gameResult,
  messageId,
  reactionMap,
  onReaction,
}) => {
  const [expanded, setExpanded] = useState(false);
  const myReaction = reactionMap[messageId];

  return (
    <View style={styles.resultCard}>
      <View style={styles.resultCardHeader}>
        <Text style={styles.resultCardTitle}>🎮 Game Result</Text>
        <View style={styles.resultScoreBadge}>
          <Text style={styles.resultScoreText}>{gameResult.matchScore}% Match</Text>
        </View>
      </View>

      <Text style={styles.resultCardGame}>{gameResult.gameType.replace(/_/g, ' ')}</Text>

      {/* Reactions row */}
      <View style={styles.resultReactionsRow}>
        {REACTION_LIST.map((emoji) => (
          <TouchableOpacity
            key={emoji}
            style={[styles.resultReactionBtn, myReaction === emoji && styles.resultReactionBtnActive]}
            onPress={() => onReaction(messageId, emoji)}
          >
            <Text style={styles.resultReactionEmoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Toggle Q&A */}
      <TouchableOpacity style={styles.resultExpandBtn} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.resultExpandText}>{expanded ? 'Hide answers ▲' : 'See answers ▼'}</Text>
      </TouchableOpacity>

      {expanded && gameResult.questions.map((q) => {
        const mine = gameResult.myAnswers[q.id] ?? '—';
        const theirs = gameResult.partnerAnswers[q.id] ?? '—';
        const match = mine !== '—' && theirs !== '—' && mine.toLowerCase() === theirs.toLowerCase();
        return (
          <View key={q.id} style={[styles.qaRow, match && styles.qaRowMatch]}>
            <Text style={styles.qaQ} numberOfLines={2}>{q.question}</Text>
            <View style={styles.qaAns}>
              <Text style={styles.qaAnsLabel}>You: <Text style={styles.qaAnsVal}>{mine}</Text></Text>
              <Text style={styles.qaAnsLabel}>Partner: <Text style={styles.qaAnsVal}>{theirs}</Text></Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  backButton: { padding: 8 },
  backIcon: { fontSize: 22, color: '#007AFF' },
  headerTitle: {
    flex: 1, fontSize: 17, fontWeight: '700',
    color: '#000', textAlign: 'center',
  },
  headerSpacer: { width: 38 },

  messageList: { padding: 12, paddingBottom: 8 },
  messagRow: { marginBottom: 8, maxWidth: '80%' },
  messageRowMe: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  messageRowPartner: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: { borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10 },
  bubbleMe: { backgroundColor: '#007AFF', borderBottomRightRadius: 4 },
  bubblePartner: { backgroundColor: '#f0f0f0', borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 15, lineHeight: 20 },
  bubbleTextMe: { color: '#fff' },
  bubbleTextPartner: { color: '#000' },
  messageTime: { fontSize: 10, color: '#bbb', marginTop: 3 },
  timeRight: { textAlign: 'right' },
  timeLeft: { textAlign: 'left' },

  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end',
    paddingHorizontal: 12, paddingTop: 8, paddingBottom: 4,
    borderTopWidth: 1, borderTopColor: '#f0f0f0',
    gap: 8,
  },
  input: {
    flex: 1, backgroundColor: '#f5f5f5', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 10, fontSize: 15,
    color: '#000', maxHeight: 100,
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#007AFF', alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#ccc' },
  sendBtnText: { fontSize: 20, color: '#fff', fontWeight: '700', lineHeight: 22 },
  charHint: { fontSize: 10, color: '#ccc', textAlign: 'right', paddingRight: 14, paddingBottom: 6 },

  // Game result card
  resultCard: {
    backgroundColor: '#fffbea', borderRadius: 16, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: '#FFE58040',
  },
  resultCardHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 4,
  },
  resultCardTitle: { fontSize: 15, fontWeight: '700', color: '#000' },
  resultScoreBadge: {
    backgroundColor: '#FF9500', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  resultScoreText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  resultCardGame: { fontSize: 13, color: '#888', marginBottom: 12, textTransform: 'capitalize' },
  resultReactionsRow: {
    flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap',
  },
  resultReactionBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: '#eee',
  },
  resultReactionBtnActive: { borderColor: '#FF9500', backgroundColor: '#FFF3E0' },
  resultReactionEmoji: { fontSize: 20 },
  resultExpandBtn: { alignSelf: 'flex-start' },
  resultExpandText: { fontSize: 13, color: '#007AFF', fontWeight: '600' },

  qaRow: {
    backgroundColor: '#fff', borderRadius: 8, padding: 10,
    marginTop: 8, borderWidth: 1, borderColor: '#eee',
  },
  qaRowMatch: { borderColor: '#34C75950', backgroundColor: '#f0fff4' },
  qaQ: { fontSize: 12, color: '#666', marginBottom: 6, lineHeight: 16 },
  qaAns: { gap: 2 },
  qaAnsLabel: { fontSize: 12, color: '#999' },
  qaAnsVal: { color: '#000', fontWeight: '600' },
});
