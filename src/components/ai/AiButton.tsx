"use client";

import type { ComponentProps } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { OrbitMark } from "@/components/ai/OrbitMark";

type AiButtonProps = Omit<ComponentProps<typeof Button>, "children"> & {
  pending: boolean;
  label: string;
  pendingLabel?: string;
};

export function AiButton({ pending, label, pendingLabel, disabled, className, ...props }: AiButtonProps) {
  return (
    <Button type="button" disabled={pending || disabled} className={cn("group/ai pl-1.5", className)} {...props}>
      <span className="theme-dark -my-1 grid size-7 shrink-0 place-items-center rounded-full bg-background text-foreground">
        {pending ? (
          <LoaderCircle className="size-3.5 animate-spin" aria-hidden />
        ) : (
          <OrbitMark size={24} className="size-6 transition-transform duration-300 motion-safe:group-hover/ai:-rotate-12" />
        )}
      </span>
      {pending && pendingLabel ? pendingLabel : label}
    </Button>
  );
}
