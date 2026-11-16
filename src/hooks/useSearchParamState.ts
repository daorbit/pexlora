"use client";

import { useCallback, useEffect, useState } from "react";
import { readSearchParams, replaceSearchParams } from "@/lib/url/search-params";

export function useSearchParamState<T extends string>(key: string, allowed: readonly T[], fallback: T) {
  const [value, setValueState] = useState<T>(fallback);

  useEffect(() => {
    const fromUrl = readSearchParams().get(key);
    if (fromUrl && allowed.includes(fromUrl as T)) setValueState(fromUrl as T);
  }, [key, allowed]);

  const setValue = useCallback(
    (next: T) => {
      setValueState(next);
      replaceSearchParams({ [key]: next === fallback ? null : next });
    },
    [key, fallback],
  );

  return [value, setValue] as const;
}
