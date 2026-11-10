import type { Pin } from "./types";

// Board order is the order of this array, with featured pins moved to the front.
// Pins stay `draft: true` until their real assets land (issue #7).
// Placeholders in [brackets] are allowed only in drafts; CI rejects them anywhere else.

export const pins: Pin[] = [
  {
    slug: "northeast-fence",
    kind: "image",
    category: "Work",
    featured: true,
    badge: "In progress",
    draft: true, // needs screenshots captured from northeast-fence.com
    title: "Northeast Fence",
    caption: "Website rebuild, Google Ads, and a CRM in the works",
    context: "northeast-fence.com",
    description:
      "A new website, Google Ads strategy, and a custom CRM in progress for my family’s fencing business in Union and Middlesex counties, NJ.",
    role: "Built, ran, and maintains this",
    links: [
      {
        label: "Visit site",
        href: "https://northeast-fence.com",
        primary: true,
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "Resend",
      "Vercel",
      "GA4",
      "Google Ads",
    ],
    writeUp: {
      problem:
        "An older WordPress site where leads landed in an email inbox, and no CRM to track them.",
      builtLabel: "What I did",
      built:
        "Rebuilt the site as fast static pages, with a landing page for each service in each town for paid traffic. New lead form saves to a database and sends alerts. Built a tiered service-area plan from past job data that the owner adopted, and launched Local Services Ads.",
      decisions:
        "Kept every existing URL at launch to protect search rankings. Chose ad landing pages over a blog. Skipped a CMS for now since I maintain the site in code.",
      next: "A custom CRM built around how the business actually works, with security as the top priority.",
    },
  },
  {
    slug: "firstbyte-dashboard",
    kind: "image",
    category: "Work",
    featured: true,
    badge: "In production",
    draft: true, // needs dashboard screenshots
    title: "FirstByte Dashboard",
    caption: "Attendance and club management app, built solo",
    context: "For FirstByte at Northeastern",
    description:
      "A club management and attendance tracking app for FirstByte, a CS/STEM education club. I’m the only developer, and it runs in production for real members.",
    role: "Solo developer",
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Supabase",
      "shadcn/ui",
      "Tailwind",
      "Vercel",
      "GitHub Actions",
    ],
    writeUp: {
      built:
        "Self check-in with signed QR codes, member and officer dashboards with attendance rates, searchable attendance records, and a feedback system officers can review.",
      decisions:
        "Email sign-in links kept breaking because school email scanners clicked them first, so I switched to 6-digit codes. Every pull request has to pass formatting, linting, type checks, and a build before it can merge. Preview deploys use their own database so testing never touches real data.",
      next: "An approval step for new members, dark mode, and moving it to the club’s own domain.",
    },
  },
  {
    slug: "firstbyte",
    kind: "image",
    category: "Work",
    featured: true,
    draft: true, // needs a screenshot of the FirstByte site
    title: "FirstByte",
    caption: "Leading the website team and the club’s stack",
  },
  {
    slug: "how-i-build",
    kind: "text",
    category: "Work",
    title: "Issue → branch → CI → deploy.",
    caption: "How I build",
    body: "Workflow first. Claude skills for the repetitive parts.",
  },
  {
    slug: "district-court-nj",
    kind: "image",
    category: "Work",
    draft: true,
    title: "U.S. District Court of NJ",
    caption: "IT intern",
  },
  {
    slug: "tech-communication-workshop",
    kind: "image",
    category: "Work",
    draft: true,
    title: "Explaining tech to non-tech people",
    caption: "FirstByte × Hack84 workshop",
  },
  {
    slug: "vital-hackathon",
    kind: "image",
    category: "Work",
    draft: true,
    title: "ViTAL hackathon",
    caption: "Software Expert Co-Lead, curating tracks",
  },
  {
    slug: "boys-and-girls-club",
    kind: "image",
    category: "Work",
    draft: true,
    title: "Boys & Girls Club",
    caption: "Volunteer teaching in Dorchester",
  },
  {
    slug: "firstbyte-events",
    kind: "image",
    category: "Work",
    draft: true,
    title: "FirstByte events",
    caption: "[Your caption]",
  },
  {
    slug: "travel-1",
    kind: "image",
    category: "Life",
    draft: true,
    title: "[Place]",
    caption: "Travel",
  },
  {
    slug: "something-i-cooked",
    kind: "image",
    category: "Life",
    draft: true,
    title: "Something I cooked",
    caption: "[Your caption]",
  },
  {
    slug: "travel-2",
    kind: "image",
    category: "Life",
    draft: true,
    title: "[Place]",
    caption: "Travel",
  },
  {
    slug: "travel-3",
    kind: "image",
    category: "Life",
    draft: true,
    title: "[Place]",
    caption: "Travel",
  },
];
