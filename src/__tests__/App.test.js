import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";

describe("<App /> component", () => {
	let AppWrapper;
	beforeAll(() => {
		AppWrapper = shallow(<App />);
	});

	test("render list of events", () => {
		expect(AppWrapper.find(EventList)).toHaveLength(1);
	});

	test("render city search", () => {
		expect(AppWrapper.find(CitySearch)).toHaveLength(1);
	});

	test("render number of events", () => {
		expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
	});

	test("app has numberOfEvents state", () => {
		const AppWrapper = mount(<App />);
		AppWrapper.setState({ numberOfEvents: 32 });
		const AppState = AppWrapper.state("numberOfEvents");
		expect(AppState).toEqual(32);
	});
});
//best practice to seperate unit tests from integration tests
describe("<App /> integration", () => {
	test('App passes "events" as a prop to EventList', () => {
		const AppWrapper = mount(<App />);
		const AppEventsState = AppWrapper.state("events");
		expect(AppEventsState).not.toEqual(undefined);
		expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
		AppWrapper.unmount();
	});

	test('App passes "locations" as a prop to CitySearch', () => {
		const AppWrapper = mount(<App />);
		const AppLocationsState = AppWrapper.state("locations");
		expect(AppLocationsState).not.toEqual(undefined);
		expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
		AppWrapper.unmount();
	});

	test("get list of events matching the city selected by the user", async () => {
		const AppWrapper = mount(<App />);
		const CitySearchWrapper = AppWrapper.find(CitySearch);
		const locations = extractLocations(mockData);
		CitySearchWrapper.setState({ suggestions: locations });
		const suggestions = CitySearchWrapper.state("suggestions");
		const selectedIndex = Math.floor(Math.random() * suggestions.length);
		const selectedCity = suggestions[selectedIndex];
		await CitySearchWrapper.instance().handleItemClicked(selectedCity);
		const allEvents = await getEvents();
		const eventsToShow = allEvents.filter((event) => event.location === selectedCity);
		expect(AppWrapper.state("events")).toEqual(eventsToShow);
		AppWrapper.unmount();
	});

	test('get a list of all events when user selects "See all cities"', async () => {
		const AppWrapper = mount(<App />);
		const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
		await suggestionItems.at(suggestionItems.length - 1).simulate("click");
		const allEvents = await getEvents();
		expect(AppWrapper.state("events")).toEqual(allEvents);
		AppWrapper.unmount();
	});

	test('App passes "numberOfEvents" as a prop to NumberOfEvents', () => {
		const AppWrapper = mount(<App />);
		const AppNumberOfEventsState = AppWrapper.state("numberOfEvents");
		expect(AppNumberOfEventsState).not.toEqual(undefined);
		expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(AppNumberOfEventsState);
		AppWrapper.unmount();
	});

	test("numberOfEvents state set by value change of NumberOfEvents", async () => {
		const AppWrapper = mount(<App />);
		const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents).find(".number-of-events");
		const eventObject = { target: { value: 24 } };
		NumberOfEventsWrapper.simulate("change", eventObject);
		await getEvents();
		expect(AppWrapper.state("numberOfEvents")).toBe(24);
		AppWrapper.unmount();
	});

	test("length of Events array matches numberOfEvents state", async () => {
		const AppWrapper = mount(<App />);
		const allEvents = await getEvents();
		AppWrapper.setState({
			events: allEvents,
		});
		expect(AppWrapper.state("events").length).toEqual(AppWrapper.state("numberOfEvents"));
		AppWrapper.unmount();
	});

	test("changing NumberOfEvents value updates number of Events displayed", async () => {
		const AppWrapper = mount(<App />);
		const allEvents = await getEvents();
		AppWrapper.setState({
			events: allEvents,
		});
		const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents).find(".number-of-events");
		const eventObject = { target: { value: 4 } };
		NumberOfEventsWrapper.simulate("change", eventObject);
		await getEvents();
		expect(AppWrapper.state("events")).toHaveLength(4);
		AppWrapper.unmount();
	});
});
