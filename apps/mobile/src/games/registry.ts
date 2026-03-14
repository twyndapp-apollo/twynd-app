/**
 * Game Registry — pluggable architecture.
 * To add a game: create a GameDefinition and add it to GAME_REGISTRY.
 * To remove a game: delete its entry from GAME_REGISTRY — nothing else breaks.
 *
 * Pre-templated questions are intentionally minimal (1-3 per game).
 * The on-device AI expands the question pool daily based on relationship context.
 */

import type { GameDefinition, GameQuestion } from '@twynd/shared/types';
import { GAME_CATEGORIES } from '@twynd/shared/constants';

const lovemapQuestions = (): GameQuestion[] => [
  { id: 'lm1', question: "What's my partner's favorite comfort food?",  category: GAME_CATEGORIES.BASIC, difficulty: 'easy' },
  { id: 'lm2', question: "What's my partner's biggest fear?",           category: GAME_CATEGORIES.BASIC, difficulty: 'medium' },
  { id: 'lm3', question: "What does my partner's perfect day look like?", category: GAME_CATEGORIES.BASIC, difficulty: 'easy' },
];

const thisorthatQuestions = (): GameQuestion[] => [
  { id: 'tot1', question: 'Beach or Mountains?',     category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['Beach', 'Mountains'] },
  { id: 'tot2', question: 'Morning or Night?',        category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['Morning', 'Night'] },
  { id: 'tot3', question: 'Adventure or Cozy day in?', category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['Adventure', 'Cozy day in'] },
];

const twotruthsQuestions = (): GameQuestion[] => [
  { id: 'tt1', question: "Write 2 truths and 1 lie about your childhood. Your partner will guess the lie.", category: GAME_CATEGORIES.BASIC, difficulty: 'easy' },
  { id: 'tt2', question: "Write 2 truths and 1 lie about your secret talents or hobbies.", category: GAME_CATEGORIES.BASIC, difficulty: 'medium' },
];

const rouletteQuestions = (): GameQuestion[] => [
  { id: 'qr1', question: "What's something you wish your partner knew about you?", category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'medium' },
  { id: 'qr2', question: "What's a fear you have about your relationship?",        category: GAME_CATEGORIES.CONFLICT_RESOLUTION, difficulty: 'hard' },
];

const photosQuestions = (): GameQuestion[] => [
  { id: 'ph1', question: "Describe a photo that represents your happiest memory.",      category: GAME_CATEGORIES.BASIC, difficulty: 'easy' },
  { id: 'ph2', question: "Describe a photo of the place where you feel most at peace.", category: GAME_CATEGORIES.BASIC, difficulty: 'easy' },
];

const appreciationQuestions = (): GameQuestion[] => [
  { id: 'ap1', question: "What do you appreciate most about the way your partner shows love?", category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'easy' },
  { id: 'ap2', question: "Name one thing your partner does that makes even bad days better.",  category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'easy' },
];

const truthordareQuestions = (): GameQuestion[] => [
  { id: 'td1', question: "Truth: What's something about your partner that you've never told them?", category: GAME_CATEGORIES.CONFLICT_RESOLUTION, difficulty: 'hard' },
  { id: 'td2', question: "Dare: Write your partner a short note about why you chose them.",         category: GAME_CATEGORIES.AFFECTION_INTIMACY,  difficulty: 'medium' },
];

// ─── Registry ────────────────────────────────────────────────────────────────

export const GAME_REGISTRY: Record<string, GameDefinition> = {
  love_map_builder: {
    id: 'love_map_builder',
    name: 'Love Map Builder',
    icon: '🗺️',
    description: 'How well do you really know each other?',
    category: 'connection',
    getTemplatedQuestions: lovemapQuestions,
  },
  this_or_that: {
    id: 'this_or_that',
    name: 'This or That',
    icon: '🤔',
    description: 'Discover your preferences side by side',
    category: 'fun',
    getTemplatedQuestions: thisorthatQuestions,
  },
  two_truths_one_lie: {
    id: 'two_truths_one_lie',
    name: 'Two Truths and a Lie',
    icon: '🎭',
    description: 'Can you spot the lie?',
    category: 'fun',
    getTemplatedQuestions: twotruthsQuestions,
  },
  question_roulette: {
    id: 'question_roulette',
    name: 'Question Roulette',
    icon: '🎲',
    description: 'Spin into deep, unexpected territory',
    category: 'deep',
    getTemplatedQuestions: rouletteQuestions,
  },
  three_photos_challenge: {
    id: 'three_photos_challenge',
    name: '3 Photos Challenge',
    icon: '📸',
    description: 'Share moments that shaped you',
    category: 'connection',
    getTemplatedQuestions: photosQuestions,
  },
  appreciation_game: {
    id: 'appreciation_game',
    name: 'Appreciation Game',
    icon: '💝',
    description: 'Tell each other what you love',
    category: 'connection',
    getTemplatedQuestions: appreciationQuestions,
  },
  truth_or_dare: {
    id: 'truth_or_dare',
    name: 'Truth or Dare',
    icon: '⚡',
    description: 'Be honest. Be brave.',
    category: 'challenge',
    getTemplatedQuestions: truthordareQuestions,
  },
};

export function getGame(gameId: string): GameDefinition | undefined {
  return GAME_REGISTRY[gameId];
}

export function getAllGames(): GameDefinition[] {
  return Object.values(GAME_REGISTRY);
}
