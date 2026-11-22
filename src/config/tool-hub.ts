import { compressTargetIconSrc, compressTargetPath, defaultCompressTarget } from "@/config/compress-targets";
import { toolPageCopy } from "@/content/tool-pages";
import { conversionIconSrc, conversionPath, popularConversions, type Conversion } from "@/config/conversions";
import { imagePdfPath, imagePdfVariants } from "@/config/image-pdf-variants";
import { textToolIconSrc, textTools } from "@/config/text-tools";
import { toolIconSrc, workspaceTools, type ToolCategory } from "@/config/tools";
import { utilityToolIconSrc, utilityTools } from "@/config/utility-tools";

export type HubCategory = ToolCategory;

export type HubItem = {
  key: string;
  name: string;
  description: string;
  href: string;
  iconSrc: string;
  category: HubCategory;
  shortName?: string;
};

export const hubCategories: { id: HubCategory | "all"; label: string }[] = [
  { id: "all", label: "All Tools" },
  { id: "metadata", label: "Metadata" },
  { id: "image", label: "Edit Images" },
  { id: "pdf", label: "PDF" },
  { id: "ai", label: "AI Tools" },
  { id: "utility", label: "Utilities" },
  { id: "convert", label: "Convert" },
];

const utilityItems: HubItem[] = utilityTools.map((tool) => ({
  key: tool.slug,
  name: tool.name,
  description: tool.description,
  href: tool.href,
  iconSrc: utilityToolIconSrc(tool.slug),
  category: "utility",
  shortName: tool.shortName,
}));

const textToolItems: HubItem[] = textTools.map((tool) => ({
  key: tool.slug,
  name: tool.name,
  description: tool.description,
  href: tool.href,
  iconSrc: textToolIconSrc(tool.slug),
  category: "ai",
  shortName: tool.shortName,
}));

export const compressTargetHubKey = "compress-to-size";

const compressTargetItem: HubItem = {
  key: compressTargetHubKey,
  name: toolPageCopy.compressTargetHub.name,
  description: toolPageCopy.compressTargetHub.description,
  href: compressTargetPath(defaultCompressTarget.slug),
  iconSrc: compressTargetIconSrc,
  category: "image",
  shortName: toolPageCopy.compressTargetHub.name,
};

const toolItems: HubItem[] = [
  ...workspaceTools.flatMap((tool) => {
    const item: HubItem = {
      key: tool.slug,
      name: tool.name,
      description: tool.description,
      href: tool.href,
      iconSrc: toolIconSrc(tool.slug),
      category: tool.category,
      shortName: tool.shortName,
    };
    return tool.slug === "compress-image" ? [item, compressTargetItem] : [item];
  }),
  ...textToolItems,
  ...utilityItems,
];

export const freeToolCount = `${Math.floor((workspaceTools.length + textTools.length + utilityTools.length) / 5) * 5}+`;

const heroShortcutKeys =["remove-metadata", "compress-to-size", "resize-image", "convert-format", "image-alt-text"];

export const heroShortcuts = heroShortcutKeys.flatMap((key) => toolItems.filter((item) => item.key === key));

export function conversionItem(conversion: Conversion): HubItem {
  return {
    key: conversion.slug,
    name: conversion.name,
    description: conversion.description,
    href: conversionPath(conversion.slug),
    iconSrc: conversionIconSrc(conversion.slug),
    category: "convert",
  };
}

const imagePdfItems: HubItem[] = imagePdfVariants.map((variant) => ({
  key: variant.slug,
  name: toolPageCopy.imagePdfName(variant.from),
  description: toolPageCopy.imagePdfDescription(variant.from),
  href: imagePdfPath(variant.slug),
  iconSrc: toolIconSrc("jpg-to-pdf"),
  category: "convert",
}));

export const hubItems: HubItem[] = [...toolItems, ...imagePdfItems, ...popularConversions.map(conversionItem)];

export function hubItemsIn(category: HubCategory) {
  return hubItems.filter((item) => item.category === category);
}

export function toolItem(key: string) {
  return toolItems.find((item) => item.key === key);
}

export function otherTools(current: string) {
  return toolItems.filter((item) => item.key !== current);
}

const MENU_ITEMS_PER_GROUP = 5;

const menuPicks: Partial<Record<HubCategory, string[]>> = {
  image: ["compress-image", "compress-to-size", "resize-image", "crop-image", "form-photo"],
  pdf: ["merge-pdf", "split-pdf", "organize-pdf", "jpg-to-pdf", "pdf-to-jpg"],
  convert: ["pdf-to-word", "word-to-pdf", "pdf-to-excel", "excel-to-pdf", "csv-to-excel"],
};

function menuItemsFor(category: HubCategory) {
  const all = hubItemsIn(category);
  const picks = menuPicks[category];
  const chosen = picks ? picks.flatMap((key) => all.filter((item) => item.key === key)) : all;
  return chosen.slice(0, MENU_ITEMS_PER_GROUP);
}

export const allToolsHref = (category?: HubCategory) => (category ? `/?tools=${category}#all-tools` : "/#all-tools");

export const menuGroups = hubCategories
  .filter((category): category is { id: HubCategory; label: string } => category.id !== "all")
  .map((category) => {
    const items = menuItemsFor(category.id);
    return { ...category, items, more: hubItemsIn(category.id).length - items.length };
  });
