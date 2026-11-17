"use client";

import { optionsCopy } from "@/content/workspace";
import { ROTATE_ANGLES, type RotateOptions } from "@/lib/image/options";
import { OptionGroup, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const angleOptions = ROTATE_ANGLES.map((angle) => ({ value: angle, ...optionsCopy.rotateAngles[angle] }));

export function RotateOptionsBar({ options, onChange, disabled }: OptionsBarProps<RotateOptions>) {
  return (
    <OptionsBar>
      <OptionGroup label={optionsCopy.rotate}>
        <OptionTiles
          label={optionsCopy.rotateLabel}
          value={options.angle}
          options={angleOptions}
          onChange={(angle) => onChange({ angle })}
          disabled={disabled}
          columns={1}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
