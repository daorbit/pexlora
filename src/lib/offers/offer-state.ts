import { offerPreview, seasonalOffer } from "@/config/offers";
import { isOfferActive, offerEnd, offerStart } from "@/lib/offers/offer-pricing";

const MINUTE_MS = 60 * 1000;

export const offerInitScript = `(function(){var n=Date.now();if(${offerPreview}||(n>=${offerStart}&&n<${offerEnd})){document.documentElement.dataset.offer="${seasonalOffer.id}";}})();`;

export function offerMinutesLeft(now: number) {
  return isOfferActive(now) ? Math.max(1, Math.ceil((offerEnd - now) / MINUTE_MS)) : null;
}

export function syncOfferAttribute(now: number) {
  const { dataset } = document.documentElement;
  if (isOfferActive(now)) dataset.offer = seasonalOffer.id;
  else delete dataset.offer;
}
