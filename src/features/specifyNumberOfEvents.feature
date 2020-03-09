Feature: Specify number of events

Scenario: When user hasn’t specified a number, 32 is the default number
Given a user did not specify a number of events
When the events for the specified city appear
Then the default amount of 32 events appears

Scenario: User can change the number of events they want to see
Given the user has set the number of events
When a number is entered
Then the specified number of events will be shown