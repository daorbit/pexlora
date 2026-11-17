"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { acceptAttribute } from "@/config/file-formats";
import type { SampleImage } from "@/config/samples";
import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import { useFileDrop } from "@/hooks/useFileDrop";
import { useFilePicker } from "@/hooks/useFilePicker";
import { fetchAsFile } from "@/lib/utils/fetch-file";
import { handOffFiles } from "@/lib/utils/file-handoff";
import { Dropzone } from "@/components/workspace/Dropzone";
import { WorkspaceFrame } from "@/components/workspace/WorkspaceFrame";
import { toolBehaviors } from "@/components/workspace/toolBehaviors";

const TOOL: WorkspaceToolSlug = "remove-metadata";
const { accepts, localCapable } = toolBehaviors[TOOL];

export function HeroUpload() {
  const router = useRouter();
  const accept = useMemo(() => acceptAttribute(accepts), []);

  const openTool = useCallback(
    (files: File[]) => {
      handOffFiles(TOOL, files);
      router.push(getWorkspaceTool(TOOL).href);
    },
    [router],
  );

  const picker = useFilePicker(openTool, accept);
  const { isDragging, dropProps } = useFileDrop(openTool);

  const addSample = useCallback(
    async (sample: SampleImage) => openTool([await fetchAsFile(sample.src, sample.fileName)]),
    [openTool],
  );

  return (
    <div {...dropProps} className="w-full">
      <input {...picker.inputProps} />
      <WorkspaceFrame className="rounded-[22px] p-1.5">
        <Dropzone
          accepts={accepts}
          localCapable={localCapable}
          isDragging={isDragging}
          onBrowse={picker.open}
          onSample={addSample}
          compact
        />
      </WorkspaceFrame>
    </div>
  );
}
