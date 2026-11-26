import Screen from '@/screens/Nosotros';
import { dictionary, metadata } from '@/lib/site';
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = dictionary(locale).aboutPage;
  return metadata(locale, '/nosotros', t.title, t.description);
}
export default function Page() {
  return <Screen />;
}
