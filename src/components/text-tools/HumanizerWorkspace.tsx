"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AI_TEXT_LIMITS } from "@/config/limits";
import { textHandoffKey } from "@/config/text-tools";
import { aiCopy, textToolCopy } from "@/content/ai";
import { useAiAction } from "@/hooks/useAiAction";
import { useHandOff } from "@/hooks/useHandOff";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import { countWords } from "@/lib/ai/text-stats";
import { HUMANIZE_TONES, type HumanizeTone } from "@/lib/ai/types";
import { handOff } from "@/lib/utils/file-handoff";
import { humanizeText } from "@/services/ai-api";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Segmented } from "@/components/ui/Segmented";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { AiButton } from "@/components/ai/AiButton";
import { TextInput } from "@/components/text-tools/TextInput";
import { OptionGroup, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { WorkspaceFrame } from "@/components/workspace/WorkspaceFrame";

const toneOptions = HUMANIZE_TONES.map((tone) => ({ value: tone, label: textToolCopy.tones[tone] }));

export function HumanizerWorkspace({ peerHref }: { peerHref: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [tone, setTone] = useSearchParamState<HumanizeTone>("tone", HUMANIZE_TONES, "natural");
  const humanizer = useAiAction(humanizeText);

  const changeText = useCallback((value: string) => setText(value), []);
  useHandOff<string>(textHandoffKey("ai-humanizer"), changeText);

  const output = humanizer.data?.text ?? "";
  const enoughWords = countWords(text) >= AI_TEXT_LIMITS.minWords;

  const checkOutput = () => {
    handOff(textHandoffKey("ai-text-detector"), output);
    router.push(peerHref);
  };

  return (
    <WorkspaceFrame>
      <div className="flex flex-col gap-3 p-1">
        <OptionsBar>
          <OptionGroup label={textToolCopy.tone}>
            <Segmented<HumanizeTone>
              label={textToolCopy.tone}
              size="sm"
              value={tone}
              options={toneOptions}
              onChange={setTone}
              disabled={humanizer.pending}
              className="scrollbar-none max-w-full overflow-x-auto"
            />
          </OptionGroup>
        </OptionsBar>
        <TextInput label={textToolCopy.placeholder} value={text} onChange={changeText} disabled={humanizer.pending} />
        <UpsellAlert message={humanizer.error} upsell={humanizer.upsell} />
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[13px] text-secondary">{enoughWords ? aiCopy.limitNote : textToolCopy.minimum}</p>
          <AiButton
            size="lg"
            pending={humanizer.pending}
            label={textToolCopy.humanize}
            pendingLabel={textToolCopy.humanizing}
            disabled={!enoughWords}
            onClick={() => humanizer.run(text, tone)}
            className="ml-auto"
          />
        </div>
        {output && (
          <div className="flex flex-col gap-3 rounded-[20px] border border-separator bg-surface p-5 motion-safe:animate-fade-up sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold">
                {textToolCopy.output}
                <span className="ml-2 font-normal text-secondary">{textToolCopy.words(countWords(output))}</span>
              </p>
              <div className="flex gap-2">
                <CopyButton value={output} />
                <Button variant="secondary" size="sm" onClick={checkOutput}>
                  {textToolCopy.toDetector}
                </Button>
              </div>
            </div>
            <p className="text-[15.5px] leading-relaxed whitespace-pre-wrap">{output}</p>
          </div>
        )}
      </div>
    </WorkspaceFrame>
  );
}
