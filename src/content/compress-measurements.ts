export type PhotoMeasurement = { label: string; pixels: string; qualities: Record<number, number[]> };

export const MEASURED_MAX_QUALITY = 95;
export const CLEAN_QUALITY = 60;

const best = [95, 95, 95, 95];

export const photoMeasurements: PhotoMeasurement[] = [
  {
    label: "Form photo",
    pixels: "200 × 230 px",
    qualities: {
      10: [82, 91, 95, 84],
      15: [91, 95, 95, 92],
      20: best,
      30: best,
      40: best,
      50: best,
      100: best,
      150: best,
      200: best,
      300: best,
    },
  },
  {
    label: "Passport size",
    pixels: "413 × 531 px",
    qualities: {
      10: [22, 45, 66, 26],
      15: [37, 70, 83, 40],
      20: [54, 80, 90, 56],
      30: [73, 89, 95, 73],
      40: [83, 93, 95, 82],
      50: [89, 95, 95, 87],
      100: best,
      150: best,
      200: best,
      300: best,
    },
  },
  {
    label: "Larger portrait",
    pixels: "800 × 1000 px",
    qualities: {
      10: [0, 0, 0, 0],
      15: [0, 24, 33, 0],
      20: [0, 36, 52, 0],
      30: [23, 64, 73, 23],
      40: [34, 69, 89, 30],
      50: [43, 71, 95, 40],
      100: [76, 95, 95, 71],
      150: [95, 95, 95, 87],
      200: best,
      300: best,
    },
  },
];
