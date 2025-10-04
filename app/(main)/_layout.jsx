import { Stack } from 'expo-router';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Menu } from 'lucide-react-native';
import { useState } from 'react';
import CustomSidebar from '../../components/CustomSidebar';

export default function MainLayout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerShadowVisible: false,
          headerTintColor: '#111827',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => setSidebarVisible(true)}
              style={styles.menuButton}
            >
              <Menu size={24} color="#111827" />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: 'Inicio',
          }}
        />
      </Stack>

      <CustomSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onNavigate={(action) => {
          console.log('Navigate to:', action);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  menuButton: {
    marginLeft: 16,
    padding: 8,
  },
});
