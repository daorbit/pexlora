"use client";

import { useSearchParams } from "next/navigation";
import { Alert } from "@/components/ui/Alert";

const messages: Record<string, string> = {
  google: "We couldn't sign you in with Google. Please try again.",
};

export function OAuthErrorNotice() {
  const error = useSearchParams().get("error");
  const message = error ? messages[error] : null;
  return message ? <Alert message={message} /> : null;
}
