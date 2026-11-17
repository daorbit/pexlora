"use client";

import type { WorkspaceToolSlug } from "@/config/tools";
import { optionsCopy, stageCopy } from "@/content/workspace";
import { sheetLayout } from "@/lib/files/convert/sheet-layout";
import type { ToolOptions } from "@/lib/image/options";
import { PdfPagePicker } from "@/components/workspace/organize/PdfPagePicker";
import { CropPreview } from "@/components/workspace/stage/CropPreview";
import { PagePositionPicker } from "@/components/workspace/stage/PagePositionPicker";
import { SheetPreview } from "@/components/workspace/stage/SheetPreview";
import { StageCard } from "@/components/workspace/stage/StageCard";
import { WatermarkPreview } from "@/components/workspace/stage/WatermarkPreview";

export const alwaysStagedTools: WorkspaceToolSlug[] = ["passport-photo", "pdf-page-numbers", "pdf-watermark"];

type ToolStageProps = {
  tool: WorkspaceToolSlug;
  options: ToolOptions;
  onChange: (options: ToolOptions) => void;
  disabled: boolean;
  sourceFile?: File;
};

export function ToolStage({ tool, options, onChange, disabled, sourceFile }: ToolStageProps) {
  switch (tool) {
    case "passport-photo": {
      const layout = sheetLayout(options.passport);
      if (!layout.count) return null;
      const sheet = optionsCopy.passportSheets[options.passport.sheet].label;
      return (
        <StageCard title={stageCopy.preview} caption={optionsCopy.passportCount(layout.count, sheet)}>
          <SheetPreview layout={layout} file={sourceFile} />
        </StageCard>
      );
    }
    case "pdf-watermark":
      return (
        <StageCard title={stageCopy.preview} caption={stageCopy.samplePage}>
          <WatermarkPreview {...options.watermark} />
        </StageCard>
      );
    case "pdf-page-numbers":
      return (
        <StageCard title={stageCopy.placeNumber} caption={optionsCopy.pageNumberPickHint}>
          <PagePositionPicker
            value={options.pageNumbers.position}
            style={options.pageNumbers.style}
            disabled={disabled}
            onChange={(position) => onChange({ ...options, pageNumbers: { ...options.pageNumbers, position } })}
          />
        </StageCard>
      );
    case "crop-image":
      return sourceFile ? (
        <StageCard title={stageCopy.preview} caption={stageCopy.firstImage}>
          <CropPreview file={sourceFile} options={options.crop} />
        </StageCard>
      ) : null;
    case "organize-pdf":
      return sourceFile ? (
        <StageCard title={stageCopy.pages} plain>
          <PdfPagePicker
            file={sourceFile}
            spec={options.organize.pages}
            disabled={disabled}
            onChange={(pages) => onChange({ ...options, organize: { pages } })}
          />
        </StageCard>
      ) : null;
    default:
      return null;
  }
}
