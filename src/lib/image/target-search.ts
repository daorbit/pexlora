const QUALITY = { min: 20, max: 95 } as const;
const QUALITY_PASSES = 6;
const RESCALED_QUALITY_PASSES = 3;
const SCALE_PASSES = 5;
const MIN_SCALE = 0.25;
const MAX_SCALE_STEP = 0.9;
const SCALE_MARGIN = 0.95;
const QUALITY_TOLERANCE = 2;

export type SizedAttempt = { size: number };

type Probe = { quality: number; size: number | null };
type EncodeAt<A> = (quality: number) => Promise<A>;

export type TargetSearch<F, A extends SizedAttempt> = {
  targetBytes: number;
  formats: F[];
  hasQualityRange: (format: F) => boolean;
  encoder: (format: F, scale: number) => EncodeAt<A>;
  timeBudgetMs: number;
};

export type TargetOutcome<A> = { attempt: A; met: boolean };

function nextQuality(low: Probe, high: Probe, targetBytes: number, bisect: boolean) {
  const midpoint = Math.round((low.quality + high.quality) / 2);
  if (bisect || high.size === null || low.size === null || high.size <= low.size) return midpoint;

  const ratio = Math.log(targetBytes / low.size) / Math.log(high.size / low.size);
  const guess = Math.round(low.quality + ratio * (high.quality - low.quality));
  return Math.min(high.quality - 1, Math.max(low.quality + 1, guess));
}

export async function searchTarget<F, A extends SizedAttempt>({
  targetBytes,
  formats,
  hasQualityRange,
  encoder,
  timeBudgetMs,
}: TargetSearch<F, A>): Promise<TargetOutcome<A>> {
  const deadline = Date.now() + timeBudgetMs;
  const timeLeft = () => Date.now() < deadline;
  const fits = (attempt: A) => attempt.size <= targetBytes;
  const smaller = (a: A | null, b: A) => (a && a.size <= b.size ? a : b);

  async function highestFittingQuality(encodeAt: EncodeAt<A>, floor: A, ceiling: Probe, passes: number) {
    let best = floor;
    let low: Probe = { quality: QUALITY.min, size: floor.size };
    let high = ceiling;
    let bisect = false;
    let lastFit: boolean | null = null;

    for (let pass = 0; pass < passes && high.quality - low.quality > QUALITY_TOLERANCE && timeLeft(); pass += 1) {
      const quality = nextQuality(low, high, targetBytes, bisect);
      const attempt = await encodeAt(quality);
      const fit = fits(attempt);
      if (fit) {
        best = attempt;
        low = { quality, size: attempt.size };
      } else {
        high = { quality, size: attempt.size };
      }
      bisect = fit === lastFit;
      lastFit = fit;
    }

    return best;
  }

  let smallest: A | null = null;

  for (const format of formats) {
    const encodeAt = encoder(format, 1);
    const top = await encodeAt(QUALITY.max);
    if (fits(top)) return { attempt: top, met: true };
    smallest = smaller(smallest, top);
    if (!hasQualityRange(format)) continue;

    const floor = await encodeAt(QUALITY.min);
    if (fits(floor)) {
      const ceiling = { quality: QUALITY.max, size: top.size };
      return { attempt: await highestFittingQuality(encodeAt, floor, ceiling, QUALITY_PASSES), met: true };
    }
    smallest = smaller(smallest, floor);
  }

  const format = formats[formats.length - 1];
  const quality = hasQualityRange(format) ? QUALITY.min : QUALITY.max;
  let scale = 1;
  let lastSize = smallest!.size;

  for (let pass = 0; pass < SCALE_PASSES && scale > MIN_SCALE && timeLeft(); pass += 1) {
    const estimate = scale * Math.sqrt(targetBytes / lastSize) * SCALE_MARGIN;
    scale = Math.max(MIN_SCALE, Math.min(estimate, scale * MAX_SCALE_STEP));

    const encodeAt = encoder(format, scale);
    const floor = await encodeAt(quality);
    if (fits(floor)) {
      const best = hasQualityRange(format)
        ? await highestFittingQuality(encodeAt, floor, { quality: QUALITY.max, size: null }, RESCALED_QUALITY_PASSES)
        : floor;
      return { attempt: best, met: true };
    }

    smallest = smaller(smallest, floor);
    lastSize = floor.size;
  }

  return { attempt: smallest!, met: false };
}
