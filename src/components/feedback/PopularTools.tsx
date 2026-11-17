import Link from "next/link";
import { heroShortcuts } from "@/config/tool-hub";
import { statusCopy } from "@/content/status";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

export function PopularTools() {
  return (
    <nav aria-label={statusCopy.notFound.popular} className="flex w-full flex-col gap-3 pt-4">
      <h2 className="text-[12px] font-semibold tracking-[0.08em] text-tertiary uppercase">{statusCopy.notFound.popular}</h2>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {heroShortcuts.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="group flex h-full items-center gap-3 rounded-2xl bg-surface p-3 text-left text-[13.5px] font-semibold shadow-card transition-colors hover:bg-fill focus-visible:outline-2 focus-visible:outline-ring"
            >
              <HubItemIcon src={item.iconSrc} size="sm" />
              <span className="min-w-0">{item.shortName ?? item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
