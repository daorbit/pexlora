"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { completeOneTap, fetchOneTapNonce } from "@/services/auth-api";

let started = false;

export function useGoogleOneTap(clientId: string, scriptReady: boolean) {
  const router = useRouter();

  useEffect(() => {
    if (!scriptReady || started) return;
    started = true;

    fetchOneTapNonce()
      .then((nonce) => {
        const identity = window.google?.accounts.id;
        if (!identity) return;
        identity.initialize({
          client_id: clientId,
          nonce,
          context: "signin",
          auto_select: false,
          cancel_on_tap_outside: true,
          itp_support: true,
          use_fedcm_for_prompt: true,
          callback: ({ credential }) => {
            completeOneTap(credential)
              .then(() => router.refresh())
              .catch((error) => console.error("Google One Tap sign-in failed", error));
          },
        });
        identity.prompt();
      })
      .catch(() => {
        started = false;
      });
  }, [clientId, router, scriptReady]);
}
