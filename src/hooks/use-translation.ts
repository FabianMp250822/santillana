"use client";
import { useLanguage } from '@/hooks/use-language';
export const useTranslation = () => useLanguage().t;
