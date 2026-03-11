/**
 * Twynd App - Shared Types
 * TypeScript types used across mobile and server
 */

// ============ USER TYPES ============
export interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  avatar?: string;
  birthDate?: Date;
  zodiacSign?: string;
  age?: number;
  language: string;
  country?: string;
  description?: string;
  statusEmoji?: string;
  statusMessage?: string;
  
  // Privacy settings
  showAge: boolean;
  showZodiac: boolean;
  showBirthday: boolean;
  showLocation: boolean;
  
  // Connection status
  isRoomLead: boolean;
  currentRoomId?: string;
  connectionPartnerId?: string;
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
  date: Date;
  relationshipMetrics: RelationshipMetrics;
  interestMetrics: InterestMetrics;
  sparkMetrics: SparkMetrics;
  summaryText: string;
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
