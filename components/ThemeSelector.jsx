import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Check, Palette } from 'lucide-react-native';
import { useTheme } from '../src/context/ThemeContext';
import { Typography, Spacing, BorderRadius } from '../src/constants/theme';

const { width: screenWidth } = Dimensions.get('window');

const ThemeSelector = ({ visible, onClose }) => {
  const { currentTheme, themeId, setTheme, availableThemes } = useTheme();
  const colors = currentTheme.colors;

  const handleThemeSelect = (selectedThemeId) => {
    setTheme(selectedThemeId);
  };

  const ThemePreview = ({ theme, isSelected, onSelect }) => {
    const themeColors = theme.colors;
    
    return (
      <TouchableOpacity
        style={[
          styles.themeCard,
          { 
            borderColor: isSelected ? colors.primary : colors.border.medium,
            backgroundColor: colors.background.card,
            borderWidth: isSelected ? 2 : 1,
          }
        ]}
        onPress={() => onSelect(theme.id)}
      >
        {/* Header del tema */}
        <View style={styles.themeHeader}>
          <View style={styles.themeInfo}>
            <Text style={[styles.themeName, { color: colors.text.primary }]}>
              {theme.name}
            </Text>
            <Text style={[styles.themeDescription, { color: colors.text.secondary }]}>
              {theme.description}
            </Text>
          </View>
          {isSelected && (
            <Check size={20} color={colors.primary} />
          )}
        </View>

        {/* Preview de colores */}
        <View style={styles.colorPreview}>
          <View style={styles.colorRow}>
            <View style={[
              styles.colorSample,
              { backgroundColor: themeColors.primary }
            ]} />
            <View style={[
              styles.colorSample,
              { backgroundColor: themeColors.secondary }
            ]} />
            <View style={[
              styles.colorSample,
              { backgroundColor: themeColors.accent }
            ]} />
          </View>
          <View style={styles.colorRow}>
            <View style={[
              styles.colorSample,
              { backgroundColor: themeColors.background.primary }
            ]} />
            <View style={[
              styles.colorSample,
              { backgroundColor: themeColors.background.secondary }
            ]} />
            <View style={[
              styles.colorSample,
              { backgroundColor: themeColors.navigation.active }
            ]} />
          </View>
        </View>

        {/* Mini preview de interfaz */}
        <View style={[
          styles.interfacePreview,
          { backgroundColor: themeColors.background.primary }
        ]}>
          <View style={[
            styles.previewTopBar,
            { backgroundColor: themeColors.navigation.background }
          ]}>
            <View style={[
              styles.previewIcon,
              { backgroundColor: themeColors.navigation.active }
            ]} />
            <View style={[
              styles.previewIcon,
              { backgroundColor: themeColors.navigation.inactive }
            ]} />
            <View style={[
              styles.previewIcon,
              { backgroundColor: themeColors.navigation.inactive }
            ]} />
          </View>
          <View style={[
            styles.previewContent,
            { backgroundColor: themeColors.background.secondary }
          ]} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border.light }]}>
          <View style={styles.headerContent}>
            <Palette size={24} color={colors.primary} />
            <Text style={[styles.title, { color: colors.text.primary }]}>
              Seleccionar Tema
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: colors.background.secondary }]}
            onPress={onClose}
          >
            <Text style={[styles.closeButtonText, { color: colors.text.primary }]}>
              Cerrar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de temas */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {availableThemes.map((theme) => (
            <ThemePreview
              key={theme.id}
              theme={theme}
              isSelected={theme.id === themeId}
              onSelect={handleThemeSelect}
            />
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
  },
  closeButton: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  closeButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.base,
    gap: Spacing.base,
  },
  themeCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    borderWidth: 1,
  },
  themeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    marginBottom: Spacing.xs,
  },
  themeDescription: {
    fontSize: Typography.sizes.sm,
  },
  colorPreview: {
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  colorRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  colorSample: {
    width: 30,
    height: 20,
    borderRadius: BorderRadius.sm,
    flex: 1,
  },
  interfacePreview: {
    height: 60,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  previewTopBar: {
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    gap: Spacing.xs,
  },
  previewIcon: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.sm,
  },
  previewContent: {
    flex: 1,
    margin: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
});

export default ThemeSelector;