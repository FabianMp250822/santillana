"use client";

import { useState, ReactNode, useEffect } from "react";
import { FavoritesContext, type FavoritesContextType } from "@/hooks/use-favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        try {
            const item = window.localStorage.getItem('favoriteLots');
            if (item) {
                setFavorites(JSON.parse(item));
            }
        } catch (error) {
            console.error('Failed to parse favorites from localStorage', error);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            try {
                window.localStorage.setItem('favoriteLots', JSON.stringify(favorites));
            } catch (error) {
                console.error('Failed to save favorites to localStorage', error);
            }
        }
    }, [favorites, isMounted]);

    const addFavorite = (lotId: string) => {
        setFavorites((prev) => {
            if (prev.includes(lotId)) {
                return prev;
            }
            return [...prev, lotId];
        });
    };

    const removeFavorite = (lotId: string) => {
        setFavorites((prev) => prev.filter((id) => id !== lotId));
    };

    const isFavorite = (lotId: string) => {
        return favorites.includes(lotId);
    };

    const value = { favorites, addFavorite, removeFavorite, isFavorite };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
