"use client";

import type { ReactNode } from "react";
import { routes } from "@/config/site";
import { useNextPath } from "@/hooks/useNextPath";
import { cn } from "@/lib/utils/cn";
import { withNextParam } from "@/lib/url/next-path";
import { ButtonContent, buttonClasses, type ButtonStyleProps } from "@/components/ui/Button";
import { GoogleIcon } from "@/components/auth/GoogleIcon";

type GoogleButtonProps = ButtonStyleProps & { label: ReactNode; className?: string };

export function GoogleButton({ label, className, variant = "secondary", size = "xl", arrow }: GoogleButtonProps) {
  const next = useNextPath();

  return (
    <a
      href={withNextParam(routes.googleAuth, next)}
      className={buttonClasses({ variant, size, arrow, className: cn("w-full", className) })}
    >
      <ButtonContent variant={variant} size={size} arrow={arrow}>
        <GoogleIcon className="size-[18px]" />
        {label}
      </ButtonContent>
    </a>
  );
}
