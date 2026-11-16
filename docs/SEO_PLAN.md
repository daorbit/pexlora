Pexlora SEO Implementation Brief for Claude Code
Website: https://pexlora.daorbit.in/
Project: Pexlora
Goal: Improve the SEO of the existing website and existing tools.
Primary competitor to study: https://aimetadatacleaner.com/
Important context: Google Search Console has only just been set up. There is currently no meaningful Search Console performance history to use for decisions.
1. Your role and the expected outcome
Act as a senior technical SEO specialist and experienced frontend engineer working directly in the existing Pexlora codebase.

Audit the current implementation, identify real SEO issues, and implement a careful SEO improvement pass across the existing website. Make changes in the codebase, not just recommendations. At the end, provide a concise report of files changed, fixes made, issues left unresolved, and how to verify the work.

The aim is to make every existing, index-worthy page:
- Clearly understandable to search engines and users.
- Focused on one distinct search intent.
- Equipped with unique and accurate title tags, meta descriptions, headings and canonical URLs.
- Supported by genuinely useful, page-specific content.
- Connected to related existing tools through sensible internal links.
- Crawlable, indexable and technically sound.
- Accurate about supported formats, processing behavior, privacy and limitations.
Do not promise rankings, traffic growth or indexing. SEO outcomes take time and must be measured after Google collects data.
2. Strict scope — do not go beyond this
In scope
- Homepage SEO.
- SEO for every existing tool page and existing informational page.
- Metadata: title, description, canonical, robots directives, Open Graph and social metadata.
- Heading structure and page-specific copy.
- Internal linking between existing pages.
- Sitemap, robots.txt, redirects, structured data and crawlability.
- Technical SEO issues that can be verified in the repository.
- Performance improvements only where they are safe, relevant and do not change the product experience.
- Accessibility improvements that also help content and controls be understood, where they can be made without redesigning the UI.
Explicitly out of scope
- Do not build new tools, modules, features or product categories.
- Do not create new landing pages, programmatic SEO pages or competitor-comparison pages in this task.
- Do not redesign the UI, change the design system, or restructure sections just for visual preference.
- Do not change the brand identity, logo, colors, typography, layout, animations or existing interaction behavior unless a specific change is essential to fix an SEO/accessibility defect and can be made without a visual redesign.
- Do not remove, rename or change existing routes without a clear technical reason and an approved redirect plan.
- Do not add paid services, external SEO packages, tracking scripts or third-party dependencies without asking first.
- Do not copy competitor text, page structure verbatim, claims, branding or code.
Preserve the current Pexlora look and feel. This is an SEO implementation task, not a redesign.
3. Important: Search Console has no baseline data yet
The owner has only just set up Google Search Console. Do not assume that historical query, impression, click, CTR, ranking or landing-page data exists.

Therefore:
- Do not invent search volumes, keyword difficulty, rankings, impressions, clicks, CTR, traffic or conversion numbers.
- Do not claim that a page is underperforming based on unavailable data.
- Do not make keyword decisions based on fabricated or assumed Search Console reports.
- Treat all keyword suggestions in this brief as initial hypotheses, not validated keyword research.
- Implement sound technical and on-page SEO fundamentals now.
- Ensure the sitemap is correct and can be submitted in Search Console.
- Record a baseline date and a list of URLs to monitor, but do not manufacture baseline metrics.
- After Search Console has collected sufficient data (typically review after 28 days, then again around 90 days), the owner can use real queries and landing-page reports to refine titles, content and priorities.
If Search Console credentials or an API integration are not already configured in the repository, do not attempt to sign in, request secrets, or add an integration. This task can be completed from the codebase and public site inspection.
4. Start with a repository and website audit — before editing
First inspect the repository and identify:
1. Framework, build tool, routing system and rendering approach (SSR, SSG, CSR or hybrid).
2. All actual public routes and the page/component responsible for each route.
3. Existing metadata implementation and whether metadata is route-specific or accidentally shared.
4. Existing sitemap, robots.txt, canonical tags, redirects and structured data.
5. Whether page content is present in the initial HTML or depends entirely on client-side rendering.
6. Existing internal links and navigation paths to the tools.
7. Whether any pages are duplicated, thin, inaccessible, orphaned, blocked or marked noindex.
8. Actual file formats, metadata types and limits supported by each tool, by inspecting the implementation—not by trusting marketing copy alone.
9. The actual processing path for each file category: browser-side, server-side or a combination.
Create an internal route inventory during the task. Use the real routes found in the codebase. Do not assume that the page names below map to exact route slugs.

Before changing files, summarize the main findings and identify any risky or uncertain claims. Then implement the verified improvements. Do not stop after producing an audit unless a change would be unsafe or requires owner input.
5. Existing pages and initial keyword-intent map
Use this as a starting point only. Confirm that each page and capability exists before editing it. Map the intent to the actual URL discovered in the repository.
Existing page/tool (if present)	Initial primary intent	Related terms to consider
Homepage	online metadata remover	metadata cleaner, remove metadata online
Metadata Remover	remove metadata from images online	image metadata remover, EXIF remover
Metadata Viewer	EXIF viewer online	image metadata viewer, view photo metadata
Metadata Editor	edit image metadata online	EXIF editor, photo metadata editor
Image Compressor	compress image online	image compressor, reduce image file size
Compress to Size	compress image to a target KB size	compress image to 100 KB, compress image to 200 KB
Image Resizer	resize image online	image resizer, change image dimensions
Image Converter	convert image online	JPG to PNG, PNG to WebP, image format converter
AI Alt Text Generator	AI alt text generator	image alt text generator, image description generator
AI Image Cleaner	remove AI image metadata	AI image metadata remover, clean AI image metadata
Midjourney Cleaner	Midjourney metadata remover	remove Midjourney metadata
ChatGPT Cleaner	ChatGPT image metadata remover	remove metadata from ChatGPT images
Gemini Cleaner	Gemini image metadata remover	remove Gemini image metadata
C2PA-related cleaner (if present)	C2PA metadata remover	Content Credentials, C2PA metadata
PDF metadata tool (if present)	PDF metadata remover	remove PDF properties, clean PDF metadata
Video metadata tool (if present)	remove video metadata	video metadata remover
Audio metadata tool (if present)	audio metadata remover	remove audio file metadata


Do not force a keyword into a page if it does not accurately describe the tool. Do not make every page target “metadata remover”. Each page should have a distinct purpose and naturally written copy.
6. Homepage implementation
Review the homepage's current title, description, H1, headings, content, links and structured data.

Possible title to test as a starting point:

Free Online Metadata Remover & EXIF Cleaner | Pexlora

Possible meta description to adapt only after verifying actual support:

Remove hidden metadata from supported images and files with Pexlora. Clean EXIF, GPS and supported AI metadata using free online tools.

Possible search-focused H1 direction:

Free Online Metadata Remover for Images and Files

These are suggestions, not mandatory exact strings. Preserve the existing brand voice and ensure the wording accurately represents the product.

Requirements:
- Keep the existing visual hero and page layout.
- Ensure the H1 communicates the main product purpose clearly.
- Explain the existing product value in natural language.
- Make the main existing tool categories easy to discover through crawlable links.
- Ensure the page explains supported file categories without overstating capabilities.
- Keep existing useful content; improve clarity and remove only genuinely redundant or misleading copy.
- Avoid unnatural keyword repetition and generic SEO filler.
7. Page-by-page on-page SEO
For each existing index-worthy route:
1. Add a unique, descriptive <title> (avoid duplicate titles and keyword stuffing).
2. Add a unique meta description that accurately summarizes that specific page.
3. Ensure there is one clear primary H1. Do not add hidden headings for SEO.
4. Use logical H2/H3 structure; headings should describe the content that follows.
5. Add or improve a concise page-specific introduction explaining what the tool does and who it helps.
6. Include practical usage steps where useful and accurate.
7. State supported input/output formats, file limits and important restrictions only when verified from code or product behavior.
8. Explain what the tool changes and what it does not change, where relevant.
9. Add relevant FAQs only when they answer real questions and the answers are accurate. Do not create the same generic FAQ list on every route.
10. Link to a small number of closely related existing tools where it helps users.
11. Ensure meaningful images have descriptive alt text; decorative images should not have keyword-stuffed alt text.
12. Ensure each page has the correct canonical URL and indexability settings.
13. Make sure important text is available to crawlers in rendered HTML; do not rely on text hidden behind interactions that search engines cannot access.
Do not pad pages with long generic paragraphs. Useful, accurate content is more important than word count.
8. Critical privacy and processing-claims audit
This is a high-priority requirement. Existing Pexlora copy appears to make broad statements such as “Nothing is ever stored” and may describe browser-side and server-side processing inconsistently. Do not repeat or strengthen these claims until the implementation has been audited.

For every supported file category/tool, inspect the actual code and document:
- Whether the file is processed entirely in the browser, uploaded to a server, or handled through a mixed flow.
- Whether file bytes, extracted metadata or generated output leave the user's device.
- Whether temporary files, caches, logs, analytics events, backups or error-reporting systems may retain any information.
- Whether uploaded content is stored, for how long, and how deletion occurs—only if this is verifiable from the implementation and infrastructure configuration available in the repo.
- Whether any third-party API receives file content or metadata.
Then make the homepage, relevant tool pages and existing privacy-related copy consistent with what can actually be verified.

Rules:
- Never claim “100% private”, “never uploaded”, “nothing is stored”, “deleted instantly” or similar absolute statements unless the complete behavior is verified.
- Do not infer server retention behavior from frontend code alone.
- If the repository does not expose enough information to verify server logs, backups, hosting retention or third-party processing, flag the uncertainty in the final report and use cautious, factual wording rather than inventing guarantees.
- Do not change the actual file-processing behavior as part of this SEO task.
- Do not silently rewrite legal/privacy policy language in a way that makes a legal promise. Flag any policy change requiring owner/legal review.
9. Internal linking
Build useful links among existing pages. Confirm destination routes before adding links.

Suggested relationships, only where both pages exist and the relationship is accurate:
Metadata and privacy
- Metadata Viewer → Metadata Remover.
- Metadata Editor → Metadata Viewer.
- AI Image Cleaner → relevant AI-specific cleaners.
- C2PA tool → Metadata Viewer and Metadata Remover.
- PDF metadata tool → other relevant document tools.
Image optimization
- Image Compressor → Compress to Size.
- Image Resizer → Image Compressor.
- Image Converter → Image Compressor.
- Image Compressor → Image Converter.
AI metadata
- AI Image Cleaner → Midjourney, ChatGPT and Gemini cleaners.
- AI-specific cleaner pages → general Metadata Remover where useful.
Use descriptive, natural anchor text. Do not add sitewide blocks of repetitive links or links to nonexistent routes. Avoid orphan pages.
10. Technical SEO checklist
Crawlability and indexability
- Confirm every important existing public route returns the expected successful HTTP status.
- Check for accidental noindex tags or X-Robots-Tag directives.
- Confirm robots.txt does not block important pages or required rendering assets.
- Ensure the XML sitemap exists at the expected location and contains only canonical, indexable URLs that should appear in search.
- Exclude redirects, errors, duplicate query-string variants and non-canonical URLs from the sitemap.
- Ensure important pages are reachable through normal internal links.
- Check that page content can be rendered by search engines.
- Do not block CSS or JavaScript required to render page content.
Canonicals and URL consistency
- Use one preferred HTTPS hostname consistently.
- Check redirects from alternate host/protocol versions if configuration is present in the repo.
- Add correct self-referencing canonical URLs to index-worthy pages.
- Do not canonicalize distinct tool pages to the homepage.
- Ensure trailing-slash and URL-case behavior is consistent with the existing routing setup.
- Avoid redirect chains and broken internal links.
Structured data
Add or correct structured data only when it accurately describes visible page content and the relevant schema type applies.

Potential types to evaluate:
- WebSite for the website.
- Organization only with verified organization details.
- WebApplication or SoftwareApplication for the actual product, if the required properties are truthful.
- BreadcrumbList only where breadcrumbs are visibly present and accurately represent the hierarchy.
Do not invent ratings, reviews, prices, awards, aggregate scores, author identities, company addresses or unsupported product features. Do not add FAQ structured data merely to seek a rich result; only use it if the page visibly contains the same useful FAQs and the markup complies with current search guidelines. Validate JSON-LD syntax and avoid duplicate/conflicting schema.
Social metadata
- Ensure important pages have appropriate Open Graph title, description and image metadata.
- Ensure Twitter/X card metadata is valid where currently supported by the project.
- Use existing approved Pexlora branding/assets. Do not create a new logo or alter brand colors for this task.
- Avoid using the same inaccurate page-specific social title/description across every route.
Performance and mobile
- Check for obvious SEO-relevant performance problems such as oversized hero images, missing image dimensions, avoidable layout shifts and render-blocking assets.
- Make only low-risk optimizations that preserve appearance and behavior.
- Do not replace libraries, introduce new dependencies or undertake a broad performance rewrite without asking.
11. Competitor benchmark: AI Metadata Cleaner
Use https://aimetadatacleaner.com/ as a research reference, not as a template to copy.

The competitor's visible SEO strengths include:
- A direct search-intent headline about metadata cleaning and AI tags.
- Clear explanations of EXIF, GPS, XMP/IPTC, C2PA and AI-generation metadata.
- Specific use cases for creators, social media managers, sellers and privacy-conscious users.
- Explanations of how the product works and its processing model.
- Educational articles and technical guides.
- Clear links between its tools and supporting content.
For Pexlora, focus on making existing tools and their real capabilities clearer. Pexlora also has existing image optimization tools such as compression, resizing and conversion; explain these existing capabilities where relevant without inventing new features.

Do not create competitor comparison pages in this task. Do not copy their wording, claims or technical descriptions.
12. Google Search Console setup and handoff
Because Search Console was only just set up, the first objective is to establish clean measurement—not to optimize based on nonexistent performance data.

Prepare the website so the owner can:
1. Verify the correct preferred domain/property in Google Search Console.
2. Submit the production XML sitemap.
3. Use URL Inspection on the homepage and a representative set of important tool pages.
4. Monitor indexing status and any page experience/Core Web Vitals reports that become available.
5. Export query and page performance data after sufficient collection time.
In the final report, provide:
- The sitemap URL that was verified in the codebase.
- The preferred canonical hostname.
- A list of key URLs the owner should inspect in Search Console.
- Any remaining manual steps the owner must complete in the Search Console UI.
Do not claim that a sitemap was submitted or that Google indexed pages unless you actually performed and verified those actions. Do not request or store the owner's Google password or private credentials.
13. Suggested implementation order
Work in this order and keep changes focused:
Phase A — Inventory and baseline
- Inspect framework, routes and existing SEO implementation.
- Build the actual route inventory.
- Identify duplicate/missing metadata and technical blockers.
- Audit privacy/processing claims against the code.
Phase B — Technical foundations
- Fix verified canonical, robots, sitemap, redirect and rendering issues.
- Fix duplicate or missing metadata generation.
- Add or correct valid structured data and social metadata.
Phase C — Homepage and existing tool pages
- Improve homepage title, description, H1 and relevant copy.
- Give every existing index-worthy tool page unique metadata and headings.
- Add useful, page-specific explanatory content and accurate FAQs where appropriate.
- Preserve existing UI and functionality.
Phase D — Internal links and quality checks
- Add contextual links among related existing tools.
- Check for orphan pages, broken links, duplicate titles and descriptions.
- Recheck privacy claims and supported-format statements.
Phase E — Verification and handoff
- Run the project's existing lint, type-check, tests and production build commands where available.
- Fix issues introduced by the changes.
- Inspect generated HTML or built output for title, description, canonical, robots and structured data.
- Verify sitemap and robots.txt output.
- Provide a clear implementation report and Search Console manual checklist.
14. Definition of done
The task is complete when:
- All actual existing public routes have been inventoried.
- Every index-worthy page has unique, accurate title and description metadata.
- Every index-worthy page has a clear H1 and sensible heading hierarchy.
- Page content accurately describes the relevant existing tool.
- Internal links connect related existing tools without broken destinations.
- Canonicals, robots directives, sitemap and redirects have been checked and corrected where needed.
- Structured data is valid, truthful and not duplicated.
- Privacy and processing claims have been checked against implementation; unknown server-side facts are clearly flagged.
- No new tool, module, feature or page has been created.
- No visual redesign or brand change has been made.
- Existing product functionality still works.
- Available lint, tests, type checks and build pass, or any pre-existing failures are documented.
- The owner receives a concise report of changes, changed files, remaining risks and Search Console next steps.
15. Final response format
When finished, report using these headings:
1. What you inspected — framework, routes and SEO areas reviewed.
2. What you changed — grouped by technical SEO, homepage, tool pages, internal linking and structured data.
3. Files changed — exact paths and a one-line explanation for each.
4. Privacy claims needing confirmation — list anything that could not be verified from the repository.
5. Validation results — lint, tests, type-check, build, sitemap, robots, canonical and metadata checks.
6. Search Console next steps — exact sitemap URL and key URLs to inspect manually.
7. What was deliberately not done — confirm no new tools/pages/modules and no UI redesign.
Be precise. Distinguish what you verified from what you inferred or could not verify. Never report a check as passed unless you actually ran it.