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
    <>
      <div
        ref={ref}
        className="font-display text-[38px] font-bold tracking-[-0.02em] text-accent"
      >
        {display}
      </div>
      <div className="mt-[2px] font-mono text-[11.5px] text-text3">
        {stat.label}
      </div>
    </>
  );
}

export function StatsBar() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  // Track which stat is centered while swiping (mobile carousel).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = el.clientWidth || 1;
        const i = Math.round(el.scrollLeft / w);
        setActive((prev) => (prev !== i ? i : prev));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({
      left: i * el.clientWidth,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    setActive(i);
  };

  return (
    <div className="relative border-y border-border bg-bg2">
      <div
        ref={trackRef}
        className="pad-x mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[22px] px-10 py-[26px] max-[720px]:flex max-[720px]:snap-x max-[720px]:snap-mandatory max-[720px]:gap-0 max-[720px]:overflow-x-auto max-[720px]:[scrollbar-width:none] max-[720px]:[&::-webkit-scrollbar]:hidden"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="max-[720px]:flex-[0_0_100%] max-[720px]:snap-center max-[720px]:text-center"
          >
            <CountUp stat={stat} />
          </div>
        ))}
      </div>

      <div className="hidden justify-center gap-[9px] pb-[18px] max-[720px]:flex">
        {stats.map((stat, i) => (
          <button
            key={stat.label}
            type="button"
            aria-label={`Show stat ${i + 1}`}
            aria-current={active === i}
            onClick={() => goTo(i)}
            className="h-2 w-2 rounded-full p-0 transition-[background-color,transform] duration-200"
            style={{
              backgroundColor: active === i ? "var(--accent)" : "var(--border)",
              transform: active === i ? "scale(1.35)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
