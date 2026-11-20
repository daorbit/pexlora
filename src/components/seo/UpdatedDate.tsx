import { factsCopy } from "@/content/facts";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format-date";

export function UpdatedDate({ date, className }: { date?: Date; className?: string }) {
  if (!date) return null;

  return (
    <p className={cn("text-[13px] text-tertiary", className)}>
      {factsCopy.updated}{" "}
      <time dateTime={date.toISOString()} className="font-medium text-secondary">
        {formatDate(date, "long")}
      </time>
    </p>
  );
}
