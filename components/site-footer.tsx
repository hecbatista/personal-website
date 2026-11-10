import { site } from "@/content/site";
import { EmailLink } from "./email-link";
import { pill } from "./pill";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="bg-footer flex flex-col items-center gap-3.5 px-5 pt-12 pb-18 text-center"
    >
      <p className="m-0 text-3xl font-extrabold tracking-[-0.02em]">
        That’s the board.
      </p>
      <p className="text-muted m-0">{site.availability}</p>
      <div className="flex flex-wrap justify-center gap-2.5">
        <EmailLink className={pill.accent} />
        {site.linkedin && (
          <a href={site.linkedin} className={pill.footer}>
            LinkedIn
          </a>
        )}
        {site.github && (
          <a href={site.github} className={pill.footer}>
            GitHub
          </a>
        )}
        {site.resume && (
          <a href={site.resume} className={pill.footer}>
            Resume (PDF)
          </a>
        )}
      </div>
    </footer>
  );
}
