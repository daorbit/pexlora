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
  cta: "See Plans",
  regularPrice: "Regular price",
};

export function formatTimeLeft(minutes: number) {
  const days = Math.floor(minutes / MINUTES_PER_DAY);
  const hours = Math.floor((minutes % MINUTES_PER_DAY) / MINUTES_PER_HOUR);
  return days > 0 ? `${pad(days)}d ${pad(hours)}h` : `${pad(hours)}h ${pad(minutes % MINUTES_PER_HOUR)}m`;
}
