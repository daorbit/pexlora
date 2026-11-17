"use client";

import { previewKind } from "@/lib/files/preview-kind";
import { OptionHint } from "@/components/workspace/options/OptionsBar";
import { resultPreviewCopy } from "@/content/workspace";
import { ImageResultViewer } from "@/components/workspace/preview/ImageResultViewer";
import { MediaResultViewer } from "@/components/workspace/preview/MediaResultViewer";
import { PdfResultViewer } from "@/components/workspace/preview/PdfResultViewer";
import { ZipResultViewer } from "@/components/workspace/preview/ZipResultViewer";
import type { PreviewProps } from "@/components/workspace/preview/types";

export function ResultPreview({ nested = false, ...props }: PreviewProps & { nested?: boolean }) {
  const kind = previewKind(props.blob, props.name);

  switch (kind) {
    case "pdf":
      return <PdfResultViewer {...props} />;
    case "image":
      return <ImageResultViewer {...props} />;
    case "video":
    case "audio":
      return <MediaResultViewer {...props} kind={kind} />;
    case "zip":
      return nested ? <OptionHint>{resultPreviewCopy.noPreview}</OptionHint> : <ZipResultViewer {...props} />;
    default:
      return <OptionHint>{resultPreviewCopy.noPreview}</OptionHint>;
  }
}
