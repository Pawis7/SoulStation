import { Dimensions } from 'react-native';

/**
 * Obtiene las dimensiones actuales de la pantalla
 */
export const getScreenDimensions = () => {
  return Dimensions.get('window');
};

/**
 * Calcula dimensiones responsivas basadas en el tamaño de pantalla
 */
export const getResponsiveDimensions = () => {
  const { width, height } = getScreenDimensions();
  
  return {
    // Tamaños de pantalla
    isSmallScreen: width < 375,
    isMediumScreen: width >= 375 && width < 768,
    isLargeScreen: width >= 768,
    
    // Dimensiones calculadas
    tabBarHeight: Math.min(Math.max(height * 0.11, 60), 85),
    tabBarPadding: Math.max((height * 0.11) * 0.25, 16),
    headerHeight: Math.max(height * 0.08, 60),
    
    // Espaciado responsivo
    padding: {
      xs: width * 0.02,
      sm: width * 0.03,
      md: width * 0.04,
      lg: width * 0.05,
    },
  };
};

/**
 * Formatea fechas de manera legible
 */
export const formatDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formatea tiempo relativo (ej: "hace 5 minutos")
 */
export const formatTimeAgo = (date) => {
  const now = new Date();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Ahora mismo';
  if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} hora${Math.floor(diffInSeconds / 3600) > 1 ? 's' : ''}`;
  return `Hace ${Math.floor(diffInSeconds / 86400)} día${Math.floor(diffInSeconds / 86400) > 1 ? 's' : ''}`;
};

/**
 * Genera un color aleatorio para avatares
 */
export const generateAvatarColor = (text) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Valida formato de email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Trunca texto a una longitud específica
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Debounce function para optimizar búsquedas
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};