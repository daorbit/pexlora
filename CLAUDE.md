@AGENTS.md

# Pexlora

Free image utilities in one Next.js app: remove AI metadata, convert formats, inspect image tags. Every tool works on the landing page without an account; signing in only raises the daily limit (10 → 100 files).

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — type-check

## Stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4
- Backend is Next.js itself: route handlers in `src/app/api`, server actions in `src/actions`
- MongoDB Atlas via Mongoose (users, daily usage)
- sharp (encode/convert) + exifr (read EXIF/XMP/IPTC/GPS)
- Auth: email + password (bcryptjs) or Google OAuth (code flow + PKCE, ID token verified with jose against Google's JWKS, `src/lib/auth/google.ts`, routes `/api/auth/google` and `/api/auth/google/callback`). Both end in the same JWT session cookie. A Google sign-in with an existing email links `googleId` to that user; Google-only users have no `passwordHash`.
- Mail: nodemailer over Gmail SMTP (Google App Password), sent from goswamiajay526@gmail.com
- Icons: lucide-react only
- Deployed on Vercel (`vercel.json`, region `bom1`)

## Project structure

```
src/
  app/
    (marketing)/       landing page + one page per tool (remove-ai-metadata, convert-image, metadata-viewer)
    (auth)/            signin, signup
    (app)/dashboard/   signed-in area
    api/images/        inspect | clean | convert route handlers
  actions/             server actions (auth)
  components/
    ui/                primitives: Button, Card, Badge, Segmented, GroupedList, Section, FormField, Alert
    layout/            SiteHeader, SiteFooter, Logo, HeaderAuth, UserMenu
    landing/           marketing sections
    workspace/         the tool UI: ToolWorkspace → WorkspacePanel → Dropzone / FileRow / QueueToolbar
    tools/             ToolList, ToolPage
    auth/, dashboard/
  config/              site (name, routes, nav), tools, limits
  content/             landing copy (tags, steps, specs, FAQ)
  hooks/               useImageQueue, useFilePicker, useFileDrop
  lib/
    api/               ApiError + withApiErrors, upload parsing, quota, image responses
    auth/              session cookie, token, password, DAL (getCurrentUser / requireUser)
    image/             formats, metadata inspection, processing, AI-tag detection, validation
    mail/              transport + HTML templates
    db/                cached mongoose connection
  models/              User, Usage
  services/            server: user, usage, mail · client: image-api (fetch wrappers)
  proxy.ts             optimistic auth redirects (Next 16 "proxy" = old middleware)
```

## Coding rules

- No comments in CSS files, and no unnecessary comments in code.
- No inline styles. Use Tailwind classes and the tokens in `src/app/globals.css`. (HTML email templates are the only exception.)
- Split code into components, hooks, utils and services; never put a whole feature in one file.
- Reuse before writing: check `components/ui`, `hooks`, `lib/utils` and `config` first. Extract anything repeated.
- Server-only modules start with `import "server-only"`.
- Copy and limits come from `config/` and `content/`, never hard-coded in components.

## Design system (pearl, ink and neon lime)

- Not Quantalog any more. No blue or teal anywhere, no gradients, no coloured glow shadows. Approved mockup: https://claude.ai/artifact/XHamM1FBhgv1HnbHdP8w2k
- Light: page pearl #f4f3ee, cards white, text ink #10120d, muted #5f6359, borders #e7e5dd. Dark: #0c0d0a page, #161813 surfaces, pearl text.
- Brand colour is neon lime #b9f12f (`primary`), used as a fill: buttons, the active tab, the `<Highlight>` marker in headlines, badges, the sign-up band. Lime is never body text on light backgrounds; use `accent-text` (#3f6212) for readable lime-ish text. `ink` is the second button colour (black pill with a lime arrow chip, pearl in dark).
- Buttons are pills (`rounded-full`). `Button`/`ButtonLink` take `variant` (primary | ink | secondary | outline | plain | nav | icon) and `arrow` for the round arrow chip. Focus rings use `outline-ring`.
- Headings: semibold (`font-semibold`, `tracking-[-0.028em]`), hero `font-bold`. `Section` takes `tone` ("page" | "surface") to alternate pearl and white bands and `align`; `SectionHeading` is the eyebrow + h2 block for custom layouts. Eyebrows are small grey uppercase.
- Segmented controls (options bars, hub filter) use `segmented-styles.ts` (pill track, lime active pill). The tool sits in `WorkspaceFrame` on tool pages and the dashboard.
- Dark bands (privacy card, footer) use `theme-dark` so tokens flip regardless of theme.
- Tokens live in globals.css (light under :root, dark under :root[data-theme="dark"] **and** .theme-dark).
- **The homepage is a tool hub** (like iLovePDF): `HomeHero` (h1 + one line + `HeroUpload` drop area + trust chips), then `ToolHubSection` (category filter + `HubCard` grid), then SEO content. No tool tabs anywhere. Files dropped in the hero are handed to `/remove-ai-metadata` via `lib/utils/file-handoff.ts` + `useHandedOffFiles`. No floating decorations, stats strips or marketing heroes.
- Tool hub data lives in `config/tool-hub.ts` (homepage grid, header `ToolsMenu`, `MobileMenu`). Conversion pages are `/convert/[pair]` from `config/conversions.ts`, preselecting the output format via `initialOptions`.
- Animations are CSS only (`globals.css`): `animate-fade-up`, `animate-pop`, `animate-progress`, and the scroll-driven `reveal` utility that every `Section` uses. Always prefix with `motion-safe:`; never animate `translate` on an element that also uses `translate-*` classes.
- Header is a short (h-14) sticky white bar: logo, centred nav, theme toggle, Sign In, lime "Get Started"/"Dashboard" pill. Phones get `MobileMenu` (full-screen sheet with the theme switch).
- Mobile is first-class: full-width tabs and buttons, sticky `QueueToolbar` with safe-area padding, `viewportFit: cover`, installable web app (`app/manifest.ts`, `appleWebApp`).
- On iPhone/iPad, saving images and videos goes through the share sheet (`saveFiles` in `lib/utils/save-file.ts`) so "Save Image/Video" lands in Photos; everything else downloads (zip for many).
- Google One Tap shows for signed-out visitors on marketing pages (`OneTapGate` → `GoogleOneTap`, route `/api/auth/google/one-tap` with a nonce cookie). The site origin must be listed under Authorized JavaScript origins for the OAuth client in Google Cloud.
- **No decorative gradients.** Tile tints are solid color-mix colours (`tone-lime`, `tone-orange`, `tone-ink`).
- Colour meaning: **orange = AI tags**, **green = clean / success**, **red = errors**.
- Tool and conversion icons (hub cards, mega menu, tool heroes) are coloured SVG files in `public/icons/tools` and `public/icons/convert`, generated by `npm run icons` (`scripts/generate-tool-icons.mjs` holds the per-tool and per-format colours). Render them with `HubItemIcon`. The small monochrome icons in `components/icons` are for the dashboard sidebar and UI.
- **Never use sparkle icons** (lucide `Sparkles` etc.). For AI tags use the custom `AiTagIcon` in `src/components/icons/`; add new custom icons there when lucide has no fitting one.
- Fonts: Apple's system stack (`-apple-system`, SF Pro) with Inter as the fallback on Windows/Android, Geist Mono for metadata values.
- Every clickable element gets `cursor: pointer` (base layer in `globals.css`). Don't remove it.
- Theme: **Light / Dark only** (no System option). `ThemeScript` sets `data-theme` before paint (stored choice, else the device setting on first visit); `useTheme` (useSyncExternalStore) + `ThemeToggle` (header icon) + `ThemeSwitcher` (footer / settings).
- Every tool has its own page (`ToolPage` → `ToolHero` + `ToolWorkspace`). Header, footer and menus link to those routes, never to `/#tool` hashes.
- Scrollbar: thin, themed via `--scrollbar-thumb` / `--scrollbar-thumb-hover` in `globals.css`.
- Button and title labels use title case ("Choose Images"); headlines are sentence case.

## Dashboard

- `(app)` layout = `DashboardShell`: fixed sidebar (`SidebarNav`, config in `src/config/dashboard.ts`), top bar (`DashboardHeader` with page title, today's usage, theme toggle), mobile drawer (`MobileNav`).
- Routes: `/dashboard` (overview: usage stats + tool cards), `/dashboard/cleaner`, `/dashboard/converter`, `/dashboard/inspector` (each a `ToolModule`: workspace + tips/limits aside), `/dashboard/settings`.
- Usage read via `getUserUsage` (`src/lib/auth/usage.ts`); keys come from `usageKeys` in `usage.service.ts`.
- New tools: add to `config/tools.ts`, then to `dashboardModules` in `config/dashboard.ts`, plus a page under `(app)/dashboard/`.

## Next.js 16 specifics

- `cacheComponents` is on: any component that reads cookies/session (e.g. `HeaderAuth`, `DashboardGreeting`) must sit inside `<Suspense>`.
- Middleware is `src/proxy.ts`; it only does optimistic cookie checks. Real auth checks happen in the DAL (`requireUser`) and in every action/route.
- Use `after()` from `next/server` for work after the response (e.g. the welcome email).
- Read `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Image pipeline

- Client validates type/size (`lib/image/validate.ts`), then posts each file to `/api/images/*`.
- `inspect` returns an `ImageReport` (groups: C2PA, PNG text, XMP, IPTC, GPS, EXIF, ICC; AI entries flagged).
- `clean` re-encodes with sharp (metadata dropped by default, orientation baked in) and re-inspects the output to report leftover tags.
- `convert` takes `format` (jpeg/png/webp/avif) and `quality`.
- sharp reports AVIF as `heif`; `toOutputFormat` maps it back.
- Quota: `consumeImageQuota` counts per user or per hashed IP per UTC day in Mongo. If Mongo is unreachable it fails open.

## Brand assets

- Source logo: `public/Pexlora.png` (white background, drop shadow).
- `npm run brand:assets` runs `scripts/generate-brand-assets.mjs`, which cuts the mark out by color saturation and writes `public/brand/` (transparent mark, light/dark icon tiles at 64 and 512, apple-touch-icon) plus `public/favicon.ico`.
- Paths live in `src/config/brand.ts`. The header uses the transparent mark; favicons switch light/dark via `metadata.icons` media queries in `src/app/layout.tsx`.
- Don't add `src/app/favicon.ico` back; it conflicts with `public/favicon.ico`.
- `npm run samples` regenerates `public/samples/` (an AI render with Midjourney/XMP tags and a phone photo with GPS). They power the "Try a sample" chips and the landing visuals; `src/content/landing.ts` mirrors their real tag values.

## Landing page

Hero with the metadata-remover drop area → all-tools hub grid → feature tiles with product-UI visuals → steps → risks → privacy → formats → popular SEO pages → glossary → FAQ → account CTA. Avoid gradients, glows and decorative numbering; show real product UI instead.

## SEO

- Root metadata (`src/app/layout.tsx`) uses `config/seo.ts` and `metadataBase = APP_URL`; set `APP_URL` to the production domain or canonicals and OG URLs point at localhost.
- Tool pages use `toolMetadata(slug)` (`src/lib/seo/tool-metadata.ts`) for title, description and canonical.
- Social preview: `app/opengraph-image.jpg` + `app/twitter-image.jpg` (1200×630, with `.alt.txt` files), cut from the source `public/social-preview.png`. Every route inherits them, so don't set `openGraph.images` in page metadata.
- Generated: `app/sitemap.ts`, `app/robots.ts` (blocks `/dashboard` and `/api/`), `app/manifest.ts`.
- Home page renders JSON-LD (Organization, WebApplication, FAQPage) via `<JsonLd>` + `homeStructuredData()`; FAQ schema reads `content/landing.ts` so it stays in sync with the visible FAQ.
- One `h1` per page; every section uses `h2`, cards use `h3`.

## Environment

See `.env.example`: `MONGODB_URI`, `MONGODB_DB_NAME` (default `pexlora`), `SESSION_SECRET`, `APP_URL`, `SMTP_HOST/PORT/SECURE/USER/PASS/FROM`. Never commit `.env.local`.

## Gotchas

- Vercel caps request bodies at 4.5 MB, so `MAX_FILE_SIZE_MB` is 4 (`config/limits.ts`). Raising it needs a different upload path.
- Atlas must allow Vercel's IPs (Network Access).
- We remove metadata only. Never claim to remove pixel watermarks (SynthID) or beat AI detectors.
