"use client";

import { RotateCcw } from "lucide-react";
import { stepsCopy } from "@/content/workspace";
import { Button } from "@/components/ui/Button";

export function StartOverButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="secondary" size="sm" onClick={onClick} className="motion-safe:animate-fade-in">
      <RotateCcw className="size-3.5" aria-hidden />
      {stepsCopy.startOver}
    </Button>
  );
}
