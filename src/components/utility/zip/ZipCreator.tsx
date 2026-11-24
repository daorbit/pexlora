"use client";

import { X } from "lucide-react";
import { zipCreateCopy } from "@/content/utility-tools";
import { useFileInput } from "@/hooks/useFileInput";
import { useZipBuilder } from "@/hooks/useZipBuilder";
import { Button } from "@/components/ui/Button";
import { ImportSources } from "@/components/import/ImportSources";
import { FilesCard } from "@/components/workspace/FilesCard";
import { mobileActionBar } from "@/components/workspace/layouts/styles";
import { ANIMATED_ROWS } from "@/components/utility/zip/row-delays";
import { ZipActions } from "@/components/utility/zip/ZipActions";
import { ZipCreatePanel } from "@/components/utility/zip/ZipCreatePanel";
import { ZipDropCard } from "@/components/utility/zip/ZipDropCard";
import { ZipFileRow } from "@/components/utility/zip/ZipFileRow";
import { ZipSteps } from "@/components/utility/zip/ZipSteps";

export function ZipCreator() {
  const builder = useZipBuilder();
  const { files, working, phase, add } = builder;
  const { open, inputProps, isDragging, dropProps } = useFileInput(add, "", !working);
  const hasFiles = files.length > 0;

  return (
    <div {...dropProps} className="flex flex-col gap-3 text-left sm:gap-4">
      <input {...inputProps} />
      <ZipSteps
        mode="create"
        phase={phase}
        fileCount={files.length}
        doneCount={builder.zippedCount}
        total={files.length}
        chooseLabel={zipCreateCopy.step}
        doneLabel={zipCreateCopy.stepDone}
        onStartOver={builder.clear}
      />
      <div className="grid grid-cols-1 items-start gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-w-0 flex-col lg:min-h-105 lg:self-stretch">
          {hasFiles ? (
            <FilesCard
              fileCount={files.length}
              totalBytes={builder.totalBytes}
              isDragging={isDragging}
              canAddMore
              disabled={working}
              onAdd={open}
              onClear={builder.clear}
              importSlot={<ImportSources size="sm" onFiles={add} accept="" disabled={working} className="max-sm:hidden" />}
            >
              {files.map((file, index) => (
                <ZipFileRow
                  key={`${file.name}-${index}`}
                  name={file.name}
                  size={file.size}
                  order={index < ANIMATED_ROWS ? index : undefined}
                  action={
                    <Button
                      variant="icon"
                      size="sm"
                      aria-label={zipCreateCopy.remove(file.name)}
                      disabled={working}
                      onClick={() => builder.removeAt(index)}
                    >
                      <X className="size-4" aria-hidden />
                    </Button>
                  }
                />
              ))}
            </FilesCard>
          ) : (
            <ZipDropCard isDragging={isDragging} onBrowse={open} onFiles={add} override={zipCreateCopy.drop} />
          )}
        </div>
        <ZipCreatePanel builder={builder} />
      </div>
      {hasFiles && <ZipActions builder={builder} className={mobileActionBar} />}
    </div>
  );
}
