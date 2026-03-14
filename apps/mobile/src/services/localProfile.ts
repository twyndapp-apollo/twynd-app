/**
 * localProfile.ts
 * AsyncStorage service for personal profile data.
 *
 * All personal data (status, location, profile cards, privacy settings)
 * lives only on the device. The server never receives or stores it.
 *
 * Lead device = source of truth.
 * Follower device = replica updated via WebSocket (see partnerSync.ts).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LocalMyProfile, LocalPartnerProfile } from '@twynd/shared/types';

const MY_PROFILE_KEY      = 'twynd_my_profile';
const PARTNER_PROFILE_KEY = 'twynd_partner_profile';
const WIDGET_DATA_KEY     = 'twynd_widget_data';

// ── Defaults ───────────────────────────────────────────────────────────────────

const defaultMyProfile = (): LocalMyProfile => ({
  showAge: true,
  showZodiac: true,
  showBirthday: false,
  showLocation: true,
  statusEmoji: '😊',
  statusMessage: '',
  preferences: [],
  character: [],
  info: [],
});

// ── My profile ─────────────────────────────────────────────────────────────────

export async function getMyProfile(): Promise<LocalMyProfile> {
  try {
    const raw = await AsyncStorage.getItem(MY_PROFILE_KEY);
    if (!raw) return defaultMyProfile();
    return { ...defaultMyProfile(), ...JSON.parse(raw) };
  } catch {
    return defaultMyProfile();
  }
}

export async function saveMyProfile(data: Partial<LocalMyProfile>): Promise<LocalMyProfile> {
  const current = await getMyProfile();
  const updated = { ...current, ...data };
  await AsyncStorage.setItem(MY_PROFILE_KEY, JSON.stringify(updated));
  return updated;
}

/** Convenience: update just the status fields. */
export async function saveMyStatus(statusEmoji: string, statusMessage: string): Promise<void> {
  await saveMyProfile({ statusEmoji, statusMessage });
}

/** Convenience: update just the location fields. */
export async function saveMyLocation(
  latitude: number,
  longitude: number,
  locationCity?: string
): Promise<void> {
  await saveMyProfile({
    latitude,
    longitude,
    locationCity,
    locationUpdatedAt: new Date().toISOString(),
  });
}

// ── Partner profile (replica) ─────────────────────────────────────────────────

export async function getPartnerProfile(): Promise<LocalPartnerProfile | null> {
  try {
    const raw = await AsyncStorage.getItem(PARTNER_PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalPartnerProfile;
  } catch {
    return null;
  }
}

export async function savePartnerProfile(data: Partial<LocalPartnerProfile> & { id: string }): Promise<void> {
  const current = (await getPartnerProfile()) ?? {
    id: data.id,
    nickname: '',
    statusEmoji: '😊',
    statusMessage: '',
    preferences: [],
    character: [],
    info: [],
    lastSyncedAt: new Date().toISOString(),
  };
  const updated: LocalPartnerProfile = {
    ...current,
    ...data,
    lastSyncedAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(PARTNER_PROFILE_KEY, JSON.stringify(updated));

  // Also write to widget shared storage key so the widget picks it up
  await updateWidgetCache(updated);
}

/** Apply a partial update received via WebSocket (e.g. status_update). */
export async function applyPartnerUpdate(
  partial: Partial<LocalPartnerProfile>
): Promise<void> {
  const current = await getPartnerProfile();
  if (!current) return; // can't update if we've never done a full sync
  await savePartnerProfile({ ...current, ...partial });
}

/** Calculate Haversine distance (km) and store on the partner profile. */
export async function updatePartnerDistance(
  myLat: number,
  myLon: number
): Promise<void> {
  const partner = await getPartnerProfile();
  // Partner location is only available if they share it in their profile sync
  // distanceKm is computed on mobile from both parties' coords
  if (!partner) return;
  // distanceKm is pushed by the partner's location_update message; nothing to compute here
}

// ── Widget cache (shared storage proxy) ──────────────────────────────────────

async function updateWidgetCache(partner: LocalPartnerProfile): Promise<void> {
  const widgetData = {
    partnerNickname: partner.nickname,
    partnerAvatar: partner.avatar,
    partnerEmoji: partner.statusEmoji,
    partnerStatusMessage: partner.statusMessage,
    partnerLocationCity: partner.locationCity,
    distanceKm: partner.distanceKm,
    lastUpdatedAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(WIDGET_DATA_KEY, JSON.stringify(widgetData));
}

export async function getWidgetData() {
  try {
    const raw = await AsyncStorage.getItem(WIDGET_DATA_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ── Clear (on logout / room leave) ────────────────────────────────────────────

export async function clearLocalProfileData(): Promise<void> {
  await AsyncStorage.multiRemove([MY_PROFILE_KEY, PARTNER_PROFILE_KEY, WIDGET_DATA_KEY]);
}
