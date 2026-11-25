import { seasonalOffer } from "@/config/offers";

const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 24 * MINUTES_PER_HOUR;

const pad = (value: number) => String(value).padStart(2, "0");

export const offerCopy = {
  region: "Christmas sale on Pro passes",
  name: "Christmas Sale",
  nameShort: "Christmas",
  saving: `${seasonalOffer.percentOff}% Off`,
  scope: "All Pro Passes",
  scopeShort: "Pro Passes",
  endsIn: "Ends in",
  note: "Taken off automatically at checkout. No code needed.",
  greeting: "Merry Christmas!",
  cta: "See Plans",
  regularPrice: "Regular price",
};

function timeParts(minutes: number) {
  return {
    days: Math.floor(minutes / MINUTES_PER_DAY),
    hours: Math.floor((minutes % MINUTES_PER_DAY) / MINUTES_PER_HOUR),
    minutes: minutes % MINUTES_PER_HOUR,
  };
}

export function formatTimeLeft(total: number) {
  const { days, hours, minutes } = timeParts(total);
  return days > 0 ? `${pad(days)}d ${pad(hours)}h` : `${pad(hours)}h ${pad(minutes)}m`;
}

export function countdownUnits(total: number) {
  const { days, hours, minutes } = timeParts(total);
  return [
    { label: "days", value: pad(days) },
    { label: "hours", value: pad(hours) },
    { label: "min", value: pad(minutes) },
  ];
}
