import { LayoutGrid, Settings } from "lucide-react";
import type { IconComponent } from "@/components/icons/types";
import { routes } from "@/config/site";
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
  icon: IconComponent;
  iconSrc?: string;
  href?: string;
  soon?: boolean;
};

export type DashboardNavSection = {
  title: string;
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
};


const toolCategoryOrder: ToolCategory[] = ["metadata", "image", "ai"];

type DashboardTool = {
  slug: string;
  shortName: string;
  name: string;
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
      icon: tool.icon,
      iconSrc: tool.iconSrc,
      href: tool.href,
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

export const dashboardNav: DashboardNavSection[] = [
  {
    title: "General",
    items: [
      {
        label: "Overview",
        description: "Your usage and tools at a glance",
        icon: LayoutGrid,
        href: routes.dashboard,
      },
    ],
  },
  ...toolCategoryOrder.map(toolSection),
  {
    title: "Account",
    items: [
      {
        label: "Settings",
        description: "Profile, sign-in and preferences",
        icon: Settings,
        href: routes.dashboardSettings,
      },
    ],
  },
];

export function findNavItem(pathname: string) {
  const items = dashboardNav.flatMap((section) => section.items).filter((item) => item.href);
  return (
    items.find((item) => item.href === pathname) ??
    items.find((item) => item.href !== routes.dashboard && pathname.startsWith(item.href!))
  );
}

export function isNavItemActive(item: DashboardNavItem, pathname: string) {
  if (!item.href) return false;
  if (item.href === routes.dashboard) return pathname === routes.dashboard;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
