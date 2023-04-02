import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
	let NumberOfEventsWrapper;
	beforeAll(() => {
		NumberOfEventsWrapper = shallow(
			<NumberOfEvents
				// updateNumberOfEvents={() => {}}
				updateNumberOfEvents={() => {}}
			/>
		);
	});

	test("render number of events element", () => {
		expect(NumberOfEventsWrapper).toBeDefined();
	});

	test("check number of events element contains input field", () => {
		expect(NumberOfEventsWrapper.find("input.number-of-events")).toHaveLength(1);
	});

	test("confirm 24 events displayed by default", () => {
		expect(NumberOfEventsWrapper.state("query")).toBe(24);
	});

	test("confirm that number of events input only receives numbers", () => {
		expect(NumberOfEventsWrapper.find(".number-of-events").prop("type")).toBe("number");
	});

	test("render text entered in input field correctly", () => {
		const query = NumberOfEventsWrapper.state("query");
		expect(NumberOfEventsWrapper.find(".number-of-events").prop("value")).toBe(query);
	});

	test("change state when text input changes", () => {
		NumberOfEventsWrapper.setState({
			query: "64",
		});
		const numberChange = { target: { value: "48" } };
		NumberOfEventsWrapper.find(".number-of-events").simulate("change", numberChange);
		expect(NumberOfEventsWrapper.state("query")).toBe("48");
	});
});
