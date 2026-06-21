"use client";

import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { navLinks } from "@/lib/content";

export function SiteNav() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const themeLabel = theme === "dark" ? "☀" : "☾";

  return (
    <nav className="pad-x sticky top-0 z-50 flex items-center gap-[18px] border-b border-border bg-bg px-10 py-4">
      <a
        href="#top"
        className="font-display text-[19px] font-bold tracking-[-0.01em] text-text no-underline"
      >
        MS<span className="text-accent">.</span>
      </a>

      <div className="ml-[34px] hidden gap-[26px] font-mono text-[12.5px] text-text2 min-[721px]:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="no-underline transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
          className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-border bg-surface text-[15px] text-text transition-colors hover:border-accent"
        >
          <span aria-hidden suppressHydrationWarning>
            {themeLabel}
          </span>
        </button>
        <a
          href="#contact"
          className="hidden rounded-[10px] bg-accent px-[18px] py-[10px] font-display text-[13.5px] font-semibold text-ink no-underline transition-colors hover:bg-accent2 min-[541px]:inline-flex"
        >
          Let&apos;s talk →
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-border bg-surface text-[17px] text-text transition-colors hover:border-accent min-[721px]:hidden"
        >
          <span aria-hidden>{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-full flex flex-col gap-[2px] border-b border-border bg-bg px-5 pb-4 pt-[10px] shadow-[0_18px_30px_var(--shadow)] min-[721px]:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border px-[6px] py-[11px] font-mono text-[15px] text-text no-underline transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="px-[6px] py-[11px] font-mono text-[15px] text-accent no-underline transition-colors hover:text-accent2"
          >
            contact →
          </a>
        </div>
      )}
    </nav>
  );
}
