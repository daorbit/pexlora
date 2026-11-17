import { compressTargetIconSrc, featuredCompressTargets } from "@/config/compress-targets";
import { routes } from "@/config/site";
import { toolIconSrc } from "@/config/tools";
import { overviewCopy } from "@/content/dashboard";
import { seoCategories, seoPageIconSrc, seoPagePath, seoPagesIn } from "@/content/seo-pages";
import { FORMAT_EXTENSIONS, FORMAT_LABELS, OUTPUT_FORMATS } from "@/lib/image/formats";

export type ShortcutLink = { key: string; value: string; href: string };
export type ShortcutGroup = {
  id: string;
  title: string;
  description: string;
  caption: string;
  iconSrc: string;
  links: ShortcutLink[];
};

export type GuideLink = { key: string; label: string; href: string; iconSrc: string };
export type GuideGroup = { id: string; title: string; links: GuideLink[] };

export const dashboardShortcutGroups: ShortcutGroup[] = [
  {
    id: "compress",
    ...overviewCopy.compress,
    iconSrc: compressTargetIconSrc,
    links: featuredCompressTargets.map((target) => ({
      key: target.slug,
      value: target.label,
      href: `${routes.dashboardCompressor}?target=${target.kb}`,
    })),
  },
  {
    id: "convert",
    ...overviewCopy.convert,
    iconSrc: toolIconSrc("convert-format"),
    links: OUTPUT_FORMATS.map((format) => ({
      key: format,
      value: FORMAT_LABELS[format],
      href: `${routes.dashboardConverter}?format=${FORMAT_EXTENSIONS[format]}`,
    })),
  },
];

export const dashboardGuideGroups: GuideGroup[] = seoCategories.map((category) => ({
  id: category.id,
  title: category.title,
  links: seoPagesIn(category.id).map((page) => ({
    key: page.slug,
    label: page.name,
    href: seoPagePath(page),
    iconSrc: seoPageIconSrc(page),
  })),
}));
