"use client";

import { Download, LoaderCircle } from "lucide-react";
import { zipCreateCopy } from "@/content/utility-tools";
import { queueCopy } from "@/content/workspace";
import type { ZipBuilder } from "@/hooks/useZipBuilder";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { SaveToDriveButton } from "@/components/drive/SaveToDriveButton";

const bigButton = "h-13 w-full rounded-2xl";

export function ZipActions({ builder, className }: { builder: ZipBuilder; className?: string }) {
  const { files, result, working, tooLarge, fileName, create, save } = builder;

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {result ? (
        <>
          <Button size="xl" onClick={save} className={cn(bigButton, "motion-safe:animate-pop")}>
            <Download className="size-4.5" aria-hidden />
            {zipCreateCopy.save}
          </Button>
          <SaveToDriveButton size="xl" files={[{ blob: result, name: fileName }]} className={bigButton} />
        </>
      ) : (
        <Button
          size="xl"
          arrow={!working}
          onClick={create}
          disabled={!files.length || working || tooLarge}
          className={cn(bigButton, "transition-transform motion-safe:active:scale-[0.98]")}
        >
          {working && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
          {files.length ? zipCreateCopy.action : queueCopy.addToStart}
        </Button>
      )}
    </div>
  );
}
