'use client';
import { createContext, useContext, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';
export type Locale = keyof typeof translations;
const LanguageContext = createContext<{
  lang: Locale;
  setLang: (lang: string) => void;
  t: (typeof translations)[Locale];
  isRTL: boolean;
} | null>(null);
export function LanguageProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const router = useRouter(),
    path = usePathname();
  return (
    <LanguageContext.Provider
      value={{
        lang: locale,
        t: translations[locale],
        isRTL: locale === 'ar',
        setLang: (lang) => {
          if (Object.hasOwn(translations, lang))
            router.push('/' + lang + path.slice(locale.length + 1));
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const c = useContext(LanguageContext);
  if (!c) throw Error('Missing language provider');
  return c;
}
