import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

type ToolRowLinkProps = {
  href: string;
  iconSrc: string;
  name: string;
  description?: string;
  compact?: boolean;
};

export function ToolRowLink({ href, iconSrc, name, description, compact = false }: ToolRowLinkProps) {
  return (
    <Link
      href={href}
      prefetch={compact ? false : undefined}
      className={cn(
        "group flex items-center gap-3 px-3.5 transition-colors hover:bg-fill focus-visible:bg-fill focus-visible:outline-none sm:gap-3.5 sm:px-4",
        compact ? "py-2.5" : "py-2.5 sm:py-3",
      )}
    >
      <HubItemIcon src={iconSrc} size={compact ? "xs" : "sm"} />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className={cn("truncate font-semibold", compact ? "text-sm" : "text-[14.5px] sm:text-[15px]")}>{name}</span>
        {description && <span className="truncate text-[12.5px] text-secondary sm:text-[13px]">{description}</span>}
      </span>
      <ChevronRight
        className="size-4 shrink-0 text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
        aria-hidden
      />
    </Link>
  );
}
