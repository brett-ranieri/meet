import React, { Component } from "react";
import "./App.scss";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import EventGenre from "./EventGenre";
import WelcomeScreen from "./WelcomeScreen";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
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
		showWelcomeScreen: undefined,
		isLocal: undefined,
	};

	async componentDidMount() {
		this.mounted = true;
		const accessToken = localStorage.getItem("access_token");
		const isTokenValid = (await checkToken(accessToken)).error ? false : true;
		const searchParams = new URLSearchParams(window.location.search);
		const code = searchParams.get("code");
		this.setState({ showWelcomeScreen: !(code || isTokenValid) });
		const authorized = code || isTokenValid;
		const isLocal = window.location.href.indexOf("localhost") > -1 ? true : false;
		this.setState({ isLocal: isLocal });
		if ((authorized || isLocal) && this.mounted) {
			getEvents().then((events) => {
				if (this.mounted) {
					const numberOfEvents = this.state.numberOfEvents;
					const slicedEvents = events.slice(0, numberOfEvents);
					this.setState({ events: slicedEvents, locations: extractLocations(events) });
				}
			});
		}
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
					"\uD83D\uDC40 Looks like you're not connected to the internet. Displayed events have been loaded from local storage.",
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
		const showWelcomeScreen = this.state.showWelcomeScreen;
		const isLocal = this.state.isLocal;
		if (showWelcomeScreen === undefined) return <div className='App' />;
		if (showWelcomeScreen === false || isLocal) {
			return (
				<div className='App'>
					<WarningAlert text={this.state.warningText} />
					<h1 className='meet'>MEET</h1>
					<Row className='justify-content-center mb-3'>
						<Col
							xs='auto'
							sm='12'
							md='6'
							lg='6'
							xl='6'
						>
							<CitySearch
								locations={this.state.locations}
								updateEvents={this.updateEvents}
							/>
						</Col>
						<Col
							xs='auto'
							sm='12'
							md='6'
							lg='6'
							xl='6'
						>
							<NumberOfEvents
								numberOfEvents={this.state.numberOfEvents}
								updateEvents={this.updateEvents}
							/>
						</Col>
					</Row>
					<div className='app_event_list'>
						<Row className='justify-content-center'>
							<Col
								xs='auto'
								sm='12'
								md='12'
								lg='3'
							>
								<EventGenre events={this.state.events} />
							</Col>
							<Col
								xs='auto'
								sm='12'
								md='12'
								lg='9'
							>
								<div className='events-by-city'>
									<h4 className='events-by-city-label content'>Events in Each City</h4>
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
												axisLine={{ stroke: "#fff685" }}
												tick={{ fill: "#fff685" }}
												tickLine={{ stroke: "#fff685" }}
											/>
											<YAxis
												dataKey='number'
												type='number'
												name='Number of Events'
												axisLine={{ stroke: "#fff685" }}
												tick={{ fill: "#fff685" }}
												tickLine={{ stroke: "#fff685" }}
											/>
											<Tooltip
												content={this.CustomToolTip}
												cursor={{ strokeDasharray: "3 3" }}
											/>
											<Scatter
												data={this.getData()}
												fill='#fff685'
											/>
										</ScatterChart>
									</ResponsiveContainer>
								</div>
							</Col>
						</Row>

						<EventList events={this.state.events} />
					</div>
				</div>
			);
		} else {
			return (
				<WelcomeScreen
					showWelcomeScreen={this.state.showWelcomeScreen}
					getAccessToken={() => {
						getAccessToken();
					}}
				/>
			);
		}
	}
}

export default App;
