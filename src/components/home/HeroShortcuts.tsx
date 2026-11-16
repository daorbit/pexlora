import Link from "next/link";
import { heroShortcuts } from "@/config/tool-hub";
import { heroCopy } from "@/content/landing";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

export function HeroShortcuts() {
  return (
    <nav aria-label={heroCopy.shortcutsLabel}>
      <ul className="flex flex-wrap justify-center gap-2">
        {heroShortcuts.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="group inline-flex h-11 items-center gap-2.5 rounded-xl bg-fill pr-4 pl-1.5 text-sm font-semibold transition-colors hover:bg-fill-strong focus-visible:outline-2 focus-visible:outline-ring"
            >
              <HubItemIcon src={item.iconSrc} size="xs" />
              {item.shortName ?? item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
