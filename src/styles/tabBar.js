import { StyleSheet } from 'react-native';
import { NAVIGATION_CONFIG } from '../config/app';

export const createTabBarStyles = (colors) => StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.navigation.background,
    borderTopWidth: 1,
    borderTopColor: colors.navigation.border,
    height: NAVIGATION_CONFIG.tabBar.height,
    paddingBottom: NAVIGATION_CONFIG.tabBar.paddingBottom,
    paddingTop: NAVIGATION_CONFIG.tabBar.paddingTop,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  tabBarIconStyle: {
    marginTop: 4,
  },
});

export const getTabBarConfig = (colors) => {
  const styles = createTabBarStyles(colors);
  
  return {
    headerShown: false,
    tabBarActiveTintColor: colors.navigation.active,
    tabBarInactiveTintColor: colors.navigation.inactive,
    tabBarStyle: styles.tabBarStyle,
    tabBarLabelStyle: styles.tabBarLabelStyle,
    tabBarIconStyle: styles.tabBarIconStyle,
  };
};