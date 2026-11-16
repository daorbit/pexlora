"use client";

import Link from "next/link";
import { routes } from "@/config/site";
import type { AuthMode } from "@/content/auth";
import { useNextPath } from "@/hooks/useNextPath";
import { cn } from "@/lib/utils/cn";
import { withNextParam } from "@/lib/url/next-path";

const modes: { mode: AuthMode; label: string; href: string }[] = [
  { mode: "signin", label: "Sign In", href: routes.signIn },
  { mode: "signup", label: "Create Account", href: routes.signUp },
];

export function AuthModeSwitch({ active }: { active: AuthMode }) {
  const next = useNextPath();

  return (
    <nav aria-label="Sign in or create account" className="grid grid-cols-2 rounded-xl bg-fill p-[3px]">
      {modes.map(({ mode, label, href }) => {
        const isActive = mode === active;
        return (
          <Link
            key={mode}
            href={withNextParam(href, next)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex h-[34px] items-center justify-center rounded-[9px] text-[13.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
              isActive
                ? "bg-surface text-foreground shadow-thumb ring-1 ring-separator"
                : "text-secondary hover:text-foreground",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
