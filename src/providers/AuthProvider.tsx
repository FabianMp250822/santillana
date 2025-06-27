"use client";

import { useState, useEffect, createContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
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
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      setUser(null); // Explicitly set user to null (guest)
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        // currentUser will be null if not logged in, which is the expected guest state.
        setUser(currentUser);
        setLoading(false);
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
