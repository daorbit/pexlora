"use client";

import type { DropzoneOverride } from "@/content/workspace";
import type { WorkspaceController } from "@/hooks/useWorkspaceController";
import { cn } from "@/lib/utils/cn";
import { Dropzone } from "@/components/workspace/Dropzone";
import { workspaceCard } from "@/components/workspace/layouts/styles";

type DropCardProps = {
  controller: WorkspaceController;
  override?: DropzoneOverride;
  short?: boolean;
  stretch?: boolean;
};

export function DropCard({ controller, override, short = false, stretch = false }: DropCardProps) {
  return (
    <div className={cn("flex flex-col p-2 sm:p-2.5", workspaceCard, stretch && "lg:flex-1")}>
      <Dropzone
        accepts={controller.accepts}
        formats={controller.formats}
        localCapable={controller.localCapable}
        isDragging={controller.isDragging}
        onBrowse={controller.picker.open}
        onFiles={controller.importFiles}
        onSample={controller.addSample}
        override={override}
        short={short}
        className="lg:flex-1"
      />
    </div>
  );
}
