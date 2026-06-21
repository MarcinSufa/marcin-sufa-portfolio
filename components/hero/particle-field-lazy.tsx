"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Loads the three.js particle field only on the client, in its own chunk,
 * keeping three.js out of the initial/SSR bundle (it's purely decorative).
 */
const ParticleField = dynamic(
  () => import("@/components/hero/particle-field").then((m) => m.ParticleField),
  { ssr: false },
);

/**
 * Mounts the field only once the browser is idle (or after a short timeout),
 * so loading + initialising three.js doesn't compete with first paint /
 * interactivity (keeps Total Blocking Time low). The field then fades in.
 */
export function ParticleFieldLazy() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
    let id: number;
    if (w.requestIdleCallback) {
      id = w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    id = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return null;
  return (
    <div className="absolute inset-0 animate-[fieldIn_0.8s_ease] [animation-fill-mode:both]">
      <ParticleField />
    </div>
  );
}
