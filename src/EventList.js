import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
	render() {
		const { events } = this.props;
		// console.log("EventList ", events);
		return (
			<ul
				className='EventList'
				id='event_list'
			>
				{events.map((event) => (
					<li key={event.id}>
						<Event event={event} />
					</li>
				))}
			</ul>
		);
	}
}

export default EventList;
