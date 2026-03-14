/**
 * ChatSessionScreen
 *
 * Unified screen for chat + in-session game play.
 *
 * Game flow (embedded):
 *   gameState === 'my_turn'
 *     → full-screen game panel (questions, answer inputs)
 *     → on completion:
 *         creator  → saves answers, sends game_session_invite to partner, returns to home
 *         partner  → saves answers, computes results, adds game_result message, stays in chat
 *
 *   gameState === 'waiting_partner'
 *     → normal chat + "waiting" banner at top
 *     → when game_complete received → add result message, update to 'completed'
 *
 *   gameState === 'completed' / no game
 *     → normal chat with pinned game-result card at top (if present)
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
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { REACTION_LIST, VALIDATION_RULES, REACTIONS } from '@twynd/shared/constants';
import type {
  LocalChatMessage,
  LocalChatSession,
  LocalGameResult,
  GameQuestion,
} from '@twynd/shared/types';
import {
  getMessages,
  addMessage,
  markMessagesRead,
  getChatSession,
  upsertChatSession,
} from '../services/chatStore';
import { partnerSync } from '../services/partnerSync';
import { useUser } from '../context/UserContext';

interface ChatSessionScreenProps {
  sessionId: string;
  onBack: () => void;          // returns to home (used after creator submits answers)
  onGameAnswered?: () => void; // called when creator finishes answering → go back to home
}

export const ChatSessionScreen: React.FC<ChatSessionScreenProps> = ({
  sessionId,
  onBack,
  onGameAnswered,
}) => {
  const { user } = useUser();
  const myId = user?.id ?? 'me';

  const [session, setSession] = useState<LocalChatSession | null>(null);
  const [messages, setMessages] = useState<LocalChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [reactionMap, setReactionMap] = useState<Record<string, string>>({});

  const flatListRef = useRef<FlatList>(null);

  // Load session + messages on mount, mark read
  useEffect(() => {
    const load = async () => {
      const [sess, msgs] = await Promise.all([
        getChatSession(sessionId),
        getMessages(sessionId),
      ]);
      setSession(sess);
      setMessages(msgs);
      if (sess) await markMessagesRead(sessionId, myId);
    };
    load();
  }, [sessionId, myId]);

  // Listen for partner messages (chat + game_complete)
  useEffect(() => {
    const unsub = partnerSync.addListener(async (msg) => {
      // Incoming chat message
      if (msg.type === 'chat_message') {
        const { targetSessionId, text, messageId, timestamp } = msg.payload as {
          targetSessionId: string;
          text: string;
          messageId: string;
          timestamp: string;
        };
        if (targetSessionId !== sessionId) return;
        const incoming: LocalChatMessage = {
          id: messageId,
          sessionId,
          senderId: msg.senderId ?? 'partner',
          text,
          contentType: 'text',
          timestamp,
          isRead: true,
        };
        await addMessage(incoming, myId);
        setMessages((prev) => [...prev, incoming]);
      }

      // Partner completed the game — add result to this session
      if (msg.type === 'game_complete') {
        const { gameSessionId, partnerAnswers } = msg.payload as {
          gameSessionId: string;
          partnerAnswers: Record<string, string>;
        };
        if (gameSessionId !== sessionId) return;

        setSession((prev) => {
          if (!prev) return prev;
          const updated = { ...prev, theirAnswers: partnerAnswers, gameState: 'completed' as const };
          // Persist and add result message async
          finaliseResult(updated);
          return updated;
        });
      }
    });
    return unsub;
  }, [sessionId]);

  // Called when we have both sets of answers (creator side after receiving game_complete)
  const finaliseResult = async (sess: LocalChatSession) => {
    if (!sess.gameQuestions || !sess.myAnswers || !sess.theirAnswers) return;
    const score = computeMatchScore(sess.gameQuestions, sess.myAnswers, sess.theirAnswers);
    const result: LocalGameResult = {
      gameType: sess.gameType!,
      myAnswers: sess.myAnswers,
      partnerAnswers: sess.theirAnswers,
      questions: sess.gameQuestions,
      matchScore: score,
      completedAt: new Date().toISOString(),
    };
    const resultMsg: LocalChatMessage = {
      id: `result_${sessionId}`,
      sessionId,
      senderId: 'system',
      text: `Game result: ${sess.title}`,
      contentType: 'game_result',
      gameResultData: result,
      timestamp: new Date().toISOString(),
      isRead: true,
    };
    await upsertChatSession({ ...sess, gameState: 'completed' });
    await addMessage(resultMsg, myId);
    setMessages((prev) => {
      const already = prev.find((m) => m.id === resultMsg.id);
      return already ? prev : [...prev, resultMsg];
    });
  };

  // ── Game completion handler ────────────────────────────────────────────────

  const handleGameAnswered = async (myAnswers: Record<string, string>) => {
    if (!session) return;

    const updatedSession: LocalChatSession = { ...session, myAnswers };

    if (session.isGameCreator) {
      // Creator: save answers, send invite to partner, set waiting state, go home
      const waiting: LocalChatSession = {
        ...updatedSession,
        gameState: 'waiting_partner',
        lastMessagePreview: '🎮 Waiting for partner…',
      };
      await upsertChatSession(waiting);
      setSession(waiting);

      partnerSync.sendRaw('game_session_invite', {
        session: {
          id: session.id,
          title: session.title,
          gameType: session.gameType,
          gameQuestions: session.gameQuestions,
          lastMessageAt: session.lastMessageAt,
          unreadCount: 0,
          createdAt: session.createdAt,
          gameState: 'my_turn',
        },
        creatorAnswers: myAnswers,
      });

      // Go back to home
      onGameAnswered?.() ?? onBack();
    } else {
      // Partner: compute results immediately (we have both sets)
      const theirAnswers = session.theirAnswers ?? {};
      const score = computeMatchScore(session.gameQuestions ?? [], myAnswers, theirAnswers);
      const result: LocalGameResult = {
        gameType: session.gameType!,
        myAnswers,
        partnerAnswers: theirAnswers,
        questions: session.gameQuestions ?? [],
        matchScore: score,
        completedAt: new Date().toISOString(),
      };
      const resultMsg: LocalChatMessage = {
        id: `result_${sessionId}`,
        sessionId,
        senderId: 'system',
        text: `Game result: ${session.title}`,
        contentType: 'game_result',
        gameResultData: result,
        timestamp: new Date().toISOString(),
        isRead: true,
      };

      const completed: LocalChatSession = {
        ...updatedSession,
        theirAnswers,
        gameState: 'completed',
        lastMessagePreview: `🎮 ${score}% match!`,
      };
      await upsertChatSession(completed);
      await addMessage(resultMsg, myId);
      setSession(completed);
      setMessages((prev) => [...prev, resultMsg]);

      // Notify creator
      partnerSync.sendRaw('game_complete', {
        gameSessionId: sessionId,
        partnerAnswers: myAnswers,
      });
    }
  };

  // ── Chat send ─────────────────────────────────────────────────────────────

  const sendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text) return;

    const msg: LocalChatMessage = {
      id: `msg_${Date.now()}`,
      sessionId,
      senderId: myId,
      text,
      contentType: 'text',
      timestamp: new Date().toISOString(),
      isRead: true,
    };
    await addMessage(msg, myId);
    setMessages((prev) => [...prev, msg]);
    setInputText('');

    partnerSync.sendRaw('chat_message', {
      targetSessionId: sessionId,
      text,
      contentType: 'text',
      messageId: msg.id,
      timestamp: msg.timestamp,
    });

    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 80);
  }, [inputText, sessionId, myId]);

  const toggleReaction = (msgId: string, emoji: string) => {
    setReactionMap((prev) => ({ ...prev, [msgId]: prev[msgId] === emoji ? '' : emoji }));
  };

  // ── Render: my turn → show game panel ────────────────────────────────────

  if (!session) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 80 }} />
      </SafeAreaView>
    );
  }

  if (session.gameState === 'my_turn' && session.gameQuestions?.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{session.title}</Text>
          <View style={styles.headerSpacer} />
        </View>
        <InChatGamePanel
          questions={session.gameQuestions}
          onComplete={handleGameAnswered}
        />
      </SafeAreaView>
    );
  }

  // ── Render: chat view (waiting / completed / milestone) ───────────────────

  const gameResultMsg = messages.find((m) => m.contentType === 'game_result');
  const chatMessages = messages.filter((m) => m.contentType !== 'game_result');

  const renderMessage = ({ item }: { item: LocalChatMessage }) => {
    const isMine = item.senderId === myId;
    const time = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
      <View style={[styles.messageRow, isMine ? styles.messageRowMe : styles.messageRowPartner]}>
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{session.title}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
            <>
              {/* Waiting banner */}
              {session.gameState === 'waiting_partner' && (
                <View style={styles.waitingBanner}>
                  <Text style={styles.waitingBannerIcon}>⏳</Text>
                  <Text style={styles.waitingBannerText}>
                    Your answers are in! Waiting for your partner to play…
                  </Text>
                </View>
              )}
              {/* Game result card */}
              {gameResultMsg?.gameResultData && (
                <GameResultCard
                  gameResult={gameResultMsg.gameResultData}
                  messageId={gameResultMsg.id}
                  reactionMap={reactionMap}
                  onReaction={toggleReaction}
                />
              )}
            </>
          }
        />

        {/* Quick-reaction bar */}
        <View style={styles.quickReactionBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickReactionScroll}>
            {Object.values(REACTIONS).map((emoji) => (
              <TouchableOpacity
                key={emoji}
                style={styles.quickReactionBtn}
                onPress={() => {
                  const msg: LocalChatMessage = {
                    id: `msg_${Date.now()}`,
                    sessionId,
                    senderId: myId,
                    text: emoji,
                    contentType: 'text',
                    timestamp: new Date().toISOString(),
                    isRead: true,
                  };
                  addMessage(msg, myId).then(() => {
                    setMessages((prev) => [...prev, msg]);
                    partnerSync.sendRaw('chat_message', {
                      targetSessionId: sessionId,
                      text: emoji,
                      contentType: 'text',
                      messageId: msg.id,
                      timestamp: msg.timestamp,
                    });
                    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 80);
                  });
                }}
              >
                <Text style={styles.quickReactionEmoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Text input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Message…"
            placeholderTextColor="#bbb"
            value={inputText}
            onChangeText={setInputText}
            maxLength={VALIDATION_RULES.CHAT_MESSAGE_MAX_LENGTH}
            multiline
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendBtnText}>↑</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.charHint, styles.charHintBottom]}>
          {inputText.length}/{VALIDATION_RULES.CHAT_MESSAGE_MAX_LENGTH}
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─── InChatGamePanel ──────────────────────────────────────────────────────────

interface InChatGamePanelProps {
  questions: GameQuestion[];
  onComplete: (answers: Record<string, string>) => void;
}

const InChatGamePanel: React.FC<InChatGamePanelProps> = ({ questions, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [textInput, setTextInput] = useState('');

  const question = questions[index];
  const isChoice = !!question?.options?.length;
  const progress = ((index + 1) / questions.length) * 100;

  const submitAnswer = (answer: string) => {
    const updated = { ...answers, [question.id]: answer };
    setAnswers(updated);
    setTextInput('');

    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
    } else {
      onComplete(updated);
    }
  };

  if (!question) return null;

  return (
    <ScrollView style={styles.gamePanel} contentContainerStyle={styles.gamePanelContent} keyboardShouldPersistTaps="handled">
      {/* Progress */}
      <View style={styles.gameProgressBar}>
        <View style={[styles.gameProgressFill, { width: `${progress}%` as any }]} />
      </View>
      <Text style={styles.gameProgressText}>{index + 1} of {questions.length}</Text>

      {/* Question */}
      <View style={styles.gameQuestionCard}>
        <Text style={styles.gameCategory}>{question.category.replace(/_/g, ' ')}</Text>
        <Text style={styles.gameQuestion}>{question.question}</Text>
      </View>

      {/* Answer */}
      {isChoice ? (
        <View style={styles.gameChoices}>
          {question.options!.map((opt) => (
            <TouchableOpacity key={opt} style={styles.gameChoiceBtn} onPress={() => submitAnswer(opt)}>
              <Text style={styles.gameChoiceBtnText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.gameTextBox}>
          <TextInput
            style={styles.gameTextInput}
            placeholder="Your answer…"
            placeholderTextColor="#bbb"
            value={textInput}
            onChangeText={setTextInput}
            multiline
            maxLength={200}
          />
          <View style={styles.gameTextFooter}>
            <Text style={styles.gameCharCount}>{textInput.length}/200</Text>
            <TouchableOpacity
              style={[styles.gameSubmitBtn, !textInput.trim() && styles.gameSubmitBtnDisabled]}
              onPress={() => submitAnswer(textInput.trim())}
              disabled={!textInput.trim()}
            >
              <Text style={styles.gameSubmitBtnText}>Next →</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

// ─── GameResultCard ───────────────────────────────────────────────────────────

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
        <Text style={styles.resultCardTitle}>🎮 Game Complete</Text>
        <View style={styles.resultScoreBadge}>
          <Text style={styles.resultScoreText}>{gameResult.matchScore}% Match</Text>
        </View>
      </View>
      <Text style={styles.resultCardGame}>{gameResult.gameType.replace(/_/g, ' ')}</Text>

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

      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
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
            {match && <Text style={styles.matchBadge}>✓ Match</Text>}
          </View>
        );
      })}
    </View>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeMatchScore(
  questions: GameQuestion[],
  myAnswers: Record<string, string>,
  theirAnswers: Record<string, string>,
): number {
  if (!questions.length) return 0;
  let points = 0, max = 0;
  for (const q of questions) {
    const mine = myAnswers[q.id];
    const theirs = theirAnswers[q.id];
    if (!mine || !theirs) continue;
    max += 1;
    if (q.options?.length) {
      if (mine.toLowerCase() === theirs.toLowerCase()) points += 1;
    } else {
      points += 0.5; // both answered a free-text question
    }
  }
  return max === 0 ? 50 : Math.round((points / max) * 100);
}

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
  headerTitle: { flex: 1, fontSize: 17, fontWeight: '700', color: '#000', textAlign: 'center' },
  headerSpacer: { width: 38 },

  // Game panel
  gamePanel: { flex: 1 },
  gamePanelContent: { padding: 20 },
  gameProgressBar: { height: 4, backgroundColor: '#f0f0f0', borderRadius: 2, marginBottom: 6 },
  gameProgressFill: { height: 4, backgroundColor: '#FF9500', borderRadius: 2 },
  gameProgressText: { fontSize: 12, color: '#999', textAlign: 'right', marginBottom: 20 },
  gameQuestionCard: {
    backgroundColor: '#f9f9f9', borderRadius: 16, padding: 20,
    marginBottom: 24, borderWidth: 1, borderColor: '#ebebeb',
  },
  gameCategory: {
    fontSize: 11, fontWeight: '600', color: '#FF9500',
    textTransform: 'uppercase', marginBottom: 10, letterSpacing: 0.5,
  },
  gameQuestion: { fontSize: 18, fontWeight: '600', color: '#111', lineHeight: 26 },
  gameChoices: { gap: 12 },
  gameChoiceBtn: {
    backgroundColor: '#f0f0f0', borderRadius: 12, paddingVertical: 16,
    paddingHorizontal: 20, alignItems: 'center', borderWidth: 1, borderColor: '#ddd',
  },
  gameChoiceBtnText: { fontSize: 16, fontWeight: '600', color: '#000' },
  gameTextBox: {
    backgroundColor: '#f9f9f9', borderRadius: 12,
    borderWidth: 1, borderColor: '#ddd', overflow: 'hidden',
  },
  gameTextInput: {
    fontSize: 15, color: '#000', padding: 16,
    minHeight: 100, textAlignVertical: 'top',
  },
  gameTextFooter: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
    borderTopWidth: 1, borderTopColor: '#ebebeb',
  },
  gameCharCount: { fontSize: 12, color: '#bbb' },
  gameSubmitBtn: {
    backgroundColor: '#007AFF', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 10,
  },
  gameSubmitBtnDisabled: { backgroundColor: '#ccc' },
  gameSubmitBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },

  // Waiting banner
  waitingBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF8EC', borderRadius: 12, padding: 14,
    marginBottom: 12, borderWidth: 1, borderColor: '#FFE58050',
    gap: 10,
  },
  waitingBannerIcon: { fontSize: 22 },
  waitingBannerText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 18 },

  // Chat messages
  messageList: { padding: 12, paddingBottom: 8 },
  messageRow: { marginBottom: 8, maxWidth: '80%' },
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

  // Quick-reaction bar
  quickReactionBar: {
    borderTopWidth: 1, borderTopColor: '#f0f0f0',
    paddingVertical: 6, backgroundColor: '#fff',
  },
  quickReactionScroll: {
    paddingHorizontal: 12, gap: 6,
  },
  quickReactionBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center',
  },
  quickReactionEmoji: { fontSize: 20 },

  // Input
  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end',
    paddingHorizontal: 12, paddingTop: 6, paddingBottom: 4,
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
  charHint: { fontSize: 10, color: '#ccc', textAlign: 'right', paddingRight: 14 },
  charHintBottom: {
    paddingBottom: Platform.OS === 'android' ? 20 : 28,
  },

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
    backgroundColor: '#FF9500', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4,
  },
  resultScoreText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  resultCardGame: { fontSize: 13, color: '#888', marginBottom: 12, textTransform: 'capitalize' },
  resultReactionsRow: { flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap' },
  resultReactionBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: '#eee',
  },
  resultReactionBtnActive: { borderColor: '#FF9500', backgroundColor: '#FFF3E0' },
  resultReactionEmoji: { fontSize: 20 },
  resultExpandText: { fontSize: 13, color: '#007AFF', fontWeight: '600', marginBottom: 8 },
  qaRow: {
    backgroundColor: '#fff', borderRadius: 8, padding: 10,
    marginTop: 6, borderWidth: 1, borderColor: '#eee',
  },
  qaRowMatch: { borderColor: '#34C75950', backgroundColor: '#f0fff4' },
  qaQ: { fontSize: 12, color: '#666', marginBottom: 6, lineHeight: 16 },
  qaAns: { gap: 2 },
  qaAnsLabel: { fontSize: 12, color: '#999' },
  qaAnsVal: { color: '#000', fontWeight: '600' },
  matchBadge: { fontSize: 11, color: '#34C759', fontWeight: '700', marginTop: 4, textAlign: 'right' },
});
