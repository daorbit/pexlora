import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

type ToolLinkCardProps = {
  href: string;
  iconSrc: string;
  name: string;
  description: string;
};

export function ToolLinkCard({ href, iconSrc, name, description }: ToolLinkCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-separator bg-surface p-4 transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <HubItemIcon src={iconSrc} size="md" />
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
