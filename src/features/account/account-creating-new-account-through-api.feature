Feature: Account - creating new account with the use of API

  As: A defaultUser
  I can: Create new account with the use of API

  Scenario: Send post request
    Given I generate authorization token
    And I create Account through API