import type { WorkspaceToolSlug } from "@/config/tools";

export const ratingProof = {
  value: 4.9,
  reviews: "320+ reviews",
  summary: "Rated 4.9 out of 5 from 320+ reviews",
};

export const filesProof = {
  count: "45K+",
  label: "files cleaned",
};

export const heroProof = {
  label: "What people say",
};

type ToolProof = { count: string; label: string };

export const toolProof: Partial<Record<WorkspaceToolSlug, ToolProof>> = {
  "remove-metadata": { count: "45K+", label: "files cleaned" },
  "view-metadata": { count: "18K+", label: "files checked" },
  "edit-metadata": { count: "3K+", label: "files edited" },
  "compress-image": { count: "22K+", label: "images compressed" },
  "resize-image": { count: "14K+", label: "images resized" },
  "crop-image": { count: "6K+", label: "images cropped" },
  "convert-format": { count: "19K+", label: "images converted" },
  "heic-to-jpg": { count: "9K+", label: "photos converted" },
  "form-photo": { count: "11K+", label: "form photos resized" },
  "passport-photo": { count: "4K+", label: "sheets made" },
  "merge-pdf": { count: "7K+", label: "PDFs merged" },
  "split-pdf": { count: "3K+", label: "PDFs split" },
  "jpg-to-pdf": { count: "8K+", label: "PDFs created" },
  "pdf-to-jpg": { count: "5K+", label: "PDFs converted" },
};

export const toolProofFallback: ToolProof = { count: "45K+", label: "files processed" };

export const testimonialsCopy = {
  title: "People clean their files here",
  titleMarker: "every day.",
  carouselLabel: "What people say about Pexlora",
  audienceLabel: "Made for",
  audience: ["Photographers", "Journalists", "Students", "Online sellers", "Designers", "Travellers"],
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Every travel photo I posted had my hotel's exact location in it. Now I clean them before sharing.",
    name: "Priya S.",
    role: "Travel blogger",
    avatar: "/avatars/avatar-1.svg",
  },
  {
    quote: "Client product shots carried my editor's name and software. One drop and it's gone, nothing to install.",
    name: "Daniel K.",
    role: "Freelance designer",
    avatar: "/avatars/avatar-2.svg",
  },
  {
    quote: "Getting a photo under 50 KB for exam forms used to take an hour of guessing. Here it's one step.",
    name: "Ankit R.",
    role: "Student",
    avatar: "/avatars/avatar-3.svg",
  },
  {
    quote: "I check images from sources for camera and location data before we publish. The viewer makes it quick.",
    name: "Meera J.",
    role: "Journalist",
    avatar: "/avatars/avatar-4.svg",
  },
  {
    quote: "Merged twelve invoices into one PDF on my phone, right in the browser. No uploads, no app.",
    name: "Rahul V.",
    role: "Small business owner",
    avatar: "/avatars/avatar-5.svg",
  },
  {
    quote: "My generated images carried the prompt and model name in the file. I strip that before posting my work.",
    name: "Sara L.",
    role: "Digital artist",
    avatar: "/avatars/avatar-6.svg",
  },
];

export const statsCopy = {
  eyebrow: "Pexlora in numbers",
  liveBadge: "Live",
  liveLabel: "files processed today",
  toolsLabel: "free tools",
  ratingLabel: "average rating",
  countries: { value: "60+", label: "countries" },
};

export const signupProof = {
  text: "Join 3,000+ people already using Pexlora",
};

export const pricingProof = {
  text: "Trusted by 320+ Pro members",
  title: "What Pro members say",
  carouselLabel: "What Pro members say about Pexlora",
  testimonials: [
    {
      quote: "Pro paid for itself in the first week. I clean and resize every listing photo here now.",
      name: "Kavya M.",
      role: "Online seller",
      avatar: "/avatars/avatar-3.svg",
    },
    {
      quote: "I deliver hundreds of photos per shoot. Bigger batches mean a few runs instead of dozens.",
      name: "Arjun T.",
      role: "Wedding photographer",
      avatar: "/avatars/avatar-2.svg",
    },
    {
      quote: "The extra Orbit AI runs are why I upgraded. Alt text for a whole blog post in one sitting.",
      name: "Neha P.",
      role: "Content writer",
      avatar: "/avatars/avatar-6.svg",
    },
  ] satisfies Testimonial[],
};

export const doneProof = {
  text: (count: string) => `Done. Your files join ${count} processed on Pexlora.`,
};
