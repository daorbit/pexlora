import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { menuGroups } from "@/config/tool-hub";
import { navCopy } from "@/content/navigation";
import { cn } from "@/lib/utils/cn";
import { staggerDelay } from "@/lib/utils/stagger";
import { MenuGroupLabel, ToolMenuLink } from "@/components/layout/ToolMenuLink";

type MegaMenuPanelProps = {
  id: string;
  onNavigate: () => void;
};

const itemMotion = "motion-safe:animate-fade-up motion-safe:[animation-duration:0.4s]";

export function MegaMenuPanel({ id, onNavigate }: MegaMenuPanelProps) {
  const [primary, ...secondary] = menuGroups;

  return (
    <div
      id={id}
      className="fixed inset-x-0 top-14 z-50 border-b border-separator bg-surface shadow-card motion-safe:animate-menu-in"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-[1.4fr_1fr_1fr_1.8fr] gap-8 px-10 pt-10 pb-12">
        <div className="flex flex-col gap-2">
          <MenuGroupLabel>{primary.label}</MenuGroupLabel>
          <ul className="flex flex-col gap-1.5">
            {primary.items.map((item, index) => (
              <li key={item.key} className={cn(itemMotion, staggerDelay(index))}>
                <ToolMenuLink item={item} onSelect={onNavigate} size="lg" />
              </li>
            ))}
          </ul>
          <Link
            href="/#all-tools"
            onClick={onNavigate}
            className={cn(
              "mt-4 inline-flex items-center gap-1.5 px-1.5 text-[15px] font-semibold text-secondary transition-colors hover:text-foreground",
              itemMotion,
              staggerDelay(primary.items.length),
            )}
          >
            {navCopy.viewAll}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {secondary.map((group, groupIndex) => (
          <div key={group.id} className="flex flex-col gap-2">
            <MenuGroupLabel>{group.label}</MenuGroupLabel>
            <ul className={cn("grid gap-x-4 gap-y-1", group.items.length > 4 && "grid-cols-2")}>
              {group.items.map((item, index) => (
                <li key={item.key} className={cn(itemMotion, staggerDelay(index + groupIndex + 1))}>
                  <ToolMenuLink item={item} onSelect={onNavigate} size="md" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
