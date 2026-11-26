import type { MetadataRoute } from "next";
import { origin, locales, paths } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: origin + "/" + locale + path,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, origin + "/" + l + path]),
        ),
      },
    })),
  );
}
