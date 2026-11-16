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
    badge: "Live",
    title: "Northeast Fence",
    caption: "Website rebuild, Google Ads, and a CRM in the works",
    context: "northeast-fence.com",
    description:
      "I rebuilt and launched the website for my family’s fencing business in Union and Middlesex counties, NJ, and I run its Google Ads. A custom CRM is next.",
    role: "Built, ran, and maintains this",
    media: [
      {
        type: "image",
        src: "/pins/northeast-fence/home-phone-hero.jpg",
        alt: "Northeast Fence home page on a phone: the headline “Fence Installation & Vinyl Fence Supply in New Jersey” over a white vinyl fence, with Call and Get a Free Quote buttons pinned to the bottom of the screen.",
        width: 780,
        height: 962,
      },
      {
        type: "image",
        src: "/pins/northeast-fence/home.jpg",
        alt: "Northeast Fence home page on desktop: navigation with a phone button and a Get a Free Quote button, then a full-width hero photo of a white vinyl fence with the headline, a line about 370 Google reviews, and call and quote buttons.",
        width: 1600,
        height: 1000,
      },
      {
        type: "image",
        src: "/pins/northeast-fence/edison.jpg",
        alt: "The Edison, NJ town page: breadcrumbs, the headline “Fence Company Edison NJ” over a photo of a wood fence, review badges for Facebook, Google, and Yelp, and a Get a Free Quote card.",
        width: 1600,
        height: 1000,
      },
      {
        type: "image",
        src: "/pins/northeast-fence/quote-form.jpg",
        alt: "The quote form: name, phone, email, town, fence type, and project details fields, next to a short promise of a callback within one business day and written quotes.",
        width: 1600,
        height: 852,
      },
    ],
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
      "GitHub Actions",
      "GA4",
      "Google Ads",
      "Claude Code",
    ],
    writeUp: {
      problem:
        "An older WordPress site where leads landed in an email inbox, and no CRM to track them. Google Ads were already running, so losing search rankings in a rebuild would have cost real money.",
      builtLabel: "What I did",
      built:
        "Rebuilt the site in Next.js as fast static pages and moved the business’s existing domain from WordPress to Vercel. The quote form saves each lead to a database and emails an alert. Every phone tap and form submission counts as a Google Ads conversion, tracked only in production so tests never send fake ones. I redirected 184 retired pages to their closest match instead of letting them break, and wrote a tool that merges later edits from the old site without undoing my fixes. Before the rebuild, I built a tiered service-area plan from past job data that the owner adopted, and launched Local Services Ads.",
      decisions:
        "Launched with the same URLs, titles, and headings first and saved improvements for later, because the biggest risk was losing Google rankings while ads were running. Kept the database on a free plan, with a scheduled job that stops it from pausing, because the owner wanted $0 in hosting costs. Ran the launch with Claude Code: a parallel-agent SEO audit, and separate sessions for tracking, email, and the cutover.",
      result:
        "Launched on November 15, 2026. In production, all 331 URLs behave as planned (124 kept, 202 redirected, 5 retired) and all 103 pages pass the SEO checks. Call and lead conversions were confirmed firing on the live site.",
      next: "A custom CRM built around how the business actually works, with security as the top priority. Also a phone-friendly Google Ads dashboard for the owners, now scoped.",
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
