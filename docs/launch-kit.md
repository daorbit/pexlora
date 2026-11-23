# Pexlora launch kit

Ready-to-paste listings and video scripts. Before posting, check that every line is still true for the live site. Don't add ratings, user counts or testimonials unless they are real.

Site: https://pexlora.daorbit.in

## Order

1. AlternativeTo
2. DEV article
3. Product Hunt (Tuesday to Thursday; be free to answer comments that day)
4. Short videos, one every two or three days
5. Reddit and Quora answers, only where someone asks the question

Use the UTM links below so the source shows up in analytics.

| Place | Link |
|---|---|
| AlternativeTo | https://pexlora.daorbit.in/?utm_source=alternativeto |
| DEV | https://pexlora.daorbit.in/remove-ai-metadata?utm_source=devto |
| Product Hunt | https://pexlora.daorbit.in/?utm_source=producthunt |
| YouTube | https://pexlora.daorbit.in/photo-resizer?utm_source=youtube |
| Instagram | https://pexlora.daorbit.in/photo-resizer?utm_source=instagram |

## AlternativeTo

**Name:** Pexlora

**Tagline:** Remove hidden metadata from photos and files in your browser

**Description:**
Pexlora removes hidden metadata (EXIF, GPS location, XMP, IPTC, C2PA and AI generator tags) from photos, PDFs, Office files, audio and video. It also compresses images to an exact KB size, resizes photos and signatures for application forms, converts formats and edits PDFs.

JPG, PNG, WebP and HEIC photos are cleaned in the browser and aren't uploaded. AVIF, TIFF and GIF images are processed in memory on the server and not saved. It works without an account, up to 10 files a day, or 100 with a free account.

It removes metadata only. It doesn't remove pixel watermarks such as SynthID.

**License:** Freemium

**Platforms:** Online

**Tags:** metadata-remover, exif, privacy, image-compressor, pdf-tools

**Alternative to:** ExifCleaner, ExifTool, TinyPNG, iLovePDF

## Product Hunt

**Name:** Pexlora

**Tagline (60 characters max):** See and remove the hidden data in your photos and files

**Description (260 characters max):**
Photos can carry your location, camera and AI tags. Pexlora shows what's inside, then removes it. JPG, PNG, WebP and HEIC are cleaned in your browser. Also compresses to an exact KB size and works with PDFs. Free, no sign-up.

**Topics:** Privacy, Photography, Productivity

**First comment:**
Hi, I'm Ajay, and I make Pexlora. [One sentence in your own words: why you built it.] A normal phone photo can give away where it was taken, when, and on which phone.

Drop a file in and it lists everything first, so you can see what you were about to share. Then you get a clean copy. For JPG, PNG and WebP the image data isn't re-encoded, so the picture stays the same.

Two limits I want to be clear about. It removes metadata, not watermarks in the pixels. And AVIF, TIFF and GIF are processed on our server, in memory and not saved, instead of in the browser.

I'd like to know which file type you'd want next.

**Images to prepare (1270 × 760):**
1. The report for a phone photo, with the location fields visible (use the sample photo, never a real address)
2. Before and after tag count
3. Compress to 50 KB with a result
4. The page that shows where each tool processes files: /file-handling

## DEV article

**Title:** What's hidden in a photo, and how to cut it out without re-encoding

**Tags:** privacy, webdev, javascript, images

**Outline:**

1. The problem: a phone photo with GPS and a serial number in it.
2. Where it lives: JPEG APP segments, PNG chunks, WebP chunks, HEIC items.
3. Why re-saving the image is the wrong fix: you lose quality, and the colour profile can go with it.
4. Cutting the segments out: walk the markers, drop APP1 and APP13, keep ICC.
5. The rotation trap: remove EXIF and the photo turns sideways. Keep a minimal EXIF block with only Orientation.
6. Content Credentials: what a C2PA manifest is and where it sits in a JPEG.
7. What this can't do: watermarks in pixels.
8. Link to the tool, once, at the end.

Write it from the code you shipped and include one real code sample. Posts that are only a product pitch get ignored.

## Short videos (Hindi or Hinglish, 20 to 30 seconds, screen recording on a phone)

**1. Exam form photo, 20 to 50 KB**

- Hook (0 to 3 s): "Form photo reject ho rahi hai?"
- Show a 4 MB photo being refused by an upload box.
- Open the IBPS photo preset, add the photo, tap Resize for Form.
- Show the final KB and size.
- Close: "Notice ka size check karo, number badal sakte ho. Link bio mein."

**2. Photo under 20 KB without turning it into a blur**

- Hook: "20 KB mein photo blur kyun hoti hai?"
- Show the same photo at 800 × 1000 and at 200 × 230, both under 20 KB.
- Line: "KB nahi, pixels zyada hain. Pehle chhota karo, phir compress."
- Close on the Compress to 20 KB page.

**3. Your photo knows your address**

- Hook: "Is photo mein aapka ghar ka location hai."
- Open the sample photo in the viewer and zoom on the map.
- Remove metadata, show 0 tags left.
- Close: "Bhejne se pehle saaf karo."

**4. Why Instagram says AI info on your photo**

- Hook: "AI use nahi kiya, phir bhi AI info?"
- Show the report with the orange AI tags on an edited photo.
- Explain in one line: editing apps can write AI fields into the file.
- Say it clearly: "Guarantee nahi hai, aur AI se bani photo par label rehne do."

**5. PAN card photo size**

- Hook: "PAN photo ka size: NSDL aur UTI alag hain."
- Show the PAN preset, then change the numbers.
- Close: "Upload screen par jo size likha hai wahi rakho."

## Answering questions on Reddit and Quora

Answer the question fully first. Mention Pexlora only if it does exactly what was asked, and say you made it. One link at most.

Example, for "How do I get a photo under 30 KB?":

> The pixels matter more than the KB. At about 413 × 531 px (passport size) a JPG under 30 KB still looks clean. At 800 × 1000 px it usually doesn't. Crop to head and shoulders, resize to about that, then compress. Any editor can do it. I made a free tool that does both steps in the browser, if it helps: https://pexlora.daorbit.in/compress-image-to/30kb
