"use client";

import { useEffect, useRef } from "react";
import { isPlanId, type PlanId } from "@/config/plans";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { CHECKOUT_PARAM } from "@/lib/payments/checkout-intent";
import { replaceSearchParams } from "@/lib/url/search-params";

export function useResumeCheckout(buy: (plan: PlanId) => void, signedIn: boolean) {
  const plan = useLocationSearch().get(CHECKOUT_PARAM);
  const started = useRef(false);

  useEffect(() => {
    if (started.current || !signedIn || !isPlanId(plan)) return;
    started.current = true;
    replaceSearchParams({ [CHECKOUT_PARAM]: null });
    buy(plan);
  }, [buy, plan, signedIn]);
}
