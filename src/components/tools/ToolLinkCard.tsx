import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { IconComponent } from "@/components/icons/types";

type ToolLinkCardProps = {
  href: string;
  icon: IconComponent;
  name: string;
  description: string;
};

export function ToolLinkCard({ href, icon: Icon, name, description }: ToolLinkCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-[20px] border border-separator bg-surface p-4 transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-primary dark:bg-primary dark:text-primary-foreground">
        <Icon className="size-5" strokeWidth={2} aria-hidden />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[15.5px] font-semibold tracking-[-0.01em]">{name}</span>
        <span className="line-clamp-1 text-[13.5px] text-secondary">{description}</span>
      </span>
      <ArrowUpRight
        className="size-4 shrink-0 text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </Link>
  );
}
