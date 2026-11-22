import "server-only";
import { compressTargetIconSrc, compressTargets } from "@/config/compress-targets";
import { conversionIconSrc, conversions } from "@/config/conversions";
import { formPresetIconSrc, formPresets } from "@/config/form-presets";
import { imagePdfVariants } from "@/config/image-pdf-variants";
import { textToolIconSrc, textTools } from "@/config/text-tools";
import { toolIconSrc, workspaceTools } from "@/config/tools";
import { utilityToolIconSrc, utilityTools } from "@/config/utility-tools";
import { seoPageIconSrc, seoPages } from "@/content/seo-pages";
import { formPresetCopy, toolPageCopy } from "@/content/tool-pages";
import type { OgKind } from "@/lib/seo/og-path";

export type OgCard = { name: string; description: string; iconSrc: string };

function index<T>(items: T[], slug: (item: T) => string, card: (item: T) => OgCard) {
  return new Map(items.map((item) => [slug(item), card(item)]));
}

const ogCards: Record<OgKind, Map<string, OgCard>> = {
  tool: index(
    workspaceTools,
    (tool) => tool.slug,
    (tool) => ({ name: tool.name, description: tool.description, iconSrc: toolIconSrc(tool.slug) }),
  ),
  text: index(
    textTools,
    (tool) => tool.slug,
    (tool) => ({ name: tool.name, description: tool.description, iconSrc: textToolIconSrc(tool.slug) }),
  ),
  utility: index(
    utilityTools,
    (tool) => tool.slug,
    (tool) => ({ name: tool.name, description: tool.description, iconSrc: utilityToolIconSrc(tool.slug) }),
  ),
  convert: index(
    conversions,
    (conversion) => conversion.slug,
    (conversion) => ({ name: conversion.name, description: conversion.description, iconSrc: conversionIconSrc(conversion.slug) }),
  ),
  "image-pdf": index(
    imagePdfVariants,
    (variant) => variant.slug,
    (variant) => ({
      name: toolPageCopy.imagePdfName(variant.from),
      description: toolPageCopy.imagePdfDescription(variant.from),
      iconSrc: toolIconSrc("jpg-to-pdf"),
    }),
  ),
  "compress-to": index(
    compressTargets,
    (target) => target.slug,
    (target) => ({
      name: toolPageCopy.compressTargetName(target.label),
      description: toolPageCopy.compressTargetMetaDescription(target.label),
      iconSrc: compressTargetIconSrc,
    }),
  ),
  form: index(
    formPresets,
    (preset) => preset.slug,
    (preset) => ({ name: preset.name, description: formPresetCopy.metaDescription(preset), iconSrc: formPresetIconSrc }),
  ),
  guide: index(
    seoPages,
    (page) => page.slug,
    (page) => ({ name: page.name, description: page.description, iconSrc: seoPageIconSrc(page) }),
  ),
};

export function getOgCard(kind: string, slug: string) {
  return ogCards[kind as OgKind]?.get(slug) ?? null;
}

export function ogCardParams() {
  return (Object.keys(ogCards) as OgKind[]).flatMap((kind) => [...ogCards[kind].keys()].map((slug) => ({ kind, slug })));
}
