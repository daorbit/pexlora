const DB_NAME = "pexlora";
const STORE = "sessions";
const VERSION = 1;

let dbPromise: Promise<IDBDatabase | null> | null = null;

function openDb() {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  dbPromise ??= new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, VERSION);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
    request.onblocked = () => resolve(null);
  });
  return dbPromise;
}

async function withStore<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>) {
  const db = await openDb();
  if (!db) return undefined;
  return new Promise<T | undefined>((resolve) => {
    try {
      const request = action(db.transaction(STORE, mode).objectStore(STORE));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(undefined);
    } catch {
      resolve(undefined);
    }
  });
}

export function idbGet<T>(key: string) {
  return withStore<T>("readonly", (store) => store.get(key) as IDBRequest<T>);
}

export async function idbSet(key: string, value: unknown) {
  await withStore("readwrite", (store) => store.put(value, key));
}

export async function idbDelete(key: string) {
  await withStore("readwrite", (store) => store.delete(key));
}

export async function idbClear() {
  await withStore("readwrite", (store) => store.clear());
}
