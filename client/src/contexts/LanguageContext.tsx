/**
 * Language Context - i18n Support
 * Provides EN/CN language switching across the entire site.
 * Translation copy is stored in client/src/data/siteText.json so the hidden editor can update it.
 */

import { createContext, useContext, useState, ReactNode } from "react";
import siteTextData from "@/data/siteText.json";

export type Language = "en" | "cn";
export type TranslationPair = Record<Language, string>;
export type TranslationMap = Record<string, TranslationPair>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const translations = siteTextData.translations as TranslationMap;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
