'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from '@/lib/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Heart,
  Monitor,
  Smartphone,
  Sparkles,
  Star,
  Tag,
} from 'lucide-react';
import { useLanguage } from '../components/i18n/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import {
  PROJECT_IMAGES,
  PROJECT_SCREENSHOTS,
  PROJECT_TAGS,
  APP_RATINGS,
  PROJECT_SLUGS,
} from '../components/projects/projectsData';

export default function ProjectDetail() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [activeImg, setActiveImg] = useState(0);

  const index = PROJECT_SLUGS.indexOf(slug ?? '');
  const project = index >= 0 ? t.projects[index] : null;

  useEffect(() => {
    setActiveImg(0);
  }, [slug]);

  const screenshots = useMemo(() => {
    if (index < 0) return [];
    return PROJECT_SCREENSHOTS[index]?.length > 0
      ? PROJECT_SCREENSHOTS[index]
      : [PROJECT_IMAGES[index]];
  }, [index]);

  if (!project || index < 0) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center px-6 ${
          isDark ? 'bg-[#151218] text-white' : 'bg-[#f7f1e9] text-[#272229]'
        }`}
      >
        <div className="max-w-md text-center">
          <p className="text-3xl font-black tracking-[-0.04em]">Project not found</p>
          <button
            type="button"
            onClick={() => navigate('/Proyectos')}
            className={`mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold ${
              isDark ? 'bg-[#f2b7d4] text-[#261d24]' : 'bg-[#282329] text-white'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </button>
        </div>
      </div>
    );
  }

  const tags = PROJECT_TAGS[index] ?? [];
  const rating = APP_RATINGS[index] ?? '—';
  const pp = t.projectsPage;

  const pageBg = isDark ? 'bg-[#151218]' : 'bg-[#f7f1e9]';
  const titleColor = isDark ? 'text-white' : 'text-[#272229]';
  const bodyColor = isDark ? 'text-[#ded4e0]' : 'text-[#594d55]';
  const mutedColor = isDark ? 'text-[#c9bdcd]' : 'text-[#62555e]';
  const borderColor = isDark ? 'border-white/10' : 'border-[#e7dce1]';

  const prev = () => setActiveImg((value) => (value - 1 + screenshots.length) % screenshots.length);

  const next = () => setActiveImg((value) => (value + 1) % screenshots.length);

  return (
    <main className={`min-h-screen overflow-hidden transition-colors duration-500 ${pageBg}`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed -left-24 top-24 h-80 w-80 rounded-full blur-3xl ${
          isDark ? 'bg-fuchsia-500/10' : 'bg-[#efbdd4]/40'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed -right-20 bottom-10 h-96 w-96 rounded-full blur-3xl ${
          isDark ? 'bg-violet-500/10' : 'bg-[#d9c6f2]/45'
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8 lg:pb-32">
        <motion.button
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          type="button"
          onClick={() => navigate('/Proyectos')}
          className={`group mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-colors ${
            isDark
              ? 'border-white/10 bg-white/5 text-white/70 hover:text-white'
              : 'border-[#ded2d7] bg-white/60 text-[#594d55] hover:text-[#272229]'
          }`}
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {pp.subtitle}
        </motion.button>

        <section
          className={`relative overflow-hidden rounded-[2.5rem] border ${
            isDark
              ? 'border-white/10 bg-white/[0.04]'
              : 'bg-white/72 border-white shadow-[0_35px_100px_rgba(83,61,72,0.11)]'
          }`}
        >
          <div className="grid min-h-[620px] lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65 }}
              className="relative min-h-[420px] overflow-hidden lg:min-h-full"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={screenshots[activeImg]}
                  alt={`${project.name} screenshot ${activeImg + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />

              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-bold backdrop-blur-md ${project.statusColor}`}
                >
                  {project.status}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
                  {project.type === 'game' ? (
                    <Gamepad2 className="h-3.5 w-3.5" />
                  ) : (
                    <Smartphone className="h-3.5 w-3.5" />
                  )}
                  {project.type === 'game' ? pp.gameLabel : pp.appLabel}
                </span>
              </div>

              <div className="absolute right-5 top-5 rounded-2xl border border-white/15 bg-black/80 px-4 py-3 text-white backdrop-blur-md">
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="h-3.5 w-3.5 fill-current text-amber-300" />
                  ))}
                </div>
                <p className="mt-1 text-xs font-bold">{rating}</p>
              </div>

              {screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous screenshot"
                    className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/80 text-white backdrop-blur-md transition-colors hover:bg-black/55"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next screenshot"
                    className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/80 text-white backdrop-blur-md transition-colors hover:bg-black/55"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ded4e0]">
                  {project.category}
                </p>
                <h1 className="mt-2 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                  {project.name}
                </h1>
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="flex flex-col p-7 sm:p-9 lg:p-10 xl:p-12"
            >
              <div
                className={`mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold uppercase tracking-[0.17em] ${
                  isDark
                    ? 'border-[#f2b7d4]/20 bg-[#f2b7d4]/10 text-[#f2b7d4]'
                    : 'border-[#e7a8c7]/45 bg-[#fceaf3] text-[#86345e]'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Proyecto Reimii
              </div>

              <p className={`text-base leading-7 ${bodyColor}`}>{project.description}</p>

              <div className={`my-8 border-t ${borderColor}`} />

              <div className="grid gap-4 sm:grid-cols-2">
                <div
                  className={`rounded-[1.35rem] border p-4 ${
                    isDark ? 'border-white/8 bg-white/[0.035]' : 'border-[#e8dde2] bg-white/60'
                  }`}
                >
                  <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedColor}`}>
                    {pp.platform}
                  </p>
                  <div className={`mt-3 flex flex-wrap gap-3 text-sm font-semibold ${titleColor}`}>
                    {project.type === 'game' ? (
                      <>
                        <span className="inline-flex items-center gap-1.5">
                          <Monitor className="h-4 w-4" />
                          PC
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Smartphone className="h-4 w-4" />
                          Android
                        </span>
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-1.5">
                        <Smartphone className="h-4 w-4" />
                        Android
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`rounded-[1.35rem] border p-4 ${
                    isDark ? 'border-white/8 bg-white/[0.035]' : 'border-[#e8dde2] bg-white/60'
                  }`}
                >
                  <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedColor}`}>
                    Rating
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current text-amber-400" />
                    <span className={`text-sm font-bold ${titleColor}`}>{rating}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedColor}`}>
                  {pp.featuresLabel}
                </p>

                <div className="mt-4 grid gap-3">
                  {project.features.map((feature) => (
                    <div
                      key={feature}
                      className={`flex items-start gap-3 rounded-[1.15rem] border p-4 ${
                        isDark ? 'border-white/8 bg-white/[0.03]' : 'border-[#e8dde2] bg-white/55'
                      }`}
                    >
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          isDark ? 'text-[#f2b7d4]' : 'text-[#8e3864]'
                        }`}
                      />
                      <p className={`text-sm leading-6 ${bodyColor}`}>{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {tags.length > 0 && (
                <div className="mt-8">
                  <p
                    className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] ${mutedColor}`}
                  >
                    <Tag className="h-3.5 w-3.5" />
                    Tags
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                          tagIndex % 3 === 0
                            ? isDark
                              ? 'border-[#f2b7d4]/20 bg-[#f2b7d4]/10 text-[#f2b7d4]'
                              : 'border-[#e7a8c7]/45 bg-[#fceaf3] text-[#86345e]'
                            : tagIndex % 3 === 1
                              ? isDark
                                ? 'border-[#d9c6f2]/20 bg-[#d9c6f2]/10 text-[#d9c6f2]'
                                : 'border-[#d9c6f2]/55 bg-[#eee7f8] text-[#614387]'
                              : isDark
                                ? 'border-amber-300/20 bg-amber-300/10 text-amber-300'
                                : 'border-[#f1cf92]/55 bg-[#fff1d8] text-[#785016]'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {screenshots.length > 1 && (
          <motion.section
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-16"
          >
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-[0.16em] ${
                    isDark ? 'text-[#f2b7d4]' : 'text-[#86345e]'
                  }`}
                >
                  Galería
                </p>
                <h2
                  className={`mt-2 text-3xl font-black tracking-[-0.045em] sm:text-4xl ${titleColor}`}
                >
                  Screenshots
                </h2>
              </div>
              <p className={`hidden text-sm sm:block ${bodyColor}`}>
                {activeImg + 1} / {screenshots.length}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {screenshots.map((screenshot, screenshotIndex) => (
                <motion.button
                  key={`${screenshot}-${screenshotIndex}`}
                  type="button"
                  onClick={() => {
                    setActiveImg(screenshotIndex);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.99 }}
                  className={`relative overflow-hidden rounded-[1.6rem] border text-left transition-all ${
                    screenshotIndex === activeImg
                      ? isDark
                        ? 'border-[#f2b7d4]/60'
                        : 'border-[#bd5f8d]'
                      : isDark
                        ? 'border-white/8'
                        : 'border-white'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={screenshot}
                      alt={`${project.name} screenshot ${screenshotIndex + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                    {String(screenshotIndex + 1).padStart(2, '0')}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          className={`lg:py-18 relative mt-20 overflow-hidden rounded-[2.5rem] border px-6 py-14 text-center sm:px-10 ${
            isDark
              ? 'border-white/10 bg-white/[0.045]'
              : 'bg-white/72 border-white shadow-[0_30px_90px_rgba(83,61,72,0.09)]'
          }`}
        >
          <div
            aria-hidden="true"
            className={`absolute -left-14 top-0 h-48 w-48 rounded-full blur-3xl ${
              isDark ? 'bg-fuchsia-500/10' : 'bg-[#efbdd4]/45'
            }`}
          />
          <div
            aria-hidden="true"
            className={`absolute -right-14 bottom-0 h-52 w-52 rounded-full blur-3xl ${
              isDark ? 'bg-violet-500/10' : 'bg-[#d9c6f2]/50'
            }`}
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <Heart
              className={`mx-auto h-7 w-7 fill-current ${
                isDark ? 'text-[#f2b7d4]' : 'text-[#8e3864]'
              }`}
            />
            <h2
              className={`mt-5 text-3xl font-black tracking-[-0.045em] sm:text-5xl ${titleColor}`}
            >
              ¿Te gusta este proyecto?
            </h2>
            <p className={`mx-auto mt-4 max-w-xl text-base leading-7 ${bodyColor}`}>
              Descubre el resto de proyectos de Reimii o cuéntanos tu próxima idea.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <motion.button
                type="button"
                onClick={() => navigate('/Proyectos')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold sm:w-auto ${
                  isDark
                    ? 'bg-[#f2b7d4] text-[#261d24] hover:bg-[#fac8df]'
                    : 'bg-[#282329] text-white hover:bg-[#8e3864]'
                }`}
              >
                Ver todos los proyectos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                type="button"
                onClick={() => navigate('/Contacto')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`inline-flex w-full items-center justify-center rounded-full border px-7 py-4 text-sm font-bold sm:w-auto ${
                  isDark
                    ? 'border-white/12 bg-white/5 text-white hover:bg-white/10'
                    : 'border-[#ded2d7] bg-white/65 text-[#4e454b] hover:bg-white'
                }`}
              >
                Contactar
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
