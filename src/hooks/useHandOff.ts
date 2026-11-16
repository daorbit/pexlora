"use client";

import { useEffect } from "react";
import { takeHandOff } from "@/lib/utils/file-handoff";

export function useHandOff<T>(target: string, apply: (value: T) => void) {
  useEffect(() => {
    const value = takeHandOff<T>(target);
    if (value !== undefined) apply(value);
  }, [target, apply]);
}
