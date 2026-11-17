import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { HubItem } from "@/config/tool-hub";
import { hubCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { HubItemIcon } from "@/components/tools/HubItemIcon";
import { ResponsiveLabel } from "@/components/ui/ResponsiveLabel";

export const hubTileGridClass = "grid w-full grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4";

type HubCardProps = { item: HubItem; className?: string; tile?: boolean };

export function HubCard({ item, className, tile = false }: HubCardProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group flex h-full rounded-2xl border border-separator bg-surface transition-[translate,box-shadow,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:bg-subtle sm:flex-col sm:items-stretch sm:gap-4 sm:rounded-3xl sm:p-6 sm:text-left sm:hover:-translate-y-1 sm:hover:border-border-strong sm:hover:shadow-card",
        tile ? "flex-col items-center gap-2 px-1.5 pt-3.5 pb-3 text-center" : "items-center gap-3.5 p-3",
        className,
      )}
    >
      <HubItemIcon src={item.iconSrc} size="lg" className="size-11 sm:size-13" />
      <span className={cn("flex min-w-0 flex-col sm:flex-1 sm:gap-1.5", tile ? "w-full" : "flex-1 gap-0.5")}>
        <h3
          className={cn(
            "font-semibold tracking-[-0.015em] sm:text-[17px] sm:whitespace-normal",
            tile ? "line-clamp-2 text-[12.5px] leading-tight" : "truncate text-[15px]",
          )}
        >
          {tile ? <ResponsiveLabel short={item.shortName ?? item.name} full={item.name} /> : item.name}
        </h3>
        <span
          className={cn(
            "text-secondary sm:line-clamp-3 sm:text-[14px] sm:leading-relaxed",
            tile ? "max-sm:hidden" : "line-clamp-1 text-[13px] leading-snug",
          )}
        >
          {item.description}
        </span>
      </span>
      {!tile && <ChevronRight className="size-4 shrink-0 text-tertiary sm:hidden" aria-hidden />}
      <span className="hidden items-center gap-1.5 text-sm font-semibold sm:inline-flex">
        {hubCopy.open}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
