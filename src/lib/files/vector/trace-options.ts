import type { TraceOptions as TracerOptions } from "imagetracerjs";
import type { TraceDetail, TraceOptions } from "@/lib/image/options";

export const TRACE_MAX_SIDE: Record<TraceDetail, number> = {
  simple: 800,
  balanced: 1200,
  detailed: 1600,
};

const DETAIL_PRESETS: Record<TraceDetail, TracerOptions> = {
  simple: { ltres: 2, qtres: 2, pathomit: 16, blurradius: 1, blurdelta: 20, roundcoords: 1 },
  balanced: { ltres: 1, qtres: 1, pathomit: 8, roundcoords: 1 },
  detailed: { ltres: 0.5, qtres: 0.5, pathomit: 2, roundcoords: 2 },
};

export function tracerOptions({ detail, colors }: TraceOptions): TracerOptions {
  const numberOfColors = Number(colors);
  return {
    ...DETAIL_PRESETS[detail],
    numberofcolors: numberOfColors,
    colorsampling: numberOfColors <= 2 ? 0 : 2,
    colorquantcycles: 3,
    rightangleenhance: true,
    strokewidth: 0,
    viewbox: true,
    desc: false,
  };
}
