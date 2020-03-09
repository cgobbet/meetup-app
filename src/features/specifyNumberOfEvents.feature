Feature: Specify number of events

Scenario: App default is to display 32 events
Given number of events is still the default
When the events for the selected city are displayed
Then the default amount of events is 32

Scenario: User can change amount of events displayed
Given the app has been opened by user
When user types the desired number
Then the new number is now the default