import Screen from '@/screens/ProjectDetail';
import { project, metadata, origin, pageUrl, dictionary, type Locale } from '@/lib/site';
import { seoCopy } from '@/lib/seo-copy';
import JsonLd from '@/components/JsonLd';
import { PROJECT_SLUGS, PROJECT_SCREENSHOTS } from '@/components/projects/projectsData';
type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const p = project(locale, slug);
  return metadata(
    locale,
    '/proyectos/' + slug,
    p.name + ' — ' + seoCopy(locale as Locale).projectTitles[p.index],
    p.description,
    p.image,
  );
}
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const p = project(locale, slug);
  const t = dictionary(locale);
  const url = pageUrl(locale, '/proyectos/' + slug);
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              '@id': url + '#app',
              name: p.name,
              description: p.description,
              image: origin + p.image,
              url,
              inLanguage: locale,
              operatingSystem: 'Android',
              applicationCategory:
                slug === 'asteria-rol'
                  ? 'EntertainmentApplication'
                  : slug === 'velora-print'
                    ? 'UtilitiesApplication'
                    : slug === 'habit-tracker'
                      ? 'LifestyleApplication'
                      : 'HealthApplication',
              featureList: p.features,
              screenshot: PROJECT_SCREENSHOTS[p.index].map((src) => origin + src),
              publisher: { '@id': origin + '/#organization' },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: t.nav.home, item: pageUrl(locale) },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: t.nav.projects,
                  item: pageUrl(locale, '/proyectos'),
                },
                { '@type': 'ListItem', position: 3, name: p.name, item: url },
              ],
            },
          ],
        }}
      />
      <Screen key={slug} />
    </>
  );
}
