"use client";

import { useState } from "react";
import { zipCopy } from "@/content/utility-tools";
import { Segmented } from "@/components/ui/Segmented";
import { ZipCreator } from "@/components/utility/zip/ZipCreator";
import { ZipExtractor } from "@/components/utility/zip/ZipExtractor";

type ZipMode = "create" | "extract";

const modeOptions = (["create", "extract"] as const).map((mode) => ({ value: mode, label: zipCopy.modes[mode] }));

export function ZipWorkspace() {
  const [mode, setMode] = useState<ZipMode>("create");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 text-left">
      <Segmented label={zipCopy.modeLabel} value={mode} options={modeOptions} onChange={setMode} className="self-center" />
      {mode === "create" ? <ZipCreator /> : <ZipExtractor />}
    </div>
  );
}
