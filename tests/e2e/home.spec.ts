import { test, expect } from "@playwright/test";

test("ES home renders all main sections", async ({ page }) => {
  await page.goto("/es");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Diseñamos webs que");
  await expect(page.getByText("Tecnologías que usamos")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tres formas de empezar" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cómo trabajamos" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Trabajo reciente" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Por qué Tuagenciaweb" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Preguntas frecuentes" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "¿Listo para tu nueva web?" })).toBeVisible();
});

test("EN home toggles via locale switcher", async ({ page }) => {
  await page.goto("/es");
  await page.getByRole("button", { name: "Switch to EN" }).click();
  await expect(page).toHaveURL(/\/en/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("We build websites that");
});
