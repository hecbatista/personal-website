# Decisions

These decisions came out of reviewing [DESIGN_BRIEF.md](DESIGN_BRIEF.md) on Nov 10, 2026.
Where this file and the brief disagree, this file wins. The mockups in [mockups/](mockups/) are
still the visual reference.

## Releases

| Release | Target                            | For                      | Scope                                                                                                                                          |
| ------- | --------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| v1      | Sun Nov 15, 2026, on `vercel.app` | Spring 2027 co-op search | Scaffold, CI, content model, board, tabs + search, pin detail with screenshot carousel, More like this, contact/resume, responsive + a11y pass |
| v1.1    | Following weekend                 | Summer 2027 applications | Dashboard demo video, demo panel (only with a self-resetting demo environment), Result numbers                                                 |
| Later   | —                                 | —                        | Custom domain (`hectorbatista.com`), AI showcase + local models, share images, real azulejo image, dark mode                                   |

Each piece of work is a GitHub issue, a branch, and a PR. CI (format → lint → typecheck → build) is required on `main`.

## Goal

Within about 30 seconds, a recruiter should do one of three things: open a project write-up,
open the resume, or send an email. Every page puts all three within one click.

- Resume buttons open the PDF directly.
- "Get in touch" is a `mailto:` link (Northeastern email). The address is put together in the browser so it isn't in the HTML for scrapers. It has a Copy button.
- Analytics: free Vercel Analytics, page views only. No click tracking, no cookie banner.

## Identity

- Full name ("Hector Batista") in the H1, the `<title>`, and share metadata.
- "Hector's board" stays as the casual voice, for example in the search placeholder.
- The headline keeps "Product and AI Engineering".

## Board

- **Layout:** client masonry. Each pin goes, in order, into the shortest column, so featured pins fill the top row. CSS `columns` is the fallback when JS is off. This replaces the brief's plain CSS columns.
- **Badges show status, not format:** "Live", "In production", "In progress". The words "case study" never appear. Pins with a write-up still show The problem / What I built / Decisions / Result / What's next.
  - FirstByte Dashboard → "In production"
  - Northeast Fence → "In progress"
  - FirstByte (website team) → no badge, simple detail page
- **v1 pins:** Northeast Fence, FirstByte Dashboard, FirstByte, "How I build" (text pin, mockup copy), Work pins that have photos, and 3–4 Life pins with real photos.
- **Cut:** the Integra and Now Playing.

## Content rules

- No placeholder text ever ships. CI fails if `[bracket]` placeholders are left in non-draft content.
- `draft: true` pins render in dev and on Vercel previews, and are left out of production builds. A pin goes live when its real assets land.
- Assets go in `~/Desktop/site-assets/` (due Sat Nov 14). They get renamed, resized, compressed, and placed in `public/pins/<slug>/`, with alt text drafted for approval. Northeast Fence screenshots are captured from northeast-fence.com.

## Pin detail

- v1 Dashboard: screenshots only. The video (v1.1) is unlisted YouTube through `youtube-nocookie.com`, with a poster image and click-to-load.
- The demo panel stays hidden until there's a separate demo deployment with its own database that resets itself. "Things to try" starts with the officer dashboard, not QR check-in.
- Share uses the Web Share API where there is one, and copies the link on desktop. Copy link shows "Copied".
- The header search pill on pin pages goes back to the board with search focused.

## Visual

- Light mode only in v1.
- No SVG azulejo pattern. A real azulejo image may come later.
