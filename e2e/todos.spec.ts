import { test, expect } from "@playwright/test";

const todoInput = (page) => page.locator('[placeholder="Create a new todo…"]');

const todoItemsAB = [
  "Complete online JavaScript course",
  "Jog around the park 3x",
];

const todoItems = [
  ...todoItemsAB,
  "10 minutes meditation",
  "Read for 1 hour",
  "Pick up groceries",
  "Complete Todo App on Frontend Mentor",
];

test("should display context and basic UI", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("TODO");
  expect(page.locator("[title='Change theme']")).toBeTruthy();
  expect(page.locator("text='0 items left'")).toBeTruthy();
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

test("should match provided mockup", async ({ page }) => {
  await page.goto("/");
  // Fill out the list with todos
  await asyncForEach(todoItems, async (d) => {
    await todoInput(page).click();
    await todoInput(page).fill(d);
    await todoInput(page).press("Enter");
    expect(page.isVisible(`text=${d}`)).toBeTruthy();
  });
  await page.locator("#todoCheck-1").first().click();
  await page.screenshot({
    path: "public/test/screenshot-1.png",
    fullPage: true,
  });
});

test("should filter by active todos", async ({ page }) => {
  await page.goto("/");
  // Fill out the list with todos
  await asyncForEach(todoItemsAB, async (d) => {
    await todoInput(page).click();
    await todoInput(page).fill(d);
    await todoInput(page).press("Enter");
    expect(page.isVisible(`text=${d}`)).toBeTruthy();
  });
  // Mark first item as complete
  await page.locator("#todoCheck-1").first().click();
  // Check if 2 items are shown
  expect(page.locator("text='2 items left'")).toBeTruthy();
  // Filter by active
  await page.locator("text=Active").first().click();
  // Check if only 1 item is shown
  expect(page.locator("text='1 items left'")).toBeTruthy();
});

test("should filter by completed todos", async ({ page }) => {
  await page.goto("/");
  // Fill out the list with todos
  await asyncForEach(todoItemsAB, async (d) => {
    await todoInput(page).click();
    await todoInput(page).fill(d);
    await todoInput(page).press("Enter");
    expect(page.isVisible(`text=${d}`)).toBeTruthy();
  });
  // Mark first item as complete
  await page.locator("#todoCheck-1").first().click();
  // Check if both items are shown
  expect(page.locator("text='2 items left'")).toBeTruthy();
  // Filter by completed
  await page.locator("text=Completed").first().click();
  // Check if only one item is shown
  expect(page.locator("text='1 items left'")).toBeTruthy();
});

test("should clear completed items and update item count", async ({ page }) => {
  await page.goto("/");
  // Fill out the list with todos
  await asyncForEach(todoItems, async (d) => {
    await todoInput(page).click();
    await todoInput(page).fill(d);
    await todoInput(page).press("Enter");
    expect(page.isVisible(`text=${d}`)).toBeTruthy();
  });

  // Check item length and count UI
  const listItems = page.locator("#todoList > li[data-handler-id]");
  expect(await listItems.count()).toBe(6);
  expect(page.locator("text='6 items left'")).toBeTruthy();
  // Mark 1 todo as complete
  await page.locator("#todoCheck-1").first().click();
  // Check item count
  expect(page.locator("text='5 items left'")).toBeTruthy();
  // Clear completed
  await page.locator("text=Clear Completed").click();
  // Check item length decreased by 1
  expect(await listItems.count()).toBe(5);
});

test("should remove the first todo item", async ({ page }) => {
  const firstItem = 0;
  await page.goto("/");
  // Create a todo item
  await todoInput(page).click();
  await todoInput(page).fill(todoItems[firstItem]);
  await todoInput(page).press("Enter");
  expect(page.isVisible(`text=${todoItems[firstItem]}`)).toBeTruthy();
  // Remove the first todo
  await page.locator("svg").nth(firstItem).click();
  const firstItemA = await page.$$(`text='${todoItems[firstItem]}'`);
  expect(firstItemA.length).toBe(1);
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
