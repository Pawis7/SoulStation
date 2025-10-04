// Tipos TypeScript para la aplicación
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location?: string;
  memberSince?: string;
  phone?: string;
  stats?: UserStats;
}

export interface UserStats {
  projects: number;
  completed: number;
  inProgress: number;
}

export interface QuickAction {
  id: number;
  icon: string;
  label: string;
  color: string;
  action?: string;
}

export interface Notification {
  id: number;
  type: 'message' | 'team' | 'achievement' | 'reminder' | 'update';
  icon: string;
  color: string;
  title: string;
  description: string;
  time: string;
  isNew: boolean;
}

export interface TabScreen {
  name: string;
  title: string;
  icon: React.ComponentType<any>;
  options: {
    title: string;
  };
}

export interface ContactOption {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
  available: boolean;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface SettingItem {
  id: number;
  icon: string;
  label: string;
  subtitle?: string;
  hasArrow?: boolean;
  hasSwitch?: boolean;
  value?: boolean;
  onToggle?: (value: boolean) => void;
}

export interface SettingSection {
  title: string;
  items: SettingItem[];
}