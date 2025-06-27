
"use client";

import { useState, useEffect, createContext, ReactNode } from 'react';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase isn't configured, we don't attempt any auth operations.
    // This prevents the app from crashing.
    if (!isFirebaseConfigured) {
      console.warn(
        "ACTION REQUIRED: Firebase is not configured. Authentication, AI features, and database operations are disabled. Please add your Firebase credentials to the .env file."
      );
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is signed in (either real or anonymous)
        setUser(currentUser);
        setLoading(false);
      } else {
        // User is signed out, try to sign them in anonymously for usage tracking
        try {
          const { user: anonymousUser } = await signInAnonymously(auth);
          setUser(anonymousUser);
        } catch (error: any) {
          // Since the user has enabled anonymous auth, this error is almost certainly
          // due to an incorrect Firebase config in the .env file.
          console.error(
            "CRITICAL: Firebase anonymous sign-in failed. The application will not be able to connect to the database or use AI features. Please check that your NEXT_PUBLIC_FIREBASE_* variables in the .env file are correct and match your Firebase project.",
            "Original error:", error.message
          );
          setUser(null);
        } finally {
            setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const value = { user, loading };

  return (
    <AuthContext.Provider value={value}>
      {/* We only render children once loading is complete to avoid flicker */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
