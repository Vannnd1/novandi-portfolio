import React, { useState, useEffect } from 'react';
import { translations, type Language } from '../data/translations';
import { getProfileData } from '../data/profile';
import { getProjectsData } from '../data/projects';
import { LanguageContext } from './LanguageContextInstance';
import type { LanguageContextType } from './types';

const STORAGE_KEY = 'novan_portfolio_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'id' || saved === 'en') {
        return saved;
      }
    }
    // Default to 'id' as requested
    return 'id';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
    profile: getProfileData(language),
    projects: getProjectsData(language),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
