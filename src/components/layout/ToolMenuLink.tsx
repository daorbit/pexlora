import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { HubItem } from "@/config/tool-hub";
import { navCopy } from "@/content/navigation";
import { cn } from "@/lib/utils/cn";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

type Size = "sm" | "md";

type ToolMenuLinkProps = {
  item: HubItem;
  onSelect: () => void;
  size?: Size;
  className?: string;
};

const linkSizes: Record<Size, string> = {
  sm: "gap-2.5 rounded-xl p-1 pr-2",
  md: "gap-3.5 rounded-2xl p-1.5 pr-3",
};

const textSizes: Record<Size, string> = {
  sm: "truncate text-[14px] font-medium",
  md: "text-[16px] font-semibold",
};

export function ToolMenuLink({ item, onSelect, size = "sm", className }: ToolMenuLinkProps) {
  return (
    <Link
      href={item.href}
      onClick={onSelect}
      className={cn(
        "group flex min-w-0 items-center transition-colors hover:bg-fill active:bg-fill",
        linkSizes[size],
        className,
      )}
    >
      <HubItemIcon src={item.iconSrc} size={size === "sm" ? "xs" : "sm"} />
      <span className={cn("leading-tight transition-colors group-hover:text-accent-text", textSizes[size])}>
        {size === "sm" ? (item.shortName ?? item.name) : item.name}
      </span>
    </Link>
  );
}

export function MenuMoreLink({ href, count, onSelect }: { href: string; count: number; onSelect: () => void }) {
  if (count <= 0) return null;
  return (
    <Link
      href={href}
      onClick={onSelect}
      className="mt-1 inline-flex items-center gap-1 self-start rounded-lg px-1 py-1 text-[13px] font-semibold text-secondary transition-colors hover:text-foreground"
    >
      {navCopy.more(count)}
      <ChevronRight className="size-3.5" aria-hidden />
    </Link>
  );
}

export function MenuGroupLabel({ children }: { children: string }) {
  return <p className="px-1 pb-1.5 text-[11px] font-semibold tracking-[0.08em] text-tertiary uppercase">{children}</p>;
}
