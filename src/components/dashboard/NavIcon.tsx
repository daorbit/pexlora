import type { DashboardNavItem } from "@/config/dashboard";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

export function NavIcon({ item }: { item: DashboardNavItem }) {
  if (item.iconSrc) return <HubItemIcon src={item.iconSrc} size="xs" />;
  const Icon = item.icon;
  return (
    <span className="flex size-7 shrink-0 items-center justify-center">
      <Icon className="size-[18px]" aria-hidden />
    </span>
  );
}
