"use client";

import type { WorkspaceToolSlug } from "@/config/tools";
import type { ToolOptions } from "@/lib/image/options";
import { CompressOptionsBar } from "@/components/workspace/options/CompressOptionsBar";
import { ConvertOptionsBar } from "@/components/workspace/options/ConvertOptionsBar";
import { ResizeOptionsBar } from "@/components/workspace/options/ResizeOptionsBar";

type ToolOptionsBarProps = {
  tool: WorkspaceToolSlug;
  options: ToolOptions;
  onChange: (options: ToolOptions) => void;
  disabled: boolean;
};

export function ToolOptionsBar({ tool, options, onChange, disabled }: ToolOptionsBarProps) {
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
    default:
      return null;
  }
}
