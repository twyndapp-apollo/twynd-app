/**
 * Twynd App - Shared Constants
 * Central location for all hardcoded values, URLs, and configuration
 */

// ============ AUTH PROVIDERS ============
export const AUTH_PROVIDERS = {
  EMAIL: 'email',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  TIKTOK: 'tiktok',
} as const;

// ============ EXTERNAL LINKS & APIs ============
export const EXTERNAL_LINKS = {
  // OAuth/Social Login
  GOOGLE_AUTH: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
    redirectUri: process.env.GOOGLE_REDIRECT_URI || 'com.twynd.app://oauth/google',
    scopes: ['profile', 'email'],
  },
  FACEBOOK_AUTH: {
    appId: process.env.FACEBOOK_APP_ID || 'YOUR_FACEBOOK_APP_ID',
    redirectUri: process.env.FACEBOOK_REDIRECT_URI || 'com.twynd.app://oauth/facebook',
    scopes: ['public_profile', 'email'],
  },
  TIKTOK_AUTH: {
    clientId: process.env.TIKTOK_CLIENT_ID || 'YOUR_TIKTOK_CLIENT_ID',
    redirectUri: process.env.TIKTOK_REDIRECT_URI || 'com.twynd.app://oauth/tiktok',
    scopes: ['user.info.basic'],
  },

  // Social Sharing
  FACEBOOK_SHARE: 'https://www.facebook.com/sharer/sharer.php',
  TIKTOK_SHARE: 'https://www.tiktok.com/share',
  MESSENGER_SHARE: 'https://www.messenger.com/share',

  // Affiliate & External Services
  AFFILIATE_SERVICES: {
    FLORISTONE: 'https://www.florist-api.example.com',
    OPENTABLE: 'https://www.opentable.com/api',
    ONLINE_THERAPY: 'https://www.online-therapy.com',
  },

  // AI Services (On-Device & Cloud)
  GEMINI_API: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    key: process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY',
    model: 'gemini-2.5-flash',
  },

  // Server API
  SERVER_API: (() => {
    // For mobile (Expo)
    if (typeof process !== 'undefined' && process.env.EXPO_PUBLIC_API_URL) {
      return process.env.EXPO_PUBLIC_API_URL + '/api';
    }
    // For server/backend
    if (typeof process !== 'undefined' && process.env.SERVER_API_URL) {
      return process.env.SERVER_API_URL;
    }
    // Default fallback
    return 'http://localhost:3000/api';
  })(),
};

// ============ GAMES ============
export const GAMES = {
  LOVE_MAP_BUILDER: 'love_map_builder',
  THIS_OR_THAT: 'this_or_that',
  TWO_TRUTHS_ONE_LIE: 'two_truths_one_lie',
  QUESTION_ROULETTE: 'question_roulette',
  THREE_PHOTOS_CHALLENGE: 'three_photos_challenge',
  APPRECIATION_GAME: 'appreciation_game',
  TRUTH_OR_DARE: 'truth_or_dare',
} as const;

export const GAME_CONFIG = {
  [GAMES.LOVE_MAP_BUILDER]: {
    name: 'Love Map Builder',
    description: 'Build your intimate map together',
    icon: '🗺️',
  },
  [GAMES.THIS_OR_THAT]: {
    name: 'This or That',
    description: "Discover each other's preferences",
    icon: '🤔',
  },
  [GAMES.TWO_TRUTHS_ONE_LIE]: {
    name: 'Two Truths and a Lie',
    description: 'Test what you know about each other',
    icon: '🎭',
  },
  [GAMES.QUESTION_ROULETTE]: {
    name: 'Question Roulette',
    description: 'Random deep questions',
    icon: '🎲',
  },
  [GAMES.THREE_PHOTOS_CHALLENGE]: {
    name: '3 Photos Challenge',
    description: 'Share meaningful moments',
    icon: '📸',
  },
  [GAMES.APPRECIATION_GAME]: {
    name: 'Appreciation Game',
    description: 'Express what you love about each other',
    icon: '💝',
  },
  [GAMES.TRUTH_OR_DARE]: {
    name: 'Truth or Dare',
    description: 'Challenge each other',
    icon: '⚡',
  },
} as const;

// ============ ZODIAC SIGNS ============
export const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
] as const;

// ============ REACTION EMOJIS ============
export const REACTIONS = {
  HEART: '❤️',
  HAPPY: '😊',
  SAD: '😢',
  ANGRY: '😠',
  DISGUSTED: '🤢',
  SCARED: '😨',
  APATHETIC: '😑',
} as const;

export const REACTION_LIST = Object.values(REACTIONS);

// ============ MILESTONES ============
export const MILESTONES = {
  DAYS_7: {
    id: 'days_7',
    name: '7 Days Together',
    description: 'You\'ve been connected for a week!',
    icon: '📅',
  },
  DAYS_30: {
    id: 'days_30',
    name: 'One Month',
    description: 'A full month of love and connection!',
    icon: '🎉',
  },
  FEEL_GOOD_COUPLE: {
    id: 'feel_good',
    name: 'Feel Good Couple',
    description: 'Your vibes are amazing!',
    icon: '✨',
  },
  RECONCILED_COUPLE: {
    id: 'reconciled',
    name: 'Reconciled Couple',
    description: 'You worked through challenges together!',
    icon: '🤝',
  },
} as const;

// ============ VALIDATION RULES ============
export const VALIDATION_RULES = {
  NICKNAME_MIN_LENGTH: 2,
  NICKNAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 500,
  STATUS_MESSAGE_MAX_LENGTH: 50,
  CHAT_MESSAGE_MAX_LENGTH: 200,
  REFERRAL_CODE_VALIDITY_DAYS: 30,
  REFERRAL_MAX_PER_USER: 3,
  MAX_REFERRAL_EXTENSION_DAYS: 3 * 30, // 3 months max
  FREE_TRIAL_DAYS: 30,
  ROOMS_PER_DAY_FREE_USER: 1,
} as const;

// ============ AI & ML ============
export const AI_CONFIG = {
  ANALYSIS_FREQUENCY: 'daily', // Analyze when lead phone is charging
  METRICS_TO_TRACK: [
    'communication',
    'emotional_intimacy',
    'commitment',
    'conflict_resolution',
    'trust_safety',
    'compatibility',
    'independence',
    'relationship_maintenance',
  ],
  INTEREST_METRICS: [
    'initiation',
    'responsiveness',
    'active_listening',
    'deep_conversations',
    'playful_teasing',
    'prioritization',
    'inclusion',
    'effort',
    'consistency',
  ],
  SPARK_METRICS: [
    'intimacy',
    'playfulness',
    'rituals_of_connection',
    'mystery_curiosity',
  ],
  POSITIVE_NEGATIVE_RATIO: 5, // 5:1 positive to negative rule
} as const;

// ============ STORAGE KEYS (for local storage) ============
export const STORAGE_KEYS = {
  USER_TOKEN: '@twynd_user_token',
  USER_DATA: '@twynd_user_data',
  ROOM_CODE: '@twynd_room_code',
  PREFERENCES: '@twynd_preferences',
  DRAFT_MESSAGES: '@twynd_draft_messages',
} as const;

// ============ PROFILE OPTIONS ============
export const AVATAR_OPTIONS = ['😀', '😎', '🤖', '🐱', '🐶', '🦁', '🐸', '🦄', '❤️', '😊'];

export const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Chinese',
  'Japanese',
  'Korean',
];

export const COUNTRIES = [
  'USA',
  'UK',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Japan',
  'India',
  'Brazil',
  'Mexico',
  'Other',
];

// ============ CONTENT ============
export const CONTENT = {
  TERMS_CONDITIONS: {
    NO_TRAFFICKING: 'No human trafficking or exploitation',
    CONSENT_AI_TRACKING: 'I consent to on-device AI tracking for relationship insights',
    NO_SCAM: 'I agree not to engage in scams or fraudulent activities',
    NO_MERCHANT_SELLING: 'My data will not be sold to merchants or third parties',
  },
  ONBOARDING_EXPLANATION: `Twynd helps couples grow together through guided conversations and games. One person is the Lead (subscribes, receives AI insights), the other is the Follower (free access). Together, you'll explore compatibility, resolve conflicts, and deepen your connection.`,
} as const;
