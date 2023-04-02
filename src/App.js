import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
// import { mockData } from "./mock-data";

class App extends Component {
	state = {
		events: [],
		locations: [],
		selectedLocation: "all",
		numberOfEvents: 20,
	};

	componentDidMount() {
		// console.log("mount mock ", mockData);
		this.mounted = true;
		getEvents().then((events) => {
			// console.log("mount events", events.length);
			if (this.mounted) {
				const numberOfEvents = this.state.numberOfEvents;
				// console.log("mount #of ", numberOfEvents);
				// console.log("slice ", events.slice(0, numberOfEvents));
				const slicedEvents = events.slice(0, numberOfEvents);
				// console.log("init sliced ", slicedEvents.length);
				this.setState({ events: slicedEvents, locations: extractLocations(events) });
			}
		});
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	// updateLocation = (location) => {
	// 	getEvents().then((events) => {
	// 		// console.log("init loc events ", events.length);
	// 		const numberOfEvents = this.state.numberOfEvents;
	// 		// console.log("loc #of ", numberOfEvents);
	// 		const locationEvents =
	// 			location === "all" ? events : events.filter((event) => event.location === location);
	// 		// console.log("loc events sorted ", locationEvents.length);
	// 		const slicedEvents = locationEvents.slice(0, numberOfEvents);
	// 		// console.log("loc sliced ", slicedEvents.length);
	// 		this.setState({
	// 			events: slicedEvents,
	// 			selectedLocation: location,
	// 		});
	// 	});
	// };

	// updateNumberOfEvents = (eventCount) => {
	// 	// console.log("eventCount ", eventCount);
	// 	// console.log("selected ", this.state.selectedLocation);
	// 	getEvents().then((events) => {
	// 		// console.log("init num events ", events.length);
	// 		const selectedLocation = this.state.selectedLocation;
	// 		// console.log("num eventCount ", eventCount);
	// 		// console.log(selectedLocation);
	// 		const locationEvents =
	// 			selectedLocation === "all"
	// 				? events
	// 				: events.filter((event) => event.location === selectedLocation);
	// 		// console.log("num locationEvents ", locationEvents.length);
	// 		const slicedEvents = locationEvents.slice(0, eventCount);
	// 		// console.log("num sliced ", slicedEvents.length);
	// 		this.setState({
	// 			events: slicedEvents,
	// 			numberOfEvents: eventCount,
	// 		});
	// 	});
	// };

	updateEvents = (location, eventCount) => {
		// const { selectedLocation } = this.state;

		if (location) {
			getEvents().then((events) => {
				// console.log("init loc events ", events.length);
				const numberOfEvents = this.state.numberOfEvents;
				// console.log("loc #of ", numberOfEvents);
				const locationEvents =
					location === "all" ? events : events.filter((event) => event.location === location);
				// console.log("loc events sorted ", locationEvents.length);
				const slicedEvents = locationEvents.slice(0, numberOfEvents);
				// console.log("loc sliced ", slicedEvents.length);
				this.setState({
					events: slicedEvents,
					selectedLocation: location,
				});
			});
		} else {
			getEvents().then((events) => {
				// console.log("init num events ", events.length);
				const selectedLocation = this.state.selectedLocation;
				// console.log("num eventCount ", eventCount);
				// console.log(selectedLocation);
				const locationEvents =
					selectedLocation === "all"
						? events
						: events.filter((event) => event.location === selectedLocation);
				// console.log("num locationEvents ", locationEvents.length);
				const slicedEvents = locationEvents.slice(0, eventCount);
				// console.log("num sliced ", slicedEvents.length);
				this.setState({
					events: slicedEvents,
					numberOfEvents: eventCount,
				});
			});
		}
	};

	render() {
		return (
			<div className='App'>
				<CitySearch
					locations={this.state.locations}
					// updateEvents={this.updateEvents}
					updateEvents={this.updateEvents}
				/>
				<NumberOfEvents
					numberOfEvents={this.state.numberOfEvents}
					// updateEvents={this.updateEvents}
					updateEvents={this.updateEvents}
				/>
				<EventList events={this.state.events} />
			</div>
		);
	}
}

export default App;
