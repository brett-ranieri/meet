import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
	test("An event element is collapsed by default", ({ given, when, then }) => {
		let AppWrapper;
		given("the main page has been opened", () => {
			AppWrapper = mount(<App />);
		});

		when("the user has not selected any specific event", () => {});

		then("no event details will be visible to the user", () => {
			AppWrapper.update();
			const eventDetails = AppWrapper.find(".event-details");
			expect(eventDetails).toHaveLength(0);
		});
	});

	test("User can expand an event to see its details", ({ given, when, then }) => {
		let AppWrapper;
		given("the main page has been opened", () => {
			AppWrapper = mount(<App />);
		});

		when("the user clicks the details button on an event", () => {
			AppWrapper.update();
			AppWrapper.find(".event .details-button").at(0).simulate("click");
		});

		then("the event display will expand making details visible to the user", () => {
			AppWrapper.update();
			expect(AppWrapper.find(".event .event-details")).toHaveLength(1);
		});
	});

	test("User can collapse an event to hide its details", ({ given, when, then }) => {
		let AppWrapper;
		given("the user has already expanded the details of a specific event", async () => {
			AppWrapper = await mount(<App />);
			AppWrapper.update();
			AppWrapper.find(".event .details-button").at(0).simulate("click");
			expect(AppWrapper.find(".event .event-details")).toHaveLength(1);
		});

		when("the user clicks the details button again", () => {
			AppWrapper.update();
			AppWrapper.find(".event .details-button").at(0).simulate("click");
		});

		then("the event display will collapse hiding the details from the user", () => {
			AppWrapper.update();
			expect(AppWrapper.find(".event .event-details")).toHaveLength(0);
		});
	});
});
