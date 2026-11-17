"use client";

import type { WorkspaceToolSlug } from "@/config/tools";
import type { ToolOptions } from "@/lib/image/options";
import { CompressOptionsBar } from "@/components/workspace/options/CompressOptionsBar";
import { ConvertOptionsBar } from "@/components/workspace/options/ConvertOptionsBar";
import { CropOptionsBar } from "@/components/workspace/options/CropOptionsBar";
import { FormPhotoOptionsBar } from "@/components/workspace/options/FormPhotoOptionsBar";
import { HeicOptionsBar } from "@/components/workspace/options/HeicOptionsBar";
import { MetadataOptionsBar } from "@/components/workspace/options/MetadataOptionsBar";
import { OrganizeOptionsBar } from "@/components/workspace/options/OrganizeOptionsBar";
import { PageNumberOptionsBar } from "@/components/workspace/options/PageNumberOptionsBar";
import { PassportOptionsBar } from "@/components/workspace/options/PassportOptionsBar";
import { ResizeOptionsBar } from "@/components/workspace/options/ResizeOptionsBar";
import { RotateOptionsBar } from "@/components/workspace/options/RotateOptionsBar";
import { SvgOptionsBar } from "@/components/workspace/options/SvgOptionsBar";
import { TraceOptionsBar } from "@/components/workspace/options/TraceOptionsBar";
import { WatermarkOptionsBar } from "@/components/workspace/options/WatermarkOptionsBar";

type ToolOptionsBarProps = {
  tool: WorkspaceToolSlug;
  options: ToolOptions;
  onChange: (options: ToolOptions) => void;
  disabled: boolean;
  sourceFile?: File;
};

export function ToolOptionsBar({ tool, options, onChange, disabled, sourceFile }: ToolOptionsBarProps) {
  switch (tool) {
    case "convert-format":
      return (
        <ConvertOptionsBar
          options={options.convert}
          onChange={(convert) => onChange({ ...options, convert })}
          disabled={disabled}
        />
      );
    case "compress-image":
      return (
        <CompressOptionsBar
          options={options.compress}
          onChange={(compress) => onChange({ ...options, compress })}
          disabled={disabled}
        />
      );
    case "resize-image":
      return (
        <ResizeOptionsBar
          options={options.resize}
          onChange={(resize) => onChange({ ...options, resize })}
          disabled={disabled}
        />
      );
    case "edit-metadata":
      return (
        <MetadataOptionsBar
          options={options.metadata}
          onChange={(metadata) => onChange({ ...options, metadata })}
          disabled={disabled}
          sourceFile={sourceFile}
        />
      );
    case "heic-to-jpg":
      return (
        <HeicOptionsBar options={options.heic} onChange={(heic) => onChange({ ...options, heic })} disabled={disabled} />
      );
    case "form-photo":
      return (
        <FormPhotoOptionsBar options={options.form} onChange={(form) => onChange({ ...options, form })} disabled={disabled} />
      );
    case "svg-to-image":
      return <SvgOptionsBar options={options.svg} onChange={(svg) => onChange({ ...options, svg })} disabled={disabled} />;
    case "image-to-svg":
      return (
        <TraceOptionsBar options={options.trace} onChange={(trace) => onChange({ ...options, trace })} disabled={disabled} />
      );
    case "crop-image":
      return (
        <CropOptionsBar
          options={options.crop}
          onChange={(crop) => onChange({ ...options, crop })}
          disabled={disabled}
        />
      );
    case "passport-photo":
      return (
        <PassportOptionsBar
          options={options.passport}
          onChange={(passport) => onChange({ ...options, passport })}
          disabled={disabled}
        />
      );
    case "organize-pdf":
      return (
        <OrganizeOptionsBar
          options={options.organize}
          onChange={(organize) => onChange({ ...options, organize })}
          disabled={disabled}
        />
      );
    case "pdf-page-numbers":
      return (
        <PageNumberOptionsBar
          options={options.pageNumbers}
          onChange={(pageNumbers) => onChange({ ...options, pageNumbers })}
          disabled={disabled}
        />
      );
    case "pdf-watermark":
      return (
        <WatermarkOptionsBar
          options={options.watermark}
          onChange={(watermark) => onChange({ ...options, watermark })}
          disabled={disabled}
        />
      );
    case "rotate-pdf":
      return (
        <RotateOptionsBar
          options={options.rotate}
          onChange={(rotate) => onChange({ ...options, rotate })}
          disabled={disabled}
        />
      );
    default:
      return null;
  }
}
