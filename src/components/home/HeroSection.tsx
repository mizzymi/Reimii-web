'use client';
import React, { useMemo } from "react";
import { Link } from "@/lib/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Box,
  Heart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";

const HERO_BG_DARK =
  "/images/83d89c374_765be4a9e_generated_f133a446.png";
const HERO_BG_LIGHT =
  "/images/52f758cf3_765be4a9e_generated_f133a446-light.png";
const LOGO_URL = "/images/073fb0ac3_reimii4x.png";
const SHOP_URL = "https://shop.reimii.com";

function FloatingDecor({ isDark }: {isDark:boolean}) {
  const pieces = useMemo(
    () => [
      { id: 1, x: "8%", y: "22%", size: 12, delay: 0 },
      { id: 2, x: "17%", y: "68%", size: 8, delay: 1.2 },
      { id: 3, x: "78%", y: "18%", size: 10, delay: 0.7 },
      { id: 4, x: "89%", y: "63%", size: 14, delay: 1.8 },
      { id: 5, x: "67%", y: "78%", size: 7, delay: 0.4 },
      { id: 6, x: "31%", y: "12%", size: 6, delay: 2.1 },
    ],
    [],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className={`absolute rounded-full ${
            isDark ? "bg-[#f2b7d4]/25" : "bg-[#d987ad]/25"
          }`}
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
          }}
          animate={{
            y: [0, -14, 0],
            x: [0, 5, 0],
            opacity: [0.35, 0.8, 0.35],
          }}
          transition={{
            duration: 5 + piece.id * 0.35,
            delay: piece.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const h = t.hero;

  const sectionBg = isDark ? "bg-[#151218]" : "bg-[#f7f1e9]";
  const textMain = isDark ? "text-white" : "text-[#272229]";
  const textMuted = isDark ? "text-white/65" : "text-[#6f656b]";

  return (
    <section
      className={`relative flex min-h-screen items-center overflow-hidden transition-colors duration-500 ${sectionBg}`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: `url(${isDark ? HERO_BG_DARK : HERO_BG_LIGHT})`,
        }}
      />

      {/* Soft overlays */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-br from-[#151218]/95 via-[#1d1820]/90 to-[#211822]/85"
            : "bg-gradient-to-br from-[#f7f1e9]/95 via-[#f9f4ee]/90 to-[#f3e7ee]/85"
        }`}
      />

      <motion.div
        aria-hidden="true"
        className={`absolute -left-20 top-24 h-80 w-80 rounded-full blur-3xl ${
          isDark ? "bg-fuchsia-500/10" : "bg-[#efbdd4]/45"
        }`}
        animate={{ scale: [1, 1.15, 1], x: [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden="true"
        className={`absolute -right-24 bottom-20 h-96 w-96 rounded-full blur-3xl ${
          isDark ? "bg-violet-500/10" : "bg-[#d8c9f1]/50"
        }`}
        animate={{ scale: [1.1, 1, 1.1], y: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingDecor isDark={isDark} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-20 lg:pt-32">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
              isDark
                ? "border-[#f2b7d4]/20 bg-[#f2b7d4]/10 text-[#f2b7d4]"
                : "border-[#e7a8c7]/45 bg-[#fceaf3]/90 text-[#a94f7c]"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {h.badge}
          </motion.div>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className={`mx-auto max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:mx-0 lg:text-6xl xl:text-7xl ${textMain}`}
          >
            Ideas con personalidad,
            <span
              className={`block ${
                isDark ? "text-[#f2b7d4]" : "text-[#bd5f8d]"
              }`}
            >
              hechas a la manera Reimii.
            </span>
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className={`mx-auto mt-7 max-w-2xl text-base leading-7 sm:text-lg lg:mx-0 ${textMuted}`}
          >
            {h.subtitle}
            <span className={`mt-1 block font-semibold ${textMain}`}>
              {h.accent}
            </span>
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <motion.div
              className="w-full sm:w-auto"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/Proyectos"
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition-colors sm:w-auto ${
                  isDark
                    ? "bg-[#f2b7d4] text-[#261d24] hover:bg-[#fac8df]"
                    : "bg-[#282329] text-white hover:bg-[#bd5f8d]"
                }`}
              >
                {h.cta1}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              className="w-full sm:w-auto"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/Nosotros"
                className={`inline-flex w-full items-center justify-center rounded-full border px-7 py-4 text-sm font-semibold backdrop-blur-sm transition-colors sm:w-auto ${
                  isDark
                    ? "border-white/12 bg-white/5 text-white hover:border-white/25 hover:bg-white/10"
                    : "border-[#ded2d7] bg-white/65 text-[#4e454b] hover:border-[#d8a9c0] hover:bg-white"
                }`}
              >
                {h.cta2}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className={`mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium lg:justify-start ${textMuted}`}
          >
            <span className="inline-flex items-center gap-2">
              <Box className="h-4 w-4" />
              Diseño creativo
            </span>
            <span className="inline-flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Hecho con cariño
            </span>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 transition-colors ${
                isDark ? "hover:text-[#f2b7d4]" : "hover:text-[#bd5f8d]"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Reimii 3D Shop
            </a>
          </motion.div>
        </div>

        {/* Visual card */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            type: "spring",
            stiffness: 70,
          }}
          className="relative mx-auto w-full max-w-xl"
        >
          <motion.div
            aria-hidden="true"
            className={`absolute -inset-3 rounded-[2.7rem] ${
              isDark ? "bg-white/[0.03]" : "bg-white/50"
            }`}
            animate={{ rotate: [1.5, -1.5, 1.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div
            className={`relative overflow-hidden rounded-[2.5rem] border p-6 shadow-[0_35px_90px_rgba(81,52,66,0.16)] sm:p-8 ${
              isDark
                ? "border-white/10 bg-white/[0.055]"
                : "border-white bg-white/75"
            }`}
          >
            <div
              className={`absolute right-5 top-5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${
                isDark
                  ? "bg-[#f2b7d4]/12 text-[#f2b7d4]"
                  : "bg-[#f9dce9] text-[#a94f7c]"
              }`}
            >
              Reimii
            </div>

            <div
              className={`relative flex min-h-[390px] items-center justify-center overflow-hidden rounded-[2rem] ${
                isDark
                  ? "bg-gradient-to-br from-[#241d25] to-[#1a161c]"
                  : "bg-gradient-to-br from-[#f9e8ef] via-[#f7f0e8] to-[#e9def5]"
              }`}
            >
              <div
                aria-hidden="true"
                className={`absolute left-8 top-8 h-24 w-24 rounded-full blur-2xl ${
                  isDark ? "bg-fuchsia-400/10" : "bg-[#efbdd4]/70"
                }`}
              />
              <div
                aria-hidden="true"
                className={`absolute bottom-8 right-8 h-28 w-28 rounded-full blur-2xl ${
                  isDark ? "bg-violet-400/10" : "bg-[#d5c5ef]/70"
                }`}
              />

              <motion.img
                src={LOGO_URL}
                alt="REIMII"
                className="relative z-10 w-[72%] max-w-sm object-contain drop-shadow-2xl"
                animate={{ y: [0, -8, 0], rotate: [0, 0.5, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className={`absolute bottom-5 left-5 rounded-2xl border px-4 py-3 backdrop-blur-md ${
                  isDark
                    ? "border-white/10 bg-black/20"
                    : "border-white/70 bg-white/65"
                }`}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className={`text-xs font-bold ${textMain}`}>
                  Creatividad + tecnología
                </p>
                <p className={`mt-1 text-[11px] ${textMuted}`}>
                  Diseños que conectan
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className={`pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${
          isDark ? "from-[#151218]" : "from-[#f7f1e9]"
        } to-transparent`}
      />
    </section>
  );
}