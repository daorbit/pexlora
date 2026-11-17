const STEP_DOWN = 0.5;

type Drawable = ImageBitmap | OffscreenCanvas;

function createSurface(width: number, height: number) {
  const canvas = new OffscreenCanvas(width, height);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser couldn't prepare the image.");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  return { canvas, context };
}

export function drawScaled(source: Drawable, width: number, height: number, background: string | null) {
  let current: Drawable = source;
  let currentWidth = source.width;
  let currentHeight = source.height;

  while (currentWidth * STEP_DOWN >= width && currentHeight * STEP_DOWN >= height) {
    currentWidth = Math.round(currentWidth * STEP_DOWN);
    currentHeight = Math.round(currentHeight * STEP_DOWN);
    const step = createSurface(currentWidth, currentHeight);
    step.context.drawImage(current, 0, 0, currentWidth, currentHeight);
    current = step.canvas;
  }

  const { canvas, context } = createSurface(width, height);
  if (background) {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
  }
  context.drawImage(current, 0, 0, width, height);
  return canvas;
}

const pixelCache = new WeakMap<OffscreenCanvas, ImageData>();

export function readPixels(canvas: OffscreenCanvas) {
  const cached = pixelCache.get(canvas);
  if (cached) return cached;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser couldn't read the image.");
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  pixelCache.set(canvas, pixels);
  return pixels;
}
