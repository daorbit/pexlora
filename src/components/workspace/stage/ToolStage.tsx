"use client";

import dynamic from "next/dynamic";
import type { WorkspaceToolSlug } from "@/config/tools";
import { optionsCopy, stageCopy } from "@/content/workspace";
import { sheetLayout } from "@/lib/files/convert/sheet-layout";
import type { ToolOptions } from "@/lib/image/options";
import { StageCard } from "@/components/workspace/stage/StageCard";

const PdfPagePicker = dynamic(() => import("@/components/workspace/organize/PdfPagePicker").then((module) => module.PdfPagePicker));
const CropPreview = dynamic(() => import("@/components/workspace/stage/CropPreview").then((module) => module.CropPreview));
const PagePositionPicker = dynamic(() => import("@/components/workspace/stage/PagePositionPicker").then((module) => module.PagePositionPicker));
const SheetPreview = dynamic(() => import("@/components/workspace/stage/SheetPreview").then((module) => module.SheetPreview));
const WatermarkPreview = dynamic(() => import("@/components/workspace/stage/WatermarkPreview").then((module) => module.WatermarkPreview));

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
