import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { MilestoneBadgeModal } from '../components/MilestoneBadgeModal';
import { EXTERNAL_LINKS, MILESTONES } from '@twynd/shared/constants';
import type { VibesDashboard, Milestone, AIInsight } from '@twynd/shared/types';

interface VibesScreenProps {
  onBack: () => void;
  onOpenChat: (chatSessionId: string) => void;
}

// ── Badge config ───────────────────────────────────────────────────────────────
const BADGE_CONFIG: Record<string, { icon: string; label: string; color: string; description: string }> = {
  DAYS_7: {
    icon: '📅',
    label: '7 Days',
    color: '#5B8DEF',
    description: 'Seven days of choosing each other. Your connection is taking root.',
  },
  DAYS_30: {
    icon: '🎉',
    label: '1 Month',
    color: '#FF9500',
    description: 'A full month together — you have moved beyond the spark into something real.',
  },
  FEEL_GOOD_COUPLE: {
    icon: '✨',
    label: 'Feel Good Couple',
    color: '#FF6B9D',
    description: 'Your vibe scores consistently show warmth, joy, and mutual care.',
  },
  RECONCILED_COUPLE: {
    icon: '🤝',
    label: 'Reconciled',
    color: '#34C759',
    description: 'You faced a tough moment and chose each other anyway. That is strength.',
  },
  CUSTOM: {
    icon: '🏅',
    label: 'Milestone',
    color: '#AF52DE',
    description: 'A special milestone in your relationship journey.',
  },
};

// All known milestone types for the locked preview row
const ALL_MILESTONE_TYPES = ['DAYS_7', 'DAYS_30', 'FEEL_GOOD_COUPLE', 'RECONCILED_COUPLE'];

// ── Metric label formatters ────────────────────────────────────────────────────
function formatMetricLabel(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// ── Sub-components ─────────────────────────────────────────────────────────────

const MetricBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <View style={metricStyles.row}>
    <Text style={metricStyles.label}>{label}</Text>
    <View style={metricStyles.track}>
      <View style={[metricStyles.fill, { width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }]} />
    </View>
    <Text style={metricStyles.value}>{Math.round(value)}</Text>
  </View>
);

const metricStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  label: { fontSize: 12, color: '#666', width: 130 },
  track: { flex: 1, height: 6, backgroundColor: '#f0f0f0', borderRadius: 3, overflow: 'hidden', marginHorizontal: 8 },
  fill: { height: '100%', borderRadius: 3 },
  value: { fontSize: 12, color: '#666', width: 28, textAlign: 'right' },
});

// ── Main screen ────────────────────────────────────────────────────────────────

export const VibesScreen: React.FC<VibesScreenProps> = ({ onBack, onOpenChat }) => {
  const { session, currentRoomId } = useUser();
  const [dashboard, setDashboard] = useState<VibesDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const apiUrl = EXTERNAL_LINKS.SERVER_API;

  const fetchDashboard = useCallback(async () => {
    if (!currentRoomId || !session) return;
    try {
      const res = await fetch(`${apiUrl}/vibes/${currentRoomId}`, {
        headers: { Authorization: `Bearer ${session.token}` },
      });
      if (res.ok) {
        const data: VibesDashboard = await res.json();
        setDashboard(data);
      }
    } catch {
      // fail silently — show empty state
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentRoomId, session]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboard();
  };

  const handleBadgePress = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setModalVisible(true);
  };

  const awardedTypes = new Set((dashboard?.milestones ?? []).map((m) => m.type));

  const renderDaysSection = () => {
    const days = dashboard?.daysTogetherCount ?? 0;
    return (
      <View style={styles.daysCard}>
        <Text style={styles.daysNumber}>{days}</Text>
        <Text style={styles.daysLabel}>Days Together</Text>
        {dashboard?.roomStartedAt && (
          <Text style={styles.daysSince}>
            Since {new Date(dashboard.roomStartedAt).toLocaleDateString(undefined, {
              month: 'long', day: 'numeric', year: 'numeric',
            })}
          </Text>
        )}
      </View>
    );
  };

  const renderSummarySection = () => {
    const summary = dashboard?.relationshipSummary ?? '';
    if (!summary) return null;
    return (
      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Your Story</Text>
        <Text style={styles.summaryText}>{summary}</Text>
      </View>
    );
  };

  const renderMilestonesSection = () => {
    const awarded = dashboard?.milestones ?? [];
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Milestones</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgeRow}>
          {ALL_MILESTONE_TYPES.map((type) => {
            const cfg = BADGE_CONFIG[type] ?? BADGE_CONFIG.CUSTOM;
            const awardedMilestone = awarded.find((m) => m.type === type);
            const isAwarded = !!awardedMilestone;
            return (
              <TouchableOpacity
                key={type}
                style={[styles.badgeCard, !isAwarded && styles.badgeCardLocked]}
                onPress={() => isAwarded && awardedMilestone && handleBadgePress(awardedMilestone)}
                activeOpacity={isAwarded ? 0.7 : 1}
              >
                <View style={[styles.badgeIconWrapper, { backgroundColor: isAwarded ? cfg.color + '22' : '#f0f0f0' }]}>
                  <Text style={[styles.badgeIcon, !isAwarded && styles.badgeIconLocked]}>{cfg.icon}</Text>
                </View>
                <Text style={[styles.badgeLabel, !isAwarded && styles.badgeLabelLocked]}>{cfg.label}</Text>
                {!isAwarded && <Text style={styles.lockedText}>Locked</Text>}
              </TouchableOpacity>
            );
          })}
          {/* Any custom milestones */}
          {awarded
            .filter((m) => m.type === 'CUSTOM')
            .map((m) => {
              const cfg = BADGE_CONFIG.CUSTOM;
              return (
                <TouchableOpacity
                  key={m.id}
                  style={styles.badgeCard}
                  onPress={() => handleBadgePress(m)}
                >
                  <View style={[styles.badgeIconWrapper, { backgroundColor: cfg.color + '22' }]}>
                    <Text style={styles.badgeIcon}>{cfg.icon}</Text>
                  </View>
                  <Text style={styles.badgeLabel}>{m.title}</Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    );
  };

  const renderInsightsSection = () => {
    const insight = dashboard?.latestInsight;
    if (!insight) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          <View style={styles.insightsEmpty}>
            <Text style={styles.insightsEmptyIcon}>🤖</Text>
            <Text style={styles.insightsEmptyTitle}>Insights coming soon</Text>
            <Text style={styles.insightsEmptyDesc}>
              The more you interact through games and chats, the more your AI relationship insights will develop.
            </Text>
          </View>
        </View>
      );
    }

    const relMetrics = insight.relationshipMetrics as Record<string, number>;
    const intMetrics = insight.interestMetrics as Record<string, number>;
    const sparkMetrics = insight.sparkMetrics as Record<string, number>;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Insights</Text>
        <Text style={styles.insightDate}>
          Last updated {new Date(insight.generatedAt).toLocaleDateString()}
        </Text>

        <View style={styles.insightGroup}>
          <Text style={styles.insightGroupTitle}>Relationship</Text>
          {Object.entries(relMetrics).map(([k, v]) => (
            <MetricBar key={k} label={formatMetricLabel(k)} value={v} color="#5B8DEF" />
          ))}
        </View>

        <View style={styles.insightGroup}>
          <Text style={styles.insightGroupTitle}>Interest</Text>
          {Object.entries(intMetrics).map(([k, v]) => (
            <MetricBar key={k} label={formatMetricLabel(k)} value={v} color="#FF9500" />
          ))}
        </View>

        <View style={styles.insightGroup}>
          <Text style={styles.insightGroupTitle}>Spark</Text>
          {Object.entries(sparkMetrics).map(([k, v]) => (
            <MetricBar key={k} label={formatMetricLabel(k)} value={v} color="#FF6B9D" />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vibes</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF9500" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF9500" />}
        >
          {renderDaysSection()}
          {renderSummarySection()}
          {renderMilestonesSection()}
          {renderInsightsSection()}
        </ScrollView>
      )}

      <MilestoneBadgeModal
        milestone={selectedMilestone}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onOpenChat={(chatSessionId) => {
          setModalVisible(false);
          onOpenChat(chatSessionId);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backBtn: {
    padding: 8,
    marginRight: 4,
  },
  backIcon: {
    fontSize: 28,
    color: '#000',
    lineHeight: 28,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  // Days card
  daysCard: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 24,
    backgroundColor: '#FFF9F0',
    margin: 16,
    borderRadius: 20,
  },
  daysNumber: {
    fontSize: 72,
    fontWeight: '800',
    color: '#FF9500',
    lineHeight: 80,
  },
  daysLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  daysSince: {
    fontSize: 13,
    color: '#999',
    marginTop: 8,
  },
  // Summary
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F7F3FF',
    borderRadius: 16,
    padding: 16,
  },
  summaryText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  // Generic section
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  // Badge row
  badgeRow: {
    paddingRight: 16,
    gap: 12,
  },
  badgeCard: {
    alignItems: 'center',
    width: 88,
  },
  badgeCardLocked: {
    opacity: 0.5,
  },
  badgeIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  badgeIcon: {
    fontSize: 30,
  },
  badgeIconLocked: {
    opacity: 0.4,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  badgeLabelLocked: {
    color: '#bbb',
  },
  lockedText: {
    fontSize: 10,
    color: '#ccc',
    marginTop: 2,
  },
  // Insights
  insightsEmpty: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
  },
  insightsEmptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  insightsEmptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  insightsEmptyDesc: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 18,
  },
  insightDate: {
    fontSize: 12,
    color: '#999',
    marginTop: -8,
    marginBottom: 16,
  },
  insightGroup: {
    marginBottom: 20,
  },
  insightGroupTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
});
