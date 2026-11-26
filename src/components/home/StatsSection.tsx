'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Rocket, Star, Users } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../ThemeContext';

function AnimatedCounter({
  target,
  suffix = '',
  isFloat = false,
}: {
  target: number;
  suffix?: string;
  isFloat?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView) return undefined;

    const duration = 1400;
    const startTime = performance.now();
    let frameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = target * eased;

      setCount(isFloat ? Number(nextValue.toFixed(1)) : Math.floor(nextValue));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [inView, isFloat, target]);

  return (
    <span ref={ref}>
      {isFloat ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const s = t.stats;

  const stats = [
    {
      icon: Rocket,
      value: 3,
      suffix: '+',
      label: s.launched,
      accent: isDark
        ? 'bg-[#f2b7d4]/12 text-[#f2b7d4] border-[#f2b7d4]/20'
        : 'bg-[#fceaf3] text-[#86345e] border-[#e7a8c7]/45',
    },
    {
      icon: Download,
      value: 10,
      suffix: '+',
      label: s.downloads,
      accent: isDark
        ? 'bg-[#d9c6f2]/12 text-[#d9c6f2] border-[#d9c6f2]/20'
        : 'bg-[#eee7f8] text-[#614387] border-[#d9c6f2]/55',
    },
    {
      icon: Star,
      value: 4.8,
      suffix: '',
      label: s.rating,
      accent: isDark
        ? 'bg-amber-300/10 text-amber-300 border-amber-300/20'
        : 'bg-[#fff1d8] text-[#785016] border-[#f1cf92]/55',
    },
    {
      icon: Users,
      value: 2,
      suffix: '',
      label: s.team,
      accent: isDark
        ? 'bg-rose-300/10 text-rose-300 border-rose-300/20'
        : 'bg-[#f8e6e8] text-[#873e49] border-[#e7bfc4]/55',
    },
  ];

  const sectionBg = isDark ? 'bg-[#151218]' : 'bg-[#f7f1e9]';
  const valueColor = isDark ? 'text-white' : 'text-[#272229]';
  const labelColor = isDark ? 'text-[#d3c8d5]' : 'text-[#594d55]';

  return (
    <section
      className={`relative overflow-hidden py-20 transition-colors duration-500 lg:py-24 ${sectionBg}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
          isDark ? 'bg-fuchsia-500/8' : 'bg-[#efbdd4]/30'
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.article
              key={stat.label}
              initial={false}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                type: 'spring',
                stiffness: 95,
              }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <div
                className={`flex h-full flex-col items-center rounded-[1.8rem] border p-5 text-center transition-all duration-500 sm:p-7 lg:p-8 ${
                  isDark
                    ? 'border-white/8 bg-white/[0.045] hover:border-[#f2b7d4]/20'
                    : 'border-white bg-white/75 shadow-[0_18px_45px_rgba(83,61,72,0.07)] hover:shadow-[0_24px_60px_rgba(83,61,72,0.11)]'
                }`}
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.06 }}
                  transition={{ duration: 0.45 }}
                  className={`mb-5 grid h-12 w-12 place-items-center rounded-[1.05rem] border sm:h-14 sm:w-14 ${stat.accent}`}
                >
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>

                <p
                  className={`text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl ${valueColor}`}
                >
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    isFloat={!Number.isInteger(stat.value)}
                  />
                </p>

                <p className={`mt-2 text-xs font-medium leading-5 sm:text-sm ${labelColor}`}>
                  {stat.label}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
