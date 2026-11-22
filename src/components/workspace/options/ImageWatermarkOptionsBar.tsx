"use client";

import { MAX_WATERMARK_LENGTH } from "@/config/limits";
import { optionsCopy } from "@/content/workspace";
import {
  getImageWatermarkError,
  IMAGE_WATERMARK_COLORS,
  IMAGE_WATERMARK_POSITIONS,
  WATERMARK_OPACITIES,
  type ImageWatermarkOptions,
} from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import { TextOption } from "@/components/workspace/options/TextOption";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const positionOptions = IMAGE_WATERMARK_POSITIONS.map((position) => ({ value: position, ...optionsCopy.imageWatermarkPositions[position] }));
const opacityOptions = WATERMARK_OPACITIES.map((opacity) => ({ value: opacity, ...optionsCopy.watermarkOpacities[opacity] }));
const colorOptions = IMAGE_WATERMARK_COLORS.map((color) => ({ value: color, ...optionsCopy.imageWatermarkColors[color] }));

export function ImageWatermarkOptionsBar({ options, onChange, disabled }: OptionsBarProps<ImageWatermarkOptions>) {
  const error = getImageWatermarkError(options);
  const set = (patch: Partial<ImageWatermarkOptions>) => onChange({ ...options, ...patch });

  return (
    <OptionsBar
      footer={error ? <OptionHint tone="danger">{error}</OptionHint> : <OptionHint>{optionsCopy.imageWatermarkHint}</OptionHint>}
    >
      <TextOption
        label={optionsCopy.watermarkText}
        value={options.text}
        placeholder={optionsCopy.imageWatermarkPlaceholder}
        maxLength={MAX_WATERMARK_LENGTH}
        disabled={disabled}
        onChange={(text) => set({ text })}
      />
      <OptionGroup label={optionsCopy.imageWatermarkPosition}>
        <OptionTiles
          label={optionsCopy.imageWatermarkPositionLabel}
          value={options.position}
          options={positionOptions}
          onChange={(position) => set({ position })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
      <OptionGroup label={optionsCopy.imageWatermarkColor}>
        <OptionTiles
          label={optionsCopy.imageWatermarkColorLabel}
          value={options.color}
          options={colorOptions}
          onChange={(color) => set({ color })}
          disabled={disabled}
          columns={2}
        />
      </OptionGroup>
      <OptionGroup label={optionsCopy.watermarkOpacity}>
        <OptionTiles
          label={optionsCopy.watermarkOpacityLabel}
          value={options.opacity}
          options={opacityOptions}
          onChange={(opacity) => set({ opacity })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
