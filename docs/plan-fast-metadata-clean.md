# Plan: make every API fast

## Measured (local, 12 MP image; Vercel's 1 vCPU is roughly 2x slower)

| Endpoint | Before | After |
|---|---|---|
| clean JPEG / PNG / WebP | 1.1 s / 0.5 s / 2.3 s | 7 ms / 13 ms / 9 ms (lossless, pixels identical) |
| edit-metadata | full re-encode at q95 | 3–25 ms (lossless splice, pixels identical) |
| convert to JPEG | ~6 s (mozjpeg at q100) | 0.2 s |
| convert to WebP | ~5.3 s (effort 6) | 2.0 s, same size |
| convert to AVIF | ~18 s (effort 4, near the 30 s limit) | 2.5 s, same size |
| compress level PNG | ~5 s | 3.2 s |
| compress to size | up to the 20 s budget | 4–9 s |
| inspect | 2 exifr passes | 1 pass |

## Done

- Lossless strippers (`lib/image/strip`) and injectors (`lib/image/inject`) share one chunk reader (`lib/image/chunks.ts`) and the `losslessByFormat` wrapper (`lib/image/lossless.ts`).
- `writeMetadata`: strip losslessly, then splice the EXIF/XMP segments from a 1x1 carrier image that sharp encodes with the new fields (`metadataCarrier`). WebP files without VP8X get one built from the bitstream (`lib/image/webp-canvas.ts`).
- Rotated images (EXIF orientation > 1), AVIF, TIFF and GIF still re-encode, with the `fast` preset.
- Encoder presets in `lib/image/encode.ts`: `fast` (clean/edit fallback), `balanced` (convert, resize), `smallest` (compress). `smallest` is mozjpeg's quant table + trellis without the progressive scan search (2x faster, ~3% bigger). WebP effort 4 everywhere (6 was 2.5x slower, no smaller). Palette PNG always uses deflate level 6 (level 9 saved 0.4%).
- Compress to size decodes once to raw pixels and searches quality by interpolating log(size), with a bisection fallback.
- Every image route runs the Mongo quota check in parallel with the work (`withFileQuota`). Image insights builds its preview in parallel with the quota (`withAiQuota`); paid model calls still wait for the quota.
- Client queue processes 3 files at once (`runPool`, `PARALLEL_FILE_JOBS`).
- ICC profile is kept on clean and is not counted as a leftover tag.

## Open

1. Double upload for the cleaner (inspect on add, then clean). Options: skip inspect on add, or inspect + strip in the browser. Needs a decision.
2. exifr cannot read WebP EXIF/XMP, sharp-made AVIF EXIF, or PNG XMP stored in zTXt, so the viewer shows no tags for those and the clean "leftover tags" count can't see them (the strippers remove them anyway). Fix: read `exif`/`xmp` from `sharp().metadata()` as a fallback in `inspectImage`.
