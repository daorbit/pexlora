"use client";

import Script from "next/script";
import { useState } from "react";
import { GOOGLE_IDENTITY_SCRIPT } from "@/config/google-drive";
import { useGoogleOneTap } from "@/hooks/useGoogleOneTap";

export function GoogleOneTap({ clientId }: { clientId: string }) {
  const [scriptReady, setScriptReady] = useState(false);
  useGoogleOneTap(clientId, scriptReady);

  return <Script src={GOOGLE_IDENTITY_SCRIPT} strategy="lazyOnload" onReady={() => setScriptReady(true)} />;
}
