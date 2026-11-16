"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, SearchCheck } from "lucide-react";
import { AI_TEXT_LIMITS } from "@/config/limits";
import { textHandoffKey } from "@/config/text-tools";
import { textToolCopy } from "@/content/ai";
import { useAiAction } from "@/hooks/useAiAction";
import { useHandOff } from "@/hooks/useHandOff";
import { useScrollToResult } from "@/hooks/useScrollToResult";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import { countWords } from "@/lib/ai/text-stats";
import { HUMANIZE_TONES, type HumanizeTone } from "@/lib/ai/types";
import { handOff } from "@/lib/utils/file-handoff";
import { humanizeText } from "@/services/ai-api";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { OutputActions } from "@/components/text-tools/OutputActions";
import { PaneEmpty, PaneSkeleton } from "@/components/text-tools/PaneSkeleton";
import { RunBar } from "@/components/text-tools/RunBar";
import { TextInput } from "@/components/text-tools/TextInput";
import { TextPane } from "@/components/text-tools/TextPane";
import { WorkspaceFrame } from "@/components/workspace/WorkspaceFrame";

const toneOptions = HUMANIZE_TONES.map((tone) => ({ value: tone, label: textToolCopy.tones[tone] }));

export function HumanizerWorkspace({ peerHref }: { peerHref: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [tone, setTone] = useSearchParamState<HumanizeTone>("tone", HUMANIZE_TONES, "natural");
  const humanizer = useAiAction(humanizeText);
  const output = humanizer.data?.text ?? "";
  const resultRef = useScrollToResult(output);

  const changeText = useCallback((value: string) => setText(value), []);
  useHandOff<string>(textHandoffKey("ai-humanizer"), changeText);

  const ready = countWords(text) >= AI_TEXT_LIMITS.minWords;
  const run = () => {
    if (ready && !humanizer.pending) humanizer.run(text, tone);
  };

  const checkOutput = () => {
    handOff(textHandoffKey("ai-text-detector"), output);
    router.push(peerHref);
  };

  return (
    <WorkspaceFrame>
      <div className="flex flex-col gap-3 p-1">
        <RunBar
          label={textToolCopy.humanize}
          pendingLabel={textToolCopy.humanizing}
          pending={humanizer.pending}
          ready={ready}
          onRun={run}
        >
          <Segmented<HumanizeTone>
            label={textToolCopy.tone}
            size="sm"
            value={tone}
            options={toneOptions}
            onChange={setTone}
            disabled={humanizer.pending}
            className="scrollbar-none w-fit max-w-full overflow-x-auto"
          />
        </RunBar>

        <UpsellAlert message={humanizer.error} upsell={humanizer.upsell} />

        <div className="grid gap-3 lg:grid-cols-2">
          <TextInput value={text} onChange={changeText} onSubmit={run} disabled={humanizer.pending} />

          <div ref={resultRef} className="scroll-mt-20">
            <TextPane
              title={textToolCopy.output}
              meta={output && <span className="tabular-nums">{textToolCopy.words(countWords(output))}</span>}
              footer={
                output && (
                  <OutputActions text={output} shareTitle={textToolCopy.output} fileName="humanized-text.txt">
                    <Button variant="plain" className="text-[13px]" onClick={run} disabled={humanizer.pending}>
                      <RotateCcw className="size-3.5" aria-hidden />
                      {textToolCopy.tryAgain}
                    </Button>
                    <Button variant="ink" size="sm" onClick={checkOutput}>
                      <SearchCheck className="size-3.5" aria-hidden />
                      {textToolCopy.toDetector}
                    </Button>
                  </OutputActions>
                )
              }
              className="h-full"
            >
              {humanizer.pending ? (
                <PaneSkeleton />
              ) : output ? (
                <div className="flex flex-col gap-4 p-5 motion-safe:animate-fade-up">
                  <p className="text-[15.5px] leading-relaxed whitespace-pre-wrap">{output}</p>
                  <p className="rounded-xl bg-accent-soft px-4 py-3 text-[13px] leading-relaxed text-accent-text">
                    {textToolCopy.personalTip}
                  </p>
                </div>
              ) : (
                <PaneEmpty message={textToolCopy.outputEmpty} />
              )}
            </TextPane>
          </div>
        </div>
      </div>
    </WorkspaceFrame>
  );
}
