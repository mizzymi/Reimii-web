import type { MetadataRoute } from 'next';
import { locales, paths, pageUrl, alternateLanguages, origin } from '@/lib/site';
import { PROJECT_SLUGS, PROJECT_IMAGES, PROJECT_SCREENSHOTS } from '@/components/projects/projectsData';
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap(locale => paths.map(path => {
    const index = PROJECT_SLUGS.findIndex(slug => path === '/proyectos/' + slug);
    return { url: pageUrl(locale, path), alternates: { languages: alternateLanguages(path) }, ...(index >= 0 ? { images: [...new Set([PROJECT_IMAGES[index], ...PROJECT_SCREENSHOTS[index]])].map(src => origin + src) } : {}) };
  }));
}
