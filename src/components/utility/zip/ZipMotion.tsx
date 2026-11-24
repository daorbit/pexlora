import { cn } from "@/lib/utils/cn";

const sheets = [
  "left-5 [--zip-delay:-1.2s] [--zip-tilt:-12deg]",
  "left-12 [--zip-delay:-0.6s] [--zip-tilt:2deg]",
  "left-19 [--zip-delay:0s] [--zip-tilt:13deg]",
];

const teeth = ["top-2", "top-5.5", "top-9", "top-12.5"];

type ZipMotionProps = { direction: "in" | "out"; className?: string };

export function ZipMotion({ direction, className }: ZipMotionProps) {
  return (
    <span aria-hidden className={cn("relative block h-34 w-36 shrink-0", className)}>
      {sheets.map((sheet) => (
        <span
          key={sheet}
          className={cn(
            "absolute top-8 flex h-15 w-12 flex-col gap-1.5 rounded-lg border border-border-strong bg-surface p-2",
            direction === "out" ? "motion-safe:animate-zip-out" : "motion-safe:animate-zip-in",
            sheet,
          )}
        >
          <span className="h-1 w-full rounded-full bg-fill-strong" />
          <span className="h-1 w-3/4 rounded-full bg-fill-strong" />
          <span className="h-1 w-1/2 rounded-full bg-fill-strong" />
        </span>
      ))}
      <span className="absolute inset-x-0 bottom-0 h-20 rounded-2xl bg-primary">
        {teeth.map((tooth, index) => (
          <span
            key={tooth}
            className={cn("absolute h-2.5 w-2 rounded-[3px] bg-primary-foreground/25", tooth, index % 2 ? "left-1/2" : "right-1/2")}
          />
        ))}
        <span className="absolute top-1.5 left-1/2 -ml-2.5 flex h-7 w-5 items-end justify-center rounded-md bg-primary-foreground pb-1.5 motion-safe:animate-zip-pull">
          <span className="size-2 rounded-[3px] bg-primary" />
        </span>
      </span>
    </span>
  );
}
