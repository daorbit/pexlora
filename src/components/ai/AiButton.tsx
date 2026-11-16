"use client";

import type { ComponentProps } from "react";
import { LoaderCircle, Wand } from "lucide-react";
import { Button } from "@/components/ui/Button";

type AiButtonProps = Omit<ComponentProps<typeof Button>, "children"> & {
  pending: boolean;
  label: string;
  pendingLabel?: string;
};

export function AiButton({ pending, label, pendingLabel, disabled, ...props }: AiButtonProps) {
  return (
    <Button type="button" disabled={pending || disabled} {...props}>
      {pending ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <Wand className="size-4" aria-hidden />}
      {pending && pendingLabel ? pendingLabel : label}
    </Button>
  );
}
