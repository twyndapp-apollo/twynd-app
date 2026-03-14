import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Location from 'expo-location';
import { useUser } from '../context/UserContext';
import { EXTERNAL_LINKS } from '@twynd/shared/constants';
import {
  getMyProfile,
  saveMyProfile,
  saveMyStatus,
  saveMyLocation,
  getPartnerProfile,
  clearLocalProfileData,
} from '../services/localProfile';
import { partnerSync } from '../services/partnerSync';
import type { LocalMyProfile, LocalPartnerProfile, ProfileAttribute } from '@twynd/shared/types';

interface UsScreenProps {
  onBack: () => void;
}

// ── Haversine (client-side, metres → km) ──────────────────────────────────────
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Avatar bubble ─────────────────────────────────────────────────────────────
const AvatarBubble: React.FC<{
  avatar?: string;
  nickname: string;
  statusEmoji: string;
  statusMessage: string;
  isSelected: boolean;
  isMe: boolean;
  onPress: () => void;
}> = ({ avatar, nickname, statusEmoji, statusMessage, isSelected, isMe, onPress }) => (
  <TouchableOpacity style={styles.avatarWrapper} onPress={onPress} activeOpacity={0.8}>
    <View style={[styles.avatarCircle, isSelected && styles.avatarCircleSelected]}>
      <Text style={styles.avatarEmoji}>{avatar ?? '🧑'}</Text>
      <View style={styles.statusEmojiDot}>
        <Text style={styles.statusEmojiText}>{statusEmoji}</Text>
      </View>
    </View>
    <Text style={styles.avatarNickname} numberOfLines={1}>{nickname}</Text>
    {isMe && <Text style={styles.youLabel}>You</Text>}
    {statusMessage.length > 0 && (
      <View style={styles.callout}>
        <Text style={styles.calloutText} numberOfLines={2}>{statusMessage}</Text>
      </View>
    )}
  </TouchableOpacity>
);

// ── Attribute card ────────────────────────────────────────────────────────────
const AttributeCard: React.FC<{
  category: string;
  icon: string;
  items: ProfileAttribute[];
  editable: boolean;
  onEdit: (category: string, items: ProfileAttribute[]) => void;
}> = ({ category, icon, items, editable, onEdit }) => (
  <View style={styles.attrCard}>
    <View style={styles.attrCardHeader}>
      <Text style={styles.attrCardIcon}>{icon}</Text>
      <Text style={styles.attrCardTitle}>{category}</Text>
      {editable && (
        <TouchableOpacity style={styles.attrEditBtn} onPress={() => onEdit(category, items)}>
          <Text style={styles.attrEditBtnText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
    {items.length === 0 ? (
      <Text style={styles.attrEmpty}>{editable ? 'Tap Edit to add entries' : 'Nothing shared yet'}</Text>
    ) : (
      items.map((item, i) => (
        <View key={i} style={styles.attrRow}>
          <Text style={styles.attrKey}>{item.key}</Text>
          <Text style={styles.attrValue}>{item.value}</Text>
        </View>
      ))
    )}
  </View>
);

// ── Attribute editor modal ────────────────────────────────────────────────────
const AttributeEditorModal: React.FC<{
  visible: boolean;
  category: string;
  items: ProfileAttribute[];
  onSave: (items: ProfileAttribute[]) => void;
  onClose: () => void;
}> = ({ visible, category, items, onSave, onClose }) => {
  const [draft, setDraft] = useState<ProfileAttribute[]>([]);
  useEffect(() => { setDraft(items.map((i) => ({ ...i }))); }, [items, visible]);
  const update = (i: number, f: 'key' | 'value', t: string) =>
    setDraft((d) => d.map((x, j) => (j === i ? { ...x, [f]: t } : x)));

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.editorOverlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.editorSheet}>
          <View style={styles.editorHeader}>
            <Text style={styles.editorTitle}>Edit {category}</Text>
            <TouchableOpacity onPress={onClose}><Text style={styles.editorClose}>Cancel</Text></TouchableOpacity>
          </View>
          <ScrollView style={styles.editorScroll} keyboardShouldPersistTaps="handled">
            {draft.map((item, i) => (
              <View key={i} style={styles.editorRow}>
                <TextInput style={[styles.editorInput, styles.editorInputKey]} value={item.key}
                  onChangeText={(t) => update(i, 'key', t)} placeholder="Label" placeholderTextColor="#bbb" />
                <TextInput style={[styles.editorInput, styles.editorInputValue]} value={item.value}
                  onChangeText={(t) => update(i, 'value', t)} placeholder="Value" placeholderTextColor="#bbb" />
                <TouchableOpacity onPress={() => setDraft((d) => d.filter((_, j) => j !== i))} style={styles.editorRemove}>
                  <Text style={styles.editorRemoveText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.editorAddBtn} onPress={() => setDraft((d) => [...d, { key: '', value: '' }])}>
              <Text style={styles.editorAddBtnText}>+ Add entry</Text>
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity style={styles.editorSaveBtn}
            onPress={() => onSave(draft.filter((i) => i.key.trim() && i.value.trim()))}>
            <Text style={styles.editorSaveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// ── Status editor modal ───────────────────────────────────────────────────────
const StatusEditorModal: React.FC<{
  visible: boolean;
  emoji: string;
  message: string;
  onSave: (emoji: string, message: string) => void;
  onClose: () => void;
}> = ({ visible, emoji, message, onSave, onClose }) => {
  const [draftEmoji, setDraftEmoji] = useState(emoji);
  const [draftMessage, setDraftMessage] = useState(message);
  const QUICK = ['😊', '😍', '🥰', '😢', '😤', '😴', '🤩', '😌', '🥺', '🫶', '💫', '🌙'];
  useEffect(() => { setDraftEmoji(emoji); setDraftMessage(message); }, [emoji, message, visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.editorOverlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.editorSheet}>
          <View style={styles.editorHeader}>
            <Text style={styles.editorTitle}>How are you feeling?</Text>
            <TouchableOpacity onPress={onClose}><Text style={styles.editorClose}>Cancel</Text></TouchableOpacity>
          </View>
          <View style={styles.emojiGrid}>
            {QUICK.map((e) => (
              <TouchableOpacity key={e} style={[styles.emojiOption, draftEmoji === e && styles.emojiOptionSelected]}
                onPress={() => setDraftEmoji(e)}>
                <Text style={styles.emojiOptionText}>{e}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput style={styles.statusMessageInput} value={draftMessage}
            onChangeText={(t) => setDraftMessage(t.slice(0, 50))}
            placeholder="What's on your mind? (max 50 chars)" placeholderTextColor="#bbb" maxLength={50} />
          <Text style={styles.statusCharCount}>{draftMessage.length}/50</Text>
          <TouchableOpacity style={styles.editorSaveBtn} onPress={() => onSave(draftEmoji, draftMessage)}>
            <Text style={styles.editorSaveBtnText}>Update Status</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// ── Profile section (own or partner) ─────────────────────────────────────────
const ProfileSection: React.FC<{
  nickname: string;
  avatar?: string;
  profile: LocalMyProfile | LocalPartnerProfile;
  isMe: boolean;
  onNicknameChange?: (name: string) => void;
  onAttributeEdit?: (cat: string, items: ProfileAttribute[]) => void;
  onStatusEdit?: () => void;
  onSummaryEdit?: () => void;
}> = ({ nickname, avatar, profile, isMe, onNicknameChange, onAttributeEdit, onStatusEdit }) => {
  const [editingNickname, setEditingNickname] = useState(false);
  const [nickDraft, setNickDraft] = useState(nickname);

  const handleNickSave = () => {
    setEditingNickname(false);
    onNicknameChange?.(nickDraft.trim());
  };

  const myProfile = profile as LocalMyProfile;
  const partnerProfile = profile as LocalPartnerProfile;

  return (
    <ScrollView contentContainerStyle={styles.profileScroll} showsVerticalScrollIndicator={false}>
      {/* Nickname */}
      <View style={styles.nicknameRow}>
        {editingNickname && isMe ? (
          <View style={styles.nicknameEditRow}>
            <TextInput style={styles.nicknameInput} value={nickDraft} onChangeText={setNickDraft}
              autoFocus maxLength={30} onSubmitEditing={handleNickSave} returnKeyType="done" />
            <TouchableOpacity style={styles.nicknameSaveBtn} onPress={handleNickSave}>
              <Text style={styles.nicknameSaveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.nicknameDisplayRow}>
            <Text style={styles.nicknameText}>{nickname}</Text>
            {isMe && (
              <TouchableOpacity onPress={() => { setNickDraft(nickname); setEditingNickname(true); }}
                style={styles.nicknameEditIcon}>
                <Text style={styles.nicknameEditIconText}>✏️</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Meta chips (only shown if allowed by privacy settings) */}
      <View style={styles.metaRow}>
        {(isMe ? myProfile.showZodiac : true) && profile.zodiacSign && (
          <View style={styles.metaChip}><Text style={styles.metaChipText}>{profile.zodiacSign}</Text></View>
        )}
        {(isMe ? myProfile.showAge : true) && profile.age && (
          <View style={styles.metaChip}><Text style={styles.metaChipText}>{profile.age} yrs</Text></View>
        )}
        {profile.country && (
          <View style={styles.metaChip}><Text style={styles.metaChipText}>📍 {profile.country}</Text></View>
        )}
      </View>

      {/* Status row */}
      <TouchableOpacity style={styles.statusRow} onPress={isMe ? onStatusEdit : undefined}
        activeOpacity={isMe ? 0.7 : 1} disabled={!isMe}>
        <Text style={styles.statusRowEmoji}>{profile.statusEmoji ?? '😊'}</Text>
        <Text style={styles.statusRowMessage} numberOfLines={2}>
          {profile.statusMessage?.trim() || (isMe ? 'Tap to set your status...' : '')}
        </Text>
        {isMe && <Text style={styles.statusRowEditHint}>›</Text>}
      </TouchableOpacity>

      {/* Summary */}
      {profile.summary ? (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>{profile.summary}</Text>
          {isMe && (
            <TouchableOpacity onPress={() => onAttributeEdit?.('Summary', [])}>
              <Text style={styles.summaryEditLink}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : isMe ? (
        <TouchableOpacity style={styles.summaryBox} onPress={() => onAttributeEdit?.('Summary', [])}>
          <Text style={styles.summaryPlaceholder}>Add a short summary about yourself...</Text>
        </TouchableOpacity>
      ) : null}

      {/* Profile cards */}
      <AttributeCard category="Preferences" icon="💭" items={profile.preferences ?? []}
        editable={isMe} onEdit={onAttributeEdit ?? (() => {})} />
      <AttributeCard category="Character" icon="✨" items={profile.character ?? []}
        editable={isMe} onEdit={onAttributeEdit ?? (() => {})} />
      <AttributeCard category="Info" icon="ℹ️" items={profile.info ?? []}
        editable={isMe} onEdit={onAttributeEdit ?? (() => {})} />
    </ScrollView>
  );
};

// ── Main screen ───────────────────────────────────────────────────────────────
export const UsScreen: React.FC<UsScreenProps> = ({ onBack }) => {
  const { user, session, setUser, currentRoomId } = useUser();

  const [myProfile, setMyProfile]         = useState<LocalMyProfile | null>(null);
  const [partnerProfile, setPartnerProfile] = useState<LocalPartnerProfile | null>(null);
  const [partnerServerInfo, setPartnerServerInfo] = useState<{ id: string; nickname: string; avatar?: string } | null>(null);
  const [loading, setLoading]             = useState(true);
  const [refreshing, setRefreshing]       = useState(false);
  const [selectedTab, setSelectedTab]     = useState<'me' | 'partner'>('me');

  const [attrEditorVisible, setAttrEditorVisible] = useState(false);
  const [attrCategory, setAttrCategory]           = useState('');
  const [attrItems, setAttrItems]                 = useState<ProfileAttribute[]>([]);
  const [statusEditorVisible, setStatusEditorVisible] = useState(false);

  const apiUrl = EXTERNAL_LINKS.SERVER_API;

  // ── Load data ───────────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    const [mine, partner] = await Promise.all([getMyProfile(), getPartnerProfile()]);
    setMyProfile(mine);
    setPartnerProfile(partner);

    // Fetch partner's public nickname/avatar from server (lightweight)
    if (currentRoomId && session) {
      try {
        const res = await fetch(`${apiUrl}/us/${currentRoomId}`, {
          headers: { Authorization: `Bearer ${session.token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setPartnerServerInfo(data.partner);
          // Seed partner profile id/nickname/avatar so partnerSync has them
          if (data.partner && partner) {
            setPartnerProfile((p) => p ? { ...p, id: data.partner.id, nickname: data.partner.nickname, avatar: data.partner.avatar } : null);
          }
        }
      } catch {
        // offline — use cached data
      }
    }

    setLoading(false);
    setRefreshing(false);
  }, [currentRoomId, session]);

  useEffect(() => { loadData(); }, [loadData]);

  // ── WebSocket sync ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!session || !currentRoomId || !user) return;

    partnerSync.connect(session.token, currentRoomId, user.isRoomLead);

    // Re-render when partner data changes
    const unsub = partnerSync.addListener(async () => {
      const updated = await getPartnerProfile();
      setPartnerProfile(updated);
    });

    return () => {
      unsub();
      partnerSync.disconnect();
    };
  }, [session?.token, currentRoomId, user?.isRoomLead]);

  // ── Location ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!myProfile) return;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = loc.coords;

      let locationCity: string | undefined;
      try {
        const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
        locationCity = place?.city ?? place?.region ?? undefined;
      } catch { /* ignore */ }

      await saveMyLocation(latitude, longitude, locationCity);

      // Calculate distance to partner if they also share location
      let distanceKm: number | undefined;
      const partner = await getPartnerProfile();
      if (partner?.locationCity !== undefined && myProfile.showLocation) {
        // Distance is sent to partner; partner computes it from their own coords
        // We push our location and let the partner's device compute distance
      }

      partnerSync.pushLocationUpdate(
        myProfile.showLocation ? locationCity : undefined,
        undefined // partner will compute distance on their end
      );

      setMyProfile((p) => p ? { ...p, latitude, longitude, locationCity } : p);
    })();
  }, [!!myProfile]);

  const onRefresh = () => { setRefreshing(true); loadData(); };

  // ── Nickname change (server + local) ────────────────────────────────────────
  const handleNicknameChange = async (nickname: string) => {
    if (!session || !nickname.trim()) return;
    try {
      const res = await fetch(`${apiUrl}/us/nickname`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.token}` },
        body: JSON.stringify({ nickname }),
      });
      if (res.ok) setUser({ ...user!, nickname });
    } catch {
      Alert.alert('Error', 'Could not update nickname. Try again when online.');
    }
  };

  // ── Status change (local + WebSocket push) ───────────────────────────────────
  const handleStatusSave = async (statusEmoji: string, statusMessage: string) => {
    setStatusEditorVisible(false);
    await saveMyStatus(statusEmoji, statusMessage);
    setMyProfile((p) => p ? { ...p, statusEmoji, statusMessage } : p);
    partnerSync.pushStatusUpdate(statusEmoji, statusMessage);
  };

  // ── Profile card edit (local + WebSocket push) ───────────────────────────────
  const openAttrEditor = (category: string, items: ProfileAttribute[]) => {
    setAttrCategory(category);
    setAttrItems(items);
    setAttrEditorVisible(true);
  };

  const handleAttrSave = async (items: ProfileAttribute[]) => {
    setAttrEditorVisible(false);
    const catKey = attrCategory.toLowerCase() as keyof Pick<LocalMyProfile, 'preferences' | 'character' | 'info'>;

    if (catKey === 'summary' as any) {
      // Summary is a string, not an array — treat first item value as summary text
      const summary = items[0]?.value ?? '';
      const updated = await saveMyProfile({ summary });
      setMyProfile(updated);
      partnerSync.pushProfileUpdate({ summary });
      return;
    }

    const updated = await saveMyProfile({ [catKey]: items });
    setMyProfile(updated);
    partnerSync.pushProfileUpdate({ [catKey]: items });
  };

  // ── Distance display ─────────────────────────────────────────────────────────
  const formatDistance = (km?: number) => {
    if (km === undefined || km === null) return null;
    return km < 1 ? `${Math.round(km * 1000)} m away` : `${km.toFixed(1)} km away`;
  };

  const distanceText = formatDistance(partnerProfile?.distanceKm);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Us</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF9500" />
        </View>
      </View>
    );
  }

  const myServerInfo = { id: user?.id ?? '', nickname: user?.nickname ?? '', avatar: user?.avatar };
  const partnerDisplayNickname = partnerServerInfo?.nickname ?? partnerProfile?.nickname ?? 'Partner';
  const partnerDisplayAvatar   = partnerServerInfo?.avatar   ?? partnerProfile?.avatar;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Us</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Side-by-side avatars */}
      <View style={styles.avatarsSection}>
        <AvatarBubble
          avatar={myServerInfo.avatar}
          nickname={myServerInfo.nickname}
          statusEmoji={myProfile?.statusEmoji ?? '😊'}
          statusMessage={myProfile?.statusMessage ?? ''}
          isSelected={selectedTab === 'me'}
          isMe
          onPress={() => setSelectedTab('me')}
        />

        {/* Distance bridge */}
        <View style={styles.distanceBridge}>
          <View style={styles.distanceLine} />
          {distanceText && (
            <View style={styles.distancePill}>
              <Text style={styles.distancePillText}>{distanceText}</Text>
            </View>
          )}
          <View style={styles.distanceLine} />
        </View>

        {partnerProfile || partnerServerInfo ? (
          <AvatarBubble
            avatar={partnerDisplayAvatar}
            nickname={partnerDisplayNickname}
            statusEmoji={partnerProfile?.statusEmoji ?? '😊'}
            statusMessage={partnerProfile?.statusMessage ?? ''}
            isSelected={selectedTab === 'partner'}
            isMe={false}
            onPress={() => setSelectedTab('partner')}
          />
        ) : (
          <View style={styles.partnerPlaceholder}>
            <Text style={styles.partnerPlaceholderIcon}>🔗</Text>
            <Text style={styles.partnerPlaceholderText}>Waiting for partner</Text>
          </View>
        )}
      </View>

      {/* Profile section for selected tab */}
      {selectedTab === 'me' && myProfile ? (
        <ProfileSection
          nickname={myServerInfo.nickname}
          avatar={myServerInfo.avatar}
          profile={myProfile}
          isMe
          onNicknameChange={handleNicknameChange}
          onAttributeEdit={openAttrEditor}
          onStatusEdit={() => setStatusEditorVisible(true)}
        />
      ) : selectedTab === 'partner' && partnerProfile ? (
        <ProfileSection
          nickname={partnerDisplayNickname}
          avatar={partnerDisplayAvatar}
          profile={partnerProfile}
          isMe={false}
        />
      ) : selectedTab === 'partner' ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.partnerPlaceholderIcon}>💬</Text>
          <Text style={styles.emptyPartnerText}>
            Partner data will appear once they open Twynd.
          </Text>
        </View>
      ) : null}

      {/* Attribute editor */}
      <AttributeEditorModal
        visible={attrEditorVisible}
        category={attrCategory}
        items={attrItems}
        onSave={handleAttrSave}
        onClose={() => setAttrEditorVisible(false)}
      />

      {/* Status editor */}
      <StatusEditorModal
        visible={statusEditorVisible}
        emoji={myProfile?.statusEmoji ?? '😊'}
        message={myProfile?.statusMessage ?? ''}
        onSave={handleStatusSave}
        onClose={() => setStatusEditorVisible(false)}
      />
    </View>
  );
};

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, paddingTop: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  backBtn: { padding: 8, marginRight: 4 },
  backIcon: { fontSize: 28, color: '#000', lineHeight: 28 },
  headerTitle: { flex: 1, fontSize: 20, fontWeight: '700', color: '#000', textAlign: 'center' },
  headerSpacer: { width: 44 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyPartnerText: { fontSize: 14, color: '#999', textAlign: 'center', marginTop: 12 },

  // Avatars
  avatarsSection: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around',
    paddingHorizontal: 16, paddingVertical: 20,
    backgroundColor: '#FAFAFA', borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  avatarWrapper: { alignItems: 'center', flex: 1, maxWidth: 130 },
  avatarCircle: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: '#f0f0f0',
    alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'transparent', position: 'relative',
  },
  avatarCircleSelected: {
    borderColor: '#FF9500', shadowColor: '#FF9500',
    shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 4,
  },
  avatarEmoji: { fontSize: 36 },
  statusEmojiDot: {
    position: 'absolute', bottom: -4, right: -4, width: 24, height: 24,
    borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#e0e0e0',
  },
  statusEmojiText: { fontSize: 14 },
  avatarNickname: { fontSize: 14, fontWeight: '600', color: '#000', marginTop: 8, textAlign: 'center', maxWidth: 110 },
  youLabel: { fontSize: 11, color: '#FF9500', fontWeight: '600', marginTop: 2 },
  callout: { marginTop: 6, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 5, borderWidth: 1, borderColor: '#e8e8e8', maxWidth: 110 },
  calloutText: { fontSize: 11, color: '#555', textAlign: 'center', lineHeight: 15 },

  // Distance bridge
  distanceBridge: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 0, width: 56, paddingTop: 24 },
  distanceLine: { width: 1, flex: 1, backgroundColor: '#e0e0e0', minHeight: 20 },
  distancePill: { backgroundColor: '#FFF3E0', borderRadius: 12, paddingHorizontal: 6, paddingVertical: 3, marginVertical: 4 },
  distancePillText: { fontSize: 9, color: '#FF9500', fontWeight: '700', textAlign: 'center' },
  partnerPlaceholder: { flex: 1, alignItems: 'center', paddingTop: 12 },
  partnerPlaceholderIcon: { fontSize: 36 },
  partnerPlaceholderText: { fontSize: 12, color: '#bbb', textAlign: 'center', marginTop: 8 },

  // Profile section
  profileScroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  nicknameRow: { marginBottom: 10 },
  nicknameDisplayRow: { flexDirection: 'row', alignItems: 'center' },
  nicknameText: { fontSize: 22, fontWeight: '700', color: '#000', flex: 1 },
  nicknameEditIcon: { padding: 4 },
  nicknameEditIconText: { fontSize: 18 },
  nicknameEditRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  nicknameInput: { flex: 1, fontSize: 20, fontWeight: '700', borderBottomWidth: 2, borderBottomColor: '#FF9500', paddingBottom: 2, color: '#000' },
  nicknameSaveBtn: { backgroundColor: '#FF9500', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  nicknameSaveBtnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  metaChip: { backgroundColor: '#f4f4f4', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  metaChipText: { fontSize: 13, color: '#555' },
  statusRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF9F0', borderRadius: 12, padding: 12, marginBottom: 16, gap: 10 },
  statusRowEmoji: { fontSize: 24 },
  statusRowMessage: { flex: 1, fontSize: 14, color: '#555', lineHeight: 20 },
  statusRowEditHint: { fontSize: 20, color: '#ccc' },
  summaryBox: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 14, marginBottom: 16 },
  summaryText: { fontSize: 14, color: '#444', lineHeight: 20 },
  summaryEditLink: { fontSize: 12, color: '#FF9500', marginTop: 6 },
  summaryPlaceholder: { fontSize: 14, color: '#bbb', fontStyle: 'italic' },
  attrCard: { backgroundColor: '#f9f9f9', borderRadius: 14, padding: 14, marginBottom: 12 },
  attrCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  attrCardIcon: { fontSize: 18, marginRight: 8 },
  attrCardTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: '#000' },
  attrEditBtn: { backgroundColor: '#FF9500', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4 },
  attrEditBtnText: { fontSize: 12, color: '#fff', fontWeight: '600' },
  attrRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#ececec' },
  attrKey: { fontSize: 13, color: '#888', flex: 1 },
  attrValue: { fontSize: 13, color: '#222', fontWeight: '500', flex: 1, textAlign: 'right' },
  attrEmpty: { fontSize: 13, color: '#ccc', fontStyle: 'italic' },

  // Modals
  editorOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  editorSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '75%' },
  editorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  editorTitle: { fontSize: 17, fontWeight: '700', color: '#000' },
  editorClose: { fontSize: 15, color: '#FF9500' },
  editorScroll: { maxHeight: 320 },
  editorRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  editorInput: { backgroundColor: '#f4f4f4', borderRadius: 8, padding: 10, fontSize: 14, color: '#000' },
  editorInputKey: { flex: 0.4 },
  editorInputValue: { flex: 0.6 },
  editorRemove: { padding: 6 },
  editorRemoveText: { fontSize: 14, color: '#ccc' },
  editorAddBtn: { paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10, borderStyle: 'dashed', marginTop: 4, marginBottom: 12 },
  editorAddBtnText: { fontSize: 14, color: '#999' },
  editorSaveBtn: { backgroundColor: '#FF9500', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  editorSaveBtnText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  emojiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  emojiOption: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f4f4f4', alignItems: 'center', justifyContent: 'center' },
  emojiOptionSelected: { backgroundColor: '#FFF3E0', borderWidth: 2, borderColor: '#FF9500' },
  emojiOptionText: { fontSize: 22 },
  statusMessageInput: { backgroundColor: '#f4f4f4', borderRadius: 10, padding: 12, fontSize: 14, color: '#000', marginBottom: 4 },
  statusCharCount: { fontSize: 11, color: '#bbb', textAlign: 'right', marginBottom: 12 },
});
