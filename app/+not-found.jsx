import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../src/context/ThemeContext';

export default function NotFoundScreen() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Page not found 404</Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>The page you are looking for does not exist or has not been launched yet</Text>
      <Link href="/" asChild>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
          <Text style={styles.buttonText}>Ir al inicio</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
