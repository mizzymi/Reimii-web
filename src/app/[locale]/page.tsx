import Screen from '@/screens/Home';
import { dictionary, metadata } from '@/lib/site';
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = dictionary(locale).hero;
  return metadata(locale, '', t.badge, t.subtitle);
}
export default function Page() {
  return <Screen />;
}
