import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { HubItem } from "@/config/tool-hub";
import { hubCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

export const hubGridClass = "grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4";

export function HubCard({ item, className }: { item: HubItem; className?: string }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group flex h-full items-center gap-3.5 rounded-2xl border border-separator bg-surface p-3 transition-[translate,box-shadow,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:bg-subtle sm:flex-col sm:items-stretch sm:gap-4 sm:rounded-3xl sm:p-6 sm:hover:-translate-y-1 sm:hover:border-border-strong sm:hover:shadow-card",
        className,
      )}
    >
      <HubItemIcon src={item.iconSrc} size="lg" className="size-11 sm:size-13" />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:gap-1.5">
        <h3 className="truncate text-[15px] font-semibold tracking-[-0.015em] sm:text-[17px] sm:whitespace-normal">{item.name}</h3>
        <span className="line-clamp-1 text-[13px] leading-snug text-secondary sm:line-clamp-3 sm:text-[14px] sm:leading-relaxed">
          {item.description}
        </span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-tertiary sm:hidden" aria-hidden />
      <span className="hidden items-center gap-1.5 text-sm font-semibold sm:inline-flex">
        {hubCopy.open}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
