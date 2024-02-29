Feature: Todo handling

  Scenario: Adding a todo
    Given "almafa" that I insert into the text field
    When I click on the add button
    Then I should see a todo with the "almafa" label
