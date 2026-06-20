import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { navLinks } from "@/lib/content";

function renderNav() {
  return render(
    <ThemeProvider>
      <SiteNav />
    </ThemeProvider>,
  );
}

describe("SiteNav", () => {
  it("renders every nav link from content", () => {
    renderNav();
    for (const link of navLinks) {
      const anchors = screen.getAllByRole("link", { name: link.label });
      expect(anchors.length).toBeGreaterThan(0);
      expect(anchors[0]).toHaveAttribute("href", link.href);
    }
  });

  it("toggles the light theme class on the document element", () => {
    renderNav();
    document.documentElement.classList.remove("theme-light");
    const toggle = screen.getByRole("button", {
      name: /switch to (light|dark) theme/i,
    });

    fireEvent.click(toggle);
    expect(document.documentElement.classList.contains("theme-light")).toBe(true);

    fireEvent.click(toggle);
    expect(document.documentElement.classList.contains("theme-light")).toBe(false);
  });

  it("opens the mobile menu when the burger is pressed", () => {
    renderNav();
    const burger = screen.getByRole("button", { name: /menu/i });
    expect(burger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(burger);
    expect(burger).toHaveAttribute("aria-expanded", "true");
  });
});
