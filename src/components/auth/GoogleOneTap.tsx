"use client";

import Script from "next/script";
import { useState } from "react";
import { useGoogleOneTap } from "@/hooks/useGoogleOneTap";

const GOOGLE_IDENTITY_SCRIPT = "https://accounts.google.com/gsi/client";

export function GoogleOneTap({ clientId }: { clientId: string }) {
  const [scriptReady, setScriptReady] = useState(false);
  useGoogleOneTap(clientId, scriptReady);

  return <Script src={GOOGLE_IDENTITY_SCRIPT} strategy="afterInteractive" onReady={() => setScriptReady(true)} />;
}
