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
    // If firebase is not configured, we don't attempt any auth operations.
    // The user will be treated as a guest without a UID.
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      setUser(null);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is signed in (either real or anonymous)
        setUser(currentUser);
        setLoading(false);
      } else {
        // User is signed out, try to sign them in anonymously
        try {
          const { user: anonymousUser } = await signInAnonymously(auth);
          setUser(anonymousUser);
        } catch (error: any) {
          // This can happen if the .env config is wrong, or if anonymous auth
          // is disabled in the Firebase console.
          console.error(
            "Firebase anonymous sign-in failed. This can happen if your Firebase config in .env is incorrect, or if anonymous auth is disabled in the Firebase console.",
            error.message
          );
          // In this case, the user will be a guest without a UID, disabling usage-tracked features.
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
