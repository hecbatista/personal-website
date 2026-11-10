import { pins } from "@/content/pins";
import type { Pin } from "@/content/types";

/**
 * Drafts show in `next dev` and on Vercel preview deploys only.
 * Every other build, including production and a local `next build`, leaves them out.
 */
export const showDrafts =
  process.env.NODE_ENV === "development" ||
  process.env.VERCEL_ENV === "preview";

const isFeatured = (pin: Pin) => pin.kind === "image" && !!pin.featured;

/** Visible pins in board order: featured first, otherwise as listed in content/pins.ts. */
export function getPins(): Pin[] {
  const visible = pins.filter((pin) => showDrafts || !pin.draft);
  return [
    ...visible.filter(isFeatured),
    ...visible.filter((pin) => !isFeatured(pin)),
  ];
}

export function getPin(slug: string): Pin | undefined {
  return getPins().find((pin) => pin.slug === slug);
}

/** Related pins for "More like this": same category first, then the rest. */
export function getMoreLikeThis(slug: string, limit = 8): Pin[] {
  const current = getPin(slug);
  const others = getPins().filter((pin) => pin.slug !== slug);
  if (!current) return others.slice(0, limit);
  return [
    ...others.filter((pin) => pin.category === current.category),
    ...others.filter((pin) => pin.category !== current.category),
  ].slice(0, limit);
}
