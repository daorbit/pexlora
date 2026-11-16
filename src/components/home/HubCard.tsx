import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HubItem } from "@/config/tool-hub";
import { hubCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

export function HubCard({ item, className }: { item: HubItem; className?: string }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group flex h-full flex-col gap-4 rounded-3xl border border-separator bg-surface p-5 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-6",
        className,
      )}
    >
      <HubItemIcon src={item.iconSrc} size="lg" />
      <span className="flex flex-1 flex-col gap-1.5">
        <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{item.name}</h3>
        <span className="line-clamp-3 text-[14px] leading-relaxed text-secondary">{item.description}</span>
      </span>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
        {hubCopy.open}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
