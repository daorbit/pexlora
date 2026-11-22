"use client";

import Link from "next/link";
import { routes } from "@/config/site";
import { changelogCopy } from "@/content/changelog";
import { useChangelogUnseen } from "@/hooks/useChangelogSeen";

export function WhatsNewBadge() {
  const unseen = useChangelogUnseen();
  if (!unseen) return null;

  return (
    <Link
      href={routes.changelog}
      aria-label={changelogCopy.badgeLabel}
      className="inline-flex h-5.5 items-center rounded-md bg-primary px-1.5 text-[11px] font-bold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-ring motion-safe:animate-pop"
    >
      {changelogCopy.badge}
    </Link>
  );
}
