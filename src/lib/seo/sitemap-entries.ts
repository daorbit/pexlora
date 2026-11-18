import "server-only";
import { compressTargetPath, compressTargets } from "@/config/compress-targets";
import { conversionPath, conversions } from "@/config/conversions";
import { formPresetPath, formPresets } from "@/config/form-presets";
import { routes } from "@/config/site";
import { textTools } from "@/config/text-tools";
import { workspaceTools } from "@/config/tools";
import { legalDocuments } from "@/content/legal";
import { seoPagePath, seoPages } from "@/content/seo-pages";

export type SitemapEntry = { path: string; sources: string[] };

const marketingPage = (path: string) => `src/app/(marketing)${path}/page.tsx`;

const shared = {
  toolPage: ["src/content/tool-guides.ts", "src/config/tools.ts", "src/components/tools/ToolPage.tsx"],
  textToolPage: ["src/config/text-tools.ts", "src/content/ai.ts", "src/components/text-tools/TextToolPage.tsx"],
  guidePage: ["src/content/seo-pages/shared.ts", "src/content/seo-pages/enrich.ts", "src/components/tools/SeoToolPage.tsx"],
  variantPage: ["src/content/variant-guides.ts", "src/content/tool-pages.ts"],
};

export function sitemapEntries(): SitemapEntry[] {
  return [
    {
      path: routes.home,
      sources: [marketingPage(""), "src/content/landing.ts", "src/components/landing", "src/components/home", "src/config/tool-hub.ts"],
    },
    ...workspaceTools.map((tool) => ({ path: tool.href, sources: [marketingPage(tool.href), ...shared.toolPage] })),
    ...textTools.map((tool) => ({ path: tool.href, sources: [marketingPage(tool.href), ...shared.textToolPage] })),
    ...seoPages.map((page) => ({
      path: seoPagePath(page),
      sources: [`src/content/seo-pages/${page.category}.ts`, ...shared.guidePage],
    })),
    ...conversions.map((conversion) => ({
      path: conversionPath(conversion.slug),
      sources: ["src/config/conversions.ts", "src/components/tools/ConversionPage.tsx", ...shared.variantPage],
    })),
    ...compressTargets.map((target) => ({
      path: compressTargetPath(target.slug),
      sources: ["src/config/compress-targets.ts", "src/components/tools/CompressTargetPage.tsx", ...shared.variantPage],
    })),
    ...formPresets.map((preset) => ({
      path: formPresetPath(preset.slug),
      sources: ["src/config/form-presets.ts", "src/components/tools/FormPresetPage.tsx", ...shared.variantPage],
    })),
    { path: routes.contact, sources: [marketingPage(routes.contact), "src/content/contact.ts"] },
    { path: routes.blog, sources: [marketingPage(routes.blog), "src/content/blog.ts", "src/components/blog"] },
    { path: routes.pricing, sources: [marketingPage(routes.pricing), "src/content/pricing.ts", "src/config/plans.ts", "src/components/pricing"] },
    ...legalDocuments.map((doc) => ({
      path: doc.path,
      sources: [`src/content/legal${doc.path}.ts`, "src/content/legal/types.ts"],
    })),
  ];
}
