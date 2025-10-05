import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Brain, Gamepad2, Target, Zap, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';

export default function GamesIndex() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  const games = [
    {
      id: 1,
      title: 'Mind Sudoku',
      description: 'Train your logical thinking and concentration',
      icon: Brain,
      color: colors.primary,
      route: '/(main)/games/sudoku',
      benefits: ['Focus', 'Logic', 'Memory'],
      difficulty: 'Easy to Hard'
    },
    // Placeholder para futuros juegos
    {
      id: 2,
      title: 'Memory Match',
      description: 'Coming Soon - Boost your memory skills',
      icon: Target,
      color: colors.secondary,
      route: null,
      benefits: ['Memory', 'Attention', 'Speed'],
      difficulty: 'Coming Soon',
      comingSoon: true
    },
    {
      id: 3,
      title: 'Brain Trainer',
      description: 'Coming Soon - Multiple cognitive exercises',
      icon: Zap,
      color: colors.status.warning,
      route: null,
      benefits: ['Reaction', 'Processing', 'Flexibility'],
      difficulty: 'Coming Soon',
      comingSoon: true
    }
  ];

  const handleGamePress = (game) => {
    if (game.comingSoon) {
      // Mostrar mensaje motivacional para juegos próximos
      return;
    }
    router.push(game.route);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background.card }]}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={28} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[styles.title, { color: colors.text.primary }]}>Mind Games</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Strengthen your mind through play</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Intro Section */}
        <View style={[styles.introCard, { backgroundColor: colors.background.card }]}>
          <Brain size={32} color={colors.primary} strokeWidth={2} />
          <View style={styles.introText}>
            <Text style={[styles.introTitle, { color: colors.text.primary }]}>
              Exercise Your Mind
            </Text>
            <Text style={[styles.introDescription, { color: colors.text.secondary }]}>
              Mental wellness through engaging brain games designed to improve cognitive function and reduce stress.
            </Text>
          </View>
        </View>

        {/* Games Grid */}
        <View style={styles.gamesContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Available Games
          </Text>
          
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={[
                styles.gameCard, 
                { 
                  backgroundColor: colors.background.card,
                  opacity: game.comingSoon ? 0.6 : 1
                }
              ]}
              onPress={() => handleGamePress(game)}
              activeOpacity={0.7}
              disabled={game.comingSoon}
            >
              <View style={styles.gameHeader}>
                <View style={[
                  styles.gameIcon, 
                  { backgroundColor: game.color + '15' }
                ]}>
                  <game.icon size={24} color={game.color} strokeWidth={2} />
                </View>
                
                <View style={styles.gameInfo}>
                  <Text style={[styles.gameTitle, { color: colors.text.primary }]}>
                    {game.title}
                  </Text>
                  <Text style={[styles.gameDescription, { color: colors.text.secondary }]}>
                    {game.description}
                  </Text>
                </View>

                {game.comingSoon && (
                  <View style={[styles.comingSoonBadge, { backgroundColor: colors.status.warning + '20' }]}>
                    <Text style={[styles.comingSoonText, { color: colors.status.warning }]}>
                      Soon
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.gameDetails}>
                <View style={styles.benefits}>
                  {game.benefits.map((benefit, index) => (
                    <View 
                      key={index}
                      style={[styles.benefitTag, { backgroundColor: colors.background.tertiary }]}
                    >
                      <Text style={[styles.benefitText, { color: colors.text.secondary }]}>
                        {benefit}
                      </Text>
                    </View>
                  ))}
                </View>
                
                <Text style={[styles.difficultyText, { color: colors.text.tertiary }]}>
                  {game.difficulty}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Benefits Section */}
        <View style={[styles.benefitsCard, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.benefitsTitle, { color: colors.text.primary }]}>
            Why Mind Games? 🧠
          </Text>
          <View style={styles.benefitsList}>
            <Text style={[styles.benefitItem, { color: colors.text.secondary }]}>
              • Improve cognitive flexibility and problem-solving
            </Text>
            <Text style={[styles.benefitItem, { color: colors.text.secondary }]}>
              • Enhance focus and concentration abilities
            </Text>
            <Text style={[styles.benefitItem, { color: colors.text.secondary }]}>
              • Reduce stress through mindful engagement
            </Text>
            <Text style={[styles.benefitItem, { color: colors.text.secondary }]}>
              • Build confidence through achievement
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerRight: {
    width: 40,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  introCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  introText: {
    flex: 1,
    marginLeft: 16,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  introDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  gamesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  gameCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  gameIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  comingSoonBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  comingSoonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  gameDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  benefits: {
    flexDirection: 'row',
    flex: 1,
  },
  benefitTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  benefitText: {
    fontSize: 12,
    fontWeight: '500',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  benefitsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    fontSize: 14,
    lineHeight: 20,
  },
});