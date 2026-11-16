export async function runPool<T>(
  items: readonly T[],
  limit: number,
  worker: (item: T, stop: () => void) => Promise<void>,
) {
  let next = 0;
  let stopped = false;
  const stop = () => {
    stopped = true;
  };

  const lane = async () => {
    while (!stopped && next < items.length) {
      const item = items[next];
      next += 1;
      await worker(item, stop);
    }
  };

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, lane));
}
