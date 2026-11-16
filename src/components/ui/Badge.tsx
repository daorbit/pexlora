import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

type Tone = "neutral" | "warning" | "success" | "danger" | "accent";

const tones: Record<Tone, string> = {
  neutral: "bg-fill text-secondary",
  warning: "bg-warning-soft text-warning",
  success: "bg-success-soft text-success",
  danger: "bg-danger-soft text-danger",
  accent: "bg-accent-soft text-accent-text",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
