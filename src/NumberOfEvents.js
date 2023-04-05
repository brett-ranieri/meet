import React, { Component } from "react";

class NumberOfEvents extends Component {
	state = {
		query: 20,
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
			<div className='NumberOfEvents'>
				<label for='eventNumber'>Pick a Number:</label>
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
