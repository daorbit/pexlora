"use client";

import { useSyncExternalStore } from "react";
import { offerMinutesLeft, syncOfferAttribute } from "@/lib/offers/offer-state";

const TICK_MS = 30_000;

function subscribe(listener: () => void) {
  syncOfferAttribute(Date.now());
  const timer = window.setInterval(() => {
    syncOfferAttribute(Date.now());
    listener();
  }, TICK_MS);
  return () => window.clearInterval(timer);
}

const getMinutesLeft = () => offerMinutesLeft(Date.now());

export function useOfferMinutesLeft() {
  return useSyncExternalStore(subscribe, getMinutesLeft, () => null);
}
