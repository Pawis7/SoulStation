import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME_PALETTES, DEFAULT_THEME_ID } from '../constants/themes';

const THEME_STORAGE_KEY = '@nasapp_theme';

const ThemeContext = createContext({
  currentTheme: THEME_PALETTES[DEFAULT_THEME_ID],
  themeId: DEFAULT_THEME_ID,
  setTheme: () => {},
  availableThemes: Object.values(THEME_PALETTES),
});

export const ThemeProvider = ({ children }) => {
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);
  const [currentTheme, setCurrentTheme] = useState(THEME_PALETTES[DEFAULT_THEME_ID]);

  // Cargar tema guardado al inicializar
  useEffect(() => {
    loadSavedTheme();
  }, []);

  // Actualizar tema cuando cambie el ID
  useEffect(() => {
    if (THEME_PALETTES[themeId]) {
      setCurrentTheme(THEME_PALETTES[themeId]);
    }
  }, [themeId]);

  const loadSavedTheme = async () => {
    try {
      // Temporalmente deshabilitado AsyncStorage
      // const savedThemeId = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      // if (savedThemeId && THEME_PALETTES[savedThemeId]) {
      //   setThemeId(savedThemeId);
      // }
    } catch (error) {
      // Error loading theme
    }
  };

  const setTheme = async (newThemeId) => {
    try {
      if (THEME_PALETTES[newThemeId]) {
        setThemeId(newThemeId);
        // Temporalmente deshabilitado AsyncStorage
        // await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeId);
      }
    } catch (error) {
      // Error saving theme
    }
  };

  const value = {
    currentTheme,
    themeId,
    setTheme,
    availableThemes: Object.values(THEME_PALETTES),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};