"use client";

import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { translations } from '@/lib/translations';

type Language = 'en' | 'es';

export type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en, replacements?: Record<string, string>) => string;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang && ['en', 'es'].includes(storedLang)) {
      setLanguage(storedLang);
    }
  }, []);

  const setLanguageAndStore = (lang: Language) => {
    setLanguage(lang);
    if(isMounted) {
      localStorage.setItem('language', lang);
    }
  }

  const t = useCallback((key: keyof typeof translations.en, replacements?: Record<string, string>): string => {
    let translation = translations[language][key] || translations['en'][key];
    if (replacements) {
      Object.keys(replacements).forEach(rKey => {
        translation = translation.replace(`{${rKey}}`, replacements[rKey]);
      });
    }
    return translation;
  }, [language]);
  
  const value = {
    language,
    setLanguage: setLanguageAndStore,
    t,
  };

  if (!isMounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
