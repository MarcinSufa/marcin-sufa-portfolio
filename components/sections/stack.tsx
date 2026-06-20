import { Reveal } from "@/components/ui/reveal";
import { stackGroups } from "@/lib/content";

export function Stack() {
  return (
    <section id="stack" className="pad-x mx-auto max-w-[1180px] px-10 py-20">
      <Reveal>
        <div className="font-mono text-[12px] font-semibold tracking-[0.18em] text-accent">
          05 — STACK
        </div>
        <h2 className="mb-[34px] mt-3 font-display text-[clamp(30px,3.4vw,44px)] font-bold tracking-[-0.03em]">
          Tools of the trade
        </h2>
      </Reveal>

      <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
        {stackGroups.map((group) => (
          <div key={group.label}>
            <div
              className={`mb-3 font-mono text-[11.5px] font-semibold tracking-[0.12em] ${
                group.accent ? "text-accent" : "text-text3"
              }`}
            >
              {group.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className={`rounded-[8px] px-3 py-[7px] font-mono text-[12.5px] ${
                    group.accent
                      ? "text-accent"
                      : "border border-border bg-surface text-text"
                  }`}
                  style={
                    group.accent
                      ? { background: "rgba(var(--accent-rgb), 0.13)" }
                      : undefined
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
