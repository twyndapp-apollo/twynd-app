import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useUser } from '../context/UserContext';
import { EXTERNAL_LINKS } from '@twynd/shared/constants';
import { clearLocalProfileData } from '../services/localProfile';
import { partnerSync } from '../services/partnerSync';
import { clearWidgetData } from '../utils/widget';

const APP_VERSION = '1.0.0';
const ON_DEVICE_AI_MODEL = 'Gemini Nano (on-device)';

interface SettingsScreenProps {
  onBack: () => void;
  onLeaveRoom: () => void;   // navigate back to RoomSelection
  onDeleteAccount: () => void; // navigate back to SignUp
}

// ── Sub-components ─────────────────────────────────────────────────────────────

const SectionHeader: React.FC<{ label: string }> = ({ label }) => (
  <Text style={styles.sectionHeader}>{label}</Text>
);

const SettingsRow: React.FC<{
  icon: string;
  label: string;
  value?: string;
  locked?: boolean;
  danger?: boolean;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}> = ({ icon, label, value, locked, danger, onPress, rightElement }) => (
  <TouchableOpacity
    style={[styles.row, danger && styles.rowDanger]}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <Text style={styles.rowIcon}>{icon}</Text>
    <View style={styles.rowBody}>
      <Text style={[styles.rowLabel, danger && styles.rowLabelDanger]}>{label}</Text>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
    </View>
    {locked && (
      <View style={styles.lockedBadge}>
        <Text style={styles.lockedBadgeText}>Always On</Text>
      </View>
    )}
    {rightElement}
    {onPress && !locked && !rightElement && (
      <Text style={styles.rowChevron}>›</Text>
    )}
  </TouchableOpacity>
);

// ── Subscription box (lead + free) ────────────────────────────────────────────
const UpgradeBox: React.FC = () => (
  <View style={styles.upgradeBox}>
    <Text style={styles.upgradeTitle}>Upgrade to Premium</Text>
    <Text style={styles.upgradeDesc}>
      Unlock unlimited AI insights, milestone sharing, and priority support for you and your partner.
    </Text>
    <TouchableOpacity
      style={styles.upgradeBtn}
      onPress={() => Alert.alert('Coming Soon', 'Subscription upgrades will be available in the next update.')}
    >
      <Text style={styles.upgradeBtnText}>See Plans</Text>
    </TouchableOpacity>
  </View>
);

// ── Referral section ──────────────────────────────────────────────────────────
interface ReferralData {
  link: string;
  count: number;
  maxReferrals: number;
  extensionDaysEarned: number;
  expiresAt: string;
  isExpired: boolean;
  canRegenerate: boolean;
}

const ReferralSection: React.FC<{
  referral: ReferralData;
  onRegenerate: () => void;
  regenerating: boolean;
}> = ({ referral, onRegenerate, regenerating }) => {
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(referral.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  const handleCopy = async () => {
    await Clipboard.setStringAsync(referral.link);
    Alert.alert('Copied!', 'Referral link copied to clipboard.');
  };

  return (
    <View style={styles.referralCard}>
      <View style={styles.referralHeader}>
        <Text style={styles.referralTitle}>🎁 Invite & Extend</Text>
        <Text style={styles.referralSubtitle}>
          Each friend who subscribes adds{' '}
          <Text style={styles.referralHighlight}>+1 month</Text> to your room.
        </Text>
      </View>

      {/* Progress */}
      <View style={styles.referralProgress}>
        {Array.from({ length: referral.maxReferrals }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.referralDot,
              i < referral.count && styles.referralDotFilled,
            ]}
          />
        ))}
        <Text style={styles.referralProgressLabel}>
          {referral.count}/{referral.maxReferrals} referrals used
        </Text>
      </View>

      {referral.extensionDaysEarned > 0 && (
        <Text style={styles.referralEarned}>
          +{referral.extensionDaysEarned} days earned so far
        </Text>
      )}

      {/* Link */}
      {!referral.isExpired && referral.count < referral.maxReferrals ? (
        <>
          <View style={styles.referralLinkRow}>
            <Text style={styles.referralLink} numberOfLines={1} ellipsizeMode="middle">
              {referral.link}
            </Text>
            <TouchableOpacity style={styles.referralCopyBtn} onPress={handleCopy}>
              <Text style={styles.referralCopyBtnText}>Copy</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.referralExpiry}>
            Link valid for {daysLeft} more day{daysLeft !== 1 ? 's' : ''}
          </Text>
        </>
      ) : (
        <View style={styles.referralExpiredRow}>
          <Text style={styles.referralExpiredText}>
            {referral.count >= referral.maxReferrals ? 'Maximum referrals reached.' : 'Link expired.'}
          </Text>
          {referral.canRegenerate && referral.count < referral.maxReferrals && (
            <TouchableOpacity
              style={styles.referralRegenBtn}
              onPress={onRegenerate}
              disabled={regenerating}
            >
              {regenerating ? (
                <ActivityIndicator color="#FF9500" size="small" />
              ) : (
                <Text style={styles.referralRegenBtnText}>Generate New Link</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

// ── Main screen ────────────────────────────────────────────────────────────────
export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  onLeaveRoom,
  onDeleteAccount,
}) => {
  const { user, session, logout, currentRoomId } = useUser();
  const [subData, setSubData]             = useState<any>(null);
  const [subLoading, setSubLoading]       = useState(true);
  const [regenerating, setRegenerating]   = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const inRoom = !!currentRoomId;
  const apiUrl = EXTERNAL_LINKS.SERVER_API;

  // ── Fetch subscription data ─────────────────────────────────────────────────
  const fetchSub = useCallback(async () => {
    if (!session) return;
    try {
      const res = await fetch(`${apiUrl}/subscription`, {
        headers: { Authorization: `Bearer ${session.token}` },
      });
      if (res.ok) setSubData(await res.json());
    } catch {
      // offline — graceful empty state
    } finally {
      setSubLoading(false);
    }
  }, [session]);

  useEffect(() => { fetchSub(); }, [fetchSub]);

  // ── Referral regenerate ─────────────────────────────────────────────────────
  const handleRegenerate = async () => {
    if (!session) return;
    setRegenerating(true);
    try {
      const res = await fetch(`${apiUrl}/subscription/referral/regenerate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.token}` },
      });
      if (res.ok) fetchSub();
    } catch {
      Alert.alert('Error', 'Could not regenerate link. Please try again.');
    } finally {
      setRegenerating(false);
    }
  };

  // ── Leave room ──────────────────────────────────────────────────────────────
  const handleLeaveRoom = () => {
    Alert.alert(
      'Leave Room',
      'Are you sure you want to leave this room? Your partner will be notified and the room will be archived.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: async () => {
            setActionLoading(true);
            try {
              await fetch(`${apiUrl}/rooms/leave`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${session!.token}` },
              });
              partnerSync.disconnect();
              await clearLocalProfileData();
              await clearWidgetData();
              onLeaveRoom();
            } catch {
              Alert.alert('Error', 'Could not leave room. Please try again.');
            } finally {
              setActionLoading(false);
            }
          },
        },
      ]
    );
  };

  // ── Delete account ──────────────────────────────────────────────────────────
  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all associated data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Are you absolutely sure?',
              'Type "DELETE" to confirm.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Yes, delete my account',
                  style: 'destructive',
                  onPress: async () => {
                    setActionLoading(true);
                    try {
                      await fetch(`${apiUrl}/auth/account`, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${session!.token}` },
                      });
                      await clearLocalProfileData();
                      await clearWidgetData();
                      await logout();
                      onDeleteAccount();
                    } catch {
                      Alert.alert('Error', 'Could not delete account. Please try again.');
                    } finally {
                      setActionLoading(false);
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const isLead = user?.isRoomLead ?? false;
  const isFree = !subData?.isSubscribed;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Email + subscription status */}
        <View style={styles.accountCard}>
          <View style={styles.accountRow}>
            <Text style={styles.accountEmail} numberOfLines={1}>{user?.email}</Text>
            {subLoading ? (
              <ActivityIndicator size="small" color="#FF9500" />
            ) : (
              <View style={[styles.subBadge, subData?.isSubscribed ? styles.subBadgePaid : styles.subBadgeFree]}>
                <Text style={[styles.subBadgeText, subData?.isSubscribed ? styles.subBadgeTextPaid : styles.subBadgeTextFree]}>
                  {subData?.isSubscribed ? (subData?.isTrial ? 'Trial' : 'Premium') : 'Free'}
                </Text>
              </View>
            )}
          </View>
          {subData?.isSubscribed && subData?.endDate && (
            <Text style={styles.subExpiry}>
              Renews {new Date(subData.endDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </Text>
          )}
        </View>

        {/* Upgrade box (lead + free + in room) */}
        {inRoom && isLead && isFree && !subLoading && <UpgradeBox />}

        {/* Referral (in room + lead) */}
        {inRoom && isLead && subData?.referral && (
          <>
            <SectionHeader label="Referral" />
            <ReferralSection
              referral={subData.referral}
              onRegenerate={handleRegenerate}
              regenerating={regenerating}
            />
          </>
        )}

        {/* Always-active security features */}
        {inRoom && (
          <>
            <SectionHeader label="Privacy & Security" />
            <View style={styles.card}>
              <SettingsRow
                icon="🤖"
                label="On-Device AI"
                value={ON_DEVICE_AI_MODEL}
                locked
              />
              <View style={styles.rowDivider} />
              <SettingsRow
                icon="🔐"
                label="End-to-End Encryption"
                value="All messages and synced data are encrypted"
                locked
              />
              <View style={styles.rowDivider} />
              <SettingsRow
                icon="🚫"
                label="Screenshot Prevention"
                value="Active while in a room"
                locked
              />
            </View>
          </>
        )}

        {/* Support */}
        <SectionHeader label="Support" />
        <View style={styles.card}>
          <SettingsRow
            icon="❓"
            label="Help & Support"
            onPress={() => Linking.openURL('https://twynd.app/help')}
          />
          <View style={styles.rowDivider} />
          <SettingsRow
            icon="💬"
            label="Send Feedback"
            onPress={() => Linking.openURL('mailto:feedback@twynd.app?subject=Twynd Feedback')}
          />
          <View style={styles.rowDivider} />
          <SettingsRow
            icon="ℹ️"
            label="App Version"
            value={APP_VERSION}
          />
        </View>

        {/* Destructive actions */}
        <View style={styles.dangerSection}>
          {inRoom ? (
            <TouchableOpacity
              style={[styles.dangerBtn, styles.leaveBtn]}
              onPress={handleLeaveRoom}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <ActivityIndicator color="#FF3B30" />
              ) : (
                <Text style={styles.leaveBtnText}>Leave Room</Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.dangerBtn, styles.deleteBtn]}
              onPress={handleDeleteAccount}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <ActivityIndicator color="#FF3B30" />
              ) : (
                <Text style={styles.deleteBtnText}>Delete Account</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

      </ScrollView>
    </View>
  );
};

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, paddingTop: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#e0e0e0',
  },
  backBtn: { padding: 8, marginRight: 4 },
  backIcon: { fontSize: 28, color: '#000', lineHeight: 28 },
  headerTitle: { flex: 1, fontSize: 20, fontWeight: '700', color: '#000', textAlign: 'center' },
  headerSpacer: { width: 44 },
  scrollContent: { padding: 16, paddingBottom: 48 },

  // Account card
  accountCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 16,
  },
  accountRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  accountEmail: { flex: 1, fontSize: 15, color: '#333', fontWeight: '500' },
  subBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  subBadgeFree: { backgroundColor: '#F2F2F7' },
  subBadgePaid: { backgroundColor: '#FFF3E0' },
  subBadgeText: { fontSize: 12, fontWeight: '700' },
  subBadgeTextFree: { color: '#999' },
  subBadgeTextPaid: { color: '#FF9500' },
  subExpiry: { fontSize: 12, color: '#999', marginTop: 6 },

  // Upgrade box
  upgradeBox: {
    backgroundColor: '#FFF9F0', borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: '#FFE0B2', marginBottom: 16,
  },
  upgradeTitle: { fontSize: 16, fontWeight: '700', color: '#FF9500', marginBottom: 6 },
  upgradeDesc: { fontSize: 13, color: '#666', lineHeight: 18, marginBottom: 14 },
  upgradeBtn: {
    backgroundColor: '#FF9500', borderRadius: 10,
    paddingVertical: 12, alignItems: 'center',
  },
  upgradeBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },

  // Section header
  sectionHeader: {
    fontSize: 12, fontWeight: '700', color: '#999',
    textTransform: 'uppercase', letterSpacing: 0.8,
    marginBottom: 8, marginTop: 8, paddingHorizontal: 4,
  },

  // Card
  card: { backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', marginBottom: 16 },
  rowDivider: { height: 1, backgroundColor: '#F2F2F7', marginLeft: 52 },

  // Row
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 14, minHeight: 52,
  },
  rowDanger: { backgroundColor: '#fff' },
  rowIcon: { fontSize: 20, width: 30, marginRight: 10 },
  rowBody: { flex: 1 },
  rowLabel: { fontSize: 15, color: '#000' },
  rowLabelDanger: { color: '#FF3B30' },
  rowValue: { fontSize: 12, color: '#999', marginTop: 2 },
  rowChevron: { fontSize: 20, color: '#C7C7CC' },
  lockedBadge: {
    backgroundColor: '#E8F5E9', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  lockedBadgeText: { fontSize: 10, fontWeight: '700', color: '#34C759' },

  // Referral card
  referralCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 16,
  },
  referralHeader: { marginBottom: 14 },
  referralTitle: { fontSize: 16, fontWeight: '700', color: '#000', marginBottom: 4 },
  referralSubtitle: { fontSize: 13, color: '#666', lineHeight: 18 },
  referralHighlight: { color: '#FF9500', fontWeight: '700' },
  referralProgress: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  referralDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#F2F2F7', borderWidth: 2, borderColor: '#e0e0e0' },
  referralDotFilled: { backgroundColor: '#FF9500', borderColor: '#FF9500' },
  referralProgressLabel: { fontSize: 12, color: '#999', marginLeft: 4 },
  referralEarned: { fontSize: 12, color: '#34C759', fontWeight: '600', marginBottom: 12 },
  referralLinkRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F7F7F7', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10, marginBottom: 6,
  },
  referralLink: { flex: 1, fontSize: 12, color: '#555', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  referralCopyBtn: {
    backgroundColor: '#FF9500', borderRadius: 8,
    paddingHorizontal: 14, paddingVertical: 7, marginLeft: 8,
  },
  referralCopyBtnText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  referralExpiry: { fontSize: 11, color: '#bbb' },
  referralExpiredRow: { alignItems: 'center', gap: 10 },
  referralExpiredText: { fontSize: 13, color: '#bbb', fontStyle: 'italic' },
  referralRegenBtn: {
    backgroundColor: '#FFF3E0', borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 10,
    borderWidth: 1, borderColor: '#FFE0B2',
  },
  referralRegenBtnText: { fontSize: 13, color: '#FF9500', fontWeight: '600' },

  // Danger section
  dangerSection: { marginTop: 24 },
  dangerBtn: {
    borderRadius: 14, paddingVertical: 16, alignItems: 'center',
    borderWidth: 1,
  },
  leaveBtn: { borderColor: '#FF3B30', backgroundColor: '#fff' },
  leaveBtnText: { fontSize: 16, fontWeight: '600', color: '#FF3B30' },
  deleteBtn: { borderColor: '#FF3B30', backgroundColor: '#fff' },
  deleteBtnText: { fontSize: 16, fontWeight: '600', color: '#FF3B30' },
});

