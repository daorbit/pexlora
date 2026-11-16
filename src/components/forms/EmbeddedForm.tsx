"use client";

import { useEffect, useRef } from "react";
import type { EmbeddedFormConfig } from "@/config/forms";

type FormMessage =
  | { type: "da-forms:height"; height: number }
  | { type: "da-forms:ready" };

export function EmbeddedForm({ form }: { form: EmbeddedFormConfig }) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onMessage(event: MessageEvent<FormMessage>) {
      const frame = frameRef.current;
      if (!frame || event.origin !== form.origin || event.source !== frame.contentWindow) return;

      if (event.data?.type === "da-forms:height" && Number.isFinite(event.data.height)) {
        frame.style.height = `${event.data.height}px`;
      }

      if (event.data?.type === "da-forms:ready") {
        frame.contentWindow?.postMessage(
          { type: "da-forms:context", page: window.location.href, referrer: document.referrer },
          form.origin,
        );
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [form.origin]);

  return (
    <div className="isolate overflow-hidden rounded-3xl">
      <iframe
        ref={frameRef}
        src={form.src}
        title={form.title}
        loading="lazy"
        className="block h-160 w-full border-0 bg-transparent [color-scheme:normal]"
      />
    </div>
  );
}
