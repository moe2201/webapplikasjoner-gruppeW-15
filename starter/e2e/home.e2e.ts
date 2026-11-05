import { test, expect } from "@playwright/test";

test("beskyttet side sender til /login", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login/);
});

test("API-et svarer 401 uten innlogging", async ({ request }) => {
  const response = await request.get("/api/bookings");
  expect(response.status()).toBe(401);
});

test("hovedflyt: registrer, book og se bookingen igjen", async ({ page }) => {
  // Unik e-post, så testen kan kjøres mange ganger mot samme database
  const email = `e2e-${Date.now()}@test.no`;

  // 1. Registrer ny bruker
  await page.goto("/login");
  // Siden må være "hydrert" (React har tatt over) før klikk virker.
  // toPass prøver på nytt til Navn-feltet faktisk dukker opp.
  await expect(async () => {
    await page.getByRole("button", { name: "Opprett en konto" }).click();
    await expect(page.getByPlaceholder("Navn")).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 30_000 });
  await page.getByPlaceholder("Navn").fill("E2E Testesen");
  await page.getByPlaceholder("E-post").fill(email);
  await page.getByPlaceholder(/passord/i).fill("test12345");
  await page.getByRole("button", { name: /^registrer/i }).click();
  await expect(page).toHaveURL(/\/dashboard/);

  // 2. Book en time
  await page.goto("/booking");
  // Samme hydrering: vent til tidsknappen blir lilla når vi klikker
  const tid = page.getByRole("button", { name: "10:30" });
  await expect(async () => {
    await tid.click();
    await expect(tid).toHaveClass(/bg-purple-700/, { timeout: 1000 });
  }).toPass({ timeout: 30_000 });

  await page.locator('input[type="date"]').fill("2030-01-15");
  const bekreft = page.getByRole("button", { name: "Bekreft booking" });
  await expect(bekreft).toBeEnabled();
  await page.getByLabel("Valgt tjeneste").selectOption("nettside");
  await bekreft.click();

  // 3. Se den igjen på dashboardet
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByText("nettside")).toBeVisible();
  await expect(page.getByText("2030-01-15 kl. 10:30")).toBeVisible();

  // 4. Sjekk også REST-API-et med samme innloggede bruker
  const response = await page.request.get("/api/bookings");
  expect(response.status()).toBe(200);
  expect(await response.json()).toHaveLength(1);
});