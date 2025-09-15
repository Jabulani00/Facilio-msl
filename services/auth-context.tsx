import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { AuthService, AuthResult, subscribeToAuthChanges, UserRole } from './auth';

interface AuthContextValue {
  user: AuthResult | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (params: { email: string; password: string; role: UserRole; firstName?: string; lastName?: string; phone?: string; }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToAuthChanges((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    async login(email: string, password: string) {
      await AuthService.login({ email, password });
    },
    async register({ email, password, role, firstName, lastName, phone }) {
      await AuthService.register({ email, password, role, firstName, lastName, phone });
    },
    async logout() {
      await AuthService.logout();
    }
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


