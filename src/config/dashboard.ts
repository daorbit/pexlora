import { LayoutGrid, Settings } from "lucide-react";
import type { IconComponent } from "@/components/icons/types";
import { routes } from "@/config/site";
import { textTools } from "@/config/text-tools";
import {
  toolCategories,
  toolsInCategory,
  workspaceTools,
  type ToolCategory,
  type WorkspaceToolSlug,
} from "@/config/tools";

export type DashboardNavItem = {
  label: string;
  description: string;
  icon: IconComponent;
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

export const dashboardModules = workspaceTools.map((tool) => ({ slug: tool.slug, href: dashboardHrefs[tool.slug] }));

function toolSection(category: ToolCategory): DashboardNavSection {
  const items: DashboardNavItem[] = toolsInCategory(category).map((tool) => ({
    label: tool.shortName,
    description: tool.name,
    icon: tool.icon,
    href: dashboardHrefs[tool.slug],
  }));

  if (category === "ai") {
    items.push(
      ...textTools.map((tool) => ({
        label: tool.shortName,
        description: tool.name,
        icon: tool.icon,
        href: tool.dashboardHref,
      })),
    );
  }

  return { title: toolCategories[category], items };
}

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
  toolSection("metadata"),
  toolSection("image"),
  toolSection("ai"),
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
