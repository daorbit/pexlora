export type AuthMode = "signin" | "signup";

export const authMedia = {
  src: "/samples/ocean-dusk.jpg",
  alt: "Dusk over a wet beach",
  fileName: "IMG_2048.jpg",
  found: (count: number) => `${count} tags found`,
  headline: "Share the photo.",
  highlight: "Not the location.",
  tags: [
    { label: "Location", value: "15.4959° N, 73.8093° E", risky: true },
    { label: "Device", value: "Apple iPhone 15 Pro", risky: false },
    { label: "Taken", value: "14 Oct 2026 · 17:42", risky: false },
    { label: "Lens", value: "6.86 mm ƒ/1.78", risky: false },
  ],
  removeAll: (count: number) => `Remove All ${count}`,
};

export const authLegal = "By continuing you agree to the Terms and Privacy Policy. Files you process are never stored.";
