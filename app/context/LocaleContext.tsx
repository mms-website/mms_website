'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState('en');

  // Optionnel : récupérer la locale depuis localStorage ou URL
  useEffect(() => {
    const saved = localStorage.getItem('locale');
    if (saved) setLocale(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within a LocaleProvider');
  return context;
};
