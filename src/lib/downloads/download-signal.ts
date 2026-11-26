let downloads = 0;
const listeners = new Set<() => void>();

export function signalDownload() {
  downloads += 1;
  listeners.forEach((listener) => listener());
}

export function subscribeDownloads(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const getDownloadCount = () => downloads;
