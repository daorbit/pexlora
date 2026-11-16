import { aiPages } from "@/content/seo-pages/ai";
import { enrichSeoPage } from "@/content/seo-pages/enrich";
import { formatPages } from "@/content/seo-pages/formats";
import { privacyPages } from "@/content/seo-pages/privacy";
import type { SeoCategory, SeoPage } from "@/content/seo-pages/types";
import { viewerPages } from "@/content/seo-pages/viewers";

export type { SeoCategory, SeoPage } from "@/content/seo-pages/types";

export const seoPages: SeoPage[] = [...aiPages, ...privacyPages, ...viewerPages, ...formatPages].map(enrichSeoPage);

export const seoCategories: { id: SeoCategory; title: string }[] = [
  { id: "ai", title: "AI cleaners" },
  { id: "privacy", title: "Privacy" },
  { id: "formats", title: "File types" },
  { id: "viewers", title: "Viewers" },
];

export const seoPagePath = (page: SeoPage) => `/${page.slug}`;

export const seoPageIconSrc = (page: SeoPage) => `/icons/guides/${page.slug}.svg`;

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}

export function seoPagesIn(category: SeoCategory) {
  return seoPages.filter((page) => page.category === category);
}

export function relatedSeoPages(page: SeoPage) {
  return page.related.flatMap((slug) => {
    const related = getSeoPage(slug);
    return related ? [related] : [];
  });
}
