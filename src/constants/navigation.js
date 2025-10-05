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
  House,
} from 'lucide-react-native';

// Configuración de pestañas de navegación
export const TAB_SCREENS = [
  {
    name: 'index',
    title: 'Home',
    icon: House,
    options: {
      title: 'Home',
    },
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: User,
    options: {
      title: 'Profile',
    },
  },
  {
    name: 'notifications',
    title: 'Notifications',
    icon: Bell,
    options: {
      title: 'Notifications',
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
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'JD',
    location: 'New York, USA',
    memberSince: 'January 2023',
    phone: '+1 123 456 789',
    stats: {
      projects: 12,
      completed: 8,
      inProgress: 4,
    },
  },
  
  quickActions: [
    { id: 1, icon: 'Sparkles', label: 'New', color: '#3b82f6' },
    { id: 2, icon: 'TrendingUp', label: 'Trending', color: '#10b981' },
    { id: 3, icon: 'Users', label: 'Community', color: '#8b5cf6' },
    { id: 4, icon: 'Zap', label: 'Quick', color: '#f59e0b' },
  ],
  
  notifications: [
    {
      id: 1,
      type: 'message',
      icon: 'MessageCircle',
      color: '#3b82f6',
      title: 'New message',
      description: 'You have received a message from Maria Garcia',
      time: '5 min ago',
      isNew: true,
    },
    {
      id: 2,
      type: 'team',
      icon: 'Users',
      color: '#10b981',
      title: 'Team update',
      description: 'Your team has completed the "Mobile App" project',
      time: '1 hour ago',
      isNew: true,
    },
  ],
};