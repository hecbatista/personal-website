"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

const subscribe = () => () => {};

/**
 * mailto link whose address is joined in the browser, so it never appears in
 * the static HTML that scrapers read. Before hydration it links to #contact.
 */
export function EmailLink({
  className,
  children,
}: {
  className?: string;
  /** Link text. Defaults to the address itself. */
  children?: React.ReactNode;
}) {
  const address = useSyncExternalStore(
    subscribe,
    () => `${site.email.user}@${site.email.domain}`,
    () => null,
  );

  return (
    <a href={address ? `mailto:${address}` : "#contact"} className={className}>
      {children ?? address ?? "Email"}
    </a>
  );
}
