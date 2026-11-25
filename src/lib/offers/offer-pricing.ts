import { OFFER_CHECKOUT_GRACE_MS, offerPreview, seasonalOffer } from "@/config/offers";
import type { Plan } from "@/config/plans";

const PAISE_PER_RUPEE = 100;

export const offerStart = Date.parse(seasonalOffer.startsAt);
export const offerEnd = Date.parse(seasonalOffer.endsAt);

export function isOfferActive(now: number, graceMs = 0) {
  return offerPreview || (now >= offerStart && now < offerEnd + graceMs);
}

export function offerAmountPaise(amountPaise: number) {
  const discounted = (amountPaise * (100 - seasonalOffer.percentOff)) / 100;
  return Math.floor(discounted / PAISE_PER_RUPEE) * PAISE_PER_RUPEE;
}

export function checkoutPrice(plan: Plan, now: number) {
  return isOfferActive(now, OFFER_CHECKOUT_GRACE_MS)
    ? { amount: offerAmountPaise(plan.amountPaise), offerId: seasonalOffer.id }
    : { amount: plan.amountPaise, offerId: null };
}
