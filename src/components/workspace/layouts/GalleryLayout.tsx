"use client";

import { CircleAlert } from "lucide-react";
import { batchTitleCopy, dropzoneOverrides, galleryCopy, queueCopy, stepsCopy } from "@/content/workspace";
import { useWorkspacePerks } from "@/hooks/useWorkspacePerks";
import { describeAccepted } from "@/lib/files/detect";
import { ALPHA_INPUT_FORMATS, FORMAT_LABELS } from "@/lib/image/formats";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { ImportSources } from "@/components/import/ImportSources";
import { Dropzone } from "@/components/workspace/Dropzone";
import { AddTile } from "@/components/workspace/gallery/AddTile";
import { ConversionPair } from "@/components/workspace/gallery/ConversionPair";
import { FormatSwitch } from "@/components/workspace/gallery/FormatSwitch";
import { GalleryBar } from "@/components/workspace/gallery/GalleryBar";
import { GalleryCard } from "@/components/workspace/gallery/GalleryCard";
import { ResultExtras } from "@/components/workspace/layouts/ResultExtras";
import { workspaceCard } from "@/components/workspace/layouts/styles";
import type { LayoutProps } from "@/components/workspace/layouts/types";
import { StepsHeader } from "@/components/workspace/steps/StepsHeader";

export function GalleryLayout({ controller, conversion, panelFooter }: LayoutProps) {
  const { tool, queue, options, picker, isDragging, dropProps, hasItems } = controller;
  const perks = useWorkspacePerks();
  const format = options.convert.format;
  const target = conversion?.toLabel ?? FORMAT_LABELS[format];
  const losesTransparency = format === "jpeg" && queue.items.some((item) => ALPHA_INPUT_FORMATS.includes(item.format.id));

  const aside = conversion ? (
    <ConversionPair conversion={conversion} />
  ) : (
    <FormatSwitch
      value={format}
      onChange={(next) => controller.changeOptions({ ...options, convert: { format: next } })}
      disabled={queue.isProcessing}
    />
  );

  return (
    <div {...dropProps} className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 sm:gap-4">
      <input {...picker.inputProps} />
      <p role="status" className="sr-only">
        {queue.isProcessing ? batchTitleCopy.working(controller.batchTotal) : ""}
      </p>
      <UpsellAlert message={queue.notice?.message ?? null} upsell={queue.notice?.upsell ?? null} />

      <section
        className={cn(
          workspaceCard,
          "flex flex-col ring-1 ring-transparent transition-[box-shadow,scale] duration-300",
          isDragging && "ring-foreground motion-safe:scale-[1.003]",
        )}
      >
        <StepsHeader
          controller={controller}
          chooseLabel={conversion ? undefined : stepsCopy.chooseFormat}
          doneLabel={stepsCopy.convertedTo(target)}
          aside={aside}
        />

        {losesTransparency && (
          <p className="mx-4 mt-4 flex items-center gap-2 rounded-xl bg-warning-soft px-3 py-2.5 text-[13px] text-warning motion-safe:animate-fade-up motion-safe:[animation-duration:0.35s] sm:mx-5">
            <CircleAlert className="size-4 shrink-0" aria-hidden />
            {galleryCopy.noTransparency}
          </p>
        )}

        {hasItems ? (
          <>
            <div className="flex flex-col gap-3 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[15px] font-semibold">
                  {galleryCopy.files}{" "}
                  <span className="font-medium text-tertiary tabular-nums">{galleryCopy.count(queue.items.length, perks.filesPerBatch)}</span>
                </h2>
                <div className="flex items-center gap-1">
                  <Button variant="nav" className="px-2 text-[13px]" onClick={controller.clearAll} disabled={queue.isProcessing}>
                    {queueCopy.clearAll}
                  </Button>
                  <ImportSources
                    size="sm"
                    onFiles={controller.importFiles}
                    accept={controller.accept}
                    disabled={!queue.canAddMore || queue.isProcessing}
                    className="max-sm:hidden"
                  />
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 xl:grid-cols-5">
                {queue.items.map((item) => (
                  <GalleryCard key={item.id} item={item} target={target} disabled={queue.isProcessing} onRemove={queue.remove} />
                ))}
                {queue.canAddMore && (
                  <AddTile
                    label={galleryCopy.addMore}
                    hint={describeAccepted(controller.accepts, controller.localCapable, perks, undefined, controller.formats)}
                    disabled={queue.isProcessing}
                    onAdd={picker.open}
                  />
                )}
              </ul>
            </div>
            <GalleryBar
              controller={controller}
              target={target}
              className="sticky bottom-(--bottom-bar,0px) z-10 rounded-b-[20px] border-t border-separator bg-subtle/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:rounded-b-[22px] sm:px-5 sm:py-3.5"
            />
          </>
        ) : (
          <div className="p-2.5 sm:p-3.5">
            <Dropzone
              accepts={controller.accepts}
              formats={controller.formats}
              localCapable={controller.localCapable}
              isDragging={isDragging}
              onBrowse={picker.open}
              onFiles={controller.importFiles}
              onSample={controller.addSample}
              override={dropzoneOverrides[tool]}
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
