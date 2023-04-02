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
			// console.log("mount events", events);
			if (this.mounted) {
				// events.length = this.state.numberOfEvents;
				this.setState({ events, locations: extractLocations(events) });
			}
		});
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	updateLocation = (location) => {
		getEvents().then((events) => {
			const locationEvents =
				location === "all" ? events : events.filter((event) => event.location === location);
			locationEvents.length = this.state.numberOfEvents;
			this.setState({
				events: locationEvents,
				selectedLocation: location,
			});
		});
	};

	updateNumberOfEvents = (eventCount) => {
		console.log("I updated");
		getEvents().then((events) => {
			const selectedLocation = this.state.selectedLocation;
			const locationEvents =
				selectedLocation === "all"
					? events
					: events.filter((event) => event.location === selectedLocation);
			const limitedEvents = locationEvents.slice(0, eventCount);
			console.log("events ", limitedEvents.length);
			this.setState({
				events: limitedEvents,
				numberOfEvents: eventCount,
			});
		});
	};

	// updateEvents = (location, eventCount) => {
	// 	const { selectedLocation } = this.state;

	// 	if (location) {
	// 		console.log("location mock ", mockData);
	//  getEvents().then((events) => {
	// 	console.log("events length ", events.length);
	// 	console.log("list length ", document.querySelectorAll("#event_list li").length);
	// 	console.log("events ", this.state.numberOfEvents);
	// 	const locationEvents =
	// 		location === "all" ? events : events.filter((event) => event.location === location);
	// 	locationEvents.length = this.state.numberOfEvents;
	// 	console.log("**** sliced events ", locationEvents.length, "****");
	// 	this.setState({
	// 		events: locationEvents,
	// 		selectedLocation: location,
	// });
	// 	} else {
	// 		console.log("number mock ", mockData);
	// 		getEvents().then((events) => {
	// 			console.log("events length ", events.length);
	// 			console.log("list length ", document.querySelectorAll("#event_list li").length);
	// 			console.log("selected ", this.state.selectedLocation);
	// 			const locationEvents =
	// 				selectedLocation === "all"
	// 					? events
	// 					: events.filter((event) => event.location === selectedLocation);
	// 			console.log("location events ", locationEvents.length);
	// 			const limitedEvents = locationEvents.slice(0, eventCount);
	// 			console.log("**** lim sliced events ", limitedEvents.length, "****");
	// 			this.setState({
	// 				events: limitedEvents,
	// 				numberOfEvents: eventCount,
	// 			});
	// 			console.log("state events ", this.state.events);
	// 			console.log("state num of events", this.state.numberOfEvents);
	// 		});
	// 	}
	// };

	render() {
		return (
			<div className='App'>
				<CitySearch
					locations={this.state.locations}
					// updateEvents={this.updateEvents}
					updateLocation={this.updateLocation}
				/>
				<NumberOfEvents
					numberOfEvents={this.state.numberOfEvents}
					// updateEvents={this.updateEvents}
					updateNumberOfEvents={this.updateNumberOfEvents}
				/>
				<EventList events={this.state.events} />
			</div>
		);
	}
}

export default App;
