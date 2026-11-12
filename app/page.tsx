import Image from "next/image";
import { EmailLink } from "@/components/email-link";
import { pill } from "@/components/pill";
import { site } from "@/content/site";

// Production home page until launch. The board lives on the develop branch;
// launching is merging develop into main.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3.5 px-5 py-16 text-center">
      <div className="bg-accent size-32 rounded-full p-[5px]">
        <div className="text-chip-text flex size-full items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#DCE5F3] text-3xl font-bold">
          {site.headshot ? (
            <Image
              src={site.headshot}
              alt={site.name}
              width={236}
              height={236}
              preload
              className="size-full object-cover"
            />
          ) : (
            <span aria-hidden="true">HB</span>
          )}
        </div>
      </div>
      <h1 className="m-0 text-[44px] leading-tight font-extrabold tracking-[-0.03em] [font-variation-settings:'opsz'_96]">
        {site.name}
      </h1>
      <p className="m-0 max-w-[34ch] text-xl font-medium">{site.tagline}</p>
      <p className="text-muted m-0 max-w-[56ch] text-[15px]">{site.intro}</p>
      <p className="bg-panel text-chip-text m-0 mt-2 flex items-center gap-2 rounded-full py-2 pr-4 pl-3 text-sm font-bold">
        <AzulejoTile />
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

/** Small azulejo tile that flips like a coin now and then; still for people who prefer reduced motion. */
function AzulejoTile() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className="text-accent motion-safe:animate-coin"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="1" y="1" width="22" height="22" rx="2" fill="#FFFFFF" />
      <path d="M1 7A6 6 0 0 0 7 1M17 1A6 6 0 0 0 23 7M23 17A6 6 0 0 0 17 23M7 23A6 6 0 0 0 1 17" />
      <path d="M12 5.5 18.5 12 12 18.5 5.5 12z" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
