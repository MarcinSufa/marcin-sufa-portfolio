import { ParticleFieldLazy } from "@/components/hero/particle-field-lazy";
import { Constellation } from "@/components/hero/constellation";
import { StatsBar } from "@/components/hero/stats-bar";
import { hero, socials } from "@/lib/content";

export function Hero() {
  return (
    <section aria-label="Introduction" className="relative min-h-[660px] overflow-hidden">
      <ParticleFieldLazy />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 1.4px)",
          backgroundSize: "26px 26px",
          opacity: 0.22,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--bg) 0%, transparent 26%, transparent 60%, var(--bg) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[60px] -top-[140px] h-[520px] w-[520px] animate-[floatGlow_11s_ease-in-out_infinite] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(var(--accent-rgb),0.22), transparent 68%)",
        }}
      />

      <div className="pad-x relative mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] items-center gap-9 px-10 pb-2 pt-[60px]">
        <div>
          <div className="inline-flex items-center gap-[9px] rounded-full border border-border bg-surface px-3 py-[6px] font-mono text-[12px] text-accent">
            <span className="h-2 w-2 animate-[pulseDot_1.8s_ease-in-out_infinite] rounded-full bg-[#4fd690]" />
            {hero.badge}
          </div>
          <h1 className="mt-5 font-display text-[clamp(40px,5.2vw,72px)] font-bold leading-[0.98] tracking-[-0.035em] text-text">
            <span className="text-accent">{hero.headlineAccent}</span>
            <br />
            {hero.headlineRest}
          </h1>
          <p className="mt-6 max-w-[46ch] text-[clamp(15px,1.3vw,18px)] leading-[1.56] text-text2">
            {hero.subhead}
          </p>
          <div className="mt-[30px] flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-xl bg-accent px-[26px] py-[14px] font-display text-[15px] font-semibold text-ink no-underline transition-colors hover:bg-accent2"
            >
              View work →
            </a>
            <a
              href={socials.cv}
              download
              className="rounded-xl border border-border px-[26px] py-[14px] font-display text-[15px] font-semibold text-text no-underline transition-colors hover:border-accent"
            >
              Download CV
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-[22px] font-mono text-[13px] text-text3">
            <a
              href={socials.x}
              target="_blank"
              rel="noreferrer"
              className="no-underline transition-colors hover:text-accent"
            >
              ↗ @smolexander
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="no-underline transition-colors hover:text-accent"
            >
              ↗ github
            </a>
            <a
              href={socials.exovault}
              target="_blank"
              rel="noreferrer"
              className="no-underline transition-colors hover:text-accent"
            >
              ↗ exovault.co
            </a>
          </div>
        </div>

        <Constellation />
      </div>

      <StatsBar />
    </section>
  );
}
