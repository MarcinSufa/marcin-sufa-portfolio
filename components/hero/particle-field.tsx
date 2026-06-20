"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/theme-provider";
import { clampDpr, prefersReducedMotion, watchVisibility } from "@/lib/browser";

const DARK_BASE: [number, number, number] = [1.0, 0.54, 0.36];
const LIGHT_BASE: [number, number, number] = [0.82, 0.36, 0.22];

/**
 * Animated 3D heightfield of points behind the hero — a warm "neural
 * field" that ripples toward the cursor. Ported from the design's
 * `initThree`. Pauses while scrolled off-screen, and renders a single
 * static frame (repainted on resize/theme) when reduced motion is set.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  // Keep the latest theme available to the animation loop without re-running it.
  const themeRef = useRef(theme);
  const materialRef = useRef<THREE.PointsMaterial | null>(null);
  const baseRef = useRef<[number, number, number]>(DARK_BASE);
  // Lets the theme effect repaint the static frame for reduced-motion users.
  const repaintStaticRef = useRef<(() => void) | null>(null);

  // React to theme changes: recolor + reblend the existing field.
  useEffect(() => {
    themeRef.current = theme;
    const dark = theme === "dark";
    baseRef.current = dark ? DARK_BASE : LIGHT_BASE;
    const mat = materialRef.current;
    if (mat) {
      mat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      mat.opacity = dark ? 0.95 : 0.62;
      mat.needsUpdate = true;
    }
    // Reduced-motion users get no animation frame, so repaint now to recolor.
    if (prefersReducedMotion()) repaintStaticRef.current?.();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const reduced = prefersReducedMotion();

    let width = host.clientWidth;
    let height = host.clientHeight;
    if (width === 0 || height === 0) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(clampDpr());
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(62, width / height, 0.1, 1000);
    camera.position.set(0, 11, 23);
    camera.lookAt(0, -1, -4);

    const GX = 120;
    const GZ = 72;
    const sx = 0.62;
    const sz = 0.62;
    const count = GX * GZ;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    let idx = 0;
    for (let z = 0; z < GZ; z++) {
      for (let x = 0; x < GX; x++) {
        positions[idx * 3] = (x - GX / 2) * sx;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = (z - GZ / 2) * sz;
        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const dark = themeRef.current === "dark";
    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: dark ? 0.95 : 0.62,
      blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (event: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };
    host.addEventListener("mousemove", onMouseMove);

    const posArr = geometry.attributes.position.array as Float32Array;
    const colArr = geometry.attributes.color.array as Float32Array;

    const renderStaticFrame = () => {
      const b = baseRef.current;
      let k = 0;
      for (let z = 0; z < GZ; z++) {
        for (let x = 0; x < GX; x++) {
          const px = (x - GX / 2) * sx;
          const pz = (z - GZ / 2) * sz;
          const hh = Math.sin(px * 0.32) * 0.85 + Math.cos(pz * 0.42) * 0.85;
          posArr[k * 3 + 1] = hh;
          let inten = 0.32 + (hh + 1.7) / 3.6;
          inten = Math.max(0.12, Math.min(1.25, inten));
          colArr[k * 3] = b[0] * inten;
          colArr[k * 3 + 1] = b[1] * inten;
          colArr[k * 3 + 2] = b[2] * inten;
          k++;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
      renderer.render(scene, camera);
    };
    repaintStaticRef.current = renderStaticFrame;

    const onResize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (reduced) renderStaticFrame();
    };
    window.addEventListener("resize", onResize);
    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(onResize) : null;
    resizeObserver?.observe(host);

    let raf = 0;
    let t = 0;
    let last = 0;
    let sizedOnce = false;
    let running = false;

    const animate = (ts: number) => {
      if (!running) return;
      raf = requestAnimationFrame(animate);
      if (!sizedOnce) {
        sizedOnce = true;
        onResize();
      }
      if (ts - last < 33) return;
      last = ts;
      t += 0.028;

      const mx = mouse.x * GX * sx * 0.5;
      const mz = -mouse.y * GZ * sz * 0.5;
      const b = baseRef.current;
      let k = 0;
      for (let z = 0; z < GZ; z++) {
        for (let x = 0; x < GX; x++) {
          const px = (x - GX / 2) * sx;
          const pz = (z - GZ / 2) * sz;
          let hh =
            Math.sin(px * 0.32 + t * 1.1) * 0.85 +
            Math.cos(pz * 0.42 - t * 0.85) * 0.85;
          const dm = Math.hypot(px - mx, pz - mz);
          hh += Math.sin(dm * 0.6 - t * 3.0) * Math.exp(-dm * 0.13) * 2.0;
          posArr[k * 3 + 1] = hh;
          let inten = 0.32 + (hh + 1.7) / 3.6 + Math.exp(-dm * 0.18) * 0.5;
          inten = Math.max(0.12, Math.min(1.25, inten));
          colArr[k * 3] = b[0] * inten;
          colArr[k * 3 + 1] = b[1] * inten;
          colArr[k * 3 + 2] = b[2] * inten;
          k++;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
      points.rotation.y = mouse.x * 0.16;
      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(animate);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    let stopVisibility = () => {};
    if (reduced) {
      onResize();
      renderStaticFrame();
    } else {
      // Only animate while the hero is on screen.
      stopVisibility = watchVisibility(host, (visible) =>
        visible ? start() : stop(),
      );
    }

    return () => {
      stop();
      stopVisibility();
      host.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      materialRef.current = null;
      repaintStaticRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
