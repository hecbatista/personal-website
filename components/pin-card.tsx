import Image from "next/image";
import Link from "next/link";
import type { ImagePin, Pin, TextPin } from "@/content/types";
import { thumbRatio } from "@/lib/pin-layout";

export function PinCard({ pin, preload }: { pin: Pin; preload?: boolean }) {
  return pin.kind === "text" ? (
    <TextPinCard pin={pin} />
  ) : (
    <ImagePinCard pin={pin} preload={preload} />
  );
}

function ImagePinCard({ pin, preload }: { pin: ImagePin; preload?: boolean }) {
  const first = pin.media?.[0];
  const thumb =
    first?.type === "image"
      ? { src: first.src, alt: first.alt }
      : first?.type === "video"
        ? { src: first.poster, alt: `${first.title}, video thumbnail` }
        : null;

  return (
    <Link
      href={`/pins/${pin.slug}`}
      className="group text-ink hover:text-ink block no-underline"
    >
      <div
        className="rounded-pin relative overflow-hidden bg-[#DCE5F3]"
        style={{ aspectRatio: `1 / ${thumbRatio(pin)}` }}
      >
        {thumb ? (
          <Image
            src={thumb.src}
            alt={thumb.alt}
            fill
            sizes="(max-width: 600px) 50vw, 300px"
            preload={preload}
            className="object-cover transition-[filter] group-hover:brightness-90"
          />
        ) : (
          <div className="text-muted flex size-full items-center justify-center p-4 text-center text-[13px]">
            Needs an image
          </div>
        )}
        {pin.badge && (
          <span className="bg-accent absolute top-3 left-3 rounded-full px-3 py-1.5 text-[13px] font-bold text-white">
            {pin.badge}
          </span>
        )}
        {pin.draft && <DraftChip />}
        {first?.type === "video" && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[rgba(17,17,17,0.8)] py-1.5 pr-3 pl-2.5 text-[13px] font-bold text-white">
            <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24">
              <path d="M7 4l13 8-13 8z" fill="currentColor" />
            </svg>
            Demo video
          </span>
        )}
      </div>
      <div className="px-1 pt-2">
        <p className="m-0 text-[15px] leading-tight font-bold">{pin.title}</p>
        <p className="text-muted m-0 mt-0.5 text-[13px]">{pin.caption}</p>
      </div>
    </Link>
  );
}

function TextPinCard({ pin }: { pin: TextPin }) {
  return (
    <div className="rounded-pin bg-accent relative flex flex-col gap-3 px-[22px] py-[26px] text-white">
      <p className="m-0 text-[13px] font-bold opacity-90">{pin.caption}</p>
      <p className="m-0 text-[22px] leading-[1.12] font-bold tracking-[-0.02em] [font-variation-settings:'opsz'_72] sm:text-[26px]">
        {pin.title}
      </p>
      <p className="m-0 text-sm leading-snug">{pin.body}</p>
      {pin.draft && <DraftChip />}
    </div>
  );
}

/** Preview-only marker. Bottom-right so it never collides with the status badge. */
function DraftChip() {
  return (
    <span className="absolute right-3 bottom-3 rounded-full bg-[#FFE7A3] px-2.5 py-1 text-xs font-bold text-[#5C4300]">
      Draft
    </span>
  );
}
