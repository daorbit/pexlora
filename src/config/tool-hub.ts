import { conversionIconSrc, conversionPath, popularConversions, type Conversion } from "@/config/conversions";
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
  { id: "convert", label: "Convert" },
];

const toolItems: HubItem[] = workspaceTools.map((tool) => ({
  key: tool.slug,
  name: tool.name,
  description: tool.description,
  href: tool.href,
  iconSrc: toolIconSrc(tool.slug),
  category: tool.category,
}));

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
