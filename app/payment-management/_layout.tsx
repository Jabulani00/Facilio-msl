import { Stack } from 'expo-router';

export default function PaymentManagementLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="rent-collection" 
        options={{ 
          title: 'Rent Collection',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="tenant-payment-portal" 
        options={{ 
          title: 'Make Payment',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="payment-reminders" 
        options={{ 
          title: 'Payment Reminders',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="payment-history" 
        options={{ 
          title: 'Payment History',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
    </Stack>
  );
}
