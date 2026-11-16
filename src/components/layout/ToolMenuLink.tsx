import Link from "next/link";
import type { HubItem } from "@/config/tool-hub";
import { cn } from "@/lib/utils/cn";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

type ToolMenuLinkProps = {
  item: HubItem;
  onSelect: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const textSizes = {
  sm: "text-[15px] font-semibold",
  md: "text-[16px] font-semibold",
  lg: "text-[24px] font-semibold tracking-[-0.02em]",
};

export function ToolMenuLink({ item, onSelect, size = "sm", className }: ToolMenuLinkProps) {
  return (
    <Link
      href={item.href}
      onClick={onSelect}
      className={cn(
        "group flex items-center gap-3.5 rounded-2xl p-1.5 pr-3 transition-colors hover:bg-fill active:bg-fill",
        className,
      )}
    >
      <HubItemIcon src={item.iconSrc} size={size === "lg" ? "md" : "sm"} />
      <span className={cn("leading-tight transition-colors group-hover:text-accent-text", textSizes[size])}>
        {item.name}
      </span>
    </Link>
  );
}

export function MenuGroupLabel({ children }: { children: string }) {
  return <p className="px-1.5 pb-1 text-[13px] font-medium text-tertiary">{children}</p>;
}
