import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

// This flag is exported to be used anywhere in the app to check if Firebase is available.
export let isFirebaseConfigured = false;

// We check that all keys are present and have some value.
// This is a robust way to prevent the "configuration-not-found" error.
const allKeysPresent = Object.values(firebaseConfig).every(key => key);

if (allKeysPresent) {
  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    isFirebaseConfigured = true;
  } catch (e) {
    console.error("Failed to initialize Firebase. Please check your .env configuration.", e);
    // If initialization fails for any reason, ensure the flag is false.
    isFirebaseConfigured = false;
  }
} else {
  // You can add a console.warn here if you want to be notified in development
  // that Firebase features are disabled due to missing configuration.
}

export { app, auth, db };
