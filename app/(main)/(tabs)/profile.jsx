import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, HelpCircle, Heart, Activity } from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

export default function Profile() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  // Mock vital signs data - only the two needed
  const [vitalSigns, setVitalSigns] = useState({
    heartRate: { value: 72, unit: 'BPM', status: 'normal' },
    oxygenSaturation: { value: 98, unit: '%', status: 'normal' }
  });

  const handleSettingsPress = () => {
    router.push('/(main)/settings');
  };

  const handleHelpPress = () => {
    router.push('/(main)/help');
  };

  const getVitalSignColor = (status) => {
    switch (status) {
      case 'normal':
      case 'good':
        return colors.status.success;
      case 'warning':
        return colors.status.warning;
      case 'danger':
        return colors.status.error;
      default:
        return colors.text.secondary;
    }
  };

  const VitalSignCard = ({ icon: Icon, label, value, unit, status }) => (
    <View style={[styles.vitalCard, { backgroundColor: colors.background.card }]}>
      <View style={[styles.vitalIcon, { backgroundColor: getVitalSignColor(status) + '15' }]}>
        <Icon size={28} color={getVitalSignColor(status)} strokeWidth={2.5} />
      </View>
      <Text style={[styles.vitalValue, { color: colors.text.primary }]}>
        {value}<Text style={[styles.vitalUnit, { color: colors.text.tertiary }]}>{unit}</Text>
      </Text>
      <Text style={[styles.vitalLabel, { color: colors.text.secondary }]}>{label}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      {/* Header - Sin modificar */}
      <View style={[styles.header, { backgroundColor: colors.background.card, borderBottomColor: colors.border.light }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.username, { color: colors.text.primary }]}>John Doe</Text>
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

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <View style={[styles.profileImageWrapper, { backgroundColor: colors.background.card }]}>
            <Image 
              source={{ uri: 'https://i.imgur.com/moT11wY.png' }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>
          
          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={[styles.displayName, { color: colors.text.primary }]}>John Doe</Text>
            <Text style={[styles.userRole, { color: colors.text.secondary }]}>Health & Wellness</Text>
            <Text style={[styles.memberSince, { color: colors.text.tertiary }]}>Member since January 2023</Text>
          </View>
        </View>

        {/* Vital Signs Container - Below user data */}
        <View style={[styles.vitalSignsContainer, { backgroundColor: colors.background.card }]}>
          <VitalSignCard
            icon={Heart}
            label="Heart Rate"
            value={vitalSigns.heartRate.value}
            unit={vitalSigns.heartRate.unit}
            status={vitalSigns.heartRate.status}
          />
          <VitalSignCard
            icon={Activity}
            label="Oxygen"
            value={vitalSigns.oxygenSaturation.value}
            unit={vitalSigns.oxygenSaturation.unit}
            status={vitalSigns.oxygenSaturation.status}
          />
        </View>

        {/* Health Summary */}
        <View style={[styles.healthSummary, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.summaryTitle, { color: colors.text.primary }]}>Today's Summary</Text>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: colors.status.success }]} />
              <Text style={[styles.summaryText, { color: colors.text.secondary }]}>All vital signs normal</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.summaryText, { color: colors.text.secondary }]}>Active monitoring enabled</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: colors.accent }]} />
              <Text style={[styles.summaryText, { color: colors.text.secondary }]}>Wellness goals on track</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Quick Actions</Text>
          
          <View style={[styles.actionCard, { backgroundColor: colors.background.card, shadowColor: colors.text.primary }]}>
            <TouchableOpacity
              style={styles.cardContent}
              activeOpacity={0.7}
              onPress={() => router.push('/(main)/health/physical')}
            >
              <View style={[styles.cardIcon, { backgroundColor: colors.background.tertiary }]}>
                <Activity size={20} color={colors.primary} strokeWidth={2} />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Health Dashboard</Text>
                <Text style={[styles.cardSubtitle, { color: colors.text.tertiary }]}>View your vital signs and health metrics</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.actionCard, { backgroundColor: colors.background.card, shadowColor: colors.text.primary }]}>
            <TouchableOpacity
              style={styles.cardContent}
              activeOpacity={0.7}
              onPress={() => router.push('/(main)/moments')}
            >
              <View style={[styles.cardIcon, { backgroundColor: colors.background.tertiary }]}>
                <Heart size={20} color={colors.secondary} strokeWidth={2} />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={[styles.cardTitle, { color: colors.text.primary }]}>My Moments</Text>
                <Text style={[styles.cardSubtitle, { color: colors.text.tertiary }]}>Capture and review your special moments</Text>
              </View>
            </TouchableOpacity>
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
  // Header styles - Sin modificar
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 22,
    fontWeight: '600',
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
  
  // Content styles
  content: {
    paddingBottom: 100,
  },
  
  // Vital signs container - Now below user data
  vitalSignsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  vitalCard: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 12,
  },
  vitalIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  vitalValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  vitalUnit: {
    fontSize: 15,
    fontWeight: '600',
    opacity: 0.7,
  },
  vitalLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
    opacity: 0.8,
  },
  
  // Profile section
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  profileImageWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  
  // User info
  userInfo: {
    alignItems: 'center',
  },
  displayName: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 13,
    fontWeight: '400',
  },
  
  // Health summary
  healthSummary: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
  },
  summaryContent: {
    gap: 14,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  summaryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  summaryText: {
    fontSize: 15,
    fontWeight: '500',
  },
  
  // Quick actions - Same style as index cards
  quickActionsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
  },
  actionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
});
