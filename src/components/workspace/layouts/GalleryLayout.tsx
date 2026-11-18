"use client";

import { ArrowRight, CircleAlert } from "lucide-react";
import { batchTitleCopy, dropzoneOverrides, galleryCopy, queueCopy } from "@/content/workspace";
import { useWorkspacePerks } from "@/hooks/useWorkspacePerks";
import { describeAccepted } from "@/lib/files/detect";
import { ALPHA_INPUT_FORMATS, FORMAT_LABELS } from "@/lib/image/formats";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { Dropzone } from "@/components/workspace/Dropzone";
import { AddTile } from "@/components/workspace/gallery/AddTile";
import { FormatStrip } from "@/components/workspace/gallery/FormatStrip";
import { GalleryBar } from "@/components/workspace/gallery/GalleryBar";
import { GalleryCard } from "@/components/workspace/gallery/GalleryCard";
import { ResultExtras } from "@/components/workspace/layouts/ResultExtras";
import { workspaceCard } from "@/components/workspace/layouts/styles";
import type { LayoutProps } from "@/components/workspace/layouts/types";

const stepTitle = "text-[15px] font-semibold";

export function GalleryLayout({ controller, conversion, panelFooter }: LayoutProps) {
  const { tool, queue, options, picker, isDragging, dropProps, hasItems } = controller;
  const perks = useWorkspacePerks();
  const format = options.convert.format;
  const target = conversion?.toLabel ?? FORMAT_LABELS[format];
  const losesTransparency = format === "jpeg" && queue.items.some((item) => ALPHA_INPUT_FORMATS.includes(item.format.id));

  return (
    <div {...dropProps} className="flex flex-col gap-3 sm:gap-4">
      <input {...picker.inputProps} />
      <p role="status" className="sr-only">
        {queue.isProcessing ? batchTitleCopy.working(controller.batchTotal) : ""}
      </p>
      <UpsellAlert message={queue.notice?.message ?? null} upsell={queue.notice?.upsell ?? null} />

      <section
        className={cn(
          workspaceCard,
          "ring-1 ring-transparent transition-[box-shadow,scale] duration-300",
          isDragging && "ring-foreground motion-safe:scale-[1.003]",
        )}
      >
        <div className="flex flex-col gap-3 border-b border-separator p-4 sm:p-5">
          {conversion ? (
            <div className="flex flex-wrap items-center gap-3">
              <h2 className={stepTitle}>{galleryCopy.conversion}</h2>
              <span translate="no" className="notranslate inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-[15px] font-bold text-primary-foreground">
                {conversion.from}
                <ArrowRight className="size-4" aria-label="to" />
                {conversion.toLabel}
              </span>
            </div>
          ) : (
            <>
              <h2 className={stepTitle}>{galleryCopy.stepFormat}</h2>
              <FormatStrip
                value={format}
                onChange={(next) => controller.changeOptions({ ...options, convert: { format: next } })}
                disabled={queue.isProcessing}
              />
            </>
          )}
          {losesTransparency && (
            <p className="flex items-center gap-2 rounded-xl bg-warning-soft px-3 py-2.5 text-[13px] text-warning motion-safe:animate-fade-up motion-safe:[animation-duration:0.35s]">
              <CircleAlert className="size-4 shrink-0" aria-hidden />
              {galleryCopy.noTransparency}
            </p>
          )}
        </div>

        {hasItems ? (
          <>
            <div className="flex flex-col gap-3 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className={stepTitle}>
                  {conversion ? galleryCopy.files : galleryCopy.stepFiles}{" "}
                  <span className="font-medium text-tertiary tabular-nums">
                    {galleryCopy.count(queue.items.length, perks.filesPerBatch)}
                  </span>
                </h2>
                <Button variant="nav" className="px-2 text-[13px]" onClick={controller.clearAll} disabled={queue.isProcessing}>
                  {queueCopy.clearAll}
                </Button>
              </div>
              <ul className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 xl:grid-cols-4">
                {queue.items.map((item) => (
                  <GalleryCard key={item.id} item={item} target={target} disabled={queue.isProcessing} onRemove={queue.remove} />
                ))}
                {queue.canAddMore && (
                  <AddTile
                    label={galleryCopy.addMore}
                    hint={describeAccepted(controller.accepts, controller.localCapable, perks)}
                    disabled={queue.isProcessing}
                    onAdd={picker.open}
                  />
                )}
              </ul>
            </div>
            <GalleryBar
              controller={controller}
              target={target}
              className="sticky bottom-(--bottom-bar,0px) z-10 rounded-b-[20px] border-t border-separator bg-surface/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:rounded-b-[22px] sm:px-5 sm:py-3.5"
            />
          </>
        ) : (
          <div className="p-2 sm:p-2.5">
            <Dropzone
              accepts={controller.accepts}
              localCapable={controller.localCapable}
              isDragging={isDragging}
              onBrowse={picker.open}
              onSample={controller.addSample}
              override={dropzoneOverrides[tool]}
              short
            />
          </div>
        )}
      </section>

      {(panelFooter || controller.results.length > 0) && (
        <div className="grid grid-cols-1 items-start gap-3 sm:gap-4 lg:grid-cols-2">
          <ResultExtras controller={controller} />
          {panelFooter}
        </div>
      )}
    </div>
  );
}
