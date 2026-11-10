import Link from "next/link";
import { site } from "@/content/site";
import { pill } from "./pill";

/** Top bar: round logo, a slot for search (issue #4), Resume pill. */
export function SiteHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="flex flex-wrap items-center gap-3 px-5 py-3.5">
      <Link
        href="/"
        aria-label={`${site.name}, home`}
        className="bg-accent hover:bg-accent-hover flex size-12 flex-none items-center justify-center rounded-full text-[22px] font-extrabold text-white no-underline hover:text-white"
      >
        H
      </Link>
      <div className="min-w-0 flex-[1_1_260px]">{children}</div>
      {site.resume && (
        <a href={site.resume} className={pill.dark}>
          Resume
        </a>
      )}
    </header>
  );
}
