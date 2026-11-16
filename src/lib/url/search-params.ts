export type ParamUpdates = Record<string, string | null>;

export function readSearchParams() {
  return new URLSearchParams(window.location.search);
}

export function replaceSearchParams(updates: ParamUpdates) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === "") url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }
  if (url.href !== window.location.href) {
    window.history.replaceState(window.history.state, "", url);
  }
}
