import { test, expect } from "@playwright/test";

test.describe("portfolio page", () => {
  test("renders the hero and core sections", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: /frontend engineer/i }),
    ).toBeVisible();

    for (const id of ["experience", "work", "philosophy", "fleet", "stack", "about", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("toggles between dark and light themes", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");

    await expect(html).not.toHaveClass(/theme-light/);
    await page.getByRole("button", { name: /switch to light theme/i }).click();
    await expect(html).toHaveClass(/theme-light/);
  });

  test("exposes the email contact and CV download", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: "sufa.marcin@gmail.com" }),
    ).toHaveAttribute("href", "mailto:sufa.marcin@gmail.com");
  });
});
