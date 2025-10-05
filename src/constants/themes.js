// Sistema de temas múltiples - 2 claros y 2 oscuros
export const THEME_PALETTES = {
  light: {
    id: 'light',
    name: 'Light',
    description: 'Custom light theme',
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
    name: 'Light Gray',
    description: 'Soft and elegant gray theme',
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
    name: 'Dark',
    description: 'Modern dark theme',
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
    name: 'Dark Slate',
    description: 'Dark theme with slate tones',
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

  mars: {
    id: 'mars',
    name: 'Mars',
    description: 'Warm and earthy light theme',
    colors: {
      // Colores principales - Inspirado en Marte
      primary: '#CD5C5C',        // Rojo Marte
      secondary: '#F4A460',      // Arenoso
      accent: '#DEB887',         // Beige dorado
      
      // Colores de texto
      text: {
        primary: '#2F1B14',      // Marrón oscuro
        secondary: '#5D4E37',    // Marrón café
        tertiary: '#8B4513',     // Marrón silla
        disabled: '#A0522D',     // Siena
      },
      
      // Colores de fondo
      background: {
        primary: '#FFF8DC',      // Crema suave
        secondary: '#FAEBD7',    // Blanco antiguo
        tertiary: '#F5DEB3',     // Trigo
        card: '#FFFFFF',         // Blanco puro
      },
      
      // Colores de estado
      status: {
        success: '#228B22',      // Verde bosque
        warning: '#FF8C00',      // Naranja oscuro
        error: '#B22222',        // Rojo fuego
        info: '#CD5C5C',         // Rojo Marte
      },
      
      // Colores de borde
      border: {
        light: '#F5DEB3',        // Trigo claro
        medium: '#DEB887',       // Beige
        dark: '#CD5C5C',         // Rojo Marte
      },
      
      // Colores específicos de navegación
      navigation: {
        active: '#CD5C5C',       // Rojo Marte
        inactive: '#8B4513',     // Marrón
        background: '#FFFFFF',   // Blanco
        border: '#F5DEB3',       // Trigo
      },
    }
  },

  neptune: {
    id: 'neptune',
    name: 'Neptune',
    description: 'Deep ocean dark theme',
    colors: {
      // Colores principales - Inspirado en Neptuno
      primary: '#4169E1',        // Azul real
      secondary: '#00CED1',      // Turquesa oscuro
      accent: '#20B2AA',         // Verde mar claro
      
      // Colores de texto
      text: {
        primary: '#F0F8FF',      // Azul alice
        secondary: '#E6F3FF',    // Azul muy claro
        tertiary: '#B0E0E6',     // Azul pólvora
        disabled: '#778899',     // Gris pizarra claro
      },
      
      // Colores de fondo
      background: {
        primary: '#003366',      // Azul marino profundo
        secondary: '#004080',    // Azul océano
        tertiary: '#0066CC',     // Azul medio
        card: '#004080',         // Azul océano
      },
      
      // Colores de estado
      status: {
        success: '#00CED1',      // Turquesa
        warning: '#FFD700',      // Dorado
        error: '#FF6347',        // Tomate
        info: '#4169E1',         // Azul real
      },
      
      // Colores de borde
      border: {
        light: '#0066CC',        // Azul medio
        medium: '#4169E1',       // Azul real
        dark: '#00CED1',         // Turquesa
      },
      
      // Colores específicos de navegación
      navigation: {
        active: '#4169E1',       // Azul real
        inactive: '#778899',     // Gris pizarra
        background: '#004080',   // Azul océano
        border: '#0066CC',       // Azul medio
      },
    }
  },
};

// Lista de temas disponibles para el selector
export const AVAILABLE_THEMES = Object.values(THEME_PALETTES);

// Tema por defecto
export const DEFAULT_THEME_ID = 'light';