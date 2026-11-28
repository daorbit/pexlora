"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { dashboardSections, sectionIdForPath, type DashboardSectionId } from "@/config/dashboard";
import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";
import { cn } from "@/lib/utils/cn";
import { SidebarPanel } from "@/components/dashboard/SidebarPanel";
import { SidebarRail } from "@/components/dashboard/SidebarRail";

type AppSidebarProps = {
  usage: ReactNode;
  account: ReactNode;
  collapsible?: boolean;
  className?: string;
};

export function AppSidebar({ usage, account, collapsible = true, className }: AppSidebarProps) {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebarCollapsed();
  const [current, setCurrent] = useState<DashboardSectionId>(() => sectionIdForPath(pathname));
  const [shownPath, setShownPath] = useState(pathname);
  const [peeking, setPeeking] = useState(false);

  if (shownPath !== pathname) {
    setShownPath(pathname);
    setCurrent(sectionIdForPath(pathname));
    setPeeking(false);
  }

  const isRail = collapsible && collapsed;
  const section = dashboardSections.find((item) => item.id === current) ?? dashboardSections[0];

  const pick = (id: DashboardSectionId) => {
    setCurrent(id);
    if (isRail) setPeeking(id !== current || !peeking);
  };

  const togglePinned = () => {
    setPeeking(false);
    toggle();
  };

  return (
    <aside
      onMouseLeave={() => setPeeking(false)}
      className={cn(
        "flex h-full w-78 overflow-hidden rounded-[24px] bg-surface text-foreground transition-[width,box-shadow] duration-300",
        collapsible && "absolute inset-y-0 left-0 z-40",
        collapsible && !peeking && "sidebar-rail rail-collapsed:w-19",
        peeking && "shadow-[0_24px_60px_-12px_rgb(0_0_0/0.45)]",
        className,
      )}
    >
      <SidebarRail current={current} collapsed={isRail && !peeking} onPick={pick} onToggle={collapsible ? togglePinned : undefined} />
      <div className="flex min-w-0 flex-1 rail-collapsed:hidden">
        <SidebarPanel
          key={section.id}
          section={section}
          footer={
            <>
              {usage}
              {account}
            </>
          }
        />
      </div>
    </aside>
  );
}
