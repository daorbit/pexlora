import type { DashboardNavItem } from "@/config/dashboard";
import { cn } from "@/lib/utils/cn";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

type NavIconProps = { item: Pick<DashboardNavItem, "icon" | "iconSrc">; className?: string };

export function NavIcon({ item, className = "size-[22px]" }: NavIconProps) {
  if (item.iconSrc) return <HubItemIcon src={item.iconSrc} size="xs" className={className} />;
  const Icon = item.icon;
  return (
    <span className={cn("flex shrink-0 items-center justify-center", className)}>
      <Icon className="size-[17px]" aria-hidden />
    </span>
  );
}
