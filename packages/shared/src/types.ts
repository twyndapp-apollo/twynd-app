/**
 * Twynd App - Shared Types
 * TypeScript types used across mobile and server
 */

// ============ USER TYPES ============
// ============ SERVER USER (public identity only) ============
// Stored on server — used for room invitations and chat display only.
export interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  avatar?: string;
  isRoomLead: boolean;
  currentRoomId?: string;
  connectionPartnerId?: string;
}

// ============ LOCAL-ONLY TYPES (never sent to server) ============

export interface ProfileAttribute {
  key: string;
  value: string;
}

/** Full personal profile stored in AsyncStorage on the user's own device. */
export interface LocalMyProfile {
  // Personal details
  birthDate?: string;        // ISO string
  zodiacSign?: string;
  age?: number;
  language?: string;
  country?: string;
  description?: string;
  // Privacy settings (control what partner sees over WebSocket)
  showAge: boolean;
  showZodiac: boolean;
  showBirthday: boolean;
  showLocation: boolean;
  // Status (synced to partner via WebSocket)
  statusEmoji: string;
  statusMessage: string;
  // Location (synced to partner via WebSocket)
  latitude?: number;
  longitude?: number;
  locationCity?: string;
  locationUpdatedAt?: string;
  // Profile cards (synced to partner via WebSocket)
  summary?: string;
  preferences: ProfileAttribute[];
  character: ProfileAttribute[];
  info: ProfileAttribute[];
}

/** Partner's data stored locally after WebSocket sync. Lead is source of truth. */
export interface LocalPartnerProfile {
  // From server (fetched once on room join)
  id: string;
  nickname: string;
  avatar?: string;
  // Personal details shared by partner (filtered by their privacy settings)
  zodiacSign?: string;
  age?: number;
  country?: string;
  // Status (received via WebSocket)
  statusEmoji: string;
  statusMessage: string;
  // Location (received via WebSocket)
  locationCity?: string;
  distanceKm?: number;
  // Profile cards (received via WebSocket)
  summary?: string;
  preferences: ProfileAttribute[];
  character: ProfileAttribute[];
  info: ProfileAttribute[];
  // Sync metadata
  lastSyncedAt: string;      // ISO string
}

// ============ US DASHBOARD (assembled entirely from local storage) ============
export interface UsDashboard {
  me: LocalMyProfile & { id: string; nickname: string; avatar?: string };
  partner: LocalPartnerProfile | null;
}

// ============ WIDGET DATA (written to shared storage by app, read by widget) ============
export interface WidgetData {
  partnerNickname: string;
  partnerAvatar?: string;
  partnerEmoji: string;
  partnerStatusMessage: string;
  partnerLocationCity?: string;
  distanceKm?: number;
  lastUpdatedAt: string;
}

export interface UserSession {
  userId: string;
  token: string;
  expiresAt: Date;
}

// ============ AUTH TYPES ============
export type AuthProvider = 'email' | 'google' | 'facebook' | 'tiktok';

export interface SignUpData {
  email: string;
  authProvider: AuthProvider;
  authProviderId?: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
  isNewUser: boolean;
}

// ============ ROOM TYPES ============
export enum RoomRole {
  LEAD = 'lead',
  FOLLOWER = 'follower',
}

export interface Room {
  id: string;
  code: string;
  qrCodeUrl?: string;
  status: 'waiting' | 'active' | 'completed';
  createdAt: Date;
  roomStartedAt?: Date;
}

export interface RoomInvitation {
  code: string;
  leadNickname: string;
  leadAvatar?: string;
  expiresAt?: Date;
}

export interface RoomAcceptanceData {
  leadUserId: string;
  followerUserId: string;
  role: RoomRole;
}

// ============ CHAT & MESSAGE TYPES ============
export interface Message {
  id: string;
  chatSessionId: string;
  senderId: string;
  content: string;
  contentType: 'text' | 'reaction' | 'game_result';
  isRead: boolean;
  createdAt: Date;
}

export interface ChatSession {
  id: string;
  roomId: string;
  gameType?: string;
  title: string;
  milestoneId?: string;
  lastMessageAt?: Date;
  unreadCount: number;
  createdAt: Date;
}

export interface MessagePayload {
  content: string;
  contentType: 'text' | 'reaction' | 'game_result';
  reactionToId?: string;
}

// ============ GAME TYPES ============
export interface GameResult {
  gameType: string;
  playersAnswers: Record<string, any>;
  timestamp: Date;
  compatibility?: number;
}

export interface GameQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options?: string[];
}

// ============ SUBSCRIPTION TYPES ============
export interface Subscription {
  id: string;
  userId: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  endDate: Date;
  isTrialPeriod: boolean;
  trialEndDate?: Date;
  referralCode: string;
  referralCount: number;
}

export interface ReferralInfo {
  code: string;
  validUntil: Date;
  usedCount: number;
  maxUses: number;
}

// ============ MILESTONE TYPES ============
export interface Milestone {
  id: string;
  roomId: string;
  type: string;
  title: string;
  description?: string;
  aiGeneratedPoem?: string;
  chatSessionId?: string;
  leadConsentToShare: boolean;
  followerConsentToShare: boolean;
  awardedAt: Date;
}

// ============ AI METRICS TYPES ============
export interface RelationshipMetrics {
  commitment: number;
  emotional_intimacy: number;
  communication: number;
  conflict_resolution: number;
  trust_safety: number;
  compatibility: number;
  independence: number;
  relationship_maintenance: number;
}

export interface InterestMetrics {
  initiation: number;
  responsiveness: number;
  active_listening: number;
  deep_conversations: number;
  playful_teasing: number;
  prioritization: number;
  inclusion: number;
  effort: number;
  consistency: number;
}

export interface SparkMetrics {
  intimacy: number;
  playfulness: number;
  rituals_of_connection: number;
  mystery_curiosity: number;
}

export interface AIInsight {
  id: string;
  roomId: string;
  date: Date;
  generatedAt: Date;
  relationshipMetrics: RelationshipMetrics;
  interestMetrics: InterestMetrics;
  sparkMetrics: SparkMetrics;
  summaryText: string;
}

// ============ VIBES DASHBOARD ============
export interface VibesDashboard {
  daysTogetherCount: number;
  roomStartedAt: Date | null;
  milestones: Milestone[];
  latestInsight: AIInsight | null;
  relationshipSummary: string;
}

// ============ API RESPONSE TYPES ============
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============ WEBSOCKET TYPES ============
export interface WebSocketMessage {
  type: 'message' | 'typing' | 'online_status' | 'reaction' | 'game_update';
  payload: any;
  timestamp: Date;
}

// ============ LOCAL CHAT TYPES (device-only, never sent to server) ============

export interface LocalChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  text: string;
  contentType: 'text' | 'game_result';
  gameResultData?: LocalGameResult;
  timestamp: string;   // ISO string
  isRead: boolean;
}

export interface LocalChatSession {
  id: string;
  title: string;
  gameType?: string;
  milestoneId?: string;
  lastMessageAt: string;      // ISO string — sorted descending in store
  lastMessagePreview?: string;
  unreadCount: number;
  createdAt: string;          // ISO string
}

export interface LocalGameResult {
  gameType: string;
  myAnswers: Record<string, string>;       // questionId → answer
  partnerAnswers: Record<string, string>;  // questionId → answer
  questions: GameQuestion[];
  matchScore: number;                      // 0–100
  completedAt: string;                     // ISO string
}

// ============ GAME DEFINITION (pluggable registry) ============

export interface GameDefinition {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'connection' | 'fun' | 'deep' | 'challenge';
  getTemplatedQuestions(): GameQuestion[];
}

// ============ ON-DEVICE AI TYPES ============

export type MetricTrend = 'up' | 'neutral' | 'down';

export interface MetricWithInsight {
  score: number;         // 0–100
  trend: MetricTrend;
  insight: string;       // one-sentence daily insight
}

export interface DailyAIAnalysis {
  date: string;          // 'YYYY-MM-DD'
  generatedAt: string;   // ISO
  relationship: { [K in keyof RelationshipMetrics]: MetricWithInsight };
  interest: { [K in keyof InterestMetrics]: MetricWithInsight };
  spark: { [K in keyof SparkMetrics]: MetricWithInsight };
  individualitySummaryMe: string;
  individualitySummaryPartner: string;
  relationshipSummary: string;
  aiQuestions: { [gameId: string]: GameQuestion[] };  // AI-generated extras per game
}
