"use client";

import type { DropzoneOverride } from "@/content/workspace";
import { cn } from "@/lib/utils/cn";
import { Dropzone } from "@/components/workspace/Dropzone";
import { workspaceCard } from "@/components/workspace/layouts/styles";

type ZipDropCardProps = {
  isDragging: boolean;
  onBrowse: () => void;
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  override: DropzoneOverride;
};

const noSample = () => {};

export function ZipDropCard(props: ZipDropCardProps) {
  return (
    <div className={cn("flex flex-col p-2 sm:p-2.5 lg:flex-1", workspaceCard)}>
      <Dropzone accepts={[]} localCapable onSample={noSample} className="lg:flex-1" {...props} />
    </div>
  );
}
