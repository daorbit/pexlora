import { compressTargetIconSrc, compressTargetPath, defaultCompressTarget } from "@/config/compress-targets";
import { toolPageCopy } from "@/content/tool-pages";
import { conversionIconSrc, conversionPath, popularConversions, type Conversion } from "@/config/conversions";
import { textToolIconSrc, textTools } from "@/config/text-tools";
import { toolIconSrc, workspaceTools, type ToolCategory } from "@/config/tools";

export type HubCategory = ToolCategory | "convert";

export type HubItem = {
  key: string;
  name: string;
  description: string;
  href: string;
  iconSrc: string;
  category: HubCategory;
};

export const hubCategories: { id: HubCategory | "all"; label: string }[] = [
  { id: "all", label: "All Tools" },
  { id: "metadata", label: "Metadata" },
  { id: "image", label: "Edit Images" },
  { id: "ai", label: "AI Tools" },
  { id: "convert", label: "Convert" },
];

const textToolItems: HubItem[] = textTools.map((tool) => ({
  key: tool.slug,
  name: tool.name,
  description: tool.description,
  href: tool.href,
  iconSrc: textToolIconSrc(tool.slug),
  category: "ai",
}));

const compressTargetItem: HubItem = {
  key: "compress-to-size",
  name: toolPageCopy.compressTargetHub.name,
  description: toolPageCopy.compressTargetHub.description,
  href: compressTargetPath(defaultCompressTarget.slug),
  iconSrc: compressTargetIconSrc,
  category: "image",
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
    };
    return tool.slug === "compress-image" ? [item, compressTargetItem] : [item];
  }),
  ...textToolItems,
];

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

export const hubItems: HubItem[] = [...toolItems, ...popularConversions.map(conversionItem)];

export function hubItemsIn(category: HubCategory) {
  return hubItems.filter((item) => item.category === category);
}

export function otherTools(current: string) {
  return toolItems.filter((item) => item.key !== current);
}

export const menuGroups = hubCategories
  .filter((category): category is { id: HubCategory; label: string } => category.id !== "all")
  .map((category) => ({ ...category, items: hubItemsIn(category.id) }));
