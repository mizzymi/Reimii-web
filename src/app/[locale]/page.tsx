import Screen from '@/screens/Home';
import { dictionary, metadata, type Locale } from '@/lib/site';
import { seoCopy } from '@/lib/seo-copy';
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  dictionary(locale);
  const seo = seoCopy(locale as Locale);
  return metadata(locale, '', seo.homeTitle, seo.description);
}
export default function Page() {
  return (
    <main>
      <Screen />
    </main>
  );
}
