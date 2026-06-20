"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "ms-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default matches the no-flash script in layout.tsx (dark unless stored light).
  const [theme, setTheme] = useState<Theme>("dark");

  // Sync from the DOM class the no-flash script already applied.
  useEffect(() => {
    const isLight = document.documentElement.classList.contains("theme-light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const apply = useCallback((next: Theme) => {
    document.documentElement.classList.toggle("theme-light", next === "light");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      apply(next);
      return next;
    });
  }, [apply]);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
