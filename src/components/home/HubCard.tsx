import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HubItem } from "@/config/tool-hub";
import { hubCopy } from "@/content/landing";
import { HubItemIcon } from "@/components/tools/HubItemIcon";
import { ResponsiveLabel } from "@/components/ui/ResponsiveLabel";

export const hubTileGridClass = "grid w-full grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4";

export function HubCard({ item }: { item: HubItem }) {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-separator bg-surface px-1.5 pt-3.5 pb-3 text-center transition-[translate,box-shadow,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:bg-subtle sm:items-stretch sm:gap-4 sm:rounded-3xl sm:p-6 sm:text-left sm:hover:-translate-y-1 sm:hover:border-border-strong sm:hover:shadow-card"
    >
      <HubItemIcon src={item.iconSrc} size="lg" className="size-11 sm:size-13" />
      <span className="flex w-full min-w-0 flex-col sm:flex-1 sm:gap-1.5">
        <h3 className="line-clamp-2 text-[12.5px] leading-tight font-semibold tracking-[-0.015em] sm:text-[17px] sm:whitespace-normal">
          <ResponsiveLabel short={item.shortName ?? item.name} full={item.name} />
        </h3>
        <span className="text-secondary max-sm:hidden sm:line-clamp-3 sm:text-[14px] sm:leading-relaxed">{item.description}</span>
      </span>
      <span className="hidden items-center gap-1.5 text-sm font-semibold sm:inline-flex">
        {hubCopy.open}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
