"use client";

import { usePathname } from "next/navigation";
import { adminNavItem, isNavItemActive } from "@/config/dashboard";
import { SidebarLink } from "@/components/dashboard/SidebarLink";

export function SidebarAdminLink() {
  const pathname = usePathname();
  return <SidebarLink item={adminNavItem} active={isNavItemActive(adminNavItem, pathname)} />;
}
