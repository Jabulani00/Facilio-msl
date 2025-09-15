import { Stack } from 'expo-router';

export default function PropertyManagementLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="portfolio" 
        options={{ 
          title: 'Property Portfolio',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="unit-management" 
        options={{ 
          title: 'Unit Management',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="tenant-assignment" 
        options={{ 
          title: 'Tenant Assignment',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="property-details" 
        options={{ 
          title: 'Property Details',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
    </Stack>
  );
}
