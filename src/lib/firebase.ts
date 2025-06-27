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

const getFirebaseServices = () => {
    const isConfigured = 
        firebaseConfig.apiKey &&
        firebaseConfig.authDomain &&
        firebaseConfig.projectId;

    if (!isConfigured) {
        if (typeof window !== 'undefined') {
            console.warn(
                "Firebase configuration is missing or incomplete. " +
                "Please ensure all NEXT_PUBLIC_FIREBASE_* variables are set in your .env file. " +
                "Firebase-dependent features will be disabled."
            );
        }
        return { app: null, auth: null, db: null, isFirebaseConfigured: false };
    }

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);
    const db = getFirestore(app);

    return { app, auth, db, isFirebaseConfigured: true };
}

export const { app, auth, db, isFirebaseConfigured } = getFirebaseServices();