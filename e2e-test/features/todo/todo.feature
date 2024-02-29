Feature: Todo handling

  Scenario: Adding a todo
    Given "almafa" that I insert into the text field
    When I click on the add button
    And I wait for the todo to appear
    Then I should see a todo with the "almafa" label

  Scenario: Adding a todo
    Given "" that I insert into the text field
    Then I should see a disabled add button
