import type { Demo } from "@/content/types";
import { CopyButton } from "./copy-button";
import { pill } from "./pill";

function host(url: string) {
  return new URL(url).host.replace(/^www\./, "");
}

/** "Try the demo" panel: live link, demo-account credentials, things to try. */
export function DemoPanel({ demo }: { demo: Demo }) {
  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="bg-panel rounded-panel flex scroll-mt-4 flex-col gap-3.5 p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <h2
          id="demo-heading"
          className="m-0 text-xl font-extrabold tracking-[-0.01em]"
        >
          Try the demo
        </h2>
        <a
          href={demo.url}
          target="_blank"
          rel="noopener"
          className={`${pill.dark} h-11 px-[18px]`}
        >
          Open live demo ↗
        </a>
      </div>
      <p className="text-body m-0 text-sm">
        {host(demo.url)} · Demo account with sample data, so nothing touches
        real members.
      </p>
      {!!demo.credentials?.length && (
        <dl className="m-0 flex flex-col gap-2">
          {demo.credentials.map((credential) => (
            <div
              key={credential.label}
              className="flex items-center gap-2.5 rounded-[14px] bg-white py-1.5 pr-1.5 pl-3.5"
            >
              <dt className="text-muted w-[72px] flex-none text-[13px]">
                {credential.label}
              </dt>
              <dd className="m-0 min-w-0 flex-1 truncate text-[15px] font-semibold">
                {credential.value}
              </dd>
              <CopyButton
                value={credential.value}
                label={credential.label.toLowerCase()}
                className="bg-pill text-ink min-h-11 flex-none cursor-pointer rounded-full border-0 px-3.5 text-sm font-semibold hover:bg-[#E3E3E3]"
              />
            </div>
          ))}
        </dl>
      )}
      {!!demo.thingsToTry?.length && (
        <div>
          <h3 className="m-0 mb-1.5 text-sm font-bold">Things to try</h3>
          <ol className="text-body m-0 flex list-decimal flex-col gap-1 pl-5 text-sm">
            {demo.thingsToTry.map((thing) => (
              <li key={thing}>{thing}</li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
