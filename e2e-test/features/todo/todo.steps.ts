import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("features/todo/todo.feature");

defineFeature(feature, (test) => {
  test("Entering a correct password", ({ given, when, then }) => {});
});
