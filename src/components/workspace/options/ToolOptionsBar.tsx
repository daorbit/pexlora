"use client";

import type { WorkspaceToolSlug } from "@/config/tools";
import type { ToolOptions } from "@/lib/image/options";
import { CompressOptionsBar } from "@/components/workspace/options/CompressOptionsBar";
import { ConvertOptionsBar } from "@/components/workspace/options/ConvertOptionsBar";
import { MetadataOptionsBar } from "@/components/workspace/options/MetadataOptionsBar";
import { ResizeOptionsBar } from "@/components/workspace/options/ResizeOptionsBar";

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
    default:
      return null;
  }
}
