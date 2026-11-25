"use client";

import { useEffect } from "react";
import { syncOfferAttribute } from "@/lib/offers/offer-state";

const SYNC_MS = 30_000;

export function useOfferSync() {
  useEffect(() => {
    const sync = () => syncOfferAttribute(Date.now());
    sync();
    const timer = window.setInterval(sync, SYNC_MS);
    return () => window.clearInterval(timer);
  }, []);
}
