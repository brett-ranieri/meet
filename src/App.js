import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";

class App extends Component {
	state = {
		events: [],
		locations: [],
		selectedLocation: "all",
		numberOfEvents: 20,
	};

	componentDidMount() {
		this.mounted = true;
		getEvents().then((events) => {
			if (this.mounted) {
				const numberOfEvents = this.state.numberOfEvents;
				const slicedEvents = events.slice(0, numberOfEvents);
				this.setState({ events: slicedEvents, locations: extractLocations(events) });
			}
		});
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	updateEvents = (location, eventCount) => {
		if (location) {
			getEvents().then((events) => {
				const numberOfEvents = this.state.numberOfEvents;
				const locationEvents =
					location === "all" ? events : events.filter((event) => event.location === location);
				const slicedEvents = locationEvents.slice(0, numberOfEvents);
				this.setState({
					events: slicedEvents,
					selectedLocation: location,
				});
			});
		} else {
			getEvents().then((events) => {
				const selectedLocation = this.state.selectedLocation;
				const locationEvents =
					selectedLocation === "all"
						? events
						: events.filter((event) => event.location === selectedLocation);
				const slicedEvents = locationEvents.slice(0, eventCount);
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
					updateEvents={this.updateEvents}
				/>
				<NumberOfEvents
					numberOfEvents={this.state.numberOfEvents}
					updateEvents={this.updateEvents}
				/>
				<EventList events={this.state.events} />
			</div>
		);
	}
}

export default App;
