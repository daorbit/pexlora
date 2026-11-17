declare module "imagetracerjs" {
  export type TraceOptions = {
    ltres?: number;
    qtres?: number;
    pathomit?: number;
    rightangleenhance?: boolean;
    colorsampling?: 0 | 1 | 2;
    numberofcolors?: number;
    mincolorratio?: number;
    colorquantcycles?: number;
    strokewidth?: number;
    linefilter?: boolean;
    roundcoords?: number;
    viewbox?: boolean;
    desc?: boolean;
    blurradius?: number;
    blurdelta?: number;
  };

  type ImageTracer = {
    imagedataToSVG: (imageData: ImageData, options?: TraceOptions) => string;
  };

  const tracer: ImageTracer;
  export default tracer;
}
