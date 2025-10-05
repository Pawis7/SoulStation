import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { HelpCircle, MessageCircle, Phone, Mail, ExternalLink, ChevronDown, Search, ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import { router } from 'expo-router';

export default function Help() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  const handleBackPress = () => {
    router.back();
  };

  const contactOptions = [
    {
      id: 1,
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Immediate response',
      color: colors.primary,
      available: true,
    },
    {
      id: 2,
      icon: Mail,
      title: 'Email',
      description: 'support@nasapp.com',
      color: colors.status.success,
      available: true,
    },
    {
      id: 3,
      icon: Phone,
      title: 'Phone',
      description: '+34 900 123 456',
      color: colors.status.warning,
      available: false,
    },
  ];

  const faqItems = [
    {
      id: 1,
      question: 'How can I change my password?',
      answer: 'Go to Settings > Privacy and Security > Change Password. Enter your current password and the new password twice.',
    },
    {
      id: 2,
      question: 'How do I sync my data?',
      answer: 'Data syncs automatically when you have an internet connection. You can also force sync from the settings menu.',
    },
    {
      id: 3,
      question: 'Can I use the app without connection?',
      answer: 'Yes, many features are available offline. Changes will sync when you regain connection.',
    },
    {
      id: 4,
      question: 'How do I delete my account?',
      answer: 'Go to Settings > Privacy and Security > Delete Account. Note that this action is irreversible.',
    },
    {
      id: 5,
      question: 'Is there a limit on the number of projects?',
      answer: 'There is no limit on the number of projects you can create. However, some plans may have storage limitations.',
    },
  ];

  const quickLinks = [
    { id: 1, title: 'Quick Start Guide', icon: ExternalLink },
    { id: 2, title: 'Terms of Service', icon: ExternalLink },
    { id: 3, title: 'Privacy Policy', icon: ExternalLink },
    { id: 4, title: 'Service Status', icon: ExternalLink },
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      {/* Header con flecha de regreso */}
      <View style={[styles.navHeader, { backgroundColor: colors.background.card, borderBottomColor: colors.border.light }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ArrowLeft size={24} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[styles.navTitle, { color: colors.text.primary }]}>Help Center</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <TouchableOpacity style={[styles.searchBar, { backgroundColor: colors.background.card, shadowColor: colors.text.primary }]}>
            <Search size={20} color={colors.text.tertiary} strokeWidth={2} />
            <Text style={[styles.searchPlaceholder, { color: colors.text.tertiary }]}>Search help...</Text>
          </TouchableOpacity>
        </View>

        {/* Opciones de contacto */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Contact Us</Text>
          <View style={styles.contactGrid}>
            {contactOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.contactCard,
                  !option.available && styles.contactCardDisabled
                ]}
                activeOpacity={option.available ? 0.7 : 1}
                disabled={!option.available}
              >
                <View style={[styles.contactIcon, { backgroundColor: option.color + '15', shadowColor: colors.text.primary }]}>
                  <option.icon
                    size={24}
                    color={option.available ? option.color : colors.text.tertiary}
                    strokeWidth={2}
                  />
                </View>
                <Text style={[
                  styles.contactTitle,
                  { color: option.available ? colors.text.primary : colors.text.tertiary }
                ]}>
                  {option.title}
                </Text>
                <Text style={[
                  styles.contactDescription,
                  { color: option.available ? colors.text.secondary : colors.text.disabled }
                ]}>
                  {option.description}
                </Text>
                {!option.available && (
                  <Text style={[styles.unavailableText, { color: colors.status.error }]}>Not available</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Frequently Asked Questions</Text>
          <View style={[styles.faqContainer, { backgroundColor: colors.background.card, shadowColor: colors.text.primary }]}>
            {faqItems.map((item) => (
              <View key={item.id} style={[styles.faqItem, { borderBottomColor: colors.border.light }]}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleFaq(item.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.faqQuestionText, { color: colors.text.primary }]}>{item.question}</Text>
                  <ChevronDown
                    size={20}
                    color={colors.text.tertiary}
                    strokeWidth={2}
                    style={[
                      styles.faqChevron,
                      expandedFaq === item.id && styles.faqChevronExpanded
                    ]}
                  />
                </TouchableOpacity>
                {expandedFaq === item.id && (
                  <View style={[styles.faqAnswer, { borderTopColor: colors.border.light }]}>
                    <Text style={[styles.faqAnswerText, { color: colors.text.secondary }]}>{item.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Enlaces rápidos */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Useful Links</Text>
          <View style={[styles.linksContainer, { backgroundColor: colors.background.card, shadowColor: colors.text.primary }]}>
            {quickLinks.map((link) => (
              <TouchableOpacity
                key={link.id}
                style={[styles.linkItem, { borderBottomColor: colors.border.light }]}
                activeOpacity={0.7}
              >
                <Text style={[styles.linkText, { color: colors.text.primary }]}>{link.title}</Text>
                <link.icon size={16} color={colors.text.tertiary} strokeWidth={2} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer con versión */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.text.tertiary }]}>Versión 1.0.0</Text>
          <Text style={[styles.footerText, { color: colors.text.tertiary }]}>© 2024 NasApp</Text>
        </View>
      </ScrollView>
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchPlaceholder: {
    fontSize: 16,
    marginLeft: 12,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  contactCard: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  contactCardDisabled: {
    opacity: 0.6,
  },
  contactIcon: {
    width: '100%',
    aspectRatio: 1.2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 13,
    textAlign: 'center',
  },
  unavailableText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  faqContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  faqItem: {
    borderBottomWidth: 1,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginRight: 12,
  },
  faqChevron: {
    transform: [{ rotate: '0deg' }],
  },
  faqChevronExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
  },
  faqAnswerText: {
    fontSize: 14,
    lineHeight: 20,
  },
  linksContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 13,
    marginBottom: 4,
  },
});