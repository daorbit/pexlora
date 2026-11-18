"use client";

import { useState } from "react";
import { previewTextCopy } from "@/content/converters";
import { useBlobData } from "@/hooks/useBlobData";
import { loadSheetPreview } from "@/lib/files/preview-data";
import { cn } from "@/lib/utils/cn";
import { Segmented } from "@/components/ui/Segmented";
import { Skeleton } from "@/components/ui/Skeleton";
import { OptionHint } from "@/components/workspace/options/OptionsBar";
import { PreviewFrame } from "@/components/workspace/preview/PreviewFrame";
import type { PreviewProps } from "@/components/workspace/preview/types";

export function SheetResultViewer({ blob, url, name }: PreviewProps) {
  const { data, error } = useBlobData(blob, name, loadSheetPreview);
  const [selected, setSelected] = useState("0");

  if (error) return <OptionHint tone="danger">{previewTextCopy.error}</OptionHint>;
  if (!data) return <Skeleton className="h-40 w-full rounded-2xl" />;

  const index = Math.min(Number(selected), data.length - 1);
  const sheet = data[index];

  return (
    <PreviewFrame name={name} url={url} label={previewTextCopy.rows(sheet.rows.length, sheet.total)}>
      {data.length > 1 && (
        <Segmented
          label={previewTextCopy.sheetPicker}
          value={String(index)}
          options={data.map((item, itemIndex) => ({ value: String(itemIndex), label: item.name }))}
          onChange={setSelected}
          layout="chips"
          size="sm"
        />
      )}
      <div className="max-h-[min(60vh,440px)] overflow-auto rounded-2xl border border-separator">
        <table translate="no" className="notranslate w-max min-w-full border-collapse text-[12px]">
          <tbody>
            {sheet.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-separator last:border-b-0">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "max-w-64 truncate border-r border-separator px-2.5 py-1.5 last:border-r-0",
                      cell.numeric && "text-right font-mono tabular-nums",
                      rowIndex === 0 && "bg-fill font-semibold",
                    )}
                  >
                    {cell.text}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewFrame>
  );
}
