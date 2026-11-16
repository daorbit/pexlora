export type SampleImage = {
  id: string;
  label: string;
  src: string;
  fileName: string;
};

export const sampleImages: SampleImage[] = [
  {
    id: "ai-render",
    label: "AI render",
    src: "/samples/ai-render.jpg",
    fileName: "ai-render.jpg",
  },
  {
    id: "phone-photo",
    label: "Phone photo",
    src: "/samples/phone-photo.jpg",
    fileName: "phone-photo.jpg",
  },
];
