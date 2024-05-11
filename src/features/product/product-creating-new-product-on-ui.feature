Feature: Product - creating new product with the use of UI

  As: A adminUser
  I can: Create new product with the use of UI

  Scenario: Logging to Salesforce platform as adminUser
    Given I am on the login page
    When I fill "adminUser" "login" to "username" input field
    And I fill "adminUser" "password" to "password" input field
    And I click "Login" button of type input
    And I wait for a page to load
    Then I verify I am logged in

  Scenario: Creating new product with the use of UI as adminUser
    Given I am on the product page
    And I click data target selection name of type "StandardButton", "Product2" and "CreateNewProduct"
    And I wait for a page to load
    And I fill "Random Product Name" to "Product Name" product form input field
    And I fill "Random Product Code" to "Product Code" product form input field
    And I fill "Random Product Description" to "Product Description" product form text area
    And I toggle checkbox with "Active" label to true
    And I click "Save" button from pop up
    And I wait for a page to load
    Then I verify success toast with "productCreated" message