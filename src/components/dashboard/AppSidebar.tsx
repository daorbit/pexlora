"use client";

import type { ReactNode } from "react";
import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";
import { cn } from "@/lib/utils/cn";
import { SidebarBrand } from "@/components/dashboard/SidebarBrand";
import { SidebarNav } from "@/components/dashboard/SidebarNav";

type AppSidebarProps = {
  usage: ReactNode;
  account: ReactNode;
  collapsible?: boolean;
  className?: string;
};

export function AppSidebar({ usage, account, collapsible = true, className }: AppSidebarProps) {
  const { toggle } = useSidebarCollapsed();

  return (
    <aside
      className={cn(
        "theme-dark flex h-full w-64 flex-col overflow-x-hidden overflow-y-auto rounded-[24px] bg-surface p-3 text-foreground transition-[width] duration-300",
        collapsible && "sidebar-rail rail-collapsed:w-19",
        className,
      )}
    >
      <SidebarBrand collapsible={collapsible} onToggle={toggle} />
      <SidebarNav />
      <div className="mt-auto flex flex-col gap-2 pt-6">
        {usage}
        {account}
      </div>
    </aside>
  );
}
