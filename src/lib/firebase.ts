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
let db: Firestore | null = null;
let auth: Auth | null = null;

// Before initializing, check if the necessary config variables are provided.
// This is to prevent the app from crashing if the .env file is not configured.
if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
    try {
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        db = getFirestore(app);
        auth = getAuth(app);
    } catch (e) {
        console.error("Error initializing Firebase. Please check your configuration in the .env file.", e);
        // Ensure objects are null if initialization fails
        app = null;
        db = null;
        auth = null;
    }
} else {
    // This warning will be shown in the browser console if Firebase config is missing
    console.warn("Firebase configuration is missing or incomplete. Please ensure all NEXT_PUBLIC_FIREBASE_* variables are set in your .env file. Firebase-dependent features will be disabled.");
}

export { app, db, auth };
