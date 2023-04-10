import React, { Component } from "react";
import "./App.scss";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import { Col, Row } from "react-bootstrap";

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
				<h1>MEET APP</h1>
				<Row className='justify-content-center mb-3'>
					<Col
						xs='auto'
						sm={6}
						md={4}
						className=''
					>
						<CitySearch
							locations={this.state.locations}
							updateEvents={this.updateEvents}
						/>
					</Col>
					<Col
						xs='auto'
						sm={6}
						md={4}
					>
						<NumberOfEvents
							numberOfEvents={this.state.numberOfEvents}
							updateEvents={this.updateEvents}
						/>
					</Col>
				</Row>
				<div className='app_event_list'>
					<EventList events={this.state.events} />
				</div>
			</div>
		);
	}
}

export default App;
