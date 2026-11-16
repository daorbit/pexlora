import Link from "next/link";
import type { ShortcutGroup } from "@/config/dashboard-links";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

const gridColumns: Record<number, string> = {
  4: "grid-cols-2 sm:grid-cols-4",
  6: "grid-cols-3 sm:grid-cols-6",
};

export function ShortcutCard({ group }: { group: ShortcutGroup }) {
  return (
    <Card className="flex h-full flex-col gap-4 p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <HubItemIcon src={group.iconSrc} size="sm" />
        <div className="flex min-w-0 flex-col">
          <h3 className="text-[15px] font-semibold">{group.title}</h3>
          <p className="truncate text-[13px] text-secondary">{group.description}</p>
        </div>
      </div>
      <ul className={cn("grid gap-2", gridColumns[group.links.length] ?? "grid-cols-3")}>
        {group.links.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className="group flex h-full flex-col items-center justify-center gap-0.5 rounded-xl bg-subtle px-2 py-3 ring-1 ring-separator transition-colors hover:bg-primary hover:text-primary-foreground hover:ring-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="text-[11px] font-medium text-tertiary uppercase group-hover:text-primary-foreground/70">
                {group.caption}
              </span>
              <span className="text-[15px] font-semibold whitespace-nowrap tabular-nums">{link.value}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
