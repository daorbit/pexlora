"use client";

import { optionsCopy } from "@/content/workspace";
import { getRotateImageError, IMAGE_FLIPS, IMAGE_ROTATIONS, type RotateImageOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const angleOptions = IMAGE_ROTATIONS.map((angle) => ({ value: angle, ...optionsCopy.rotateAngles[angle] }));
const flipOptions = IMAGE_FLIPS.map((flip) => ({ value: flip, ...optionsCopy.flips[flip] }));

export function RotateImageOptionsBar({ options, onChange, disabled }: OptionsBarProps<RotateImageOptions>) {
  const error = getRotateImageError(options);

  return (
    <OptionsBar footer={error ? <OptionHint tone="danger">{error}</OptionHint> : <OptionHint>{optionsCopy.rotateHint}</OptionHint>}>
      <OptionGroup label={optionsCopy.rotateAngle}>
        <OptionTiles
          label={optionsCopy.rotateAngleLabel}
          value={options.angle}
          options={angleOptions}
          onChange={(angle) => onChange({ ...options, angle })}
          disabled={disabled}
        />
      </OptionGroup>
      <OptionGroup label={optionsCopy.flip}>
        <OptionTiles
          label={optionsCopy.flipLabel}
          value={options.flip}
          options={flipOptions}
          onChange={(flip) => onChange({ ...options, flip })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
