# New tools plan

Basic plans for the next batch of tools. Each section covers the goal, routes, UX, implementation and effort. Everything follows the existing patterns in `CLAUDE.md`: config in `config/`, copy in `content/`, a page per tool, hub and menu entries, a dashboard page, coloured SVG icons in `public/icons`, URL params for settings and IndexedDB sessions for files and results.

| # | Tool | Type | Runs on | New dependency | Effort |
|---|------|------|---------|----------------|--------|
| 1 | Compress to exact size | File tool (extends Compressor) | Server (sharp) | none | S |
| 2 | Size presets | File tool (extends Resizer) | Server (sharp) | none | S |
| 3 | HEIC to JPG | File tool (conversion) | Browser | HEIC decoder (WASM) | M |
| 4 | Watermark | File tool | Server (sharp) | none | M |
| 5 | Image to PDF / PDF to images | File tools | Browser | `pdfjs-dist` (PDF to images only) | M |
| 6 | Paraphraser, Summarizer, Grammar Fixer | Text tools | Workers AI (Llama 3.3) | none | S |
| 7 | AI Translator | Text tool | Workers AI (m2m100) | none | S |

Suggested build order: 1 → 2 → 6 → 7 → 3 → 4 → 5. The first four are mostly reuse; HEIC, watermark and PDF need new UI or libraries.

---

## Shared groundwork

- **Registering a file tool:** add the slug to `WorkspaceToolSlug` in `config/tools.ts`, a behaviour in `toolBehaviors.ts`, options in `lib/image/options.ts` (`ToolOptions`), a bar in `components/workspace/options/`, URL params in `lib/url/tool-params.ts`, `moduleTips`, `toolTitles`, a marketing page, a dashboard page and a hub entry.
- **Registering a text tool:** add the slug to `TextToolSlug` in `config/text-tools.ts`, a feature in `lib/ai/features/`, an API route in `app/api/ai/`, a client call in `services/ai-api.ts`, and a workspace built from the existing `TextInput` + `TextPane` + `RunBar` + `OutputActions` pieces. Sessions use `useTextToolSession`.
- **SEO landing pages for presets** (sizes, targets, languages): generate them from config with `generateStaticParams`, the same way `/convert/[pair]` works. Read `params` inside `<Suspense>`, and add the pages to the sitemap.
- **Icons:** add a coloured SVG per tool to `public/icons/tools/`, in the same style as the existing ones.
- **Quota:** file tools use `consumeFileQuota`; AI tools use `consumeAiQuota`.

---

## 1. Compress to exact size

**Goal:** get an image under a target size (100 KB, 50 KB, 20 KB or a custom value) for job portals, government forms and ID uploads.

**Routes**
- Add a "Target size" mode to the existing Compressor: `/compress-image?target=100`.
- SEO pages: `/compress-image-to/[size]` for `20kb`, `50kb`, `100kb`, `200kb`, `500kb` and `1mb`. Each preselects its target.

**UX**
- The Compressor's options bar gets a mode switch: **Level** (current) | **Target size**.
- Target size: preset chips (20 / 50 / 100 / 200 / 500 KB) plus a custom KB input.
- Each result shows "98 KB ✓ under 100 KB". If even the lowest quality is too big, it shows "Couldn't reach 100 KB, smallest is 132 KB. Try resizing first", with a link to the Resizer.

**Implementation**
- `lib/image/process.ts` gets `compressToTarget(buffer, targetBytes)`, which binary-searches the quality (about 6–8 passes between 20 and 95). If the file is still too big at the lowest quality, it scales the image down in 10% steps until it fits or reaches 25% scale.
- The PNG keeps its format but uses palette mode. It falls back to converting to JPG only if the user turns on "Allow format change".
- The route `/api/images/compress` accepts `target` (bytes) alongside `level`.
- The result reports `X-Target-Met: true|false` in a header.

**Limits:** sharp re-encodes several times, so watch Vercel's function time limit. Cap it at 8 passes.

---

## 2. Size presets (passport, Instagram, YouTube)

**Goal:** one-click sizes for common uses.

**Routes**
- Presets in the Resizer: `/resize-image?preset=instagram-post`.
- SEO pages: `/resize-image-for/[preset]`, e.g. `passport-photo`, `instagram-post`, `instagram-story`, `youtube-thumbnail`, `linkedin-banner`, `whatsapp-dp`, `facebook-cover`.

**Preset config** (`config/size-presets.ts`)

| Preset | Size | Fit |
|--------|------|-----|
| Passport photo (India / US) | 35×45 mm @300 dpi (413×531 px) / 2×2 in (600×600 px) | cover, centre |
| Instagram post / portrait / story | 1080×1080 / 1080×1350 / 1080×1920 | cover |
| YouTube thumbnail | 1280×720 | cover |
| LinkedIn banner | 1584×396 | cover |
| Facebook cover | 851×315 | cover |
| WhatsApp DP | 500×500 | cover |

**UX**
- The Resizer gets a third mode, **Presets**: a grid of preset cards showing their aspect ratio.
- Passport presets get an optional plain white background and print-sheet export. That's a stretch goal.

**Implementation**
- Add `fit: "cover"` to the resize pipeline (`sharp.resize({ fit: "cover", position: "attention" })`). Sharp's `attention` position keeps faces and subjects centred.
- Add `preset` to `ResizeOptions` and `tool-params.ts`.

**Risk:** passport rules vary by country. Label the sizes clearly and don't claim official compliance.

---

## 3. HEIC to JPG

**Goal:** convert iPhone HEIC/HEIF photos to JPG (or PNG/WebP).

**Routes:** `/convert/heic-to-jpg`, `/convert/heic-to-png` and `/convert/heic-to-webp`, added to `config/conversions.ts`.

**Why in the browser:** sharp's prebuilt binaries can't decode HEVC (HEIC's compression format, which is patent-encumbered), and iPhone photos are often over the 4 MB upload limit. Decoding in the browser avoids both problems and keeps the photos private.

**Implementation**
- New dependency: a WebAssembly HEIC decoder (`heic2any` or `libheif-js`). Load it lazily with dynamic `import()` only on HEIC pages, since it's about 1–2 MB.
- Add HEIC/HEIF (`image/heic`, `image/heif`, `.heic`, `.heif`) to `config/file-formats.ts` with a new `engine: "heic"`.
- A client processor in `lib/files/processors/heic.ts` decodes the photo to a canvas or bitmap, then encodes it with `canvas.toBlob(type, quality)`. Encoding to a canvas drops all metadata automatically, including GPS.
- Behaviour: the existing Convert tool, with format and quality options, but running locally.
- Multi-image HEIC files (Live Photos and bursts): convert only the first frame for now.

**Limits:** large photos (48 MP) use a lot of memory. Process files one at a time.

---

## 4. Watermark (text or logo)

**Goal:** stamp text or a logo on images.

**Route:** `/watermark-image` (tool slug `watermark-image`).

**UX**
- **Text tab:** text, font size, colour (white, black or custom), opacity and position.
- **Logo tab:** upload a PNG logo, size (% of width), opacity and position.
- **Position:** a 9-point grid or "Tile" (repeating diagonally).
- Show a live preview on the first image, as a CSS overlay before running.
- Settings go in URL params (`?type=text&pos=br&opacity=60`). The logo file is stored in the IndexedDB session.

**Implementation**
- Server: `lib/image/watermark.ts` uses sharp `composite()`.
  - Text is rendered as an SVG overlay with an escaped string and a system font stack.
  - The logo is resized to its size percentage, with opacity applied through `ensureAlpha` plus a linear alpha change.
  - Tile mode repeats a rotated SVG pattern.
- Route: `/api/images/watermark`, multipart with the image, optional logo file and options.
- Metadata is removed as usual.

**Limits:** the logo upload counts toward the 4 MB request size, so cap the logo at 1 MB.

---

## 5. Image to PDF / PDF to images

Two tools, both running in the browser.

### Image to PDF (`/image-to-pdf`)
- Turns up to 10 images into one PDF, one image per page.
- Options: page size (A4, Letter or fit to image), orientation (auto, portrait or landscape), margin (none, small or large), and drag to reorder.
- Uses `pdf-lib` (already installed): `embedJpg`/`embedPng`, after converting WebP/AVIF to PNG through a canvas.
- The output is one PDF with no metadata (`setProducer`/`setCreator` left blank).

### PDF to images (`/pdf-to-jpg`, `/pdf-to-png`)
- Renders each page to JPG or PNG at a chosen resolution (72 / 150 / 300 dpi).
- New dependency: `pdfjs-dist`, loaded lazily, with its web worker set up for Next.
- Output: one image per page, downloaded as a zip using the existing `downloadZip`.
- Limit: up to 50 pages; larger PDFs show a warning.

**Workspace change:** these tools produce one output from many inputs (Image to PDF), or many outputs from one input (PDF to images). Add a behaviour mode `output: "merge" | "split"` so `WorkspacePanel` can show one combined result row instead of one per file.

---

## 6. Paraphraser, Summarizer, Grammar Fixer

Three text tools that reuse the humanizer setup.

| Tool | Route | Options (URL params) | Prompt goal |
|------|-------|----------------------|-------------|
| Paraphraser | `/paraphrase-text` | `?mode=standard\|fluent\|formal\|simple\|creative` | Rewrite with the same meaning and new wording |
| Summarizer | `/summarize-text` | `?length=short\|medium\|bullets` | Key points only, no new facts |
| Grammar Fixer | `/grammar-checker` | `?style=minimal\|polished` | Fix spelling, grammar and punctuation; keep the voice |

**Implementation**
- One generic feature, `lib/ai/features/rewrite-text.ts`, driven by a prompt config per tool (`lib/ai/prompts/*.ts`).
- One route, `/api/ai/rewrite` with `{ tool, text, option }`, validated with zod.
- The Grammar Fixer also returns a list of changes (`{ before, after, reason }[]` in JSON mode), shown as highlighted diffs with an "Accept all" button.
- The Summarizer allows longer input (up to about 12,000 characters) but gives a shorter output.
- Cross-links in the result footer: "Check AI score", "Humanize" and "Translate".

**Limits:** these use the AI daily quota. Most calls cost about 2–6 neurons, so they're cheap.

---

## 7. AI Translator

**Route:** `/translate-text` with `?from=auto&to=hi`.

**Model:** `@cf/meta/m2m100-1.2b` on Workers AI, a dedicated translation model for direct many-to-many translation. Test whether Llama 3.3 gives better quality for common pairs (English ⇄ Hindi, Spanish, French, German, Arabic) and choose per language if needed.

**UX**
- Two panes with a language picker above each, plus a swap button.
- "Detect language" uses a quick Llama call when `from=auto`.
- Copy, download and share on the output, as with the other text tools.
- SEO pages: `/translate/[from]-to-[to]` for the top 10 language pairs.

**Implementation**
- `lib/ai/features/translate-text.ts`, plus `config/languages.ts` (code, name, native name).
- Split long text into chunks of about 1,500 characters at sentence boundaries, translate them in order and join them.
- Route `/api/ai/translate`.

**Limits:** m2m100 quality is uneven for rare languages. Label them "beta".

---

## Open questions

1. **Exact-size compression:** should we allow automatic conversion to JPG when a PNG can't reach the target, or always keep the format?
2. **HEIC decoder:** `heic2any` is simpler but unmaintained; `libheif-js` is maintained but more work to set up. Pick one after a quick bundle-size test.
3. **Passport photos:** which countries' sizes do we list first? Is the print sheet (4×6 inch layout) worth building now?
4. **Watermark:** do we need custom fonts, or is the system font stack enough?
5. **PDF to images:** fixed DPI presets or a free slider?
6. **Translator:** which 10 language pairs get SEO pages first? India-focused (Hindi, Bengali, Tamil, Telugu, Marathi) or global?
