import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type NoteListCardProps = {
  id: string;
  title: string;
  items: string[];
  icon: LucideIcon;
  iconClassName: string;
};

export function NoteListCard({ id, title, items, icon: Icon, iconClassName }: NoteListCardProps) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-3 rounded-3xl border border-separator bg-surface p-5 sm:p-6">
      <h2 id={id} className="text-lg font-semibold tracking-[-0.015em]">
        {title}
      </h2>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed text-secondary sm:text-[15px]">
            <Icon className={cn("mt-1 size-4 shrink-0", iconClassName)} strokeWidth={2.4} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
