import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Edit3, Mail, Phone, Calendar, Settings, HelpCircle, Bot } from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';

export default function Profile() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  const profileStats = [
    { label: 'Proyectos', value: '12' },
    { label: 'Completados', value: '8' },
    { label: 'En progreso', value: '4' },
  ];

  const profileActions = [
    { id: 1, icon: Edit3, label: 'Editar perfil', color: colors.primary },
    { id: 2, icon: Bot, label: 'Chat IA', color: colors.secondary },
  ];

  const handleSettingsPress = () => {
    router.push('/(main)/settings');
  };

  const handleHelpPress = () => {
    router.push('/(main)/help');
  };

  const handleActionPress = (actionId) => {
    switch (actionId) {
      case 2:
        router.push('/(main)/chatBot');
        break;
      default:
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <View style={[styles.header, { backgroundColor: colors.background.card, borderBottomColor: colors.border.light }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.username, { color: colors.text.primary }]}>Juan Díaz</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={[styles.headerIcon, { backgroundColor: colors.background.tertiary }]}
              onPress={handleSettingsPress}
            >
              <Settings size={20} color={colors.text.primary} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.headerIcon, { backgroundColor: colors.background.tertiary }]}
              onPress={handleHelpPress}
            >
              <HelpCircle size={20} color={colors.text.primary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* Estadísticas */}
        <View style={[styles.statsContainer, { backgroundColor: colors.background.card, shadowColor: colors.text.primary }]}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text.primary }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.text.tertiary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Información personal */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Información personal</Text>
          <View style={[styles.infoCard, { backgroundColor: colors.background.card, shadowColor: colors.text.primary }]}>
            <View style={[styles.infoItem, { borderBottomColor: colors.border.light }]}>
              <View style={[styles.infoIcon, { backgroundColor: colors.background.tertiary }]}>
                <Mail size={18} color={colors.text.secondary} strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.text.tertiary }]}>Email</Text>
                <Text style={[styles.infoValue, { color: colors.text.primary }]}>juan.diaz@ejemplo.com</Text>
              </View>
            </View>
            
            <View style={[styles.infoItem, { borderBottomColor: colors.border.light }]}>
              <View style={[styles.infoIcon, { backgroundColor: colors.background.tertiary }]}>
                <Phone size={18} color={colors.text.secondary} strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.text.tertiary }]}>Teléfono</Text>
                <Text style={[styles.infoValue, { color: colors.text.primary }]}>+34 123 456 789</Text>
              </View>
            </View>
            
            <View style={[styles.infoItem, styles.infoItemLast]}>
              <View style={[styles.infoIcon, { backgroundColor: colors.background.tertiary }]}>
                <Calendar size={18} color={colors.text.secondary} strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.text.tertiary }]}>Miembro desde</Text>
                <Text style={[styles.infoValue, { color: colors.text.primary }]}>Enero 2023</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Acciones rápidas */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Acciones rápidas</Text>
          <View style={styles.actionsGrid}>
            {profileActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.actionCard, { backgroundColor: colors.background.card }]}
                activeOpacity={0.7}
                onPress={() => handleActionPress(action.id)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
                  <action.icon size={22} color={action.color} strokeWidth={2} />
                </View>
                <Text style={[styles.actionLabel, { color: colors.text.secondary }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  infoCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  infoItemLast: {
    borderBottomWidth: 0,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
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
    borderRadius: 12,
    paddingVertical: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionIcon: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
