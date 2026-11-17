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
  return (
    <div
      id={id}
      className="fixed inset-x-0 top-14 z-50 border-b border-separator bg-surface text-foreground shadow-card motion-safe:animate-menu-in"
    >
      <div className="mx-auto flex max-h-[calc(100dvh-4rem)] max-w-[1320px] flex-col gap-6 overflow-y-auto px-10 pt-8 pb-6">
        <div className="grid grid-cols-3 gap-x-6 gap-y-8 lg:grid-cols-5">
          {menuGroups.map((group, groupIndex) => (
            <div key={group.id} className="flex min-w-0 flex-col">
              <MenuGroupLabel>{group.label}</MenuGroupLabel>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item, index) => (
                  <li key={item.key} className={cn(itemMotion, staggerDelay(index + groupIndex))}>
                    <ToolMenuLink item={item} onSelect={onNavigate} size="sm" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex border-t border-separator pt-4">
          <Link
            href="/#all-tools"
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 px-1 text-[13.5px] font-semibold text-secondary transition-colors hover:text-foreground"
          >
            {navCopy.viewAll}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
