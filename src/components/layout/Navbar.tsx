'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '@/lib/navigation';
import { ChevronDown, Menu, Moon, ShoppingBag, Sparkles, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../ThemeContext';

const LOGO_URL = '/images/073fb0ac3_reimii4x.png';

const LANGS = [
  { code: 'ar', label: 'AR', flag: '🇸🇦' },
  { code: 'ca', label: 'CA', flag: '🇪🇸' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'hi', label: 'HI', flag: '🇮🇳' },
  { code: 'ja', label: 'JP', flag: '🇯🇵' },
  { code: 'ko', label: 'KR', flag: '🇰🇷' },
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

const spring = { type: 'spring' as const, stiffness: 420, damping: 32 };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const location = useLocation();
  const { lang, setLang, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const langMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t.nav.home, path: '/Home' },
    { label: t.nav.projects, path: '/Proyectos' },
    { label: t.nav.about, path: '/Nosotros' },
    { label: t.nav.contact, path: '/Contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setLangOpen(false);
    setMobileLangOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const currentLang = LANGS.find((item) => item.code === lang) || LANGS[4];

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const shellClass = scrolled
    ? isDark
      ? 'border-white/10 bg-[#17131b]/95 shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-2xl'
      : 'border-[#2f2735]/10 bg-[#fffaf4]/95 shadow-[0_18px_55px_rgba(84,62,92,0.12)] backdrop-blur-2xl'
    : isDark
      ? 'border-white/10 bg-[#17131b]/95 backdrop-blur-2xl'
      : 'border-[#2f2735]/10 bg-[#fffaf4]/95 backdrop-blur-2xl';

  const iconButtonClass = isDark
    ? 'border-white/10 bg-white/[0.06] text-[#f7eff8] hover:border-[#f0a8ca]/35 hover:bg-[#f0a8ca]/10'
    : 'border-[#403747]/10 bg-white/75 text-[#4a3e4e] hover:border-[#d98bb2]/35 hover:bg-[#f8e7f0]';

  const dropdownClass = isDark
    ? 'border-white/10 bg-[#211a25]/95 text-[#f8eef8] shadow-2xl'
    : 'border-[#4a3e4e]/10 bg-[#fffaf6]/95 text-[#453947] shadow-[0_24px_65px_rgba(84,62,92,0.18)]';

  const languageItemClass = (active: boolean) => {
    if (active) {
      return isDark ? 'bg-[#f0a8ca]/14 text-[#ffc6df]' : 'bg-[#f9e4ee] text-[#86345e]';
    }

    return isDark
      ? 'text-[#d8cadc] hover:bg-white/[0.06] hover:text-white'
      : 'text-[#635568] hover:bg-[#f7eee9] hover:text-[#342c37]';
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-7">
      <motion.div
        layout
        transition={spring}
        className={`mx-auto max-w-7xl rounded-[1.55rem] border transition-colors duration-300 ${shellClass}`}
      >
        <div className="flex h-[4.35rem] items-center justify-between px-4 sm:px-5 lg:h-[4.75rem] lg:px-6">
          <Link
            to="/Home"
            aria-label="Reimii - Inicio"
            className="group relative flex shrink-0 items-center gap-3"
          >
            <span
              aria-hidden="true"
              className={`absolute -inset-3 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 ${
                isDark ? 'bg-[#bd8ee8]/15' : 'bg-[#efafd0]/25'
              }`}
            />
            <img
              src={LOGO_URL}
              alt="REIMII"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.03] lg:h-10"
            />
            <span
              className={`hidden items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] xl:flex ${
                isDark
                  ? 'border-[#f0a8ca]/20 bg-[#f0a8ca]/10 text-[#ffc4df]'
                  : 'border-[#d98bb2]/20 bg-[#fae7f0] text-[#86345e]'
              }`}
            >
              <Sparkles className="h-3 w-3" />
              Studio
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <div
              className={`flex items-center rounded-full border p-1 ${
                isDark
                  ? 'border-white/[0.07] bg-white/[0.035]'
                  : 'border-[#4a3e4e]/[0.07] bg-white/55'
              }`}
            >
              {navLinks.map((link) => {
                const active = isActive(link.path);

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                      active
                        ? isDark
                          ? 'text-white'
                          : 'text-[#352c38]'
                        : isDark
                          ? 'text-[#cfc1d3] hover:text-white'
                          : 'text-[#695b6d] hover:text-[#342c37]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="reimii-nav-active"
                        transition={spring}
                        className={`absolute inset-0 -z-10 rounded-full ${
                          isDark
                            ? 'bg-gradient-to-r from-[#5f3c73] to-[#78395c] shadow-[0_8px_24px_rgba(213,129,178,0.15)]'
                            : 'bg-gradient-to-r from-[#f6d9e7] to-[#e9def8] shadow-[0_8px_24px_rgba(194,132,171,0.18)]'
                        }`}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <motion.a
              href="https://shop.reimii.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -1, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              className={`ml-2 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-shadow ${
                isDark
                  ? 'bg-[#f4e8f3] text-[#2c2330] shadow-[0_10px_30px_rgba(240,168,202,0.18)] hover:shadow-[0_14px_36px_rgba(240,168,202,0.27)]'
                  : 'bg-[#332b36] text-white shadow-[0_10px_28px_rgba(51,43,54,0.22)] hover:shadow-[0_14px_36px_rgba(51,43,54,0.3)]'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Tienda 3D
            </motion.a>

            <motion.button
              type="button"
              onClick={toggleTheme}
              whileHover={{ rotate: isDark ? 8 : -8, scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              aria-label={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
              className={`ml-2 grid h-10 w-10 place-items-center rounded-full border transition-colors ${iconButtonClass}`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.button>

            <div ref={langMenuRef} className="relative ml-1">
              <button
                type="button"
                onClick={() => setLangOpen((value) => !value)}
                aria-expanded={langOpen}
                className={`flex h-10 items-center gap-1.5 rounded-full border px-3 text-sm font-bold transition-colors ${iconButtonClass}`}
              >
                <span className="text-base leading-none">{currentLang.flag}</span>
                <span>{currentLang.label}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    langOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.16 }}
                    className={`absolute right-0 top-full mt-3 w-32 overflow-hidden rounded-[1.35rem] border p-1.5 backdrop-blur-2xl ${dropdownClass}`}
                  >
                    <div className="max-h-72 overflow-y-auto overscroll-contain">
                      {LANGS.map((item) => (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => {
                            setLang(item.code);
                            setLangOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${languageItemClass(
                            lang === item.code,
                          )}`}
                        >
                          <span>{item.flag}</span>
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen((value) => !value);
              setMobileLangOpen(false);
            }}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            className={`grid h-11 w-11 place-items-center rounded-2xl border transition-colors md:hidden ${iconButtonClass}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'close' : 'menu'}
                initial={false}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                transition={{ duration: 0.14 }}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={false}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className={`overflow-hidden border-t md:hidden ${
                isDark ? 'border-white/[0.07]' : 'border-[#4a3e4e]/[0.08]'
              }`}
            >
              <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain px-3 pb-3 pt-3">
                <div
                  className={`rounded-[1.35rem] p-2 ${isDark ? 'bg-white/[0.035]' : 'bg-white/55'}`}
                >
                  {navLinks.map((link, index) => {
                    const active = isActive(link.path);

                    return (
                      <motion.div
                        key={link.path}
                        initial={false}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.035 }}
                      >
                        <Link
                          to={link.path}
                          className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold transition-colors ${
                            active
                              ? isDark
                                ? 'bg-[#a4668c]/20 text-[#ffc8e1]'
                                : 'bg-[#f7e1eb] text-[#86345e]'
                              : isDark
                                ? 'text-[#d8cadc] hover:bg-white/[0.05] hover:text-white'
                                : 'text-[#5f5263] hover:bg-[#f7eee9] hover:text-[#352d38]'
                          }`}
                        >
                          {link.label}
                          {active && (
                            <span className="shadow-current/10 h-2 w-2 rounded-full bg-current shadow-[0_0_0_5px_currentColor]" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <a
                  href="https://shop.reimii.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`mt-3 flex items-center justify-center gap-2 rounded-[1.15rem] px-4 py-3.5 text-sm font-extrabold ${
                    isDark ? 'bg-[#f4e8f3] text-[#2d2431]' : 'bg-[#332b36] text-white'
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Tienda 3D
                </a>

                <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setMobileLangOpen((value) => !value)}
                      className={`flex h-12 w-full items-center justify-between rounded-2xl border px-4 text-sm font-bold transition-colors ${iconButtonClass}`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{currentLang.flag}</span>
                        <span>{currentLang.label}</span>
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          mobileLangOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileLangOpen && (
                        <motion.div
                          initial={false}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -4 }}
                          className={`mt-2 overflow-hidden rounded-[1.2rem] border p-1.5 ${dropdownClass}`}
                        >
                          <div className="grid max-h-60 grid-cols-2 overflow-y-auto">
                            {LANGS.map((item) => (
                              <button
                                key={item.code}
                                type="button"
                                onClick={() => {
                                  setLang(item.code);
                                  setMobileLangOpen(false);
                                  setIsOpen(false);
                                }}
                                className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${languageItemClass(
                                  lang === item.code,
                                )}`}
                              >
                                <span>{item.flag}</span>
                                <span>{item.label}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
                    className={`grid h-12 w-12 place-items-center rounded-2xl border transition-colors ${iconButtonClass}`}
                  >
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
