import { Reveal } from "@/components/ui/reveal";
import {
  loopIntro,
  loopPhases,
  loopUnit,
  loopConstants,
  fleetModels,
  loopFlow,
} from "@/lib/content";

export function Loop() {
  return (
    <section id="fleet" className="pad-x mx-auto max-w-[1180px] px-10 pb-5 pt-20">
      <Reveal>
        <div className="font-mono text-[12px] font-semibold tracking-[0.18em] text-accent">
          04 — THE LOOP
        </div>
        <h2 className="mt-3 font-display text-[clamp(30px,3.4vw,44px)] font-bold tracking-[-0.03em]">
          {loopIntro.heading}
        </h2>
        <p className="mt-3 max-w-[66ch] text-[15px] leading-[1.6] text-text2">
          I don&apos;t run a straight assembly line. One unit —{" "}
          <span className="text-text">
            propose → cross-review with a different model → refine
          </span>{" "}
          — repeats at every scale. The spec is reviewed before any code is
          written, every diff is reviewed by a model that didn&apos;t write it,
          and nothing reaches <span className="text-accent">main</span> until the
          tests are green and I&apos;ve merged it myself. Self-similar,
          observable, test-driven.
        </p>
      </Reveal>

      <Reveal className="mt-[34px] grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] items-center gap-[34px]">
        {/* LEFT: the fractal loop diagram */}
        <div
          className="relative mx-auto aspect-square w-full max-w-[600px] overflow-hidden rounded-[22px] border border-border"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, var(--surface) 0%, var(--bg2) 78%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "radial-gradient(var(--border) 1px, transparent 1.4px)",
              backgroundSize: "24px 24px",
            }}
          />

          <svg
            viewBox="0 0 600 600"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <g
              style={{
                transformOrigin: "300px 300px",
                animation: "spinSlow 60s linear infinite",
              }}
            >
              <circle
                cx="300"
                cy="300"
                r="160"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="2 7"
              />
            </g>
            <g
              style={{
                transformOrigin: "300px 300px",
                animation: "spinRev 46s linear infinite",
              }}
            >
              <circle
                cx="300"
                cy="300"
                r="112"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="2 7"
              />
            </g>
            <g
              style={{
                transformOrigin: "300px 300px",
                animation: "spinSlow 32s linear infinite",
              }}
            >
              <circle
                cx="300"
                cy="300"
                r="66"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="2 7"
              />
            </g>
            <circle
              cx="300"
              cy="300"
              r="215"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeOpacity="0.55"
              strokeDasharray="5 9"
              style={{ animation: "ringdash 9s linear infinite" }}
            />
            <circle r="4.5" fill="var(--accent)">
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                path="M300,85 a215,215 0 1,1 0,430 a215,215 0 1,1 0,-430"
              />
            </circle>
            <circle r="3" fill="var(--accent2)">
              <animateMotion
                dur="7s"
                begin="-2.3s"
                repeatCount="indefinite"
                path="M300,85 a215,215 0 1,1 0,430 a215,215 0 1,1 0,-430"
              />
            </circle>
            <circle r="3" fill="var(--accent2)">
              <animateMotion
                dur="7s"
                begin="-4.6s"
                repeatCount="indefinite"
                path="M300,85 a215,215 0 1,1 0,430 a215,215 0 1,1 0,-430"
              />
            </circle>
          </svg>

          {/* center core */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-[3] flex h-[134px] w-[134px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-border bg-bg2 text-center"
            style={{
              boxShadow:
                "0 0 0 8px rgba(255,138,92,0.05), 0 14px 30px var(--shadow)",
            }}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.4"
            >
              <circle cx="17" cy="17" r="14" />
              <circle cx="17" cy="17" r="8.5" />
              <circle cx="17" cy="17" r="3.4" fill="var(--accent)" stroke="none" />
            </svg>
            <div className="mt-2 font-mono text-[9px] tracking-[0.14em] text-accent">
              SELF-SIMILAR
            </div>
            <div className="mt-[3px] font-mono text-[8px] tracking-[0.04em] text-text3">
              every stage = the loop
            </div>
          </div>

          {/* phase chips */}
          {loopPhases.map((p) =>
            p.review ? (
              <div
                key={p.n}
                className="absolute z-[4] w-[150px] -translate-x-1/2 -translate-y-1/2"
                style={{ left: p.left, top: p.top }}
              >
                <div
                  className="rounded-[12px] border border-accent bg-surface2 px-3 pb-[11px] pt-[10px]"
                  style={{ boxShadow: "0 10px 26px var(--shadow)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-semibold text-accent">
                      {p.n}
                    </span>
                    <span className="font-display text-[14px] font-semibold tracking-[-0.01em] text-text">
                      {p.label}
                    </span>
                  </div>
                  <div className="mt-[5px] font-mono text-[9.5px] leading-[1.45] text-text2">
                    {p.sub}
                  </div>
                  <div className="mt-[7px] inline-flex items-center gap-[5px] font-mono text-[8px] tracking-[0.1em] text-accent">
                    <span className="h-[5px] w-[5px] rounded-full bg-accent" />
                    CROSS-MODEL
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={p.n}
                className="absolute z-[4] w-[150px] -translate-x-1/2 -translate-y-1/2"
                style={{ left: p.left, top: p.top }}
              >
                <div
                  className="rounded-[12px] border border-border bg-surface px-3 pb-[11px] pt-[10px]"
                  style={{ boxShadow: "0 10px 24px var(--shadow)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-semibold text-accent">
                      {p.n}
                    </span>
                    <span className="font-display text-[14px] font-semibold tracking-[-0.01em] text-text">
                      {p.label}
                    </span>
                  </div>
                  <div className="mt-[5px] font-mono text-[9.5px] leading-[1.45] text-text3">
                    {p.sub}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        {/* RIGHT: explanation */}
        <div className="flex flex-col gap-[26px]">
          {/* the repeating unit */}
          <div>
            <div className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text3">
              THE UNIT THAT REPEATS
            </div>
            <div className="mt-[14px] flex items-stretch gap-[9px]">
              {loopUnit.map((u, i) => (
                <div key={u.label} className="contents">
                  {i > 0 && (
                    <div className="flex items-center text-[16px] text-accent">
                      →
                    </div>
                  )}
                  <div
                    className={`flex-1 rounded-[11px] border px-[10px] py-[13px] text-center ${
                      u.highlight
                        ? "border-accent bg-surface2"
                        : "border-border bg-surface"
                    }`}
                  >
                    <div className="font-display text-[14px] font-bold text-text">
                      {u.label}
                    </div>
                    <div
                      className={`mt-1 font-mono text-[9px] ${
                        u.highlight ? "text-accent" : "text-text3"
                      }`}
                    >
                      {u.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[13px] leading-[1.55] text-text2">
              This triad runs inside <span className="text-text">every</span>{" "}
              stage of the loop — that&apos;s what makes it fractal. The spec gets
              it before any code exists; the diff gets it before it merges.
            </p>
          </div>

          {/* constants */}
          <div>
            <div className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text3">
              CONSTANT AT EVERY SCALE
            </div>
            <div className="loop-cols mt-[13px] grid grid-cols-2 gap-2">
              {loopConstants.map((c) => (
                <div
                  key={c.title}
                  className="flex items-start gap-[9px] rounded-[10px] border border-border bg-surface px-3 py-[11px]"
                >
                  <span className="mt-[5px] h-[7px] w-[7px] flex-none rounded-full bg-accent" />
                  <div>
                    <div className="font-display text-[13px] font-semibold text-text">
                      {c.title}
                    </div>
                    <div className="mt-[2px] font-mono text-[9px] text-text3">
                      {c.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* fleet */}
          <div>
            <div className="font-mono text-[11px] font-semibold tracking-[0.16em] text-text3">
              THE FLEET — WHO REVIEWS WHOM
            </div>
            <div className="mt-[13px] flex flex-col gap-[7px]">
              {fleetModels.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center gap-3 rounded-[10px] border border-border bg-surface px-[14px] py-[9px]"
                >
                  <span className="min-w-[76px] font-display text-[13.5px] font-bold text-text">
                    {m.name}
                  </span>
                  <span className="min-w-[62px] font-mono text-[8.5px] tracking-[0.08em] text-text3">
                    {m.vendor}
                  </span>
                  <span className="text-[12px] leading-[1.4] text-text2">
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-[18px] max-w-[80ch] font-mono text-[11.5px] text-text3">
        <span className="text-accent">flow ↻</span> {loopFlow}
      </Reveal>
    </section>
  );
}
