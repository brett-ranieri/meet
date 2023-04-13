import React, { Component } from "react";
import "./App.scss";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import EventGenre from "./EventGenre";
import { getEvents, extractLocations } from "./api";
import { Col, Row } from "react-bootstrap";
import { WarningAlert } from "./Alert";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

class App extends Component {
	state = {
		events: [],
		locations: [],
		selectedLocation: "all",
		numberOfEvents: 20,
		warningText: "",
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

	getData = () => {
		const { locations, events } = this.state;
		const data = locations.map((location) => {
			const number = events.filter((event) => event.location === location).length;
			const city = location.split(", ").shift();
			return { city, number };
		});
		console.log("data ", data);
		return data;
	};

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

		if (!navigator.onLine) {
			this.setState({
				warningText:
					"Looks like you're not connected to the internet. Displayed events have been loaded from local storage.",
			});
		} else {
			this.setState({ warningText: "" });
		}
	};

	CustomToolTip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className='custom-tooltip'>
					<p className='tooltip_city'>{`${payload[0].value}`}</p>
					<p className='tooltip_number'>{`${payload[1].value}`}</p>
				</div>
			);
		}
		return null;
	};

	render() {
		return (
			<div className='App'>
				<WarningAlert text={this.state.warningText} />
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
					<Row className='justify-content-center'>
						{/* <div className='data-vis-wrapper'> */}
						<Col
							xs='auto'
							sm={3}
							md={4}
						>
							<EventGenre events={this.state.events} />
						</Col>
						<Col
							xs='auto'
							sm={9}
							md={8}
						>
							<div className='events-by-city'>
								<h4 className='events-by-city-label'>Events in Each City</h4>
								<ResponsiveContainer height={250}>
									<ScatterChart
										margin={{
											top: 20,
											right: 20,
											bottom: 10,
											left: 0,
										}}
									>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis
											dataKey='city'
											type='category'
											name='City'
											allowDuplicatedCategory={false}
										/>
										<YAxis
											dataKey='number'
											type='number'
											name='Number of Events'
										/>
										<Tooltip
											content={this.CustomToolTip}
											cursor={{ strokeDasharray: "3 3" }}
										/>
										{/* <ZAxis
							dataKey='z'
							type='number'
							range={[64, 144]}
							name='score'
							unit='km'
						/> */}
										<Scatter
											data={this.getData()}
											fill='#fff685'
										/>
									</ScatterChart>
								</ResponsiveContainer>
							</div>
						</Col>
						{/* </div> */}
					</Row>

					<EventList events={this.state.events} />
				</div>
			</div>
		);
	}
}

export default App;
