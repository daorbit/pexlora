"use client";

import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, SearchCheck } from "lucide-react";
import { AI_TEXT_LIMITS } from "@/config/limits";
import { textHandoffKey } from "@/config/text-tools";
import { humanizerCopy } from "@/content/ai";
import { useAiAction } from "@/hooks/useAiAction";
import { useScrollToResult } from "@/hooks/useScrollToResult";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import { useTextToolSession } from "@/hooks/useTextToolSession";
import { humanScore } from "@/lib/ai/human-score";
import { countWords } from "@/lib/ai/text-stats";
import { HUMANIZE_STRENGTHS, HUMANIZE_TONES, type HumanizeStrength, type HumanizeTone } from "@/lib/ai/types";
import { handOff } from "@/lib/utils/file-handoff";
import { humanizeText } from "@/services/ai-api";
import { Button } from "@/components/ui/Button";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { OrbitWorkingState } from "@/components/text-tools/OrbitWorkingState";
import { OutputActions } from "@/components/text-tools/OutputActions";
import { PaneEmpty } from "@/components/text-tools/PaneEmpty";
import { RunBar } from "@/components/text-tools/RunBar";
import { TextInput } from "@/components/text-tools/TextInput";
import { TextPane } from "@/components/text-tools/TextPane";
import { HumanizerControls } from "@/components/text-tools/humanizer/HumanizerControls";
import { HumanizerResult } from "@/components/text-tools/humanizer/HumanizerResult";
import { LiveScoreChip } from "@/components/text-tools/humanizer/LiveScoreChip";
import { WorkspaceFrame } from "@/components/workspace/WorkspaceFrame";

type HumanizerSession = { text: string; source?: string; output?: string };

export function HumanizerWorkspace({ peerHref }: { peerHref: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [tone, setTone] = useSearchParamState<HumanizeTone>("tone", HUMANIZE_TONES, "natural");
  const [strength, setStrength] = useSearchParamState<HumanizeStrength>("strength", HUMANIZE_STRENGTHS, "balanced");
  const humanizer = useAiAction(humanizeText);
  const { restore } = humanizer;
  const output = humanizer.data?.text ?? "";
  const resultRef = useScrollToResult(output);

  const deferredText = useDeferredValue(text);
  const words = countWords(text);
  const ready = words >= AI_TEXT_LIMITS.minWords;
  const liveScore = useMemo(
    () => (countWords(deferredText) >= AI_TEXT_LIMITS.minWords ? humanScore(deferredText).score : null),
    [deferredText],
  );

  const snapshot = useMemo(() => ({ text, source, output }), [text, source, output]);
  const applySession = useCallback(
    (session: HumanizerSession) => {
      setText(session.text);
      setSource(session.source ?? session.text);
      if (session.output) restore({ text: session.output, quotaRemaining: null });
    },
    [restore],
  );
  useTextToolSession("ai-humanizer", snapshot, applySession);

  const run = () => {
    if (!ready || humanizer.pending) return;
    setSource(text);
    humanizer.run(text, tone, strength);
  };

  const runAgain = () => {
    if (output && !humanizer.pending) humanizer.run(output, tone, strength);
  };

  const checkOutput = () => {
    handOff(textHandoffKey("ai-text-detector"), output);
    router.push(peerHref);
  };

  return (
    <WorkspaceFrame>
      <div className="flex flex-col gap-3 p-1">
        <RunBar
          label={humanizerCopy.run}
          pendingLabel={humanizerCopy.running}
          pending={humanizer.pending}
          words={words}
          onRun={run}
        >
          <HumanizerControls
            tone={tone}
            strength={strength}
            onTone={setTone}
            onStrength={setStrength}
            disabled={humanizer.pending}
          />
        </RunBar>

        <UpsellAlert message={humanizer.error} upsell={humanizer.upsell} />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <TextInput
            value={text}
            onChange={setText}
            onSubmit={run}
            disabled={humanizer.pending}
            meta={liveScore !== null && <LiveScoreChip score={liveScore} />}
          />

          <div ref={resultRef} className="scroll-mt-20">
            <TextPane
              title={humanizerCopy.output}
              footer={
                output &&
                !humanizer.pending && (
                  <OutputActions text={output} shareTitle={humanizerCopy.output} fileName={humanizerCopy.fileName}>
                    <Button variant="plain" className="text-[13px]" onClick={runAgain}>
                      <RefreshCw className="size-3.5" aria-hidden />
                      {humanizerCopy.again}
                    </Button>
                    <Button variant="ink" size="sm" onClick={checkOutput}>
                      <SearchCheck className="size-3.5" aria-hidden />
                      {humanizerCopy.toDetector}
                    </Button>
                  </OutputActions>
                )
              }
              className="h-full"
            >
              {humanizer.pending ? (
                <OrbitWorkingState steps={humanizerCopy.steps} />
              ) : output ? (
                <HumanizerResult source={source || text} output={output} />
              ) : (
                <PaneEmpty message={humanizerCopy.outputEmpty} />
              )}
            </TextPane>
          </div>
        </div>
      </div>
    </WorkspaceFrame>
  );
}
