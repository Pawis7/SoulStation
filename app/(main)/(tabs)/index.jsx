import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Sparkles, TrendingUp, Users, Bot } from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';

export default function MainScreen() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  const quickActions = [
    { id: 1, icon: Sparkles, label: 'Nuevo', color: colors.primary },
    { id: 2, icon: TrendingUp, label: 'Tendencias', color: colors.secondary },
    { id: 3, icon: Users, label: 'Comunidad', color: colors.accent },
    { id: 4, icon: Bot, label: 'ChatBot', color: colors.status.warning },
  ];

  const extraCards = [
    { 
      id: 1, 
      icon: Sparkles, 
      title: 'Proyecto Demo', 
      subtitle: 'Actualizado hace 2 horas',
      color: colors.primary 
    },
    { 
      id: 2, 
      icon: TrendingUp, 
      title: 'Estadísticas', 
      subtitle: 'Actualizado hace 5 horas',
      color: colors.secondary 
    },
    { 
      id: 3, 
      icon: Bot, 
      title: 'ChatBot', 
      subtitle: 'Actualizado hace 5 horas',
      color: colors.status.warning 
    },
  ];

  const handleActionPress = (actionId) => {
    switch (actionId) {
      case 4:
        router.push('/(main)/chatBot');
        break;
      default:
        // Manejar otras acciones
        break;
    }
  };

  const handleExtraCardPress = (cardId) => {
    switch (cardId) {
      case 1:
        break;
      case 3:
        router.push('/(main)/chatBot');
        break;
      default:
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>

      <View style={[styles.welcomeSection, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.greeting, { color: colors.text.primary }]}>Hola de nuevo</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>¿Qué haremos hoy?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.quickActionsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Acciones rápidas</Text>
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
            <View key={card.id} style={[styles.card, { backgroundColor: colors.background.card }]}>
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
    flex: 0,
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
    marginHorizontal: -6,
  },
  actionCard: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
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
