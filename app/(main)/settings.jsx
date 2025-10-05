import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { User, Bell, Lock, Palette, Globe, HelpCircle, ChevronRight, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../src/context/ThemeContext';
import ThemeSelector from '../../components/ThemeSelector';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  const handleBackPress = () => {
    router.back();
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { id: 1, icon: User, label: 'Profile', hasArrow: true },
        { id: 2, icon: Lock, label: 'Privacy and Security', hasArrow: true },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 3,
          icon: Bell,
          label: 'Notifications',
          hasSwitch: true,
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled
        },
        {
          id: 4,
          icon: Palette,
          label: 'App Theme',
          subtitle: currentTheme.name,
          hasArrow: true,
          onPress: () => setThemeModalVisible(true)
        },
        { id: 5, icon: Globe, label: 'Language', subtitle: 'English', hasArrow: true },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 6, icon: HelpCircle, label: 'Help and Support', hasArrow: true },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      {/* Header con flecha de regreso */}
      <View style={[styles.navHeader, { backgroundColor: colors.background.card, borderBottomColor: colors.border.light }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ArrowLeft size={24} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[styles.navTitle, { color: colors.text.primary }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {settingsSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text.tertiary }]}>{section.title}</Text>
            <View style={[styles.sectionContent, { backgroundColor: colors.background.card, shadowColor: colors.text.primary }]}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingItem,
                    { borderBottomColor: colors.border.light },
                    itemIndex === section.items.length - 1 && styles.settingItemLast,
                  ]}
                  activeOpacity={item.hasSwitch ? 1 : 0.7}
                  disabled={item.hasSwitch}
                  onPress={item.onPress}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: colors.background.tertiary }]}>
                      <item.icon size={20} color={colors.text.secondary} strokeWidth={2} />
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingLabel, { color: colors.text.primary }]}>{item.label}</Text>
                      {item.subtitle && (
                        <Text style={[styles.settingSubtitle, { color: colors.text.tertiary }]}>{item.subtitle}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.settingRight}>
                    {item.hasSwitch && (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: colors.border.dark, true: colors.primary + '40' }}
                        thumbColor={item.value ? colors.primary : colors.background.card}
                      />
                    )}
                    {item.hasArrow && (
                      <ChevronRight size={20} color={colors.border.dark} strokeWidth={2} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.logoutSection}>
          <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.background.card, shadowColor: colors.text.primary }]} activeOpacity={0.7}>
            <Text style={[styles.logoutText, { color: colors.status.error }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.text.tertiary }]}>Versión 1.0.0</Text>
        </View>
      </ScrollView>

      <ThemeSelector
        visible={themeModalVisible}
        onClose={() => setThemeModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionContent: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 12,
  },
  logoutSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  logoutButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 13,
  },
});