# meet App

Application that allows users to check what events are going on in the city of their choice.

## Project Objective

To build a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

## Development Dependencies

- "gh-pages": "^5.0.0"

## Project Dependencies

- "@testing-library/jest-dom": "^5.16.5",
- "@testing-library/react": "^13.4.0",
- "@testing-library/user-event": "^13.5.0",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-scripts": "5.0.1",
- "web-vitals": "^2.1.4",
- "workbox-background-sync": "^6.5.4",
- "workbox-broadcast-update": "^6.5.4",
- "workbox-cacheable-response": "^6.5.4",
- "workbox-core": "^6.5.4",
- "workbox-expiration": "^6.5.4",
- "workbox-google-analytics": "^6.5.4",
- "workbox-navigation-preload": "^6.5.4",
- "workbox-precaching": "^6.5.4",
- "workbox-range-requests": "^6.5.4",
- "workbox-routing": "^6.5.4",
- "workbox-strategies": "^6.5.4",
- "workbox-streams": "^6.5.4"

## User Stories and Scenarios

### FEATURE 1: FILTER EVENTS BY CITY

User Story: As a user, I should be able to filter the list of events by city so that I can easily see the events that are taking place in each city.

- Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities

  - Given user hasn’t searched for any city
  - When the user opens the app
  - Then the user should see a list of all upcoming events

- Scenario 2: User should see a list of suggestions when they search for a city

  - Given the main page is open
  - When the user starts typing in the city textbox
  - Then the user should see a list of cities (suggestions) that match what they’ve typed

- Scenario 3: User can select a city from the suggested list
  - Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
  - When the user selects a city (e.g. “Berlin, Germany) from the list
  - Then their city should be changed to that city (i.e. “Berlin, Germany) and the user should receive a list of upcoming events in that city.

### FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS

User Story: As a user, I should be able to show/hide the details of an event so that I can see more or less information about an event.

- Scenario 1: An event element is collapsed by default
  - Given the main page has been opened
  - When the user has not selected any specific event
  - Then no event details will be visible to the user
- Scenario 2: User can expand an event to see its details

  - Given the main page has been opened and a list of events has been displayed
  - When the user clicks the details button on an event
  - Then the event display will expand making details visible to the user

- Scenario 3: User can collapse an event to hide its details
  - Given the user has already expanded the details of a specific event
  - When the user clicks the details button again
  - Then the event display will collapse hiding the details from the user

### FEATURE 3: SPECIFY NUMBER OF EVENTS

User Story: As a user, I should be able to specify the number of events I am interested in so that I can see a list containing more or less events.

- Scenario 1: When user hasn’t specified a number, 24 is the default number

  - Given the user has received a list of all upcoming events matching search criteria entered (if any)
  - When the user has not specified how many events to show
  - Then the first 24 upcoming events will be displayed.

- Scenario 2: User can change the number of events they want to see
  - Given the user has received a list of all upcoming events matching search criteria entered (if any)
  - When the user choses ten events to show
  - Then ten events will be displayed.

### FEATURE 4: USE THE APP WHEN OFFLINE

User Story: As a user, I should be able to use the app while offline so that I can still see details about the events I viewed last time I was connected.

- Scenario 1: Show cached data when there’s no internet connection

  - Given app was connected to the internet and loaded information about events in the previous session
  - When the user tries to view the information while offline
  - Then the cached data about previously viewed events should remain accessible to the user even without an internet connection.

- Scenario 2: Show error when user changes the settings (city, time range)
  - Given the user has opened the app without an internet connection and has been presented with cached data from previous session
  - When the user changes filter parameters
  - Then the app will show an error saying internet connection necessary to obtain new information

### FEATURE 5: DATA VISUALIZATION

User Story: As a user, I should be able to view a chart showing the upcoming events of each city so that I know which events are happening in which location.

- Scenario 1: Show a chart with the number of upcoming events in each city
  - Given app has loaded and the user has received a list of all upcoming event in each city
  - When the user pushes the button to display the chart view
  - Then the app will display a chart showing the number of upcoming events in each city.

## Serverless Functions

This project will use serverless functions to complete the following:

- To request and return a token for user authentication
- Once received, pass along token for requests to Google Calendar API, including:
  - Loading list of events from Google Calendar
  - Querying database to return list of events that match user input search parameters
