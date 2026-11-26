'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Lightbulb, Shield, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '../components/i18n/LanguageContext';
import { useTheme } from '../components/ThemeContext';

const TEAM_IMG = '/images/08d25b927_generated_3c4d9597.png';

const VALUE_ICONS = [Heart, Zap, Shield, Lightbulb];

export default function Nosotros() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const ap = t.aboutPage;
  const v = ap.values;

  const values = [
    {
      title: v.passion,
      desc: v.passionDesc,
      accent: isDark
        ? 'border-[#f2b7d4]/20 bg-[#f2b7d4]/10 text-[#f2b7d4]'
        : 'border-[#e7a8c7]/45 bg-[#fceaf3] text-[#a94f7c]',
    },
    {
      title: v.speed,
      desc: v.speedDesc,
      accent: isDark
        ? 'border-amber-300/20 bg-amber-300/10 text-amber-300'
        : 'border-[#f1cf92]/55 bg-[#fff1d8] text-[#a76a19]',
    },
    {
      title: v.respect,
      desc: v.respectDesc,
      accent: isDark
        ? 'border-[#d9c6f2]/20 bg-[#d9c6f2]/10 text-[#d9c6f2]'
        : 'border-[#d9c6f2]/55 bg-[#eee7f8] text-[#8264aa]',
    },
    {
      title: v.simplicity,
      desc: v.simplicityDesc,
      accent: isDark
        ? 'border-rose-300/20 bg-rose-300/10 text-rose-300'
        : 'border-[#e7bfc4]/55 bg-[#f8e6e8] text-[#a65f68]',
    },
  ];

  const pageBg = isDark ? 'bg-[#151218]' : 'bg-[#f7f1e9]';
  const titleColor = isDark ? 'text-white' : 'text-[#272229]';
  const bodyColor = isDark ? 'text-white/62' : 'text-[#756c71]';
  const mutedColor = isDark ? 'text-white/45' : 'text-[#8b8186]';

  return (
    <main
      className={`relative min-h-screen overflow-hidden pb-24 pt-28 transition-colors duration-500 lg:pb-32 lg:pt-36 ${pageBg}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full blur-3xl ${
          isDark ? 'bg-fuchsia-500/10' : 'bg-[#efbdd4]/40'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-20 top-[34rem] h-96 w-96 rounded-full blur-3xl ${
          isDark ? 'bg-violet-500/10' : 'bg-[#d9c6f2]/45'
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.header
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-4xl"
        >
          <div
            className={`mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
              isDark
                ? 'border-[#f2b7d4]/20 bg-[#f2b7d4]/10 text-[#f2b7d4]'
                : 'border-[#e7a8c7]/45 bg-[#fceaf3] text-[#a94f7c]'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {ap.subtitle}
          </div>

          <h1
            className={`text-5xl font-black leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-7xl ${titleColor}`}
          >
            {ap.title}
            <span className={`block ${isDark ? 'text-[#f2b7d4]' : 'text-[#bd5f8d]'}`}>
              {ap.titleAccent}
            </span>
          </h1>

          <p className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg ${bodyColor}`}>
            {ap.description}
          </p>
        </motion.header>

        <motion.section
          initial={false}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className={`relative mt-14 overflow-hidden rounded-[2.5rem] border p-3 ${
            isDark
              ? 'border-white/8 bg-white/[0.035]'
              : 'border-white bg-white/70 shadow-[0_30px_90px_rgba(83,61,72,0.10)]'
          }`}
        >
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src={TEAM_IMG}
              alt="Equipo REIMII"
              className="h-[25rem] w-full object-cover sm:h-[32rem] lg:h-[38rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">Reimii</p>
              <h2 className="mt-2 text-3xl font-black leading-[1] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
                Personas, ideas y proyectos con alma.
              </h2>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className={`relative mt-16 overflow-hidden rounded-[2.5rem] border px-6 py-12 sm:px-10 lg:px-16 lg:py-16 ${
            isDark
              ? 'border-white/8 bg-white/[0.04]'
              : 'bg-white/72 border-white shadow-[0_26px_75px_rgba(83,61,72,0.08)]'
          }`}
        >
          <div
            aria-hidden="true"
            className={`absolute -left-16 top-0 h-52 w-52 rounded-full blur-3xl ${
              isDark ? 'bg-fuchsia-500/10' : 'bg-[#efbdd4]/45'
            }`}
          />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p
                className={`text-xs font-bold uppercase tracking-[0.18em] ${
                  isDark ? 'text-[#f2b7d4]' : 'text-[#a94f7c]'
                }`}
              >
                Nuestra historia
              </p>
              <h2
                className={`mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl ${titleColor}`}
              >
                {ap.storyTitle}
              </h2>
            </div>

            <p className={`text-base leading-8 sm:text-lg ${bodyColor}`}>{ap.story}</p>
          </div>
        </motion.section>

        <section className="mt-20">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <p
              className={`text-xs font-bold uppercase tracking-[0.18em] ${
                isDark ? 'text-[#f2b7d4]' : 'text-[#a94f7c]'
              }`}
            >
              Lo que nos define
            </p>
            <h2
              className={`mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl ${titleColor}`}
            >
              {ap.valuesTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = VALUE_ICONS[index];

              return (
                <motion.article
                  key={value.title}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <div
                    className={`flex h-full flex-col rounded-[1.8rem] border p-6 transition-all duration-500 ${
                      isDark
                        ? 'border-white/8 bg-white/[0.04] hover:border-[#f2b7d4]/20'
                        : 'bg-white/72 border-white shadow-[0_18px_50px_rgba(83,61,72,0.07)] hover:shadow-[0_24px_65px_rgba(83,61,72,0.11)]'
                    }`}
                  >
                    <div
                      className={`h-13 w-13 grid place-items-center rounded-[1.1rem] border ${value.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className={`mt-5 text-xl font-black tracking-[-0.03em] ${titleColor}`}>
                      {value.title}
                    </h3>

                    <p className={`mt-3 text-sm leading-6 ${bodyColor}`}>{value.desc}</p>

                    <div
                      className={`mt-auto pt-6 text-[10px] font-bold uppercase tracking-[0.16em] ${mutedColor}`}
                    >
                      Reimii value
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
