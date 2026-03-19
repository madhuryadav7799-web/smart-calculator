export const COLORS = {
  // Clieo Branding
  primary: '#00d9ff',
  secondary: '#0088cc',
  accent: '#ff006e',
  
  // Dark Theme
  dark: {
    bg: '#0f0f1e',
    bgSecondary: '#1a1a2e',
    bgTertiary: '#2d2d44',
    text: '#ffffff',
    textSecondary: '#b0b0c0',
    border: '#3d3d5a',
  },
  
  // Light Theme
  light: {
    bg: '#f8f8ff',
    bgSecondary: '#ffffff',
    bgTertiary: '#f0f0ff',
    text: '#1a1a2e',
    textSecondary: '#6b6b7d',
    border: '#e0e0f0',
  },
  
  // Status Colors
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
};

export const getTheme = (darkMode: boolean) => {
  return darkMode ? COLORS.dark : COLORS.light;
};
