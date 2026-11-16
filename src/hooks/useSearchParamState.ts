"use client";

import { useCallback } from "react";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { replaceSearchParams } from "@/lib/url/search-params";

export function useSearchParamState<T extends string>(key: string, allowed: readonly T[], fallback: T) {
  const fromUrl = useLocationSearch().get(key);
  const value = fromUrl && allowed.includes(fromUrl as T) ? (fromUrl as T) : fallback;

  const setValue = useCallback(
    (next: T) => replaceSearchParams({ [key]: next === fallback ? null : next }),
    [key, fallback],
  );

  return [value, setValue] as const;
}
