import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import Constants from 'expo-constants';

const extra = (Constants?.expoConfig as any)?.extra || {};

function readConfig(key: string, fallback: string = ''): string {
  // Prefer EXPO_PUBLIC_* env vars, then app.json extra, else fallback
  const envValue = (process.env as any)[key];
  const extraValue = extra[key];
  const value = envValue ?? extraValue ?? fallback;
  
  // Debug logging
  console.log(`Config ${key}:`, { envValue, extraValue, finalValue: value });
  
  return value;
}

function ensureValid(name: string, value: string) {
  const invalid = !value || value.includes('YOUR_');
  if (invalid) {
    console.error(`Firebase config debug:`, { name, value, extra, env: process.env });
    throw new Error(
      `Missing Firebase config: ${name}. Set EXPO_PUBLIC_${name} in app.json extra or env.`
    );
  }
}

// TODO: Move to secure environment file after testing
const firebaseConfig = {
  apiKey: "AIzaSyBWhxm7lJK9BUKsYqCFdoIUvLDl5tyssrQ",
  authDomain: "facilio-app.firebaseapp.com",
  projectId: "facilio-app",
  storageBucket: "facilio-app.firebasestorage.app",
  messagingSenderId: "515454562817",
  appId: "1:515454562817:web:1f89da18665af2b67e0600"
};

ensureValid('FIREBASE_API_KEY', firebaseConfig.apiKey);
ensureValid('FIREBASE_AUTH_DOMAIN', firebaseConfig.authDomain);
ensureValid('FIREBASE_PROJECT_ID', firebaseConfig.projectId);
ensureValid('FIREBASE_STORAGE_BUCKET', firebaseConfig.storageBucket);
ensureValid('FIREBASE_MESSAGING_SENDER_ID', firebaseConfig.messagingSenderId);
ensureValid('FIREBASE_APP_ID', firebaseConfig.appId);

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]!;
}

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

export default app;


