import Link from "next/link";
import { heroShortcuts } from "@/config/tool-hub";
import { heroCopy } from "@/content/landing";
import { HubItemIcon } from "@/components/tools/HubItemIcon";
import { ResponsiveLabel } from "@/components/ui/ResponsiveLabel";

export function HeroShortcuts() {
  return (
    <nav aria-label={heroCopy.shortcutsLabel}>
      <ul className="grid grid-cols-5 gap-1 sm:gap-3">
        {heroShortcuts.map((item) => {
          const full = item.shortName ?? item.name;
          return (
            <li key={item.key} className="min-w-0">
              <Link
                href={item.href}
                className="group flex flex-col items-center gap-2 rounded-xl py-1 text-center text-[11.5px] font-medium text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring active:text-foreground sm:gap-2.5 sm:rounded-2xl sm:py-3 sm:text-[13px] sm:hover:bg-surface sm:hover:text-foreground"
              >
                <HubItemIcon src={item.iconSrc} size="md" className="size-12 sm:size-13" />
                <span className="w-full truncate px-1">
                  <ResponsiveLabel short={heroCopy.shortcutShortLabels[item.key] ?? full} full={full} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
