# personal-website

Hector Batista's personal site: a board of projects and life, built for recruiters.

- Plan: [docs/DESIGN_BRIEF.md](docs/DESIGN_BRIEF.md), with [docs/DECISIONS.md](docs/DECISIONS.md) taking precedence
- Mockups: [docs/mockups/](docs/mockups/) (layout, styles, and copy reference only)
- Work: [GitHub issues](https://github.com/hecbatista/personal-website/issues), grouped by milestone

## Stack

Next.js (App Router, static), TypeScript, Tailwind CSS v4, Vercel, GitHub Actions.

## Branches

- `main` is production (`hectorbatista.com`). It holds only the coming-soon page until launch.
- `develop` holds work in progress and deploys to a private Vercel preview.
- Open feature PRs against `develop`. Launch by merging `develop` into `main`.

## Develop

```bash
npm install
npm run dev
```

## Checks (same as CI)

```bash
npm run format:check && npm run lint && npm run typecheck && npm run build
```
