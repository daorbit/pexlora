"use client";

import { optionsCopy } from "@/content/workspace";
import { CROP_ANCHORS, CROP_RATIOS, type CropOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import { RatioShape } from "@/components/workspace/options/RatioShape";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const ratioOptions = CROP_RATIOS.map((ratio) => ({
  value: ratio,
  ...optionsCopy.cropRatios[ratio],
  icon: <RatioShape ratio={ratio} />,
}));
const anchorOptions = CROP_ANCHORS.map((anchor) => ({ value: anchor, ...optionsCopy.cropAnchors[anchor] }));

export function CropOptionsBar({ options, onChange, disabled }: OptionsBarProps<CropOptions>) {
  return (
    <OptionsBar footer={<OptionHint>{optionsCopy.cropHint}</OptionHint>}>
      <OptionGroup label={optionsCopy.cropRatio}>
        <OptionTiles
          label={optionsCopy.cropRatioLabel}
          value={options.ratio}
          options={ratioOptions}
          onChange={(ratio) => onChange({ ...options, ratio })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
      <OptionGroup label={optionsCopy.cropAnchor}>
        <OptionTiles
          label={optionsCopy.cropAnchorLabel}
          value={options.anchor}
          options={anchorOptions}
          onChange={(anchor) => onChange({ ...options, anchor })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
