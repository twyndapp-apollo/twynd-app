/**
 * Game Registry — pluggable architecture.
 * To add a game: create a GameDefinition and add it to GAME_REGISTRY.
 * To remove a game: delete its entry from GAME_REGISTRY — nothing else breaks.
 */

import type { GameDefinition, GameQuestion } from '@twynd/shared/types';
import { GAME_CATEGORIES } from '@twynd/shared/constants';

// ─── Love Map Builder ────────────────────────────────────────────────────────

const lovemapQuestions = (): GameQuestion[] => [
  { id: 'lm1',  question: "What's my favorite comfort food?",                       category: GAME_CATEGORIES.BASIC,              difficulty: 'easy' },
  { id: 'lm2',  question: "What's the thing I'm most afraid of?",                   category: GAME_CATEGORIES.BASIC,              difficulty: 'medium' },
  { id: 'lm3',  question: "What's my dream vacation destination?",                   category: GAME_CATEGORIES.BASIC,              difficulty: 'easy' },
  { id: 'lm4',  question: "Who is the person I turn to first when I'm struggling?",  category: GAME_CATEGORIES.BASIC,              difficulty: 'medium' },
  { id: 'lm5',  question: "What's my love language?",                                category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'easy', options: ['Words of Affirmation', 'Acts of Service', 'Receiving Gifts', 'Quality Time', 'Physical Touch'] },
  { id: 'lm6',  question: "What does my perfect Saturday look like?",                category: GAME_CATEGORIES.BASIC,              difficulty: 'easy' },
  { id: 'lm7',  question: "What's something I've always wanted to learn?",           category: GAME_CATEGORIES.VALUES_ALIGNMENT,   difficulty: 'medium' },
  { id: 'lm8',  question: "What's the best gift someone has ever given me?",         category: GAME_CATEGORIES.BASIC,              difficulty: 'medium' },
  { id: 'lm9',  question: "What childhood dream of mine still hasn't come true?",    category: GAME_CATEGORIES.VALUES_ALIGNMENT,   difficulty: 'hard' },
  { id: 'lm10', question: "What makes me feel most appreciated?",                    category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'medium' },
  { id: 'lm11', question: "What's a habit I have that I'm secretly proud of?",       category: GAME_CATEGORIES.BASIC,              difficulty: 'medium' },
  { id: 'lm12', question: "What's something I do when I need to recharge alone?",    category: GAME_CATEGORIES.BASIC,              difficulty: 'easy' },
  { id: 'lm13', question: "What's the kindest thing a stranger has ever done for me?", category: GAME_CATEGORIES.BASIC,            difficulty: 'medium' },
  { id: 'lm14', question: "What do I worry about most regarding our future together?", category: GAME_CATEGORIES.VALUES_ALIGNMENT,  difficulty: 'hard' },
];

// ─── This or That ────────────────────────────────────────────────────────────

const thisorthatQuestions = (): GameQuestion[] => [
  { id: 'tot1',  question: 'Beach or Mountains?',              category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['Beach', 'Mountains'] },
  { id: 'tot2',  question: 'Morning or Night?',                category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['Morning', 'Night'] },
  { id: 'tot3',  question: 'Netflix at home or Cinema?',       category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['Netflix at home', 'Cinema'] },
  { id: 'tot4',  question: 'Cook in or Eat out?',              category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['Cook in', 'Eat out'] },
  { id: 'tot5',  question: 'Dogs or Cats?',                    category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['Dogs', 'Cats'] },
  { id: 'tot6',  question: 'Adventure or Cozy day in?',        category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['Adventure', 'Cozy day in'] },
  { id: 'tot7',  question: 'Summer or Winter?',                category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['Summer', 'Winter'] },
  { id: 'tot8',  question: 'City break or Countryside escape?', category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['City break', 'Countryside escape'] },
  { id: 'tot9',  question: 'Text or Call?',                    category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['Text', 'Call'] },
  { id: 'tot10', question: 'Spontaneous or Planned?',          category: GAME_CATEGORIES.BASIC, difficulty: 'easy', options: ['Spontaneous', 'Planned'] },
  { id: 'tot11', question: 'Save or Spend?',                   category: GAME_CATEGORIES.FINANCIAL_ROLES, difficulty: 'easy', options: ['Save', 'Spend'] },
  { id: 'tot12', question: 'Lead or Follow?',                  category: GAME_CATEGORIES.VALUES_ALIGNMENT, difficulty: 'medium', options: ['Lead', 'Follow'] },
  { id: 'tot13', question: 'Forgive quickly or Take time to heal?', category: GAME_CATEGORIES.CONFLICT_RESOLUTION, difficulty: 'medium', options: ['Forgive quickly', 'Take time to heal'] },
  { id: 'tot14', question: 'Big wedding or Intimate ceremony?', category: GAME_CATEGORIES.VALUES_ALIGNMENT, difficulty: 'medium', options: ['Big wedding', 'Intimate ceremony'] },
];

// ─── Two Truths and a Lie ────────────────────────────────────────────────────
// Format: partner answers which of their 3 statements is the lie, the other guesses

const twotruthsQuestions = (): GameQuestion[] => [
  { id: 'tt1', question: "Write 2 true things and 1 lie about your childhood. Your partner will guess the lie.", category: GAME_CATEGORIES.BASIC, difficulty: 'easy' },
  { id: 'tt2', question: "Write 2 true things and 1 lie about your secret talents or hobbies.", category: GAME_CATEGORIES.BASIC, difficulty: 'medium' },
  { id: 'tt3', question: "Write 2 true things and 1 lie about your bucket list.", category: GAME_CATEGORIES.VALUES_ALIGNMENT, difficulty: 'medium' },
  { id: 'tt4', question: "Write 2 true things and 1 lie about your biggest fears.", category: GAME_CATEGORIES.BASIC, difficulty: 'hard' },
  { id: 'tt5', question: "Write 2 true things and 1 lie about your views on relationships.", category: GAME_CATEGORIES.VALUES_ALIGNMENT, difficulty: 'hard' },
  { id: 'tt6', question: "Write 2 true things and 1 lie about embarrassing moments in your past.", category: GAME_CATEGORIES.BASIC, difficulty: 'medium' },
];

// ─── Question Roulette ───────────────────────────────────────────────────────

const rouletteQuestions = (): GameQuestion[] => [
  { id: 'qr1',  question: "What's something you've never told anyone?",                    category: GAME_CATEGORIES.BASIC,              difficulty: 'hard' },
  { id: 'qr2',  question: "What's something you wish I knew about you?",                   category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'medium' },
  { id: 'qr3',  question: "What does your ideal future look like in 10 years?",            category: GAME_CATEGORIES.VALUES_ALIGNMENT,   difficulty: 'medium' },
  { id: 'qr4',  question: "What's a fear you have about our relationship?",                category: GAME_CATEGORIES.CONFLICT_RESOLUTION, difficulty: 'hard' },
  { id: 'qr5',  question: "What's something that instantly makes you happy?",              category: GAME_CATEGORIES.BASIC,              difficulty: 'easy' },
  { id: 'qr6',  question: "If you could change one thing about yourself, what would it be?", category: GAME_CATEGORIES.VALUES_ALIGNMENT, difficulty: 'medium' },
  { id: 'qr7',  question: "What's the best advice you've ever received?",                  category: GAME_CATEGORIES.VALUES_ALIGNMENT,   difficulty: 'medium' },
  { id: 'qr8',  question: "What would you do if you weren't afraid?",                      category: GAME_CATEGORIES.VALUES_ALIGNMENT,   difficulty: 'hard' },
  { id: 'qr9',  question: "What's a promise you've made to yourself?",                     category: GAME_CATEGORIES.VALUES_ALIGNMENT,   difficulty: 'medium' },
  { id: 'qr10', question: "When do you feel most like yourself?",                          category: GAME_CATEGORIES.BASIC,              difficulty: 'medium' },
  { id: 'qr11', question: "What's something about money that you've never discussed with a partner?", category: GAME_CATEGORIES.FINANCIAL_ROLES, difficulty: 'hard' },
  { id: 'qr12', question: "How do you imagine we'd handle a major disagreement?",          category: GAME_CATEGORIES.CONFLICT_RESOLUTION, difficulty: 'hard' },
  { id: 'qr13', question: "What role do you see yourself playing in our family one day?",  category: GAME_CATEGORIES.FAMILY_DYNAMICS,    difficulty: 'hard' },
];

// ─── 3 Photos Challenge ──────────────────────────────────────────────────────

const photosQuestions = (): GameQuestion[] => [
  { id: 'ph1', question: "Describe a photo that represents your happiest memory ever.",           category: GAME_CATEGORIES.BASIC,              difficulty: 'easy' },
  { id: 'ph2', question: "Describe a photo of the place where you feel most at peace.",           category: GAME_CATEGORIES.BASIC,              difficulty: 'easy' },
  { id: 'ph3', question: "Describe a photo of someone who shaped who you are today.",             category: GAME_CATEGORIES.BASIC,              difficulty: 'medium' },
  { id: 'ph4', question: "Describe a photo that represents your biggest dream.",                  category: GAME_CATEGORIES.VALUES_ALIGNMENT,   difficulty: 'medium' },
  { id: 'ph5', question: "Describe a photo that captures how you feel about us right now.",       category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'medium' },
  { id: 'ph6', question: "Describe a photo that shows what 'home' means to you.",                category: GAME_CATEGORIES.FAMILY_DYNAMICS,    difficulty: 'medium' },
  { id: 'ph7', question: "Describe a photo of a moment you'd want to relive together.",          category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'easy' },
  { id: 'ph8', question: "Describe a photo that represents the life you want us to build.",       category: GAME_CATEGORIES.VALUES_ALIGNMENT,   difficulty: 'hard' },
];

// ─── Appreciation Game ───────────────────────────────────────────────────────

const appreciationQuestions = (): GameQuestion[] => [
  { id: 'ap1', question: "What do you appreciate most about the way I show love?",                    category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'easy' },
  { id: 'ap2', question: "Name one thing I do that makes even bad days better.",                      category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'easy' },
  { id: 'ap3', question: "What's a quality of mine you're proud to tell others about?",               category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'medium' },
  { id: 'ap4', question: "Describe a moment when I made you feel truly seen.",                        category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'medium' },
  { id: 'ap5', question: "What's something small I do that means a lot to you?",                      category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'easy' },
  { id: 'ap6', question: "What's a way I've helped you grow as a person?",                            category: GAME_CATEGORIES.VALUES_ALIGNMENT,   difficulty: 'medium' },
  { id: 'ap7', question: "What tradition do you want us to create together?",                         category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'medium' },
  { id: 'ap8', question: "What's a dream you have for us in the next 5 years?",                       category: GAME_CATEGORIES.VALUES_ALIGNMENT,   difficulty: 'hard' },
  { id: 'ap9', question: "What do you love about how we communicate?",                                category: GAME_CATEGORIES.CONFLICT_RESOLUTION, difficulty: 'medium' },
  { id: 'ap10', question: "What's something I do that reminds you why you chose me?",                 category: GAME_CATEGORIES.AFFECTION_INTIMACY, difficulty: 'hard' },
];

// ─── Truth or Dare ───────────────────────────────────────────────────────────

const truthordareQuestions = (): GameQuestion[] => [
  { id: 'td1',  question: "Truth: What's the last small lie you told me?",                           category: GAME_CATEGORIES.CONFLICT_RESOLUTION, difficulty: 'medium' },
  { id: 'td2',  question: "Truth: What's something about me that annoys you that you've never said?", category: GAME_CATEGORIES.CONFLICT_RESOLUTION, difficulty: 'hard' },
  { id: 'td3',  question: "Dare: Write me a love note as if we're 80 years old.",                    category: GAME_CATEGORIES.AFFECTION_INTIMACY,  difficulty: 'medium' },
  { id: 'td4',  question: "Truth: What's a fear you have about our future?",                         category: GAME_CATEGORIES.VALUES_ALIGNMENT,    difficulty: 'hard' },
  { id: 'td5',  question: "Dare: Tell me 3 things you love about my personality.",                   category: GAME_CATEGORIES.AFFECTION_INTIMACY,  difficulty: 'easy' },
  { id: 'td6',  question: "Truth: What's something you've always wanted to ask me but haven't?",     category: GAME_CATEGORIES.BASIC,               difficulty: 'hard' },
  { id: 'td7',  question: "Dare: Describe our perfect day together in detail.",                       category: GAME_CATEGORIES.AFFECTION_INTIMACY,  difficulty: 'easy' },
  { id: 'td8',  question: "Truth: What's something you wish we talked about more?",                  category: GAME_CATEGORIES.CONFLICT_RESOLUTION, difficulty: 'medium' },
  { id: 'td9',  question: "Dare: Write a short poem about what I mean to you.",                      category: GAME_CATEGORIES.AFFECTION_INTIMACY,  difficulty: 'hard' },
  { id: 'td10', question: "Truth: What's your biggest relationship regret so far?",                  category: GAME_CATEGORIES.CONFLICT_RESOLUTION, difficulty: 'hard' },
  { id: 'td11', question: "Truth: How do you feel about how we handle conflict right now?",          category: GAME_CATEGORIES.CONFLICT_RESOLUTION, difficulty: 'hard' },
  { id: 'td12', question: "Dare: Describe the moment you knew you were falling for me.",             category: GAME_CATEGORIES.AFFECTION_INTIMACY,  difficulty: 'medium' },
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

/**
 * Returns all questions for a game: pre-templated first, then any AI-generated extras.
 * AI questions are appended at runtime by onDeviceAI.ts via the aiQuestions field
 * in DailyAIAnalysis — callers should merge them after fetching from storage.
 */
export function getGame(gameId: string): GameDefinition | undefined {
  return GAME_REGISTRY[gameId];
}

export function getAllGames(): GameDefinition[] {
  return Object.values(GAME_REGISTRY);
}
