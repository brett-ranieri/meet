import React, { Component } from "react";

class Event extends Component {
	state = {
		collapsed: true,
	};

	toggleCollapsed = () => {
		this.setState((state) => ({
			collapsed: !state.collapsed,
		}));
	};

	render() {
		const { event } = this.props;
		const { collapsed } = this.state;
		return (
			<div className='event'>
				<h2 className='event-title'>{event.summary}</h2>
				<p className='event-time'>
					{new Date(event.start.dateTime).toString()}
				</p>
				<p className='event-location'>
					@{event.summary} | {event.location}
				</p>
				{!collapsed && (
					<>
						<h3 className='about-heading'>About event:</h3>
						<a
							href={event.htmlLink}
							className='event-link'
						>
							Details on Google Calendar
						</a>
						<p className='event-description'>{event.description}</p>
					</>
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
