import { idbClear, idbDelete, idbGet, idbSet } from "@/lib/storage/idb";

const MAX_AGE_MS = 24 * 60 * 60 * 1000;

type Stored<T> = { savedAt: number; value: T };

export async function loadSession<T>(key: string): Promise<T | null> {
  const stored = await idbGet<Stored<T>>(key);
  if (!stored) return null;
  if (Date.now() - stored.savedAt > MAX_AGE_MS) {
    await idbDelete(key);
    return null;
  }
  return stored.value;
}

export function saveSession<T>(key: string, value: T) {
  return idbSet(key, { savedAt: Date.now(), value } satisfies Stored<T>);
}

export function clearSession(key: string) {
  return idbDelete(key);
}

export function clearAllSessions() {
  return idbClear();
}
