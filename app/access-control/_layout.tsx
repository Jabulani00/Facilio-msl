import { Stack } from 'expo-router';

export default function AccessControlLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="digital-access-management" 
        options={{ 
          title: 'Access Management',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="tenant-access-portal" 
        options={{ 
          title: 'My Access',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="access-monitoring" 
        options={{ 
          title: 'Access Monitoring',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="guest-access" 
        options={{ 
          title: 'Guest Access',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
    </Stack>
  );
}
