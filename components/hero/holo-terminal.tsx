"use client";

import { useEffect, useRef, useState } from "react";
import { terminalColors, terminalScript } from "@/lib/content";
import { isSmallScreen } from "@/lib/browser";

const PROMPT = "$ ";
const MAX_LINES = 5;

interface Line {
  text: string;
  color: string;
}

/**
 * The holographic "NEURAL ORCHESTRATOR" console held in the hero
 * portrait's hands. Types out an orchestration session on a loop.
 * Ported from the design's `startTerminal`.
 */
export function HoloTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState(PROMPT);
  const [typingColor, setTypingColor] = useState<string>(terminalColors.cmd);
  const [cursorOn, setCursorOn] = useState(true);

  // Hold timers so we can clean them all up on unmount.
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const aliveRef = useRef(true);

  useEffect(() => {
    // Mobile: static snapshot, no typing/blink timers.
    if (isSmallScreen()) {
      setLines([
        { text: "$ orchestrate --plan", color: terminalColors.cmd },
        { text: "✓ gemini     reviewing", color: terminalColors.purple },
        { text: "✓ 214 passed", color: terminalColors.ok },
        { text: "✓ shipped to prod", color: terminalColors.ok },
      ]);
      setTyping("$ ");
      setTypingColor(terminalColors.cmd);
      setCursorOn(true);
      return;
    }

    aliveRef.current = true;
    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.current.push(id);
      return id;
    };

    const commit = (text: string, color: string) => {
      setLines((prev) => {
        const next = [...prev, { text, color }];
        while (next.length > MAX_LINES) next.shift();
        return next;
      });
      setTyping(PROMPT);
      setTypingColor(terminalColors.cmd);
    };

    let i = 0;
    const run = () => {
      if (!aliveRef.current) return;
      const step = terminalScript[i % terminalScript.length];
      i++;

      if ("cmd" in step) {
        const full = PROMPT + step.cmd;
        let k = PROMPT.length;
        setTyping(PROMPT);
        setTypingColor(terminalColors.cmd);

        const typeChar = () => {
          if (!aliveRef.current) return;
          k++;
          setTyping(full.slice(0, k));
          if (k < full.length) {
            schedule(typeChar, 48 + Math.random() * 52);
          } else {
            schedule(() => {
              commit(full, terminalColors.cmd);
              schedule(run, 300);
            }, 480);
          }
        };
        schedule(typeChar, 260);
      } else {
        schedule(() => {
          commit(step.out, step.color);
          schedule(run, 520);
        }, 230);
      }
    };

    run();
    const blink = setInterval(() => {
      if (aliveRef.current) setCursorOn((c) => !c);
    }, 520);

    return () => {
      aliveRef.current = false;
      timers.current.forEach(clearTimeout);
      timers.current = [];
      clearInterval(blink);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-[11px] border border-[rgba(108,180,238,0.42)] bg-[rgba(12,16,26,0.42)] shadow-[0_14px_34px_rgba(0,0,0,0.5)] backdrop-blur-[9px]"
    >
      <div className="pointer-events-none absolute bottom-0 top-0 w-[30%] animate-[scan_3.6s_linear_infinite] bg-gradient-to-r from-transparent via-[rgba(108,180,238,0.20)] to-transparent" />
      <div className="flex items-center justify-between border-b border-[rgba(108,180,238,0.22)] px-[10px] py-[7px] font-mono text-[7.5px] tracking-[0.14em] text-[#9fc6ea]">
        <span>NEURAL ORCHESTRATOR</span>
        <span className="text-[#4fd690]">●</span>
      </div>
      <div className="h-[82px] overflow-hidden px-[10px] pb-[9px] pt-[8px] font-mono text-[8px] leading-[1.75]">
        {lines.map((line, index) => (
          <div
            key={`${line.text}-${index}`}
            className="overflow-hidden whitespace-nowrap"
            style={{ color: line.color, textOverflow: "clip" }}
          >
            {line.text}
          </div>
        ))}
        <div className="whitespace-nowrap" style={{ color: typingColor }}>
          {typing}
          <span className="text-[#4fd690]">{cursorOn ? "█" : " "}</span>
        </div>
      </div>
    </div>
  );
}
