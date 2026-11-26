import { dictionary, metadata } from "@/lib/site";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = dictionary(locale).contactPage;
  return metadata(locale, "/contacto", t.title, t.description);
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  const t = dictionary(locale).contactPage;
  return (
    <section className="wrap section">
      <span className="eyebrow">{t.subtitle}</span>
      <h1>{t.title}</h1>
      <p className="intro">{t.description}</p>
      <div className="callout">
        <a className="button" href="mailto:shop@reimii.com">
          {t.email}: shop@reimii.com
        </a>
        <h2>{t.location}</h2>
        <p>{t.locationDesc}</p>
      </div>
    </section>
  );
}
