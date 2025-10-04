import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Sparkles, TrendingUp, Users, Zap } from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';

export default function MainScreen() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  const quickActions = [
    { id: 1, icon: Sparkles, label: 'Nuevo', color: colors.primary },
    { id: 2, icon: TrendingUp, label: 'Tendencias', color: colors.secondary },
    { id: 3, icon: Users, label: 'Comunidad', color: colors.accent },
    { id: 4, icon: Zap, label: 'Rápido', color: colors.status.warning },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.welcomeSection, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.greeting, { color: colors.text.primary }]}>Hola de nuevo</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>¿Qué haremos hoy?</Text>
        </View>

        <View style={styles.quickActionsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Acciones rápidas</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                activeOpacity={0.7}
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
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Recientes</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.primary }]}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.card, { backgroundColor: colors.background.card }]}>
            <View style={styles.cardContent}>
              <View style={[styles.cardIcon, { backgroundColor: colors.background.tertiary }]}>
                <Sparkles size={20} color={colors.primary} strokeWidth={2} />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Proyecto Demo</Text>
                <Text style={[styles.cardSubtitle, { color: colors.text.tertiary }]}>Actualizado hace 2 horas</Text>
              </View>
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: colors.background.card }]}>
            <View style={styles.cardContent}>
              <View style={[styles.cardIcon, { backgroundColor: colors.background.tertiary }]}>
                <TrendingUp size={20} color={colors.secondary} strokeWidth={2} />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Estadísticas</Text>
                <Text style={[styles.cardSubtitle, { color: colors.text.tertiary }]}>Actualizado hace 5 horas</Text>
              </View>
            </View>
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
  content: {
    paddingBottom: 100,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
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
