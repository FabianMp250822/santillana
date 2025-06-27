"use client";

import { useState, ReactNode, useEffect, useCallback } from "react";
import { FavoritesContext, type FavoritesContextType } from "@/hooks/use-favorites";
import { useAuth } from "@/hooks/use-auth";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const { user, loading: authLoading } = useAuth();

    const getLocalFavorites = useCallback(() => {
        if (typeof window === 'undefined') return [];
        try {
            const item = window.localStorage.getItem('favoriteLots');
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error('Failed to parse favorites from localStorage', error);
            return [];
        }
    }, []);

    // Effect for initial mount and auth state changes
    useEffect(() => {
        setIsMounted(true);
        if (authLoading) return;

        let unsubscribe: (() => void) | undefined;

        if (user && isFirebaseConfigured) {
            // User is logged in and Firebase is configured, use Firestore
            const docRef = doc(db, 'users', user.uid);
            
            unsubscribe = onSnapshot(docRef, (docSnap) => {
                const localFavorites = getLocalFavorites();
                let firestoreFavorites: string[] = [];
                
                if (docSnap.exists()) {
                    firestoreFavorites = docSnap.data().favorites || [];
                }

                // Merge with local storage on initial load/login, then clear local
                const mergedFavorites = [...new Set([...firestoreFavorites, ...localFavorites])];
                setFavorites(mergedFavorites);

                if (localFavorites.length > 0) {
                    setDoc(docRef, { favorites: mergedFavorites }, { merge: true });
                    window.localStorage.removeItem('favoriteLots');
                }
            }, (error) => {
                 let message = "Error with Firestore snapshot. Falling back to local favorites.";
                 if (error.message.includes('offline') || error.message.includes('unavailable')) {
                     message = "Could not connect to database to sync favorites. This might be due to an incorrect Firebase project ID in your .env file or a network issue. Using local favorites for now.";
                 }
                 console.warn(message, error.message);
                 // Fallback to local if firestore fails
                 setFavorites(getLocalFavorites());
            });
            
        } else {
            // User is a guest or Firebase not configured, use localStorage
            setFavorites(getLocalFavorites());
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [user, authLoading, getLocalFavorites]);


    const updateFavorites = async (newFavorites: string[]) => {
        setFavorites(newFavorites);
        if (user && isFirebaseConfigured) {
            const docRef = doc(db, 'users', user.uid);
            try {
                await setDoc(docRef, { favorites: newFavorites }, { merge: true });
            } catch (error) {
                console.error('Failed to save favorites to Firestore', error);
            }
        } else if (isMounted) {
            try {
                window.localStorage.setItem('favoriteLots', JSON.stringify(newFavorites));
            } catch (error) {
                console.error('Failed to save favorites to localStorage', error);
            }
        }
    }

    const addFavorite = (lotId: string) => {
        if (favorites.includes(lotId)) return;
        updateFavorites([...favorites, lotId]);
    };

    const removeFavorite = (lotId: string) => {
        updateFavorites(favorites.filter((id) => id !== lotId));
    };

    const isFavorite = (lotId: string) => {
        return favorites.includes(lotId);
    };

    const value = { favorites, addFavorite, removeFavorite, isFavorite };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
