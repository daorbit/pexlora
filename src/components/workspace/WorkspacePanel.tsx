"use client";

import type { ReactNode } from "react";
import type { Conversion } from "@/config/conversions";
import type { FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import { useWorkspaceController } from "@/hooks/useWorkspaceController";
import type { ToolOptions } from "@/lib/image/options";
import { DownloadGateProvider } from "@/components/workspace/DownloadGate";
import { DocumentsLayout } from "@/components/workspace/layouts/DocumentsLayout";
import { GalleryLayout } from "@/components/workspace/layouts/GalleryLayout";
import { RowsLayout } from "@/components/workspace/layouts/RowsLayout";

export type WorkspacePanelProps = {
  tool: WorkspaceToolSlug;
  accepts?: FileKind[];
  initialOptions?: Partial<ToolOptions>;
  conversion?: Conversion;
  panelFooter?: ReactNode;
};

export function WorkspacePanel({ panelFooter, ...props }: WorkspacePanelProps) {
  const controller = useWorkspaceController(props);
  const layoutProps = { controller, conversion: props.conversion, panelFooter };

  return (
    <DownloadGateProvider>
      {controller.behavior.layout === "gallery" ? (
        <GalleryLayout {...layoutProps} />
      ) : controller.behavior.layout === "documents" ? (
        <DocumentsLayout {...layoutProps} />
      ) : (
        <RowsLayout {...layoutProps} />
      )}
    </DownloadGateProvider>
  );
}
