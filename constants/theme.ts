import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Luxury color palette with enhanced depth
    primary: '#8B1538', // Deep burgundy for elegance
    primaryContainer: '#FFF5F7', // Soft rose background
    secondary: '#B8860B', // Rich golden accent
    secondaryContainer: '#FFFEF7', // Cream background
    tertiary: '#4A4A4A', // Charcoal for sophistication
    tertiaryContainer: '#F8F8F8', // Light gray background
    
    // Surface and background colors with luxury feel
    surface: '#FFFFFF',
    surfaceVariant: '#FEFEFE', // Pure white with subtle warmth
    background: '#FAFAFA', // Warm white background
    
    // Enhanced status colors
    error: '#C53030',
    errorContainer: '#FEF5F5',
    success: '#38A169',
    successContainer: '#F0FFF4',
    warning: '#D69E2E',
    warningContainer: '#FFFBEB',
    
    // Text colors with better contrast
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onSurface: '#2D3748', // Dark gray for readability
    onBackground: '#2D3748',
    onError: '#FFFFFF',
    
    // Border and outline colors
    outline: '#E2E8F0',
    outlineVariant: '#F7FAFC',
    
    // Custom accent colors
    accent: '#B8860B', // Rich gold
    accentContainer: '#FFFEF7',
  },
  roundness: 20, // Increased for more modern feel
  fonts: {
    ...MD3LightTheme.fonts,
    headlineLarge: {
      ...MD3LightTheme.fonts.headlineLarge,
      fontWeight: '700' as const,
    },
    headlineMedium: {
      ...MD3LightTheme.fonts.headlineMedium,
      fontWeight: '600' as const,
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontWeight: '600' as const,
    },
  },
};

// Additional color constants for easy access with luxury palette
export const colors = {
  primary: '#8B1538', // Deep burgundy
  secondary: '#B8860B', // Rich gold
  accent: '#B8860B', // Rich gold accent
  background: '#FAFAFA', // Warm white
  surface: '#FFFFFF', // Pure white
  text: '#2D3748', // Dark gray for readability
  textSecondary: '#718096', // Medium gray
  border: '#E2E8F0', // Light gray border
  success: '#38A169', // Green
  warning: '#D69E2E', // Amber
  error: '#C53030', // Red
  info: '#3182CE', // Blue
  
  // Luxury gradient colors
  gradientStart: '#8B1538',
  gradientEnd: '#B8860B',
  gradientBackground: ['#FAFAFA', '#F7FAFC'],
  
  // Glass morphism colors
  glassBackground: 'rgba(255, 255, 255, 0.25)',
  glassBorder: 'rgba(255, 255, 255, 0.18)',
  
  // Shadow colors
  shadowColor: '#8B1538',
  shadowLight: 'rgba(139, 21, 56, 0.1)',
  shadowMedium: 'rgba(139, 21, 56, 0.2)',
  shadowDark: 'rgba(139, 21, 56, 0.3)',
};
