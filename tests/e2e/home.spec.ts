import { test, expect } from "@playwright/test";

test("ES home renders all main sections", async ({ page }) => {
  await page.goto("/es");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Diseñamos webs que");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("convierten visitas en clientes");
  await expect(page.getByText("Pack único, sin cuotas mensuales abusivas. La web es 100% tuya.")).toBeVisible();
  await expect(page.getByText("¿Por qué no cobráis cuota mensual como otras agencias?")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Comparativa honesta|Por qué pagar una vez/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Listo para una web que pague/ })).toBeVisible();
});

test("EN home toggles via locale switcher", async ({ page }) => {
  await page.goto("/es");
  await page.getByRole("button", { name: "Switch to EN" }).click();
  await expect(page).toHaveURL(/\/en/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("We build websites that");
});
