import { stepsDemo } from "@/content/landing";
import { cn } from "@/lib/utils/cn";

const frame = "relative h-28 overflow-hidden rounded-2xl bg-background sm:h-36";

const fieldTones = {
  ai: "font-semibold text-warning",
  location: "font-semibold text-danger",
  plain: "text-tertiary",
};

export function DropVisual() {
  return (
    <div className={cn(frame, "flex items-center justify-center border-[1.5px] border-dashed border-border-strong")}>
      <span className="inline-flex items-center gap-2 rounded-xl bg-surface py-2 pr-3 pl-2 text-[13px] font-semibold ring-1 ring-separator shadow-[0_8px_20px_-10px_rgb(16_18_13/0.35)] motion-safe:animate-file-drop">
        <span className="size-5 rounded-md bg-warning" aria-hidden />
        {stepsDemo.file}
        <span className="font-normal text-tertiary">{stepsDemo.fileMeta}</span>
      </span>
    </div>
  );
}

export function ReadVisual() {
  return (
    <div className={cn(frame, "flex flex-col justify-center gap-2 px-4 font-mono text-[12px] sm:text-[12.5px]")}>
      <span className="absolute inset-x-0 h-0.5 bg-primary motion-safe:animate-scan-y" aria-hidden />
      {stepsDemo.fields.map((field) => (
        <span key={field.key} className="flex justify-between gap-3">
          <span>{field.key}</span>
          <span className={cn("font-sans", fieldTones[field.tone])}>{field.label}</span>
        </span>
      ))}
    </div>
  );
}

export function CleanVisual() {
  return (
    <div className={cn(frame, "flex flex-col justify-center gap-3 px-4")}>
      <span className="flex items-center justify-between gap-3">
        <span className="truncate text-[13px] font-semibold">{stepsDemo.cleanFile}</span>
        <span className="shrink-0 rounded-md bg-success-soft px-2 py-0.5 text-xs font-semibold text-success">
          {stepsDemo.cleanBadge}
        </span>
      </span>
      <span className="h-1.5 overflow-hidden rounded-full bg-fill-strong">
        <span className="block h-full w-full rounded-full bg-foreground motion-safe:animate-fill-x" />
      </span>
    </div>
  );
}
