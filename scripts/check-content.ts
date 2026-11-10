// Content rules that types can't enforce. Runs in CI: `npm run check:content`.
// Uses Node's built-in TypeScript type stripping, so no build step is needed.

import { existsSync } from "node:fs";
import { join } from "node:path";
import { pins } from "../content/pins.ts";

const publicDir = join(import.meta.dirname, "..", "public");
const placeholder = /\[[^\]]*\]/;
const slugFormat = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const errors: string[] = [];
const fail = (slug: string, message: string) =>
  errors.push(`${slug}: ${message}`);

/** Every string in a value, with a dotted path to where it lives. */
function strings(value: unknown, path = ""): [string, string][] {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value))
    return value.flatMap((item, i) => strings(item, `${path}[${i}]`));
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([key, item]) =>
      strings(item, path ? `${path}.${key}` : key),
    );
  return [];
}

function checkPlaceholders(pin: (typeof pins)[number]) {
  for (const [path, text] of strings(pin)) {
    if (placeholder.test(text))
      fail(pin.slug, `placeholder in ${path}: "${text}"`);
  }
}

const seen = new Set<string>();

for (const pin of pins) {
  const { slug } = pin;

  if (!slugFormat.test(slug)) fail(slug, "slug must be lowercase-kebab-case");
  if (seen.has(slug)) fail(slug, "duplicate slug");
  seen.add(slug);

  if (pin.kind !== "image") {
    if (!pin.draft) checkPlaceholders(pin);
    continue;
  }

  const primaryLinks = (pin.links ?? []).filter((link) => link.primary);
  if (primaryLinks.length > 1) fail(slug, "more than one primary link");

  for (const [i, media] of (pin.media ?? []).entries()) {
    const at = `media[${i}]`;
    if (media.type === "image") {
      if (!media.alt.trim()) fail(slug, `${at} needs alt text`);
      if (!media.src.startsWith(`/pins/${slug}/`))
        fail(slug, `${at} should live under /pins/${slug}/`);
      if (!existsSync(join(publicDir, media.src)))
        fail(slug, `${at} file not found: public${media.src}`);
    } else {
      if (i !== 0) fail(slug, `${at} video must be the first media item`);
      if (!media.embedUrl.startsWith("https://www.youtube-nocookie.com/embed/"))
        fail(slug, `${at} embedUrl must be a youtube-nocookie.com embed`);
      if (!existsSync(join(publicDir, media.poster)))
        fail(slug, `${at} poster not found: public${media.poster}`);
    }
  }

  if (!pin.draft) {
    if (!pin.media?.length)
      fail(slug, "published image pins need at least one media item");
    checkPlaceholders(pin);
  }
}

if (errors.length) {
  console.error(`Content check failed (${errors.length}):`);
  for (const error of errors) console.error(`  - ${error}`);
  console.error(
    "\nFix these, or keep the pin as `draft: true` until its real content is in.",
  );
  process.exit(1);
}

const published = pins.filter((pin) => !pin.draft).length;
console.log(
  `Content check passed: ${pins.length} pins (${published} published, ${pins.length - published} draft).`,
);
