# NasApp

Una aplicación móvil moderna y escalable construida con Expo Router y React Native.

## 🏗️ Estructura del Proyecto

```
nasapp/
├── app/                          # Estructura de navegación (Expo Router)
│   ├── (main)/                   # Grupo de rutas principales
│   │   ├── (tabs)/              # Navegación por pestañas
│   │   │   ├── index.jsx        # Pantalla de inicio
│   │   │   ├── profile.jsx      # Pantalla de perfil
│   │   │   ├── notifications.jsx # Pantalla de notificaciones
│   │   │   ├── settings.jsx     # Pantalla de configuración
│   │   │   ├── help.jsx         # Pantalla de ayuda
│   │   │   └── _layout.jsx      # Layout de pestañas
│   │   └── _layout.jsx          # Layout principal
│   ├── index.jsx                # Pantalla de bienvenida
│   ├── login.jsx                # Pantalla de login
│   ├── register.jsx             # Pantalla de registro
│   └── _layout.jsx              # Layout raíz
├── src/                          # Código fuente modular
│   ├── constants/               # Constantes de la aplicación
│   │   ├── theme.js            # Tema, colores, tipografía
│   │   └── navigation.js       # Configuración de navegación
│   ├── config/                  # Configuración de la app
│   │   └── app.js              # Configuración principal
│   ├── services/               # Servicios externos
│   │   └── api.js             # Cliente API
│   ├── types/                  # Tipos TypeScript
│   │   └── index.ts           # Definiciones de tipos
│   ├── utils/                  # Utilidades generales
│   │   └── helpers.js         # Funciones auxiliares
│   └── index.js               # Exportaciones principales
├── components/                  # Componentes reutilizables
│   ├── ui/                     # Componentes de interfaz
│   │   └── index.js           # Button, Card, Avatar, etc.
│   └── screens/               # Componentes específicos de pantallas
├── hooks/                      # Hooks personalizados
│   ├── useFrameworkReady.js   # Hook de inicialización
│   └── useTabBarConfig.js     # Hook de configuración de tabs
└── assets/                     # Recursos estáticos
    └── images/                # Imágenes e iconos
```

## 🚀 Características

### Arquitectura Modular
- **Separación de responsabilidades**: Código organizado por funcionalidad
- **Reutilización de componentes**: Componentes UI modulares y configurables
- **Configuración centralizada**: Tema, colores y constantes en archivos dedicados
- **Servicios abstraídos**: API y servicios externos bien estructurados

### Diseño Responsivo
- **Adaptable a diferentes tamaños**: Dimensiones dinámicas basadas en pantalla
- **Sistema de diseño consistente**: Tema unificado con colores, tipografía y espaciado
- **Componentes flexibles**: UI que se adapta automáticamente

### Navegación Escalable
- **Configuración declarativa**: Pestañas definidas en archivos de configuración
- **Fácil de extender**: Agregar nuevas pantallas modificando solo la configuración
- **Hooks personalizados**: Lógica de navegación reutilizable

## 🎨 Sistema de Diseño

### Colores
```javascript
import { Colors } from './src/constants/theme';

// Usar colores del sistema
backgroundColor: Colors.primary
color: Colors.text.secondary
```

### Componentes UI
```javascript
import { Card, Button, Avatar } from './components/ui';

// Componentes configurables
<Button variant="primary" size="large" />
<Card onPress={handlePress} />
<Avatar text="JD" size="large" />
```

### Utilidades
```javascript
import { formatTimeAgo, validateEmail } from './src/utils/helpers';

// Funciones auxiliares
const timeString = formatTimeAgo(date);
const isValid = validateEmail(email);
```

## 📱 Pantallas

- **Inicio**: Dashboard principal con acciones rápidas
- **Perfil**: Información personal y estadísticas
- **Notificaciones**: Centro de notificaciones con estado
- **Configuración**: Preferencias y configuración de la app
- **Ayuda**: FAQ, contacto y soporte

## 🛠️ Comandos

```bash
# Desarrollo
yarn dev

# Construcción web
yarn build:web

# Linting
yarn lint

# Verificación de tipos
yarn typecheck
```

## 🔧 Configuración

### Variables de entorno
Crea un archivo `.env` con:
```
EXPO_PUBLIC_API_URL=https://api.tusitio.com
```

### Personalizar tema
Modifica `src/constants/theme.js` para cambiar colores, tipografía y espaciado.

### Agregar nuevas pantallas
1. Crea el archivo de pantalla en `app/(main)/(tabs)/`
2. Añade la configuración en `src/constants/navigation.js`
3. El sistema las cargará automáticamente

## 📦 Dependencias Principales

- **Expo Router**: Navegación basada en archivos
- **React Native**: Framework móvil
- **Lucide React Native**: Iconos modernos
- **React Navigation**: Sistema de navegación

## 🎯 Beneficios de la Estructura Modular

1. **Mantenibilidad**: Código organizado y fácil de mantener
2. **Escalabilidad**: Agregar funcionalidades sin afectar código existente
3. **Reutilización**: Componentes y utilidades reutilizables
4. **Consistencia**: Sistema de diseño unificado
5. **Desarrollo eficiente**: Configuración centralizada y declarativa
