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
		numberOfEvents: 24,
	};

	componentDidMount() {
		this.mounted = true;
		getEvents().then((events) => {
			if (this.mounted) {
				events.length = this.state.numberOfEvents;
				this.setState({ events, locations: extractLocations(events) });
			}
		});
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	updateEvents = (location, eventCount) => {
		const { selectedLocation } = this.state;

		if (location) {
			getEvents().then((events) => {
				const locationEvents =
					location === "all" ? events : events.filter((event) => event.location === location);
				locationEvents.length = this.state.numberOfEvents;
				this.setState({
					events: locationEvents,
					selectedLocation: location,
				});
			});
		} else {
			getEvents().then((events) => {
				const locationEvents =
					selectedLocation === "all"
						? events
						: events.filter((event) => event.location === selectedLocation);
				const limitedEvents = locationEvents.slice(0, eventCount);
				this.setState({
					events: limitedEvents,
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
