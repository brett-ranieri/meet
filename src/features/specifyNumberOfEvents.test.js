import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
	test("When user hasn’t specified a number, twenty four is the default number", ({
		given,
		when,
		then,
	}) => {
		let AppWrapper;
		given(
			"the user has received a list of all upcoming events matching search criteria entered (if any)",
			() => {
				AppWrapper = mount(<App />);
			}
		);

		when("the user has not specified how many events to show", () => {});

		then("the first twenty four upcoming events will be displayed.", () => {
			AppWrapper.update();
			expect(AppWrapper.state("numberOfEvents")).toEqual(24);
		});
	});
	test("User can change the number of events they want to see", ({ given, when, then }) => {
		let AppWrapper;
		given(
			"the user has received a list of all upcoming events matching search criteria entered (if any)",
			() => {
				AppWrapper = mount(<App />);
				AppWrapper.update();
				expect(AppWrapper.state("numberOfEvents")).toEqual(24);
			}
		);

		when("the user choses ten events to show", async () => {
			AppWrapper.update();
			await AppWrapper.find(".number-of-events").simulate("change", { target: { value: 10 } });
		});

		then("ten events will be displayed.", () => {
			AppWrapper.update();
			expect(AppWrapper.state("numberOfEvents")).toEqual(10);
		});
	});
});
