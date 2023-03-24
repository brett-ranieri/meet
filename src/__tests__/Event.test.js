import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
	let EventWrapper;
	const event = mockData[0];
	beforeAll(() => {
		EventWrapper = shallow(<Event event={event} />);
	});

	test("render event component", () => {
		expect(EventWrapper).toBeDefined();
	});

	test("check event is collapsed by default", () => {
		expect(EventWrapper.state("collapsed")).toBe(true);
	});

	test("check event title is rendered correctly in h2 tag", () => {
		const eventTitle = EventWrapper.find("h2.event-title");
		expect(eventTitle).toHaveLength(1);
		expect(eventTitle.text()).toEqual(event.summary);
	});

	test("check event time is rendered correctly in p tag", () => {
		const eventTime = EventWrapper.find("p.event-time");
		expect(eventTime).toHaveLength(1);
		expect(eventTime.text()).toEqual(new Date(event.start.dateTime).toString());
	});

	test("check event location is rendered correctly in p tag", () => {
		const eventLocation = EventWrapper.find("p.event-location");
		expect(eventLocation).toHaveLength(1);
		expect(eventLocation.text()).toEqual(
			"@" + event.summary + " | " + event.location
		);
	});

	test("check that collapsed event renders correctly", () => {
		EventWrapper.setState({
			collapsed: true,
		});
		const aboutHeading = EventWrapper.find("h3.about-heading");
		const eventLink = EventWrapper.find("a.event-link");
		const eventDescription = EventWrapper.find("p.event-description");
		expect(aboutHeading).toHaveLength(0);
		expect(eventLink).toHaveLength(0);
		expect(eventDescription).toHaveLength(0);
	});

	test("render show details button", () => {
		EventWrapper.setState({
			collapsed: true,
		});
		const detailsButton = EventWrapper.find(".details-button");
		expect(detailsButton).toHaveLength(1);
		expect(detailsButton.text()).toBe("Show details");
	});

	test("render hide details button", () => {
		EventWrapper.setState({
			collapsed: false,
		});
		const detailsButton = EventWrapper.find(".details-button");
		expect(detailsButton).toHaveLength(1);
		expect(detailsButton.text()).toBe("Hide details");
	});

	test("toggle collapsed state on button click", () => {
		EventWrapper.setState({
			collapsed: false,
		});
		const detailsButton = EventWrapper.find(".details-button");
		detailsButton.simulate("click");
		expect(EventWrapper.state("collapsed")).toBe(true);
	});

	test("check that expanded event renders correctly", () => {
		EventWrapper.setState({
			collapsed: false,
		});
		const eventTitle = EventWrapper.find("h2.event-title");
		const eventTime = EventWrapper.find("p.event-time");
		const eventLocation = EventWrapper.find("p.event-location");
		const aboutHeading = EventWrapper.find("h3.about-heading");
		const eventLink = EventWrapper.find("a.event-link");
		const eventDescription = EventWrapper.find("p.event-description");
		expect(eventTitle).toHaveLength(1);
		expect(eventTime).toHaveLength(1);
		expect(eventLocation).toHaveLength(1);
		expect(aboutHeading).toHaveLength(1);
		expect(aboutHeading.text()).toBe("About event:");
		expect(eventLink).toHaveLength(1);
		expect(eventLink.text()).toBe("Details on Google Calendar");
		expect(eventDescription).toHaveLength(1);
		expect(eventDescription.text()).toEqual(event.description);
	});
});
