Feature: Show/hide an events details

  Scenario: By default, an event element is collapsed
    Given the events are loaded for their location
    When the given locations events are loaded
    Then the user will be able to view event overview

  Scenario: User can expand an event to see its details
    Given the user is interested in seeing the details of an event
    When the user clicks on the more details button
    Then the user will be able to see all of the details for the event

  Scenario: User can collapse an event to hide its details
    Given the user is viewing the event
    And the event details are displayed
    When the user chooses to collapse the details
    Then the event details will be hidden