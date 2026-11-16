"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Media } from "@/content/types";

/** The frame never gets wider than 5:4 or taller than 10:13, whatever the media. */
const MIN_RATIO = 0.8;
const MAX_RATIO = 1.3;
const SIZES = "(min-width: 1024px) 560px, 100vw";

/**
 * Frame height ÷ width. It fits the tallest item, so switching slides never
 * changes the layout: every item fits inside the same frame.
 */
export function frameRatio(media: Media[]) {
  const tallest = Math.max(...media.map((item) => item.height / item.width));
  return Math.min(MAX_RATIO, Math.max(MIN_RATIO, tallest));
}

/** Sized box for one item: as large as fits the frame, at the item's own aspect ratio. */
function fit(item: Media): React.CSSProperties {
  return {
    aspectRatio: `${item.width} / ${item.height}`,
    width: `min(100cqw, 100cqh * ${(item.width / item.height).toFixed(4)})`,
  };
}

function withAutoplay(embedUrl: string) {
  const url = new URL(embedUrl);
  url.searchParams.set("autoplay", "1");
  return url.toString();
}

const arrowButton =
  "absolute top-1/2 z-10 -mt-[22px] flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white text-ink shadow-[0_1px_6px_rgba(17,17,17,0.18)] hover:bg-pill";

/**
 * Media carousel for the pin detail page. Slides sit in a horizontal
 * scroll-snap track, so phones can swipe; prev/next buttons, dots and the
 * arrow keys move between them. A video, if any, is the first slide and shows
 * its poster until the visitor presses play.
 */
export function MediaCarousel({
  media,
  title,
  preload,
  className = "",
  children,
}: {
  media: Media[];
  /** Pin title, for the carousel's accessible name. */
  title: string;
  /** Preload the first slide (it is the page's largest image). */
  preload?: boolean;
  /** Extra classes for the frame, e.g. to fill a fixed-height column. */
  className?: string;
  /** Overlays on the frame, e.g. the status badge. */
  children?: React.ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const shown = useRef(0);
  const count = media.length;
  const several = count > 1;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const next = Math.min(
        count - 1,
        Math.max(0, Math.round(el.scrollLeft / el.clientWidth)),
      );
      if (next === shown.current) return;
      shown.current = next;
      setIndex(next);
      // Leaving the video slide stops the video.
      setPlaying(false);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count]);

  function go(to: number) {
    const el = track.current;
    if (!el) return;
    const target = (to + count) % count;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    el.scrollTo({
      left: target * el.clientWidth,
      behavior: reduce.matches ? "instant" : "smooth",
    });
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (!several) return;
    if (event.key === "ArrowLeft") go(index - 1);
    else if (event.key === "ArrowRight") go(index + 1);
    else return;
    event.preventDefault();
  }

  const noun = media.every((item) => item.type === "image") ? "image" : "slide";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${title}, media`}
      onKeyDown={onKeyDown}
      className={`bg-panel relative w-full ${className}`}
      style={{ aspectRatio: `1 / ${frameRatio(media)}` }}
    >
      <div
        ref={track}
        className="flex size-full snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overscroll-x-contain [&::-webkit-scrollbar]:hidden"
      >
        {media.map((item, i) => (
          <div
            key={item.type === "image" ? item.src : item.embedUrl}
            role={several ? "group" : undefined}
            aria-roledescription={several ? "slide" : undefined}
            aria-label={several ? `${i + 1} of ${count}` : undefined}
            inert={i !== index}
            className="relative h-full w-full flex-none snap-center snap-always"
          >
            <div className="[container-type:size] absolute inset-x-5 top-16 bottom-14 flex items-center justify-center sm:inset-x-10">
              {item.type === "image" ? (
                <div
                  className="relative overflow-hidden rounded-xl bg-white shadow-[0_2px_14px_rgba(17,17,17,0.14)]"
                  style={fit(item)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={SIZES}
                    preload={preload && i === 0}
                    loading={preload && i === 0 ? undefined : "eager"}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="relative overflow-hidden rounded-xl bg-black shadow-[0_2px_14px_rgba(17,17,17,0.14)]"
                  style={fit(item)}
                >
                  {playing && i === index ? (
                    <iframe
                      src={withAutoplay(item.embedUrl)}
                      title={item.title}
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      className="absolute inset-0 size-full border-0"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      aria-label={`Play video: ${item.title}${item.length ? `, ${item.length}` : ""}`}
                      className="group absolute inset-0 cursor-pointer border-0 bg-transparent p-0"
                    >
                      <Image
                        src={item.poster}
                        alt=""
                        fill
                        sizes={SIZES}
                        preload={preload && i === 0}
                        className="object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-[rgba(17,17,17,0.25)] group-hover:bg-[rgba(17,17,17,0.35)]">
                        <span className="flex size-[76px] items-center justify-center rounded-full bg-white">
                          <svg
                            aria-hidden="true"
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 4.5l12 7.5-12 7.5z" fill="#111111" />
                          </svg>
                        </span>
                      </span>
                      {item.length && (
                        <span className="absolute right-3 bottom-3 rounded-full bg-[rgba(17,17,17,0.8)] px-2.5 py-1 text-[13px] font-bold text-white">
                          {item.length}
                        </span>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {children}

      {several && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={`Previous ${noun}`}
            className={`${arrowButton} left-3.5`}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={`Next ${noun}`}
            className={`${arrowButton} right-3.5`}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute inset-x-0 bottom-1.5 flex justify-center">
            {media.map((item, i) => (
              <button
                key={item.type === "image" ? item.src : item.embedUrl}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${noun} ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
                className="group flex size-11 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
              >
                <span
                  className={`block size-2 rounded-full transition-colors ${i === index ? "bg-ink" : "bg-[rgba(17,17,17,0.28)] group-hover:bg-[rgba(17,17,17,0.5)]"}`}
                />
              </button>
            ))}
          </div>
          <p aria-live="polite" className="sr-only">
            {`${noun === "image" ? "Image" : "Slide"} ${index + 1} of ${count}`}
          </p>
        </>
      )}
    </section>
  );
}
