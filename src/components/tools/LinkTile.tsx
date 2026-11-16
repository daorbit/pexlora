import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

type LinkTileProps = { href: string; iconSrc: string; label: string; active?: boolean };

export function LinkTile({ href, iconSrc, label, active = false }: LinkTileProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-2xl border p-2 pr-3.5 text-sm font-semibold transition-colors",
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-separator bg-surface hover:border-border-strong",
      )}
    >
      <HubItemIcon src={iconSrc} size="sm" />
      <span className="flex-1">{label}</span>
      <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}
