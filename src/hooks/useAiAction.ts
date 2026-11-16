"use client";

import { useCallback, useState } from "react";
import { ApiRequestError } from "@/services/api-client";

type AiActionState<T> = {
  data: T | null;
  error: string | null;
  upsell: boolean;
  pending: boolean;
};

export function useAiAction<Args extends unknown[], T>(action: (...args: Args) => Promise<T>) {
  const [state, setState] = useState<AiActionState<T>>({ data: null, error: null, upsell: false, pending: false });

  const run = useCallback(
    async (...args: Args) => {
      setState((current) => ({ ...current, error: null, upsell: false, pending: true }));
      try {
        const data = await action(...args);
        setState({ data, error: null, upsell: false, pending: false });
        return data;
      } catch (error) {
        setState((current) => ({
          ...current,
          pending: false,
          error: error instanceof Error ? error.message : "Something went wrong.",
          upsell: error instanceof ApiRequestError && error.upsell,
        }));
        return null;
      }
    },
    [action],
  );

  const reset = useCallback(() => setState({ data: null, error: null, upsell: false, pending: false }), []);

  const restore = useCallback((data: T) => setState({ data, error: null, upsell: false, pending: false }), []);

  return { ...state, run, reset, restore };
}
