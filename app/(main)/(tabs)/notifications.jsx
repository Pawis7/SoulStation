import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, Check, X, Clock, MessageCircle, Users, Star, Zap } from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';

export default function Notifications() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  const notifications = [
    {
      id: 1,
      type: 'message',
      icon: MessageCircle,
      color: colors.primary,
      title: 'New message',
      description: 'You have received a message from Maria Garcia',
      time: '5 min ago',
      isNew: true,
    },
    {
      id: 2,
      type: 'team',
      icon: Users,
      color: colors.status.success,
      title: 'Team update',
      description: 'Your team has completed the "Mobile App" project',
      time: '1 hour ago',
      isNew: true,
    },
    {
      id: 3,
      type: 'achievement',
      icon: Star,
      color: colors.status.warning,
      title: 'Achievement unlocked!',
      description: 'You have successfully completed 10 projects',
      time: '2 hours ago',
      isNew: false,
    },
    {
      id: 4,
      type: 'reminder',
      icon: Clock,
      color: colors.accent,
      title: 'Reminder',
      description: 'Team meeting in 30 minutes',
      time: '3 hours ago',
      isNew: false,
    },
    {
      id: 5,
      type: 'update',
      icon: Zap,
      color: colors.status.error,
      title: 'Update available',
      description: 'New app version available for download',
      time: '1 day ago',
      isNew: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.isNew).length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <View style={[styles.header, { backgroundColor: colors.background.card }]}>
        <View>
          <Text style={[styles.title, { color: colors.text.primary }]}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={[styles.subtitle, { color: colors.text.secondary }]}>{unreadCount} new notifications</Text>
          )}
        </View>
        
        {unreadCount > 0 && (
          <TouchableOpacity style={[styles.markAllButton, { backgroundColor: colors.status.success + '15' }]}>
            <Check size={16} color={colors.status.success} strokeWidth={2} />
            <Text style={[styles.markAllText, { color: colors.status.success }]}>Mark all</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.background.tertiary }]}>
              <Bell size={48} color={colors.border.dark} strokeWidth={1.5} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.text.secondary }]}>No notifications</Text>
            <Text style={[styles.emptySubtitle, { color: colors.text.tertiary }]}>
              When you receive notifications, they will appear here
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  { backgroundColor: colors.background.card, shadowColor: colors.text.primary },
                  notification.isNew && { borderLeftColor: colors.primary }
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.notificationLeft}>
                  <View style={[
                    styles.notificationIcon,
                    { backgroundColor: notification.color + '15' }
                  ]}>
                    <notification.icon
                      size={20}
                      color={notification.color}
                      strokeWidth={2}
                    />
                  </View>
                  
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationHeader}>
                      <Text style={[styles.notificationTitle, { color: colors.text.primary }]}>
                        {notification.title}
                      </Text>
                      {notification.isNew && <View style={[styles.newDot, { backgroundColor: colors.primary }]} />}
                    </View>
                    <Text style={[styles.notificationDescription, { color: colors.text.secondary }]}>
                      {notification.description}
                    </Text>
                    <Text style={[styles.notificationTime, { color: colors.text.tertiary }]}>
                      {notification.time}
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.dismissButton}>
                  <X size={16} color={colors.text.tertiary} strokeWidth={2} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Configuración de notificaciones */}
        <View style={styles.settingsSection}>
          <TouchableOpacity style={[styles.settingsButton, { backgroundColor: colors.background.card, shadowColor: colors.text.primary }]}>
            <Bell size={20} color={colors.text.secondary} strokeWidth={2} />
            <Text style={[styles.settingsText, { color: colors.text.secondary }]}>Configure notifications</Text>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  markAllText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  notificationsList: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  notificationLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  newDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  notificationDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
  },
  dismissButton: {
    padding: 4,
    marginLeft: 8,
  },
  settingsSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
