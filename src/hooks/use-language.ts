"use client";

import { useContext } from 'react';
import { LanguageContext, LanguageContextType } from '@/providers/LanguageProvider';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
