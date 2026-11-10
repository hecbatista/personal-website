"use client";

import { useEffect, useRef, useState } from "react";
import type { Pin } from "@/content/types";
import { estimateHeight } from "@/lib/pin-layout";
import { PinCard } from "./pin-card";

const MIN_COLUMN = 236;
const COLUMN_GAP = 16;
const ROW_GAP = 20;
/** Below this width the board is a single column. */
const TWO_COLUMN_MIN = 300;
/** The top row's images load eagerly. */
const PRELOAD_COUNT = 3;

function columnCount(width: number) {
  if (width < TWO_COLUMN_MIN) return 1;
  return Math.max(
    2,
    Math.floor((width + COLUMN_GAP) / (MIN_COLUMN + COLUMN_GAP)),
  );
}

/** Place each pin, in order, into the shortest column, so pin 1, 2, 3… fill the top row. */
function layout(pins: Pin[], width: number) {
  const count = columnCount(width);
  const columnWidth = (width - COLUMN_GAP * (count - 1)) / count;
  const heights = new Array<number>(count).fill(0);
  const columns = Array.from({ length: count }, () => [] as Pin[]);
  for (const pin of pins) {
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push(pin);
    heights[shortest] += estimateHeight(pin, columnWidth) + ROW_GAP;
  }
  return columns;
}

/**
 * Masonry board. The server renders a CSS-columns fallback; once the browser
 * knows the width, pins are laid out left to right by shortest column.
 */
export function Board({ pins }: { pins: Pin[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.round(entry.contentRect.width)),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const preload = new Set(pins.slice(0, PRELOAD_COUNT).map((p) => p.slug));

  return (
    <div ref={ref}>
      {width === null ? (
        <div data-masonry="pending" className="columns-[236px] gap-4">
          {pins.map((pin) => (
            <div key={pin.slug} className="mb-5 break-inside-avoid">
              <PinCard pin={pin} preload={preload.has(pin.slug)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-start gap-4">
          {layout(pins, width).map((column, i) => (
            <div key={i} className="flex min-w-0 flex-1 flex-col gap-5">
              {column.map((pin) => (
                <PinCard
                  key={pin.slug}
                  pin={pin}
                  preload={preload.has(pin.slug)}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
