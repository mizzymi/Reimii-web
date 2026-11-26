import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { dictionary, locales, origin, logo } from "@/lib/site";
import { Controls } from "@/components/controls";
import "../globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: "Reimii Studios", template: "%s | Reimii Studios" },
  icons: { icon: logo },
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
  const t = dictionary(locale);
  const links = [
    ["", t.nav.home],
    ["/proyectos", t.nav.projects],
    ["/nosotros", t.nav.about],
    ["/contacto", t.nav.contact],
  ];
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Reimii Studios",
              url: origin,
              logo,
              sameAs: ["https://www.instagram.com/reimii.studios/"],
            }),
          }}
        />
        <OriginalProvider locale={locale as Locale}><Navbar/><main>{children}</main><Footer/></OriginalProvider>
      </body>
    </html>
  );
}
