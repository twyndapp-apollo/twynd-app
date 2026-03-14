/**
 * onDeviceAI.ts — daily relationship analysis service.
 *
 * Runs ONCE PER DAY when the lead's phone is charging and the app is foregrounded.
 * Uses Gemini API with full local context to produce:
 *   • Relationship / Interest / Spark metric scores + trends + insights
 *   • Individuality summaries for each partner
 *   • Relationship summary
 *   • AI-generated game questions per game type
 *
 * All results are stored locally (AsyncStorage). Nothing is sent to the server.
 */

import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, EXTERNAL_LINKS, AI_CONFIG } from '@twynd/shared/constants';
import type {
  DailyAIAnalysis,
  MetricWithInsight,
  RelationshipMetrics,
  InterestMetrics,
  SparkMetrics,
  GameQuestion,
} from '@twynd/shared/types';
import { getMyProfile, getPartnerProfile } from './localProfile';
import { getChatSessions, getMessages } from './chatStore';

// ─── Public API ──────────────────────────────────────────────────────────────

/** Call this from App.tsx whenever the app becomes active. */
export function initDailyAnalysis(isLead: boolean): void {
  if (!isLead) return; // Only lead runs analysis
  AppState.addEventListener('change', (state: AppStateStatus) => {
    if (state === 'active') {
      checkAndRunDailyAnalysis().catch(console.error);
    }
  });
  // Also attempt immediately
  checkAndRunDailyAnalysis().catch(console.error);
}

/** Returns the most recent stored analysis, or null if none exists. */
export async function getLastAnalysis(): Promise<DailyAIAnalysis | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.AI_ANALYSIS);
  if (!raw) return null;
  return JSON.parse(raw) as DailyAIAnalysis;
}

/** Returns true if analysis has already run today. */
export async function hasRunToday(): Promise<boolean> {
  const lastDate = await AsyncStorage.getItem(STORAGE_KEYS.AI_ANALYSIS_DATE);
  if (!lastDate) return false;
  return lastDate === todayString();
}

// ─── Core logic ──────────────────────────────────────────────────────────────

async function checkAndRunDailyAnalysis(): Promise<void> {
  if (await hasRunToday()) return;

  // Optional: check if charging via expo-battery when available
  // (expo-battery not yet installed — gracefully skip check)
  let isCharging = true;
  try {
    const Battery = require('expo-battery');
    const state = await Battery.getBatteryStateAsync();
    isCharging = state === Battery.BatteryState.CHARGING || state === Battery.BatteryState.FULL;
  } catch {
    // expo-battery not installed — run analysis regardless
  }

  if (!isCharging) return;

  await runDailyAnalysis();
}

async function runDailyAnalysis(): Promise<void> {
  try {
    const context = await buildContext();
    const analysis = await callGemini(context);
    await AsyncStorage.setItem(STORAGE_KEYS.AI_ANALYSIS, JSON.stringify(analysis));
    await AsyncStorage.setItem(STORAGE_KEYS.AI_ANALYSIS_DATE, todayString());
  } catch (err) {
    console.warn('[onDeviceAI] analysis failed:', err);
    // Store a fallback so the UI always has something to show
    const fallback = buildFallbackAnalysis();
    const existing = await getLastAnalysis();
    if (!existing) {
      await AsyncStorage.setItem(STORAGE_KEYS.AI_ANALYSIS, JSON.stringify(fallback));
    }
  }
}

// ─── Context builder ─────────────────────────────────────────────────────────

async function buildContext(): Promise<string> {
  const [myProfile, partnerProfile, sessions] = await Promise.all([
    getMyProfile(),
    getPartnerProfile(),
    getChatSessions(),
  ]);

  // Build message stats: total messages + per-day average over last 7 days
  let totalMessages = 0;
  const recentAnswers: string[] = [];
  for (const session of sessions.slice(0, 10)) {
    const msgs = await getMessages(session.id);
    totalMessages += msgs.length;
    if (session.gameType) {
      const gameResultMsg = msgs.find((m) => m.contentType === 'game_result');
      if (gameResultMsg?.gameResultData) {
        const { questions, myAnswers, partnerAnswers } = gameResultMsg.gameResultData;
        questions.slice(0, 3).forEach((q) => {
          recentAnswers.push(
            `Q: ${q.question} | Me: ${myAnswers[q.id] ?? '—'} | Partner: ${partnerAnswers[q.id] ?? '—'}`,
          );
        });
      }
    }
  }

  return `
Relationship context for Twynd AI analysis:
- My nickname: ${myProfile.description ? 'set' : 'not set'}
- My age: ${myProfile.age ?? 'unknown'}
- Partner age: ${partnerProfile?.age ?? 'unknown'}
- Days together: ${sessions.length > 0 ? 'active' : 'new couple'}
- Total chat sessions: ${sessions.length}
- Total messages exchanged: ${totalMessages}
- My preferences: ${myProfile.preferences.map((p) => p.key + ':' + p.value).join(', ') || 'none yet'}
- My character traits: ${myProfile.character.map((c) => c.key + ':' + c.value).join(', ') || 'none yet'}
- Partner preferences: ${partnerProfile?.preferences.map((p) => p.key + ':' + p.value).join(', ') || 'none yet'}
- Recent game answers (sample): ${recentAnswers.slice(0, 5).join(' | ') || 'none yet'}
`.trim();
}

// ─── Gemini call ─────────────────────────────────────────────────────────────

async function callGemini(context: string): Promise<DailyAIAnalysis> {
  const { baseUrl, key, model } = EXTERNAL_LINKS.GEMINI_API;
  if (!key || key === 'YOUR_GEMINI_API_KEY') throw new Error('No Gemini API key');

  const prompt = buildPrompt(context);

  const res = await fetch(`${baseUrl}/${model}:generateContent?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
    }),
  });

  if (!res.ok) throw new Error(`Gemini error ${res.status}`);
  const data = await res.json();
  const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  // Extract JSON from markdown code block if present
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) ?? text.match(/(\{[\s\S]*\})/);
  if (!jsonMatch) throw new Error('Could not parse Gemini response');
  return JSON.parse(jsonMatch[1]) as DailyAIAnalysis;
}

function buildPrompt(context: string): string {
  return `
You are a relationship coach AI for the Twynd couples app.
Analyze the following context and return ONLY a JSON object (no markdown prose before/after).

Context:
${context}

Return a JSON object matching this exact shape:
{
  "date": "YYYY-MM-DD",
  "generatedAt": "ISO timestamp",
  "relationship": {
    "commitment":             { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "emotional_intimacy":    { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "communication":         { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "conflict_resolution":   { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "trust_safety":          { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "compatibility":         { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "independence":          { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "relationship_maintenance": { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" }
  },
  "interest": {
    "initiation":       { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "responsiveness":   { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "active_listening": { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "deep_conversations": { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "playful_teasing":  { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "prioritization":   { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "inclusion":        { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "effort":           { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "consistency":      { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" }
  },
  "spark": {
    "intimacy":                { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "playfulness":             { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "rituals_of_connection":   { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" },
    "mystery_curiosity":       { "score": 0-100, "trend": "up|neutral|down", "insight": "one sentence" }
  },
  "individualitySummaryMe": "2-3 sentence summary of who I am based on the data",
  "individualitySummaryPartner": "2-3 sentence summary of my partner based on the data",
  "relationshipSummary": "2-3 sentence summary of the relationship dynamic today",
  "aiQuestions": {
    "love_map_builder": [
      { "id": "ai_lm_1", "question": "...", "category": "values_alignment", "difficulty": "medium" }
    ],
    "this_or_that": [
      { "id": "ai_tot_1", "question": "...", "category": "conflict_resolution", "difficulty": "medium", "options": ["Option A", "Option B"] }
    ],
    "question_roulette": [
      { "id": "ai_qr_1", "question": "...", "category": "affection_intimacy", "difficulty": "hard" }
    ],
    "appreciation_game": [
      { "id": "ai_ap_1", "question": "...", "category": "affection_intimacy", "difficulty": "medium" }
    ],
    "truth_or_dare": [
      { "id": "ai_td_1", "question": "...", "category": "conflict_resolution", "difficulty": "hard" }
    ]
  }
}

Focus questions on the themes most relevant to this couple based on context.
Theme pool: conflict_resolution, values_alignment, affection_intimacy, financial_roles, children_parenting, family_dynamics.
Scores should reflect the available data — when data is sparse, score around 50 with "neutral" trend.
Return only the JSON, no surrounding text.
`.trim();
}

// ─── Fallback ────────────────────────────────────────────────────────────────

function buildFallbackAnalysis(): DailyAIAnalysis {
  const neutral = (insight: string): MetricWithInsight => ({
    score: 50, trend: 'neutral', insight,
  });
  const today = todayString();
  return {
    date: today,
    generatedAt: new Date().toISOString(),
    relationship: {
      commitment:              neutral('Keep playing games together to build a clearer picture.'),
      emotional_intimacy:      neutral('Share more about your inner world with your partner.'),
      communication:           neutral('Try messaging each day to strengthen this score.'),
      conflict_resolution:     neutral('More data needed — play Question Roulette to explore this.'),
      trust_safety:            neutral('Opening up in games builds trust over time.'),
      compatibility:           neutral('This or That reveals compatibility — try it!'),
      independence:            neutral('A healthy balance of togetherness and personal space matters.'),
      relationship_maintenance: neutral('Consistent daily check-ins keep relationships strong.'),
    } as { [K in keyof RelationshipMetrics]: MetricWithInsight },
    interest: {
      initiation:       neutral('Who starts conversations? Try starting one today.'),
      responsiveness:   neutral('Quick replies signal attentiveness.'),
      active_listening: neutral('Reflect back what your partner shares.'),
      deep_conversations: neutral('Question Roulette is great for depth.'),
      playful_teasing:  neutral('A little playfulness keeps connection alive.'),
      prioritization:   neutral('Making time shows your partner they matter.'),
      inclusion:        neutral('Share your day-to-day moments with each other.'),
      effort:           neutral('Small gestures compound into big connection.'),
      consistency:      neutral('Show up for each other daily.'),
    } as { [K in keyof InterestMetrics]: MetricWithInsight },
    spark: {
      intimacy:               neutral('Vulnerability deepens intimacy.'),
      playfulness:            neutral('Play together — try Truth or Dare!'),
      rituals_of_connection:  neutral('Create a daily ritual, like a good-morning message.'),
      mystery_curiosity:      neutral('Ask something unexpected about each other today.'),
    } as { [K in keyof SparkMetrics]: MetricWithInsight },
    individualitySummaryMe: 'Play a few games to help the AI understand who you are.',
    individualitySummaryPartner: 'More interaction needed to build a picture of your partner.',
    relationshipSummary: 'Your journey is just beginning. Keep exploring each other through games and conversations.',
    aiQuestions: {},
  };
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}
