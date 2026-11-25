export type SeasonalOffer = {
  id: string;
  percentOff: number;
  startsAt: string;
  endsAt: string;
};

export const seasonalOffer: SeasonalOffer = {
  id: "christmas-2026",
  percentOff: 30,
  startsAt: "2026-12-01T00:00:00+05:30",
  endsAt: "2027-01-01T00:00:00+05:30",
};

export const OFFER_CHECKOUT_GRACE_MS = 30 * 60 * 1000;

export const offerPreview = process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_OFFER_PREVIEW === "1";
