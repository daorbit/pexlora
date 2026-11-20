import type { DashboardNavItem } from "@/config/dashboard";

export type ResultGroup = { title: string; items: { item: DashboardNavItem; index: number }[] };

export function groupResults(results: DashboardNavItem[]) {
  const groups = new Map<string, DashboardNavItem[]>();
  for (const item of results) {
    const title = item.group ?? "";
    groups.set(title, [...(groups.get(title) ?? []), item]);
  }

  let index = 0;
  const grouped: ResultGroup[] = [...groups.entries()].map(([title, items]) => ({
    title,
    items: items.map((item) => ({ item, index: index++ })),
  }));

  return { ordered: [...groups.values()].flat(), grouped };
}
