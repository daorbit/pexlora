import { compressTargetIconSrc, compressTargets } from "@/config/compress-targets";
import { routes } from "@/config/site";
import { toolIconSrc } from "@/config/tools";
import { overviewCopy } from "@/content/dashboard";
import { seoCategories, seoPageIconSrc, seoPagePath, seoPagesIn } from "@/content/seo-pages";
import { FORMAT_EXTENSIONS, FORMAT_LABELS, OUTPUT_FORMATS } from "@/lib/image/formats";

export type QuickLink = { key: string; label: string; href: string; iconSrc: string };
export type QuickLinkGroup = { id: string; title: string; links: QuickLink[] };

const compressLinks: QuickLink[] = compressTargets.map((target) => ({
  key: `compress-${target.slug}`,
  label: overviewCopy.compressTo(target.label),
  href: `${routes.dashboardCompressor}?target=${target.kb}`,
  iconSrc: compressTargetIconSrc,
}));

const convertLinks: QuickLink[] = OUTPUT_FORMATS.map((format) => ({
  key: `convert-${format}`,
  label: overviewCopy.convertTo(FORMAT_LABELS[format]),
  href: `${routes.dashboardConverter}?format=${FORMAT_EXTENSIONS[format]}`,
  iconSrc: toolIconSrc("convert-format"),
}));

const guideGroups: QuickLinkGroup[] = seoCategories.map((category) => ({
  id: `guides-${category.id}`,
  title: category.title,
  links: seoPagesIn(category.id).map((page) => ({
    key: page.slug,
    label: page.name,
    href: seoPagePath(page),
    iconSrc: seoPageIconSrc(page),
  })),
}));

export const dashboardQuickLinks: QuickLinkGroup[] = [
  { id: "compress", title: overviewCopy.compressTitle, links: compressLinks },
  { id: "convert", title: overviewCopy.convertTitle, links: convertLinks },
  ...guideGroups,
];
