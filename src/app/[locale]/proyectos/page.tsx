import Screen from '@/screens/Proyectos';
import { dictionary, metadata, pageUrl, type Locale } from '@/lib/site';
import { seoCopy } from '@/lib/seo-copy';
import JsonLd from '@/components/JsonLd';
import { PROJECT_SLUGS } from '@/components/projects/projectsData';
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  dictionary(locale);
  const seo = seoCopy(locale as Locale);
  return metadata(locale, '/proyectos', seo.catalog, seo.description);
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  const t = dictionary(locale);
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: t.nav.projects,
          itemListElement: t.projects.map((p, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: p.name,
            url: pageUrl(locale, '/proyectos/' + PROJECT_SLUGS[index]),
          })),
        }}
      />
      <Screen />
    </>
  );
}
