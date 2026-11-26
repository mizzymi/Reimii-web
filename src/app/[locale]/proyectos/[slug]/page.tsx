import Screen from '@/screens/ProjectDetail';
import { project, metadata, origin } from '@/lib/site';
import { PROJECT_SLUGS } from '@/components/projects/projectsData';
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
    p.name + ' — ' + p.category,
    p.description,
    p.image,
  );
}
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const p = project(locale, slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': p.type === 'game' ? 'VideoGame' : 'SoftwareApplication',
            name: p.name,
            description: p.description,
            image: origin + p.image,
            url: origin + '/' + locale + '/proyectos/' + slug,
          }).replace(/</g, '\\u003c'),
        }}
      />
      <Screen key={slug} />
    </>
  );
}
