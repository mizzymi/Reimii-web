import Screen from '@/screens/Contacto';
import { dictionary, metadata, type Locale } from '@/lib/site';
import { seoCopy } from '@/lib/seo-copy';
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = dictionary(locale).contactPage;
  return metadata(locale, '/contacto', seoCopy(locale as Locale).contact, t.description);
}
export default function Page() {
  return <Screen />;
}
