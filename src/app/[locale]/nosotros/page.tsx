import Screen from '@/screens/Nosotros';
import { dictionary, metadata, type Locale } from '@/lib/site';
import { seoCopy } from '@/lib/seo-copy';
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = dictionary(locale).aboutPage;
  return metadata(locale, '/nosotros', seoCopy(locale as Locale).about, t.description);
}
export default function Page() {
  return <Screen />;
}
