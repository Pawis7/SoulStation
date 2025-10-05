import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TrendingUp, Users, Bot, Cross, Dumbbell, Brain, Camera } from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';

export default function MainScreen() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  const quickActions = [
    { id: 1, icon: Cross, label: 'Mental Health', color: colors.primary },
    { id: 2, icon: Dumbbell, label: 'Physical Health', color: colors.secondary },
    { id: 3, icon: Bot, label: 'Wotteo, Your Virtual Friend', color: colors.status.warning },
    { id: 4, icon: Camera, label: 'Moments', color: colors.status.error }
  ];

  const extraCards = [
    { 
      id: 1, 
      icon: Brain, 
      title: 'Mind Games', 
      subtitle: 'Train your brain',
      color: colors.accent 
    },
    { 
      id: 2, 
      icon: Bot, 
      title: 'ChatBot', 
      subtitle: 'Updated 5 hours ago',
      color: colors.status.warning 
    },
    
  ];

  const handleActionPress = (actionId) => {
    switch (actionId) {
      case 2:
        router.push('/(main)/health/physical');
        break;
      case 3:
        router.push('/(main)/chatBot');
        break;
      case 4:
        router.push('/(main)/moments');
        break;
      default:
        // Manejar otras acciones
        break;
    }
  };

  const handleExtraCardPress = (cardId) => {
    switch (cardId) {
      case 1:
        router.push('/(main)/games');
        break;
      case 2:
        router.push('/(main)/chatBot');
        break;
      case 1:
        router.push('/(main)/games');
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>

      <View style={[styles.welcomeSection, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.greeting, { color: colors.text.primary }]}>Welcome back</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>What will we do today?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.quickActionsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                activeOpacity={0.7}
                onPress={() => handleActionPress(action.id)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
                  <action.icon size={24} color={action.color} strokeWidth={2} />
                </View>
                <Text style={[styles.actionLabel, { color: colors.text.secondary }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Extras</Text>
          </View>

          {extraCards.map((card) => (
            <View key={card.id} style={[styles.card, { backgroundColor: colors.background.card, shadowColor: colors.text.primary }]}>

              <TouchableOpacity
                style={styles.cardContent}
                activeOpacity={0.7}
                onPress={() => handleExtraCardPress(card.id)}
              >
                <View style={[styles.cardIcon, { backgroundColor: colors.background.tertiary }]}>
                  <card.icon size={20} color={card.color} strokeWidth={2} />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={[styles.cardTitle, { color: colors.text.primary }]}>{card.title}</Text>
                  <Text style={[styles.cardSubtitle, { color: colors.text.tertiary }]}>{card.subtitle}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  actionCard: {
    width: '48%',
    paddingHorizontal: 4,
    marginBottom: 12,
    shadowRadius: 2,
    borderRadius: 12,
  },
  actionIcon: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
  },
});
