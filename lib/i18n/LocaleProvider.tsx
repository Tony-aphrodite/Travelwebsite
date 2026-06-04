'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { dictionaries, type Dictionary, type Locale } from './dictionaries';

const STORAGE_KEY = 'aurelia-locale';
const DEFAULT_LOCALE: Locale = 'es';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: dictionaries[DEFAULT_LOCALE],
});

/**
 * Top-level provider for the chrome language toggle.
 *
 * Server render is always Spanish so the markup matches across SSR/CSR
 * (no hydration warnings). After mount we read the saved locale from
 * localStorage; if the user previously picked English, we swap on the
 * next tick. Updates also reflect on the <html lang="..."> attribute so
 * screen readers and CSS quotes pick up the change.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'es' || saved === 'en') {
        setLocaleState(saved);
        document.documentElement.lang = saved === 'en' ? 'en' : 'es-MX';
      }
    } catch {
      /* localStorage might be disabled; fall back to default */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l === 'en' ? 'en' : 'es-MX';
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, t: dictionaries[locale] }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

/** Returns { locale, setLocale, t } — use locale + setLocale in the switcher. */
export function useLocale() {
  return useContext(LocaleContext);
}

/** Shortcut for components that only need the active dictionary. */
export function useT(): Dictionary {
  return useContext(LocaleContext).t;
}
