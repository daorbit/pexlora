import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function CompareValue({ value, pro }: { value: string | boolean; pro: boolean }) {
  if (typeof value === "string") return <>{value}</>;
  if (!value) return <Minus className="size-4 text-tertiary" aria-label="No" />;
  return (
    <span
      className={cn(
        "inline-flex size-5 items-center justify-center rounded-full",
        pro ? "bg-primary text-primary-foreground" : "bg-fill text-foreground",
      )}
    >
      <Check className="size-3" strokeWidth={3} aria-label="Yes" />
    </span>
  );
}
