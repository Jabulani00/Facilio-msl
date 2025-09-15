import { Stack } from 'expo-router';

export default function BookingAmenitiesLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="amenity-booking" 
        options={{ 
          title: 'Book Amenities',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="booking-management" 
        options={{ 
          title: 'Booking Management',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="my-bookings" 
        options={{ 
          title: 'My Bookings',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="booking-details" 
        options={{ 
          title: 'Booking Details',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#ffffff',
        }} 
      />
    </Stack>
  );
}
