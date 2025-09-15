import { Stack, usePathname, router } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../../services/auth-context';

export default function DashboardLayout() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/auth/login');
      return;
    }
    const parts = pathname.split('/');
    const requestedRole = parts[parts.length - 1];
    if (
      requestedRole &&
      ['property-manager', 'tenant', 'maintenance'].includes(requestedRole) &&
      user.role !== requestedRole
    ) {
      router.replace(`/dashboard/${user.role}`);
    }
  }, [user, loading, pathname]);

  return (
    <Stack>
      <Stack.Screen name="property-manager" options={{ headerShown: false }} />
      <Stack.Screen name="tenant" options={{ headerShown: false }} />
      <Stack.Screen name="maintenance" options={{ headerShown: false }} />
    </Stack>
  );
}
