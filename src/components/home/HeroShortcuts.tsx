import Link from "next/link";
import { heroShortcuts } from "@/config/tool-hub";
import { heroCopy } from "@/content/landing";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

export function HeroShortcuts() {
  return (
    <nav aria-label={heroCopy.shortcutsLabel}>
      <ul className="scrollbar-none -mx-3 flex gap-2 overflow-x-auto px-3 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
        {heroShortcuts.map((item) => (
          <li key={item.key} className="shrink-0">
            <Link
              href={item.href}
              className="group inline-flex h-9 items-center gap-2 rounded-xl bg-fill pr-3 pl-1 text-[13px] font-semibold whitespace-nowrap transition-colors hover:bg-fill-strong focus-visible:outline-2 focus-visible:outline-ring sm:h-11 sm:gap-2.5 sm:pr-4 sm:pl-1.5 sm:text-sm"
            >
              <HubItemIcon src={item.iconSrc} size="xs" className="size-6 sm:size-7" />
              {item.shortName ?? item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
