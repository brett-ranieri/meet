Feature: Specify Number Of Events

Scenario: When user hasn’t specified a number, twenty four is the default number
  Given the user has received a list of all upcoming events matching search criteria entered (if any)
  When the user has not specified how many events to show
  Then the first twenty four upcoming events will be displayed.

Scenario: User can change the number of events they want to see
  Given the user has received a list of all upcoming events matching search criteria entered (if any)
  When the user choses ten events to show
  Then ten events will be displayed.