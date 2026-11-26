import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { dictionary, locales, origin, type Locale } from '@/lib/site';
import { LanguageProvider } from '@/components/i18n/LanguageContext';
import { ThemeProvider } from '@/components/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';
import '../globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: 'Reimii Studios', template: '%s | Reimii Studios' },
  icons: { icon: '/images/logo-bundle.png' },
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;
export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  dictionary(locale);
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Reimii Studios',
              url: origin,
              logo: origin + '/images/logo.png',
              sameAs: ['https://www.instagram.com/reimii.studios/'],
            }),
          }}
        />
        <LanguageProvider locale={locale as Locale}>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
