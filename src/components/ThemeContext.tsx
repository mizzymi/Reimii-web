'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
const ThemeContext = createContext<{ isDark: boolean; toggleTheme: () => void } | null>(null);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setDark] = useState(true);
  useEffect(() => {
    setDark(localStorage.getItem('theme') !== 'light');
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme: () =>
          setDark((v) => {
            localStorage.setItem('theme', v ? 'light' : 'dark');
            return !v;
          }),
      }}
    >
      <div
        className={isDark ? 'dark min-h-screen bg-[#151218]' : 'min-h-screen bg-[#f7f1e9]'}
        style={{ colorScheme: isDark ? 'dark' : 'light' }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const c = useContext(ThemeContext);
  if (!c) throw Error('Missing theme provider');
  return c;
}
