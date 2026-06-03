"use client";
import { createContext, useContext, useState } from "react";

export type Lang = "id" | "en";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): Lang {
  return useContext(LanguageContext).lang;
}

export function useSetLang(): (l: Lang) => void {
  return useContext(LanguageContext).setLang;
}
