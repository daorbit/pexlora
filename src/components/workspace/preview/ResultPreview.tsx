"use client";

import { previewKind } from "@/lib/files/preview-kind";
import { OptionHint } from "@/components/workspace/options/OptionsBar";
import { resultPreviewCopy } from "@/content/workspace";
import { ImageResultViewer } from "@/components/workspace/preview/ImageResultViewer";
import { MediaResultViewer } from "@/components/workspace/preview/MediaResultViewer";
import { PdfResultViewer } from "@/components/workspace/preview/PdfResultViewer";
import { SheetResultViewer } from "@/components/workspace/preview/SheetResultViewer";
import { TextResultViewer } from "@/components/workspace/preview/TextResultViewer";
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
    case "text":
      return <TextResultViewer {...props} />;
    case "sheet":
      return <SheetResultViewer {...props} />;
    case "zip":
      return nested ? <OptionHint>{resultPreviewCopy.noPreview}</OptionHint> : <ZipResultViewer {...props} />;
    default:
      return <OptionHint>{resultPreviewCopy.noPreview}</OptionHint>;
  }
}
