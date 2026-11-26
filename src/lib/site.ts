import { translations } from "./translations";
import { PROJECT_SLUGS, PROJECT_IMAGES } from "./projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
export const origin = "https://www.reimii.com";
export const locales = Object.keys(
  translations,
) as (keyof typeof translations)[];
export type Locale = keyof typeof translations;
export function dictionary(locale: string) {
  if (!locales.includes(locale as Locale)) notFound();
  return translations[locale as Locale];
}
export const paths = [
  "",
  "/proyectos",
  "/nosotros",
  "/contacto",
  ...PROJECT_SLUGS.map((s) => "/proyectos/" + s),
];
export function metadata(
  locale: string,
  path: string,
  title: string,
  description: string,
  image?: string,
): Metadata {
  const url = origin + "/" + locale + path;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, origin + "/" + l + path])),
        "x-default": origin + "/es" + path,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Reimii Studios",
      type: "website",
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
export function project(locale: string, slug: string) {
  const i = PROJECT_SLUGS.indexOf(slug);
  if (i < 0) notFound();
  return {
    ...dictionary(locale).projects[i],
    slug,
    image: PROJECT_IMAGES[i],
    index: i,
  };
}
export const logo =
  "https://raw.githubusercontent.com/Reimii-Studios/Reimii-website/master/public/images/logo.png";
