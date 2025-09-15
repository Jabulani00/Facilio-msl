import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../constants/theme';
import { AuthProvider } from '../services/auth-context';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </PaperProvider>
  );
}
