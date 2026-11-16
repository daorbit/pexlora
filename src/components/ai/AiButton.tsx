"use client";

import type { ComponentProps } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OrbitMark } from "@/components/ai/OrbitMark";

type AiButtonProps = Omit<ComponentProps<typeof Button>, "children"> & {
  pending: boolean;
  label: string;
  pendingLabel?: string;
};

export function AiButton({ pending, label, pendingLabel, disabled, ...props }: AiButtonProps) {
  return (
    <Button type="button" disabled={pending || disabled} {...props}>
      {pending ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <OrbitMark size={22} className="-my-1 size-5.5" />}
      {pending && pendingLabel ? pendingLabel : label}
    </Button>
  );
}
