import { SESSION_RETENTION_HOURS } from "@/config/limits";
import { idbClear, idbDelete, idbEntries, idbGet, idbSet } from "@/lib/storage/idb";

export const SESSION_MAX_AGE_MS = SESSION_RETENTION_HOURS * 60 * 60 * 1000;

type Stored<T> = { savedAt: number; value: T };

export async function loadSessions<T>(prefix: string) {
  const entries = await idbEntries<Stored<T>>();
  return entries
    .filter(({ key, value }) => key.startsWith(prefix) && value && Date.now() - value.savedAt <= SESSION_MAX_AGE_MS)
    .map(({ key, value }) => ({ key, savedAt: value.savedAt, value: value.value }));
}

export async function loadSession<T>(key: string): Promise<T | null> {
  const stored = await idbGet<Stored<T>>(key);
  if (!stored) return null;
  if (Date.now() - stored.savedAt > SESSION_MAX_AGE_MS) {
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

export type SessionSnapshot = { key: string; value: Stored<unknown> }[];

export async function snapshotSessions(prefix = ""): Promise<SessionSnapshot> {
  const entries = await idbEntries<Stored<unknown>>();
  return entries.filter(({ key, value }) => key.startsWith(prefix) && value);
}

export async function restoreSessions(snapshot: SessionSnapshot) {
  await Promise.all(snapshot.map(({ key, value }) => idbSet(key, value)));
}

export async function hasSavedSessions() {
  return (await loadSessions<unknown>("")).length > 0;
}

export async function updateSession<T>(key: string, update: (value: T) => T | null) {
  const stored = await idbGet<Stored<T>>(key);
  if (!stored) return;
  const next = update(stored.value);
  if (next === null) return idbDelete(key);
  return idbSet(key, { savedAt: stored.savedAt, value: next } satisfies Stored<T>);
}
