import { Reveal } from "@/components/ui/reveal";
import { contact, socials } from "@/lib/content";
import { asset } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="pad-x mx-auto max-w-[1180px] px-10 py-[90px]">
      <Reveal className="mx-auto max-w-[640px] text-center">
        <div className="font-mono text-[12px] font-semibold tracking-[0.18em] text-accent">
          07 — CONTACT
        </div>
        <h2 className="mt-[14px] font-display text-[clamp(34px,4.6vw,60px)] font-bold leading-none tracking-[-0.035em]">
          {contact.heading[0]}
          <br />
          {contact.heading[1]}
        </h2>
        <p className="mt-5 text-[16.5px] leading-[1.6] text-text2">{contact.body}</p>
        <div className="mt-[30px] flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${socials.email}`}
            className="rounded-[12px] bg-accent px-[26px] py-[14px] font-display text-[15px] font-semibold text-ink no-underline transition-colors hover:bg-accent2"
          >
            {socials.email}
          </a>
          <a
            href={asset(socials.cv)}
            download
            className="rounded-[12px] border border-border px-[26px] py-[14px] font-display text-[15px] font-semibold text-text no-underline transition-colors hover:border-accent"
          >
            Download CV ↓
          </a>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-[22px] font-mono text-[13px] text-text3">
          <a
            href={socials.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit no-underline transition-colors hover:text-accent"
          >
            ↗ @smolexander
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit no-underline transition-colors hover:text-accent"
          >
            ↗ github.com/MarcinSufa
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit no-underline transition-colors hover:text-accent"
          >
            ↗ linkedin
          </a>
        </div>
      </Reveal>
    </section>
  );
}
