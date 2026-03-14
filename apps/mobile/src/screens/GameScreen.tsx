/**
 * GameScreen — two-player game play.
 *
 * Flow:
 *   1. Questions shown one at a time; player answers each
 *   2. Answers relayed to partner via WebSocket (game_answer messages)
 *   3. When I finish all questions → "Waiting for partner" state
 *   4. When partner sends game_complete → animated results revealed
 *   5. Game result saved as a message in the chat session, then navigates to ChatSessionScreen
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { REACTION_LIST } from '@twynd/shared/constants';
import type { GameQuestion, LocalGameResult, LocalChatMessage } from '@twynd/shared/types';
import { getGame } from '../games/registry';
import { getLastAnalysis } from '../services/onDeviceAI';
import { createGameSession, upsertChatSession, addMessage } from '../services/chatStore';
import { partnerSync } from '../services/partnerSync';
import { useUser } from '../context/UserContext';

interface GameScreenProps {
  gameId: string;
  onBack: () => void;
  onComplete: (sessionId: string) => void; // navigate to chat session
}

type GameStatus = 'playing' | 'waiting_partner' | 'results';

export const GameScreen: React.FC<GameScreenProps> = ({ gameId, onBack, onComplete }) => {
  const { user } = useUser();
  const game = getGame(gameId);

  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [myAnswers, setMyAnswers] = useState<Record<string, string>>({});
  const [partnerAnswers, setPartnerAnswers] = useState<Record<string, string>>({});
  const [textInput, setTextInput] = useState('');
  const [status, setStatus] = useState<GameStatus>('playing');
  const [sessionId] = useState<string>(() => createGameSession(gameId, game?.name ?? gameId).id);
  const [reaction, setReaction] = useState<string | null>(null);

  // Animated values for results reveal
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scoreAnim = useRef(new Animated.Value(0)).current;

  // Load questions (templated + AI extras)
  useEffect(() => {
    if (!game) return;
    const load = async () => {
      const base = game.getTemplatedQuestions();
      const analysis = await getLastAnalysis();
      const extras: GameQuestion[] = analysis?.aiQuestions?.[gameId] ?? [];
      setQuestions([...base, ...extras]);
    };
    load();
  }, [game, gameId]);

  // Create the chat session in store on mount
  useEffect(() => {
    if (!game) return;
    const session = createGameSession(gameId, game.name);
    // Override generated id with our stable sessionId
    upsertChatSession({ ...session, id: sessionId });
  }, [game, gameId, sessionId]);

  // Listen for partner game messages
  useEffect(() => {
    const unsub = partnerSync.addListener((msg) => {
      if (msg.type === 'game_answer') {
        const { gameSessionId, questionId, answer } = msg.payload as {
          gameSessionId: string;
          questionId: string;
          answer: string;
        };
        if (gameSessionId !== sessionId) return;
        setPartnerAnswers((prev) => ({ ...prev, [questionId]: answer }));
      }

      if (msg.type === 'game_complete') {
        const { gameSessionId } = msg.payload as { gameSessionId: string };
        if (gameSessionId !== sessionId) return;
        // Partner finished — if I'm done too, show results
        setStatus((prev) => {
          if (prev === 'waiting_partner') {
            revealResults();
            return 'results';
          }
          return prev;
        });
      }
    });
    return unsub;
  }, [sessionId]);

  const currentQuestion = questions[currentIndex];

  const submitAnswer = useCallback((answer: string) => {
    if (!currentQuestion) return;
    const updated = { ...myAnswers, [currentQuestion.id]: answer };
    setMyAnswers(updated);
    setTextInput('');

    // Relay to partner
    partnerSync.sendRaw('game_answer', {
      gameSessionId: sessionId,
      questionId: currentQuestion.id,
      answer,
    });

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      // I've answered everything
      partnerSync.sendRaw('game_complete', { gameSessionId: sessionId });
      setStatus('waiting_partner');
      // If partner already answered everything, reveal now
      const partnerDone = questions.every((q) => partnerAnswers[q.id] !== undefined);
      if (partnerDone) {
        revealResults();
        setStatus('results');
      }
    }
  }, [currentQuestion, currentIndex, questions, myAnswers, partnerAnswers, sessionId]);

  const revealResults = () => {
    const score = computeMatchScore(questions, myAnswers, partnerAnswers);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      Animated.timing(scoreAnim, { toValue: score, duration: 1200, useNativeDriver: false }),
    ]).start();
  };

  const saveResultAndContinue = async () => {
    const result: LocalGameResult = {
      gameType: gameId,
      myAnswers,
      partnerAnswers,
      questions,
      matchScore: computeMatchScore(questions, myAnswers, partnerAnswers),
      completedAt: new Date().toISOString(),
    };

    const msg: LocalChatMessage = {
      id: `result_${Date.now()}`,
      sessionId,
      senderId: 'me',
      text: `Game result: ${game?.name}`,
      contentType: 'game_result',
      gameResultData: result,
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    await addMessage(msg);
    onComplete(sessionId);
  };

  if (!game || questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 80 }} />
      </SafeAreaView>
    );
  }

  // ── Results view ───────────────────────────────────────────────────────────
  if (status === 'results') {
    const score = computeMatchScore(questions, myAnswers, partnerAnswers);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle}>{game.icon} Results</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView contentContainerStyle={styles.resultsScroll}>
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            {/* Score circle */}
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreNumber}>{score}%</Text>
              <Text style={styles.scoreLabel}>Match</Text>
            </View>

            <Text style={styles.resultsTitle}>{game.name} Complete!</Text>
            <Text style={styles.resultsSubtitle}>
              {score >= 70 ? "You're really in sync! 💫" : score >= 40 ? "You're learning each other 🌱" : "Opposites attract! 🔀"}
            </Text>

            {/* Reactions */}
            <Text style={styles.reactionsLabel}>How do you feel?</Text>
            <View style={styles.reactionsRow}>
              {REACTION_LIST.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={[styles.reactionBtn, reaction === emoji && styles.reactionBtnActive]}
                  onPress={() => setReaction(emoji)}
                >
                  <Text style={styles.reactionEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Q&A breakdown */}
            <Text style={styles.breakdownTitle}>Question Breakdown</Text>
            {questions.map((q) => {
              const mine = myAnswers[q.id];
              const theirs = partnerAnswers[q.id];
              const match = mine && theirs && mine.toLowerCase() === theirs.toLowerCase();
              return (
                <View key={q.id} style={[styles.qaCard, match && styles.qaCardMatch]}>
                  <Text style={styles.qaQuestion} numberOfLines={2}>{q.question}</Text>
                  <View style={styles.qaAnswers}>
                    <View style={styles.qaAnswer}>
                      <Text style={styles.qaWho}>You</Text>
                      <Text style={styles.qaText}>{mine ?? '—'}</Text>
                    </View>
                    <View style={styles.qaAnswer}>
                      <Text style={styles.qaWho}>Partner</Text>
                      <Text style={styles.qaText}>{theirs ?? '—'}</Text>
                    </View>
                  </View>
                  {match && <Text style={styles.matchBadge}>✓ Match</Text>}
                </View>
              );
            })}

            <TouchableOpacity style={styles.continueBtn} onPress={saveResultAndContinue}>
              <Text style={styles.continueBtnText}>Go to Chat →</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Waiting view ───────────────────────────────────────────────────────────
  if (status === 'waiting_partner') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle}>{game.icon} {game.name}</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.waitingContainer}>
          <Text style={styles.waitingIcon}>⏳</Text>
          <Text style={styles.waitingTitle}>All done!</Text>
          <Text style={styles.waitingSubtitle}>Waiting for your partner to finish…</Text>
          <ActivityIndicator color="#007AFF" style={{ marginTop: 24 }} />
        </View>
      </SafeAreaView>
    );
  }

  // ── Playing view ───────────────────────────────────────────────────────────
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isChoice = !!currentQuestion.options?.length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{game.icon} {game.name}</Text>
        <Text style={styles.progressText}>{currentIndex + 1}/{questions.length}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` as any }]} />
      </View>

      <ScrollView contentContainerStyle={styles.playScroll} keyboardShouldPersistTaps="handled">
        {/* Question card */}
        <View style={styles.questionCard}>
          <Text style={styles.categoryTag}>{currentQuestion.category.replace(/_/g, ' ')}</Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        {/* Answer input */}
        {isChoice ? (
          <View style={styles.choicesContainer}>
            {currentQuestion.options!.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.choiceBtn}
                onPress={() => submitAnswer(opt)}
              >
                <Text style={styles.choiceBtnText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.textAnswerContainer}>
            <TextInput
              style={styles.textAnswerInput}
              placeholder="Type your answer…"
              placeholderTextColor="#bbb"
              value={textInput}
              onChangeText={setTextInput}
              multiline
              maxLength={200}
            />
            <View style={styles.textAnswerFooter}>
              <Text style={styles.charCount}>{textInput.length}/200</Text>
              <TouchableOpacity
                style={[styles.submitBtn, !textInput.trim() && styles.submitBtnDisabled]}
                onPress={() => submitAnswer(textInput.trim())}
                disabled={!textInput.trim()}
              >
                <Text style={styles.submitBtnText}>Next →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function computeMatchScore(
  questions: GameQuestion[],
  myAnswers: Record<string, string>,
  partnerAnswers: Record<string, string>,
): number {
  if (questions.length === 0) return 0;
  let points = 0;
  let max = 0;
  for (const q of questions) {
    const mine = myAnswers[q.id];
    const theirs = partnerAnswers[q.id];
    if (!mine || !theirs) continue;
    max += 1;
    if (q.options?.length) {
      // Choice question: exact match
      if (mine.toLowerCase() === theirs.toLowerCase()) points += 1;
    } else {
      // Text question: both answered = 0.5 credit (can't auto-score free text)
      points += 0.5;
    }
  }
  return max === 0 ? 50 : Math.round((points / max) * 100);
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  backButton: { padding: 8 },
  backIcon: { fontSize: 22, color: '#007AFF' },
  headerTitle: { flex: 1, fontSize: 17, fontWeight: '700', color: '#000', textAlign: 'center' },
  headerSpacer: { width: 38 },
  progressText: { fontSize: 13, color: '#888', minWidth: 38, textAlign: 'right' },
  progressBar: { height: 4, backgroundColor: '#f0f0f0' },
  progressFill: { height: 4, backgroundColor: '#FF9500' },

  playScroll: { padding: 20 },
  questionCard: {
    backgroundColor: '#f9f9f9', borderRadius: 16, padding: 20,
    marginBottom: 24, borderWidth: 1, borderColor: '#ebebeb',
  },
  categoryTag: {
    fontSize: 11, fontWeight: '600', color: '#FF9500',
    textTransform: 'uppercase', marginBottom: 10, letterSpacing: 0.5,
  },
  questionText: { fontSize: 18, fontWeight: '600', color: '#111', lineHeight: 26 },

  choicesContainer: { gap: 12 },
  choiceBtn: {
    backgroundColor: '#f0f0f0', borderRadius: 12, paddingVertical: 16,
    paddingHorizontal: 20, alignItems: 'center',
    borderWidth: 1, borderColor: '#ddd',
  },
  choiceBtnText: { fontSize: 16, fontWeight: '600', color: '#000' },

  textAnswerContainer: {
    backgroundColor: '#f9f9f9', borderRadius: 12,
    borderWidth: 1, borderColor: '#ddd', overflow: 'hidden',
  },
  textAnswerInput: {
    fontSize: 15, color: '#000', padding: 16,
    minHeight: 100, textAlignVertical: 'top',
  },
  textAnswerFooter: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
    borderTopWidth: 1, borderTopColor: '#ebebeb',
  },
  charCount: { fontSize: 12, color: '#bbb' },
  submitBtn: {
    backgroundColor: '#007AFF', borderRadius: 8,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  submitBtnDisabled: { backgroundColor: '#ccc' },
  submitBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },

  waitingContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40,
  },
  waitingIcon: { fontSize: 64, marginBottom: 16 },
  waitingTitle: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 8 },
  waitingSubtitle: { fontSize: 15, color: '#666', textAlign: 'center' },

  resultsScroll: { padding: 20 },
  scoreCircle: {
    alignSelf: 'center', width: 120, height: 120, borderRadius: 60,
    backgroundColor: '#FF9500', alignItems: 'center', justifyContent: 'center',
    marginBottom: 20, shadowColor: '#FF9500', shadowOpacity: 0.3,
    shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  scoreNumber: { fontSize: 32, fontWeight: '800', color: '#fff' },
  scoreLabel: { fontSize: 12, color: '#fff', fontWeight: '600' },
  resultsTitle: { fontSize: 22, fontWeight: '700', color: '#000', textAlign: 'center', marginBottom: 6 },
  resultsSubtitle: { fontSize: 15, color: '#555', textAlign: 'center', marginBottom: 24 },

  reactionsLabel: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 10 },
  reactionsRow: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 10, marginBottom: 28, flexWrap: 'wrap',
  },
  reactionBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'transparent',
  },
  reactionBtnActive: { borderColor: '#FF9500', backgroundColor: '#FFF3E0' },
  reactionEmoji: { fontSize: 22 },

  breakdownTitle: { fontSize: 16, fontWeight: '700', color: '#000', marginBottom: 12 },
  qaCard: {
    backgroundColor: '#f9f9f9', borderRadius: 12, padding: 14,
    marginBottom: 10, borderWidth: 1, borderColor: '#ebebeb',
  },
  qaCardMatch: { borderColor: '#34C75940', backgroundColor: '#f0fff4' },
  qaQuestion: { fontSize: 13, color: '#555', marginBottom: 10, lineHeight: 18 },
  qaAnswers: { flexDirection: 'row', gap: 10 },
  qaAnswer: { flex: 1 },
  qaWho: { fontSize: 11, color: '#999', fontWeight: '600', marginBottom: 2 },
  qaText: { fontSize: 13, color: '#000', fontWeight: '500' },
  matchBadge: {
    fontSize: 11, color: '#34C759', fontWeight: '700',
    marginTop: 6, textAlign: 'right',
  },

  continueBtn: {
    backgroundColor: '#007AFF', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', marginTop: 20,
  },
  continueBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});
