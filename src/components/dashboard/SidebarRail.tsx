"use client";

import Image from "next/image";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { brandAssets } from "@/config/brand";
import { dashboardSections, type DashboardSectionId } from "@/config/dashboard";
import { routes } from "@/config/site";
import { shellCopy } from "@/content/dashboard";
import { NavIcon } from "@/components/dashboard/NavIcon";
import { railButton, railIconBox } from "@/components/dashboard/sidebar-styles";

type SidebarRailProps = {
  current: DashboardSectionId;
  collapsed: boolean;
  onPick: (id: DashboardSectionId) => void;
  onToggle?: () => void;
};

export function SidebarRail({ current, collapsed, onPick, onToggle }: SidebarRailProps) {
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;
  const toggleLabel = collapsed ? shellCopy.expand : shellCopy.collapse;

  return (
    <div className="theme-dark ink-panel flex w-19 shrink-0 flex-col items-center gap-1 py-3.5 text-foreground">
      <Link
        href={routes.home}
        aria-label={shellCopy.home}
        className="mb-3 rounded-xl focus-visible:outline-2 focus-visible:outline-ring"
      >
        <Image src={brandAssets.mark} alt="" width={34} height={34} className="size-8.5" />
      </Link>
      <nav aria-label={shellCopy.sectionsLabel} className="scrollbar-none relative flex min-h-0 flex-1 flex-col items-center gap-1 overflow-y-auto">
        {dashboardSections.map((section) => {
          const active = section.id === current;
          return (
            <button
              key={section.id}
              type="button"
              aria-pressed={active}
              aria-label={section.title}
              onClick={() => onPick(section.id)}
              className={railButton(active)}
            >
              <span className={railIconBox(active)}>
                <NavIcon item={section} className="size-6" />
              </span>
              <span aria-hidden>{shellCopy.sectionShort[section.id]}</span>
            </button>
          );
        })}
      </nav>
      {onToggle && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={toggleLabel}
          title={toggleLabel}
          className="mt-2 inline-flex size-10 items-center justify-center rounded-xl text-secondary transition-colors hover:bg-fill hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <ToggleIcon className="size-[18px]" aria-hidden />
        </button>
      )}
    </div>
  );
}
