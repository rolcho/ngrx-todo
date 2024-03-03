import { Given, When, Then, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import { Browser, Page } from "playwright";
import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
  DownedDockerComposeEnvironment,
  Wait,
  GenericContainer,
  StartedTestContainer,
  Network,
  StoppedNetwork,
  StartedNetwork,
} from "testcontainers";

let page: Page;
let browser: Browser;
let docker: DockerComposeEnvironment;
let backendContainer: GenericContainer;
let frontendContainer: GenericContainer;
let backendContainerIntance: StartedTestContainer;
let frontendContainerIntance: StartedTestContainer;
// let startedDocker: StartedDockerComposeEnvironment;
// let downedDocker: DownedDockerComposeEnvironment;
let commonNetwork: StartedNetwork;

BeforeAll({ timeout: 30000 }, async () => {
  console.info("Creating docker network");
  commonNetwork = await new Network().start();
  console.info("Creating backend container");
  backendContainer = new GenericContainer("e2e-todo-api:latest")
    .withExposedPorts(3000)
    .withNetwork(commonNetwork)
    .withWaitStrategy(Wait.forListeningPorts());

  console.info("Running backend container");
  backendContainerIntance = await backendContainer.start();

  console.info("Building frontend image, based on the ceated backends URL");
  const frontendImageWithBackendReference = await GenericContainer.fromDockerfile("../todo-app")
    .withBuildArgs({
      BACKEND_URL:
        `http://localhost:${backendContainerIntance.getFirstMappedPort()}`
    })
    .build();

  console.info("Building frontend container");
  frontendContainer = frontendImageWithBackendReference
    .withExposedPorts(80)
    .withNetwork(commonNetwork)
    .withWaitStrategy(Wait.forListeningPorts());

  console.info("Running frontend container");
  frontendContainerIntance = await frontendContainer.start();

  browser = await chromium.launch();
  page = await browser.newPage();
});

AfterAll({ timeout: 30000 }, async () => {
  await page.close();
  await browser.close();
  await frontendContainerIntance.stop();
  await backendContainerIntance.stop();
  await commonNetwork.stop();
  // downedDocker = await startedDocker.down();
});

Given(
  "{string} that I insert into the text field",
  { timeout: 10000 },
  async function (todoInput) {
    await page.goto(
      `http://localhost:${frontendContainerIntance.getFirstMappedPort()}`,
    );
    await page.fill("input", todoInput, { timeout: 10000 });
  },
);

When("I click on the add button", async function () {
  await page.click("button:has-text('add')");
});

Then(
  "I should see a todo with the {string} label",
  { timeout: 1000000 },
  async function (todoItem) {
    const todo = page.getByTestId("todo-checkbox").last();
    await expect(todo).toBeVisible({ timeout: 1000000 });
    await expect(todo).toHaveText(todoItem, { timeout: 1000000 });
  },
);
