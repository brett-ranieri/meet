import React, { Component } from "react";

class Event extends Component {
	state = {
		collapsed: true,
		date: "",
		time: "",
	};

	updateDate = (event) => {
		const d = new Date(event.start.dateTime);

		const time = d.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: true,
		});
		const date = d.toLocaleString("en-US", { day: "numeric", month: "numeric", year: "numeric" });
		this.setState({
			date: date,
			time: time,
		});
	};

	componentDidMount() {
		const { event } = this.props;
		this.updateDate(event);
	}

	toggleCollapsed = () => {
		this.setState((state) => ({
			collapsed: !state.collapsed,
		}));
	};

	render() {
		const { event } = this.props;
		const { collapsed } = this.state;
		const { date } = this.state;
		const { time } = this.state;
		return (
			<div className='event'>
				<h2 className='event-title'>{event.summary}</h2>
				<p className='event-date'>{date + " " + time}</p>
				<p className='event-location'>
					@{event.summary} | {event.location}
				</p>
				{!collapsed && (
					<div className='event-details'>
						<h3 className='about-heading'>About event:</h3>
						<a
							href={event.htmlLink}
							className='event-link'
						>
							Details on Google Calendar
						</a>
						<p className='event-description'>{event.description}</p>
					</div>
				)}
				<button
					className='details-button'
					onClick={() => this.toggleCollapsed()}
				>
					{collapsed ? "Show" : "Hide"} details
				</button>
			</div>
		);
	}
}

export default Event;
