// One-off image optimizer: resizes the heavy design-source PNGs to right-sized
// WebP that ships in public/assets. Sources live in the gitignored design-v3/
// folder; the generated .webp files are committed. Run: `node scripts/optimize-images.mjs`
import sharp from "sharp";

const SRC = "design-v3/uploads";
const OUT = "public/assets";

const jobs = [
  // Hero LCP — two sizes for a responsive srcset (mobile + desktop@2x).
  { in: `${SRC}/marcin-agent-orchestrator.PNG`, out: `${OUT}/marcin-orchestrator-1160.webp`, w: 1160, q: 80 },
  { in: `${SRC}/marcin-agent-orchestrator.PNG`, out: `${OUT}/marcin-orchestrator-640.webp`, w: 640, q: 78 },
  // About portrait (square slot, object-cover).
  { in: `${SRC}/photo_file-1781603851818.png`, out: `${OUT}/marcin-portrait.webp`, w: 720, q: 78 },
  // Work screenshots.
  { in: `${SRC}/asistel-shot.png`, out: `${OUT}/asistel-shot.webp`, w: 1100, q: 80 },
  { in: `${SRC}/exovault-shot.png`, out: `${OUT}/exovault-shot.webp`, w: 1100, q: 80 },
  { in: `${SRC}/fractal-shot.png`, out: `${OUT}/fractal-shot.webp`, w: 1100, q: 80 },
];

for (const job of jobs) {
  const info = await sharp(job.in)
    .resize({ width: job.w, withoutEnlargement: true })
    .webp({ quality: job.q, effort: 6 })
    .toFile(job.out);
  console.log(`${job.out}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
}
