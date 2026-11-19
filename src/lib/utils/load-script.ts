const loading = new Map<string, Promise<void>>();

export function loadScript(src: string, isReady: () => boolean) {
  if (isReady()) return Promise.resolve();
  const existing = loading.get(src);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      if (isReady()) return resolve();
      loading.delete(src);
      reject(new Error(`${src} loaded without its API`));
    };
    script.onerror = () => {
      loading.delete(src);
      script.remove();
      reject(new Error(`${src} failed to load`));
    };
    document.head.appendChild(script);
  });

  loading.set(src, promise);
  return promise;
}
