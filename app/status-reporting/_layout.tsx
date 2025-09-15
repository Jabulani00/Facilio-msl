import { Stack } from 'expo-router';

export default function StatusReportingLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="property-status-overview" 
        options={{ 
          title: 'Property Status',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="tenant-status-dashboard" 
        options={{ 
          title: 'My Status',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="financial-reporting" 
        options={{ 
          title: 'Financial Reports',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="analytics-dashboard" 
        options={{ 
          title: 'Analytics',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
    </Stack>
  );
}
