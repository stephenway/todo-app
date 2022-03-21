import { test, expect } from "@playwright/test";

test("should display context and basic UI", async ({ page }) => {
  // await page.evaluate(`window.localStorage.clear()`);
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("TODO");
  expect(page.locator("[title='Change theme']")).toBeTruthy();
  // await expect(page.locator("p")).toContainText("0 items left");
});

test("should change UI theme", async ({ page }) => {
  await page.goto("/");
  const rootNode = page.locator("html");
  const themeSwitch = page.locator("[title='Change theme']");
  await expect(rootNode).not.toHaveClass("darkTheme");
  await themeSwitch.click();
  await expect(rootNode).toHaveClass("darkTheme");
  await themeSwitch.click();
  await expect(rootNode).not.toHaveClass("darkTheme");
});

test("should allow for basic todo entry, filtering & completion", async ({
  page,
}) => {
  const todoInput = page.locator('[placeholder="Create a new todo…"]');
  const todoItems = [
    "Complete online JavaScript course",
    "Jog around the park 3x",
    "10 minutes meditation",
    "Read for 1 hour",
    "Pick up groceries",
    "Complete Todo App on Frontend Mentor",
  ];
  await page.goto("/");
  await todoInput.click();
  todoItems.map(async (item) => {
    await todoInput.fill(item);
    await todoInput.press("Enter");
    expect(page.locator(`text=${item}`)).toBeTruthy();
  });
  await page
    .locator(".Checkbox_root__MlqC8.TodoItem_checkbox__PxHlf")
    .first()
    .click();
  await page.locator("text=Active").click();
  await page.locator("text=Completed").first().click();
  await page.locator("text=All").click();
  await page.locator("text=Clear Completed").click();
});
