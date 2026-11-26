'use client';
import React from "react";
import { Link } from "@/lib/navigation";
import {
  ArrowUpRight,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";

const LOGO_URL = "/images/073fb0ac3_reimii4x.png";
const CONTACT_EMAIL = "shop@reimii.com";
const SHOP_URL = "https://shop.reimii.com";
const INSTAGRAM_URL = "https://www.instagram.com/reimii.3d/";

export default function Footer() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const navLinks = [
    { label: t.nav.home, path: "/Home" },
    { label: t.nav.projects, path: "/Proyectos" },
    { label: t.nav.about, path: "/Nosotros" },
    { label: t.nav.contact, path: "/Contacto" },
  ];

  const footerBg = isDark
    ? "bg-[#151218] text-white"
    : "bg-[#f7f1e9] text-[#242126]";

  const cardBg = isDark
    ? "bg-white/[0.04] border-white/10"
    : "bg-white/70 border-white shadow-[0_24px_70px_rgba(88,65,74,0.08)]";

  const mutedText = isDark ? "text-white/55" : "text-[#756c71]";
  const headingText = isDark ? "text-white" : "text-[#272229]";

  const linkClass = isDark
    ? "text-white/60 hover:text-[#f2b7d4]"
    : "text-[#6f656b] hover:text-[#bd5f8d]";

  return (
    <footer className={`relative overflow-hidden transition-colors duration-500 ${footerBg}`}>
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full blur-3xl ${
          isDark ? "bg-fuchsia-500/10" : "bg-[#efbdd4]/35"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full blur-3xl ${
          isDark ? "bg-violet-500/10" : "bg-[#d9c6f2]/40"
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-14 lg:px-8 lg:pt-20">
        {/* Shop CTA */}
        <div
          className={`mb-10 overflow-hidden rounded-[2rem] border ${cardBg}`}
        >
          <div className="grid items-center gap-8 px-6 py-8 sm:px-9 lg:grid-cols-[1fr_auto] lg:px-12 lg:py-10">
            <div className="max-w-2xl">
              <div
                className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
                  isDark
                    ? "border-[#f2b7d4]/20 bg-[#f2b7d4]/10 text-[#f2b7d4]"
                    : "border-[#e7a8c7]/40 bg-[#fceaf3] text-[#a94f7c]"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Reimii 3D Shop
              </div>

              <h2
                className={`max-w-xl text-2xl font-black tracking-[-0.04em] sm:text-3xl ${headingText}`}
              >
                Pequeños compañeros creados para hacerte sonreír.
              </h2>

              <p className={`mt-3 max-w-xl text-sm leading-6 sm:text-base ${mutedText}`}>
                Descubre nuestros personajes articulados, llaveros y criaturas
                impresas en 3D con mucho cariño.
              </p>
            </div>

            <motion.a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-colors sm:w-auto ${
                isDark
                  ? "bg-[#f2b7d4] text-[#261d24] hover:bg-[#fac8df]"
                  : "bg-[#282329] text-white hover:bg-[#bd5f8d]"
              }`}
            >
              Visitar la tienda
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid gap-10 py-8 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.9fr] lg:gap-14">
          <div>
            <Link
              to="/Home"
              className="inline-flex items-center transition-opacity hover:opacity-80"
              aria-label="Ir al inicio de Reimii"
            >
              <img
                src={LOGO_URL}
                alt="REIMII"
                className="h-11 w-auto object-contain"
              />
            </Link>

            <p className={`mt-5 max-w-sm text-sm leading-7 ${mutedText}`}>
              {t.footer.tagline}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram de Reimii"
                className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${
                  isDark
                    ? "border-white/10 bg-white/5 text-white/65 hover:border-[#f2b7d4]/40 hover:text-[#f2b7d4]"
                    : "border-[#e8dde2] bg-white/80 text-[#766b71] hover:border-[#e7a8c7] hover:text-[#bd5f8d]"
                }`}
              >
                <Instagram className="h-4 w-4" />
              </motion.a>

              <motion.a
                href={`mailto:${CONTACT_EMAIL}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Enviar un correo a ${CONTACT_EMAIL}`}
                className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${
                  isDark
                    ? "border-white/10 bg-white/5 text-white/65 hover:border-[#f2b7d4]/40 hover:text-[#f2b7d4]"
                    : "border-[#e8dde2] bg-white/80 text-[#766b71] hover:border-[#e7a8c7] hover:text-[#bd5f8d]"
                }`}
              >
                <Mail className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3
              className={`text-xs font-bold uppercase tracking-[0.2em] ${headingText}`}
            >
              {t.footer.nav}
            </h3>

            <nav className="mt-5 flex flex-col items-start gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${linkClass}`}
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              ))}

              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${linkClass}`}
              >
                Tienda 3D
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </nav>
          </div>

          <div>
            <h3
              className={`text-xs font-bold uppercase tracking-[0.2em] ${headingText}`}
            >
              {t.footer.contact}
            </h3>

            <div className="mt-5 space-y-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={`group flex items-start gap-3 text-sm transition-colors ${linkClass}`}
              >
                <span
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    isDark ? "bg-white/5" : "bg-white/80"
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <span className="pt-1.5">{CONTACT_EMAIL}</span>
              </a>

              <div className={`flex items-start gap-3 text-sm ${mutedText}`}>
                <span
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    isDark ? "bg-white/5" : "bg-white/80"
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                <span className="pt-1.5">{t.footer.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-6 flex flex-col items-center justify-between gap-4 border-t pt-7 text-center sm:flex-row sm:text-left ${
            isDark ? "border-white/10" : "border-[#ded2d7]"
          }`}
        >
          <p className={`text-xs sm:text-sm ${mutedText}`}>
            © {new Date().getFullYear()} REIMII. {t.footer.rights}
          </p>

          <p className={`flex items-center gap-1.5 text-xs sm:text-sm ${mutedText}`}>
            Hecho con
            <Heart
              className={`h-3.5 w-3.5 fill-current ${
                isDark ? "text-[#f2b7d4]" : "text-[#ca6d99]"
              }`}
            />
            en Barcelona
          </p>
        </div>
      </div>
    </footer>
  );
}