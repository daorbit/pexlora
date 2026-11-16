import type { OutputFormat } from "@/lib/image/formats";

type ByteTransform<Args extends unknown[]> = (...args: Args) => Uint8Array;

export function losslessByFormat<Args extends unknown[]>(handlers: Partial<Record<OutputFormat, ByteTransform<Args>>>) {
  return (format: OutputFormat, ...args: Args): Uint8Array | null => {
    const handler = handlers[format];
    if (!handler) return null;
    try {
      return handler(...args);
    } catch {
      return null;
    }
  };
}
