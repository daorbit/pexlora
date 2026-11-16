"use client";

import { useEffect } from "react";
import { toast } from "@/lib/toast/store";
import { Alert } from "@/components/ui/Alert";

type FormStatusProps = {
  state: { status: "success" | "error"; message?: string } | undefined;
};

export function FormStatus({ state }: FormStatusProps) {
  useEffect(() => {
    if (state?.status === "success" && state.message) toast.success(state.message);
  }, [state]);

  if (state?.status !== "error" || !state.message) return null;
  return <Alert tone="danger" message={state.message} />;
}
