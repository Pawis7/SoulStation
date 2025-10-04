import { useMemo } from 'react';
import { Colors } from '../src/constants/theme';
import { NAVIGATION_CONFIG } from '../src/config/app';

export const useTabBarConfig = () => {
  const tabBarConfig = useMemo(() => ({
    headerShown: false,
    tabBarActiveTintColor: Colors.navigation.active,
    tabBarInactiveTintColor: Colors.navigation.inactive,
    tabBarStyle: {
      backgroundColor: Colors.navigation.background,
      borderTopWidth: 1,
      borderTopColor: Colors.navigation.border,
      height: NAVIGATION_CONFIG.tabBar.height,
      paddingBottom: NAVIGATION_CONFIG.tabBar.paddingBottom,
      paddingTop: NAVIGATION_CONFIG.tabBar.paddingTop,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
      marginTop: 4,
    },
    tabBarIconStyle: {
      marginTop: 4,
    },
  }), []);

  return tabBarConfig;
};