import type { MetadataRoute } from "next";
import { conversionPath, conversions } from "@/config/conversions";
import { routes } from "@/config/site";
import { workspaceTools } from "@/config/tools";
import { seoPagePath, seoPages } from "@/content/seo-pages";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.appUrl;
  const lastModified = new Date("2026-11-15");

  return [
    { url: `${base}${routes.home}`, lastModified, changeFrequency: "weekly", priority: 1 },
    ...[
      ...workspaceTools.map((tool) => tool.href),
      ...seoPages.map(seoPagePath),
      ...conversions.map((conversion) => conversionPath(conversion.slug)),
    ].map((path) => ({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}${routes.contact}`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}${routes.signUp}`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}${routes.signIn}`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
