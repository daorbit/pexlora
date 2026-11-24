import { Check, MapPin } from "lucide-react";
import { useCaseScenes } from "@/content/social-proof";
import { cn } from "@/lib/utils/cn";
import { SwapStack } from "@/components/ui/SwapStack";
import { SceneFrame, ScenePhoto, sceneChip } from "@/components/landing/use-cases/SceneFrame";

const rowDelays = ["[--case-delay:0s]", "[--case-delay:0.35s]", "[--case-delay:0.7s]"];

export function TravelScene() {
  const { before, after } = useCaseScenes.travel;

  return (
    <SceneFrame>
      <ScenePhoto src="/samples/difference/travel.jpg" className="object-[50%_35%]" />
      <SwapStack
        className="absolute bottom-3 left-3 p-0.5"
        first={
          <span className={cn(sceneChip, "bg-white text-[#b42318]")}>
            <MapPin className="size-3.5" strokeWidth={2.4} />
            {before}
          </span>
        }
        second={
          <span className={cn(sceneChip, "bg-primary text-primary-foreground")}>
            <Check className="size-3.5" strokeWidth={3} />
            {after}
          </span>
        }
      />
    </SceneFrame>
  );
}

export function ViewerScene() {
  return (
    <SceneFrame className="grid grid-cols-[42%_minmax(0,1fr)]">
      <div className="relative overflow-hidden">
        <ScenePhoto src="/samples/difference/pet.jpg" />
        <span className="absolute inset-x-0 h-0.5 bg-primary motion-safe:animate-scan-y" />
      </div>
      <ul className="flex flex-col justify-center gap-2.5 p-4">
        {useCaseScenes.viewer.map((row, index) => (
          <li
            key={row.label}
            className={cn("flex flex-col rounded-xl bg-surface px-3 py-1.5 shadow-thumb motion-safe:animate-case-row", rowDelays[index])}
          >
            <span className="text-[10.5px] text-tertiary">{row.label}</span>
            <span className="truncate font-mono text-[12px] font-medium">{row.value}</span>
          </li>
        ))}
      </ul>
    </SceneFrame>
  );
}

export function CompressScene() {
  const { from, to } = useCaseScenes.compress;

  return (
    <SceneFrame>
      <ScenePhoto src="/samples/difference/product.jpg" />
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl bg-surface/95 px-3 py-2.5 shadow-thumb">
        <span className="h-2 flex-1 overflow-hidden rounded-full bg-fill-strong">
          <span className="block h-full origin-left scale-x-20 rounded-full bg-primary motion-safe:animate-case-shrink" />
        </span>
        <SwapStack
          className="w-14 text-[13px] font-bold tabular-nums"
          first={<span>{from}</span>}
          second={<span className="text-accent-text">{to}</span>}
        />
      </div>
    </SceneFrame>
  );
}
