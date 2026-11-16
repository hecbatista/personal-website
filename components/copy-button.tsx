"use client";

import { useEffect, useRef, useState } from "react";

/** Copies text to the clipboard and shows "Copied" for a moment. */
export function useCopy(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return false;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), resetAfter);
    return true;
  }

  return { copied, copy };
}

export function CopyButton({
  value,
  label,
  className,
}: {
  value: string;
  /** What is being copied, for screen readers, e.g. "username". */
  label: string;
  className?: string;
}) {
  const { copied, copy } = useCopy();

  return (
    <>
      <button
        type="button"
        onClick={() => copy(value)}
        aria-label={`Copy ${label}`}
        className={className}
      >
        <span aria-hidden="true">{copied ? "Copied" : "Copy"}</span>
      </button>
      <span role="status" className="sr-only">
        {copied ? `Copied ${label}` : ""}
      </span>
    </>
  );
}
