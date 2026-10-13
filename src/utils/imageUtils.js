/**
 * High-performance image optimization utilities for TK Furniture.
 * Converts heavy raw Unsplash URLs into lightweight, high-density WebP formats
 * with tailored dimensions and compression to drastically improve mobile loading times.
 */

export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url || typeof url !== "string") return url;

  const {
    width = 600,
    quality = 75,
    format = "webp",
    fit = "crop",
  } = options;

  if (url.includes("images.unsplash.com")) {
    try {
      // Split base from search params to handle URLs safely
      const [base, query] = url.split("?");
      const params = new URLSearchParams(query || "");

      params.set("auto", "format");
      params.set("fit", fit);
      params.set("w", String(Math.round(width)));
      params.set("q", String(quality));
      params.set("fm", format);

      return `${base}?${params.toString()}`;
    } catch {
      return url;
    }
  }

  return url;
};

/**
 * Generates responsive srcset attribute for modern multi-DPI and mobile displays.
 */
export const getResponsiveSrcSet = (url, widths = [320, 480, 640, 800, 1024], quality = 75) => {
  if (!url || typeof url !== "string" || !url.includes("images.unsplash.com")) {
    return undefined;
  }

  return widths
    .map((w) => `${getOptimizedImageUrl(url, { width: w, quality, format: "webp" })} ${w}w`)
    .join(", ");
};
