"use client";

import { aiCopy } from "@/content/ai";
import { optionsCopy } from "@/content/workspace";
import { useAiAction } from "@/hooks/useAiAction";
import { METADATA_FIELDS, type MetadataFields } from "@/lib/image/options";
import { fetchImageInsights } from "@/services/ai-api";
import { AiButton } from "@/components/ai/AiButton";
import { OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { TextOption } from "@/components/workspace/options/TextOption";
import type { OptionsBarProps } from "@/components/workspace/options/types";

type MetadataOptionsBarProps = OptionsBarProps<MetadataFields> & { sourceFile?: File };

export function MetadataOptionsBar({ options, onChange, disabled, sourceFile }: MetadataOptionsBarProps) {
  const ai = useAiAction(fetchImageInsights);

  const fillWithAi = async () => {
    if (!sourceFile) return;
    const insights = await ai.run(sourceFile);
    if (insights) {
      onChange({ ...options, description: insights.description, keywords: insights.keywords.join(", ") });
    }
  };

  return (
    <OptionsBar
      footer={
        <div className="flex flex-col gap-3">
          <AiButton
            variant="secondary"
            pending={ai.pending}
            label={aiCopy.fillWithAi}
            disabled={disabled || !sourceFile}
            onClick={fillWithAi}
            className="w-full"
          />
          <OptionHint tone={ai.error ? "danger" : "muted"}>
            {ai.error ?? (sourceFile ? optionsCopy.metadataNote : aiCopy.fillHint)}
          </OptionHint>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {METADATA_FIELDS.map((field) => (
          <TextOption
            key={field}
            label={optionsCopy.metadataFields[field].label}
            placeholder={optionsCopy.metadataFields[field].placeholder}
            value={options[field]}
            disabled={disabled || ai.pending}
            onChange={(value) => onChange({ ...options, [field]: value })}
          />
        ))}
      </div>
    </OptionsBar>
  );
}
