import tracer, { type TraceOptions } from "imagetracerjs";

type TraceRequest = { pixels: ImageData; options: TraceOptions };
type TraceReply = { ok: true; svg: string } | { ok: false; error: string };

type WorkerScope = {
  onmessage: ((event: MessageEvent<TraceRequest>) => void) | null;
  postMessage: (message: TraceReply) => void;
};

const scope = self as unknown as WorkerScope;

scope.onmessage = ({ data }) => {
  try {
    scope.postMessage({ ok: true, svg: tracer.imagedataToSVG(data.pixels, data.options) });
  } catch (error) {
    scope.postMessage({ ok: false, error: error instanceof Error ? error.message : "This image couldn't be traced." });
  }
};
