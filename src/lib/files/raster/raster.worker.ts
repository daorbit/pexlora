import { runRasterJob } from "@/lib/files/raster/run-job";
import type { RasterReply, RasterRequest } from "@/lib/files/raster/types";

type WorkerScope = {
  onmessage: ((event: MessageEvent<RasterRequest>) => void) | null;
  postMessage: (message: RasterReply, transfer?: Transferable[]) => void;
};

const scope = self as unknown as WorkerScope;

scope.onmessage = async ({ data }) => {
  try {
    const result = await runRasterJob(data.job, data.bitmap);
    scope.postMessage({ ok: true, result }, [result.buffer]);
  } catch (error) {
    scope.postMessage({ ok: false, error: error instanceof Error ? error.message : "This image couldn't be processed." });
  } finally {
    data.bitmap.close();
  }
};
