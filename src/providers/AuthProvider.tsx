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
          // This can happen if anonymous auth is disabled in the Firebase console.
          // It's a valid runtime scenario, so we handle it gracefully.
          console.warn(
            "Firebase anonymous sign-in failed. This can happen if it's disabled in your Firebase project. Treating user as a guest.",
            error.message
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
