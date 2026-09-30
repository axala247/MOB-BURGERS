import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { L10n } from "@/data/menu";
import { DICTIONARY, type DictKey, type Lang } from "@/lib/dictionary";
import { readStorage, writeStorage } from "@/lib/storage";

type I18n = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: DictKey, vars?: Record<string, string | number>) => string;
  /** Pick the current language from a { en, ka } pair. */
  l: (value: L10n) => string;
  /** Lari, formatted for the current language. */
  gel: (amount: number) => string;
};

const I18nContext = createContext<I18n | null>(null);

const isLang = (v: unknown): v is Lang => v === "en" || v === "ka";

function initialLang(): Lang {
  const saved = readStorage<Lang | null>("mob-lang", null, (v): v is Lang | null => isLang(v));
  if (saved) return saved;
  return navigator.language?.toLowerCase().startsWith("ka") ? "ka" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    writeStorage("mob-lang", next);
  }, []);

  const value = useMemo<I18n>(() => {
    const dict = DICTIONARY[lang];
    const number = new Intl.NumberFormat(lang === "ka" ? "ka-GE" : "en-US", {
      maximumFractionDigits: 2,
    });
    return {
      lang,
      setLang,
      t: (key, vars) =>
        dict[key].replace(/\{(\w+)\}/g, (_, name: string) => String(vars?.[name] ?? `{${name}}`)),
      l: (v) => v[lang],
      gel: (amount) => `${number.format(amount)} ₾`,
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
