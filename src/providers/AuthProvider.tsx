"use client";

import { useState, useEffect, createContext, ReactNode } from 'react';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          console.error(
            "Firebase anonymous sign-in failed. This can happen if anonymous auth is disabled in the Firebase console.",
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
