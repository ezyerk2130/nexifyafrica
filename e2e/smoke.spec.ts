import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", name: "home" },
  { path: "/case-studies", name: "case studies list" },
  { path: "/case-studies/modernizing-healthcare-security", name: "case study detail" },
  { path: "/manifesto", name: "manifesto" },
  { path: "/team", name: "team" },
  { path: "/contact", name: "contact" },
];

for (const route of routes) {
  test(`${route.name} (${route.path}) renders successfully`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.status(), `status for ${route.path}`).toBeLessThan(400);

    // Brand mark in the nav is present on every page.
    await expect(page.getByRole("link", { name: /nexify africa/i }).first()).toBeVisible();

    // Every page renders at least one top-level heading.
    await expect(page.locator("h1").first()).toBeVisible();
  });
}

test("skip link is present for keyboard users", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Skip to content" })).toHaveCount(1);
});

test("contact page exposes a working form", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("button", { name: /send message/i })).toBeVisible();
});
