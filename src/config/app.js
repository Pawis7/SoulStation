import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Dimensiones de pantalla
export const SCREEN_DIMENSIONS = {
  width: screenWidth,
  height: screenHeight,
};

// Configuración de navegación
export const NAVIGATION_CONFIG = {
  tabBar: {
    // Altura dinámica basada en pantalla
    height: Math.min(Math.max(screenHeight * 0.11, 60), 85),
    paddingBottom: Math.max((screenHeight * 0.11) * 0.25, 16),
    paddingTop: screenHeight * 0.005,
  },
};

// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'NasApp',
  version: '1.0.0',
  description: 'Aplicación móvil moderna y escalable',
};

// URLs y endpoints
export const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.nasapp.com',
  timeout: 10000,
  retries: 3,
};

// Configuración de notificaciones
export const NOTIFICATION_CONFIG = {
  enablePushNotifications: true,
  soundEnabled: true,
  vibrationEnabled: true,
};

// Límites y validaciones
export const VALIDATION_LIMITS = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxImageSize: 5 * 1024 * 1024,  // 5MB
  minPasswordLength: 8,
  maxUsernameLength: 30,
};