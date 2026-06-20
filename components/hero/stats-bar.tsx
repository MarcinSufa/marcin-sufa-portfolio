"use client";

import { useEffect, useRef, useState } from "react";
import { stats, type Stat } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/browser";

function format(value: number, stat: Stat): string {
  const base =
    stat.fmt === "M"
      ? `${(value / 1e6).toFixed(1).replace(/\.0$/, "")}M`
      : Math.round(value).toString();
  return base + (stat.suffix ?? "");
}

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(() => format(stat.count, stat));

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (prefersReducedMotion()) {
            setDisplay(format(stat.count, stat));
            return;
          }
          const duration = 1100;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(format(stat.count * eased, stat));
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stat]);

  return (
    <div>
      <div
        ref={ref}
        className="font-display text-[38px] font-bold tracking-[-0.02em] text-accent"
      >
        {display}
      </div>
      <div className="mt-[2px] font-mono text-[11.5px] text-text3">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsBar() {
  return (
    <div className="relative border-y border-border bg-bg2">
      <div className="pad-x mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[22px] px-10 py-[26px]">
        {stats.map((stat) => (
          <CountUp key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  );
}
