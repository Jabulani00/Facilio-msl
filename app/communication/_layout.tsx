import { Stack } from 'expo-router';

export default function CommunicationLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="announcements" 
        options={{ 
          title: 'Property Announcements',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="tenant-communication" 
        options={{ 
          title: 'Communication Hub',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="maintenance-requests" 
        options={{ 
          title: 'Maintenance Requests',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="create-announcement" 
        options={{ 
          title: 'Create Announcement',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="maintenance-request-form" 
        options={{ 
          title: 'Report Issue',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
    </Stack>
  );
}
