import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { IconComponent } from "@/components/icons/types";
import { Badge } from "@/components/ui/Badge";

type ToolCardProps = {
  icon: IconComponent;
  name: string;
  description: string;
  href?: string;
  onSelect?: () => void;
  selected?: boolean;
};

function CardBody({ icon: Icon, name, description, href, onSelect, selected }: ToolCardProps) {
  const available = Boolean(href || onSelect);

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-xl",
            available ? "bg-accent-soft text-accent-text" : "bg-fill text-secondary",
          )}
        >
          <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden />
        </span>
        {!available && <Badge>Soon</Badge>}
        {selected && (
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-3.5" strokeWidth={3} aria-hidden />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 text-left">
        <h3 className={cn("text-lg font-medium tracking-[-0.01em]", !available && "text-secondary")}>{name}</h3>
        <p className="text-sm leading-relaxed text-secondary">{description}</p>
      </div>
      {available && (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          {selected ? "Selected" : "Use tool"}
          {!selected && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />}
        </span>
      )}
    </>
  );
}

const cardClasses = "flex h-full flex-col gap-5 rounded-2xl border p-6 transition-all";
const interactiveClasses =
  "group bg-surface hover:-translate-y-0.5 hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function ToolCard(props: ToolCardProps) {
  if (props.onSelect) {
    return (
      <button
        type="button"
        onClick={props.onSelect}
        aria-pressed={props.selected}
        className={cn(
          cardClasses,
          interactiveClasses,
          props.selected ? "border-foreground ring-1 ring-foreground" : "border-separator",
        )}
      >
        <CardBody {...props} />
      </button>
    );
  }

  if (!props.href) {
    return (
      <div className={cn(cardClasses, "border-dashed border-border-strong")}>
        <CardBody {...props} />
      </div>
    );
  }

  return (
    <Link href={props.href} className={cn(cardClasses, interactiveClasses, "border-separator")}>
      <CardBody {...props} />
    </Link>
  );
}
