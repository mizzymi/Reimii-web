import { translations } from './translations';
import { PROJECT_SLUGS, PROJECT_IMAGES } from '@/components/projects/projectsData';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const origin = 'https://www.reimii.com';
export const locales = Object.keys(translations) as (keyof typeof translations)[];
export type Locale = keyof typeof translations;
export function dictionary(locale: string) {
  if (!locales.includes(locale as Locale)) notFound();
  return translations[locale as Locale];
}
export const paths = [
  '',
  '/proyectos',
  '/nosotros',
  '/contacto',
  ...PROJECT_SLUGS.map((s) => '/proyectos/' + s),
];
export function pageUrl(locale: string, path = '') {
  return origin + '/' + locale + path;
}
export function alternateLanguages(path: string) {
  return { ...Object.fromEntries(locales.map(l => [l, pageUrl(l, path)])), 'x-default': pageUrl('es', path) };
}
const ogLocales: Record<Locale, string> = { es: 'es_ES', en: 'en_US', ca: 'ca_ES', fr: 'fr_FR', de: 'de_DE', pt: 'pt_BR', ru: 'ru_RU', ar: 'ar_SA', hi: 'hi_IN', ja: 'ja_JP', ko: 'ko_KR', zh: 'zh_CN' };
export function metadata(
  locale: string,
  path: string,
  title: string,
  description: string,
  image = '/images/logo.png',
): Metadata {
  const url = pageUrl(locale, path);
  const socialTitle = title + ' | Reimii Studios';
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: alternateLanguages(path),
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: {
      title: socialTitle,
      locale: ogLocales[locale as Locale],
      alternateLocale: locales.filter(l => l !== locale).map(l => ogLocales[l]),
      description,
      url,
      siteName: 'Reimii Studios',
      type: 'website',
      images: [{ url: image, alt: title }],
    },
    twitter: { card: 'summary_large_image', title: socialTitle, description, images: [{ url: image, alt: title }] },
  };
}
export function project(locale: string, slug: string) {
  const i = PROJECT_SLUGS.indexOf(slug);
  if (i < 0) notFound();
  return { ...dictionary(locale).projects[i], image: PROJECT_IMAGES[i], index: i };
}
