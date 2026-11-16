"use client";

import { useLocationSearch } from "@/hooks/useLocationSearch";
import { NEXT_PARAM, safeNextPath } from "@/lib/url/next-path";

export function useNextPath() {
  return safeNextPath(useLocationSearch().get(NEXT_PARAM));
}
