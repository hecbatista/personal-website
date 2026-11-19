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
    title: "FirstByte Dashboard",
    caption: "Attendance and club management app, built solo",
    context: "For FirstByte at Northeastern",
    description:
      "A club management and attendance tracking app for FirstByte, a CS/STEM education club. I’m the only developer, and it runs in production for real members.",
    role: "Solo developer",
    // Screenshots are from a local dev stack seeded with made-up members; no real member data.
    media: [
      {
        type: "image",
        src: "/pins/firstbyte-dashboard/phone-hero.jpg",
        alt: "Member dashboard on a phone: a “Your attendance” card showing 100% of required meetings and 95% of all events, a row of check and miss marks for recent meetings, and the member’s teams below.",
        width: 780,
        height: 962,
      },
      {
        type: "image",
        src: "/pins/firstbyte-dashboard/officer-dashboard.jpg",
        alt: "Officer dashboard: a card flagging a member who missed 2 of the last 3 meetings, with a Copy email button, above metric cards for last-meeting attendance (75%, with a trend line and an 81% average), last-meeting feedback (4.0 stars from 5 responses, 1 low rating to read), and 50 active members.",
        width: 1600,
        height: 930,
      },
      {
        type: "image",
        src: "/pins/firstbyte-dashboard/qr-check-in.jpg",
        alt: "Projector check-in screen for a live meeting: a large QR code, a 6-character backup code, and a live count of 10 checked in out of 15 invited.",
        width: 1600,
        height: 1000,
      },
      {
        type: "image",
        src: "/pins/firstbyte-dashboard/qr-check-in-phone.jpg",
        alt: "A member’s phone after scanning the meeting QR code: a green check and “You’re checked in” for the Website team meeting.",
        width: 780,
        height: 900,
      },
      {
        type: "image",
        src: "/pins/firstbyte-dashboard/attendance-records.jpg",
        alt: "Attendance records page with the search “general meeting” and the Excused filter applied, listing matching members with the meeting, status, and their excuse notes.",
        width: 1600,
        height: 1000,
      },
      {
        type: "image",
        src: "/pins/firstbyte-dashboard/feedback.jpg",
        alt: "Officer feedback page: a 3.7-star average from 41 ratings with 4 rated 2 stars or less, above a table of recent entries showing the author (or Anonymous), meeting, star rating, and category.",
        width: 1600,
        height: 1000,
      },
    ],
    links: [
      {
        label: "Open app",
        href: "https://teachfirstbyte.com/dashboard",
        primary: true,
      },
      {
        label: "View code",
        href: "https://github.com/teach-firstbyte/firstbyte-web-dashboard",
      },
    ],
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
      problem:
        "Attendance lived in a separate Google Form for each event. When it came time to request funding, Kaleidoscope, the council that funds clubs in Northeastern’s computer science college, asked for all of our attendance records, and we had to pull every form’s responses into one place by hand.",
      built:
        "QR self check-in with HMAC-signed codes for each meeting that only work while the meeting is on. A member dashboard with your own attendance rate, and an officer dashboard with club-wide attendance trends and a list of members who’ve missed recent meetings. Searchable attendance records, a feedback system officers can review, an approval step for new members, and dark mode. It runs on the club’s own domain alongside the main site.",
      decisions:
        "Northeastern’s email scanner was opening confirmation links and confirming new accounts before the email even reached the inbox, so confirming now takes a real button press. Every pull request that touches the app has to pass formatting, linting, type checks, and a build before it can merge, plus a check that keeps the database client out of browser code. Preview deployments run on a separate, seeded database, so testing never touches production data.",
      result:
        "Live since August 18, 2026. So far it has 41 member accounts, 14 meetings, and 221 attendance records, including 40 self check-ins.",
      next: "An attendance export for funding requests, letting admins promote members to officers, and team invites and member search.",
    },
  },
  {
    slug: "firstbyte",
    kind: "image",
    category: "Work",
    featured: true,
    draft: true, // needs a screenshot of the FirstByte site
    title: "FirstByte",
    caption: "Leading a 5-person website team: reviews, CI/CD, and sprints",
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
