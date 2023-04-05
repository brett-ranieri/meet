import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
	state = {
		query: 20,
		errorText: "",
	};

	handleNumberChanged = (event) => {
		let value = event.target.value;
		if (value > 20 || value < 1) {
			this.setState({
				query: value,
				errorText: "Must pick a number between 1 and 20",
			});
		} else {
			this.setState({
				query: value,
				errorText: "",
			});
			this.props.updateEvents(null, value);
		}
	};

	render() {
		return (
			<div className='NumberOfEvents'>
				<label for='eventNumber'>Number of Events:</label>
				<input
					name='eventNumber'
					className='number-of-events'
					type='number'
					value={this.state.query}
					onChange={this.handleNumberChanged}
				></input>
				<ErrorAlert text={this.state.errorText} />
			</div>
		);
	}
}

export default NumberOfEvents;
