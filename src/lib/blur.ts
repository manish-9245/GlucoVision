// Blur detection via Variance of Laplacian , lightweight, runs on 200x200 downscaled canvas
// Higher variance = sharper. Thresholds tuned for fundus/eye captures on phone.

export type BlurResult = {
  variance: number;
  quality: number; // 0-100
  isBlurry: boolean;
  label: "sharp" | "ok" | "blurry" | "very-blurry";
};

// Downscales imageData to ~200px width for performance, then computes Laplacian variance
export function estimateBlurScore(sourceW: number, sourceH: number, data: Uint8ClampedArray): BlurResult {
  const w = 160;
  const h = Math.round((sourceH / sourceW) * w) || 160;

  // Grayscale + downscale via nearest neighbor (fast) , we already have full data, so do simple sampling
  // If source is larger, sample every Nth pixel
  const gray = new Float32Array(w * h);
  const stepX = sourceW / w;
  const stepY = sourceH / h;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sx = Math.floor(x * stepX);
      const sy = Math.floor(y * stepY);
      const idx = (sy * sourceW + sx) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // luminance
      gray[y * w + x] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
  }

  // Laplacian kernel [0,1,0; 1,-4,1; 0,1,0] , compute response then variance
  const lap = new Float32Array(w * h);
  let sum = 0;
  let count = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const v =
        gray[i - w] + // top
        gray[i - 1] + // left
        gray[i + 1] + // right
        gray[i + w] - // bottom
        4 * gray[i];
      lap[i] = v;
      sum += v;
      count++;
    }
  }
  const mean = sum / count;
  let variance = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const d = lap[i] - mean;
      variance += d * d;
    }
  }
  variance = variance / count;

  // Map variance -> quality 0-100 (tuned: variance 15 = very blurry, 120+ = sharp, 300+ = very sharp)
  // Fundus images are low-contrast, so thresholds lower than documents
  let quality: number;
  let label: BlurResult["label"];
  let isBlurry: boolean;
  if (variance < 18) {
    quality = Math.max(22, Math.min(48, 22 + variance * 1.1));
    label = "very-blurry";
    isBlurry = true;
  } else if (variance < 55) {
    quality = 48 + ((variance - 18) / 37) * 20; // 48-68
    label = "blurry";
    isBlurry = true;
  } else if (variance < 130) {
    quality = 68 + ((variance - 55) / 75) * 18; // 68-86
    label = "ok";
    isBlurry = false;
  } else {
    quality = Math.min(97, 86 + ((variance - 130) / 170) * 11);
    label = "sharp";
    isBlurry = false;
  }

  return { variance: Math.round(variance * 10) / 10, quality: Math.round(quality), isBlurry, label };
}

export function blurQualityToState(quality: number) {
  if (quality < 60) return { color: "red", text: "Too blurry", action: "Hold steady, move closer, clean lens" };
  if (quality < 80) return { color: "amber", text: "Soft focus", action: "Slight motion, hold steady" };
  return { color: "emerald", text: "Sharp", action: "Ready for inference" };
}

// Helper for canvas element
export function estimateFromCanvas(canvas: HTMLCanvasElement): BlurResult | null {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  const w = canvas.width;
  const h = canvas.height;
  if (w === 0 || h === 0) return null;
  const imageData = ctx.getImageData(0, 0, w, h);
  return estimateBlurScore(w, h, imageData.data);
}
