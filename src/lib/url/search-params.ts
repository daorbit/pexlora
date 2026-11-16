export type ParamUpdates = Record<string, string | null>;

const URL_CHANGE_EVENT = "pexlora:urlchange";

export function replaceSearchParams(updates: ParamUpdates) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === "") url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }
  if (url.href !== window.location.href) {
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(URL_CHANGE_EVENT));
  }
}

export function subscribeToSearch(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(URL_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(URL_CHANGE_EVENT, callback);
  };
}
