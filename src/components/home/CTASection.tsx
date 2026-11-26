'use client';
import React from 'react';
import { Link } from '@/lib/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, MessageCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../ThemeContext';

export default function CTASection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const c = t.cta;

  const sectionBg = isDark ? 'bg-[#151218]' : 'bg-[#f7f1e9]';
  const titleColor = isDark ? 'text-white' : 'text-[#272229]';
  const descColor = isDark ? 'text-[#ded4e0]' : 'text-[#594d55]';

  return (
    <section
      className={`relative overflow-hidden py-24 transition-colors duration-500 lg:py-32 ${sectionBg}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full blur-3xl ${
          isDark ? 'bg-fuchsia-500/10' : 'bg-[#efbdd4]/40'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full blur-3xl ${
          isDark ? 'bg-violet-500/10' : 'bg-[#d9c6f2]/45'
        }`}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, type: 'spring', stiffness: 75 }}
          className={`relative overflow-hidden rounded-[2.5rem] border px-6 py-12 text-center sm:px-10 lg:px-16 lg:py-20 ${
            isDark
              ? 'border-white/10 bg-white/[0.045]'
              : 'border-white bg-white/75 shadow-[0_30px_90px_rgba(83,61,72,0.10)]'
          }`}
        >
          <div
            aria-hidden="true"
            className={`absolute left-10 top-10 h-28 w-28 rounded-full blur-3xl ${
              isDark ? 'bg-fuchsia-400/10' : 'bg-[#efbdd4]/55'
            }`}
          />
          <div
            aria-hidden="true"
            className={`absolute bottom-8 right-10 h-32 w-32 rounded-full blur-3xl ${
              isDark ? 'bg-violet-400/10' : 'bg-[#d8c9f1]/60'
            }`}
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 180,
                delay: 0.15,
              }}
              className={`mx-auto mb-7 grid h-16 w-16 place-items-center rounded-[1.4rem] border ${
                isDark
                  ? 'border-[#f2b7d4]/20 bg-[#f2b7d4]/10 text-[#f2b7d4]'
                  : 'border-[#e7a8c7]/45 bg-[#fceaf3] text-[#86345e]'
              }`}
            >
              <MessageCircle className="h-7 w-7" />
            </motion.div>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`mx-auto mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
                isDark
                  ? 'border-white/10 bg-white/5 text-white/70'
                  : 'border-[#e4d8dd] bg-white/70 text-[#594d55]'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Hablemos
            </motion.div>

            <motion.h2
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28 }}
              className={`text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl ${titleColor}`}
            >
              {c.title}
            </motion.h2>

            <motion.p
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.36 }}
              className={`mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg ${descColor}`}
            >
              {c.subtitle}
            </motion.p>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.44 }}
              className="mt-9"
            >
              <motion.div
                className="inline-block"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/Contacto"
                  className={`group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold transition-colors ${
                    isDark
                      ? 'bg-[#f2b7d4] text-[#261d24] hover:bg-[#fac8df]'
                      : 'bg-[#282329] text-white hover:bg-[#8e3864]'
                  }`}
                >
                  {c.button}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.p
              initial={false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className={`mt-6 inline-flex items-center gap-1.5 text-xs sm:text-sm ${descColor}`}
            >
              Ideas, proyectos y colaboraciones
              <Heart
                className={`h-3.5 w-3.5 fill-current ${
                  isDark ? 'text-[#f2b7d4]' : 'text-[#8e3864]'
                }`}
              />
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
