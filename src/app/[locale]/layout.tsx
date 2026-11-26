import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { dictionary, locales, origin, type Locale } from '@/lib/site';
import { LanguageProvider } from '@/components/i18n/LanguageContext';
import { ThemeProvider } from '@/components/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';
import '../globals.css';
import JsonLd from '@/components/JsonLd';
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: 'Reimii Studios', template: '%s | Reimii Studios' },
  icons: { icon: '/images/logo-bundle.png', apple: '/images/logo-bundle.png' },
  applicationName: 'Reimii Studios',
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
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
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': origin + '/#organization',
                name: 'Reimii Studios',
                url: origin,
                logo: origin + '/images/logo.png',
                email: 'shop@reimii.com',
                sameAs: ['https://www.instagram.com/reimii.studios/'],
              },
              {
                '@type': 'WebSite',
                '@id': origin + '/#website',
                name: 'Reimii Studios',
                url: origin,
                inLanguage: locales,
                publisher: { '@id': origin + '/#organization' },
              },
            ],
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
