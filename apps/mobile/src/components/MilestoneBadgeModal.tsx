import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { EXTERNAL_LINKS, MILESTONES } from '@twynd/shared/constants';
import type { Milestone } from '@twynd/shared/types';

interface MilestoneBadgeModalProps {
  milestone: Milestone | null;
  visible: boolean;
  onClose: () => void;
  onOpenChat: (chatSessionId: string) => void;
}

// Map milestone type to config for icon / display info
const MILESTONE_CONFIG: Record<string, { icon: string; color: string }> = {
  DAYS_7: { icon: '📅', color: '#5B8DEF' },
  DAYS_30: { icon: '🎉', color: '#FF9500' },
  FEEL_GOOD_COUPLE: { icon: '✨', color: '#FF6B9D' },
  RECONCILED_COUPLE: { icon: '🤝', color: '#34C759' },
  CUSTOM: { icon: '🏅', color: '#AF52DE' },
};

export const MilestoneBadgeModal: React.FC<MilestoneBadgeModalProps> = ({
  milestone,
  visible,
  onClose,
  onOpenChat,
}) => {
  const { session } = useUser();
  const [poem, setPoem] = useState<string | null>(null);
  const [poemLoading, setPoemLoading] = useState(false);
  const [consentLoading, setConsentLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [shareStatus, setShareStatus] = useState<{
    leadConsentToShare: boolean;
    followerConsentToShare: boolean;
    bothConsented: boolean;
  } | null>(null);

  const config = milestone ? (MILESTONE_CONFIG[milestone.type] ?? MILESTONE_CONFIG.CUSTOM) : null;
  const apiUrl = EXTERNAL_LINKS.SERVER_API;

  // Load poem when modal opens
  useEffect(() => {
    if (!visible || !milestone) return;
    // Sync consent state
    setShareStatus({
      leadConsentToShare: milestone.leadConsentToShare,
      followerConsentToShare: milestone.followerConsentToShare,
      bothConsented: milestone.leadConsentToShare && milestone.followerConsentToShare,
    });
    // Load or generate poem
    if (milestone.aiGeneratedPoem) {
      setPoem(milestone.aiGeneratedPoem);
    } else {
      fetchPoem();
    }
  }, [visible, milestone?.id]);

  const fetchPoem = async () => {
    if (!milestone || !session) return;
    setPoemLoading(true);
    try {
      const res = await fetch(`${apiUrl}/milestones/${milestone.id}/poem`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.token}` },
      });
      const data = await res.json();
      if (res.ok) setPoem(data.poem);
    } catch {
      // silently fail — poem is a bonus
    } finally {
      setPoemLoading(false);
    }
  };

  const handleConsent = async () => {
    if (!milestone || !session) return;
    setConsentLoading(true);
    try {
      const res = await fetch(`${apiUrl}/milestones/${milestone.id}/consent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({ consent: true }),
      });
      const data = await res.json();
      if (res.ok) setShareStatus(data);
    } catch {
      Alert.alert('Error', 'Could not record consent. Please try again.');
    } finally {
      setConsentLoading(false);
    }
  };

  const handleOpenChat = async () => {
    if (!milestone || !session) return;
    setChatLoading(true);
    try {
      const res = await fetch(`${apiUrl}/milestones/${milestone.id}/chat`, {
        headers: { Authorization: `Bearer ${session.token}` },
      });
      const chatSession = await res.json();
      if (res.ok) {
        onClose();
        onOpenChat(chatSession.id);
      }
    } catch {
      Alert.alert('Error', 'Could not open chat session.');
    } finally {
      setChatLoading(false);
    }
  };

  const handleShareFacebook = async () => {
    const shareUrl = `${EXTERNAL_LINKS.FACEBOOK_SHARE}?u=https://twynd.app/milestone/${milestone?.id}`;
    await Linking.openURL(shareUrl).catch(() =>
      Alert.alert('Could not open Facebook', 'Please make sure Facebook is installed or try again.')
    );
  };

  const handleShareTikTok = async () => {
    // TikTok deep-link sharing (video/card creation requires native SDK)
    await Linking.openURL('https://www.tiktok.com').catch(() =>
      Alert.alert('Could not open TikTok', 'Please make sure TikTok is installed.')
    );
  };

  if (!milestone || !config) return null;

  const myConsentKey = undefined; // determined server-side by user role
  const hasMyConsent = shareStatus?.leadConsentToShare || shareStatus?.followerConsentToShare;
  const bothConsented = shareStatus?.bothConsented ?? false;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Badge icon */}
            <View style={[styles.badgeCircle, { backgroundColor: config.color + '22' }]}>
              <Text style={styles.badgeIcon}>{config.icon}</Text>
            </View>

            {/* Title */}
            <Text style={styles.badgeTitle}>{milestone.title}</Text>
            <Text style={styles.badgeDate}>
              Awarded {new Date(milestone.awardedAt).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </Text>

            {/* Description */}
            {milestone.description && (
              <View style={styles.descriptionBox}>
                <Text style={styles.descriptionText}>{milestone.description}</Text>
              </View>
            )}

            {/* AI Poem */}
            <View style={styles.poemSection}>
              <Text style={styles.sectionLabel}>A poem for you two</Text>
              {poemLoading ? (
                <ActivityIndicator color="#FF9500" style={{ marginTop: 12 }} />
              ) : poem ? (
                <Text style={styles.poemText}>{poem}</Text>
              ) : (
                <Text style={styles.poemPlaceholder}>Generating your poem...</Text>
              )}
            </View>

            {/* Share Section */}
            <View style={styles.shareSection}>
              <Text style={styles.sectionLabel}>Share this moment</Text>

              {!hasMyConsent ? (
                <>
                  <Text style={styles.consentInfo}>
                    Both you and your partner must agree before sharing. Tap below to give your consent.
                  </Text>
                  <TouchableOpacity
                    style={styles.consentBtn}
                    onPress={handleConsent}
                    disabled={consentLoading}
                  >
                    {consentLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.consentBtnText}>I consent to share</Text>
                    )}
                  </TouchableOpacity>
                </>
              ) : !bothConsented ? (
                <View style={styles.waitingBox}>
                  <Text style={styles.waitingIcon}>⏳</Text>
                  <Text style={styles.waitingText}>
                    Waiting for your partner's consent to share. They'll see this in their Vibes dashboard.
                  </Text>
                </View>
              ) : (
                <>
                  <Text style={styles.bothConsentedText}>Both of you agreed to share!</Text>
                  <View style={styles.shareButtons}>
                    <TouchableOpacity
                      style={[styles.shareBtn, { backgroundColor: '#1877F2' }]}
                      onPress={handleShareFacebook}
                    >
                      <Text style={styles.shareBtnText}>Share on Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.shareBtn, { backgroundColor: '#000' }]}
                      onPress={handleShareTikTok}
                    >
                      <Text style={styles.shareBtnText}>Share on TikTok</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            {/* Chat about this milestone */}
            <TouchableOpacity
              style={styles.chatBtn}
              onPress={handleOpenChat}
              disabled={chatLoading}
            >
              {chatLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.chatBtnIcon}>💬</Text>
                  <Text style={styles.chatBtnText}>Chat about this milestone</Text>
                </>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingTop: 16,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 20,
    zIndex: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 18,
    color: '#999',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  badgeCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  badgeIcon: {
    fontSize: 52,
  },
  badgeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDate: {
    fontSize: 13,
    color: '#999',
    marginBottom: 16,
  },
  descriptionBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 14,
    width: '100%',
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  poemSection: {
    width: '100%',
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  poemText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  poemPlaceholder: {
    fontSize: 14,
    color: '#bbb',
    fontStyle: 'italic',
  },
  shareSection: {
    width: '100%',
    marginBottom: 24,
  },
  consentInfo: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  consentBtn: {
    backgroundColor: '#FF9500',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  consentBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  waitingBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF9F0',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  waitingIcon: {
    fontSize: 18,
  },
  waitingText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  bothConsentedText: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '600',
    marginBottom: 12,
  },
  shareButtons: {
    gap: 10,
  },
  shareBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  shareBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B8DEF',
    borderRadius: 14,
    paddingVertical: 16,
    width: '100%',
    gap: 8,
  },
  chatBtnIcon: {
    fontSize: 18,
  },
  chatBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
