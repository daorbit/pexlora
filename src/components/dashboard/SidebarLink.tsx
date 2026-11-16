import Link from "next/link";
import type { DashboardNavItem } from "@/config/dashboard";
import { shellCopy } from "@/content/dashboard";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import { NavIcon } from "@/components/dashboard/NavIcon";
import { sidebarItem, whenCollapsed } from "@/components/dashboard/sidebar-styles";

export function SidebarLink({ item, active }: { item: DashboardNavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      data-tooltip={item.label}
      data-tooltip-new={item.isNew ? "" : undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        sidebarItem,
        whenCollapsed.centered,
        active ? "bg-fill-strong font-semibold text-foreground" : "font-medium text-secondary hover:bg-fill hover:text-foreground",
      )}
    >
      <NavIcon item={item} />
      <span className={cn("flex-1 truncate", whenCollapsed.srOnly)}>{item.label}</span>
      {item.isNew && (
        <Badge className={cn("bg-primary text-[10px] font-bold text-primary-foreground uppercase", whenCollapsed.hidden)}>
          {shellCopy.newBadge}
        </Badge>
      )}
      {active && <span className={cn("size-1.5 rounded-full bg-primary", whenCollapsed.hidden)} aria-hidden />}
    </Link>
  );
}
