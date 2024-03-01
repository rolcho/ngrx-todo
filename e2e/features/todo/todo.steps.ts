import { Given, When, Then, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import { Browser, type Page } from "playwright";

let page: Page;
let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
});

AfterAll(async () => {
  await page.close();
  await browser.close();
});

function addingATodo() {
  Given(
    "{string} that I insert into the text field",
    async function (todoInput) {
      await page.goto("http://localhost:4200");
      await page.fill("input", todoInput);
    }
  );

  When("I click on the add button", async function () {
    await page.click("button:has-text('add')");
  });

  Then(
    "I should see a todo with the {string} label",
    async function (todoItem) {
      const todo = page.getByTestId("todo-checkbox").last();
      await expect(todo).toBeVisible();
      await expect(todo).toHaveText(todoItem);
    }
  );
}

addingATodo();
