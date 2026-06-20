import { Reveal } from "@/components/ui/reveal";
import { experience, education, languages, focus } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="pad-x mx-auto max-w-[1180px] px-10 pb-5 pt-20">
      <Reveal>
        <div className="font-mono text-[12px] font-semibold tracking-[0.18em] text-accent">
          01 — EXPERIENCE
        </div>
        <h2 className="mt-3 font-display text-[clamp(30px,3.4vw,44px)] font-bold tracking-[-0.03em]">
          7+ years shipping frontend
        </h2>
        <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.6] text-text2">
          From web-builder internals to fintech back-offices to a senior role
          building design systems for industrial software.
        </p>
      </Reveal>

      <Reveal className="relative mt-[38px] pl-7">
        <div className="absolute left-[5px] bottom-[6px] top-[6px] w-px bg-border" />

        {experience.map((entry, i) => {
          const isLast = i === experience.length - 1;
          return (
            <div key={entry.company} className={`relative ${isLast ? "" : "pb-[30px]"}`}>
              {entry.current ? (
                <span
                  className="absolute -left-7 top-[5px] h-[11px] w-[11px] rounded-full bg-accent"
                  style={{ boxShadow: "0 0 0 4px var(--bg)" }}
                />
              ) : (
                <span className="absolute -left-7 top-[5px] h-[11px] w-[11px] rounded-full border-2 border-border bg-surface2" />
              )}
              <div className="flex flex-wrap items-baseline gap-[10px]">
                <h3 className="font-display text-[21px] font-bold tracking-[-0.01em]">
                  {entry.role}
                </h3>
                <span className="font-mono text-[13px] text-accent">{entry.company}</span>
                <span className="ml-auto font-mono text-[12px] text-text3">{entry.period}</span>
              </div>
              <p className="mt-[10px] max-w-[66ch] text-[14.5px] leading-[1.6] text-text2">
                {entry.summary}
              </p>
              <div className="mt-3 flex max-w-[66ch] flex-col gap-[6px]">
                {entry.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex gap-[10px] text-[13.5px] leading-[1.55] text-text2"
                  >
                    <span className="flex-none text-accent">—</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
              <div className="mt-[14px] flex flex-wrap gap-[7px]">
                {entry.techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-[6px] border border-border bg-surface px-[10px] py-[5px] font-mono text-[11px] text-text2"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </Reveal>

      <Reveal className="mt-[46px] grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-[14px]">
        <div className="rounded-[14px] border border-border bg-surface p-6">
          <div className="font-mono text-[11px] font-semibold tracking-[0.16em] text-accent">
            EDUCATION &amp; CERTS
          </div>
          <div className="mt-4 flex flex-col gap-[14px]">
            {education.map((edu) => (
              <div key={edu.title}>
                <div className="font-display text-[15px] font-semibold">{edu.title}</div>
                <div className="mt-[2px] text-[13px] text-text2">{edu.org}</div>
                <div className="mt-[3px] font-mono text-[11.5px] text-text3">{edu.period}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[14px] border border-border bg-surface p-6">
          <div className="font-mono text-[11px] font-semibold tracking-[0.16em] text-accent">
            LANGUAGES
          </div>
          <div className="mt-4 flex flex-col gap-[14px]">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-baseline justify-between gap-[10px]"
              >
                <span className="font-display text-[15px] font-semibold">{lang.name}</span>
                <span className="font-mono text-[12px] text-accent">{lang.level}</span>
              </div>
            ))}
          </div>
          <div className="mt-[26px] font-mono text-[11px] font-semibold tracking-[0.16em] text-accent">
            FOCUS
          </div>
          <div className="mt-[14px] flex flex-wrap gap-[7px]">
            {focus.map((item) => (
              <span
                key={item}
                className="rounded-[6px] border border-border bg-bg2 px-[10px] py-[5px] font-mono text-[11px] text-text2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
