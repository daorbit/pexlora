import { Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type AddTileProps = {
  label: string;
  hint?: string;
  disabled: boolean;
  onAdd: () => void;
  className?: string;
};

export function AddTile({ label, hint, disabled, onAdd, className }: AddTileProps) {
  return (
    <li className={cn("flex", className)}>
      <button
        type="button"
        onClick={onAdd}
        disabled={disabled}
        className="group/add flex min-h-44 w-full flex-col items-center justify-center gap-2.5 rounded-2xl border-[1.5px] border-dashed border-border-strong bg-surface p-4 text-sm font-semibold text-secondary transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-fill text-foreground transition-transform duration-300 group-hover/add:rotate-90 group-hover/add:bg-primary">
          <Plus className="size-5" aria-hidden />
        </span>
        {label}
        {hint && <span className="font-mono text-[11px] font-normal tracking-[0.04em] text-tertiary uppercase">{hint}</span>}
      </button>
    </li>
  );
}
