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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // If we get a user, set it.
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        // If there's no user, it means they are logged out.
        // We sign them in anonymously to track usage.
        // The listener will fire again with the anonymous user.
        signInAnonymously(auth).catch((error) => {
          console.error("Anonymous sign-in failed", error);
          setLoading(false); // Stop loading even if anon sign-in fails
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const value = { user, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
