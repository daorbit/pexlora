"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/utils/share-target";

export function ServiceWorkerRegistrar() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}
