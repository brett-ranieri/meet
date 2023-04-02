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
		numberOfEvents: 24,
	};

	componentDidMount() {
		// console.log("mount mock ", mockData);
		this.mounted = true;
		getEvents().then((events) => {
			console.log("mount events", events.length);
			if (this.mounted) {
				const numberOfEvents = this.state.numberOfEvents;
				console.log("mount #of ", numberOfEvents);
				// console.log("slice ", events.slice(0, numberOfEvents));
				const slicedEvents = events.slice(0, numberOfEvents);
				console.log("init sliced ", slicedEvents.length);
				this.setState({ events: slicedEvents, locations: extractLocations(events) });
			}
		});
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	updateLocation = (location) => {
		getEvents().then((events) => {
			console.log("loc events ", events.length);
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
		this.setState({ numberOfEvents: eventCount });
		console.log("eventCount ", eventCount);
		console.log("selected ", this.state.selectedLocation);
		getEvents().then((events) => {
			const selectedLocation = this.state.selectedLocation;
			const locationEvents =
				selectedLocation === "all"
					? events
					: events.filter((event) => event.location === selectedLocation);
			console.log("locationEvents ", locationEvents.length);
			const limitedEvents = locationEvents.slice(0, eventCount);
			console.log("events ", limitedEvents.length);
			console.log("NumberOf ", this.state.numberOfEvents);
			this.setState({
				events: limitedEvents,
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
