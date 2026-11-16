"use client";

import { useEffect, useState } from "react";
import { NEXT_PARAM, safeNextPath } from "@/lib/url/next-path";
import { readSearchParams } from "@/lib/url/search-params";

export function useNextPath() {
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    setNext(safeNextPath(readSearchParams().get(NEXT_PARAM)));
  }, []);

  return next;
}
