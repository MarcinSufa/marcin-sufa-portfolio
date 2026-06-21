/**
 * Single source of truth for all portfolio content.
 * Extracted 1:1 from the approved Claude design
 * ("Marcin Sufa - Portfolio.dc.html"). UI components must read from here —
 * no copy in markup, so copy never drifts.
 */

/* ----------------------------------------------------------------
 * Navigation
 * ---------------------------------------------------------------- */
export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "#experience", label: "experience" },
  { href: "#work", label: "work" },
  { href: "#philosophy", label: "philosophy" },
  { href: "#fleet", label: "fleet" },
  { href: "#about", label: "about" },
];

/* ----------------------------------------------------------------
 * Social / external links (reused across hero + contact + footer)
 * ---------------------------------------------------------------- */
export const socials = {
  x: "https://x.com/smolexander",
  github: "https://github.com/MarcinSufa",
  exovault: "https://exovault.co",
  linkedin: "https://www.linkedin.com/in/marcin-sufa-05711492/",
  email: "sufa.marcin@gmail.com",
  cv: "/assets/Marcin_Sufa_CV.pdf",
} as const;

/* ----------------------------------------------------------------
 * Hero
 * ---------------------------------------------------------------- */
export const hero = {
  badge: "SENIOR FRONTEND @ SYSDYNE",
  headlineAccent: "AI-native",
  headlineRest: "frontend engineer.",
  subhead:
    "Senior frontend engineer and indie builder. I take products from first pixel to production — and orchestrate a fleet of AI agents to ship at the pace of a whole team.",
  portrait: {
    src: "/assets/marcin-orchestrator.png",
    alt: "Marcin Sufa — agent orchestrator",
  },
} as const;

export interface Stat {
  count: number;
  /** "M" formats the count as millions (1000000 -> "1M"). */
  fmt?: "M";
  suffix?: string;
  label: string;
}

export const stats: Stat[] = [
  { count: 7, suffix: "+", label: "YEARS FRONTEND" },
  { count: 6, suffix: "", label: "OPEN-SOURCE AI TOOLS" },
  { count: 1_000_000, fmt: "M", suffix: "+", label: "LINES SHIPPED THIS YEAR" },
];

/* ----------------------------------------------------------------
 * Hero orchestrator constellation — agent chips
 * Positions are percentages within the constellation box, matching
 * the design. `tone` colors drive both the chip avatar and the
 * ribbon stream that connects to it.
 * ---------------------------------------------------------------- */
export interface AgentChip {
  name: string;
  glyph: string;
  /** rgb triplet for the avatar + ribbon stream */
  rgb: [number, number, number];
  left: string;
  top: string;
  /** float animation duration + delay for subtle desync */
  duration: string;
  delay: string;
}

export const agentChips: AgentChip[] = [
  { name: "Claude", glyph: "A\\", rgb: [255, 138, 92], left: "17%", top: "29.2%", duration: "7s", delay: "0s" },
  { name: "Codex", glyph: "{ }", rgb: [79, 214, 160], left: "60.7%", top: "18.3%", duration: "7.6s", delay: "-1.5s" },
  { name: "Composer", glyph: "◈", rgb: [244, 114, 182], left: "85.7%", top: "41.7%", duration: "8.1s", delay: "-2.4s" },
  { name: "DeepSeek", glyph: "DS", rgb: [108, 180, 238], left: "76.8%", top: "71.7%", duration: "7.9s", delay: "-3.2s" },
  { name: "Gemini", glyph: "✦", rgb: [167, 139, 250], left: "14.3%", top: "63.3%", duration: "8.4s", delay: "-1.1s" },
];

/* Holographic terminal sequence shown in the hero console. */
export const terminalColors = {
  cmd: "#cfe9ff",
  ok: "#4fd690",
  warn: "#ffcf8a",
  info: "#6cb4ee",
  purple: "#a78bfa",
  orange: "#ff8a5c",
  pink: "#f472b6",
  dim: "#5f7488",
} as const;

export type TerminalStep =
  | { cmd: string }
  | { out: string; color: string };

export const terminalScript: TerminalStep[] = [
  { cmd: "orchestrate --plan" },
  { out: "› claude     planning", color: terminalColors.orange },
  { out: "› codex      planning", color: terminalColors.orange },
  { cmd: "fleet review" },
  { out: "✓ gemini     reviewing", color: terminalColors.purple },
  { out: "✓ composer   reviewing", color: terminalColors.purple },
  { cmd: "run --build" },
  { out: "› codex      working", color: terminalColors.info },
  { out: "› deepseek   developing", color: terminalColors.info },
  { cmd: "check --all" },
  { out: "› tests      checking", color: terminalColors.warn },
  { out: "✓ 214 passed", color: terminalColors.ok },
  { cmd: "merge --main" },
  { out: "✓ shipped to prod", color: terminalColors.ok },
];

/* ----------------------------------------------------------------
 * Marquee
 * ---------------------------------------------------------------- */
export const marqueeItems: string[] = [
  "TypeScript",
  "Vue 3",
  "React",
  "Next.js",
  "Claude Code",
  "MCP",
  "Multi-agent",
  "Strict TDD",
  "Prisma",
  "Tailwind",
  "ElevenLabs",
  "Ports & Adapters",
];

/* ----------------------------------------------------------------
 * 01 — Experience
 * ---------------------------------------------------------------- */
export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  summary: string;
  bullets: string[];
  techs: string[];
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    role: "Senior Frontend Developer",
    company: "Sysdyne / Coldrun",
    period: "07.2024 — Present",
    summary: "Building an end-to-end system for the ready-mix concrete industry.",
    bullets: [
      "Architecting and owning a Tailwind + PrimeVue design system of shared components.",
      "Establishing a clean, maintainable frontend architecture across the platform.",
      "Building in-house POC solutions for data- and chart-heavy UI/UX apps.",
    ],
    techs: ["Vue 3", "Vite", "Pinia", "PrimeVue", "Design system"],
    current: true,
  },
  {
    role: "Frontend Developer",
    company: "myTU · fintech",
    period: "03.2022 — 07.2024",
    summary: "Built a back-office web app for a fintech startup.",
    bullets: [
      "Complex, data-dense UIs with heavy logic and live data.",
      "Data visualisation and charting with Chart.js and ApexCharts.",
      "Rapid web-app prototyping to validate product directions.",
    ],
    techs: ["Vue", "Nuxt", "TypeScript", "Tailwind", "Chart.js"],
  },
  {
    role: "Frontend Developer",
    company: "Ingersoll Rand",
    period: "03.2021 — 03.2022",
    summary: "Developed and maintained UI for a global industrial brand.",
    bullets: [
      "Bringing concepts to life with HTML, JavaScript, Vue and Sass/CSS.",
      "Working day-to-day in an Agile / Scrum environment.",
      "Core Web Vitals and SEO optimisation.",
    ],
    techs: ["React", "Vuex", "ASP.NET", "Webpack", "Jest"],
  },
  {
    role: "Frontend Developer",
    company: "Webwave",
    period: "07.2020 — 03.2021",
    summary: "Built features inside a website-builder / creator interface.",
    bullets: [
      "ES6 / jQuery and Vue on the front, Java / Grails on the back.",
      "Working across a large, complex production codebase.",
      "Shipping new features and fixing bugs throughout the codebase.",
    ],
    techs: ["Vue", "ES6", "jQuery", "Java / Grails"],
  },
  {
    role: "Frontend Developer",
    company: "Employer Branding Institute",
    period: "07.2019 — 07.2020",
    summary: "Designed UI/UX and brought mockups to life.",
    bullets: [
      "Designing UI/UX of web applications end to end.",
      "Building responsive, usable websites and apps from HTML, Sass and JS.",
      "Developing applications and features deployed to the live site.",
    ],
    techs: ["React", "Vue", "Angular 7", "TypeScript", "WordPress"],
  },
];

export interface EducationEntry {
  title: string;
  org: string;
  period: string;
}

export const education: EducationEntry[] = [
  { title: "IT Project Management", org: "Leon Koźmiński Academy · PMBOK, Scrum", period: "2014 — 2015" },
  { title: "PRINCE2 Foundation", org: "APMG certificate", period: "2015" },
  { title: "LCCI English — B2", org: "London Chamber of Commerce", period: "2008" },
];

export const languages: { name: string; level: string }[] = [
  { name: "English", level: "C1" },
  { name: "Polish", level: "Native" },
];

export const focus: string[] = ["Web development", "UI/UX design", "Analytics"];

/* ----------------------------------------------------------------
 * 02 — Selected work (tabbed showcase)
 * `screenshot` is null when no shot exists yet (renders a placeholder).
 * ---------------------------------------------------------------- */
export interface Project {
  name: string;
  badge: string;
  title: string;
  tagline: string;
  desc: string;
  techs: string[];
  link?: string;
  linkLabel: string;
  screenshot?: string;
  screenshotPlaceholder: string;
}

export const projects: Project[] = [
  {
    name: "ExoVault",
    badge: "MCP SERVER · AGENT MEMORY",
    title: "ExoVault",
    tagline: "Durable, encrypted memory for AI agents",
    desc: "Encrypted notes and durable cross-session memory for AI agents, exposed as an MCP server. Semantic search and knowledge-graph recall — give your agent a brain that persists between sessions.",
    techs: ["MCP", "TypeScript", "Semantic search", "Encryption"],
    link: "https://exovault.co",
    linkLabel: "Visit exovault.co ↗",
    screenshot: "/assets/exovault-shot.png",
    screenshotPlaceholder: "ExoVault",
  },
  {
    name: "Fractal",
    badge: "ELECTRON · ORCHESTRATION COCKPIT",
    title: "Fractal",
    tagline: "A control room for your agent fleet",
    desc: "A multi-agent cockpit: launch agents into isolated git worktrees, watch them work in live terminal panes, and gate their specs before they run. The control room for an agent fleet.",
    techs: ["Electron", "Multi-agent", "Git worktrees"],
    linkLabel: "Private — in development",
    screenshot: "/assets/fractal-shot.png",
    screenshotPlaceholder: "Fractal",
  },
  {
    name: "Asistel",
    badge: "AI VOICE AGENT · SAAS",
    title: "Asistel",
    tagline: "AI phone assistant for pharmacies",
    desc: "An AI phone assistant for pharmacies. Callers ask about drug availability, make reservations and request callbacks — it transcribes, routes and follows up automatically. Multi-tenant SaaS with a live pilot, auto-deployed to production.",
    techs: ["Next.js", "Prisma", "PostgreSQL", "ElevenLabs", "Coolify"],
    link: "https://asistel.pl",
    linkLabel: "Visit asistel.pl ↗",
    screenshot: "/assets/asistel-shot.png",
    screenshotPlaceholder: "Asistel",
  },
  {
    name: "Dodomarket",
    badge: "WEB APP · MARKETPLACE",
    title: "Dodomarket.pl",
    tagline: "Marketplace for grocery stores",
    desc: "A marketplace for grocery stores — a full application serving customers, store owners and delivery users. Browse shops, order groceries and manage fulfilment end-to-end.",
    techs: ["Gatsby", "React", "Styled-Components", "Netlify", "Laravel"],
    link: "https://flamboyant-nobel-fee89b.netlify.app/",
    linkLabel: "View live demo ↗",
    screenshot: "https://media.giphy.com/media/ZG5sqH0WMHJ7pRglEJ/giphy.gif",
    screenshotPlaceholder: "Dodomarket",
  },
  {
    name: "Domocni",
    badge: "STARTUP · MARKETPLACE",
    title: "Domocni.pl",
    tagline: "Uber for household services",
    desc: "My startup — an on-demand marketplace for household services (chimney sweeps, gas technicians, electricians). I built the app and graphics, designed the UI, ran real-time appointment booking and led the marketing.",
    techs: ["WordPress", "WooCommerce", "Google API", "Dotpay API"],
    link: "https://domocni.pl",
    linkLabel: "Visit domocni.pl ↗",
    screenshot: "https://media.giphy.com/media/pjYPqkoZJM4CZGxkvf/giphy.gif",
    screenshotPlaceholder: "Domocni",
  },
  {
    name: "CircleK",
    badge: "WEB APP · JOB PORTAL",
    title: "Praca CircleK.pl",
    tagline: "Job site for Circle K Poland",
    desc: "The careers site for Circle K in Poland. I reworked the layout, added animations, connected it to the CMS and built a job-search map with offers integrated with eRecruiter.",
    techs: ["Vue", "WordPress (CMS)", "ACF", "HTML", "Sass", "JavaScript", "jQuery", "Google Maps API"],
    link: "https://praca.circlek.pl",
    linkLabel: "Visit praca.circlek.pl ↗",
    screenshot: "https://media.giphy.com/media/RNbErxcO8DBGor6Pmy/giphy.gif",
    screenshotPlaceholder: "Praca CircleK",
  },
];

/* Open-source Claude Code tooling */
export interface OssTool {
  name: string;
  desc: string;
  href: string;
}

export const ossTools: OssTool[] = [
  {
    name: "claude-watch-video",
    desc: "Make Claude watch any video — local file, public URL (yt-dlp) or Jira attachment. Frames + Whisper transcription into a paste-ready evidence bundle.",
    href: "https://github.com/MarcinSufa/claude-watch-video",
  },
  {
    name: "claude-demo-video",
    desc: "Turn a Claude Code session into a narrated demo video — automated capture and walkthrough of what was just built.",
    href: "https://github.com/MarcinSufa/claude-demo-video",
  },
  {
    name: "pr-autocomplete",
    desc: "Auto-draft pull-request titles and descriptions straight from your diff and commit history.",
    href: "https://github.com/MarcinSufa/pr-autocomplete",
  },
  {
    name: "git-timesheet",
    desc: "Generate weekly PDF / CSV timesheets straight from your git commit history.",
    href: "https://github.com/MarcinSufa/git-timesheet",
  },
];

/* ----------------------------------------------------------------
 * 03 — Philosophy
 * ---------------------------------------------------------------- */
export const philosophyIntro = {
  heading: "Discipline is the multiplier. Seven rules I never break.",
  body: "Agents don't make me fast by writing more code — they make me fast because the process around them is strict. Every lesson becomes an enforced guardrail, not a passive note.",
} as const;

export interface Rule {
  n: string;
  title: string;
  sub: string;
}

export const rules: Rule[] = [
  { n: "01", title: "Planning is 90% of the work", sub: "No code without an approved plan." },
  { n: "02", title: "One worktree per agent", sub: "Isolated git worktrees, no stepping on each other." },
  { n: "03", title: "Spec before code", sub: "And the spec is reviewed by a second model." },
  { n: "04", title: "Strict TDD", sub: "Red → Green → Refactor, always." },
  { n: "05", title: "Reviewed by a different model", sub: "The model that reviews never wrote the code." },
  { n: "06", title: "Only I merge to main", sub: "The human stays the final gate." },
  { n: "07", title: "E2E with real users", sub: "Playwright + actual people, before it ships." },
];

export const ruleAside: string[] = ["engineered enough", "validate at the boundaries", "explicit > clever"];

export const principlesIntro =
  "The workflow above only holds because the code underneath follows a few well-worn engineering principles — the same ones I expect from any senior on the team.";

export interface Principle {
  name: string;
  desc: string;
}

export const principles: Principle[] = [
  { name: "KISS", desc: "The simplest thing that works. Complexity has to earn its keep." },
  { name: "DRY", desc: "One source of truth. No copy-pasted logic to drift out of sync." },
  { name: "SOLID", desc: "Cohesive, loosely-coupled units that are safe to change in isolation." },
  { name: "TDD", desc: "Tests first. Red → Green → Refactor drives the design, not the other way round." },
  { name: "YAGNI", desc: "Build what's needed now, not the abstraction you might want later." },
  { name: "Separation of concerns", desc: "Clear boundaries between UI, state and data — each does one job well." },
];

/* ----------------------------------------------------------------
 * 04 — The Loop (fractal diagram + fleet)
 * ---------------------------------------------------------------- */
export const loopIntro = {
  heading: "A fractal loop, not a pipeline",
} as const;

export interface LoopPhase {
  n: string;
  label: string;
  sub: string;
  left: string;
  top: string;
  review: boolean;
}

export const loopPhases: LoopPhase[] = [
  { n: "01", label: "Research", sub: "frame the problem, gather context", left: "50%", top: "14%", review: false },
  { n: "02", label: "Plan · spec", sub: "write the spec file first", left: "81%", top: "32%", review: false },
  { n: "03", label: "Spec review", sub: "a different model critiques it", left: "81%", top: "68%", review: true },
  { n: "04", label: "Build · TDD", sub: "red → green → refactor", left: "50%", top: "86%", review: false },
  { n: "05", label: "Code review", sub: "cross-model review of the diff", left: "19%", top: "68%", review: true },
  { n: "06", label: "Ship", sub: "open PR · I merge to main", left: "19%", top: "32%", review: false },
];

export const loopUnit: { label: string; sub: string; highlight?: boolean }[] = [
  { label: "Propose", sub: "draft · spec · diff" },
  { label: "Cross-review", sub: "a different model", highlight: true },
  { label: "Refine", sub: "green · merge" },
];

export interface LoopConstant {
  title: string;
  sub: string;
}

export const loopConstants: LoopConstant[] = [
  { title: "Observable", sub: "every run is traced" },
  { title: "Test-driven", sub: "red → green → refactor" },
  { title: "Different model reviews", sub: "never the author" },
  { title: "Human merges", sub: "I'm the final gate" },
];

export interface FleetModel {
  name: string;
  vendor: string;
  role: string;
}

export const fleetModels: FleetModel[] = [
  { name: "Claude", vendor: "ANTHROPIC", role: "lead planner — drives the spec & TDD" },
  { name: "Codex", vendor: "OPENAI", role: "parallel build, reviews Claude's diffs" },
  { name: "Composer", vendor: "CURSOR", role: "fast edits, critiques the spec" },
  { name: "Gemini", vendor: "GOOGLE", role: "independent second-opinion review" },
  { name: "DeepSeek", vendor: "OPEN-SOURCE", role: "bulk drafts & cheap first passes" },
];

export const loopFlow =
  "research · spec · cross-review · build (TDD) · cross-review · ship — then it starts again, one scale down";

/* ----------------------------------------------------------------
 * 05 — Stack
 * ---------------------------------------------------------------- */
export interface StackGroup {
  label: string;
  items: string[];
  accent?: boolean;
}

export const stackGroups: StackGroup[] = [
  { label: "FRONTEND", items: ["TypeScript", "Vue 3", "React", "Next.js", "Nuxt"] },
  { label: "DATA & BACKEND", items: ["Node", "Prisma", "PostgreSQL", "Supabase"] },
  { label: "UI", items: ["Tailwind", "shadcn/ui", "Design systems"] },
  { label: "AI & AGENTS", items: ["Claude Code", "MCP", "Multi-agent", "ElevenLabs", "Cross-model review"], accent: true },
  { label: "ARCHITECTURE", items: ["Ports & Adapters", "Multi-tenancy", "Provider-agnostic"] },
];

/* ----------------------------------------------------------------
 * 06 — About
 * ---------------------------------------------------------------- */
export const about = {
  heading: "I teach machines to remember.",
  portrait: { src: "/assets/marcin-portrait.png", alt: "Marcin Sufa" },
  paragraphs: [
    "I'm Marcin, a frontend engineer and indie builder based in Warsaw. I build in public as @smolexander, mostly skills and plugins for Claude Code.",
    "As a kid I struggled with my memory, and it taught me how much of who we are is built on it. Memory shapes how we think and how we perform. So when I started working with AI agents, their forgetting was the first thing I wanted to fix. That's ExoVault, my side project: an encrypted, MCP-native memory layer that lets agents remember across sessions, and gives them an identity of their own.",
    "I'm also deep in self-improving agent workflows, where every lesson an agent learns turns into a guardrail it can't break again. I run my own life on roughly the same idea. Away from the keyboard that's stoic philosophy (Marcus Aurelius, Ryan Holiday) and the long game of getting a little better each day.",
  ],
  meta: [
    { label: "day job", value: "frontend at Sysdyne (via Coldrun)" },
    { label: "currently", value: "building ExoVault and Fractal" },
    { label: "reading", value: "Marcus Aurelius, Meditations" },
  ],
} as const;

/* ----------------------------------------------------------------
 * 07 — Contact
 * ---------------------------------------------------------------- */
export const contact = {
  heading: ["Let's build", "something good."],
  body: "Open to senior frontend + AI roles and select product work. Fastest way to reach me is email or X.",
} as const;

/* ----------------------------------------------------------------
 * Footer
 * ---------------------------------------------------------------- */
export const footer = {
  left: "© 2026 Marcin Sufa",
  center: "Warsaw, PL",
  right: "built with too many agents ✦",
} as const;
