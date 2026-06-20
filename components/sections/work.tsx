"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { projects, ossTools, socials } from "@/lib/content";

export function Work() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <section id="work" className="pad-x mx-auto max-w-[1180px] px-10 pb-5 pt-20">
      <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <div className="font-mono text-[12px] font-semibold tracking-[0.18em] text-accent">
            02 — SELECTED WORK
          </div>
          <h2 className="mt-3 font-display text-[clamp(30px,3.4vw,44px)] font-bold tracking-[-0.03em]">
            Projects I&apos;ve designed &amp; built
          </h2>
          <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.6] text-text2">
            AI products, full web apps and open-source tooling — a selection of what
            I&apos;ve shipped, on the side and at work.
          </p>
        </div>
        <a
          href={socials.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[12.5px] text-text2 no-underline transition-colors hover:text-accent"
        >
          all on github ↗
        </a>
      </Reveal>

      <Reveal className="mt-8">
        <div className="flex flex-wrap gap-2">
          {projects.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`rounded-[10px] border px-[18px] py-[10px] font-mono text-[12.5px] font-semibold transition-colors ${
                  isActive
                    ? "border-accent bg-accent text-ink"
                    : "border-border bg-surface text-text2 hover:border-accent"
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        <div className="mt-4 overflow-hidden rounded-[18px] border border-border bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(330px,1fr))]">
            <div className="relative border-b border-border bg-surface2 p-[22px] md:border-b-0 md:border-r">
              <div className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-[12px] border border-border bg-bg2">
                {project.screenshot ? (
                  // eslint-disable-next-line @next/next/no-img-element -- animated GIF preview; next/image would freeze it
                  <img
                    src={project.screenshot}
                    alt={`${project.title} preview`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 px-6 text-center">
                    <span className="font-display text-[28px] font-bold tracking-[-0.02em] text-text">
                      {project.screenshotPlaceholder}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.14em] text-text3">
                      SCREENSHOT COMING SOON
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="px-10 py-[38px]">
              <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-accent">
                {project.badge}
              </span>
              <h3 className="mt-3 font-display text-[30px] font-bold tracking-[-0.02em]">
                {project.title}
              </h3>
              <div className="mt-[5px] text-[15px] text-text2">{project.tagline}</div>
              <p className="mt-[18px] max-w-[54ch] text-[15px] leading-[1.65] text-text2">
                {project.desc}
              </p>
              <div className="mb-[11px] mt-[26px] font-mono text-[11px] font-semibold tracking-[0.14em] text-text3">
                TECHNOLOGIES
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-surface2 px-[13px] py-[6px] font-mono text-[11.5px] text-text2"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-7">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-[10px] bg-accent px-[22px] py-3 font-display text-[14px] font-semibold text-ink no-underline transition-colors hover:bg-accent2"
                  >
                    {project.linkLabel}
                  </a>
                ) : (
                  <span className="inline-block rounded-[10px] border border-dashed border-border px-[18px] py-[11px] font-mono text-[12.5px] text-text3">
                    {project.linkLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-[34px]">
        <div className="font-mono text-[12px] font-semibold tracking-[0.16em] text-text3">
          OPEN-SOURCE · CLAUDE CODE TOOLING
        </div>
        <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(258px,100%),1fr))] gap-3">
          {ossTools.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noreferrer"
              className="block rounded-[12px] border border-border bg-surface px-5 py-[18px] no-underline transition-[transform,border-color] duration-200 hover:-translate-y-[3px] hover:border-accent"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="font-mono text-[14px] font-semibold text-text">
                  {tool.name}
                </div>
                <span className="font-mono text-[12px] text-accent">↗</span>
              </div>
              <div className="mt-[6px] text-[12.5px] leading-[1.55] text-text2">
                {tool.desc}
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
