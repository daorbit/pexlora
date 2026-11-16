import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

type RowToggleProps = { label: string; open: boolean; onToggle: () => void; icon?: LucideIcon };

export function RowToggle({ label, open, onToggle, icon: Icon }: RowToggleProps) {
  return (
    <Button variant="plain" className="mr-2 gap-1.5 text-[13px]" onClick={onToggle} aria-expanded={open}>
      {Icon && <Icon className="size-3.5" aria-hidden />}
      {label}
      <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} aria-hidden />
    </Button>
  );
}
