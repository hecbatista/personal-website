import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Board } from "@/components/board";
import { PinDetail } from "@/components/pin-detail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import type { Pin } from "@/content/types";
import { getMoreLikeThis, getPin, getPins } from "@/lib/pins";

// Every visible pin is prerendered. Drafts are left out of production builds
// by getPins(), so their URLs 404 there like any unknown slug.
export function generateStaticParams() {
  return getPins().map((pin) => ({ slug: pin.slug }));
}

function summary(pin: Pin) {
  if (pin.kind === "text") return `${pin.caption}: ${pin.title} ${pin.body}`;
  return pin.description ?? pin.caption;
}

export async function generateMetadata({
  params,
}: PageProps<"/pins/[slug]">): Promise<Metadata> {
  const pin = getPin((await params).slug);
  if (!pin) return {};
  const title = `${pin.kind === "text" ? pin.caption : pin.title} · ${site.name}`;
  const description = summary(pin);
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

/**
 * The header and footer are the same for every pin, so they stay outside the
 * Suspense boundary and belong to the shared App Shell. Everything that reads
 * the slug renders inside it.
 */
export default function PinPage({ params }: PageProps<"/pins/[slug]">) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<PinSkeleton />}>
          <PinContent params={params} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}

async function PinContent({
  params,
}: Pick<PageProps<"/pins/[slug]">, "params">) {
  const { slug } = await params;
  const pin = getPin(slug);
  if (!pin) notFound();

  const more = getMoreLikeThis(slug);

  return (
    <>
      <PinFrame>
        <PinDetail pin={pin} />
      </PinFrame>

      {more.length > 0 && (
        <section
          aria-labelledby="more-heading"
          className="mx-auto box-border w-full max-w-[1400px] px-4 pb-16"
        >
          <h2
            id="more-heading"
            className="m-0 mb-5 text-center text-[22px] font-bold"
          >
            More like this
          </h2>
          <Board pins={more} preloadCount={0} />
        </section>
      )}
    </>
  );
}

/** Back button beside the card on wide screens, above it on narrow ones. */
function PinFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto box-border flex w-full max-w-[1120px] flex-col gap-3 px-4 pt-2 pb-14 sm:px-5 lg:flex-row lg:items-start lg:gap-4 lg:pt-5">
      <Link
        href="/"
        aria-label="Back to the board"
        className="text-ink hover:bg-pill hover:text-ink flex size-12 flex-none items-center justify-center rounded-full"
      >
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </Link>
      {children}
    </div>
  );
}

/** Shown during client navigation while the pin streams in. */
function PinSkeleton() {
  const bar = "rounded-full bg-pill";
  return (
    <PinFrame>
      <div
        aria-hidden="true"
        className="rounded-card shadow-card grid min-w-0 flex-1 overflow-clip lg:grid-cols-2"
      >
        <div className="bg-panel aspect-[1/1.1]" />
        <div className="flex flex-col gap-4 px-5 pt-7 pb-9 sm:px-8">
          <div className={`${bar} ml-auto h-12 w-32`} />
          <div className={`${bar} h-4 w-40`} />
          <div className={`${bar} h-9 w-3/4`} />
          <div className={`${bar} h-4 w-full`} />
          <div className={`${bar} h-4 w-5/6`} />
        </div>
      </div>
    </PinFrame>
  );
}
