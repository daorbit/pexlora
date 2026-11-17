# Pexlora improvement plan: audit and implementation plan

Audit of the current codebase against `docs/NEW_IMPRO_PLAN.md`. No code was changed for this audit.

Legend: **Exists** = already built, **Partial** = some of it is built, **Missing** = not built.

## Summary

| Priority | Status | Biggest gap |
|---|---|---|
| 1. Batch processing | Partial | No retry, no folder upload, no real per-file progress; free batch is 10 |
| 2. Privacy architecture | Partial | Convert Image uploads every file, even JPG to PNG; AVIF/TIFF/GIF cleaning uploads |
| 3. Advanced viewer | Partial | No search, no JSON export, C2PA is presence-only |
| 4. Selective cleanup | Missing | Stripping is all-or-nothing at segment level |
| 5. AI metadata intelligence | Partial | AI tags are flagged, but the generator isn't identified per tool |
| 6. Format support | Missing | DNG, JPEG XL not handled; AVIF is server-only |
| Tests | Missing | No test runner in the project |

## 1. Batch processing

| Item | Status | Where / notes |
|---|---|---|
| Batch size 50 | Partial | `MAX_FILES_PER_BATCH = 10` (`config/limits.ts`); Pro and super admins get `PRO_FILES_PER_BATCH = 50` (`config/plans.ts`, `lib/plan/perks.ts`). Raising free to 50 is a product decision: the daily limit is 10 files for visitors and 100 for accounts, so a 50-file free batch would hit the quota mid-batch for visitors. |
| Folder upload | Missing | No `webkitdirectory` on the picker (`useFilePicker`), and `useFileDrop` reads `dataTransfer.files` only, so a dropped folder adds nothing. |
| Per-file progress | Partial | Each row shows an indeterminate bar while processing (`ProgressBar`). There is no percentage; most jobs are single-step, so a real percentage only makes sense for multi-page PDF jobs. |
| Retry and errors | Partial | Errors are caught per file and shown on the row (`useFileQueue`, `status: "error"`). There is no Retry: `process()` only picks `ready` items, so a failed file has to be removed and re-added. A 429 stops the batch and keeps the rest `ready` (good). |
| Download All as ZIP | Exists | `saveFiles(results, zipName)` (`WorkspacePanel`), share sheet on iOS. |
| Preserve originals | Exists | Every tool writes a new Blob; the source `File` is never modified. Results are named with suffixes. |

## 2. Privacy architecture

Where each tool runs today (`components/workspace/toolBehaviors.ts`, `services/file-service.ts`, `services/local-tools.ts`):

| Tool | JPG / PNG / WebP | HEIC | AVIF / TIFF / GIF | Other kinds |
|---|---|---|---|---|
| Remove Metadata, Viewer | Browser | Browser | **Server** (`/api/images/clean`, `/inspect`) | PDF, Office, audio, video: browser |
| Compress, Resize | Browser, server fallback over `BROWSER_MAX_PIXELS` | Browser | **Server** | n/a |
| Crop, Form photo, Passport, HEIC to JPG, SVG tools | Browser | Browser | Not accepted (`browserFormatsOnly`) | n/a |
| **Convert Image** | **Server, always** (`localCapable: false`) | Not accepted | **Server** | n/a |
| **Edit Metadata** | **Server, always** | Not accepted | **Server** | n/a |
| AI Alt Text, Fill with AI | Uploads (needed for the AI call) | n/a | n/a | n/a |
| All PDF tools | n/a | n/a | n/a | Browser |

Findings:

- **Convert Image uploads every file**, including JPG/PNG/WebP, although the browser raster worker already has JPEG (mozjpeg), WebP (libwebp) and PNG encoders. Only AVIF output has no browser encoder. This is the largest unnecessary upload.
- **Edit Metadata uploads** only because sharp builds the 1x1 EXIF/XMP carrier (`lib/image/metadata-writer.ts`). The XMP builder is plain string code, and the injector (`lib/image/inject`) is shared, so a small browser EXIF (TIFF IFD) writer would make it fully local for JPG/PNG/WebP.
- **AVIF cleaning can move to the browser**: AVIF is ISOBMFF/HEIF, and `lib/files/containers/heif.ts` already zero-fills Exif/XMP items through `iinf`/`iloc` for HEIC.
- **GIF cleaning is simple to do locally**: drop Comment extensions and Application extensions (XMP is stored as an `XMP DataXMP` application extension).
- **TIFF is feasible but riskier**: metadata lives in IFD tags (EXIF/GPS sub-IFDs, XMP tag 700, IPTC 33723, ImageDescription, Artist, etc.) that must be removed without breaking strip offsets. Worth doing after AVIF and GIF, with tests.
- **Indicators**: `FileStatus` shows "Cleaned on your device" from `isLocalFormat(format)`, and server fallbacks set `uploaded: true`. That chip is accurate for Remove Metadata and Compress/Resize. Convert and Edit Metadata show no "uploaded" note at all, so users can't tell their file left the device.
- **Privacy claims**: CLAUDE.md, the guide copy and `content/llms.ts` describe this split correctly today. Every change above must update them together.

## 3. Advanced metadata viewer

> **Update:** implemented: search, All / AI / Personal filters, Export JSON, C2PA manifest summary (generator, source type, actions, certificate organisations; signature not verified), DMS coordinates with copy, Original / Result metadata switch, and the "no AI tags is not proof" note. Still open: verifying C2PA signatures.

| Item | Status | Where / notes |
|---|---|---|
| EXIF, XMP, IPTC, GPS, ICC, PNG text | Exists | `lib/metadata/exif-report.ts` (exifr), groups in `lib/metadata/types.ts`. |
| C2PA | Partial | `addC2paMarker` only scans the bytes for the strings `c2pa` / `jumb` and adds "manifest embedded". It does not read the claim generator, signer, actions or `digitalSourceType`, and the string scan can false-positive. |
| Search and filter | Missing | `MetadataReport.tsx` renders every group in a scroll box; no search, no "AI only" or "privacy-sensitive only" filter. |
| Raw JSON export | Missing | Report is in memory; export would be a small client-side download of `report.groups`. |
| GPS visualisation | Partial | `LocationCard` shows coordinates and a map link that opens only on click (no embedded map, by design: an embedded map sends coordinates to a third party). Improvement within that rule: an offline coordinate card (lat/long, DMS, accuracy, altitude, timestamp) rather than a map. |
| Before and after | Partial | `FileStatus` shows "14 tags -> 0 left" and `RevealSummary` strikes through facts; the cleaner re-inspects output for `leftoverTags`. There is no side-by-side report of what remained. The new `ResultPreview` shows the output file, not its metadata. |

## 4. Selective cleanup

**Missing.** Cleaning is lossless but all-or-nothing: `lib/image/strip/jpeg.ts` drops every APPn segment except JFIF, ICC and Adobe; PNG and WebP strippers do the same per chunk. Keeping "camera info but not GPS" needs per-tag rewriting:

1. Parse the existing EXIF (exifr already does) and XMP.
2. Strip everything (existing code).
3. Write back only the kept categories: a new browser EXIF writer (IFD0 + Exif sub-IFD + GPS IFD) and the existing XMP string builder, injected with `lib/image/inject`.

That same EXIF writer unblocks local Edit Metadata (section 2). HEIC, PDF, Office, audio and video would stay full-clean only at first; the UI must say so per format rather than hide it.

Categories map to keys as follows (keys from exifr/XMP): GPS = GPS IFD + `exif:GPS*`; camera = Make, Model, Lens*, exposure tags; author/copyright = Artist, Copyright, `dc:creator`, `dc:rights`; timestamps = DateTime*, `xmp:CreateDate`, `photoshop:DateCreated`; AI = PNG text `parameters`/`prompt`/`workflow`, `Iptc4xmpExt:DigitalSourceType`, AI software names; C2PA = JUMBF/`caBX`; editing history = `xmpMM:History`, `photoshop:DocumentAncestors`, Software; comments = UserComment, ImageDescription, `dc:description`, JPEG COM.

## 5. AI metadata intelligence

| Item | Status | Where / notes |
|---|---|---|
| AI tag flagging | Exists | `lib/metadata/ai-detection.ts`: one key regex + one value regex covering Midjourney, DALL-E/OpenAI, Stable Diffusion, Firefly, ComfyUI, Gemini/Imagen, Flux, Ideogram, Sora, Veo, Runway, etc. |
| Naming the generator | Partial | `reveals.ts` picks the first AI entry whose key is CreatorTool/Software/Generator/C2PA and shows its raw value. There is no per-tool signature table, so "Midjourney" vs "Stable Diffusion (A1111)" vs "ComfyUI" isn't stated reliably. |
| Explanations | Partial | Orbit AI "explain metadata" exists (`AiExplainPanel`), but costs neurons; a static per-tool explanation would be free. |
| Metadata vs pixel watermark | Exists in copy | Copy says "we remove metadata only, not SynthID". The viewer itself doesn't say "no AI metadata found does not mean not AI". |

Plan: a signature table (`lib/metadata/ai-signatures.ts`) keyed by tool, each with detectors (PNG `parameters` with "Steps:" = A1111/Forge; PNG `workflow`/`prompt` JSON = ComfyUI; Midjourney `Description` + job ID; OpenAI C2PA claim generator; Google `Iptc4xmpExt:DigitalSourceType = trainedAlgorithmicMedia` + "Made with Google AI"; Adobe Firefly C2PA), a confidence label (strong/weak), and static copy for each.

## 6. Format support

- **DNG**: TIFF-based, same writer as TIFF cleaning. Don't advertise until TIFF cleaning is tested.
- **HEIF variants**: HEIC is handled; AVIF shares the container (section 2). HEIF sequences (`msf1`) need testing.
- **JPEG XL**: browser support is limited (decode only in Safari), exifr support is partial. Cleaning JXL boxes (`Exif`, `xml `, `jumb`) is container-level and feasible; preview isn't. Lowest priority.

Rule kept: no format goes into `fileFormats`, copy or `llms.txt` until parsing, cleaning and preservation are tested.

## Tests

There is no test runner (`package.json` has no vitest/jest), so nothing currently verifies that metadata is removed or that pixels are preserved. Recommended: **Vitest** (one dev dependency, works with the TypeScript paths) running in Node against fixture files:

- `public/samples/` already holds an AI render with Midjourney/XMP tags and a phone photo with GPS. Add small fixtures per format (JPEG with EXIF+GPS+XMP+COM, PNG with tEXt `parameters`, WebP with EXIF/XMP, HEIC, AVIF, GIF with comment/XMP, TIFF, PDF, DOCX, MP3, MP4).
- For each: inspect finds the expected tags; clean leaves `leftoverTagCount === 0`; image data bytes are identical before and after (lossless check: compare the JPEG scan data / PNG IDAT / WebP VP8 chunks); ICC and Orientation are kept.
- Selective cleanup: each category removed, the others kept.

## Implementation order

Each step is small, shippable and testable on its own.

1. **Test harness**: Vitest + fixtures + tests for the existing strippers (protects everything after).
2. **Retry and folder upload**: Retry button on failed rows (status back to `ready`, re-run), folder drop via `webkitGetAsEntry` and a "Choose Folder" option, filtered by accepted kinds. Decide the free batch size (recommend 20 for accounts, keep 10 for visitors, 50 for Pro).
3. **Local Convert Image** for JPG/PNG/WebP/HEIC output through the existing raster worker; server only for AVIF output and AVIF/TIFF/GIF input, with an honest "uploaded" chip.
4. **Local AVIF and GIF cleaning** (new `avif` reuse of the HEIF container, small GIF processor), then TIFF with tests.
5. **Browser EXIF writer**, then local Edit Metadata.
6. **Selective cleanup** for JPG/PNG/WebP on Remove Metadata (category checklist, "Remove everything" stays the default), URL param per category set.
7. **Viewer upgrades**: search box, "AI only" and "sensitive only" filters, JSON export, real C2PA manifest summary, after-clean report.
8. **AI signature table** with per-tool names and static explanations, plus the "no metadata is not proof" line.
9. **Format evaluation** (DNG, HEIF sequences, JPEG XL) behind tests before any copy changes.

Every step updates CLAUDE.md, the privacy copy and `content/llms.ts` where behaviour changes.

## Decisions needed

1. Free batch size: keep 10, or raise for signed-in users? (50 for everyone conflicts with the 10/day visitor quota.)
2. Test runner: OK to add Vitest as the one new dev dependency?
3. AVIF output in Convert: keep it on the server, or add `@jsquash/avif` (large WASM, loaded on demand) to make Convert fully local?
4. Selective cleanup scope for v1: JPG/PNG/WebP only, with other formats clearly marked "full clean only"?
