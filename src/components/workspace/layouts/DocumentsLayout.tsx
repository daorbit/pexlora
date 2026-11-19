"use client";

import { useCallback, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { batchTitleCopy, documentsCopy, dropzoneOverrides, panelNotes, queueCopy } from "@/content/workspace";
import { useWorkspacePerks } from "@/hooks/useWorkspacePerks";
import { describeAccepted } from "@/lib/files/detect";
import { formatBytes } from "@/lib/utils/format-bytes";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { DriveImportButton } from "@/components/drive/DriveImportButton";
import { ActionBar } from "@/components/workspace/ActionBar";
import { FileRow } from "@/components/workspace/FileRow";
import { PanelChecklist } from "@/components/workspace/PanelChecklist";
import { SettingsPanel } from "@/components/workspace/SettingsPanel";
import { DocumentCard } from "@/components/workspace/documents/DocumentCard";
import { PageOrderStrip } from "@/components/workspace/documents/PageOrderStrip";
import { AddTile } from "@/components/workspace/gallery/AddTile";
import { DropCard } from "@/components/workspace/layouts/DropCard";
import { ResultExtras } from "@/components/workspace/layouts/ResultExtras";
import { mobileActionBar, workspaceCard } from "@/components/workspace/layouts/styles";
import type { LayoutProps } from "@/components/workspace/layouts/types";

export function DocumentsLayout({ controller, panelFooter }: LayoutProps) {
  const { tool, action, queue, picker, isDragging, dropProps, hasItems } = controller;
  const perks = useWorkspacePerks();
  const [pageCounts, setPageCounts] = useState<Record<string, number>>({});
  const onPages = useCallback((id: string, pages: number) => {
    setPageCounts((current) => (current[id] === pages ? current : { ...current, [id]: pages }));
  }, []);

  const pending = queue.items.filter((item) => item.status !== "done");
  const finished = queue.items.filter((item) => item.status === "done");
  const documents = useMemo(
    () => pending.filter((item) => item.status !== "error").map((item) => ({ id: item.id, name: item.file.name, pages: pageCounts[item.id] ?? 0 })),
    [pending, pageCounts],
  );
  const totalPages = documents.reduce((sum, doc) => sum + doc.pages, 0);
  const counted = documents.every((doc) => doc.pages > 0);
  const pendingBytes = pending.reduce((sum, item) => sum + item.file.size, 0);
  const note = panelNotes[tool];

  const actionBar = (className: string) =>
    action && (
      <ActionBar
        label={action.label}
        readyCount={queue.readyCount}
        doneCount={queue.doneItems.length}
        hasItems={hasItems}
        isProcessing={queue.isProcessing}
        disabled={Boolean(controller.optionsError)}
        quotaRemaining={queue.quotaRemaining}
        downloadAllLabel={controller.downloadAllLabel}
        results={controller.results}
        onRun={controller.run}
        onDownloadAll={controller.downloadAll}
        className={className}
      />
    );

  return (
    <div {...dropProps} className="grid grid-cols-1 items-start gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <input {...picker.inputProps} />
      <p role="status" className="sr-only">
        {queue.isProcessing ? batchTitleCopy.working(controller.batchTotal) : ""}
      </p>

      <div className="flex min-w-0 flex-col gap-3 lg:self-stretch">
        <UpsellAlert message={queue.notice?.message ?? null} upsell={queue.notice?.upsell ?? null} />
        {finished.length > 0 && (
          <ul className={cn("flex flex-col gap-1 p-2.5", workspaceCard)}>
            {finished.map((item) => (
              <FileRow key={item.id} item={item} onRemove={queue.remove} disabled={queue.isProcessing} onDevice />
            ))}
          </ul>
        )}
        {pending.length > 0 ? (
          <section
            aria-label={documentsCopy.title(pending.length)}
            className={cn(
              "flex flex-col gap-3 p-3 ring-1 ring-transparent transition-[box-shadow,scale] duration-300 sm:gap-4 sm:p-5",
              workspaceCard,
              isDragging && "ring-foreground motion-safe:scale-[1.003]",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-[15px] font-semibold">
                {documentsCopy.title(pending.length)}{" "}
                {pending.length > 1 && <span className="font-medium text-tertiary">{documentsCopy.reorder}</span>}
              </h2>
              <div className="flex items-center gap-1">
                <Button variant="nav" className="px-2 text-[13px]" onClick={controller.clearAll} disabled={queue.isProcessing}>
                  {queueCopy.clearAll}
                </Button>
                <DriveImportButton
                  variant="icon"
                  onFiles={controller.importFiles}
                  accept={controller.accept}
                  disabled={!queue.canAddMore || queue.isProcessing}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={picker.open}
                  disabled={!queue.canAddMore || queue.isProcessing}
                  className="border-transparent bg-fill hover:bg-fill-strong"
                >
                  <Plus className="size-4" aria-hidden />
                  {documentsCopy.addPdfs}
                </Button>
              </div>
            </div>
            <ol className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 xl:grid-cols-4">
              {pending.map((item, index) => (
                <DocumentCard
                  key={item.id}
                  item={item}
                  index={index}
                  last={index === pending.length - 1}
                  disabled={queue.isProcessing}
                  onMove={queue.move}
                  onRemove={queue.remove}
                  onPages={onPages}
                />
              ))}
              {queue.canAddMore && (
                <AddTile
                  label={documentsCopy.dropAnother}
                  hint={describeAccepted(controller.accepts, controller.localCapable, perks, undefined, controller.formats)}
                  disabled={queue.isProcessing}
                  onAdd={picker.open}
                />
              )}
            </ol>
          </section>
        ) : (
          !finished.length && <DropCard controller={controller} override={dropzoneOverrides[tool]} stretch />
        )}
      </div>

      <SettingsPanel>
        {pending.length > 0 ? (
          <div className="flex flex-col gap-1 motion-safe:animate-fade-up">
            <span className="text-xs font-semibold tracking-[0.08em] text-tertiary uppercase">{documentsCopy.resultLabel}</span>
            <p key={totalPages} className="text-2xl font-bold tracking-[-0.02em] tabular-nums motion-safe:animate-fade-in">
              {counted ? documentsCopy.result(totalPages) : documentsCopy.resultCounting}
            </p>
            <p className="font-mono text-xs text-secondary tabular-nums">{documentsCopy.about(formatBytes(pendingBytes))}</p>
          </div>
        ) : (
          note && <PanelChecklist title={note.title} items={note.items} />
        )}
        {pending.length > 0 && <PageOrderStrip documents={documents} />}
        {pending.length > 0 && <PanelChecklist title={documentsCopy.cleanTitle} items={[documentsCopy.infoRemoved]} />}
        {actionBar(cn(hasItems && "max-lg:hidden"))}
        <ResultExtras controller={controller} />
        {panelFooter}
      </SettingsPanel>

      {hasItems && actionBar(mobileActionBar)}
    </div>
  );
}
