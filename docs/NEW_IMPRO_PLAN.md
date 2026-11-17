# Pexlora — Competitor-Based Product Improvement Plan

Website: https://pexlora.daorbit.in/

## Objective

Improve Pexlora's existing metadata processing ecosystem to compete with All Metadata Cleaner, WipePic, PurgeEXIF and other metadata privacy platforms.

Do not rebuild the website or change its established design system.

### Priority 1: Batch Processing
- Increase image batch processing capacity to 50 files.
- Implement folder upload.
- Add individual file progress indicators.
- Add retry and error handling.
- Implement Download All as ZIP.
- Preserve original files.

### Priority 2: Privacy Architecture
- Audit current processing architecture for every supported format.
- Move AVIF, TIFF and GIF processing to browser-side workers where technically feasible.
- Ensure images are not uploaded unnecessarily.
- Add accurate local-processing indicators.
- Verify privacy claims against actual implementation.

### Priority 3: Advanced Metadata Viewer
- Improve EXIF, XMP, IPTC, GPS and C2PA reporting.
- Add metadata search and filtering.
- Add raw JSON export.
- Improve GPS coordinate visualization.
- Add before-and-after comparison.

### Priority 4: Selective Cleanup
Implement custom metadata removal with individual categories:
- GPS and location
- Camera information
- Author and copyright
- Timestamps
- AI generation information
- C2PA credentials
- Editing history
- Comments and descriptions

Retain the existing one-click full cleanup option.

### Priority 5: AI Metadata Intelligence
Improve detection and explanation of metadata from:
- Midjourney
- ChatGPT / DALL-E
- Gemini / Imagen
- Stable Diffusion
- ComfyUI
- Adobe Firefly
- Other identifiable AI generation tools

Clearly distinguish metadata-based detection from pixel-level AI watermark detection.

### Priority 6: Format Support
Evaluate DNG, HEIF variants and JPEG XL.

Only advertise formats after implementing and testing actual parsing, cleanup and preservation.

### Implementation Rules
1. First inspect the complete existing codebase.
2. Identify which capabilities already exist.
3. Do not duplicate existing functionality.
4. Review current libraries and processing architecture before choosing replacements.
5. Preserve existing routes, SEO metadata and internal links.
6. Maintain existing Pexlora colors, typography and design language.
7. Avoid generic AI-generated UI patterns.
8. Do not introduce unnecessary dependencies.
9. Write tests for metadata preservation and removal.
10. Implement incrementally and report changed files and test results.

Start with an audit and implementation plan. Do not modify the code until the audit is complete.

The objective is a more capable, reliable and privacy-focused Pexlora, not simply a larger collection of tools.