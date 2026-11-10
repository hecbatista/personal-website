import type { ImagePin, Pin } from "@/content/types";

// Pure layout math shared by the board's pin cards and the masonry.

/** Draft pins without media get a stable, varied shape so previews look like a board. */
const draftRatios = [1.3, 1, 1.15, 0.8, 1.2];

function hash(text: string) {
  let h = 0;
  for (const char of text) h = (h * 31 + char.charCodeAt(0)) >>> 0;
  return h;
}

/** Thumbnail height ÷ width for an image pin. */
export function thumbRatio(pin: ImagePin): number {
  const first = pin.media?.[0];
  if (first) return first.height / first.width;
  if (pin.featured) return 1.4;
  return draftRatios[hash(pin.slug) % draftRatios.length];
}

/** Rough wrapped line count for text at a given size. Good enough for column balancing. */
function lines(text: string, width: number, fontSize: number) {
  const charsPerLine = Math.max(1, Math.floor(width / (fontSize * 0.55)));
  return Math.ceil(text.length / charsPerLine);
}

/** Estimated rendered height of a pin card at a column width, in px. */
export function estimateHeight(pin: Pin, width: number): number {
  if (pin.kind === "text") {
    const inner = width - 44;
    return (
      52 + // padding
      18 + // label
      lines(pin.title, inner, 26) * 29 +
      lines(pin.body, inner, 14) * 20 +
      24 // gaps
    );
  }
  return (
    width * thumbRatio(pin) +
    8 + // gap under the image
    lines(pin.title, width - 8, 15) * 19 +
    lines(pin.caption, width - 8, 13) * 18
  );
}
