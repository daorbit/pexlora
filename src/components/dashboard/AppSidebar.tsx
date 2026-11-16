"use client";

import type { ReactNode } from "react";
import { useRailTooltip } from "@/hooks/useRailTooltip";
import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";
import { useSidebarPeek } from "@/hooks/useSidebarPeek";
import { cn } from "@/lib/utils/cn";
import { RailTooltip } from "@/components/dashboard/RailTooltip";
import { SidebarBrand } from "@/components/dashboard/SidebarBrand";
import { SidebarNav } from "@/components/dashboard/SidebarNav";

type AppSidebarProps = {
  usage: ReactNode;
  account: ReactNode;
  collapsible?: boolean;
  className?: string;
};

export function AppSidebar({ usage, account, collapsible = true, className }: AppSidebarProps) {
  const { collapsed, toggle } = useSidebarCollapsed();
  const isRail = collapsible && collapsed;
  const { peeking, start, stop } = useSidebarPeek(isRail);
  const { tip, tipRef, onMouseOver, onFocus, hide } = useRailTooltip(isRail && !peeking);

  const leave = () => {
    stop();
    hide();
  };

  const togglePinned = () => {
    stop();
    hide();
    toggle();
  };

  return (
    <aside
      onMouseEnter={start}
      onMouseLeave={leave}
      onMouseOver={onMouseOver}
      onFocus={onFocus}
      onBlur={hide}
      className={cn(
        "theme-dark flex h-full w-64 flex-col overflow-x-hidden overflow-y-auto rounded-[24px] bg-surface p-3 text-foreground transition-[width,box-shadow] duration-300",
        collapsible && "absolute inset-y-0 left-0 z-40",
        collapsible && !peeking && "sidebar-rail rail-collapsed:w-19",
        peeking && "shadow-[0_24px_60px_-12px_rgb(0_0_0/0.45)]",
        className,
      )}
    >
      <SidebarBrand collapsible={collapsible} peeking={peeking} onToggle={togglePinned} />
      <SidebarNav />
      <div className="mt-auto flex flex-col gap-2 pt-6">
        {usage}
        {account}
      </div>
      {collapsible && <RailTooltip tip={tip} ref={tipRef} />}
    </aside>
  );
}
