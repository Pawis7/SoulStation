import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { TAB_SCREENS } from '../../../src/constants/navigation';
import { NAVIGATION_CONFIG } from '../../../src/config/app';
import { useTheme } from '../../../src/context/ThemeContext';
import { useMemo } from 'react';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default function TabLayout() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  const tabBarStyles = useMemo(() => StyleSheet.create({
    tabBarStyle: {
      backgroundColor: colors.navigation.background,
      borderTopWidth: 1,
      borderTopColor: colors.navigation.border,
      height: height * 0.065,
      paddingBottom: height * 0.01,
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
  }), [colors]);

  const tabBarConfig = useMemo(() => ({
    headerShown: false,
    tabBarActiveTintColor: colors.navigation.active,
    tabBarInactiveTintColor: colors.navigation.inactive,
    tabBarStyle: tabBarStyles.tabBarStyle,
    tabBarLabelStyle: tabBarStyles.tabBarLabelStyle,
    tabBarIconStyle: tabBarStyles.tabBarIconStyle,
  }), [colors, tabBarStyles]);

  return (
    <Tabs screenOptions={tabBarConfig}>
      {TAB_SCREENS.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color, size }) => (
              <screen.icon size={size} color={color} strokeWidth={2.5} />
            ),
            ...screen.options,
          }}
        />
      ))}
    </Tabs>
  );
}
