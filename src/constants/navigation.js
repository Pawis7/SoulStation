import { 
  Hop as Home, 
  Settings, 
  User, 
  Bell, 
  Circle as HelpCircle,
  Camera,
  Edit3,
  MapPin,
  Calendar,
  Mail,
  Phone,
  MessageCircle,
  Users,
  Star,
  Clock,
  Zap,
  Check,
  X,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  LogOut,
  TrendingUp,
  Sparkles,
} from 'lucide-react-native';

// Configuración de pestañas de navegación
export const TAB_SCREENS = [
  {
    name: 'index',
    title: 'Inicio',
    icon: Home,
    options: {
      title: 'Inicio',
    },
  },
  {
    name: 'profile',
    title: 'Perfil',
    icon: User,
    options: {
      title: 'Perfil',
    },
  },
  {
    name: 'notifications',
    title: 'Notifs',
    icon: Bell,
    options: {
      title: 'Notifs',
    },
  },
];

// Iconos disponibles en la aplicación
export const ICONS = {
  // Navegación
  Home,
  Settings,
  User,
  Bell,
  HelpCircle,
  
  // Acciones
  Camera,
  Edit3,
  Search,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  
  // Información
  MapPin,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
  
  // Estados y notificaciones
  MessageCircle,
  Users,
  Star,
  Clock,
  Zap,
  
  // Contenido
  TrendingUp,
  Sparkles,
};

// Datos de ejemplo para desarrollo
export const MOCK_DATA = {
  user: {
    id: '1',
    name: 'Juan Díaz',
    email: 'juan.diaz@ejemplo.com',
    avatar: 'JD',
    location: 'Madrid, España',
    memberSince: 'Enero 2023',
    phone: '+34 123 456 789',
    stats: {
      projects: 12,
      completed: 8,
      inProgress: 4,
    },
  },
  
  quickActions: [
    { id: 1, icon: 'Sparkles', label: 'Nuevo', color: '#3b82f6' },
    { id: 2, icon: 'TrendingUp', label: 'Tendencias', color: '#10b981' },
    { id: 3, icon: 'Users', label: 'Comunidad', color: '#8b5cf6' },
    { id: 4, icon: 'Zap', label: 'Rápido', color: '#f59e0b' },
  ],
  
  notifications: [
    {
      id: 1,
      type: 'message',
      icon: 'MessageCircle',
      color: '#3b82f6',
      title: 'Nuevo mensaje',
      description: 'Has recibido un mensaje de María García',
      time: 'Hace 5 min',
      isNew: true,
    },
    {
      id: 2,
      type: 'team',
      icon: 'Users',
      color: '#10b981',
      title: 'Actualización del equipo',
      description: 'Tu equipo ha completado el proyecto "App Mobile"',
      time: 'Hace 1 hora',
      isNew: true,
    },
  ],
};