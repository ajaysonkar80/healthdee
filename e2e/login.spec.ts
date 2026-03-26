import { test, expect } from "@playwright/test";

test("user can login successfully", async ({ page }) => {
  await page.goto("/login");

  await page.click('#emailbutton');
  await page.fill('input[name="email"]', "patient@demo.com");
  await page.fill('input[name="password"]', "Patient@123");

  await page.click('button[type="submit"]');

  // wait for redirect
  await page.waitForURL("**/patient");

  await expect(page).toHaveURL(/patient/);
});