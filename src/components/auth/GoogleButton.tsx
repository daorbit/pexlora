"use client";

import { routes } from "@/config/site";
import { useNextPath } from "@/hooks/useNextPath";
import { cn } from "@/lib/utils/cn";
import { withNextParam } from "@/lib/url/next-path";
import { buttonClasses } from "@/components/ui/Button";
import { GoogleIcon } from "@/components/auth/GoogleIcon";

export function GoogleButton({ label, className }: { label: string; className?: string }) {
  const next = useNextPath();

  return (
    <a
      href={withNextParam(routes.googleAuth, next)}
      className={buttonClasses({ variant: "secondary", size: "xl", className: cn("w-full", className) })}
    >
      <GoogleIcon className="size-[18px]" />
      {label}
    </a>
  );
}
