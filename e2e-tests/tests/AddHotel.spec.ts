import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {

  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Войти" }).click();

});