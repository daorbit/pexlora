"use client";

import { batchTitleCopy, dropzoneOverrides, panelNotes } from "@/content/workspace";
import { isLocalFormat } from "@/lib/files/detect";
import { cn } from "@/lib/utils/cn";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { ImportSources } from "@/components/import/ImportSources";
import { StepsBar } from "@/components/workspace/steps/StepsBar";
import { ActionBar } from "@/components/workspace/ActionBar";
import { ConversionSummary } from "@/components/workspace/ConversionSummary";
import { FileRow } from "@/components/workspace/FileRow";
import { FilesCard } from "@/components/workspace/FilesCard";
import { PanelChecklist } from "@/components/workspace/PanelChecklist";
import { ResultSummary } from "@/components/workspace/ResultSummary";
import { SettingsPanel } from "@/components/workspace/SettingsPanel";
import { ToolOptionsBar } from "@/components/workspace/options/ToolOptionsBar";
import { alwaysStagedTools, ToolStage } from "@/components/workspace/stage/ToolStage";
import { DropCard } from "@/components/workspace/layouts/DropCard";
import { ResultExtras } from "@/components/workspace/layouts/ResultExtras";
import { mobileActionBar } from "@/components/workspace/layouts/styles";
import type { LayoutProps } from "@/components/workspace/layouts/types";

export function RowsLayout({ controller, conversion, panelFooter }: LayoutProps) {
  const { tool, action, queue, options, changeOptions, picker, isDragging, dropProps, hasItems, localCapable } = controller;
  const hasPanel = Boolean(action || panelFooter);
  const note = panelNotes[tool];
  const staged = alwaysStagedTools.includes(tool);

  const actionBar = (className: string) =>
    action && (
      <ActionBar
        label={action.label}
        note={action.note}
        readyCount={queue.readyCount}
        doneCount={queue.doneItems.length}
        totalCount={controller.batchTotal}
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
    <div {...dropProps} className={cn("grid grid-cols-1 items-start gap-3 sm:gap-4", hasPanel && "lg:grid-cols-[minmax(0,1fr)_340px]")}>
      <input {...picker.inputProps} />
      <p role="status" className="sr-only">
        {queue.isProcessing ? batchTitleCopy.working(controller.batchTotal) : ""}
      </p>

      <div className="flex min-w-0 flex-col gap-3 lg:self-stretch">
        <UpsellAlert message={queue.notice?.message ?? null} upsell={queue.notice?.upsell ?? null} />
        {action && <StepsBar controller={controller} />}
        {hasItems ? (
          <FilesCard
            fileCount={queue.items.length}
            totalBytes={controller.totalBytes}
            doneCount={queue.doneItems.length}
            isDragging={isDragging}
            canAddMore={queue.canAddMore}
            disabled={queue.isProcessing}
            onAdd={picker.open}
            onClear={controller.clearAll}
            importSlot={
              <ImportSources
                size="sm"
                onFiles={controller.importFiles}
                accept={controller.accept}
                disabled={!queue.canAddMore || queue.isProcessing}
                className="max-sm:hidden"
              />
            }
          >
            {queue.items.map((item, index) => (
              <FileRow
                key={item.id}
                item={item}
                comparable={action?.compare}
                compareOpen={index === 0}
                onRemove={queue.remove}
                disabled={queue.isProcessing}
                onDevice={localCapable && isLocalFormat(item.format) && !item.result?.uploaded}
                onMove={action?.orderable && queue.items.length > 1 ? queue.move : undefined}
                position={{ first: index === 0, last: index === queue.items.length - 1 }}
              />
            ))}
          </FilesCard>
        ) : (
          <DropCard
            controller={controller}
            override={dropzoneOverrides[tool]}
            short={staged}
            stretch={!staged && hasPanel}
          />
        )}
        {!conversion && (
          <ToolStage
            tool={tool}
            options={options}
            onChange={changeOptions}
            disabled={queue.isProcessing}
            sourceFile={queue.items[0]?.file}
          />
        )}
      </div>

      {hasPanel && (
        <SettingsPanel>
          {conversion ? (
            <ConversionSummary conversion={conversion} />
          ) : (
            <ToolOptionsBar
              tool={tool}
              options={options}
              onChange={changeOptions}
              disabled={queue.isProcessing}
              sourceFile={queue.items[0]?.file}
            />
          )}
          {note && <PanelChecklist title={note.title} items={note.items} />}
          {action && !queue.isProcessing && queue.doneItems.length > 0 && (
            <ResultSummary items={queue.doneItems} doneLabel={action.doneLabel} />
          )}
          {actionBar(cn(hasItems && "max-lg:hidden"))}
          <ResultExtras controller={controller} />
          {panelFooter}
        </SettingsPanel>
      )}

      {hasItems && actionBar(mobileActionBar)}
    </div>
  );
}
