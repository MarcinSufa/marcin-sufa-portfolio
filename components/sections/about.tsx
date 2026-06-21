import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { about, socials } from "@/lib/content";

const HANDLE = "@smolexander";

/** Splits the first paragraph around the @smolexander handle so it can be linked. */
function renderIntro(text: string) {
  const index = text.indexOf(HANDLE);
  if (index === -1) return text;
  const before = text.slice(0, index);
  const after = text.slice(index + HANDLE.length);
  return (
    <>
      {before}
      <a
        href={socials.x}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent no-underline"
      >
        {HANDLE}
      </a>
      {after}
    </>
  );
}

export function About() {
  return (
    <section id="about" className="border-t border-border bg-bg2">
      <div className="pad-x mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-center gap-12 px-10 py-20">
        <Reveal className="relative w-full">
          <div className="relative mx-auto aspect-square w-[360px] max-w-full overflow-hidden rounded-[18px] border border-border bg-surface">
            <Image
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={809}
              height={712}
              sizes="(max-width: 720px) 90vw, 360px"
              className="absolute inset-0 h-full w-full object-cover object-[66%_22%] grayscale contrast-[1.05]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, var(--portrait-overlay))",
              }}
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="font-mono text-[12px] font-semibold tracking-[0.18em] text-accent">
            06 — ABOUT
          </div>
          <h2 className="mt-3 font-display text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.03em]">
            {about.heading}
          </h2>
          {about.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className={`${i === 0 ? "mt-[18px]" : "mt-[14px]"} text-[16px] leading-[1.65] text-text2`}
            >
              {i === 0 ? renderIntro(paragraph) : paragraph}
            </p>
          ))}
          <div className="mt-[22px] flex flex-col gap-2 font-mono text-[13px] text-text2">
            {about.meta.map((item) => (
              <div key={item.label}>
                <span className="text-accent">{item.label}</span> → {item.value}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
