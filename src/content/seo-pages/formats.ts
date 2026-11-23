import { fileKinds } from "@/config/file-formats";
import { extensions, faqs, removedList, sizeLimit } from "@/content/seo-pages/shared";
import type { SeoPage } from "@/content/seo-pages/types";

export const formatPages: SeoPage[] = [
  {
    slug: "remove-pdf-metadata",
    category: "formats",
    tool: "remove-metadata",
    kinds: ["pdf"],
    icon: fileKinds.pdf.icon,
    name: "PDF Metadata Remover",
    title: "Remove PDF Metadata Online: Author, Creator & XMP",
    headline: "Remove metadata from PDF files.",
    description:
      "Strip the author, title, creator app, dates, XMP and C2PA data from PDFs. Pages, text and links stay the same.",
    keywords: [
      "remove metadata from pdf",
      "pdf metadata remover",
      "remove author from pdf",
      "pdf metadata cleaner",
      "delete pdf properties",
      "remove xmp from pdf",
    ],
    intro: {
      heading: "What a PDF says about its author",
      paragraphs: [
        "Every PDF has a document information dictionary and usually an XMP packet. Together they record the author, title, subject, keywords, the app that created the file, the library that exported it and when it was created and last changed. Exports from Word, Google Docs or AI writing tools often name the account that made them.",
        "Pexlora removes the information dictionary, every XMP packet on the document, pages and images, Adobe editing data and C2PA manifests. Pages, fonts, images, links, attachments and form fields are kept. It all happens in your browser.",
      ],
    },
    list: removedList([
      "Author, title, subject and keywords",
      "Creator and producer apps",
      "Creation and modification dates",
      "XMP packets on the document, pages and images",
      "C2PA Content Credentials manifests",
      "Adobe PieceInfo editing data",
    ]),
    faqs: [
      faqs.onDevice,
      {
        question: "Will the PDF look different after cleaning?",
        answer:
          "No. Only the document information and XMP blocks are removed. Pages, fonts, images, links and form fields are kept as they are.",
      },
      {
        question: "Can I clean a password-protected PDF?",
        answer: "Not yet. Remove the password in your PDF reader first, then drop the file here.",
      },
      {
        question: "How large can the PDF be?",
        answer: `Up to ${sizeLimit("pdf")} per file, and up to 10 files at a time.`,
      },
    ],
    related: ["remove-office-metadata", "remove-audio-metadata", "remove-c2pa-content-credentials"],
  },
  {
    slug: "remove-office-metadata",
    category: "formats",
    tool: "remove-metadata",
    kinds: ["office"],
    icon: fileKinds.office.icon,
    name: "Word, Excel & PowerPoint Metadata Remover",
    title: "Remove Metadata from Word, Excel & PowerPoint",
    headline: "Remove metadata from Word, Excel and PowerPoint.",
    description: `Remove the author, last editor, company, comment names and hidden properties from ${extensions(["office"])} files.`,
    keywords: [
      "remove metadata from word document",
      "remove author from word",
      "remove metadata from excel",
      "remove metadata from powerpoint",
      "docx metadata remover",
      "remove personal information from office document",
    ],
    intro: {
      heading: "Office files remember who touched them",
      paragraphs: [
        "Word, Excel and PowerPoint save document properties alongside your content: the author, who saved it last, company, manager, template, total editing time and revision number. Comments and tracked changes carry each reviewer's name, and many files include a preview thumbnail of the first page.",
        "Pexlora clears all of it and keeps your text, formulas, slides and formatting untouched. Files are processed in your browser and never uploaded.",
      ],
    },
    list: removedList([
      "Author and last modified by",
      "Company, manager and template",
      "Total editing time and revision number",
      "Custom document properties",
      "Names on comments and tracked changes",
      "The preview thumbnail of the first page",
    ]),
    faqs: [
      faqs.onDevice,
      {
        question: "Does this change the content of my document?",
        answer:
          "No. Only properties and reviewer names are cleared. Text, formulas, slides, formatting, comments and tracked changes stay in place.",
      },
      {
        question: "Are old .doc, .xls and .ppt files supported?",
        answer: "Not yet. Open them in Office and save as .docx, .xlsx or .pptx first.",
      },
      {
        question: "How large can the document be?",
        answer: `Up to ${sizeLimit("office")} per file, and up to 10 files at a time.`,
      },
    ],
    related: ["remove-pdf-metadata", "remove-audio-metadata", "remove-exif-data"],
  },
  {
    slug: "remove-audio-metadata",
    category: "formats",
    tool: "remove-metadata",
    kinds: ["audio"],
    icon: fileKinds.audio.icon,
    name: "Audio Metadata Remover",
    title: "Remove MP3, WAV, FLAC & M4A Metadata and ID3 Tags",
    headline: "Remove metadata from audio files.",
    description: `Strip ID3 tags, cover art, encoder details and AI music tags from ${extensions(["audio"])} files without re-encoding.`,
    keywords: [
      "remove metadata from mp3",
      "id3 tag remover",
      "remove mp3 tags",
      "audio metadata remover",
      "remove suno metadata",
      "remove metadata from wav",
      "flac tag remover",
    ],
    intro: {
      heading: "What your audio files carry",
      paragraphs: [
        "MP3 files hold ID3 and APE tags, FLAC files hold Vorbis comments and pictures, WAV files hold INFO, broadcast and iXML chunks, and M4A files hold iTunes tags. Besides title and artist, they often name the encoder, the recording software, the engineer, and the AI music tool that generated the track.",
        "Pexlora copies the audio data byte for byte and leaves the tag blocks out. The sound is identical, and nothing is uploaded.",
      ],
    },
    list: removedList([
      "ID3v1, ID3v2 and APE tags in MP3",
      "Vorbis comments and pictures in FLAC",
      "INFO, broadcast and iXML chunks in WAV",
      "iTunes tags and cover art in M4A",
      "Encoder and software names",
      "Tags written by AI music tools such as Suno and Udio",
    ]),
    faqs: [
      faqs.onDevice,
      {
        question: "Does removing tags change the sound?",
        answer: "No. The audio data is copied byte for byte. Only the tag blocks around it are left out.",
      },
      {
        question: "Will my music player still show the song?",
        answer: "Yes, but without a title, artist or cover. Players fall back to the file name.",
      },
      {
        question: "How large can the audio file be?",
        answer: `Up to ${sizeLimit("audio")} per file, and up to 10 files at a time.`,
      },
    ],
    related: ["remove-video-metadata", "remove-office-metadata", "ai-metadata-checker"],
  },
  {
    slug: "remove-video-metadata",
    category: "formats",
    tool: "remove-metadata",
    kinds: ["video"],
    icon: fileKinds.video.icon,
    name: "Video Metadata Remover",
    title: "Remove Video Metadata from MP4, MOV & WebM Online",
    headline: "Remove metadata from videos.",
    description: `Strip GPS, recording dates, C2PA and encoder tags from ${extensions(["video"])} files without re-encoding.`,
    keywords: [
      "remove metadata from video",
      "video metadata remover",
      "remove metadata from mp4",
      "remove gps from video",
      "remove metadata from mov",
      "remove sora metadata",
      "remove ai video metadata",
    ],
    intro: {
      heading: "Videos record where and how they were made",
      paragraphs: [
        "Phone videos store the camera make and model, the software version, the recording date and often the exact GPS location. AI video tools such as Sora, Veo and Runway can add C2PA Content Credentials and their own encoder tags.",
        "Pexlora blanks every metadata box in place. The video and audio streams are never touched, so quality and file size stay the same, and even multi-gigabyte files are cleaned in seconds on your device.",
      ],
    },
    list: removedList([
      "GPS location recorded by phones",
      "Camera make, model and software",
      "Recording and modification dates",
      "C2PA Content Credentials from AI video tools",
      "XMP, iTunes and QuickTime tags",
      "Titles, tags and attachments in WebM and MKV",
    ]),
    faqs: [
      faqs.onDevice,
      {
        question: "Does cleaning reduce video quality?",
        answer:
          "No. The video and audio streams are not touched. Metadata is blanked out in place, so the file plays exactly as before and keeps the same size.",
      },
      {
        question: "Can I clean large videos?",
        answer: `Yes, up to ${sizeLimit("video")} per file. Because nothing is uploaded, large files are as fast as your device can read them.`,
      },
      faqs.watermarks,
    ],
    related: ["remove-audio-metadata", "remove-gps-from-photo", "remove-c2pa-content-credentials"],
  },
];
