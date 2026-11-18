"use client";

import { optionsCopy } from "@/content/workspace";
import { IMAGE_SHAPES, SHAPE_BACKGROUNDS, SHAPE_CORNERS, type ShapeOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import { ShapeGlyph } from "@/components/workspace/options/ShapeGlyph";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const shapeOptions = IMAGE_SHAPES.map((shape) => ({
  value: shape,
  label: optionsCopy.shapes[shape].label,
  icon: <ShapeGlyph shape={shape} />,
}));
const cornerOptions = SHAPE_CORNERS.map((corners) => ({ value: corners, ...optionsCopy.cornerSizes[corners] }));
const backgroundOptions = SHAPE_BACKGROUNDS.map((background) => ({ value: background, ...optionsCopy.shapeBackgrounds[background] }));

export function ShapeOptionsBar({ options, onChange, disabled }: OptionsBarProps<ShapeOptions>) {
  return (
    <OptionsBar footer={<OptionHint>{optionsCopy.shapeHint}</OptionHint>}>
      <OptionGroup label={optionsCopy.shape}>
        <OptionTiles
          label={optionsCopy.shapeLabel}
          value={options.shape}
          options={shapeOptions}
          onChange={(shape) => onChange({ ...options, shape })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
      {options.shape === "rounded" && (
        <OptionGroup label={optionsCopy.corners}>
          <OptionTiles
            label={optionsCopy.cornersLabel}
            value={options.corners}
            options={cornerOptions}
            onChange={(corners) => onChange({ ...options, corners })}
            disabled={disabled}
            columns={3}
          />
        </OptionGroup>
      )}
      <OptionGroup label={optionsCopy.shapeBackground}>
        <OptionTiles
          label={optionsCopy.shapeBackgroundLabel}
          value={options.background}
          options={backgroundOptions}
          onChange={(background) => onChange({ ...options, background })}
          disabled={disabled}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
