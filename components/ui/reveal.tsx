"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Render as a different element (default: div). */
  as?: ElementType;
  className?: string;
  /** Optional stagger before the element animates in (ms). */
  delay?: number;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Fades + lifts its children into view once on first intersection.
 * Mirrors the design's `data-reveal` behaviour. Falls back to visible
 * when IntersectionObserver is unavailable or reduced-motion is set.
 */
export function Reveal({
  children,
  as,
  className = "",
  delay = 0,
  id,
  style,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </Tag>
  );
}
