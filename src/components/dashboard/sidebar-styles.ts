import { cn } from "@/lib/utils/cn";

export const sidebarItem = "flex h-9.5 items-center gap-3 rounded-[10px] px-2.5 text-sm transition-colors";

export function sidebarItemState(active: boolean) {
  return active
    ? "bg-fill-strong font-semibold text-foreground"
    : "font-medium text-secondary hover:bg-fill hover:text-foreground";
}

export function railButton(active: boolean) {
  return cn(
    "group/rail flex w-16 flex-col items-center gap-1 rounded-xl py-1 text-[10px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-ring",
    active ? "text-foreground" : "text-secondary hover:text-foreground",
  );
}

export function railIconBox(active: boolean) {
  return cn(
    "flex h-8 w-10 items-center justify-center rounded-[10px] transition-colors",
    active ? "bg-fill-strong ring-[1.5px] ring-primary" : "group-hover/rail:bg-fill",
  );
}
