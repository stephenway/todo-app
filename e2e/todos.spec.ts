import { test, expect } from "@playwright/test";

const todoItems = [
  "Complete online JavaScript course",
  "Jog around the park 3x",
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

test("should allow for basic todo entry, filtering & completion", async ({
  page,
}) => {
  const todoInput = page.locator('[placeholder="Create a new todo…"]');
  await page.goto("/");
  // Fill out the list with todos
  await asyncForEach(todoItems, async (d) => {
    await todoInput.click();
    await todoInput.fill(d);
    await todoInput.press("Enter");
    expect(page.isVisible(`text=${d}`)).toBeTruthy();
  });
  console.log(page.locator("#todoCheck-1").first());
  await page.locator("#todoCheck-1").first().click();
  // Filters
  const firstItemA = await page.$$(`text='${todoItems[0]}'`);
  expect(firstItemA.length).toBe(1);
  await page.locator("text=Active").click();
  const firstItemB = await page.$$(`text='${todoItems[0]}'`);
  expect(firstItemB.length).toBe(0);
  await page.locator("text=Completed").first().click();
  const firstItemC = await page.$$(`text='${todoItems[0]}'`);
  expect(firstItemC.length).toBe(1);
  await page.locator("text=All").click();
  await page.screenshot({ path: "desktop-implemented.png", fullPage: true });
  expect(await page.locator("#todoList > li").count()).toBe(7);
  await page.locator("text=Clear Completed").click();
  expect(await page.locator("#todoList > li").count()).toBe(6);
  expect(page.locator("text='5 items left'")).toBeTruthy();
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
