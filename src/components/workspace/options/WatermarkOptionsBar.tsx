"use client";

import { MAX_WATERMARK_LENGTH } from "@/config/limits";
import { optionsCopy } from "@/content/workspace";
import { getWatermarkError, WATERMARK_LAYOUTS, WATERMARK_OPACITIES, type WatermarkOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import { TextOption } from "@/components/workspace/options/TextOption";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const layoutOptions = WATERMARK_LAYOUTS.map((layout) => ({ value: layout, ...optionsCopy.watermarkLayouts[layout] }));
const opacityOptions = WATERMARK_OPACITIES.map((opacity) => ({ value: opacity, ...optionsCopy.watermarkOpacities[opacity] }));

export function WatermarkOptionsBar({ options, onChange, disabled }: OptionsBarProps<WatermarkOptions>) {
  const error = getWatermarkError(options);
  const set = (patch: Partial<WatermarkOptions>) => onChange({ ...options, ...patch });

  return (
    <OptionsBar
      footer={error ? <OptionHint tone="danger">{error}</OptionHint> : <OptionHint>{optionsCopy.watermarkHint}</OptionHint>}
    >
      <TextOption
        label={optionsCopy.watermarkText}
        value={options.text}
        placeholder={optionsCopy.watermarkPlaceholder}
        maxLength={MAX_WATERMARK_LENGTH}
        disabled={disabled}
        onChange={(text) => set({ text })}
      />
      <OptionGroup label={optionsCopy.watermarkLayout}>
        <OptionTiles
          label={optionsCopy.watermarkLayoutLabel}
          value={options.layout}
          options={layoutOptions}
          onChange={(layout) => set({ layout })}
          disabled={disabled}
          columns={3}
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
