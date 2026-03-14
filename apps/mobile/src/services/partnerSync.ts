/**
 * partnerSync.ts
 * WebSocket client for syncing private profile data between partners.
 *
 * Architecture:
 *   Lead device  → sends full profile snapshot on connect, then delta updates
 *   Server       → relays messages to the other user in the same room (no persistence)
 *   Follower     → receives and stores in localProfile
 *
 * Message types (all scoped to a single room):
 *   profile_sync    — full LocalMyProfile snapshot (lead pushes on connect)
 *   status_update   — { statusEmoji, statusMessage }
 *   location_update — { locationCity, distanceKm }
 *   profile_update  — partial profile card changes { summary?, preferences?, character?, info? }
 */

import { EXTERNAL_LINKS } from '@twynd/shared/constants';
import type { LocalMyProfile, LocalPartnerProfile, LocalChatSession } from '@twynd/shared/types';
import {
  getMyProfile,
  savePartnerProfile,
  applyPartnerUpdate,
} from './localProfile';
import { upsertChatSession } from './chatStore';

export type SyncMessageType =
  | 'profile_sync'
  | 'status_update'
  | 'location_update'
  | 'profile_update'
  | 'chat_message'
  | 'game_session_invite'   // creator → partner: here is a new game session for you
  | 'game_complete'         // partner → creator: here are my answers, compute results
  | 'game_answer';          // kept for compatibility

export interface SyncMessage {
  type: SyncMessageType;
  payload: Record<string, unknown>;
  senderId?: string; // filled in by server on relay
}

type MessageHandler = (msg: SyncMessage) => void;

class PartnerSyncService {
  private ws: WebSocket | null = null;
  private token: string | null = null;
  private roomId: string | null = null;
  private isLead = false;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private listeners: Set<MessageHandler> = new Set();
  private connected = false;

  // ── Connect ────────────────────────────────────────────────────────────────

  connect(token: string, roomId: string, isLead: boolean): void {
    this.token  = token;
    this.roomId = roomId;
    this.isLead = isLead;
    this.openSocket();
  }

  private openSocket(): void {
    if (!this.token || !this.roomId) return;

    const wsBase = EXTERNAL_LINKS.SERVER_API
      .replace(/^http/, 'ws')
      .replace(/\/api$/, '');
    const url = `${wsBase}/ws?token=${encodeURIComponent(this.token)}&roomId=${encodeURIComponent(this.roomId)}`;

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.connected = true;
      console.log('[partnerSync] connected');
      if (this.isLead) {
        // Lead immediately pushes full snapshot so follower is up-to-date
        this.pushFullSnapshot();
      }
    };

    this.ws.onmessage = (event) => {
      try {
        const msg: SyncMessage = JSON.parse(event.data);
        this.handleIncoming(msg);
      } catch {
        // ignore malformed messages
      }
    };

    this.ws.onerror = () => {
      console.warn('[partnerSync] WebSocket error — will reconnect');
    };

    this.ws.onclose = () => {
      this.connected = false;
      console.log('[partnerSync] disconnected — reconnecting in 5s');
      this.reconnectTimer = setTimeout(() => this.openSocket(), 5000);
    };
  }

  // ── Disconnect ─────────────────────────────────────────────────────────────

  disconnect(): void {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
    this.connected = false;
  }

  // ── Send helpers ───────────────────────────────────────────────────────────

  private send(type: SyncMessageType, payload: Record<string, unknown>): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify({ type, payload }));
  }

  /** Generic raw send — used by GameScreen and ChatSessionScreen. */
  sendRaw(type: SyncMessageType, payload: Record<string, unknown>): void {
    this.send(type, payload);
  }

  /** Push a full snapshot of our profile to the partner (lead does this on connect). */
  async pushFullSnapshot(): Promise<void> {
    const profile = await getMyProfile();
    this.send('profile_sync', profile as unknown as Record<string, unknown>);
  }

  /** Push status change to partner immediately. */
  pushStatusUpdate(statusEmoji: string, statusMessage: string): void {
    this.send('status_update', { statusEmoji, statusMessage });
  }

  /** Push location update (city + precomputed distance from our coords). */
  pushLocationUpdate(locationCity: string | undefined, distanceKm: number | undefined): void {
    this.send('location_update', { locationCity, distanceKm });
  }

  /** Push specific profile card changes to partner. */
  pushProfileUpdate(changes: Partial<Pick<LocalMyProfile, 'summary' | 'preferences' | 'character' | 'info'>>): void {
    this.send('profile_update', changes as Record<string, unknown>);
  }

  // ── Receive ────────────────────────────────────────────────────────────────

  private async handleIncoming(msg: SyncMessage): Promise<void> {
    const { type, payload, senderId } = msg;

    switch (type) {
      case 'profile_sync': {
        // Full snapshot from partner — replace entire partner profile
        const p = payload as Partial<LocalMyProfile> & { senderId?: string };
        await savePartnerProfile({
          id: senderId ?? p.senderId ?? 'unknown',
          nickname: '',           // will be filled from server on next us/ fetch
          statusEmoji: p.statusEmoji ?? '😊',
          statusMessage: p.statusMessage ?? '',
          zodiacSign: p.showZodiac ? p.zodiacSign : undefined,
          age: p.showAge ? p.age : undefined,
          country: p.country,
          summary: p.summary,
          preferences: p.preferences ?? [],
          character: p.character ?? [],
          info: p.info ?? [],
          locationCity: p.showLocation ? p.locationCity : undefined,
        });
        break;
      }

      case 'status_update': {
        const { statusEmoji, statusMessage } = payload as {
          statusEmoji: string;
          statusMessage: string;
        };
        await applyPartnerUpdate({ statusEmoji, statusMessage });
        break;
      }

      case 'location_update': {
        const { locationCity, distanceKm } = payload as {
          locationCity?: string;
          distanceKm?: number;
        };
        await applyPartnerUpdate({ locationCity, distanceKm });
        break;
      }

      case 'profile_update': {
        await applyPartnerUpdate(payload as Partial<LocalPartnerProfile>);
        break;
      }

      case 'game_session_invite': {
        // Partner sent us a new game session — persist it so it appears in their session list.
        const invite = payload as {
          session: LocalChatSession;
          creatorAnswers: Record<string, string>;
        };
        await upsertChatSession({
          ...invite.session,
          gameState: 'my_turn',
          theirAnswers: invite.creatorAnswers,
          isGameCreator: false,
          unreadCount: 1,             // badge to draw partner's attention
          lastMessagePreview: '🎮 Your turn to play!',
        });
        break;
      }

      // chat_message, game_complete, game_answer:
      // Receiving screen handles storage via its own listener.
      case 'chat_message':
      case 'game_complete':
      case 'game_answer':
        break;
    }

    // Notify any registered listeners (e.g. to trigger a UI re-render)
    for (const fn of this.listeners) fn(msg);
  }

  // ── Listener API ───────────────────────────────────────────────────────────

  addListener(fn: MessageHandler): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  isConnected(): boolean {
    return this.connected;
  }
}

// Singleton — shared across all screens
export const partnerSync = new PartnerSyncService();
