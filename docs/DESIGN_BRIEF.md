# Hector's Personal Website — Design Brief

Handoff for implementation. The mockups in `mockups/` are the visual source of truth.
They are written in a design-canvas format (`<x-dc>`, `<sc-for>`, `{{holes}}`, a `DCLogic` class),
so read them for **layout, styles, copy and data**, not as code to copy. Rebuild everything in the stack below.

## Goal

A Pinterest-style personal site. The board _is_ the homepage. Audience: recruiters for
Product Engineer / AI Engineer co-ops (Spring/Summer 2027). Ship fast; content grows later.

## Stack

- Next.js (App Router), TypeScript, fully static (SSG)
- Tailwind CSS v4
- Deployed on Vercel
- CI: GitHub Actions running format check → lint → typecheck → build, required on `main`
- No CMS. Content lives in typed files in the repo.

## Routes

| Route          | Mockup                                                                     | Notes                                                           |
| -------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `/`            | `mockups/board.html`                                                       | Profile header + filter tabs + search + masonry board           |
| `/pins/[slug]` | `mockups/pin-northeast-fence.html`, `mockups/pin-firstbyte-dashboard.html` | One template for every pin; sections render only if data exists |

Every pin opens a detail page. Pins without a case study still get a simple detail page (media + title + caption + "More like this").

## Design tokens

- **Font:** Bricolage Grotesque (Google Fonts, variable, `opsz` 12–96, `wght` 400–800) via `next/font/google`. Fallback: `'Helvetica Neue', Arial, sans-serif`. No monospace anywhere.
- **Colors**
  - Accent (azulejo blue): `#1F4E9E`, hover `#163A78`
  - Ink: `#111111`; body secondary: `#2B2F36`; muted: `#4A4F57`
  - Surface: `#FFFFFF`; pill/search grey: `#EFEFEF`; pale blue panel: `#EEF2F9`; chip text: `#163A78`
  - Divider: `#E3E6EB`; footer band: `#F4F6FA`
- **Radii:** pins 16px, detail card 32px, demo panel 20px, buttons/pills fully round
- **Detail card shadow:** `0 1px 20px rgba(17,17,17,0.12)`
- **Touch targets:** ≥ 44px. Text contrast ≥ 4.5:1.
- **Azulejo tile:** SVG `<pattern>`: 56px tile, quarter circles (r=14) at each corner so they form full circles where tiles meet, an outlined diamond with a dot in the center, all in accent on white. Used for the avatar ring area / brand moments, sparingly.

## Board page (`/`)

1. **Top bar:** round "H" logo (accent), pill search input, black "Resume" pill.
2. **Profile header (centered):** 128px avatar with accent ring, name, one-liner
   "I build useful things for real people.", sub-line with school/major/roles sought,
   buttons "Get in touch" (accent) and "Resume" (grey).
3. **Filter tabs:** `All · Work · Life`. Active tab has a 3px black underline. Use real `<button aria-pressed>`.
4. **Search:** filters pins live by title, caption, category. Show an empty state when nothing matches.
5. **Masonry board:** CSS `columns: 236px; column-gap: 16px`, `break-inside: avoid` on pins.
   - Note: CSS columns order items top-to-bottom per column. If left-to-right order matters, switch to a JS masonry or CSS grid approach later. Fine for v1.
6. **Footer:** "That's the board." + email, LinkedIn, GitHub, Resume (PDF).

### Pin types

- **image** — media block (fixed height per pin from its aspect ratio) + bold title + caption below. No card border.
- **text** — solid accent block with small label, large headline, short line (e.g. "How I build").
- **now** — dark "Now playing" card with round album art. v1: static or hidden; v2: live from Spotify via a route handler (cache it, never expose tokens client-side).

### Overlays on image pins

- `badge` top-left in accent: "Case study" or "In progress"
- `video: true` → dark "▶ Demo video" pill bottom-left

## Pin detail page (`/pins/[slug]`)

- Back button (to `/`), same top bar.
- Large rounded card: **media carousel left**, **details right**; stacks on mobile.
- **Carousel:** prev/next buttons + dots. If the pin has a video, it is the first slide.
- **Video:** embed from an external host (YouTube unlisted, Mux or Cloudflare Stream). Do not commit video files. Lazy-load; show a poster image until play.
- **Right panel, in order:** share + copy-link icon buttons · primary CTA ("Visit site" or "Try the demo") · source/context line · title · description · creator row (avatar, "Hector", role line, "Get in touch") · stack chips · demo panel (if any) · case study sections · nothing else.
- **Demo panel** (only if `demo` exists): live demo link, demo credentials with Copy buttons (use `navigator.clipboard`), numbered "Things to try".
- **Case study sections** (each optional): The problem · What I built/did · Decisions I made · Result · What's next.
- **More like this:** masonry of related pins (same category first).

## Content model

```ts
type Category = "Work" | "Life";

type Media =
  | { type: "image"; src: string; alt: string; width: number; height: number }
  | {
      type: "video";
      embedUrl: string;
      poster: string;
      title: string;
      length?: string;
    };

type Pin = {
  slug: string;
  kind: "image" | "text" | "now";
  category: Category;
  title: string;
  caption: string;
  media?: Media[]; // first item is the board thumbnail
  badge?: "Case study" | "In progress";
  featured?: boolean; // featured pins sort first and render taller
  links?: { label: string; href: string; primary?: boolean }[];
  stack?: string[];
  demo?: {
    url: string;
    credentials?: { label: string; value: string }[]; // demo account only, never real users
    thingsToTry?: string[];
  };
  caseStudy?: {
    problem?: string;
    built?: string;
    decisions?: string;
    result?: string;
    next?: string;
  };
};
```

Store pins in `content/pins.ts` (or one file per pin under `content/pins/`). Images in `public/pins/<slug>/`, rendered with `next/image`.

## Initial content

Featured: Northeast Fence (In progress), FirstByte, FirstByte Dashboard (video + demo).
Work: How I build (text pin), U.S. District Court of NJ, tech communication workshop, ViTAL hackathon, Boys & Girls Club, FirstByte events.
Life: travel (×3), something I cooked, the Integra (optional), Now playing.

Copy for the two case studies is in the mockups. Anything in `[BRACKETS]` is a placeholder for Hector to fill in.

## Out of scope for v1

- CMS, blog, analytics beyond basic Vercel analytics, the "Ask about Hector" chatbot, live Now Playing.

## Suggested milestones (one GitHub issue each)

1. Scaffold Next.js + Tailwind + font + tokens; CI workflow; deploy to Vercel
2. Content model + seed data with placeholders
3. Board page: header, profile, masonry, pin types, overlays
4. Filter tabs + search
5. Pin detail template: card, carousel, right panel
6. Video embed + demo panel
7. More like this + responsive pass + accessibility pass
8. Real content: photos, captions, results, resume PDF
