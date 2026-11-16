import type { MetadataRoute } from "next";
import { compressTargetPath, compressTargets } from "@/config/compress-targets";
import { conversionPath, conversions } from "@/config/conversions";
import { routes } from "@/config/site";
import { textTools } from "@/config/text-tools";
import { workspaceTools } from "@/config/tools";
import { legalDocuments } from "@/content/legal";
import { seoPagePath, seoPages } from "@/content/seo-pages";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.appUrl;
  const lastModified = new Date("2026-11-16");

  return [
    { url: `${base}${routes.home}`, lastModified, changeFrequency: "weekly", priority: 1 },
    ...[
      ...workspaceTools.map((tool) => tool.href),
      ...textTools.map((tool) => tool.href),
      ...seoPages.map(seoPagePath),
      ...conversions.map((conversion) => conversionPath(conversion.slug)),
      ...compressTargets.map((target) => compressTargetPath(target.slug)),
    ].map((path) => ({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}${routes.contact}`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    ...legalDocuments.map((doc) => ({
      url: `${base}${doc.path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
