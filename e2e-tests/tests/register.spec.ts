import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {

  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Войти" }).click();

  await expect(page.getByRole("heading", { name: "Войди в свой аккаунт" })).toBeVisible();

  await page.locator("[name=email]").fill("andrey.gorelov@mail.ru");
  await page.locator("[name=password]").fill("qweqwe");

  await page.getByRole("button", { name: "Авторизоваться" }).click();

  await expect(page.getByText("Вы вошли в аккаунт!")).toBeVisible();
  await expect(page.getByRole("link", { name: "Мои заказы" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Мои отели" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Выйти" })).toBeVisible();
});