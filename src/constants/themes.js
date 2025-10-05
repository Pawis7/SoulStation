// Sistema de temas múltiples - 2 claros y 2 oscuros
export const THEME_PALETTES = {
  light: {
    id: 'light',
    name: 'Claro',
    description: 'Tema claro personalizado',
    colors: {
      // Colores principales - Nueva paleta personalizada
      primary: '#9759EB',        // Púrpura principal
      secondary: '#63F0D8',      // Turquesa
      accent: '#8FCBFF',         // Azul medio
      
      // Colores de texto
      text: {
        primary: '#000000',      // Negro principal
        secondary: '#4b5563',
        tertiary: '#6b7280',
        disabled: '#9ca3af',
      },
      
      // Colores de fondo
      background: {
        primary: '#ffffff',
        secondary: '#f9fafb',     // Azul claro como fondo secundario
        tertiary: '#f3f4f6',
        card: '#ffffff',
      },
      
      // Colores de estado
      status: {
        success: '#63F0D8',      // Turquesa para éxito
        warning: '#deb24b',      // Amarillo para advertencias
        error: '#dc2626',
        info: '#9759EB',         // Púrpura para información
      },
      
      // Colores de borde
      border: {
        light: '#D6E7F8',        // Azul claro para bordes suaves
        medium: '#8FCBFF',       // Azul medio para bordes normales
        dark: '#9759EB',         // Púrpura para bordes destacados
      },
      
      // Colores específicos de navegación
      navigation: {
        active: '#9759EB',       // Púrpura para elementos activos
        inactive: '#6b7280',
        background: '#ffffff',
        border: '#D6E7F8',       // Azul claro para bordes de navegación
      },
    }
  },
  
  lightGray: {
    id: 'lightGray',
    name: 'Gris Claro',
    description: 'Tema gris suave y elegante',
    colors: {
      // Colores principales
      primary: '#374151',
      secondary: '#6b7280',
      accent: '#81a19f',
      
      // Colores de texto
      text: {
        primary: '#111827',
        secondary: '#374151',
        tertiary: '#6b7280',
        disabled: '#9ca3af',
      },
      
      // Colores de fondo
      background: {
        primary: '#ffffff',
        secondary: '#f9fafb',
        tertiary: '#f3f4f6',
        card: '#ffffff',
      },
      
      // Colores de estado
      status: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#374151',
      },
      
      // Colores de borde
      border: {
        light: '#f3f4f6',
        medium: '#e5e7eb',
        dark: '#d1d5db',
      },
      
      // Colores específicos de navegación
      navigation: {
        active: '#374151',
        inactive: '#6b7280',
        background: '#ffffff',
        border: '#f3f4f6',
      },
    }
  },
  
  dark: {
    id: 'dark',
    name: 'Oscuro',
    description: 'Tema oscuro moderno',
    colors: {
      // Colores principales
      primary: '#3b82f6',
      secondary: '#10b981',
      accent: '#d95dd7',
      
      // Colores de texto
      text: {
        primary: '#f9fafb',
        secondary: '#e5e7eb',
        tertiary: '#d1d5db',
        disabled: '#9ca3af',
      },
      
      // Colores de fondo
      background: {
        primary: '#111827',
        secondary: '#1f2937',
        tertiary: '#374151',
        card: '#1f2937',
      },
      
      // Colores de estado
      status: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      
      // Colores de borde
      border: {
        light: '#374151',
        medium: '#4b5563',
        dark: '#6b7280',
      },
      
      // Colores específicos de navegación
      navigation: {
        active: '#3b82f6',
        inactive: '#9ca3af',
        background: '#1f2937',
        border: '#374151',
      },
    }
  },
  
  darkSlate: {
    id: 'darkSlate',
    name: 'Pizarra Oscura',
    description: 'Tema oscuro con tonos pizarra',
    colors: {
      // Colores principales
      primary: '#8b5cf6',
      secondary: '#06b6d4',
      accent: '#f97316',
      
      // Colores de texto
      text: {
        primary: '#f8fafc',
        secondary: '#e2e8f0',
        tertiary: '#cbd5e1',
        disabled: '#94a3b8',
      },
      
      // Colores de fondo
      background: {
        primary: '#0f172a',
        secondary: '#1e293b',
        tertiary: '#334155',
        card: '#1e293b',
      },
      
      // Colores de estado
      status: {
        success: '#06b6d4',
        warning: '#f97316',
        error: '#ef4444',
        info: '#8b5cf6',
      },
      
      // Colores de borde
      border: {
        light: '#334155',
        medium: '#475569',
        dark: '#64748b',
      },
      
      // Colores específicos de navegación
      navigation: {
        active: '#8b5cf6',
        inactive: '#94a3b8',
        background: '#1e293b',
        border: '#334155',
      },
    }
  },
};

// Lista de temas disponibles para el selector
export const AVAILABLE_THEMES = Object.values(THEME_PALETTES);

// Tema por defecto
export const DEFAULT_THEME_ID = 'light';