import { useCaseScenes } from "@/content/social-proof";
import { cn } from "@/lib/utils/cn";
import { SwapStack } from "@/components/ui/SwapStack";
import { OrbitMark } from "@/components/ai/OrbitMark";
import { SceneFrame, ScenePhoto } from "@/components/landing/use-cases/SceneFrame";

const pages = [
  "[--case-x:-84px] [--case-r:-10deg]",
  "[--case-x:84px] [--case-r:10deg]",
  "[--case-x:0px] [--case-r:0deg]",
];

const pageLines = ["w-full", "w-4/5", "w-full", "w-3/5"];

const altLines = [
  "w-full [--case-delay:0s]",
  "w-11/12 [--case-delay:0.25s]",
  "w-full [--case-delay:0.5s]",
  "w-2/3 [--case-delay:0.75s]",
];

export function FormScene() {
  const { from, to, target } = useCaseScenes.form;

  return (
    <SceneFrame className="flex items-center gap-4 p-5 sm:gap-5">
      <div className="relative h-32 w-26 shrink-0 overflow-hidden rounded-xl border-4 border-surface shadow-card">
        <ScenePhoto src="/samples/difference/selfie.jpg" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <SwapStack
          className="text-[30px] leading-tight font-extrabold tracking-[-0.04em] tabular-nums"
          first={<span className="text-tertiary">{from}</span>}
          second={<span>{to}</span>}
        />
        <span className="h-2.5 overflow-hidden rounded-full bg-fill-strong">
          <span className="block h-full origin-left scale-x-20 rounded-full bg-primary motion-safe:animate-case-shrink" />
        </span>
        <span className="text-[12px] text-secondary">{target}</span>
      </div>
    </SceneFrame>
  );
}

export function MergeScene() {
  return (
    <SceneFrame className="grid place-items-center">
      {pages.map((page, index) => (
        <span
          key={page}
          className={cn(
            "relative col-start-1 row-start-1 flex h-32 w-24 flex-col gap-2 rounded-xl border border-border-strong bg-surface p-3 shadow-card motion-safe:animate-case-merge",
            page,
          )}
        >
          <span className="w-fit rounded-md bg-[#d9392f] px-1.5 py-0.5 text-[9px] font-bold text-white">PDF</span>
          {pageLines.map((width, line) => (
            <span key={line} className={cn("h-1.5 rounded-full bg-fill-strong", width)} />
          ))}
          {index === pages.length - 1 && (
            <span className="absolute -right-3 -bottom-3 flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-thumb motion-safe:animate-case-pop">
              1
            </span>
          )}
        </span>
      ))}
    </SceneFrame>
  );
}

export function AltTextScene() {
  return (
    <SceneFrame className="grid grid-cols-[42%_minmax(0,1fr)]">
      <div className="relative overflow-hidden">
        <ScenePhoto src="/samples/difference/ai.jpg" />
      </div>
      <div className="flex flex-col justify-center gap-2.5 p-4">
        <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold">
          <span className="theme-dark flex size-7 items-center justify-center rounded-full bg-background">
            <OrbitMark size={18} className="size-4.5" />
          </span>
          {useCaseScenes.altText}
        </span>
        {altLines.map((line) => (
          <span
            key={line}
            className={cn("h-2.5 origin-left rounded-full bg-border-strong motion-safe:animate-case-type", line)}
          />
        ))}
      </div>
    </SceneFrame>
  );
}
