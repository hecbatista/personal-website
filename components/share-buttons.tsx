"use client";

import { useCopy } from "./copy-button";

const iconButton =
  "flex size-12 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-ink hover:bg-pill";

/**
 * Share uses the Web Share API where there is one and copies the link
 * otherwise. Copy link always copies, and both say "Copied" when they do.
 */
export function ShareButtons({ title }: { title: string }) {
  const { copied, copy } = useCopy();

  async function share() {
    const url = window.location.href;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
      } catch {
        // Dismissed by the visitor. Nothing to do.
      }
      return;
    }
    await copy(url);
  }

  return (
    <div className="relative flex items-center gap-1">
      <button
        type="button"
        onClick={share}
        aria-label="Share"
        className={iconButton}
      >
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 15V3" />
          <path d="M7 8l5-5 5 5" />
          <path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => copy(window.location.href)}
        aria-label="Copy link"
        className={iconButton}
      >
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
          <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
        </svg>
      </button>
      <span
        role="status"
        className={`text-muted pl-1 text-sm font-semibold transition-opacity ${copied ? "opacity-100" : "opacity-0"}`}
      >
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}
