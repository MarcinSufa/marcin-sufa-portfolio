"use client";

import { useEffect, useRef } from "react";
import { agentChips, hero } from "@/lib/content";
import { HoloTerminal } from "@/components/hero/holo-terminal";
import { clampDpr, watchVisibility } from "@/lib/browser";

const HANDS_Y = 0.9;
const SPLIT = 0.42; // u below this draws in FRONT (over the chest), rest BEHIND
const STEPS = 96;
const DOT_EVERY = 2;

interface Strand {
  c1x: number;
  c1y: number;
  c2x: number;
  c2y: number;
  amp: number;
  freq: number;
  phase: number;
  speed: number;
}

interface Stream {
  target: { x: number; y: number };
  src: { x: number; y: number };
  strand: Strand;
  col: [number, number, number];
  pulse: number;
}

function bezier(p0: number, c1: number, c2: number, p1: number, u: number): number {
  const v = 1 - u;
  return v * v * v * p0 + 3 * v * v * u * c1 + 3 * v * u * u * c2 + u * u * u * p1;
}

/**
 * The hero "agent orchestrator" scene: the portrait stands in the
 * field while glowing ribbon streams flow from its hands out to each
 * agent chip, splitting across two canvases so they pass in front of
 * and behind the figure. Ported from the design's `initRibbons`.
 */
export function Constellation() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLCanvasElement | null>(null);
  const frontRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const back = backRef.current;
    const front = frontRef.current;
    if (!host || !back || !front) return;

    const targets = agentChips.map((c) => ({
      x: parseFloat(c.left) / 100,
      y: parseFloat(c.top) / 100,
      col: c.rgb,
    }));

    const streams: Stream[] = targets.map((t, si) => {
      const src = { x: 0.5 + (t.x - 0.5) * 0.2, y: HANDS_Y };
      const dx = t.x - src.x;
      const dy = t.y - src.y;
      const side = t.x < 0.5 ? -1 : 1;
      const spread = side * 0.11;
      return {
        target: { x: t.x, y: t.y },
        src,
        col: t.col,
        pulse: si * 0.7,
        strand: {
          c1x: src.x + dx * 0.35 + spread,
          c1y: src.y + dy * 0.35 - 0.1,
          c2x: src.x + dx * 0.72 + spread * 0.5,
          c2y: src.y + dy * 0.72,
          amp: 0.006,
          freq: 5,
          phase: si * 1.7,
          speed: 0.8,
        },
      };
    });

    const mouse = { x: -9, y: -9, on: false };
    const onMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
      mouse.on = true;
    };
    const onLeave = () => {
      mouse.on = false;
    };
    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);

    let raf = 0;
    let t = 0;
    let last = 0;
    let intro = 0;
    let running = false;

    const draw = (ts: number) => {
      if (running) raf = requestAnimationFrame(draw);
      if (ts - last < 33) return;
      last = ts;
      t += 0.03;
      if (intro < 1) intro += 0.012;
      const ease = intro >= 1 ? 1 : 1 - Math.pow(1 - intro, 3);

      const dpr = clampDpr();
      const W = host.clientWidth;
      const H = host.clientHeight;
      for (const cv of [back, front]) {
        if (cv.width !== Math.round(W * dpr)) {
          cv.width = Math.round(W * dpr);
          cv.height = Math.round(H * dpr);
        }
      }
      const bctx = back.getContext("2d");
      const fctx = front.getContext("2d");
      if (!bctx || !fctx) return;
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, W, H);
      fctx.clearRect(0, 0, W, H);
      bctx.globalCompositeOperation = "lighter";
      fctx.globalCompositeOperation = "lighter";

      const { x: mx, y: my, on: mon } = mouse;

      for (const st of streams) {
        const dx = st.target.x - st.src.x;
        const dy = st.target.y - st.src.y;
        const dl = Math.hypot(dx, dy) || 1;
        const nx = -dy / dl;
        const ny = dx / dl;
        const pulsePos = (t * 0.16 + st.pulse) % 1;
        const [cr, cg, cb] = st.col;
        const hoverNear = mon
          ? Math.exp(-((st.target.x - mx) ** 2 + (st.target.y - my) ** 2) / 0.05)
          : 0;
        const sd = st.strand;

        for (let i = 0; i <= STEPS; i++) {
          if (i % DOT_EVERY !== 0) continue;
          const u = i / STEPS;
          if (u > ease * 1.05) break;
          let bx = bezier(st.src.x, sd.c1x, sd.c2x, st.target.x, u);
          let by = bezier(st.src.y, sd.c1y, sd.c2y, st.target.y, u);
          const taper = Math.sin(Math.PI * Math.min(1, u));
          const w = Math.sin(u * sd.freq - t * sd.speed * 2 + sd.phase) * sd.amp * taper;
          bx += nx * w;
          by += ny * w;

          const flow = 0.5 + 0.5 * Math.sin(u * 26 - t * 4 + st.pulse * 6);
          const dpu = Math.abs(u - pulsePos);
          const pulse = Math.exp(-(dpu * dpu) / 0.0009) * 1.3;
          let bright = 0.26 + 0.42 * flow + pulse + hoverNear * 1.2;
          bright = Math.min(1.7, bright);

          const px = bx * W;
          const py = by * H;
          const ctx = u < SPLIT ? fctx : bctx;

          ctx.fillStyle = `rgba(${cr},${cg},${cb},${(0.05 * bright).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, 4.0, 0, 6.283);
          ctx.fill();

          const a2 = Math.min(0.95, 0.14 + 0.55 * bright);
          ctx.fillStyle = `rgba(${Math.min(255, cr + 30)},${Math.min(255, cg + 26)},${Math.min(255, cb + 26)},${a2.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, 6.283);
          ctx.fill();
        }

        if (ease > 0.85) {
          const tipx = st.target.x * W;
          const tipy = st.target.y * H;
          const tg = bctx.createRadialGradient(tipx, tipy, 0, tipx, tipy, 12);
          tg.addColorStop(0, `rgba(${cr},${cg},${cb},0.5)`);
          tg.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
          bctx.fillStyle = tg;
          bctx.beginPath();
          bctx.arc(tipx, tipy, 12, 0, 6.283);
          bctx.fill();
        }
      }

      // warm glow across the hands/console (front)
      const ox = 0.5 * W;
      const oy = HANDS_Y * H;
      const g = fctx.createRadialGradient(ox, oy, 0, ox, oy, 70);
      g.addColorStop(0, `rgba(255,185,135,${(0.3 * ease).toFixed(3)})`);
      g.addColorStop(1, "rgba(255,185,135,0)");
      fctx.fillStyle = g;
      fctx.beginPath();
      fctx.ellipse(ox, oy, 90, 50, 0, 0, 6.283);
      fctx.fill();
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    // Always animate (decorative), but only while the hero is on screen.
    const stopVisibility = watchVisibility(host, (visible) =>
      visible ? start() : stop(),
    );

    return () => {
      stop();
      stopVisibility();
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative mx-auto w-full max-w-[580px]"
      style={{ aspectRatio: "560 / 600" }}
    >
      <canvas
        ref={backRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      />

      <div className="pointer-events-none absolute bottom-0 left-1/2 z-[2] w-[96%] -translate-x-1/2">
        <div
          className="absolute left-1/2 top-[42%] aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 blur-[30px]"
          style={{
            background:
              "radial-gradient(circle, rgba(var(--accent-rgb),0.20), transparent 62%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- responsive srcset on a static export; next/image can't optimize on GitHub Pages */}
        <img
          src={hero.portrait.src}
          srcSet={`${hero.portrait.srcSmall} 640w, ${hero.portrait.src} 1160w`}
          sizes="(max-width: 720px) 90vw, 560px"
          alt={hero.portrait.alt}
          width={hero.portrait.width}
          height={hero.portrait.height}
          fetchPriority="high"
          decoding="async"
          className="relative block w-full"
          style={{ filter: "var(--portrait-shadow)" }}
        />
      </div>

      <canvas
        ref={frontRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
      />

      <div className="absolute left-1/2 top-[88%] z-[4] w-[176px] -translate-x-1/2 -translate-y-1/2 max-[720px]:scale-[0.66]">
        <HoloTerminal />
      </div>

      {agentChips.map((chip) => (
        <div
          key={chip.name}
          className="absolute z-[5] -translate-x-1/2 -translate-y-1/2 max-[720px]:scale-[0.72]"
          style={{
            left: chip.left,
            top: chip.top,
            animation: `nodefloat ${chip.duration} ease-in-out infinite`,
            animationDelay: chip.delay,
          }}
        >
          <div className="flex items-center gap-2 rounded-full border border-[color:var(--chip-border)] bg-[var(--chip-bg)] py-[7px] pl-2 pr-[13px] shadow-[var(--chip-shadow)] backdrop-blur-[8px]">
            <span
              className="flex h-[26px] w-[26px] items-center justify-center rounded-full font-display text-[12px] font-bold"
              style={{
                background: `rgba(${chip.rgb.join(",")},0.18)`,
                color: `rgb(${chip.rgb.join(",")})`,
              }}
            >
              {chip.glyph}
            </span>
            <span className="font-display text-[13px] font-semibold text-text">
              {chip.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
