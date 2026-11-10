// Content model for the board. See docs/DESIGN_BRIEF.md and docs/DECISIONS.md.
// Keep this file free of runtime code: scripts/check-content.ts loads content
// with Node's built-in type stripping.

export type Category = "Work" | "Life";

/** Status, not format. The words "case study" never appear on the site. */
export type Badge = "Live" | "In production" | "In progress";

export type Media =
  | {
      type: "image";
      /** Path under /public, e.g. "/pins/northeast-fence/home.jpg". */
      src: string;
      alt: string;
      width: number;
      height: number;
    }
  | {
      type: "video";
      /** youtube-nocookie.com embed URL. Never commit video files. */
      embedUrl: string;
      /** Path under /public, shown until the visitor clicks play. */
      poster: string;
      /** Poster dimensions, used for the board thumbnail's aspect ratio. */
      width: number;
      height: number;
      title: string;
      /** e.g. "1:42" */
      length?: string;
    };

export type Link = { label: string; href: string; primary?: boolean };

export type Demo = {
  url: string;
  /** Demo account only, never real users. */
  credentials?: { label: string; value: string }[];
  thingsToTry?: string[];
};

/** Unlabeled write-up sections. Each renders only if present. */
export type WriteUp = {
  problem?: string;
  built?: string;
  /** Heading for `built`. Defaults to "What I built". */
  builtLabel?: "What I built" | "What I did";
  decisions?: string;
  result?: string;
  next?: string;
};

type PinBase = {
  slug: string;
  category: Category;
  title: string;
  caption: string;
  /**
   * Shown in dev and on Vercel preview deploys, left out of production.
   * Remove once the pin's real assets and copy are in.
   */
  draft?: boolean;
};

export type ImagePin = PinBase & {
  kind: "image";
  /** First item is the board thumbnail. A video, if any, goes first. */
  media?: Media[];
  badge?: Badge;
  /** Featured pins sort first on the board. */
  featured?: boolean;
  /** Small line above the title on the detail page, e.g. "For FirstByte at Northeastern". */
  context?: string;
  /** Lead paragraph on the detail page. Falls back to the caption. */
  description?: string;
  /** Role line in the creator row, e.g. "Solo developer". */
  role?: string;
  links?: Link[];
  stack?: string[];
  /** Hidden until a self-resetting demo environment exists. */
  demo?: Demo;
  writeUp?: WriteUp;
};

/** Solid accent block: small label (caption), large headline (title), short line (body). */
export type TextPin = PinBase & {
  kind: "text";
  body: string;
};

export type Pin = ImagePin | TextPin;

/** Site-wide identity and contact details. Optional links render only when set. */
export type Site = {
  /**
   * false: production (hectorbatista.com) shows the coming-soon page.
   * Previews and local dev always show the real site. Flip to true to launch.
   */
  launched: boolean;
  name: string;
  /** Board-voice name, e.g. "Hector's board". */
  shortName: string;
  tagline: string;
  intro: string;
  availability: string;
  /** Split so the address isn't in the HTML; joined in the browser. */
  email: { user: string; domain: string };
  github?: string;
  linkedin?: string;
  /** Path under /public, e.g. "/resume.pdf". */
  resume?: string;
  /** Path under /public, square image. */
  headshot?: string;
};
