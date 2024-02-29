import { Given, Then, When, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { expect, type Page, chromium, Browser } from "@playwright/test";

let page: Page;
let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:4200");
});

AfterAll(async () => {
  await page.close();
  await browser.close();
});

//Scenario: Adding a todo
Given("I should see a disabled add button", async function () {
  const button = page.getByTestId("todo-add-button");
  await expect(button).toBeDisabled();
});

Then("{string} that I insert into the text field", async (todoInput) => {
  const input = page.getByTestId("todo-input");
  await input.fill(todoInput);
});

When("I click on the add button", async () => {
  const button = page.getByTestId("todo-add-button");
  await button.click();
});

Then("I should see a todo with the {string} label", async (todoLabel) => {
  const checkbox = page.getByTestId("todo-checkbox");
  await expect(checkbox).toBeVisible();
  await expect(checkbox).toHaveText(todoLabel);
});

// Scenario: Deleting a todo
Given("{string} is in the todo list", async (todoLabel) => {
  const checkbox = page.getByTestId("todo-checkbox");
  await expect(checkbox).toHaveText(todoLabel);
});

When("I click on the delete button next to {string}", async (todoLabel) => {
  const todoItem = page.getByTestId("todo-item");
  const todoDeleteButton = todoItem.locator("button");
  await todoDeleteButton.click();
});

Then("I should not see a todo with the {string} label", async (todoLabel) => {
  const todoItem = page.getByTestId("todo-item");
  await expect(todoItem).toHaveCount(0);
});
