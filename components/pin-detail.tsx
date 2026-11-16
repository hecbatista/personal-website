import Image from "next/image";
import type { ImagePin, Pin, TextPin, WriteUp } from "@/content/types";
import { site } from "@/content/site";
import { stackIcons } from "@/lib/stack-icons";
import { DemoPanel } from "./demo-panel";
import { EmailLink } from "./email-link";
import { MediaCarousel } from "./media-carousel";
import { pill } from "./pill";
import { ShareButtons } from "./share-buttons";

/** The large rounded card at the top of a pin page. */
export function PinDetail({ pin }: { pin: Pin }) {
  return pin.kind === "text" ? (
    <TextPinDetail pin={pin} />
  ) : (
    <ImagePinDetail pin={pin} />
  );
}

const card = "rounded-card shadow-card min-w-0 flex-1 overflow-clip bg-surface";

function ImagePinDetail({ pin }: { pin: ImagePin }) {
  const media = pin.media ?? [];
  const primary = pin.links?.find((link) => link.primary);
  const secondary = pin.links?.filter((link) => !link.primary) ?? [];
  const cta = primary ?? (pin.demo && { label: "Try the demo", href: "#demo" });

  const badge = (pin.badge || pin.draft) && (
    <div className="pointer-events-none absolute top-4 left-4 z-10 flex gap-2">
      {pin.badge && (
        <span className="bg-accent rounded-full px-3 py-1.5 text-[13px] font-bold text-white">
          {pin.badge}
        </span>
      )}
      {pin.draft && <DraftChip />}
    </div>
  );

  return (
    // On wide screens the card is capped at the viewport height: the media
    // fills the left half and the details scroll inside the right half.
    <article
      className={`${card} flex flex-col lg:max-h-[max(560px,calc(100dvh-7.5rem))] lg:flex-row`}
    >
      <div className="lg:w-1/2 lg:flex-none">
        {media.length ? (
          <MediaCarousel
            media={media}
            title={pin.title}
            preload
            className="lg:h-full"
          >
            {badge}
          </MediaCarousel>
        ) : (
          <div className="bg-panel text-muted relative flex aspect-[1/1.1] items-center justify-center p-6 text-center text-sm lg:h-full">
            Needs an image
            {badge}
          </div>
        )}
      </div>

      <div className="flex min-w-0 [scrollbar-width:thin] flex-col gap-5 px-5 pb-8 sm:px-8 sm:pb-9 lg:w-1/2 lg:flex-none lg:overflow-y-auto lg:overscroll-contain">
        {/* Share, copy link and the primary link stay in view while the details scroll. */}
        <div className="bg-surface z-10 flex flex-wrap items-center justify-between gap-3 pt-5 sm:pt-7 lg:sticky lg:top-0 lg:pb-2">
          <ShareButtons title={pin.title} />
          {cta && <LinkPill link={cta} className={pill.accent} />}
        </div>

        <div className="flex flex-col gap-2">
          {pin.context && <Context pin={pin} />}
          <h1 className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.03em] [font-variation-settings:'opsz'_96] sm:text-4xl">
            {pin.title}
          </h1>
          <p className="text-body m-0 text-[17px]">
            {pin.description ?? pin.caption}
          </p>
        </div>

        {secondary.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {secondary.map((link) => (
              <LinkPill
                key={link.href}
                link={link}
                className={`${pill.grey} h-11`}
              />
            ))}
          </div>
        )}

        <CreatorRow role={pin.role} />

        {!!pin.stack?.length && (
          <ul
            aria-label="Built with"
            className="m-0 flex list-none flex-wrap gap-2 p-0"
          >
            {pin.stack.map((item) => (
              <li
                key={item}
                className="bg-panel text-chip-text inline-flex items-center gap-1.5 rounded-full px-[13px] py-[7px] text-[13px] font-semibold"
              >
                {stackIcons[item] && (
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="flex-none"
                  >
                    <path d={stackIcons[item]} />
                  </svg>
                )}
                {item}
              </li>
            ))}
          </ul>
        )}

        {pin.demo && <DemoPanel demo={pin.demo} />}

        {pin.writeUp && <WriteUpSections writeUp={pin.writeUp} />}
      </div>
    </article>
  );
}

/** Text pins have no media, so the page is the accent block, larger. */
function TextPinDetail({ pin }: { pin: TextPin }) {
  return (
    <article className={`${card} flex flex-col`}>
      <div className="bg-accent relative flex flex-col gap-4 px-6 py-10 text-white sm:px-12 sm:py-16">
        <p className="m-0 text-sm font-bold opacity-90">{pin.caption}</p>
        <h1 className="m-0 max-w-[18ch] text-[36px] leading-[1.05] font-extrabold tracking-[-0.03em] [font-variation-settings:'opsz'_96] sm:text-[52px]">
          {pin.title}
        </h1>
        <p className="m-0 max-w-[46ch] text-lg leading-snug">{pin.body}</p>
        {pin.draft && (
          <div className="absolute top-4 right-4">
            <DraftChip />
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <CreatorRow />
        <ShareButtons title={pin.title} />
      </div>
    </article>
  );
}

function LinkPill({
  link,
  className,
}: {
  link: { label: string; href: string };
  className: string;
}) {
  const external = /^https?:\/\//.test(link.href);
  return (
    <a
      href={link.href}
      className={className}
      {...(external && { target: "_blank", rel: "noopener" })}
    >
      {link.label}
    </a>
  );
}

const host = (href: string) => {
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return null;
  }
};

/** Small line above the title. A bare domain that matches one of the pin's links becomes that link. */
function Context({ pin }: { pin: ImagePin }) {
  const link = pin.links?.find((l) => host(l.href) === pin.context);
  return link ? (
    <a
      href={link.href}
      target="_blank"
      rel="noopener"
      className="text-ink hover:text-accent w-fit text-sm underline"
    >
      {pin.context}
    </a>
  ) : (
    <p className="text-muted m-0 text-sm">{pin.context}</p>
  );
}

function CreatorRow({ role }: { role?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="bg-accent size-12 flex-none rounded-full p-[3px]">
          <div className="size-full overflow-hidden rounded-full border-2 border-white bg-[#DCE5F3]">
            {site.headshot && (
              <Image
                src={site.headshot}
                alt=""
                width={84}
                height={84}
                className="size-full object-cover"
              />
            )}
          </div>
        </div>
        <div>
          <p className="m-0 font-bold">{site.name}</p>
          {role && <p className="text-muted m-0 text-[13px]">{role}</p>}
        </div>
      </div>
      <EmailLink className={`${pill.grey} h-11 px-[18px]`}>
        Get in touch
      </EmailLink>
    </div>
  );
}

function WriteUpSections({ writeUp }: { writeUp: WriteUp }) {
  const sections = [
    ["The problem", writeUp.problem],
    [writeUp.builtLabel ?? "What I built", writeUp.built],
    ["Decisions I made", writeUp.decisions],
    ["Result", writeUp.result],
    ["What’s next", writeUp.next],
  ].filter((section): section is [string, string] => !!section[1]);

  if (!sections.length) return null;

  return (
    <div className="border-divider flex flex-col gap-[18px] border-t pt-5">
      {sections.map(([heading, text]) => (
        <section key={heading}>
          <h2 className="m-0 mb-1 text-lg font-bold">{heading}</h2>
          <p className="text-body m-0">{text}</p>
        </section>
      ))}
    </div>
  );
}

/** Preview-only marker, same as on the board. */
function DraftChip() {
  return (
    <span className="rounded-full bg-[#FFE7A3] px-2.5 py-1.5 text-[13px] font-bold text-[#5C4300]">
      Draft
    </span>
  );
}
