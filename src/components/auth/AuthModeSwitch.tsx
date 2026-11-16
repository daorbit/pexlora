"use client";

import Link from "next/link";
import { routes } from "@/config/site";
import { authCopy, type AuthMode } from "@/content/auth";
import { useNextPath } from "@/hooks/useNextPath";
import { cn } from "@/lib/utils/cn";
import { withNextParam } from "@/lib/url/next-path";
import { segmentedItem, segmentedTrack } from "@/components/ui/segmented-styles";

const tabs: { mode: AuthMode; href: string }[] = [
  { mode: "signin", href: routes.signIn },
  { mode: "signup", href: routes.signUp },
];

export function AuthModeSwitch({ active }: { active: AuthMode }) {
  const next = useNextPath();

  return (
    <nav aria-label={authCopy.tabs.label} className={cn(segmentedTrack, "grid w-full grid-cols-2 bg-canvas p-0.75 lg:p-1")}>
      {tabs.map(({ mode, href }) => {
        const isActive = mode === active;
        return (
          <Link
            key={mode}
            href={withNextParam(href, next)}
            aria-current={isActive ? "page" : undefined}
            className={cn(segmentedItem(isActive), "h-8.5 text-[13px] lg:h-9.5 lg:text-sm")}
          >
            {authCopy.tabs[mode]}
          </Link>
        );
      })}
    </nav>
  );
}
