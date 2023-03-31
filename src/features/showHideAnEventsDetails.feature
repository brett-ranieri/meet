Feature: Show/Hide an event's details

Scenario: An event element is collapsed by default
  Given the main page has been opened
  When the user has not selected any specific event
  Then no event details will be visible to the user

Scenario: User can expand an event to see its details
  Given the main page has been opened
  When the user clicks the details button on an event
  Then the event display will expand making details visible to the user

Scenario: User can collapse an event to hide its details
  Given the user has already expanded the details of a specific event
  When the user clicks the details button again
  Then the event display will collapse hiding the details from the user