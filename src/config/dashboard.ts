import { LayoutGrid, Settings, type LucideIcon } from "lucide-react";
import { routes } from "@/config/site";
import { getWorkspaceTool, upcomingTools, type WorkspaceToolSlug } from "@/config/tools";

export type DashboardNavItem = {
  label: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  soon?: boolean;
};

export type DashboardNavSection = {
  title: string;
  items: DashboardNavItem[];
};

export const dashboardModules: { slug: WorkspaceToolSlug; href: string }[] = [
  { slug: "remove-metadata", href: routes.dashboardCleaner },
  { slug: "convert-format", href: routes.dashboardConverter },
  { slug: "view-metadata", href: routes.dashboardInspector },
];

const toolItems: DashboardNavItem[] = dashboardModules.map(({ slug, href }) => {
  const tool = getWorkspaceTool(slug);
  return { label: tool.shortName, description: tool.name, icon: tool.icon, href };
});

const upcomingItems: DashboardNavItem[] = upcomingTools.map((tool) => ({
  label: tool.shortName,
  description: tool.name,
  icon: tool.icon,
  soon: true,
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
  { title: "Tools", items: [...toolItems, ...upcomingItems] },
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
