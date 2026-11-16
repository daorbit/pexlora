# Plan: one-time payments with Razorpay

Status: proposal, nothing built yet. Research date: 16 November 2026.

## 1. Goal and constraints

- Let people pay **once** for more capacity. No subscriptions, no auto-renewal, no stored cards.
- Payments through **Razorpay** (DA Orbit's account), INR first.
- Keep the free tier generous. It drives SEO, word of mouth and trust, and most of our processing now runs in the browser, so free users cost us very little.
- Reuse what exists: accounts, `effectiveLimits()`, the quota in `consumeQuota`, admin custom limits, toasts, the email layout.

## 2. Competitor research

Prices come from public pages and third-party listings on the research date. Several could not be confirmed on the vendor's own page; check before quoting them publicly.

| Product | Model | Price | What paying unlocks |
|---|---|---|---|
| [AI Metadata Cleaner](https://aimetadatacleaner.com/subscription) (closest competitor) | Monthly subscription | Free: 10 image cleanups/day (JPEG, PNG, WebP, HEIC) + 3 videos/PDFs/RAW a month. Paid tier prices not visible in search | More daily cleanups, more video/PDF/RAW files |
| [iLoveIMG / iLovePDF Premium](https://www.ilovepdf.com/pricing) | Subscription (monthly or yearly) | About $7/month; one Indian listing shows [INR 500/month](https://www.techjockey.com/detail/iloveimg) | Unlimited processing, bigger files, larger batches (120 vs 30 files per task, per [this third-party breakdown](https://www.screensnap.pro/blog/iloveimg-upscale)), no ads, AI credits |
| [TinyPNG Web Pro](https://toolradar.com/tools/tinypng/pricing) | Yearly subscription | About $39/year (Ultra about $149/year) | Unlimited images, 75 MB per image (free: 20 per session, 5 MB) |
| [LudyExif](https://ludy-website.pages.dev/ludyexif) (iOS) | One-time | $2.99 | Batch, safe share, date editing |
| [EXIF Remover & Photo Cleaner](https://apps.apple.com/app/id6754863378) (iOS) | One-time | About ₱49 | Removes the free limits |
| [BitRecover Image Metadata Remover](https://www.bitrecover.com/image-metadata-remover/purchase.html) (desktop) | Perpetual licence | $29 personal, $49 business | Full desktop app |

What this tells us:

1. **Web tools in this space almost all sell subscriptions.** A clear one-time price is a real differentiator, especially in India, where people dislike recurring card mandates.
2. **One-time prices cluster low.** Mobile apps sit at $3–5; serious desktop tools at about $29.
3. **What people pay for is always the same set:** higher or no daily limits, bigger files, bigger batches, and AI credits. Nobody charges for basic metadata removal.
4. **The free tiers are similar to ours:** AI Metadata Cleaner gives 10 a day, the same as our signed-out limit.

## 3. Recommended pricing

Sell **passes** that expire, plus one **lifetime** option. Every option is a single payment that never renews.

| Product | Price (INR) | Suggested USD (international cards) | Duration |
|---|---|---|---|
| Pro Pass, 30 days | ₹99 | $2.99 | 30 days from purchase |
| Pro Pass, 1 year | ₹499 | $9.99 | 365 days |
| Pro Lifetime | ₹1,499 | $29 | No expiry |

Why this shape:

- **₹99** is an easy impulse buy for someone with a single urgent job, such as an exam form photo or a batch of listings.
- The **1-year pass** is the value option (about 58% cheaper per month) and is still not a subscription.
- **Lifetime** matches the $29 desktop price point. It's safe for us only because AI use stays capped per day (below); unlimited AI on a lifetime plan would cost us money for ever.
- Buying again while a pass is active **extends** it from the current end date, so nobody loses days.

### What Pro unlocks

Only things we can deliver now or with small changes:

| | Signed out | Free account | Pro |
|---|---|---|---|
| Files per day | 10 | 100 | 2,000 (fair use, effectively unlimited) |
| Files per batch | 10 | 10 | 50 |
| Orbit AI requests per day | 5 | 30 | 300 |
| Max file size, in-browser tools (JPG, PNG, WebP, HEIC, PDF, Office, audio, video) | current limits | current limits | Raised (for example images to 50 MB, see section 7) |
| Max file size, server tools (convert, compress, resize, edit) | 4 MB | 4 MB | 4 MB (Vercel's request limit; raising it needs a different upload path) |
| Pro badge, billing history, payment receipts | | | Yes |

Admin custom limits keep priority over plan limits, so support can still raise or lower them for any user.

## 4. How the payment flow works

```
Pricing page ──► "Buy" (must be signed in) ──► server action createOrder(plan)
     │                                             │ validates plan, rate limit,
     │                                             │ creates Razorpay order (amount from config),
     │                                             │ stores Purchase { status: "created" }
     ▼                                             ▼
Razorpay Checkout opens with order_id ──► user pays (UPI, card, netbanking)
     │
     ├─► browser: POST /api/payments/verify { order_id, payment_id, signature }
     │       HMAC-SHA256(order_id|payment_id, KEY_SECRET) must match (constant-time)
     │       → mark Purchase "paid", grant plan, toast, redirect
     │
     └─► Razorpay: POST /api/payments/webhook (payment.captured, order.paid, refund.processed)
             HMAC-SHA256(raw body, WEBHOOK_SECRET) must match X-Razorpay-Signature
             → same idempotent "grant" (covers closed tabs and failed redirects)
             → refund.processed revokes the plan
```

Rules that keep it safe:

- **The amount always comes from `config/plans.ts` on the server.** The browser only sends a plan id.
- **Granting is idempotent:** unique index on `razorpayOrderId` and `razorpayPaymentId`, and granting the same paid order twice does nothing.
- **The webhook is the source of truth.** The browser callback only gives instant feedback. The webhook reads the raw body before any JSON parsing, because the signature covers the exact bytes ([Hookdeck](https://hookdeck.com/webhooks/skills/razorpay-webhooks.md), [Razorpay docs](https://razorpay.com/docs/developer-tools/integrations/standard-checkout/)).
- **The order belongs to the signed-in user** (`notes.userId` plus the Purchase record). Verification fails for anyone else.
- **Rate limit order creation** with the existing `hitRateLimit`, for example 10 per hour per user.
- **Auto-capture is on** in the Razorpay dashboard, so payments never sit uncaptured.
- **No Razorpay npm SDK.** Two REST calls (create order, fetch payment) with Basic auth through `fetch` keep dependencies at zero; the signature checks use `node:crypto`.

## 5. Data model

- **`Purchase` (new collection):** `userId`, `plan`, `amount` (paise), `currency`, `razorpayOrderId` (unique), `razorpayPaymentId` (unique, sparse), `status` (`created | paid | failed | refunded`), `paidAt`, `refundedAt`, `createdAt`.
- **`User.plan`:** `{ tier: "pro", expiresAt: Date | null }`. `null` means lifetime; a missing value means free.
- **`effectiveLimits(user)`:** admin custom limit, else Pro limit while the plan is active, else the free default. The quota, sidebar ring, settings and admin pages already read limits through it, so Pro shows up everywhere automatically.
- **`config/plans.ts`:** plan ids, prices in paise and cents, durations, the Pro limits table. All copy in `content/pricing.ts`.

## 6. Pages and UI

- **`/pricing`** (marketing, indexable): three plan cards, a free-vs-Pro table, an FAQ ("Is this a subscription?" No. "Refunds?" Yes, within 7 days). JSON-LD `Product` with `Offer`s.
- **Upsell at the limit:** signed-in users who hit the daily limit currently get no upgrade path. Show "Get Pro" in `UpsellAlert`. Signed-out users keep "Create a free account".
- **Settings › Plan & usage:** current plan, expiry date or "Lifetime", billing history with receipt links.
- **Admin:** purchases list (user, plan, amount, status, date), plan shown on the user page, manual grant or revoke for support.
- **Toasts:** "Payment received. Pro is active until 16 December 2026." Failures: "Payment didn't go through. You haven't been charged."
- **Emails** (existing layout): payment receipt, plus a reminder 3 days before a pass expires. The reminder is informational only; we never charge automatically.

## 7. Raising file size limits for Pro

The browser-processed formats (JPG, PNG, WebP, HEIC, PDF, Office, audio, video) never hit Vercel's 4.5 MB request limit, so Pro can safely allow larger files there. `getFileError` needs the user's plan (pass `maxImageMb` from `CurrentUser` to `WorkspacePanel`). Server tools stay at 4 MB until uploads move to direct-to-storage (out of scope).

## 8. Razorpay account and compliance checklist (owner)

1. Razorpay account for DA Orbit with business KYC completed and website approved.
2. Razorpay checks the website for policy pages before activation. We have Privacy, Terms, Contact and Security. We still need:
   - **Refund & Cancellation policy** (proposal: full refund within 7 days if the Pro limits were barely used; passes can't be paused).
   - **Delivery policy** ("digital access, activated instantly after payment").
   - Visible prices on `/pricing`.
3. Enable **international payments** in the dashboard if you want USD buyers.
4. Fees, as listed by [third parties](https://learnwithhasan.com/payment-gateways/razorpay/): about 2% + GST domestic and 3% + GST international, no setup fee. Confirm on razorpay.com/pricing.
5. **GST:** ask a CA whether DA Orbit must register and charge GST on digital services (it depends on turnover and on selling to customers abroad). Receipts should show this correctly from day one.
6. Create a webhook in the dashboard pointing to `https://pexlora.daorbit.in/api/payments/webhook` with events `payment.captured`, `order.paid`, `refund.processed`, and save its secret.
7. Environment variables on Vercel: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`. Only the key id is ever sent to the browser.

## 9. Security notes

- Checkout script from `checkout.razorpay.com`; it opens its frame from `api.razorpay.com`. Our CSP has no `script-src` or `frame-src`, so nothing needs changing, but re-check if a strict CSP is added later.
- All signature checks are constant-time (`timingSafeEqual`).
- No card or UPI data ever touches our servers; Razorpay handles it.
- Log payment events (order id, status, amount) without personal details.

## 10. Build phases

| Phase | Work | Estimate |
|---|---|---|
| 1 | `config/plans.ts`, `Purchase` model, `User.plan`, plan-aware `effectiveLimits` | 0.5 day |
| 2 | Razorpay client (fetch), `createOrder` action, `/api/payments/verify`, webhook, idempotent grant and revoke | 1 day |
| 3 | `/pricing` page, checkout button, upsell at limit, toasts | 1 day |
| 4 | Settings plan and billing history, receipt and expiry emails | 0.5 day |
| 5 | Admin purchases list, grant and revoke | 0.5 day |
| 6 | Refund and delivery policy pages, pricing FAQ and JSON-LD | 0.5 day |
| 7 | End-to-end tests in Razorpay test mode (success, failure, closed tab, webhook only, double webhook, refund) | 0.5 day |

About 4–5 days of work, plus Razorpay's account approval time.

## 11. Decisions needed from you

1. Prices: keep ₹99 / ₹499 / ₹1,499, or adjust?
2. Offer Lifetime at launch, or start with passes only and add Lifetime later?
3. Accept international cards (USD) from day one?
4. Refund window: 7 days?
5. Pro limits: 2,000 files a day, 50 per batch, 300 Orbit AI requests a day?
6. GST: has the CA confirmed whether to charge it?
