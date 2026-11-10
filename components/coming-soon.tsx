import { site } from "@/content/site";
import { EmailLink } from "./email-link";
import { pill } from "./pill";

/** Production cover page until launch. Same look as the profile header. */
export function ComingSoon() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3.5 px-5 py-16 text-center">
      <div className="bg-accent size-32 rounded-full p-[5px]">
        <div className="text-chip-text flex size-full items-center justify-center rounded-full border-4 border-white bg-[#DCE5F3] text-3xl font-bold">
          <span aria-hidden="true">HB</span>
        </div>
      </div>
      <h1 className="m-0 text-[44px] leading-tight font-extrabold tracking-[-0.03em] [font-variation-settings:'opsz'_96]">
        {site.name}
      </h1>
      <p className="m-0 max-w-[34ch] text-xl font-medium">{site.tagline}</p>
      <p className="text-muted m-0 max-w-[56ch] text-[15px]">{site.intro}</p>
      <p className="bg-panel text-chip-text m-0 mt-2 rounded-full px-4 py-2 text-sm font-bold">
        New site coming soon
      </p>
      <div className="flex flex-wrap justify-center gap-2.5 pt-1.5">
        <EmailLink className={pill.accent}>Get in touch</EmailLink>
        {site.github && (
          <a href={site.github} className={pill.grey}>
            GitHub
          </a>
        )}
      </div>
    </main>
  );
}
