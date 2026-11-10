import Image from "next/image";
import { site } from "@/content/site";
import { EmailLink } from "./email-link";
import { pill } from "./pill";

/** Centered profile header on the board. */
export function Profile() {
  return (
    <section className="flex flex-col items-center gap-3.5 px-5 pt-10 pb-7 text-center">
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
      <div className="flex flex-wrap justify-center gap-2.5 pt-1.5">
        <EmailLink className={pill.accent}>Get in touch</EmailLink>
        {site.resume && (
          <a href={site.resume} className={pill.grey}>
            Resume
          </a>
        )}
      </div>
    </section>
  );
}
