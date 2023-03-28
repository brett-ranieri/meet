import React, { Component } from "react";

class NumberOfEvents extends Component {
	state = {
		query: 24,
	};

	handleNumberChanged = (event) => {
		let value = event.target.value;
		this.setState({
			query: value,
		});
		this.props.updateEvents(null, value);
	};

	render() {
		return (
			<div>
				<label for='eventNumber'>Number of Events:</label>
				<input
					name='eventNumber'
					className='number-of-events'
					type='number'
					value={this.state.query}
					onChange={this.handleNumberChanged}
				></input>
			</div>
		);
	}
}

export default NumberOfEvents;
