Feature: Account - creating new account with the use of UI

  As: A adminUser
  I can: Create new account with the use of UI

  Scenario: Logging to Salesforce platform as adminUser
    Given I am on the login page
    When I fill "adminUser" "login" to "username" input field
    And I fill "adminUser" "password" to "password" input field
    And I click "Login" button of type input
    And I wait for a page to load
    Then I verify I am logged in

  Scenario: Creating new account with the use of UI as adminUser
    Given I am on the account page
    And I click data target selection name of type "StandardButton", "Account" and "New"
    And I wait for a page to load
    And I fill "Random Account Name" to "Name" account form input field
    And I fill "Random Phone Number" to "Phone" account form input field
    And I fill "Random Street" to "street" account form text area
    And I fill "Random Postal Code" to "postalCode" account form input field
    And I fill "Random City" to "city" account form input field
    And I fill "Random Province" to "province" account form input field
    And I fill "Random Country" to "country" account form input field
    And I select "Technology Partner" from "Type" object form dropdown
    And I select "Banking" from "Industry" object form dropdown
    And I click "SaveEdit" button
    And I wait for a page to load
    Then I verify success toast with "accountCreated" message