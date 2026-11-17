"use client";

import { useEffect, useState } from "react";
import type { MetadataReport } from "@/lib/metadata/types";
import { inspectFile } from "@/services/file-service";

type ResultReportState = { blob: Blob; report: MetadataReport | null; error: boolean };

export function useResultReport(result: { blob: Blob; name: string } | undefined, enabled: boolean) {
  const [state, setState] = useState<ResultReportState | null>(null);
  const blob = result?.blob;
  const name = result?.name;

  useEffect(() => {
    if (!enabled || !blob || !name) return;
    let cancelled = false;
    inspectFile(new File([blob], name, { type: blob.type }))
      .then((report) => !cancelled && setState({ blob, report, error: false }))
      .catch(() => !cancelled && setState({ blob, report: null, error: true }));
    return () => {
      cancelled = true;
    };
  }, [enabled, blob, name]);

  const current = blob && state?.blob === blob ? state : null;
  return { report: current?.report ?? null, error: current?.error ?? false, loading: enabled && Boolean(blob) && !current };
}
