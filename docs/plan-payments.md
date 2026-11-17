# Plan: one-time payments with Razorpay

Status: **v1 is live** (Pro passes with Razorpay, sections 3–9). **v2 is a proposal** (sections 2, 10–13), based on competitor research on 17 November 2026.

## 1. Goal and constraints

- Let people pay **once** for more capacity. No subscriptions, no auto-renewal, no stored cards.
- Payments through **Razorpay** (DA Orbit's account), INR first.
- Keep the free tier generous. It drives SEO, word of mouth and trust, and most of our processing now runs in the browser, so free users cost us very little.
- Reuse what exists: accounts, `effectiveLimits()`, the quota in `consumeQuota`, admin custom limits, toasts, the email layout.

## 2. Competitor research

First pass 16 November 2026, updated 17 November 2026. iLovePDF and iLoveIMG figures come from their own pricing pages (prices shown in INR); the rest come from third-party listings that disagree with each other, so check them before quoting publicly.

| Product | Model | Price | Free plan | What paying unlocks |
|---|---|---|---|---|
| [iLovePDF Premium](https://www.ilovepdf.com/pricing) | Subscription | ₹500/month, or ₹2,900/year (about ₹242/month, "-42%"). Business (25+ users): custom | Limited tools, small batches, ads | All tools; batches up to 500 (Merge, Image to PDF) and 10–80 for most tools; files up to 4 GB (free 15–200 MB); no ads; priority support; 2,000 AI credits; desktop and mobile apps; workflows; teams (1–25 users); e-signatures with audit trail and branding. Business adds SSO, dedicated support, account manager, custom contracts. Students get a free year |
| [iLoveIMG Premium](https://www.iloveimg.com/pricing) | Subscription | Same prices as iLovePDF (one Premium covers both) | 30 images per task, 200 MB per task, ads | 120 images per task, 4 GB per task, no ads, preferential support, 2,000 AI credits, teams, workflows, mobile via iLovePDF. Business: dedicated support, SSO, 11 processing regions |
| [Smallpdf Pro](https://www.capterra.com/p/172606/Smallpdf/pricing/) | Subscription | About $9–15/month depending on billing ([Software Advice](https://www.softwareadvice.com/cms/smallpdf-profile/), [Toolradar](https://toolradar.com/tools/smallpdf/pricing)); Team about $12/seat | About 2 tasks a day, 7-day Pro trial ([Smallpdf blog](https://smallpdf.com/blog/smallpdf-free-vs-pro-plan-comparison)) | Unlimited tasks, AI features; Team adds priority support, central billing, member management |
| [TinyPNG Web Pro](https://toolradar.com/tools/tinypng/pricing) | Yearly subscription | About $39/year (Ultra about $149/year) | 20 images per session, 5 MB | Unlimited images, 75–150 MB per image |
| [AI Metadata Cleaner](https://aimetadatacleaner.com/subscription) (closest competitor) | Monthly subscription | Paid prices not visible | 10 image cleanups/day + 3 videos/PDFs/RAW a month | More daily cleanups and files |
| [LudyExif](https://ludy-website.pages.dev/ludyexif) (iOS) | One-time | $2.99 | | Batch, safe share, date editing |
| [BitRecover Image Metadata Remover](https://www.bitrecover.com/image-metadata-remover/purchase.html) (desktop) | Perpetual licence | $29 personal, $49 business | | Full desktop app |

What this tells us:

1. **The big players sell visible perks, not just a counter:** bigger batches, much bigger files, no ads, priority support, AI credits, apps, teams. Pexlora Pro today only raises daily limits.
2. **Every serious competitor has a Business or Team tier** (contact sales, multiple seats, dedicated support).
3. **Support is a listed feature at every level:** basic, then priority, then dedicated. Pexlora doesn't describe its support anywhere.
4. **Their comparison tables are long** (30+ rows); ours has 3.
5. **We are far cheaper:** ₹499/year against ₹2,900/year, and pay-once with no auto-renewal is still unusual in this space. Keep pay-once, make Pro worth more, then raise the price (section 10).
6. **Free tiers:** ours is already more generous (every tool, no ads, 10 files signed out, 100 with an account), which is good for SEO and trust.

## 3. Pricing (v1, live)

Sell **passes** that expire, plus one **lifetime** option. Every option is a single payment that never renews. v2 raises these prices once the new Pro features ship (section 10).

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

### What Pro unlocks (v1)

| | Signed out | Free account | Pro | Live? |
|---|---|---|---|---|
| Files per day | 10 | 100 | 2,000 (fair use) | Yes |
| Orbit AI requests per day | 5 | 30 | 100 (was 300, see section 12) | Yes |
| Files per batch | 10 | 10 | 50 | Yes |
| Max file size, in-browser tools (JPG, PNG, WebP, HEIC, PDF, Office, audio, video) | current limits | current limits | Raised (section 10) | Yes |
| Max file size, server tools (convert, compress, resize, edit) | 4 MB | 4 MB | 4 MB (Vercel's request limit) | n/a |
| Pro badge, billing history, payment receipts | | | Yes | Yes |

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

## 10. v2 proposal: make Pro worth more, then charge more

v1 Pro only raises two daily counters, and at ₹499 a year it costs about a sixth of iLovePDF. v2 adds features people can see first, then raises the price. Still pay-once, never renews. **No Business or Team tier.** Orbit AI stays part of every plan: there is no separate AI purchase, add-on or credit pack, only a daily AI limit per plan.

### New prices (switch on only after the features below ship)

| Plan | v1 (live) | v2 | Note |
|---|---|---|---|
| 30-Day Pass | ₹99 | **₹199** | iLovePDF is ₹500/month |
| 1-Year Pass | ₹499 | **₹999** | About ₹83/month, "Save 58%"; iLovePDF is ₹2,900/year |
| Lifetime | ₹1,499 | **₹2,999** | Covers included AI with no end date |

Existing buyers keep what they paid for; passes never renew, so there is nothing to migrate. Change `PLANS` in `config/plans.ts` and the copy in `content/pricing.ts` together.

### Free vs Pro

| Feature | Signed out | Free account | **Pro** |
|---|---|---|---|
| Every tool, no ads | Yes | Yes | Yes |
| Files per day | 10 | 100 | 2,000 |
| Files per batch | 10 | 10 | **50** |
| File size, in-browser tools | Photos 4 MB, PDF/Office 100 MB, audio 300 MB, video 2 GB | Same | **Photos 20 MB, PDF/Office 500 MB, audio 1 GB** (video stays 2 GB, the browser's memory limit) |
| File size, server tools | 4 MB | 4 MB | 4 MB |
| Files processed at once | `PARALLEL_FILE_JOBS` | `PARALLEL_FILE_JOBS` | **Higher** (faster batches) |
| Orbit AI per day (included in the plan) | 5 | 30 | **100** (section 12) |
| Bulk AI alt text with CSV export | | | **Yes** |
| Batch metadata templates (save author, copyright, contact once; apply to a whole batch) | | | **Yes** |
| Metadata reports as CSV or PDF | | | **Yes** |
| Saved custom presets (photo resizer sizes, compress targets, convert settings) | | | **Yes** |
| Custom output file names, one ZIP per batch | | | **Yes** |
| History on this device | 24 hours | 24 hours | **7 days** |
| Support | Help page | Email, best effort | **Priority email, reply within 24 hours** |
| Early access to new tools | | | Yes |
| Student offer | | | 50% off with a college email (optional) |

All new Pro features run in the browser or reuse existing code, so they add almost no cost per user.

Pricing page changes:

- A full comparison table: every row above, grouped (Limits, Pro tools, AI, Support).
- Perk list on the cards shows the new features, not just the two counters.
- Clear support line under the cards: who to email, reply times per plan.

## 11. v2 support plan

- **Help & Support page** (`/help`): common questions (limits, refunds, file types, privacy), a contact form, the support email, and reply times per plan.
- **Reply times:** free accounts best effort (aim 2–3 working days), Pro within 24 hours.
- **Contact form** tags the sender's plan automatically so Pro messages are answered first.
- **Refund and billing questions** link to the existing refund policy and settings billing history.

## 12. Orbit AI cost risk

Orbit AI runs on Cloudflare Workers AI's **free plan: about 10,000 neurons a day for the whole site**, roughly 100–150 AI uses in total with the current models (see CLAUDE.md, Orbit AI). v1 promises **300 AI uses a day to every Pro user**, so a few Pro users could use up the site's AI for everyone.

Orbit AI is included in the plans and never billed separately, so any extra AI cost comes out of the plan price. Options:

1. **Cut Pro to 100 AI uses a day** and keep the free Cloudflare plan (honest, no new cost).
2. **Move to Workers Paid** (about $0.011 per 1,000 neurons, roughly ₹0.15 per alt text) and keep 300, using `AI_DAILY_NEURON_BUDGET` as a spending cap. This is our cost, paid from Pro revenue, not a charge to users.

## 13. v2 build phases

| Phase | Work | Estimate |
|---|---|---|
| 1 | **Done:** Pro Orbit AI cut to 100 a day (section 12, option 1) | 0.25 day |
| 2 | **Done:** plan-aware batch size (`MAX_FILES_PER_BATCH` per plan), file-size limits for in-browser tools, higher parallel jobs | 0.5 day |
| 3 | 7-day history for Pro (`useWorkspaceSession` max age per plan) | 0.25 day |
| 4 | Batch metadata templates (Edit Metadata tool) | 0.5 day |
| 5 | Bulk AI alt text with CSV export, metadata report CSV/PDF export | 0.75 day |
| 6 | Saved custom presets, custom output names and batch ZIP | 0.75 day |
| 7 | Pricing page v2: new prices, full comparison table, perks, support line | 0.5 day |
| 8 | `/help` page and contact form with plan tagging | 0.5 day |
| 9 | Optional student discount (college email check, coupon on order) | 0.5 day |

About 4.5 days of work. Phase 7 (new prices) goes live only after phases 2–6.

### v1 build phases (done)

| Phase | Work |
|---|---|
| 1 | `config/plans.ts`, `Purchase` model, `User.plan`, plan-aware `effectiveLimits` |
| 2 | Razorpay client (fetch), `createOrder` action, `/api/payments/verify`, webhook, idempotent grant and revoke |
| 3 | `/pricing` page, checkout button, upsell at limit, toasts |
| 4 | Settings plan and billing history, receipt emails |
| 5 | Admin purchases, grant and revoke |
| 6 | Refund policy page, pricing FAQ |

## 14. Decisions needed from you (v2)

Decided: no Business tier; Orbit AI is included in the plans, never billed separately.

1. New prices ₹199 / ₹999 / ₹2,999 once the features ship?
2. Orbit AI for Pro: set to 100 a day on the free Cloudflare plan for now. Move to Workers Paid later if Pro users hit it?
3. Support: which email address, and are the reply times in section 11 right?
4. Offer the 50% student discount?
5. GST: has the CA confirmed whether to charge it? (still open from v1)
