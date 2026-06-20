import { Reveal } from "@/components/ui/reveal";
import {
  philosophyIntro,
  rules,
  ruleAside,
  principlesIntro,
  principles,
} from "@/lib/content";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="mt-20 border-y border-border bg-bg2"
    >
      <div className="pad-x mx-auto max-w-[1180px] px-10 py-20">
        <Reveal>
          <div className="font-mono text-[12px] font-semibold tracking-[0.18em] text-accent">
            03 — HOW I WORK
          </div>
          <h2 className="mt-3 max-w-[22ch] font-display text-[clamp(30px,3.4vw,44px)] font-bold tracking-[-0.03em]">
            {philosophyIntro.heading}
          </h2>
          <p className="mt-[18px] max-w-[58ch] text-[16px] leading-[1.6] text-text2">
            {philosophyIntro.body}
          </p>
        </Reveal>

        <Reveal className="mt-[38px] grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[14px]">
          {rules.map((rule) => (
            <div
              key={rule.n}
              className="flex gap-4 rounded-[14px] border border-border bg-surface p-[22px] transition-[transform,border-color] duration-200 hover:-translate-y-[3px] hover:border-accent"
            >
              <span className="font-display text-[24px] font-bold leading-none text-accent">
                {rule.n}
              </span>
              <div>
                <div className="font-display text-[16px] font-semibold">
                  {rule.title}
                </div>
                <div className="mt-1 text-[13.5px] leading-[1.5] text-text2">
                  {rule.sub}
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4 rounded-[14px] border border-dashed border-border bg-transparent p-[22px]">
            <div className="font-mono text-[12.5px] leading-[1.7] text-text2">
              {ruleAside.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-[44px]">
          <div className="font-mono text-[12px] font-semibold tracking-[0.16em] text-accent">
            PRINCIPLES I BUILD ON
          </div>
          <p className="mt-[10px] max-w-[58ch] text-[15px] leading-[1.6] text-text2">
            {principlesIntro}
          </p>
          <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-3">
            {principles.map((principle) => (
              <div
                key={principle.name}
                className="rounded-[14px] border border-border bg-surface p-5 transition-[transform,border-color] duration-200 hover:-translate-y-[3px] hover:border-accent"
              >
                <div className="font-display text-[17px] font-bold tracking-[-0.01em]">
                  {principle.name}
                </div>
                <div className="mt-[6px] text-[13.5px] leading-[1.5] text-text2">
                  {principle.desc}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
