"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { aiCopy } from "@/content/ai";
import { Button } from "@/components/ui/Button";

export function CopyButton({ value, label = aiCopy.copy }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
  };

  return (
    <Button type="button" variant="secondary" size="sm" onClick={copy}>
      {copied ? <Check className="size-3.5 motion-safe:animate-pop" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      {copied ? aiCopy.copied : label}
    </Button>
  );
}
