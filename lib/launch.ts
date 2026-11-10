import { site } from "@/content/site";

/**
 * True on the production deploy until `site.launched` is set. Pages check this
 * and show the coming-soon page (or 404) instead of the board.
 */
export const comingSoon =
  process.env.VERCEL_ENV === "production" && !site.launched;
