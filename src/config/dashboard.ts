import { History, LayoutGrid, Settings } from "lucide-react";
import type { IconComponent } from "@/components/icons/types";
import { routes } from "@/config/site";
import { textToolIconSrc, textTools } from "@/config/text-tools";
import { utilityToolIconSrc, utilityTools } from "@/config/utility-tools";
import type { HubItem } from "@/config/tool-hub";
import {
  toolCategories,
  toolIconSrc,
  toolsInCategory,
  type ToolCategory,
  type WorkspaceToolSlug,
} from "@/config/tools";

export type DashboardNavItem = {
  label: string;
  description: string;
  subtitle: string;
  icon: IconComponent;
  iconSrc?: string;
  href: string;
  group?: string;
};

export type DashboardNavSection = {
  title?: string;
  items: DashboardNavItem[];
};

const dashboardHrefs: Record<WorkspaceToolSlug, string> = {
  "remove-metadata": routes.dashboardCleaner,
  "view-metadata": routes.dashboardInspector,
  "edit-metadata": routes.dashboardEditor,
  "compress-image": routes.dashboardCompressor,
  "resize-image": routes.dashboardResizer,
  "convert-format": routes.dashboardConverter,
  "image-alt-text": routes.dashboardAltText,
  "heic-to-jpg": routes.dashboardHeicToJpg,
  "form-photo": routes.dashboardFormPhoto,
  "merge-pdf": routes.dashboardMergePdf,
  "split-pdf": routes.dashboardSplitPdf,
  "rotate-pdf": routes.dashboardRotatePdf,
  "compress-pdf": routes.dashboardCompressPdf,
  "sign-pdf": routes.dashboardSignPdf,
  "jpg-to-pdf": routes.dashboardJpgToPdf,
  "pdf-to-jpg": routes.dashboardPdfToJpg,
  "svg-to-image": routes.dashboardSvgToImage,
  "image-to-svg": routes.dashboardImageToSvg,
  "crop-image": routes.dashboardCropImage,
  "change-dpi": routes.dashboardChangeDpi,
  "rotate-image": routes.dashboardRotateImage,
  "image-watermark": routes.dashboardWatermarkImage,
  "photo-signature": routes.dashboardPhotoSignature,
  "shape-image": routes.dashboardShapeImage,
  "image-palette": routes.dashboardPalette,
  "passport-photo": routes.dashboardPassportPhoto,
  "organize-pdf": routes.dashboardOrganizePdf,
  "pdf-page-numbers": routes.dashboardPdfPageNumbers,
  "pdf-watermark": routes.dashboardPdfWatermark,
  "excel-to-pdf": routes.dashboardExcelToPdf,
  "pdf-to-excel": routes.dashboardPdfToExcel,
  "word-to-pdf": routes.dashboardWordToPdf,
  "pdf-to-word": routes.dashboardPdfToWord,
  "pdf-to-text": routes.dashboardPdfToText,
  "csv-to-excel": routes.dashboardCsvToExcel,
  "excel-to-csv": routes.dashboardExcelToCsv,
};

export const dashboardToolHref = (slug: WorkspaceToolSlug) => dashboardHrefs[slug];

const toolCategoryOrder: ToolCategory[] = ["metadata", "image", "pdf", "convert", "ai", "utility"];

type DashboardTool = {
  slug: string;
  shortName: string;
  name: string;
  headline: string;
  description: string;
  icon: IconComponent;
  iconSrc: string;
  href: string;
};

function dashboardTools(category: ToolCategory): DashboardTool[] {
  const tools = toolsInCategory(category).map((tool) => ({
    ...tool,
    iconSrc: toolIconSrc(tool.slug),
    href: dashboardHrefs[tool.slug],
  }));
  if (category === "utility") {
    return utilityTools.map((tool) => ({ ...tool, iconSrc: utilityToolIconSrc(tool.slug), href: tool.dashboardHref }));
  }
  if (category !== "ai") return tools;

  return [
    ...tools,
    ...textTools.map((tool) => ({ ...tool, iconSrc: textToolIconSrc(tool.slug), href: tool.dashboardHref })),
  ];
}

function toolSection(category: ToolCategory): DashboardNavSection {
  return {
    title: toolCategories[category],
    items: dashboardTools(category).map((tool) => ({
      label: tool.shortName,
      description: tool.name,
      subtitle: tool.headline,
      icon: tool.icon,
      iconSrc: tool.iconSrc,
      href: tool.href,
      group: toolCategories[category],
    })),
  };
}

export const dashboardToolGroups = toolCategoryOrder.map((category) => ({
  category,
  title: toolCategories[category],
  items: dashboardTools(category).map(
    (tool): HubItem => ({
      key: tool.slug,
      name: tool.name,
      description: tool.description,
      href: tool.href,
      iconSrc: tool.iconSrc,
      category,
    }),
  ),
}));

export const OVERVIEW_RECENT_FILES = 4;

export const overviewPopularTools: WorkspaceToolSlug[] = ["remove-metadata", "compress-image", "convert-format"];

export const overviewNavItem: DashboardNavItem = {
  label: "Overview",
  description: "Overview",
  subtitle: "Your usage and tools at a glance",
  icon: LayoutGrid,
  href: routes.dashboard,
};

export const historyNavItem: DashboardNavItem = {
  label: "History",
  description: "History",
  subtitle: "Files you cleaned or converted on this device in the last 24 hours",
  icon: History,
  href: routes.dashboardHistory,
};

export const settingsNavItem: DashboardNavItem = {
  label: "Settings",
  description: "Settings",
  subtitle: "Manage your profile, plan and preferences",
  icon: Settings,
  href: routes.dashboardSettings,
};

export const dashboardNav: DashboardNavSection[] = [
  { items: [overviewNavItem, historyNavItem] },
  ...toolCategoryOrder.map(toolSection),
];

export type DashboardSectionId = "general" | ToolCategory;

export type DashboardSection = {
  id: DashboardSectionId;
  title: string;
  icon: IconComponent;
  iconSrc?: string;
  items: DashboardNavItem[];
};

const categoryIconSrc: Record<ToolCategory, string> = {
  metadata: toolIconSrc("remove-metadata"),
  image: toolIconSrc("compress-image"),
  pdf: toolIconSrc("merge-pdf"),
  convert: toolIconSrc("word-to-pdf"),
  ai: toolIconSrc("image-alt-text"),
  utility: utilityToolIconSrc("zip-files"),
};

export const dashboardSections: DashboardSection[] = [
  { id: "general", title: "Home", icon: LayoutGrid, items: [overviewNavItem, historyNavItem, settingsNavItem] },
  ...toolCategoryOrder.map((category) => ({
    id: category,
    title: toolCategories[category],
    icon: LayoutGrid,
    iconSrc: categoryIconSrc[category],
    items: toolSection(category).items,
  })),
];

export function sectionIdForPath(pathname: string): DashboardSectionId {
  const match = dashboardSections.find((section) => section.items.some((item) => isNavItemActive(item, pathname)));
  return match?.id ?? "general";
}

export const dashboardSearchItems: DashboardNavItem[] = [
  ...dashboardNav.flatMap((section) => section.items),
  settingsNavItem,
];

export function isNavItemActive(item: DashboardNavItem, pathname: string) {
  if (item.href === routes.dashboard) return pathname === routes.dashboard;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

const toolNavItems = toolCategoryOrder.flatMap((category) => toolSection(category).items);

export function isToolRoute(pathname: string) {
  return toolNavItems.some((item) => isNavItemActive(item, pathname));
}

export function findActiveNavItem(pathname: string) {
  return dashboardSearchItems.find((item) => isNavItemActive(item, pathname)) ?? overviewNavItem;
}
