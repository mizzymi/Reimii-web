'use client';
import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from '@/lib/navigation';
import { ArrowRight, Gamepad2, SearchX, Smartphone, Sparkles, Star, Tag, X } from 'lucide-react';
import { useLanguage } from '../components/i18n/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import {
  PROJECT_IMAGES,
  PROJECT_TAGS,
  APP_RATINGS,
  PROJECT_SLUGS,
} from '../components/projects/projectsData';

const ALL_TAGS = [...new Set(PROJECT_TAGS.flat())].sort();

export default function Proyectos() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const pp = t.projectsPage;
  const projects = t.projects;

  const toggleTag = (tag: string) => {
    setActiveTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  };

  const filteredIndices = useMemo(
    () =>
      projects.reduce<number[]>((matches, _, index) => {
        const projectTags = PROJECT_TAGS[index] ?? [];
        const isMatch =
          activeTags.length === 0 || activeTags.every((tag) => projectTags.includes(tag));

        if (isMatch) matches.push(index);
        return matches;
      }, []),
    [activeTags, projects],
  );

  const pageBg = isDark ? 'bg-[#151218]' : 'bg-[#f7f1e9]';
  const titleColor = isDark ? 'text-white' : 'text-[#272229]';
  const bodyColor = isDark ? 'text-[#ded4e0]' : 'text-[#594d55]';
  const mutedColor = isDark ? 'text-[#c9bdcd]' : 'text-[#62555e]';

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
        className={`pointer-events-none absolute -right-20 top-[30rem] h-96 w-96 rounded-full blur-3xl ${
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
                : 'border-[#e7a8c7]/45 bg-[#fceaf3] text-[#86345e]'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {pp.subtitle}
          </div>

          <h1
            className={`text-5xl font-black leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-7xl ${titleColor}`}
          >
            {pp.title}
            <span className={`block ${isDark ? 'text-[#f2b7d4]' : 'text-[#8e3864]'}`}>
              {pp.titleAccent}
            </span>
          </h1>

          <p className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg ${bodyColor}`}>
            {pp.description}
          </p>
        </motion.header>

        <motion.section
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className={`mt-12 rounded-[2rem] border p-5 sm:p-6 ${
            isDark
              ? 'border-white/8 bg-white/[0.035]'
              : 'border-white bg-white/70 shadow-[0_22px_65px_rgba(83,61,72,0.07)]'
          }`}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] ${mutedColor}`}
            >
              <Tag className="h-3.5 w-3.5" />
              Tags
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  isDark ? 'bg-white/5' : 'bg-[#f2e8ed]'
                }`}
              >
                {filteredIndices.length}
              </span>
            </div>

            {activeTags.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTags([])}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                  isDark
                    ? 'border-white/10 bg-white/5 text-[#d3c8d5] hover:text-white'
                    : 'border-[#ded2d7] bg-white/70 text-[#594d55] hover:text-[#272229]'
                }`}
              >
                <X className="h-3.5 w-3.5" />
                clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((tag, index) => {
              const active = activeTags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
                    active
                      ? isDark
                        ? 'border-[#f2b7d4]/50 bg-[#f2b7d4]/15 text-[#f2b7d4]'
                        : 'border-[#d884ae] bg-[#f9dce9] text-[#91446b]'
                      : index % 3 === 0
                        ? isDark
                          ? 'border-white/8 bg-white/[0.035] text-[#d3c8d5] hover:border-[#f2b7d4]/25 hover:text-[#f2b7d4]'
                          : 'border-[#eadde3] bg-white/55 text-[#594d55] hover:border-[#e7a8c7] hover:text-[#86345e]'
                        : index % 3 === 1
                          ? isDark
                            ? 'border-white/8 bg-white/[0.035] text-[#d3c8d5] hover:border-[#d9c6f2]/25 hover:text-[#d9c6f2]'
                            : 'border-[#e2d9ef] bg-[#f5f0fb]/75 text-[#594d55] hover:border-[#cdb8eb] hover:text-[#614387]'
                          : isDark
                            ? 'border-white/8 bg-white/[0.035] text-[#d3c8d5] hover:border-amber-300/25 hover:text-amber-300'
                            : 'border-[#efdfbf] bg-[#fff8ea]/75 text-[#594d55] hover:border-[#e8c986] hover:text-[#785016]'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </motion.section>

        <section className="mt-10">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filteredIndices.map((projectIndex) => {
                const project = projects[projectIndex];
                const projectTags = PROJECT_TAGS[projectIndex] ?? [];

                return (
                  <motion.article
                    layout
                    key={project.name}
                    initial={false}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.38 }}
                    whileHover={{ y: -6 }}
                    className="h-full"
                  >
                    <div
                      className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border transition-all duration-500 ${
                        isDark
                          ? 'border-white/8 hover:border-[#f2b7d4]/22 bg-white/[0.045]'
                          : 'border-white bg-white/75 shadow-[0_20px_55px_rgba(83,61,72,0.08)] hover:shadow-[0_28px_70px_rgba(83,61,72,0.13)]'
                      }`}
                    >
                      <div className="relative m-3 overflow-hidden rounded-[1.45rem]">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={PROJECT_IMAGES[projectIndex]}
                            alt={project.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.055]"
                          />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                        <span
                          className={`absolute left-4 top-4 rounded-full border px-3 py-1.5 text-[11px] font-bold backdrop-blur-md ${project.statusColor}`}
                        >
                          {project.status}
                        </span>

                        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-3 py-1.5 backdrop-blur-md">
                          <Star className="h-3.5 w-3.5 fill-current text-amber-300" />
                          <span className="text-xs font-bold text-white">
                            {APP_RATINGS[projectIndex]}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                          <p className="project-category-overlay text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                            {project.category}
                          </p>
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                            {project.type === 'game' ? (
                              <Gamepad2 className="h-3 w-3" />
                            ) : (
                              <Smartphone className="h-3 w-3" />
                            )}
                            {project.type === 'game' ? pp.gameLabel : pp.appLabel}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col px-6 pb-6 pt-3">
                        <h2 className={`text-xl font-black tracking-[-0.035em] ${titleColor}`}>
                          {project.name}
                        </h2>

                        <p className="project-description mt-3 flex-1 text-sm leading-6">
                          {project.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {projectTags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tag}
                              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                                activeTags.includes(tag)
                                  ? isDark
                                    ? 'bg-[#f2b7d4]/12 border-[#f2b7d4]/40 text-[#f2b7d4]'
                                    : 'border-[#d884ae] bg-[#f9dce9] text-[#91446b]'
                                  : tagIndex % 2 === 0
                                    ? isDark
                                      ? 'border-white/8 bg-white/[0.035] text-[#c9bdcd]'
                                      : 'border-[#eadde3] bg-[#faf6f8] text-[#62555e]'
                                    : isDark
                                      ? 'border-white/8 bg-white/[0.035] text-[#c9bdcd]'
                                      : 'border-[#e2d9ef] bg-[#f5f0fb] text-[#62555e]'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}

                          {projectTags.length > 3 && (
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                                isDark
                                  ? 'border-white/8 bg-white/[0.035] text-[#c9bdcd]'
                                  : 'border-[#e8dde2] bg-white/55 text-[#62555e]'
                              }`}
                            >
                              +{projectTags.length - 3}
                            </span>
                          )}
                        </div>

                        <motion.button
                          type="button"
                          onClick={() => navigate(`/Proyectos/${PROJECT_SLUGS[projectIndex]}`)}
                          whileTap={{ scale: 0.98 }}
                          className={`group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold transition-colors ${
                            isDark
                              ? 'bg-[#f2b7d4] text-[#261d24] hover:bg-[#fac8df]'
                              : 'bg-[#282329] text-white hover:bg-[#8e3864]'
                          }`}
                        >
                          {pp.detail}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredIndices.length === 0 && (
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-10 rounded-[2rem] border py-16 text-center ${
                isDark ? 'border-white/8 bg-white/[0.035]' : 'border-white bg-white/65'
              }`}
            >
              <SearchX
                className={`mx-auto h-9 w-9 ${isDark ? 'text-white/30' : 'text-[#74636e]'}`}
              />
              <p className={`mt-4 text-sm font-medium ${bodyColor}`}>
                No projects match the selected tags.
              </p>
              <button
                type="button"
                onClick={() => setActiveTags([])}
                className={`mt-5 rounded-full border px-4 py-2 text-xs font-bold ${
                  isDark
                    ? 'border-white/10 bg-white/5 text-white/70'
                    : 'border-[#ded2d7] bg-white/70 text-[#594d55]'
                }`}
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}
