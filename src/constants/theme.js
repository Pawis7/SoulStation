import { THEME_PALETTES, DEFAULT_THEME_ID } from './themes';

// Función para obtener los colores del tema actual
export const getThemeColors = (themeId = DEFAULT_THEME_ID) => {
  return THEME_PALETTES[themeId]?.colors || THEME_PALETTES[DEFAULT_THEME_ID].colors;
};

// Colores por defecto (mantener compatibilidad)
export const Colors = getThemeColors();

// Tipografía
export const Typography = {
  sizes: {
    xs: 12,
    sm: 13,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },
  
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeights: {
    tight: 16,
    normal: 20,
    relaxed: 24,
  },
};

// Espaciado
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

// Radios de borde
export const BorderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 10,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
};

// Sombras
export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};