"use client";

import { createContext, useContext } from 'react';

export interface FavoritesContextType {
  favorites: string[];
  addFavorite: (lotId: string) => void;
  removeFavorite: (lotId: string) => void;
  isFavorite: (lotId: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
