import { History, LayoutGrid, Settings, ShieldCheck } from "lucide-react";
import type { IconComponent } from "@/components/icons/types";
import { routes } from "@/config/site";
import { adminCopy } from "@/content/admin";
import { textToolIconSrc, textTools } from "@/config/text-tools";
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
  isNew?: boolean;
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
  "jpg-to-pdf": routes.dashboardJpgToPdf,
  "pdf-to-jpg": routes.dashboardPdfToJpg,
};

export const dashboardToolHref = (slug: WorkspaceToolSlug) => dashboardHrefs[slug];

const newToolSlugs: string[] = ["compress-image"];

const toolCategoryOrder: ToolCategory[] = ["metadata", "image", "pdf", "ai"];

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
      isNew: newToolSlugs.includes(tool.slug),
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

export const adminNavItem: DashboardNavItem = {
  ...adminCopy.nav,
  icon: ShieldCheck,
  href: routes.dashboardAdmin,
};

export const dashboardNav: DashboardNavSection[] = [
  { items: [overviewNavItem, historyNavItem] },
  ...toolCategoryOrder.map(toolSection),
];

export const dashboardSearchItems: DashboardNavItem[] = [
  ...dashboardNav.flatMap((section) => section.items),
  settingsNavItem,
];

export function isNavItemActive(item: DashboardNavItem, pathname: string) {
  if (item.href === routes.dashboard) return pathname === routes.dashboard;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function findActiveNavItem(pathname: string) {
  return [...dashboardSearchItems, adminNavItem].find((item) => isNavItemActive(item, pathname)) ?? overviewNavItem;
}
