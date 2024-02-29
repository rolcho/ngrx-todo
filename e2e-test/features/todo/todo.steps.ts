import {
  Given,
  Then,
  When,
  BeforeAll,
  Before,
  After,
  AfterAll,
} from "@cucumber/cucumber";
import { Browser, chromium, expect, type Page } from "@playwright/test";
import exp from "constants";

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

Given("{string} that I insert into the text field", async (todoInput) => {
  // Write code here that turns the phrase above into concrete actions
  const input = page.getByTestId("todo-input");
  await input.fill(todoInput);
});

When("I click on the add button", async () => {
  // Write code here that turns the phrase above into concrete actions
  const button = page.getByTestId("todo-add-button");
  await button.click();
});

Then("I should see a todo with the {string} label", async (todoLabel) => {
  // Write code here that turns the phrase above into concrete actions
  const checkbox = page.getByTestId("todo-checkbox");
  await expect(checkbox).toBeVisible();
  await expect(checkbox).toHaveText(todoLabel);
});

Then("I should see a disabled add button", async function () {
  // Write code here that turns the phrase above into concrete actions
  const button = page.getByTestId("todo-add-button");
  await expect(button).toBeDisabled();
});
