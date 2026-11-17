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

export async function idbEntries<T>() {
  const [keys, values] = await Promise.all([
    withStore<IDBValidKey[]>("readonly", (store) => store.getAllKeys()),
    withStore<T[]>("readonly", (store) => store.getAll() as IDBRequest<T[]>),
  ]);
  if (!keys || !values) return [];
  return keys.map((key, index) => ({ key: String(key), value: values[index] }));
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
