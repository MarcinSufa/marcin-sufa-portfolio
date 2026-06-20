"use client";

import dynamic from "next/dynamic";

/**
 * Loads the three.js particle field only on the client, in its own chunk,
 * keeping three.js out of the initial/SSR bundle (it's purely decorative).
 */
export const ParticleFieldLazy = dynamic(
  () => import("@/components/hero/particle-field").then((m) => m.ParticleField),
  { ssr: false },
);
