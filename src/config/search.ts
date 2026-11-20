import { Search } from "lucide-react";
import type { DashboardNavItem } from "@/config/dashboard";
import { hubCategories, hubItems } from "@/config/tool-hub";

function categoryLabel(id: string) {
  return hubCategories.find((category) => category.id === id)?.label ?? "";
}

export const publicSearchItems: DashboardNavItem[] = hubItems.map((item) => ({
  label: item.name,
  description: categoryLabel(item.category),
  group: categoryLabel(item.category),
  subtitle: item.description,
  icon: Search,
  iconSrc: item.iconSrc,
  href: item.href,
}));
