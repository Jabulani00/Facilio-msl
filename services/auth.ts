import { auth, db } from './firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export type UserRole = 'property-manager' | 'tenant' | 'maintenance' | 'admin';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
}

export interface AuthResult {
  uid: string;
  email: string | null;
  role: UserRole;
}

export interface TwoFactorSetup {
  secret: string;
  qrCodeDataUrl: string;
}

export interface AuthServiceApi {
  login(credentials: LoginCredentials): Promise<AuthResult>;
  register(data: RegisterData): Promise<AuthResult>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthResult | null>;
  // OTP stubs (email/SMS to be implemented later)
  sendOTP(destination: string): Promise<void>;
  verifyOTP(destination: string, code: string): Promise<boolean>;
}

async function getUserRole(uid: string): Promise<UserRole> {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data() as any;
    return (data.role as UserRole) || 'tenant';
  }
  return 'tenant';
}

export const AuthService: AuthServiceApi = {
  async login({ email, password }) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const role = await getUserRole(cred.user.uid);
    return { uid: cred.user.uid, email: cred.user.email, role };
  },

  async register(data: RegisterData) {
    const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const ref = doc(db, 'users', cred.user.uid);
    await setDoc(ref, {
      email: data.email,
      phone: data.phone || null,
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      role: data.role,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return { uid: cred.user.uid, email: cred.user.email, role: data.role };
  },

  async logout() {
    await signOut(auth);
  },

  async getCurrentUser() {
    const user: User | null = auth.currentUser;
    if (!user) return null;
    const role = await getUserRole(user.uid);
    return { uid: user.uid, email: user.email, role };
  },

  async sendOTP(_destination: string) {
    // Placeholder for email/SMS OTP integration
    return;
  },

  async verifyOTP(_destination: string, _code: string) {
    // Always true for now; replace with real verification
    return true;
  },
};

export function subscribeToAuthChanges(cb: (user: AuthResult | null) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) return cb(null);
    const role = await getUserRole(user.uid);
    cb({ uid: user.uid, email: user.email, role });
  });
}


