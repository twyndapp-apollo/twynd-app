/**
 * Twynd App - Shared API Client
 * Centralized API requests for all endpoints
 */

import { EXTERNAL_LINKS } from './constants';
import type { ApiResponse } from './types';

const API_BASE_URL = EXTERNAL_LINKS.SERVER_API;

export interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchWithAuth(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  return response;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    return {
      success: false,
      error: error.error || response.statusText,
    };
  }

  const data = await response.json();
  return {
    success: true,
    data,
  };
}

// ============ AUTH ENDPOINTS ============
export const authApi = {
  async signUp(email: string, authProvider: string, authProviderId?: string, token?: string) {
    const response = await fetchWithAuth('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, authProvider, authProviderId }),
      token,
    });
    return handleResponse(response);
  },

  async signIn(email: string) {
    const response = await fetchWithAuth('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },

  async verifyToken(token: string) {
    const response = await fetchWithAuth('/auth/verify', {
      method: 'POST',
      token,
    });
    return handleResponse(response);
  },
};

// ============ USER ENDPOINTS ============
export const userApi = {
  async getProfile(token: string) {
    const response = await fetchWithAuth('/users/profile', {
      method: 'GET',
      token,
    });
    return handleResponse(response);
  },

  async updateProfile(
    token: string,
    updates: Record<string, any>
  ) {
    const response = await fetchWithAuth('/users/profile', {
      method: 'PATCH',
      body: JSON.stringify(updates),
      token,
    });
    return handleResponse(response);
  },

  async updateStatus(token: string, emoji: string, message: string) {
    const response = await fetchWithAuth('/users/status', {
      method: 'PATCH',
      body: JSON.stringify({ emoji, message }),
      token,
    });
    return handleResponse(response);
  },
};

// ============ ROOM ENDPOINTS ============
export const roomApi = {
  async createRoom(token: string) {
    const response = await fetchWithAuth('/rooms', {
      method: 'POST',
      token,
    });
    return handleResponse(response);
  },

  async getRoom(token: string, roomId: string) {
    const response = await fetchWithAuth(`/rooms/${roomId}`, {
      method: 'GET',
      token,
    });
    return handleResponse(response);
  },

  async joinRoom(token: string, roomCode: string) {
    const response = await fetchWithAuth(`/rooms/join`, {
      method: 'POST',
      body: JSON.stringify({ roomCode }),
      token,
    });
    return handleResponse(response);
  },

  async getQRCode(token: string, roomId: string) {
    const response = await fetchWithAuth(`/rooms/${roomId}/qrcode`, {
      method: 'GET',
      token,
    });
    return handleResponse(response);
  },

  async acceptConnection(token: string, leadsUserId: string, role: string) {
    const response = await fetchWithAuth(`/rooms/accept-connection`, {
      method: 'POST',
      body: JSON.stringify({ leadsUserId, role }),
      token,
    });
    return handleResponse(response);
  },

  async setLeadRole(token: string, rooomId: string, role: 'lead' | 'follower') {
    const response = await fetchWithAuth(`/rooms/${rooomId}/set-role`, {
      method: 'POST',
      body: JSON.stringify({ role }),
      token,
    });
    return handleResponse(response);
  },
};

// ============ CHAT ENDPOINTS ============
export const chatApi = {
  async getChatSessions(token: string, roomId: string) {
    const response = await fetchWithAuth(`/chat/sessions?roomId=${roomId}`, {
      method: 'GET',
      token,
    });
    return handleResponse(response);
  },

  async createChatSession(token: string, roomId: string, gameType?: string) {
    const response = await fetchWithAuth('/chat/sessions', {
      method: 'POST',
      body: JSON.stringify({ roomId, gameType }),
      token,
    });
    return handleResponse(response);
  },

  async getChatMessages(token: string, chatSessionId: string, limit: number = 50) {
    const response = await fetchWithAuth(
      `/chat/sessions/${chatSessionId}/messages?limit=${limit}`,
      {
        method: 'GET',
        token,
      }
    );
    return handleResponse(response);
  },

  async sendMessage(token: string, chatSessionId: string, content: string, contentType: string = 'text') {
    const response = await fetchWithAuth(`/chat/sessions/${chatSessionId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content, contentType }),
      token,
    });
    return handleResponse(response);
  },

  async markAsRead(token: string, messageId: string) {
    const response = await fetchWithAuth(`/chat/messages/${messageId}/read`, {
      method: 'PATCH',
      token,
    });
    return handleResponse(response);
  },
};

// ============ GAMES ENDPOINTS ============
export const gamesApi = {
  async getGameQuestions(token: string, gameType: string) {
    const response = await fetchWithAuth(`/games/${gameType}/questions`, {
      method: 'GET',
      token,
    });
    return handleResponse(response);
  },

  async submitGameResult(
    token: string,
    chatSessionId: string,
    gameType: string,
    result: Record<string, any>
  ) {
    const response = await fetchWithAuth(`/chat/sessions/${chatSessionId}/game-result`, {
      method: 'POST',
      body: JSON.stringify({ gameType, result }),
      token,
    });
    return handleResponse(response);
  },
};

// ============ SUBSCRIPTION ENDPOINTS ============
export const subscriptionApi = {
  async getSubscription(token: string) {
    const response = await fetchWithAuth('/subscriptions/current', {
      method: 'GET',
      token,
    });
    return handleResponse(response);
  },

  async upgradeSubscription(token: string) {
    const response = await fetchWithAuth('/subscriptions/upgrade', {
      method: 'POST',
      token,
    });
    return handleResponse(response);
  },

  async getReferralCode(token: string) {
    const response = await fetchWithAuth('/subscriptions/referral-code', {
      method: 'GET',
      token,
    });
    return handleResponse(response);
  },

  async useReferralCode(token: string, referralCode: string) {
    const response = await fetchWithAuth('/subscriptions/use-referral', {
      method: 'POST',
      body: JSON.stringify({ referralCode }),
      token,
    });
    return handleResponse(response);
  },
};

// ============ INSIGHTS ENDPOINTS ============
export const insightsApi = {
  async getDailyInsights(token: string, roomId: string) {
    const response = await fetchWithAuth(`/insights/daily?roomId=${roomId}`, {
      method: 'GET',
      token,
    });
    return handleResponse(response);
  },

  async getRelationshipSummary(token: string, roomId: string) {
    const response = await fetchWithAuth(`/insights/summary?roomId=${roomId}`, {
      method: 'GET',
      token,
    });
    return handleResponse(response);
  },

  async getMilestones(token: string, roomId: string) {
    const response = await fetchWithAuth(`/insights/milestones?roomId=${roomId}`, {
      method: 'GET',
      token,
    });
    return handleResponse(response);
  },
};
