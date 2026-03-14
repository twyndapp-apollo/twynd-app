import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { getAllGames } from '../games/registry';
import type { GameDefinition } from '@twynd/shared/types';

interface GamesGalleryScreenProps {
  onSelectGame: (gameId: string) => void;
  onBack: () => void;
}

const CATEGORY_LABEL: Record<string, string> = {
  connection: 'Connection',
  fun:        'Fun',
  deep:       'Deep',
  challenge:  'Challenge',
};

const CATEGORY_COLOR: Record<string, string> = {
  connection: '#FF9500',
  fun:        '#34C759',
  deep:       '#007AFF',
  challenge:  '#FF3B30',
};

export const GamesGalleryScreen: React.FC<GamesGalleryScreenProps> = ({
  onSelectGame,
  onBack,
}) => {
  const games = getAllGames();

  const renderGame = ({ item }: { item: GameDefinition }) => (
    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => onSelectGame(item.id)}
      activeOpacity={0.75}
    >
      <Text style={styles.gameIcon}>{item.icon}</Text>
      <View style={styles.gameInfo}>
        <View style={styles.gameTitleRow}>
          <Text style={styles.gameName}>{item.name}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: CATEGORY_COLOR[item.category] + '22' }]}>
            <Text style={[styles.categoryText, { color: CATEGORY_COLOR[item.category] }]}>
              {CATEGORY_LABEL[item.category]}
            </Text>
          </View>
        </View>
        <Text style={styles.gameDescription}>{item.description}</Text>
        <Text style={styles.questionCount}>
          {item.getTemplatedQuestions().length} questions · AI expands over time
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose a Game</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Text style={styles.subtitle}>
        Play together and discover each other
      </Text>

      <FlatList
        data={games}
        renderItem={renderGame}
        keyExtractor={(g) => g.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 22,
    color: '#007AFF',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 38,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingVertical: 12,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  gameCard: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ebebeb',
    alignItems: 'flex-start',
  },
  gameIcon: {
    fontSize: 36,
    marginRight: 14,
    marginTop: 2,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
    flexWrap: 'wrap',
  },
  gameName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  categoryBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  gameDescription: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
    lineHeight: 18,
  },
  questionCount: {
    fontSize: 11,
    color: '#aaa',
  },
});
