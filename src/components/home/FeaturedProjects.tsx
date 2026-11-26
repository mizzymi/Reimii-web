'use client';
import React from 'react';
import { Link, useNavigate } from '@/lib/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../ThemeContext';
import { PROJECT_IMAGES, APP_RATINGS, PROJECT_SLUGS } from '../projects/projectsData';

export default function FeaturedProjects() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const fp = t.featuredProjects;
  const pp = t.projectsPage;
  const projects = t.projects.slice(0, 3);

  const sectionBg = isDark ? 'bg-[#151218]' : 'bg-[#f7f1e9]';
  const titleColor = isDark ? 'text-white' : 'text-[#272229]';

  return (
    <section
      className={`relative overflow-hidden py-24 transition-colors duration-500 lg:py-32 ${sectionBg}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full blur-3xl ${
          isDark ? 'bg-fuchsia-500/10' : 'bg-[#efbdd4]/35'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-28 bottom-10 h-80 w-80 rounded-full blur-3xl ${
          isDark ? 'bg-violet-500/10' : 'bg-[#d9c6f2]/40'
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              className={`mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
                isDark
                  ? 'border-[#f2b7d4]/20 bg-[#f2b7d4]/10 text-[#f2b7d4]'
                  : 'border-[#e7a8c7]/45 bg-[#fceaf3] text-[#86345e]'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {fp.subtitle}
            </motion.div>

            <motion.h2
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.08 }}
              className={`max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl ${titleColor}`}
            >
              {fp.title}
            </motion.h2>
          </div>

          <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }} className="hidden sm:block">
            <Link
              to="/Proyectos"
              className={`group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition-colors ${
                isDark
                  ? 'border-white/10 bg-white/5 text-white hover:border-[#f2b7d4]/30 hover:text-[#f2b7d4]'
                  : 'border-[#ded2d7] bg-white/65 text-[#4f464c] hover:border-[#d8a9c0] hover:text-[#8e3864]'
              }`}
            >
              {fp.viewAll}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: i * 0.1,
                type: 'spring',
                stiffness: 85,
              }}
              whileHover={{ y: -7 }}
              className="h-full"
            >
              <div
                className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border transition-all duration-500 ${
                  isDark
                    ? 'border-white/8 bg-white/[0.045] hover:border-[#f2b7d4]/25'
                    : 'border-white bg-white/75 shadow-[0_22px_60px_rgba(83,61,72,0.08)] hover:shadow-[0_28px_75px_rgba(83,61,72,0.13)]'
                }`}
              >
                <div className="relative m-3 overflow-hidden rounded-[1.45rem]">
                  <div className="aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={PROJECT_IMAGES[i]}
                      alt={project.name}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.055 }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                  <div className="absolute left-4 top-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-bold backdrop-blur-md ${project.statusColor}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {APP_RATINGS[i] != null && (
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-3 py-1.5 backdrop-blur-md">
                    <Star className="h-3.5 w-3.5 fill-current text-amber-300" />
                    <span className="text-xs font-bold text-white">{APP_RATINGS[i]}</span>
                  </div>
                  )}

                  <div className="absolute bottom-4 left-4">
                    <p className="project-category-overlay text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                      {project.category}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-3">
                  <h3 className={`text-2xl font-black tracking-[-0.035em] ${titleColor}`}>
                    {project.name}
                  </h3>

                  <p className="project-description mt-3 flex-1 text-sm leading-6">
                    {project.description}
                  </p>

                  <motion.button
                    type="button"
                    onClick={() => navigate(`/Proyectos/${PROJECT_SLUGS[i]}`)}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold transition-colors ${
                      isDark
                        ? 'bg-[#f2b7d4] text-[#261d24] hover:bg-[#fac8df]'
                        : 'bg-[#282329] text-white hover:bg-[#8e3864]'
                    }`}
                  >
                    {pp.detail}
                    <ExternalLink className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-9 text-center sm:hidden">
          <Link
            to="/Proyectos"
            className={`group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition-colors ${
              isDark
                ? 'border-white/10 bg-white/5 text-white hover:border-[#f2b7d4]/30 hover:text-[#f2b7d4]'
                : 'border-[#ded2d7] bg-white/65 text-[#4f464c] hover:border-[#d8a9c0] hover:text-[#8e3864]'
            }`}
          >
            {fp.viewAllMobile}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
