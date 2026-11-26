import Link from "next/link";
import type { DashboardNavItem } from "@/config/dashboard";
import { cn } from "@/lib/utils/cn";
import { NavIcon } from "@/components/dashboard/NavIcon";
import { sidebarItem, sidebarItemState } from "@/components/dashboard/sidebar-styles";

export function SidebarLink({ item, active }: { item: DashboardNavItem; active: boolean }) {
  return (
    <Link href={item.href} aria-current={active ? "page" : undefined} className={cn(sidebarItem, sidebarItemState(active))}>
      <NavIcon item={item} />
      <span className="flex-1 truncate">{item.label}</span>
    </Link>
  );
}
