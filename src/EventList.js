import React, { Component } from "react";
import Event from "./Event";
import { Col, Row } from "react-bootstrap";

class EventList extends Component {
	render() {
		const { events } = this.props;
		return (
			<Row className='justify-content-center mb-3'>
				{events.map((event) => (
					<Col
						key={event.id}
						xs='auto'
						sm={6}
						md={4}
					>
						<Event event={event} />
					</Col>
				))}
			</Row>
		);
	}
}

export default EventList;
