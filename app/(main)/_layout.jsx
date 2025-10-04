import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';

export default function MainLayout() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background.primary }]}>
      <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <Stack
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: colors.background.card,
            },
            headerShadowVisible: false,
            headerTintColor: colors.text.primary,
            headerTitleStyle: {
              fontWeight: '600',
              fontSize: 18,
            },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerTitle: '',
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  menuButton: {
    marginLeft: 16,
    padding: 8,
  },
});
