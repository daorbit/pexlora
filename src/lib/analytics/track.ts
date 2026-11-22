import { analyticsConfig, type AnalyticsEvent } from "@/config/analytics";

type Props = Record<string, string | number | boolean>;

type Tracker = { track: (name: string, props?: Props) => void };

const pending: { name: AnalyticsEvent; props: Props }[] = [];
let retries = 0;
let timer: ReturnType<typeof setTimeout> | null = null;

function tracker() {
  return (window as Window & { rta?: Tracker }).rta;
}

function flush() {
  timer = null;
  const target = tracker();
  if (target) {
    for (const event of pending.splice(0)) target.track(event.name, event.props);
    return;
  }
  if (retries++ < analyticsConfig.maxRetries) timer = setTimeout(flush, analyticsConfig.retryMs);
  else pending.length = 0;
}

export function track(name: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  try {
    const target = tracker();
    if (target && !pending.length) return target.track(name, props);
    if (pending.length < analyticsConfig.queueLimit) pending.push({ name, props });
    timer ??= setTimeout(flush, 0);
  } catch {}
}
