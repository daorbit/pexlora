import type { ReactNode } from "react";
import Image from "next/image";
import { Check, ImageIcon, Upload } from "lucide-react";
import { stepsDemo } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { cleanTagDelays, readTagDelays, stepPhaseDelays, tagValueTones } from "@/components/landing/steps/step-timing";

const sceneClass = "absolute inset-0 p-4 motion-safe:animate-step-scene sm:p-6";

function DemoPhoto({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-fill", className)}>
      <Image src={stepsDemo.photo} alt={stepsDemo.photoAlt} fill sizes="(min-width: 1024px) 240px, 40vw" className="object-cover" />
      {children}
    </div>
  );
}

function SceneLayout({ photo, children }: { photo: ReactNode; children: ReactNode }) {
  return (
    <div className="grid h-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3 sm:gap-5">
      {photo}
      <ul className="flex min-w-0 flex-col justify-center gap-2 sm:gap-2.5">{children}</ul>
    </div>
  );
}

type TagRowProps = {
  tag: (typeof stepsDemo.tags)[number];
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
};

function TagRow({ tag, className, contentClassName, children }: TagRowProps) {
  return (
    <li className={cn("relative rounded-xl bg-background px-3 py-2 sm:px-3.5 sm:py-2.5", className)}>
      <div className={cn("flex flex-col gap-1", contentClassName)}>
        <span className="truncate font-mono text-[10.5px] text-tertiary sm:text-[11.5px]" translate="no">
          {tag.key}
        </span>
        <span
          className={cn("self-start truncate rounded-md px-1.5 py-0.5 font-mono text-[11px] font-semibold sm:text-[12.5px]", tagValueTones[tag.tone])}
          translate="no"
        >
          {tag.value}
        </span>
      </div>
      {children}
    </li>
  );
}

export function DropScene() {
  return (
    <div className={cn(sceneClass, "motion-reduce:hidden", stepPhaseDelays[0])}>
      <div
        className={cn(
          "flex h-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border-strong motion-safe:animate-step-zone",
          stepPhaseDelays[0],
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl bg-surface p-2 pr-4 ring-1 ring-separator shadow-[0_18px_40px_-18px_rgb(16_18_13/0.45)] motion-safe:animate-step-fall",
            stepPhaseDelays[0],
          )}
        >
          <DemoPhoto className="size-12 rounded-xl sm:size-14" />
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold" translate="no">
              {stepsDemo.file}
            </span>
            <span className="text-[12px] text-tertiary">{stepsDemo.fileMeta}</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-secondary">
          <Upload className="size-3.5" aria-hidden />
          {stepsDemo.dropHint}
        </span>
      </div>
    </div>
  );
}

export function ReadScene() {
  return (
    <div className={cn(sceneClass, "motion-reduce:hidden", stepPhaseDelays[1])}>
      <SceneLayout
        photo={
          <DemoPhoto className="h-full">
            <span
              className={cn(
                "absolute inset-x-0 h-0.5 bg-primary shadow-[0_0_0_1px_rgb(0_0_0/0.15)] motion-safe:animate-step-sweep",
                stepPhaseDelays[1],
              )}
              aria-hidden
            />
          </DemoPhoto>
        }
      >
        {stepsDemo.tags.map((tag, index) => (
          <TagRow key={tag.key} tag={tag} className={cn("motion-safe:animate-step-tag", readTagDelays[index])} />
        ))}
      </SceneLayout>
    </div>
  );
}

export function CleanScene() {
  return (
    <div className={cn(sceneClass, stepPhaseDelays[2])}>
      <SceneLayout
        photo={
          <DemoPhoto className="h-full">
            <span
              className={cn(
                "absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[11px] font-semibold text-white motion-safe:animate-step-unpop motion-reduce:hidden",
                stepPhaseDelays[2],
              )}
            >
              <ImageIcon className="size-3" aria-hidden />
              {stepsDemo.tagCount}
            </span>
            <span
              className={cn(
                "absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[11px] font-bold text-primary-foreground motion-safe:animate-step-pop",
                stepPhaseDelays[2],
              )}
            >
              <Check className="size-3" strokeWidth={3} aria-hidden />
              {stepsDemo.cleanBadge}
            </span>
          </DemoPhoto>
        }
      >
        {stepsDemo.tags.map((tag, index) => (
          <TagRow key={tag.key} tag={tag} contentClassName={cn("motion-safe:animate-step-dim", cleanTagDelays[index])}>
            <span
              className={cn(
                "absolute inset-x-3 top-1/2 h-[3px] origin-left rounded-full bg-primary motion-safe:animate-step-strike",
                cleanTagDelays[index],
              )}
              aria-hidden
            />
          </TagRow>
        ))}
      </SceneLayout>
    </div>
  );
}
