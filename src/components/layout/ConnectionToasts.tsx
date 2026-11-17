"use client";

import { useEffect } from "react";
import { connectionCopy } from "@/content/toasts";
import { toast } from "@/lib/toast/store";

export function ConnectionToasts() {
  useEffect(() => {
    const onOffline = () => toast.info(connectionCopy.offline);
    const onOnline = () => toast.success(connectionCopy.online);
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  return null;
}
