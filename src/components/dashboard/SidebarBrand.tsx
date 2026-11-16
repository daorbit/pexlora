"use client";

import Image from "next/image";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { brandAssets } from "@/config/brand";
import { routes, siteConfig } from "@/config/site";
import { shellCopy } from "@/content/dashboard";
import { cn } from "@/lib/utils/cn";
import { whenCollapsed } from "@/components/dashboard/sidebar-styles";

const mark = <Image src={brandAssets.mark} alt="" width={32} height={32} className="size-8 shrink-0" />;

type SidebarBrandProps = { collapsible: boolean; peeking: boolean; onToggle: () => void };

export function SidebarBrand({ collapsible, peeking, onToggle }: SidebarBrandProps) {
  const ToggleIcon = peeking ? PanelLeftOpen : PanelLeftClose;
  const toggleLabel = peeking ? shellCopy.keepOpen : shellCopy.collapse;

  return (
    <>
      {collapsible && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={shellCopy.expand}
          data-tooltip={shellCopy.expand}
          className={cn(
            "group/brand mx-auto mb-4 size-11 items-center justify-center rounded-xl transition-colors hover:bg-fill focus-visible:outline-2 focus-visible:outline-ring",
            "hidden rail-collapsed:inline-flex",
          )}
        >
          <span className="group-hover/brand:hidden group-focus-visible/brand:hidden">{mark}</span>
          <PanelLeftOpen className="hidden size-5 group-hover/brand:block group-focus-visible/brand:block" aria-hidden />
        </button>
      )}
      <div className={cn("mb-4 flex items-center gap-2 px-1.5 pt-1", whenCollapsed.hidden)}>
        <Link href={routes.home} aria-label={shellCopy.home} className="flex min-w-0 flex-1 items-center gap-2.5">
          {mark}
          <span className="font-display text-lg font-semibold tracking-[-0.02em]">{siteConfig.name}</span>
        </Link>
        {collapsible && (
          <button
            type="button"
            onClick={onToggle}
            aria-label={toggleLabel}
            title={toggleLabel}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-fill hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ToggleIcon className="size-4" aria-hidden />
          </button>
        )}
      </div>
    </>
  );
}
